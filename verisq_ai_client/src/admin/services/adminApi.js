import adminAxios from "./adminAxios";

export const getDashboard = async () => {

  const response =
    await adminAxios.get(
      "/api/admin/dashboard"
    );

  return response.data;
};