// Authentication utility functions

import api from './api';
import { clearAuthCookies } from './cookies';
import { clearStoredLocation } from './location';

/**
 * Logout user
 * Calls the logout API and clears local auth cookies and stored location
 * @returns {Promise} API response
 */
export const logout = async () => {
  try {
    // Call logout API
    const response = await api.post('/user/logout');

    // Clear cookies and stored location (TopHeader/Cart use it)
    clearAuthCookies();
    clearStoredLocation();

    // Redirect to home page (not login)
    window.location.href = '/home';

    return response.data;
  } catch (error) {
    // Even if API call fails, clear local cookies and location
    console.error('Error during logout:', error);
    clearAuthCookies();
    clearStoredLocation();

    // Redirect to home page (not login)
    window.location.href = '/home';

    // Return error for handling in UI if needed
    throw error;
  }
};

