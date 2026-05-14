import { Search } from "lucide-react";

import FindingCard from "./FindingCard";

import "../../styles/vendor-details/findingsList.css";

function FindingsList({
  findings = [],
  selectedSeverity,
  searchTerm,
  onSearchChange
}) {
  return (
    <div className="vd-findings-feed">

      <div className="vd-findings-feed__header">

        <div>
          <h2 className="vd-findings-feed__title">

            {selectedSeverity === "All"
              ? "All Findings"
              : `${selectedSeverity} Findings`}

          </h2>

          <p className="vd-findings-feed__subtitle">
            Detailed assessment findings and security observations
          </p>
        </div>

        <div className="vd-findings-feed__search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search findings..."
            value={searchTerm}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
          />

        </div>

      </div>

      {findings.length === 0 ? (
        <div className="vd-findings-feed__empty">

          No matching findings detected.

        </div>
      ) : (
        <div className="vd-findings-feed__list">

          {findings.map((finding) => (
            <FindingCard
              key={finding.id}
              finding={finding}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default FindingsList;