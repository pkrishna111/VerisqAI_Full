import { Clock, Send, Download, AlertCircle } from "lucide-react";
import { apiRequest } from "../../services/api";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../services/api";

function VendorRow({ vendor, onSendSuccess, onViewFindings, onSendClick }) {
  const initials = vendor.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const navigate = useNavigate();

  //handle download button ( for now txt file )
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE_URL}/api/dashboard/download-report/${vendor.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${vendor.name}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <tr className="vendor-row">
      {/* Vendor */}
      <td>
        <div
          className="vendor-cell"
          onClick={() => navigate(`/vendor/${vendor.id}`)}
          style={{ cursor: "pointer" }}
        >
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
          <span className="status-badge status-complete">Complete</span>
        )}

        {vendor.status === "Processing" && (
          <span className="status-badge status-processing">Processing</span>
        )}

        {vendor.status === "Queued" && (
          <span className="status-badge status-queued">Queued</span>
        )}

        {vendor.status === "Failed" && (
          <span className="status-badge status-failed">Failed</span>
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

        {(vendor.questionnaire === "Sent" ||
          vendor.questionnaire === "In Progress") && (

            <div
              className="questionnaire completed"
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center"
              }}
            >
              <span>{vendor.questionnaire}</span>
            </div>
          )}

        {vendor.questionnaire === "Completed" && (

          <div
            className="questionnaire completed"
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center"
            }}
          >
            <span>Completed</span>

            <button
              className="send-btn"
              onClick={() =>
                onSendClick(vendor.id)
              }
            >
              <Send size={16} />
              Resend
            </button>
          </div>
        )}

        {(vendor.questionnaire === "Cancelled" ||
          vendor.questionnaire === "Declined" ||
          vendor.questionnaire === "Expired" ||
          vendor.questionnaire === "Send") && (

            <button
              className="send-btn"
              onClick={() =>
                onSendClick(vendor.id)
              }
            >
              <Send size={16} />
              Send
            </button>
          )}

      </td>

      {/* Risk Score */}
      <td>{vendor.riskScore ?? "—"}</td>

      {/* High Findings */}
      <td onClick={() => onViewFindings(vendor.id)} style={{ cursor: "pointer" }}>
        <div style={{ display: "flex", gap: "8px" }}>

          {vendor.criticalFindings > 0 && (
            <span style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600"
            }}>
              🔴 {vendor.criticalFindings}
            </span>
          )}

          {vendor.highFindings > 0 && (
            <span style={{
              background: "#ffedd5",
              color: "#ea580c",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600"
            }}>
              🟠 {vendor.highFindings}
            </span>
          )}

          {vendor.mediumFindings > 0 && (
            <span style={{
              background: "#fef9c3",
              color: "#ca8a04",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600"
            }}>
              🟡 {vendor.mediumFindings}
            </span>
          )}

          {vendor.criticalFindings === 0 &&
            vendor.highFindings === 0 &&
            vendor.mediumFindings === 0 && (
              <span style={{ color: "#9ca3af", fontSize: "12px" }}>
                No Issues
              </span>
            )}
        </div>
      </td>

      {/* Risk Tier */}
      <td>
        {vendor.tier ? <span className="tier-badge">{vendor.tier}</span> : "—"}
      </td>

      {/* Actions */}
      <td>
        {vendor.score ? (
          <button className="pdf-btn" onClick={handleDownload}>
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
