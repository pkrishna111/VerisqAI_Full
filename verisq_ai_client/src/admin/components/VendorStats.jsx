import "../styles/VendorStats.css";

function VendorStats({
  stats
}) {
  return (
    <div className="vendorstats">

      <div className="vendorstats-card">
        <span>Total Vendors</span>
        <h2>{stats.totalVendors}</h2>
      </div>

      <div className="vendorstats-card">
        <span>Completed</span>
        <h2>{stats.completedVendors}</h2>
      </div>

      <div className="vendorstats-card">
        <span>Pending</span>
        <h2>{stats.pendingVendors}</h2>
      </div>

      <div className="vendorstats-card">
        <span>High Risk</span>
        <h2>{stats.highRiskVendors}</h2>
      </div>

    </div>
  );
}

export default VendorStats;