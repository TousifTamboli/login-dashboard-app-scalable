import axios from "axios";

const API = axios.create({
  baseURL: "",
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (!originalRequest) {
      return Promise.reject(err);
    }

    if (originalRequest.url?.includes("/api/auth/refresh")) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await API.post("/api/auth/refresh");
        return API(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
