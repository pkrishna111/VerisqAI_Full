import "../../../components/skeletons/Skeleton.css";
import "./AiMonitoringSkeleton.css";

function AiMonitoringSkeleton() {
  return (
    <div className="ai-skeleton">

      {/* Header */}
      <div className="ai-skeleton-header shimmer" />

      {/* KPI Cards */}
      <div className="ai-skeleton-stats">

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="ai-skeleton-card shimmer"
          />
        ))}

      </div>

      {/* Charts */}
      <div className="ai-skeleton-charts">

        <div className="ai-skeleton-chart shimmer" />
        <div className="ai-skeleton-chart shimmer" />

      </div>

      {/* Table */}
      <div className="ai-skeleton-table">

        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="ai-skeleton-row"
          >

            <div className="ai-skeleton-cell shimmer" />
            <div className="ai-skeleton-cell shimmer" />
            <div className="ai-skeleton-cell shimmer" />
            <div className="ai-skeleton-cell shimmer" />

          </div>
        ))}

      </div>

    </div>
  );
}

export default AiMonitoringSkeleton;