import "../../styles/vendor-details/assessmentIntelligence.css";

export default function AssessmentIntelligence({
    scorecard
}) {

    const aiInsight =
        scorecard?.aiInsight;

    const aiRecommendations =
        scorecard?.aiRecommendations || [];

    // no AI generated
    if (!aiInsight) {
        return null;
    }

    return (
        <section className="ai-intelligence">

            <div className="ai-intelligence__header">

                <div>
                    <h2 className="ai-intelligence__title">
                        AI Assessment Intelligence
                    </h2>

                    <p className="ai-intelligence__subtitle">
                        AI-generated security assessment insights and remediation guidance
                    </p>
                </div>

                <div className="ai-confidence">

                    <span className="ai-confidence__label">
                        Confidence
                    </span>

                    <span className="ai-confidence__value">
                        {Math.round(
                            aiInsight.confidenceScore * 100
                        )}%
                    </span>
                </div>
            </div>

            {/* Executive Summary */}

            <div className="ai-card">

                <h3 className="ai-card__title">
                    Executive Summary
                </h3>

                <p className="ai-summary">
                    {aiInsight.executiveSummary}
                </p>

                <div className="ai-meta">

                    <span>
                        Model: {aiInsight.modelName}
                    </span>

                    <span>
                        Generated:
                        {" "}
                        {new Date(
                            aiInsight.generatedAt
                        ).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Risk Drivers */}

            <div className="ai-card">

                <h3 className="ai-card__title">
                    Key Risk Drivers
                </h3>

                <div className="ai-risk-drivers">

                    {aiInsight.riskDrivers?.map(
                        (driver, index) => (
                            <div
                                key={index}
                                className="ai-risk-driver"
                            >
                                <span className="ai-risk-driver__bullet">
                                    •
                                </span>

                                <span>
                                    {driver}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Recommendations */}

            <div className="ai-card">

                <h3 className="ai-card__title">
                    AI Recommendations
                </h3>

                <div className="ai-recommendations">

                    {aiRecommendations.map(
                        (recommendation, index) => (

                            <div
                                key={index}
                                className="ai-recommendation"
                            >

                                <div className="ai-recommendation__top">

                                    <h4>
                                        {recommendation.title}
                                    </h4>

                                    <span
                                        className={
                                            `ai-priority ai-priority--${recommendation.priority?.toLowerCase()}`
                                        }
                                    >
                                        {recommendation.priority}
                                    </span>
                                </div>

                                <p className="ai-recommendation__description">
                                    {recommendation.description}
                                </p>

                                <div className="ai-recommendation__meta">

                                    <span>
                                        {recommendation.category}
                                    </span>

                                </div>

                                <p className="ai-recommendation__rationale">
                                    {recommendation.rationale}
                                </p>

                            </div>
                        )
                    )}
                </div>
            </div>

        </section>
    );
}