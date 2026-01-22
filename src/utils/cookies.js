import Cookies from 'js-cookie';

// Cookie names
export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

// Set access token in cookie
export const setAccessToken = (token) => {
  const isProduction = window.location.protocol === 'https:';
  Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, token, { 
    expires: 7, // 7 days
    secure: isProduction,
    sameSite: 'strict'
  });
};

// Get access token from cookie
export const getAccessToken = () => {
  return Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);
};

// Remove access token from cookie
export const removeAccessToken = () => {
  Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN);
};

// Set refresh token in cookie
export const setRefreshToken = (token) => {
  const isProduction = window.location.protocol === 'https:';
  Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, token, { 
    expires: 30, // 30 days
    secure: isProduction,
    sameSite: 'strict'
  });
};

// Get refresh token from cookie
export const getRefreshToken = () => {
  return Cookies.get(COOKIE_NAMES.REFRESH_TOKEN);
};

// Remove refresh token from cookie
export const removeRefreshToken = () => {
  Cookies.remove(COOKIE_NAMES.REFRESH_TOKEN);
};

// Clear all auth cookies
export const clearAuthCookies = () => {
  removeAccessToken();
  removeRefreshToken();
};

// Legacy functions for backward compatibility (using accessToken)
export const setAuthToken = setAccessToken;
export const getAuthToken = getAccessToken;
export const removeAuthToken = removeAccessToken;

