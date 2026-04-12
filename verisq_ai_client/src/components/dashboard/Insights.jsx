import { AlertTriangle } from "lucide-react";

function Insights({ vendors, onViewFindings }) {

  // find vendor with max critical findings
  const topVendor = vendors
    ?.filter(v => v.criticalFindings > 0)
    ?.sort((a, b) => b.criticalFindings - a.criticalFindings)[0];

  if (!topVendor) return null;

  return (
    <div className="alert alert-danger alert-flex">
      
      <div className="alert-icon">
        <AlertTriangle size={22} />
      </div>

      <div className="alert-content">
        <div className="alert-title">High Risk Vendor Detected</div>
        <p>
          {topVendor.name} has {topVendor.criticalFindings} critical findings that require attention
        </p>
      </div>

      <button
        className="alert-btn"
        onClick={() => onViewFindings(topVendor.id)}
      >
        View Details
      </button>
    </div>
  );
}

export default Insights;