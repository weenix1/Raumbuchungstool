import { create } from "axios";

const apiUrl = process.env.REACT_APP_BACKEND;

const API = create({ baseURL: `${apiUrl}` });

const refreshAccessToken = async () => {
  const { data } = await API.post("users/refreshToken", {
    currentRefreshToken: localStorage.getItem("refreshToken"),
  });

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data;
};

API.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    config.headers = {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      "Content-Type": "application/json",
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  //By default we are forwarding the response as-is
  (response) => response,
  //But here we define the error handler
  async function (error) {
    // The configuration for the request that just failed:
    const failedRequest = error.config;

    if (
      // If unauthorized let's try to refresh the tokens...
      error.response.status === 401 &&
      // but won't retry if the failed request was already attempting to refresh the tokens
      failedRequest.url !== "/users/refreshToken"
    ) {
      await refreshAccessToken();

      const retryRequest = API(failedRequest);
      return retryRequest;
    } else {
      return Promise.reject(error);
    }
  }
);

export default API;
