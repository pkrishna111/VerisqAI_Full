import {
  ShieldCheck,
  TriangleAlert,
  FileWarning,
  ClipboardCheck
} from "lucide-react";

import StatCard from "./StatCard";

import "../../styles/vendor-details/assessmentCards.css";

function AssessmentCards({
  scorecard,
  findings,
  questionnaire
}) {
  return (
    <div className="vd-assessment-grid">

      <StatCard
        title="Security Score"
        value={scorecard?.score ?? "—"}
        subtitle="Overall vendor security posture"
        icon={ShieldCheck}
        variant="primary"
      />

      <StatCard
        title="Risk Score"
        value={scorecard?.riskScore ?? "—"}
        subtitle="Calculated assessment risk"
        icon={TriangleAlert}
        variant="warning"
      />

      <StatCard
        title="Findings"
        value={findings?.length ?? 0}
        subtitle="Detected assessment findings"
        icon={FileWarning}
        variant="danger"
      />

      <StatCard
        title="Questionnaire"
        value={questionnaire?.status ?? "N/A"}
        subtitle="Vendor assessment completion"
        icon={ClipboardCheck}
        variant="success"
      />

    </div>
  );
}

export default AssessmentCards;