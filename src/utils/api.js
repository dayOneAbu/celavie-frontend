import axios from "axios";
import { getStoredData } from "./storageHelper";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers["X-Authorization"] = getStoredData("user-token");
  // getStoredData("manager-token") || getStoredData("user-token");
  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message =
      typeof error.response !== "undefined"
        ? error.response.data.message
        : error.message;
    return Promise.reject(message);
  }
);

export default api;
