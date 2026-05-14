import RiskBadge from "./RiskBadge";

import "../../styles/vendor-details/findingCard.css";

function FindingCard({ finding }) {
  const severityVariant =
    finding.severity?.toLowerCase() || "unknown";

  return (
    <div className="vd-finding-card">

      <div className="vd-finding-card__top">

        <h3 className="vd-finding-card__title">
          {finding.title}
        </h3>

        <RiskBadge
          label={finding.severity}
          variant={severityVariant}
        />

      </div>

      <p className="vd-finding-card__description">
        {finding.description}
      </p>

    </div>
  );
}

export default FindingCard;