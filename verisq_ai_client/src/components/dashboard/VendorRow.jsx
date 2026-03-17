import { Clock, Send, Download, AlertCircle } from "lucide-react";

function VendorRow({ vendor }) {
  const initials = vendor.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <tr className="vendor-row">
      {/* Vendor */}
      <td>
        <div className="vendor-cell">
          <div className="vendor-avatar">{initials}</div>

          <div className="vendor-info">
            <div className="vendor-name-text">{vendor.name}</div>
            <div className="vendor-domain">{vendor.domain}</div>
          </div>
        </div>
      </td>

      {/* Scorecard Status */}
      <td>
        {vendor.status === "Complete" && (
          <span className="status-badge status-complete">✓ Complete</span>
        )}
        {vendor.status === "Processing" && (
          <span className="status-badge status-processing">⟳ Processing</span>
        )}
      </td>

      {/* Score */}
      <td>
        {vendor.score ? (
          <div className="score-wrapper">
            <span className="score-value warning">{vendor.score}</span>
            <div className="score-bar">
              <div
                className="score-fill warning"
                style={{ width: `${vendor.score}%` }}
              />
            </div>
          </div>
        ) : (
          "—"
        )}
      </td>

      {/* Questionnaire */}
      <td>
        {vendor.questionnaire === "Pending" && (
          <div className="questionnaire pending">
            <Clock size={16} />
            Pending Response
          </div>
        )}

        {vendor.questionnaire === "Send" && (
          <button className="send-btn">
            <Send size={16} />
            Send
          </button>
        )}
      </td>

      {/* Risk Score */}
      <td>{vendor.riskScore ?? "—"}</td>

      {/* High Findings */}
      <td>
        {vendor.findings ? (
          <div className="findings">
            <AlertCircle size={16} />
            {vendor.findings}
          </div>
        ) : (
          "—"
        )}
      </td>

      {/* Risk Tier */}
      <td>
        {vendor.tier ? <span className="tier-badge">{vendor.tier}</span> : "—"}
      </td>

      {/* Actions */}
      <td>
        {vendor.score ? (
          <button className="pdf-btn">
            <Download size={16} />
            PDF
          </button>
        ) : (
          <span className="pending-text">Pending</span>
        )}
      </td>
    </tr>
  );
}

export default VendorRow;
