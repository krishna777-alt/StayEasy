import axios from "axios";
import { store } from "../store/app";
import { logout, setCredentials } from "../features/auth/authSlice";
import { getUserFromAccessToken } from "../features/auth/accessToken";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    const requestPath = originalRequest.url?.split("?")[0];
    if (
      ["/login", "/signup", "/refresh", "/logout"].includes(requestPath)
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${API_BASE_URL}/refresh`, {}, { withCredentials: true })
          .then((response) => {
            const accessToken = response.data.accessToken;
            const tokenUser = getUserFromAccessToken(accessToken);

            if (!tokenUser) {
              throw new Error(
                "Refresh response contains an invalid access token",
              );
            }

            const currentUser = store.getState().auth.user;
            store.dispatch(
              setCredentials({
                accessToken,
                user: currentUser
                  ? { ...currentUser, ...tokenUser }
                  : tokenUser,
              }),
            );

            return accessToken;
          })
          .catch((refreshError) => {
            store.dispatch(logout());
            throw refreshError;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const accessToken = await refreshPromise;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
