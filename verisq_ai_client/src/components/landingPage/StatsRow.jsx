function StatsRow() {
  return (
    <div className="stats-row">
      <div className="stat-item">
        <div className="stat-number">20</div>
        <div className="stat-label">min/week</div>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-item">
        <div className="stat-number">0</div>
        <div className="stat-label">analysts needed</div>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-item">
        <div className="stat-number">5</div>
        <div className="stat-label">vendors free</div>
      </div>
    </div>
  )
}

export default StatsRow
