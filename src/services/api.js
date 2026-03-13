import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5174/api", // replace with your backend URL
});

// Add request interceptor to automatically attach token
api.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_BEARER_TOKEN; // or any auth storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
