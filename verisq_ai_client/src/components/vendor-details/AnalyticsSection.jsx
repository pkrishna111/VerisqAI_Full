import SeverityDonutChart from "./SeverityDonutChart";
import RiskGaugeChart from "./RiskGaugeChart";

import "../../styles/vendor-details/analyticsSection.css";

function AnalyticsSection({
  findings = [],
  scorecard
}) {
  return (
    <section className="vd-analytics-section">

      <SeverityDonutChart
        findings={findings}
      />

      <RiskGaugeChart
        score={scorecard?.riskScore || 0}
      />

    </section>
  );
}

export default AnalyticsSection;