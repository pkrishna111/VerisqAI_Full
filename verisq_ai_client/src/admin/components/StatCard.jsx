import "../styles/StatCard.css";

import {
  Users,
  CheckCircle,
  Clock,
  Building2,
  ClipboardList,
  FileText,
  AlertTriangle,
  Bot
} from "lucide-react";

function StatCard({ title, value }) {
  const cardConfig = {
    "Total Users": {
      icon: <Users size={22} />,
      color: "blue",
      subtitle: "Registered accounts"
    },

    "Approved Users": {
      icon: <CheckCircle size={22} />,
      color: "green",
      subtitle: "Active users"
    },

    "Pending Users": {
      icon: <Clock size={22} />,
      color: "orange",
      subtitle: "Awaiting approval"
    },

    "Total Vendors": {
      icon: <Building2 size={22} />,
      color: "purple",
      subtitle: "Registered vendors"
    },

    "Questionnaires": {
      icon: <ClipboardList size={22} />,
      color: "indigo",
      subtitle: "Created forms"
    },

    "Completed Questionnaires": {
      icon: <FileText size={22} />,
      color: "emerald",
      subtitle: "Completed forms"
    },

    "Scorecards": {
      icon: <FileText size={22} />,
      color: "teal",
      subtitle: "Generated reports"
    },

    "Critical Findings": {
      icon: <AlertTriangle size={22} />,
      color: "red",
      subtitle: "Require attention"
    }
  };

  const config = cardConfig[title] || {
    icon: <Bot size={22} />,
    color: "blue",
    subtitle: "Dashboard metric"
  };

  return (
    <div className={`statcard ${config.color}`}>

      <div className="statcard-header">

        <div className="statcard-title">
          {title}
        </div>

        <div className={`statcard-icon ${config.color}`}>
          {config.icon}
        </div>

      </div>

      <div className="statcard-value">
        {value}
      </div>

      <div className="statcard-subtitle">
        {config.subtitle}
      </div>

    </div>
  );
}

export default StatCard;