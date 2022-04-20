import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instance;
