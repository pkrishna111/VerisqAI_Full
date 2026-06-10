import "../../styles/skeletons/UserDashboardSkeleton.css";
import "./Skeleton.css";

function UserDashboardSkeleton() {
  return (
    <div className="user-dashboard-skeleton">

      <div className="user-dashboard-header shimmer" />

      <div className="user-dashboard-kpis">

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="user-dashboard-kpi shimmer"
          />
        ))}

      </div>

      <div className="user-dashboard-table shimmer" />

      <div className="user-dashboard-bottom">

        <div className="user-dashboard-card shimmer" />
        <div className="user-dashboard-card shimmer" />

      </div>

    </div>
  );
}

export default UserDashboardSkeleton;