import { useState } from "react";
import QuestionItem from "./QuestionItem";
import { apiRequest } from "../../services/api";
import "./QuestionnaireForm.css";

export default function QuestionnaireForm({
    template,
    vendorId,
    questionnaireId
}) {

    // flatten all questions from sections
    const questions = template.sections.flatMap(
        section => section.questions
    );

    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);

    const currentQuestion = questions[currentStep];

    const handleChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const validateCurrentStep = () => {

        if (
            currentQuestion.isRequired &&
            (
                !answers[currentQuestion.id] ||
                answers[currentQuestion.id].trim() === ""
            )
        ) {
            alert("Please answer before continuing");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        // validate all required questions
        for (const question of questions) {

            if (
                question.isRequired &&
                (
                    !answers[question.id] ||
                    answers[question.id].trim() === ""
                )
            ) {
                alert(
                    `Please answer: ${question.questionText}`
                );

                return;
            }
        }

        const payload = {
            questionnaireId: questionnaireId,
            vendorId,
            templateId: template.templateId,

            answers: questions.map(question => ({
                questionId: question.id,
                questionKey: question.questionKey,
                answer: answers[question.id] || ""
            }))
        };

        try {

            await apiRequest(
                "/api/questionnaire/dynamic-submit",
                "POST",
                payload
            );

            alert("Assessment submitted successfully!");

        } catch (err) {

            alert(err.message);
        }
    };

    return (
        <div className="QuestionnaireForm-wrapper">

            <div className="QuestionnaireForm-container">

                {/* HEADER */}
                <div className="QuestionnaireForm-header">

                    <h2>
                        {template.templateName}
                    </h2>

                    <p>
                        Step {currentStep + 1} of {questions.length}
                    </p>

                </div>

                {/* PROGRESS */}
                <div className="QuestionnaireForm-progress">

                    <div
                        className="QuestionnaireForm-progress-fill"
                        style={{
                            width: `${
                                ((currentStep + 1)
                                / questions.length) * 100
                            }%`
                        }}
                    />

                </div>

                {/* QUESTION */}
                <div className="QuestionnaireForm-card">

                    <QuestionItem
                        index={currentStep}
                        question={currentQuestion}
                        value={answers[currentQuestion.id]}
                        onChange={(value) =>
                            handleChange(
                                currentQuestion.id,
                                value
                            )
                        }
                    />

                </div>

                {/* ACTIONS */}
                <div className="QuestionnaireForm-actions">

                    <button
                        className="QuestionnaireForm-btn secondary"
                        onClick={() =>
                            setCurrentStep(prev => prev - 1)
                        }
                        disabled={currentStep === 0}
                    >
                        ← Back
                    </button>

                    {currentStep < questions.length - 1 ? (

                        <button
                            className="QuestionnaireForm-btn primary"
                            onClick={() => {

                                if (!validateCurrentStep())
                                    return;

                                setCurrentStep(
                                    prev => prev + 1
                                );
                            }}
                        >
                            Next →
                        </button>

                    ) : (

                        <button
                            className="QuestionnaireForm-btn success"
                            onClick={handleSubmit}
                        >
                            Submit ✓
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}