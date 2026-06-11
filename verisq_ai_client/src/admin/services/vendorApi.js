import adminAxios from "./adminAxios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://localhost:7183";

// =====================================
// GET ALL VENDORS
// =====================================
export const getVendors = async () => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/vendors`
  );

  return response.data;
};

// =====================================
// GET VENDOR BY ID
// =====================================
export const getVendorById = async (
  vendorId
) => {
  const response = await adminAxios.get(
    `${API_BASE}/api/admin/vendors/${vendorId}`
  );

  return response.data;
};

// =====================================
// DELETE VENDOR
// =====================================
export const deleteVendor = async (
  vendorId
) => {
  const response = await adminAxios.delete(
    `${API_BASE}/api/admin/vendors/${vendorId}`
  );

  return response.data;
};

// =====================================
// VENDOR STATS
// =====================================
// export const getVendorStats = async () => {
//   const response = await adminAxios.get(
//     `${API_BASE}/api/admin/vendors/stats`
//   );

//   return response.data;
// };

export const getVendorStats =
  async () => {

    const response =
      await adminAxios.get(
        `${API_BASE}/api/admin/vendors/stats`
      );

    return response.data;
  };