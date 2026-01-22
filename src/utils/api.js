import axios from 'axios';
import { API_BASE_URL } from './apiUrl';
import { getAccessToken } from './cookies';
import { getStoredLocation } from './location';

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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear cookies and redirect to login
      import('./cookies').then(({ clearAuthCookies }) => {
        clearAuthCookies();
        window.location.href = '/login';
      });
    }
    return Promise.reject(error);
  }
);

export default api;

