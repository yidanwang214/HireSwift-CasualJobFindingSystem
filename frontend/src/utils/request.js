import axios from "axios";

export const baseUrl = "http://localhost:3000"
const client = axios.create({
  baseURL: baseUrl + "/v1/",
  timeout: 5000,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (error) => {
    if (error.response?.status === 401 && !location.pathname.startsWith("/login")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default client;
