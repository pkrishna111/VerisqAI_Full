import "../../styles/vendor-details/statCard.css";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "primary"
}) {
  return (
    <div className={`vd-stat-card vd-stat-card--${variant}`}>
      <div className="vd-stat-card__top">
        <div>
          <p className="vd-stat-card__title">{title}</p>
          <h3 className="vd-stat-card__value">{value}</h3>
        </div>

        {Icon && (
          <div className="vd-stat-card__icon">
            <Icon size={22} />
          </div>
        )}
      </div>

      {subtitle && (
        <p className="vd-stat-card__subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default StatCard;