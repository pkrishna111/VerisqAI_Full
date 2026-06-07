import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import AuditLogStats from "../components/AuditLogStats";
import AuditLogTimeline from "../components/AuditLogTimeline";
import AuditLogDetails from "../components/AuditLogDetails";
import AuditLogFilters from "../components/AuditLogFilters";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  getAuditLogs,
  getAuditLogStats
} from "../services/auditLogApi";

import "../styles/AuditLogs.css";

function AuditLogs() {

  const [logs, setLogs] =
    useState([]);

  const [allLogs, setAllLogs] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [selectedLog,
    setSelectedLog] =
    useState(null);

  const [searchQuery,
    setSearchQuery] =
    useState("");

  const [selectedEvent,
    setSelectedEvent] =
    useState("");

  const [selectedSeverity,
    setSelectedSeverity] =
    useState("");

  const [selectedDate,
    setSelectedDate] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  const [currentPage, setCurrentPage] =
    useState(1);

  const logsPerPage = 5;

  // ==========================================
  // LOAD DATA
  // ==========================================

  const loadData = async () => {

    try {

      const logsData =
        await getAuditLogs();

      const statsData =
        await getAuditLogStats();

      const auditLogs =
        Array.isArray(logsData)
          ? logsData
          : [];

      setLogs(
        auditLogs
      );

      setAllLogs(
        auditLogs
      );

      setStats(
        statsData
      );

    }
    catch (error) {

      console.error(
        "Audit Logs Error:",
        error
      );

    }

  };

  // ==========================================
  // COMBINED FILTERS
  // ==========================================

  const applyFilters = (
    search,
    eventType,
    severity,
    date
  ) => {

    let filtered =
      [...allLogs];

    // Search

    if (search) {

      filtered =
        filtered.filter(log =>

          log.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          log.description
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          log.userEmail
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );
    }

    // Event Type

    if (eventType) {

      filtered =
        filtered.filter(
          log =>
            log.eventType ===
            eventType
        );
    }

    // Severity

    if (severity) {

      filtered =
        filtered.filter(
          log =>
            log.severity ===
            severity
        );
    }

    // Date

    if (date) {

      filtered =
        filtered.filter(log => {

          const logDate =
            new Date(
              log.createdAt
            )
              .toISOString()
              .split("T")[0];

          return logDate === date;

        });
    }

    setLogs(
      filtered
    );

    setCurrentPage(
      1
    );
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch =
    (query) => {

      setSearchQuery(
        query
      );

      applyFilters(
        query,
        selectedEvent,
        selectedSeverity,
        selectedDate
      );
    };

  // ==========================================
  // EVENT FILTER
  // ==========================================

  const handleFilterChange =
    (eventType) => {

      setSelectedEvent(
        eventType
      );

      applyFilters(
        searchQuery,
        eventType,
        selectedSeverity,
        selectedDate
      );
    };

  // ==========================================
  // SEVERITY FILTER
  // ==========================================

  const handleSeverityChange =
    (severity) => {

      setSelectedSeverity(
        severity
      );

      applyFilters(
        searchQuery,
        selectedEvent,
        severity,
        selectedDate
      );
    };

  // ==========================================
  // DATE FILTER
  // ==========================================

  const handleDateChange =
    (date) => {

      setSelectedDate(
        date
      );

      applyFilters(
        searchQuery,
        selectedEvent,
        selectedSeverity,
        date
      );
    };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters =
    () => {

      setSearchQuery("");

      setSelectedEvent("");

      setSelectedSeverity("");

      setSelectedDate("");

      setSelectedLog(
        null
      );

      setCurrentPage(
        1
      );

      setLogs(
        allLogs
      );
    };

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh =
    async () => {

      setCurrentPage(
        1
      );

      clearFilters();

      await loadData();
    };

  // ==========================================
  // EXPORT PDF
  // ==========================================

  const handleExportPdf =
    () => {

      const doc =
        new jsPDF();

      doc.setFontSize(
        18
      );

      doc.text(
        "VerisqAI Audit Logs Report",
        14,
        20
      );

      autoTable(
        doc,
        {
          startY: 30,

          head: [[
            "Event Type",
            "Title",
            "Severity",
            "Source",
            "User",
            "Date"
          ]],

          body:
            logs.map(
              log => [

                log.eventType || "",

                log.title || "",

                log.severity || "",

                log.source || "",

                log.userEmail || "",

                new Date(
                  log.createdAt
                ).toLocaleString()
              ]
            )
        }
      );

      doc.save(
        "AuditLogsReport.pdf"
      );
    };

  // ==========================================
  // PAGINATION
  // ==========================================

  const indexOfLastLog =
    currentPage * logsPerPage;

  const indexOfFirstLog =
    indexOfLastLog - logsPerPage;

  const currentLogs =
    logs.slice(
      indexOfFirstLog,
      indexOfLastLog
    );

  const totalPages =
    Math.ceil(
      logs.length /
      logsPerPage
    );

  return (

    <AdminLayout>

      <div className="auditlogs">

        <div className="auditlogs-header">

          <div>

            <h1>
              Audit Logs
            </h1>

            <p>
              Monitor all admin,
              vendor,
              AI and system
              activities
            </p>

          </div>

          <div className="auditlogs-actions">

            <button
              className="auditlogs-refresh-btn"
              onClick={
                handleRefresh
              }
            >
              Refresh
            </button>

            <button
              className="auditlogs-clear-btn"
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>

            <button
              className="auditlogs-pdf-btn"
              onClick={
                handleExportPdf
              }
            >
              Export PDF
            </button>

          </div>

        </div>

        {stats && (

          <AuditLogStats
            stats={stats}
          />

        )}

        <AuditLogFilters
          searchQuery={
            searchQuery
          }
          selectedEvent={
            selectedEvent
          }
          selectedSeverity={
            selectedSeverity
          }
          selectedDate={
            selectedDate
          }
          onSearch={
            handleSearch
          }
          onFilterChange={
            handleFilterChange
          }
          onSeverityChange={
            handleSeverityChange
          }
          onDateChange={
            handleDateChange
          }
        />

        <div className="auditlogs-content">

          <AuditLogTimeline
            logs={currentLogs}
            onSelectLog={
              setSelectedLog
            }
          />

          <AuditLogDetails
            log={selectedLog}
          />

        </div>

        <div className="auditlogs-pagination">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                prev => prev - 1
              )
            }
          >
            Previous
          </button>

          <span>
            Page {currentPage}
            of {totalPages || 1}
          </span>

          <button
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(
                prev => prev + 1
              )
            }
          >
            Next
          </button>

        </div>

      </div>

    </AdminLayout>

  );
}

export default AuditLogs;