
import "../../styles/skeletons/TemplatesSkeleton.css";
import "./Skeleton.css";

function TemplatesSkeleton() {
  return (
    <div className="templates-skeleton">

      <div className="templates-skeleton-header shimmer" />

      <div className="templates-skeleton-toolbar">

        <div className="templates-skeleton-search shimmer" />
        <div className="templates-skeleton-button shimmer" />

      </div>

      <div className="templates-skeleton-grid">

        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="templates-skeleton-card shimmer"
          />
        ))}

      </div>

    </div>
  );
}

export default TemplatesSkeleton;