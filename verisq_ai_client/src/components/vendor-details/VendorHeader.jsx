import {
  Globe,
  Mail,
  Download,
  ShieldAlert,
  RefreshCw,
  Send
} from "lucide-react";

import RiskBadge from "./RiskBadge";

import {
  getRiskTierClass,
  getRiskTierLabel
} from "../../utils/riskUtils";

import "../../styles/vendor-details/vendorHeader.css";

const VendorHeader = ({
  vendor,
  scorecard,
  questionnaire,
  onRefresh,
  onSendQuestionnaire,
  onCancelQuestionnaire,
  onDownloadReport
}) => {
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

  const activeStatuses = [
    "Sent",
    "In Progress"
  ];

  const canCancelQuestionnaire =
    questionnaire &&
    activeStatuses.includes(
      questionnaire.status
    );

  const canSendQuestionnaire =
    !questionnaire ||
    [
      "Completed",
      "Cancelled",
      "Declined",
      "Expired"
    ].includes(
      questionnaire.status
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

        <div className="vd-header-actions">

          <button
            className="vd-header-btn vd-header-btn--secondary"
            onClick={onRefresh}
          >
            <RefreshCw size={16} />

            <span>Refresh</span>
          </button>

          {canCancelQuestionnaire ? (

            <button
              className="vd-header-btn vd-header-btn--danger"
              onClick={onCancelQuestionnaire}
            >
              <span>
                Cancel Questionnaire
              </span>
            </button>

          ) : (

            <button
              className="vd-header-btn vd-header-btn--primary"
              onClick={onSendQuestionnaire}
              disabled={!canSendQuestionnaire}
            >
              <Send size={16} />

              <span>
                Send Questionnaire
              </span>
            </button>

          )}

          <button className="vd-header__button"
            onClick={onDownloadReport}>
            <Download size={18} />
            Download Report
          </button>

        </div>

      </div>

    </section>
  );
}

export default VendorHeader;