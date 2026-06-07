import "../styles/VendorDetailsModal.css";

function VendorDetailsModal({
  vendor,
  onClose
}) {

  if (!vendor) {
    return null;
  }

  return (
    <div className="vendordetailsmodal-overlay">

      <div className="vendordetailsmodal">

        <div className="vendordetailsmodal-header">

          <h2>
            Vendor Details
          </h2>

          <button
            className="vendordetailsmodal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="vendordetailsmodal-body">

          <div>
            <strong>Name:</strong>
            {vendor.name}
          </div>

          <div>
            <strong>Domain:</strong>
            {vendor.domain}
          </div>

          <div>
            <strong>Email:</strong>
            {vendor.email}
          </div>

          <div>
            <strong>Status:</strong>
            {vendor.status}
          </div>

          <div>
            <strong>Score:</strong>
            {vendor.score}
          </div>

          <div>
            <strong>Risk Score:</strong>
            {vendor.riskScore}
          </div>

          <div>
            <strong>Risk Tier:</strong>
            {vendor.riskTier}
          </div>

          <div>
            <strong>Findings:</strong>
            {vendor.findings}
          </div>

          <div>
            <strong>Questionnaires:</strong>
            {vendor.questionnaireCount}
          </div>

          <div>
            <strong>Scorecards:</strong>
            {vendor.scorecardCount}
          </div>

          <div>
            <strong>Owner:</strong>
            {vendor.ownerName}
          </div>

          <div>
            <strong>Owner Email:</strong>
            {vendor.ownerEmail}
          </div>

          <div>
            <strong>Created:</strong>
            {new Date(
              vendor.createdAt
            ).toLocaleDateString()}
          </div>

        </div>

      </div>

    </div>
  );
}

export default VendorDetailsModal;