import "../../../components/skeletons/Skeleton.css";
import "./DashboardSkeleton.css";

function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">

      <div className="dashboard-skeleton__hero shimmer" />

      <div className="dashboard-skeleton__stats">

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="dashboard-skeleton__card shimmer"
          />
        ))}

      </div>

      <div className="dashboard-skeleton__charts">

        <div className="dashboard-skeleton__chart shimmer" />

        <div className="dashboard-skeleton__chart shimmer" />

      </div>

    </div>
  );
}

export default DashboardSkeleton;