function KpiCard({
  label,
  value,
  subtext,
  icon: Icon,
  colorVar,
  bgVar
}) {
    return (
        <div
            className="kpi-card"
            style={{
                "--kpi-color": `var(${colorVar})`,
                "--kpi-bg": `var(${bgVar})`
            }}
        >
            <div className="kpi-header">
                <span className="kpi-label">{label}</span>
                <div className="kpi-icon">
                    <Icon size={22} />
                </div>
            </div>

            <div className="kpi-value">{value}</div>
            <div className="kpi-subtext">{subtext}</div>
        </div>
    );
}

export default KpiCard;
