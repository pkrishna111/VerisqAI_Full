import {
  Users,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

import "../styles/UserStats.css";

function UserStats({ stats }) {

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      subtitle: "Registered Accounts",
      icon: <Users size={22} />,
      color: "blue"
    },
    {
      title: "Approved Users",
      value: stats.approvedUsers || 0,
      subtitle: "Active Accounts",
      icon: <CheckCircle size={22} />,
      color: "green"
    },
    {
      title: "Pending Users",
      value: stats.pendingUsers || 0,
      subtitle: "Awaiting Approval",
      icon: <Clock size={22} />,
      color: "orange"
    },
    {
      title: "Rejected Users",
      value: stats.rejectedUsers || 0,
      subtitle: "Access Denied",
      icon: <XCircle size={22} />,
      color: "red"
    }
  ];

  return (
    <div className="userstats">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`userstats-card ${card.color}`}
        >

          <div className="userstats-header">

            <div className="userstats-title">
              {card.title}
            </div>

            <div className={`userstats-icon ${card.color}`}>
              {card.icon}
            </div>

          </div>

          <div className="userstats-value">
            {card.value}
          </div>

          <div className="userstats-subtitle">
            {card.subtitle}
          </div>

        </div>
      ))}

    </div>
  );
}

export default UserStats;