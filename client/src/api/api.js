import axios from "axios";
import { API_NOTIFICATION, SERVICE_URLS } from "../constants/config";

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
    // Stop global loader here
    return porecessResponse(response);
  },
  (error) => {
    // Stop global loader here in case of error
    return Promise.reject(processError(error));
  }
);

//---------------------//
// If success => return { isSuccess: true, data: Object}
//If fail => return { isFaliure: true, status: string, msg: string, code: int}
const porecessResponse = (response) => {
  if (response?.status === 200) {
    return { isSccess: true, data: response.data };
  } else {
    return {
      isFaliure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

//---------------------//
// If success => return { isSuccess: true, data: Object}
//If fail => return { isFaliure: true, status: string, msg: string, code: int}
const processError = () => {
  if (error.response) {
    //request made and server responded with a stus other
    // that fails out of the range 200
    console.log("Error in response: ", error.toJson());
    return {
      isError: true,
      msg: API_NOTIFICATION.responseFaliure,
      code: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response was recieved
    console.log("Error in Request: ", error.toJson());
    return {
      isError: true,
      msg: API_NOTIFICATION.requestFaliure,
      code: "",
    };
  } else {
    // Something happened in setting up request that triggers an error
    console.log("Error in Network: ", error.toJson());
    return {
      isError: true,
      msg: API_NOTIFICATION.networkFaliure,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export { API };
