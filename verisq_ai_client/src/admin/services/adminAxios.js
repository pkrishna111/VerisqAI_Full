import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://verisqai-api.onrender.com"
});

adminAxios.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default adminAxios;