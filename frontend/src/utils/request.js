import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/v1/",
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
    if (resp.status === 401 && !location.pathname.startsWith("/login")) {
      location.href = "/login";
    }
    return resp;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
