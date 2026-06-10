import "../../../components/skeletons/Skeleton.css";
import "./UsersSkeleton.css";

function UsersSkeleton() {
  return (
    <div className="users-skeleton">

      {/* Header */}
      <div className="users-skeleton-header shimmer" />

      {/* Stats Cards */}
      <div className="users-skeleton-stats">

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="users-skeleton-stat-card shimmer"
          />
        ))}

      </div>

      {/* Toolbar */}
      <div className="users-skeleton-toolbar">

        <div className="users-skeleton-search shimmer" />

        <div className="users-skeleton-filter shimmer" />

        <div className="users-skeleton-btn shimmer" />

        <div className="users-skeleton-btn shimmer" />

      </div>

      {/* Count */}
      <div className="users-skeleton-count shimmer" />

      {/* Table */}
      <div className="users-skeleton-table">

        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="users-skeleton-row"
          >

            <div className="users-skeleton-cell shimmer" />
            <div className="users-skeleton-cell shimmer" />
            <div className="users-skeleton-cell shimmer" />
            <div className="users-skeleton-cell shimmer" />
            <div className="users-skeleton-cell shimmer" />

          </div>
        ))}

      </div>

    </div>
  );
}

export default UsersSkeleton;