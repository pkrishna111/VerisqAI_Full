import { useState } from "react";
import QuestionItem from "./QuestionItem";
import { apiRequest } from "../../services/api";
import "./QuestionnaireForm.css";

export default function QuestionnaireForm({ questions, questionnaireId }) {
    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);

    const handleChange = (index, value) => {
        setAnswers((prev) => ({
            ...prev,
            [index]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = questions.map((q, i) => ({
            questionnaireId,
            question: q,
            answer: answers[i] || ""
        }));

        // validation
        for (let i = 0; i < questions.length; i++) {
            if (!answers[i] || answers[i].trim() === "") {
                alert(`Please answer question ${i + 1}`);
                return;
            }
        }

        try {
            await apiRequest("/api/questionnaire/submit", "POST", payload);
            alert("Submitted successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="QuestionnaireForm-wrapper">

            <div className="QuestionnaireForm-container">

                {/* Header */}
                <div className="QuestionnaireForm-header">
                    <h2>Security Questionnaire</h2>
                    <p>Step {currentStep + 1} of {questions.length}</p>
                </div>

                {/* Progress Bar */}
                <div className="QuestionnaireForm-progress">
                    <div
                        className="QuestionnaireForm-progress-fill"
                        style={{
                            width: `${((currentStep + 1) / questions.length) * 100}%`
                        }}
                    />
                </div>

                {/* Question */}
                <div className="QuestionnaireForm-card">
                    <QuestionItem
                        index={currentStep}
                        question={questions[currentStep]}
                        value={answers[currentStep]}
                        onChange={(val) => handleChange(currentStep, val)}
                    />
                </div>

                {/* Navigation */}
                <div className="QuestionnaireForm-actions">

                    <button
                        className="QuestionnaireForm-btn secondary"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        disabled={currentStep === 0}
                    >
                        ← Back
                    </button>

                    {currentStep < questions.length - 1 ? (
                        <button
                            className="QuestionnaireForm-btn primary"
                            onClick={() => {
                                if (!answers[currentStep]) {
                                    alert("Please answer before continuing");
                                    return;
                                }
                                setCurrentStep(prev => prev + 1);
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