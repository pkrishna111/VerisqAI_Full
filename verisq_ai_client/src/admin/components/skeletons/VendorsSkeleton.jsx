import "../../../components/skeletons/Skeleton.css";
import "./VendorsSkeleton.css";

function VendorsSkeleton() {
  return (
    <div className="vendors-skeleton">

      {/* Header */}
      <div className="vendors-skeleton-header shimmer" />

      {/* Stats */}
      <div className="vendors-skeleton-stats">

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="vendors-skeleton-stat-card shimmer"
          />
        ))}

      </div>

      {/* Toolbar */}
      <div className="vendors-skeleton-toolbar">

        <div className="vendors-skeleton-search shimmer" />

        <div className="vendors-skeleton-filter shimmer" />

        <div className="vendors-skeleton-filter shimmer" />

        <div className="vendors-skeleton-btn shimmer" />

        <div className="vendors-skeleton-btn shimmer" />

      </div>

      {/* Count */}
      <div className="vendors-skeleton-count shimmer" />

      {/* Table */}
      <div className="vendors-skeleton-table">

        {[...Array(10)].map((_, index) => (

          <div
            key={index}
            className="vendors-skeleton-row"
          >

            <div className="vendors-skeleton-cell shimmer" />
            <div className="vendors-skeleton-cell shimmer" />
            <div className="vendors-skeleton-cell shimmer" />
            <div className="vendors-skeleton-cell shimmer" />
            <div className="vendors-skeleton-cell shimmer" />
            <div className="vendors-skeleton-cell shimmer" />

          </div>

        ))}

      </div>

    </div>
  );
}

export default VendorsSkeleton;