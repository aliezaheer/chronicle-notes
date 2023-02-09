import axios from "axios";

const URL = "http://localhost:8000/";

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return porecessResponse(response);
  },
  (error) => {
    return Promise.reject(processError(response));
  }
);
