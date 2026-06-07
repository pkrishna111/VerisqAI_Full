import axios from "axios";

const API_BASE = "https://localhost:7183";

export const getDashboard = async () => {
  console.log("Calling API...");

  const response = await axios.get(
    `${API_BASE}/api/admin/dashboard`
  );

  console.log("API Response:", response.data);

  return response.data;
};