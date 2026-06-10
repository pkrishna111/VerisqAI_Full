import "../../../components/skeletons/Skeleton.css";
import "./AuditLogsSkeleton.css";

function AuditLogsSkeleton() {
  return (
    <div className="audit-skeleton">

      <div className="audit-skeleton-header shimmer" />

      <div className="audit-skeleton-stats">

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="audit-skeleton-card shimmer"
          />
        ))}

      </div>

      <div className="audit-skeleton-filters">

        <div className="audit-skeleton-filter shimmer" />
        <div className="audit-skeleton-filter shimmer" />
        <div className="audit-skeleton-filter shimmer" />

      </div>

      <div className="audit-skeleton-table">

        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="audit-skeleton-row"
          >

            <div className="audit-skeleton-cell shimmer" />
            <div className="audit-skeleton-cell shimmer" />
            <div className="audit-skeleton-cell shimmer" />
            <div className="audit-skeleton-cell shimmer" />
            <div className="audit-skeleton-cell shimmer" />

          </div>
        ))}

      </div>

    </div>
  );
}

export default AuditLogsSkeleton;