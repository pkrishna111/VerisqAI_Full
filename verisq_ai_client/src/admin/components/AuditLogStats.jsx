import "../styles/AuditLogStats.css";

function AuditLogStats({
  stats
}) {

  return (
    <div className="auditlogstats">

      <div className="auditlogstats-card">

        <span>
          Total Logs
        </span>

        <h2>
          {stats.totalLogs || 0}
        </h2>

      </div>

      <div className="auditlogstats-card">

        <span>
          Today's Logs
        </span>

        <h2>
          {stats.todayLogs || 0}
        </h2>

      </div>

      <div className="auditlogstats-card">

        <span>
          User Actions
        </span>

        <h2>
          {stats.userActions || 0}
        </h2>

      </div>

      <div className="auditlogstats-card">

        <span>
          AI Actions
        </span>

        <h2>
          {stats.aiActions || 0}
        </h2>

      </div>

    </div>
  );
}

export default AuditLogStats;