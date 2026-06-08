import {
  Building2,
  CheckCircle,
  Clock,
  ShieldAlert
} from "lucide-react";

import "../styles/VendorStats.css";

function VendorStats({ stats }) {

  const cards = [
    {
      title: "Total Vendors",
      value: stats.totalVendors || 0,
      subtitle: "Registered Vendors",
      icon: <Building2 size={22} />,
      color: "blue"
    },

    {
      title: "Completed",
      value: stats.completedVendors || 0,
      subtitle: "Assessments Finished",
      icon: <CheckCircle size={22} />,
      color: "green"
    },

    {
      title: "Pending",
      value: stats.pendingVendors || 0,
      subtitle: "Awaiting Review",
      icon: <Clock size={22} />,
      color: "orange"
    },

    {
      title: "High Risk",
      value: stats.highRiskVendors || 0,
      subtitle: "Require Attention",
      icon: <ShieldAlert size={22} />,
      color: "red"
    }
  ];

  return (
    <div className="vendorstats">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`vendorstats-card ${card.color}`}
        >

          <div className="vendorstats-header">

            <div className="vendorstats-title">
              {card.title}
            </div>

            <div className={`vendorstats-icon ${card.color}`}>
              {card.icon}
            </div>

          </div>

          <div className="vendorstats-value">
            {card.value}
          </div>

          <div className="vendorstats-subtitle">
            {card.subtitle}
          </div>

        </div>
      ))}

    </div>
  );
}

export default VendorStats;