import "../../styles/vendor-details/riskBadge.css";

function RiskBadge({ label, variant }) {
  return (
    <span className={`risk-badge risk-badge--${variant}`}>
      {label}
    </span>
  );
}

export default RiskBadge;