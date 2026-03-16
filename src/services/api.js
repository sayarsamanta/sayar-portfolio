import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5174/api", // replace with your backend URL
});

// Add request interceptor to automatically attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // ✅ get token dynamically
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
