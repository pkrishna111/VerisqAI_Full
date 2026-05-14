import "../../styles/vendor-details/vendorDetailsSkeleton.css";

function VendorDetailsSkeleton() {
  return (
    <div className="vd-skeleton">

      {/* Header */}
      <div className="vd-skeleton__header shimmer" />

      {/* KPI Cards */}
      <div className="vd-skeleton__stats">

        <div className="vd-skeleton__card shimmer" />
        <div className="vd-skeleton__card shimmer" />
        <div className="vd-skeleton__card shimmer" />
        <div className="vd-skeleton__card shimmer" />

      </div>

      {/* Findings Workspace */}
      <div className="vd-skeleton__workspace">

        <div className="vd-skeleton__severity shimmer" />

        <div className="vd-skeleton__findings">

          <div className="vd-skeleton__finding shimmer" />
          <div className="vd-skeleton__finding shimmer" />
          <div className="vd-skeleton__finding shimmer" />

        </div>

      </div>

      {/* Responses */}
      <div className="vd-skeleton__responses shimmer" />

    </div>
  );
}

export default VendorDetailsSkeleton;