import "../styles/DashboardCharts.css";

import UserGrowthChart from "./UserGrowthChart";
import VendorRiskChart from "./VendorRiskChart";

function DashboardCharts() {
  return (
    <div className="dashboardcharts">

      <UserGrowthChart />

      <VendorRiskChart />

    </div>
  );
}

export default DashboardCharts;