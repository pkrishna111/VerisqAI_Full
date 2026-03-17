import { Plus } from "lucide-react";

function WelcomeBanner({
  usedVendors,
  maxVendors,
  onAddVendor
}) {
  const isLimitReached = usedVendors >= maxVendors;

  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <h2>🎯 Your Vendor Risk Dashboard</h2>
        <p>Monitor your vendors' security posture with LiveThreat intelligence</p>
      </div>

      <div className="vendor-counter">
        <div className="counter-display">
          <div className="counter-numbers">
            {usedVendors} / {maxVendors}
          </div>
          <div className="counter-label">Vendors Used</div>
        </div>

        <button
          className="btn-add-vendor"
          onClick={onAddVendor}
          disabled={isLimitReached}
        >
          <Plus size={20} />
          Add Vendor
        </button>
      </div>
    </div>
  );
}

export default WelcomeBanner;
