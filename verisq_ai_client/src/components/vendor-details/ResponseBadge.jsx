import "../../styles/vendor-details/responseBadge.css";

function ResponseBadge({ answer }) {
  const normalized =
    answer?.toLowerCase?.() || "";

  let variant = "neutral";

  if (
    normalized.includes("yes")
  ) {
    variant = "positive";
  }
  else if (
    normalized.includes("no")
  ) {
    variant = "negative";
  }
  else if (
    normalized.includes("partial")
  ) {
    variant = "warning";
  }

  return (
    <span className={`vd-response-badge vd-response-badge--${variant}`}>
      {answer}
    </span>
  );
}

export default ResponseBadge;