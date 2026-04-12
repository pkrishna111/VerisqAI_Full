import { RefreshCw } from "lucide-react";
import VendorRow from "./VendorRow";

function VendorTable({ vendors, onSendSuccess, onViewFindings, onSendClick, onRefresh, loading }) {
  // const vendors = [    //to add static data
  //   {
  //     id: 1,
  //     name: "CloudSync Pro",
  //     domain: "cloudsyncpro.com",
  //     status: "Complete",
  //     score: 72,
  //     questionnaire: "Pending",
  //     riskScore: 32,
  //     findings: 3,
  //     tier: "Tier 3"
  //   },
  //   {
  //     id: 2,
  //     name: "DataPipe Analytics",
  //     domain: "datapipe.io",
  //     status: "Processing",
  //     score: null,
  //     questionnaire: "Send",
  //     riskScore: null,
  //     findings: null,
  //     tier: null
  //   }
  // ];

  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">Your Vendors</h3>

        <div className="table-actions">
          <button className="btn-refresh" onClick={onRefresh} disabled={loading}>
            <RefreshCw size={16} className={loading ? "spin" : ""} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Scorecard Status</th>
            <th>Score</th>
            <th>Questionnaire</th>
            <th>Risk Score</th>
            <th>High+ Findings</th>
            <th>Risk Tier</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No vendors added yet
              </td>
            </tr>
          ) : (
            vendors.map((vendor) => (
              <VendorRow
                key={vendor.id}
                vendor={vendor}
                onSendSuccess={onSendSuccess}
                onViewFindings={onViewFindings}
                onSendClick={onSendClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VendorTable;
