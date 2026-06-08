import {
  Bot,
  CheckCircle,
  XCircle,
  Brain,
  Timer
} from "lucide-react";

import "../styles/AiMonitoringStats.css";

function AiMonitoringStats({ stats }) {

  const cards = [
    {
      title: "Total Requests",
      value: stats.totalRequests || 0,
      subtitle: "AI Requests Processed",
      icon: <Bot size={22} />,
      color: "blue"
    },

    {
      title: "Success Rate",
      value: `${stats.successRate || 0}%`,
      subtitle: "Successful Responses",
      icon: <CheckCircle size={22} />,
      color: "green"
    },

    {
      title: "Failed Requests",
      value: stats.failedRequests || 0,
      subtitle: "Request Failures",
      icon: <XCircle size={22} />,
      color: "red"
    },

    {
      title: "Avg Confidence",
      value: Number(
        stats.averageConfidence || 0
      ).toFixed(2),
      subtitle: "Prediction Confidence",
      icon: <Brain size={22} />,
      color: "purple"
    },

    {
      title: "Avg Response Time",
      value: `${Number(
        stats.averageResponseTime || 0
      ).toFixed(2)}s`,
      subtitle: "Average Processing Time",
      icon: <Timer size={22} />,
      color: "orange"
    }
  ];

  return (
    <div className="aimonitoringstats">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`aimonitoringstats-card ${card.color}`}
        >

          <div className="aimonitoringstats-header">

            <div className="aimonitoringstats-title">
              {card.title}
            </div>

            <div
              className={`aimonitoringstats-icon ${card.color}`}
            >
              {card.icon}
            </div>

          </div>

          <div className="aimonitoringstats-value">
            {card.value}
          </div>

          <div className="aimonitoringstats-subtitle">
            {card.subtitle}
          </div>

        </div>
      ))}

    </div>
  );
}

export default AiMonitoringStats;