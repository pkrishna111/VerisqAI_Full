import "./Skeleton.css";
import "../../styles/skeletons/TemplateDetailsSkeleton.css";

function TemplateDetailsSkeleton() {
  return (
    <div className="template-details-skeleton">

      <div className="template-details-hero shimmer" />

      <div className="template-details-layout">

        <div className="template-details-sidebar">

          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="template-details-section shimmer"
            />
          ))}

        </div>

        <div className="template-details-workspace">

          <div className="template-details-header shimmer" />

          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="template-details-question shimmer"
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default TemplateDetailsSkeleton;