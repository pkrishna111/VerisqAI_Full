import "./Skeleton.css";
import "../../styles/skeletons/TemplateBuilderSkeleton.css";

function TemplateBuilderSkeleton() {
  return (
    <div className="templatebuilder-skeleton">

      {/* Hero */}
      <div className="templatebuilder-skeleton-hero shimmer" />

      {/* KPI Cards */}
      <div className="templatebuilder-skeleton-kpis">

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="templatebuilder-skeleton-card shimmer"
          />
        ))}

      </div>

      {/* Templates Table */}
      <div className="templatebuilder-skeleton-table">

        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="templatebuilder-skeleton-row"
          >

            <div className="templatebuilder-skeleton-cell shimmer" />
            <div className="templatebuilder-skeleton-cell shimmer" />
            <div className="templatebuilder-skeleton-cell shimmer" />
            <div className="templatebuilder-skeleton-cell shimmer" />

          </div>
        ))}

      </div>

    </div>
  );
}

export default TemplateBuilderSkeleton;