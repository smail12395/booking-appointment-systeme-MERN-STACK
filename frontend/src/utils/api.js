// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const lang = localStorage.getItem("lang") || "en";
  config.headers["x-user-lang"] = lang;
  return config;
});

export default api;
