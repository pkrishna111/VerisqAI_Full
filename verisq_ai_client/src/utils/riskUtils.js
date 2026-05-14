export const getRiskTierLabel = (tier) => {
  switch (tier) {
    case 1:
      return "Low Risk";
    case 2:
      return "Moderate Risk";
    case 3:
      return "High Risk";
    case 4:
      return "Critical Risk";
    default:
      return "Unknown";
  }
};

export const getRiskTierClass = (tier) => {
  switch (tier) {
    case 1:
      return "low";
    case 2:
      return "moderate";
    case 3:
      return "high";
    case 4:
      return "critical";
    default:
      return "unknown";
  }
};

export const countFindingsBySeverity = (findings = []) => {
  return {
    critical: findings.filter(f => f.severity === "Critical").length,
    high: findings.filter(f => f.severity === "High").length,
    medium: findings.filter(f => f.severity === "Medium").length,
    low: findings.filter(f => f.severity === "Low").length
  };
};