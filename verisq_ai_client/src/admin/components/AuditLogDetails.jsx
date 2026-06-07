import "../styles/AuditLogDetails.css";

function AuditLogDetails({
  log
}) {

  if (!log) {

    return (
      <div className="auditlogdetails">

        <div className="auditlogdetails-empty">

          <h3>
            Log Details
          </h3>

          <p>
            Select an audit log
            from the timeline
            to view details.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="auditlogdetails">

      <div className="auditlogdetails-header">

        <h3>
          Event Details
        </h3>

      </div>

      <div className="auditlogdetails-content">

        <div className="auditlogdetails-row">

          <label>
            Event ID
          </label>

          <span>
            {log.id}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            Title
          </label>

          <span>
            {log.title}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            Event Type
          </label>

          <span>
            {log.eventType}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            User Email
          </label>

          <span>
            {log.userEmail}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            Entity Type
          </label>

          <span>
            {log.entityType}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            Entity ID
          </label>

          <span>
            {log.entityId}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            Severity
          </label>

          <span>
            {log.severity}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            Source
          </label>

          <span>
            {log.source}
          </span>

        </div>

        <div className="auditlogdetails-row">

          <label>
            Created At
          </label>

          <span>
            {
              new Date(
                log.createdAt
              ).toLocaleString()
            }
          </span>

        </div>

        <div className="auditlogdetails-description">

          <label>
            Description
          </label>

          <p>
            {log.description}
          </p>

        </div>

      </div>

    </div>
  );
}

export default AuditLogDetails;