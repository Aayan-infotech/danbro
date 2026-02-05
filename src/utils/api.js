import axios from 'axios';
import { API_BASE_URL } from './apiUrl';
import { getAccessToken, getRefreshToken } from './cookies';
import { getStoredLocation } from './location';
import { refreshTokenApi } from './apiService';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token and location headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add lat and long headers
    const location = getStoredLocation();
    config.headers.lat = location.lat.toString();
    config.headers.long = location.long.toString();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Track if we're already refreshing to avoid multiple refresh calls
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (cb) => {
  refreshSubscribers.push(cb);
};

// Response interceptor: on 401 try refresh token, then retry or redirect to login
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refresh = getRefreshToken();
    if (!refresh) {
      const { clearAuthCookies } = await import('./cookies');
      clearAuthCookies();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Wait for the in-flight refresh to finish, then retry with new token
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { accessToken } = await refreshTokenApi(refresh);
      isRefreshing = false;
      onRefreshed(accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshErr) {
      isRefreshing = false;
      onRefreshed(null);
      const { clearAuthCookies } = await import('./cookies');
      clearAuthCookies();
      window.location.href = '/login';
      return Promise.reject(refreshErr);
    }
  }
);

export default api;

