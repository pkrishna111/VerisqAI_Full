import "../styles/AiOverviewCards.css";

function AiOverviewCards({
  overview
}) {
  return (
    <div className="aioverviewcards">

      <div className="aioverviewcards-card">
        <h3>Total Insights</h3>
        <h2>
          {overview.totalInsights}
        </h2>
      </div>

      <div className="aioverviewcards-card">
        <h3>
          Recommendations
        </h3>
        <h2>
          {overview.totalRecommendations}
        </h2>
      </div>

      <div className="aioverviewcards-card">
        <h3>
          Avg Confidence
        </h3>
        <h2>
          {Number(
            overview.averageConfidence
          ).toFixed(2)}
        </h2>
      </div>

      <div className="aioverviewcards-card">
        <h3>
          High Priority
        </h3>
        <h2>
          {
            overview.highPriorityRecommendations
          }
        </h2>
      </div>

    </div>
  );
}

export default AiOverviewCards;