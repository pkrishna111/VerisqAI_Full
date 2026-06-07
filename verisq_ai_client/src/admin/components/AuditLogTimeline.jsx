import "../styles/AuditLogTimeline.css";

function AuditLogTimeline({
  logs = [],
  onSelectLog
}) {

  const getSeverityClass = (
    severity
  ) => {

    switch (severity) {

      case "Error":
        return "auditlogtimeline-error";

      case "Warning":
        return "auditlogtimeline-warning";

      case "Success":
        return "auditlogtimeline-success";

      default:
        return "auditlogtimeline-info";
    }
  };

  return (
    <div className="auditlogtimeline">

      <div className="auditlogtimeline-header">

        <h3>
          Activity Timeline
        </h3>

      </div>

      <div className="auditlogtimeline-list">

        {logs.length === 0 ? (

          <div className="auditlogtimeline-empty">

            No audit logs found

          </div>

        ) : (

          logs.map(log => (

            <div
              key={log.id}
              className="auditlogtimeline-item"
              onClick={() =>
                onSelectLog(log)
              }
            >

              <div
                className="
                auditlogtimeline-dot
                "
              />

              <div
                className="
                auditlogtimeline-content
                "
              >

                <div
                  className="
                  auditlogtimeline-top
                  "
                >

                  <h4>
                    {log.title}
                  </h4>

                  <span
                    className={
                      getSeverityClass(
                        log.severity
                      )
                    }
                  >
                    {log.severity}
                  </span>

                </div>

                <p>
                  {log.description}
                </p>

                <div
                  className="
                  auditlogtimeline-meta
                  "
                >

                  <span>
                    {log.eventType}
                  </span>

                  <span>
                    {log.userEmail}
                  </span>

                  <span>
                    {
                      new Date(
                        log.createdAt
                      ).toLocaleString()
                    }
                  </span>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default AuditLogTimeline;