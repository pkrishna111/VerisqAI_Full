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
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const currentQuestion = questions[currentStep];

    const handleChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const validateCurrentStep = () => {

        const answer = answers[currentQuestion.id];

        if (
            currentQuestion.isRequired &&
            (
                answer === undefined ||
                answer === null ||
                answer === "" ||
                (Array.isArray(answer) && answer.length === 0)
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

            const answer = answers[question.id];

            if (
                question.isRequired &&
                (
                    answer === undefined ||
                    answer === null ||
                    answer === "" ||
                    (Array.isArray(answer) && answer.length === 0)
                )
            ) {
                alert(
                    `Please answer: ${question.questionText}`
                );

                return;
            }
        }

        const payload = {
            questionnaireId,
            vendorId,
            templateId: template.templateId,

            answers: questions.map(question => ({
                questionId: question.id,
                questionKey: question.questionKey,
                answer: Array.isArray(answers[question.id])
                    ? answers[question.id].join(", ")
                    : answers[question.id] || ""
            }))
        };

        try {

            setSubmitting(true);

            await apiRequest(
                "/api/questionnaire/dynamic-submit",
                "POST",
                payload
            );

            setSubmitSuccess(true);

        }
        catch (err) {

            alert(err.message);

        }
        finally {

            if (!submitSuccess) {
                setSubmitting(false);
            }

        }
    };

    return (
        <div className="QuestionnaireForm-wrapper">

            {(submitting || submitSuccess) && (

                <div className="QuestionnaireForm-loader-overlay">

                    <div className="QuestionnaireForm-loader-box">

                        {!submitSuccess ? (

                            <>
                                <div className="QuestionnaireForm-spinner"></div>

                                <h3>
                                    AI is analyzing your assessment
                                </h3>

                                <p>
                                    Generating risk score, findings and recommendations...
                                </p>
                            </>

                        ) : (

                            <>
                                <div className="QuestionnaireForm-success-icon">
                                    ✓
                                </div>

                                <h3>
                                    Assessment Submitted Successfully
                                </h3>

                                <p>
                                    Your responses have been processed successfully.
                                    The AI scorecard and recommendations are now being generated.
                                </p>

                                {/* <button
                                    className="QuestionnaireForm-success-btn"
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >
                                    Continue
                                </button> */}
                            </>

                        )}

                    </div>

                </div>

            )}
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
                            width: `${((currentStep + 1)
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
                        disabled={
                            currentStep === 0 ||
                            submitting
                        }
                    >
                        ← Back
                    </button>

                    {currentStep < questions.length - 1 ? (

                        <button
                            className="QuestionnaireForm-btn primary"
                            disabled={submitting}
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
                            disabled={submitting}
                        >
                            {submitting
                                ? "Processing..."
                                : "Submit ✓"}
                        </button>

                    )}



                </div>

            </div>

        </div>
    );
}