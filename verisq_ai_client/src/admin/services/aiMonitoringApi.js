import adminAxios from "./adminAxios";

const API_BASE =
  "https://localhost:7183";

// ==========================================
// DASHBOARD STATS
// ==========================================

export const getAiStats =
  async () => {

    const response =
      await adminAxios.get(
        `${API_BASE}/api/admin/ai-monitoring/stats`
      );

    return response.data;
  };

// ==========================================
// ACTIVITY
// ==========================================

export const getAiActivity =
  async () => {

    const response =
      await adminAxios.get(
        `${API_BASE}/api/admin/ai-monitoring/activity`
      );

    return response.data;
  };

// ==========================================
// MODEL USAGE
// ==========================================

export const getModelUsage =
  async () => {

    const response =
      await adminAxios.get(
        `${API_BASE}/api/admin/ai-monitoring/model-usage`
      );

    return response.data;
  };

// ==========================================
// PROCESSING VOLUME
// ==========================================

export const getProcessingVolume =
  async () => {

    const response =
      await adminAxios.get(
        `${API_BASE}/api/admin/ai-monitoring/processing-volume`
      );

    return response.data;
  };

// ==========================================
// FAILED REQUESTS
// ==========================================

export const getFailedRequests =
  async () => {

    const response =
      await adminAxios.get(
        `${API_BASE}/api/admin/ai-monitoring/failed-requests`
      );

    return response.data;
  };