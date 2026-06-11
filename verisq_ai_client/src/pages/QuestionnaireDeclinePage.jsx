import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";

import "../styles/questionnaireDecline.css";

export default function QuestionnaireDeclinePage() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [reason, setReason] = useState("");

    const [comments, setComments] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const reasons = [
        "Not the correct contact",
        "Insufficient information",
        "Vendor policy restriction",
        "Need internal approval",
        "Duplicate request",
        "Other"
    ];

    const handleSubmit = async () => {

        if (!reason) {
            alert(
                "Please select a reason."
            );
            return;
        }

        try {

            setLoading(true);

            await apiRequest(
                `/api/questionnaire/decline/${token}`,
                "POST",
                {
                    reason,
                    additionalComments:
                        comments
                }
            );

            navigate(
                `/questionnaire/${token}/declined`
            );

        }
        catch (err) {

            alert(err.message);

        }
        finally {

            setLoading(false);

        }
    };

    return (
        <div className="decline-page">

            <div className="decline-card">

                <h1>
                    Decline Assessment
                </h1>

                <p>
                    Please let us know why you
                    are unable to complete this
                    assessment.
                </p>

                <label>
                    Reason
                </label>

                <select
                    value={reason}
                    onChange={(e) =>
                        setReason(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Select a reason
                    </option>

                    {reasons.map(r => (
                        <option
                            key={r}
                            value={r}
                        >
                            {r}
                        </option>
                    ))}
                </select>

                {(reason === "Other" ||
                  reason === "Need internal approval" ||
                  reason === "Insufficient information") && (

                    <>
                        <label>
                            Additional Comments
                        </label>

                        <textarea
                            rows="4"
                            value={comments}
                            onChange={(e) =>
                                setComments(
                                    e.target.value
                                )
                            }
                        />
                    </>
                )}

                <div className="decline-actions">

                    <button
                        className="cancel-btn"
                        onClick={() =>
                            navigate(
                                `/questionnaire/${token}`
                            )
                        }
                    >
                        Back
                    </button>

                    <button
                        className="submit-btn"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading
                            ? "Submitting..."
                            : "Decline Assessment"}
                    </button>

                </div>

            </div>

        </div>
    );
}