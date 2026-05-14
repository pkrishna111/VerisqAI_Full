import {
  Globe,
  Mail,
  Download,
  ShieldAlert
} from "lucide-react";

import RiskBadge from "./RiskBadge";

import {
  getRiskTierClass,
  getRiskTierLabel
} from "../../utils/riskUtils";

import "../../styles/vendor-details/vendorHeader.css";

function VendorHeader({
  vendor,
  scorecard
}) {
  const initials = vendor.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const tierClass = getRiskTierClass(
    scorecard?.riskTier
  );

  const tierLabel = getRiskTierLabel(
    scorecard?.riskTier
  );

  return (
    <section className="vd-header">

      <div className="vd-header__content">

        <div className="vd-header__left">

          <div className="vd-header__avatar">
            {initials}
          </div>

          <div>
            <div className="vd-header__top-row">

              <h1 className="vd-header__title">
                {vendor.name}
              </h1>

              <RiskBadge
                label={tierLabel}
                variant={tierClass}
              />

            </div>

            <div className="vd-header__meta">

              <div className="vd-header__meta-item">
                <Globe size={16} />
                <span>{vendor.domain}</span>
              </div>

              <div className="vd-header__meta-item">
                <Mail size={16} />
                <span>{vendor.email}</span>
              </div>

              <div className="vd-header__meta-item">
                <ShieldAlert size={16} />
                <span>Status: {vendor.status}</span>
              </div>

            </div>

          </div>

        </div>

        <div className="vd-header__actions">

          <button className="vd-header__button">
            <Download size={18} />
            Download Report
          </button>

        </div>

      </div>

    </section>
  );
}

export default VendorHeader;