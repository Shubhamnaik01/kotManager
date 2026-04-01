import axios from "axios";

const isProduction = import.meta.env.MODE == "production";

const base = isProduction ? "/api" : "http://localhost:2000/api/";

const baseURL = axios.create({
  baseURL: base,
  withCredentials: true,
});

baseURL.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

baseURL.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default baseURL;
