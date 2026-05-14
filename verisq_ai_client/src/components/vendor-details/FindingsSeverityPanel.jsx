import {
  ShieldAlert,
  TriangleAlert,
  AlertCircle,
  ShieldCheck,
  Layers3
} from "lucide-react";

import {
  countFindingsBySeverity
} from "../../utils/riskUtils";

import "../../styles/vendor-details/findingsSeverityPanel.css";

function FindingsSeverityPanel({
  findings = [],
  selectedSeverity,
  onSelectSeverity
}) {
  const counts = countFindingsBySeverity(findings);

  const rows = [
    {
      label: "All",
      description: "All assessment findings",
      count: findings.length,
      icon: Layers3,
      variant: "all"
    },
    {
      label: "Critical",
      description: "Immediate security threats",
      count: counts.critical,
      icon: ShieldAlert,
      variant: "critical"
    },
    {
      label: "High",
      description: "Major security weaknesses",
      count: counts.high,
      icon: TriangleAlert,
      variant: "high"
    },
    {
      label: "Medium",
      description: "Moderate risk exposures",
      count: counts.medium,
      icon: AlertCircle,
      variant: "medium"
    },
    {
      label: "Low",
      description: "Minor observations",
      count: counts.low,
      icon: ShieldCheck,
      variant: "low"
    }
  ];

  return (
    <div className="vd-severity-panel">

      <div className="vd-severity-panel__header">
        <h2>Findings Severity</h2>

        <p>
          Filter findings by risk severity
        </p>
      </div>

      <div className="vd-severity-panel__table">

        {rows.map((row) => {
          const Icon = row.icon;

          const isActive =
            selectedSeverity === row.label;

          return (
            <button
              key={row.label}
              className={`
                vd-severity-row
                vd-severity-row--${row.variant}
                ${isActive ? "vd-severity-row--active" : ""}
              `}
              onClick={() =>
                onSelectSeverity(row.label)
              }
            >

              <div className="vd-severity-row__left">

                <div className="vd-severity-row__icon">
                  <Icon size={18} />
                </div>

                <div>
                  <h3 className="vd-severity-row__label">
                    {row.label}
                  </h3>

                  <p className="vd-severity-row__description">
                    {row.description}
                  </p>
                </div>

              </div>

              <div className="vd-severity-row__count">
                {row.count}
              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default FindingsSeverityPanel;