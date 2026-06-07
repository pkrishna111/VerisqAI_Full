import "../styles/dashboardoverview.css";

function DashboardOverview() {
  return (
    <div className="dashboardoverview">

      <div className="dashboardoverview-card">
        <h3>Platform Status</h3>
        <p>All systems operational</p>
      </div>

      <div className="dashboardoverview-card">
        <h3>AI Engine</h3>
        <p>Running Normally</p>
      </div>

      <div className="dashboardoverview-card">
        <h3>Database</h3>
        <p>Connected</p>
      </div>

    </div>
  );
}

export default DashboardOverview;