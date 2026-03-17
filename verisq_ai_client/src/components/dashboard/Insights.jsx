import { AlertTriangle } from "lucide-react";

function Insights() {
  return (
    <div className="alert alert-danger alert-flex">
      {/* Left icon */}
      <div className="alert-icon">
        <AlertTriangle size={22} />
      </div>

      {/* Text content */}
      <div className="alert-content">
        <div className="alert-title">High Risk Finding Detected</div>
        <p>CloudSync Pro has 2 critical findings that require attention</p>
      </div>

      {/* Action button */}
      <button className="alert-btn">View Details</button>
    </div>
  );
}

export default Insights;
