import "../styles/AuditLogFilters.css";

function AuditLogFilters({
  searchQuery,
  selectedEvent,
  selectedSeverity,
  selectedDate,
  onSearch,
  onFilterChange,
  onSeverityChange,
  onDateChange
}) {

  return (

    <div className="auditlogfilters">

      <input
        type="text"
        placeholder="Search logs..."
        value={searchQuery}
        onChange={(e) =>
          onSearch(
            e.target.value
          )
        }
      />

      <select
        value={selectedEvent}
        onChange={(e) =>
          onFilterChange(
            e.target.value
          )
        }
      >
        <option value="">
          All Events
        </option>

        <option value="User Management">
          User Management
        </option>

        <option value="Vendor Management">
          Vendor Management
        </option>

        <option value="AI Analysis">
          AI Analysis
        </option>

        <option value="Security">
          Security
        </option>

      </select>

      <select
        value={selectedSeverity}
        onChange={(e) =>
          onSeverityChange(
            e.target.value
          )
        }
      >
        <option value="">
          All Severity
        </option>

        <option value="Info">
          Info
        </option>

        <option value="Success">
          Success
        </option>

        <option value="Warning">
          Warning
        </option>

        <option value="Delete">
          Delete
        </option>

      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) =>
          onDateChange(
            e.target.value
          )
        }
      />

    </div>

  );
}

export default AuditLogFilters;