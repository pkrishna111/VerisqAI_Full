import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../styles/questionnaireWelcome.css";

export default function QuestionnaireWelcomePage() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const res =
                await apiRequest(
                    `/api/questionnaire/${token}`
                );

            setData(res);

        }
        catch (err) {

            alert(err.message);

        }
        finally {

            setLoading(false);

        }
    };

    const handleStart = async () => {

        try {

            await apiRequest(
                `/api/questionnaire/start/${token}`,
                "POST"
            );

            navigate(
                `/questionnaire/${token}/assessment`
            );

        }
        catch (err) {

            alert(err.message);

        }
    };

    const handleDecline = () => {

        navigate(
            `/questionnaire/${token}/decline`
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="questionnaire-welcome">

            <div className="questionnaire-welcome-card">

                <div className="questionnaire-welcome-header">

                    <h1>
                        Vendor Security Assessment
                    </h1>

                    <p>
                        You have been invited to complete
                        a security assessment.
                    </p>

                </div>

                <div className="questionnaire-welcome-grid">

                    <div>
                        <label>Assessment Template</label>
                        <span>
                            {data.template.templateName}
                        </span>
                    </div>

                    <div>
                        <label>Vendor</label>
                        <span>
                            {data.vendorName}
                        </span>
                    </div>

                    <div>
                        <label>Domain</label>
                        <span>
                            {data.vendorDomain}
                        </span>
                    </div>

                    <div>
                        <label>Questions</label>
                        <span>
                            {data.questionCount}
                        </span>
                    </div>

                    <div>
                        <label>Due Date</label>
                        <span>
                            {new Date(
                                data.expiresAt
                            ).toLocaleDateString()}
                        </span>
                    </div>

                </div>

                <div className="questionnaire-notice">

                    Please ensure all responses are
                    accurate before submission.

                </div>

                <div className="questionnaire-welcome-actions">

                    <button
                        className="decline-btn"
                        onClick={handleDecline}
                    >
                        Decline Assessment
                    </button>

                    <button
                        className="start-btn"
                        onClick={handleStart}
                    >
                        Start Assessment
                    </button>

                </div>

            </div>

        </div>
    );
}