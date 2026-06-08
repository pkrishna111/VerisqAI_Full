import {
  FileText,
  CalendarDays,
  UserCog,
  Bot
} from "lucide-react";

import "../styles/AuditLogStats.css";

function AuditLogStats({ stats }) {

  const cards = [
    {
      title: "Total Logs",
      value: stats.totalLogs || 0,
      subtitle: "System Audit Records",
      icon: <FileText size={22} />,
      color: "blue"
    },

    {
      title: "Today's Logs",
      value: stats.todayLogs || 0,
      subtitle: "Generated Today",
      icon: <CalendarDays size={22} />,
      color: "green"
    },

    {
      title: "User Actions",
      value: stats.userActions || 0,
      subtitle: "User Activity Events",
      icon: <UserCog size={22} />,
      color: "orange"
    },

    {
      title: "AI Actions",
      value: stats.aiActions || 0,
      subtitle: "AI Generated Events",
      icon: <Bot size={22} />,
      color: "purple"
    }
  ];

  return (
    <div className="auditlogstats">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`auditlogstats-card ${card.color}`}
        >

          <div className="auditlogstats-header">

            <div className="auditlogstats-title">
              {card.title}
            </div>

            <div
              className={`auditlogstats-icon ${card.color}`}
            >
              {card.icon}
            </div>

          </div>

          <div className="auditlogstats-value">
            {card.value}
          </div>

          <div className="auditlogstats-subtitle">
            {card.subtitle}
          </div>

        </div>
      ))}

    </div>
  );
}

export default AuditLogStats;