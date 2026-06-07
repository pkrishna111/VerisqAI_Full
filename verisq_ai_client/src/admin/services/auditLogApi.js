import axios from "axios";

const API_BASE =
  "https://localhost:7183";

// ==========================================
// GET ALL LOGS
// ==========================================

export const getAuditLogs =
  async () => {

    const response =
      await axios.get(
        `${API_BASE}/api/admin/audit-logs`
      );

    return response.data;
  };

// ==========================================
// GET RECENT LOGS
// ==========================================

export const getRecentLogs =
  async () => {

    const response =
      await axios.get(
        `${API_BASE}/api/admin/audit-logs/recent`
      );

    return response.data;
  };

// ==========================================
// GET STATS
// ==========================================

export const getAuditLogStats =
  async () => {

    const response =
      await axios.get(
        `${API_BASE}/api/admin/audit-logs/stats`
      );

    return response.data;
  };

// ==========================================
// SEARCH
// ==========================================

export const searchAuditLogs =
  async (query) => {

    const response =
      await axios.get(
        `${API_BASE}/api/admin/audit-logs/search`,
        {
          params: {
            query
          }
        }
      );

    return response.data;
  };

// ==========================================
// FILTER BY EVENT TYPE
// ==========================================

export const getLogsByEventType =
  async (eventType) => {

    const response =
      await axios.get(
        `${API_BASE}/api/admin/audit-logs/event/${eventType}`
      );

    return response.data;
  };