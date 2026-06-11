import "../../styles/vendor-details/questionnaireDetailsCard.css";

function formatDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export default function QuestionnaireDetailsCard({
    questionnaire
}) {
    if (!questionnaire) {
        return null;
    }

    return (
        <div className="questionnaire-details-card">

            <div className="questionnaire-details-header">
                <h3>Questionnaire Details</h3>

                <span
                    className={`questionnaire-status-badge questionnaire-status-${questionnaire.status
                        .toLowerCase()
                        .replace(/\s/g, "-")
                        }`}
                >
                    {questionnaire.status}
                </span>
            </div>

            <div className="questionnaire-details-grid">

                <div className="detail-item">
                    <span className="detail-label">
                        Assessment Template
                    </span>

                    <span className="detail-value">
                        {questionnaire.templateName || "—"}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">
                        Question Count
                    </span>

                    <span className="detail-value">
                        {questionnaire.questionCount}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">
                        Sent Date
                    </span>

                    <span className="detail-value">
                        {formatDate(questionnaire.sentAt)}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">
                        Started Date
                    </span>

                    <span className="detail-value">
                        {formatDate(questionnaire.startedAt)}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">
                        Completed Date
                    </span>

                    <span className="detail-value">
                        {formatDate(questionnaire.completedAt)}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">
                        Expiry Date
                    </span>

                    <span className="detail-value">
                        {formatDate(questionnaire.expiresAt)}
                    </span>
                </div>

                {questionnaire.cancelledAt && (
                    <div className="detail-item">
                        <span className="detail-label">
                            Cancelled Date
                        </span>

                        <span className="detail-value">
                            {formatDate(
                                questionnaire.cancelledAt
                            )}
                        </span>
                    </div>
                )}

                {questionnaire.declinedAt && (
                    <div className="detail-item">
                        <span className="detail-label">
                            Declined Date
                        </span>

                        <span className="detail-value">
                            {formatDate(
                                questionnaire.declinedAt
                            )}
                        </span>
                    </div>
                )}

                {questionnaire.declineReason && (
                    <div className="detail-item detail-item-full">
                        <span className="detail-label">
                            Decline Reason
                        </span>

                        <span className="detail-value">
                            {questionnaire.declineReason}
                        </span>
                    </div>
                )}

            </div>

        </div>
    );
}