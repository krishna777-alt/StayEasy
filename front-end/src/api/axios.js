import axios from "axios";
// import { useSelector } from "react-redux";
import { store } from "../store/app";
import { logout, setAccessToken } from "../features/auth/authSlice";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",

  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // const accessToken = useSelector((state) => state.action.accessToken);
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
let isRefreshing = false;

let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));

  refreshSubscribers = [];
};

// ==========================================
// Response interceptor
// ==========================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Only handle 401
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Prevent retrying refresh request itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      store.dispatch(logout());

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ======================================
    // Refresh already happening
    // ======================================

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          resolve(api(originalRequest));
        });
      });
    }

    // ======================================
    // Start refresh
    // ======================================

    isRefreshing = true;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/refresh",

        {},

        {
          withCredentials: true,
        },
      );

      const newAccessToken = response.data.accessToken;

      // Update Redux
      store.dispatch(setAccessToken(newAccessToken));

      // Release waiting requests
      onRefreshed(newAccessToken);

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      // Refresh token invalid/expired
      store.dispatch(logout());

      refreshSubscribers = [];

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
