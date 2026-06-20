import adminAxios from "./adminAxios";

const API_BASE = "https://verisqai-api.onrender.com";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getUserGrowth = async () => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/dashboard/user-growth`,
    getAuthHeaders()
  );

  return response.data;
};

export const getVendorRisk = async () => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/dashboard/vendor-risk`,
    getAuthHeaders()
  );

  return response.data;
};

export const getRecentActivity = async () => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/dashboard/recent-activity`,
    getAuthHeaders()
  );

  return response.data;
};