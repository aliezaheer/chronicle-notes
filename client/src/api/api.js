import axios from "axios";
import { API_NOTIFICATION, SERVICE_URLS } from "../constants/config";

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    // Accept: "application/json, form-data",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  // below are two callback functions
  (response) => {
    // Stop global loader here
    return processResponse(response);
  },
  (error) => {
    // Stop global loader here in case of error
    return Promise.reject(processError(error));
  }
);

//---------------------//
// If success => return { isSuccess: true, data: Object}
//If fail => return { isFaliure: true, status: string, msg: string, code: int}
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
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
const processError = (error) => {
  if (error.response) {
    //request made and server responded with other than 200 status
    // that falls out of the range 200
    console.log("Error in response: ", error.toJSON());
    return {
      isFaliure: true,
      msg: API_NOTIFICATION.responseFaliure,
      code: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response was recieved
    console.log("Error in Request: ", error.toJSON());
    return {
      isFaliure: true,
      msg: API_NOTIFICATION.requestFaliure,
      code: "",
    };
  } else {
    // Something happened in setting up request that triggers an error
    console.log("Error in Network: ", error.toJSON());
    return {
      isFaliure: true,
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
