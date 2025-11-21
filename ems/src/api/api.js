import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE || "https://employee-management-system-fullstack-a18n.onrender.com/api",
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("ems_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
