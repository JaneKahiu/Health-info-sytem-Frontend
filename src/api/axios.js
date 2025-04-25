import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Skip adding auth headers for registration endpoint
  if (config.url === "/auth/users/" || config.url.endsWith("/auth/users/")) {
    return config;
  }
  
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
export default api;  // Make sure this line exists