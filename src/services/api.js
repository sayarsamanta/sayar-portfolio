import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5174/api", // replace with your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
