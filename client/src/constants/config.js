export const API_NOTIFICATION = {
  loading: {
    title: "Loading...",
    message: "Please wait to load data.",
  },
  success: {
    title: " Success",
    message: "Data successfully loaded",
  },

  // Error in case of response fail
  responseFaliure: {
    title: "Error",
    message:
      "Error while Fetching response from the server, please try again later",
  },
  // Error in case of request fail
  requestFaliure: {
    title: "Error",
    message: "Error while parsing request data",
  },
  networkFaliure: {
    title: "Error",
    message:
      "Unable to send request to server. Pleasae check your internet connection and try again later.",
  },
};

// API Service Call
//SAPMLE API REQUEST
// Need Service call: {url: "/", method: "POST/GET/PUT/DELETE" params: true/false, query: true/false}
export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
};
