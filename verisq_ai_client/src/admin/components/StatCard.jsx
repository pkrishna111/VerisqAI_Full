import "../styles/StatCard.css";

function StatCard({
  title,
  value
}) {
  return (
    <div className="statcard">
      <div className="statcard-title">
        {title}
      </div>

      <div className="statcard-value">
        {value}
      </div>
    </div>
  );
}

export default StatCard;