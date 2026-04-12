import { useState } from "react";
import QuestionItem from "./QuestionItem";
import { apiRequest } from "../../services/api";

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
        <div style={{ maxWidth: "600px", margin: "auto" }}>

            {/* Progress Bar */}
            <div style={{
                height: "6px",
                background: "#eee",
                borderRadius: "10px",
                marginBottom: "20px"
            }}>
                <div style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                    height: "100%",
                    background: "#6366f1",
                    borderRadius: "10px"
                }} />
            </div>

            {/* Question */}
            <QuestionItem
                index={currentStep}
                question={questions[currentStep]}
                value={answers[currentStep]}
                onChange={(val) => handleChange(currentStep, val)}
            />

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>

                <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 0}
                >
                    Back
                </button>

                {currentStep < questions.length - 1 ? (
                    <button
                        onClick={() => {
                            if (!answers[currentStep]) {
                                alert("Please answer before continuing");
                                return;
                            }
                            setCurrentStep(prev => prev + 1);
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                )}

            </div>
        </div>
    );
}