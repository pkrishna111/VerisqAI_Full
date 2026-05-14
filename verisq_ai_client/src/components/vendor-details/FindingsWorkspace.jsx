import { useMemo, useState } from "react";

import FindingsSeverityPanel from "./FindingsSeverityPanel";
import FindingsList from "./FindingsList";

import "../../styles/vendor-details/findingsWorkspace.css";

function FindingsWorkspace({ findings = [] }) {
  const [selectedSeverity, setSelectedSeverity] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredFindings = useMemo(() => {
    let filtered = findings;

    // severity filter
    if (selectedSeverity !== "All") {
      filtered = filtered.filter(
        (finding) =>
          finding.severity === selectedSeverity
      );
    }

    // search filter
    if (searchTerm.trim()) {
      const query =
        searchTerm.toLowerCase();

      filtered = filtered.filter(
        (finding) =>
          finding.title
            .toLowerCase()
            .includes(query) ||

          finding.description
            .toLowerCase()
            .includes(query)
      );
    }

    return filtered;

  }, [
    findings,
    selectedSeverity,
    searchTerm
  ]);

  return (
    <section className="vd-findings-workspace">

      <div className="vd-findings-workspace__left">

        <FindingsSeverityPanel
          findings={findings}
          selectedSeverity={selectedSeverity}
          onSelectSeverity={setSelectedSeverity}
        />

      </div>

      <div className="vd-findings-workspace__right">

        <FindingsList
          findings={filteredFindings}
          selectedSeverity={selectedSeverity}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

      </div>

    </section>
  );
}

export default FindingsWorkspace;