import "../styles/AiMonitoringStats.css";

function AiMonitoringStats({
  stats
}) {
  return (
    <div className="aimonitoringstats">

      <div className="aimonitoringstats-card">
        <span>
          Total Requests
        </span>

        <h2>
          {stats.totalRequests}
        </h2>
      </div>

      <div className="aimonitoringstats-card">
        <span>
          Success Rate
        </span>

        <h2>
          {stats.successRate}%
        </h2>
      </div>

      <div className="aimonitoringstats-card">
        <span>
          Failed Requests
        </span>

        <h2>
          {stats.failedRequests}
        </h2>
      </div>

      <div className="aimonitoringstats-card">
        <span>
          Avg Confidence
        </span>

        <h2>
          {Number(
            stats.averageConfidence || 0
          ).toFixed(2)}
        </h2>
      </div>

      <div className="aimonitoringstats-card">
        <span>
          Avg Response Time
        </span>

        <h2>
          {Number(
            stats.averageResponseTime || 0
          ).toFixed(2)} sec
        </h2>
      </div>

    </div>
  );
}

export default AiMonitoringStats;