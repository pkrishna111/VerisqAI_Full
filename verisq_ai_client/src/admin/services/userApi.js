import adminAxios from "./adminAxios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://localhost:7183";

// ==============================
// GET ALL USERS
// ==============================
export const getUsers = async () => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/users`
  );

  return response.data;
};

// ==============================
// GET USER BY ID
// ==============================
export const getUserById = async (
  userId
) => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/users/${userId}`
  );

  return response.data;
};

// ==============================
// APPROVE USER
// ==============================
export const approveUser = async (
  userId
) => {
  const response = await adminAxios.post(
    `${API_BASE}/api/admin/users/${userId}/approve`
  );

  return response.data;
};

// ==============================
// REJECT USER
// ==============================
export const rejectUser = async (
  userId
) => {
  const response = await adminAxios.post(
    `${API_BASE}/api/admin/users/${userId}/reject`
  );

  return response.data;
};

// ==============================
// DELETE USER
// ==============================
export const deleteUser = async (
  userId
) => {
  const response = await adminAxios.delete(
    `${API_BASE}/api/admin/users/${userId}`
  );

  return response.data;
};

// ==============================
// UPDATE USER
// ==============================
export const updateUser = async (
  userId,
  userData
) => {
  const response = await adminAxios.put(
    `${API_BASE}/api/admin/users/${userId}`,
    userData
  );

  return response.data;
};

// ==============================
// USER STATS
// ==============================
export const getUserStats = async () => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/users/stats`
  );

  return response.data;
};