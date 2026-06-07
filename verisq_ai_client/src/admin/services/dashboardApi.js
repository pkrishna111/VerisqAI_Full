import axios from "axios";

const API_BASE = "https://localhost:7183";

export const getUserGrowth = async () => {
  const response = await axios.get(
    `${API_BASE}/api/admin/dashboard/user-growth`
  );

  return response.data;
};

export const getVendorRisk = async () => {
  const response = await axios.get(
    `${API_BASE}/api/admin/dashboard/vendor-risk`
  );

  return response.data;
};

export const getRecentActivity = async () => {
  const response = await axios.get(
    `${API_BASE}/api/admin/dashboard/recent-activity`
  );

  return response.data;
};