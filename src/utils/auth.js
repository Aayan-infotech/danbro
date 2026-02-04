// Authentication utility functions

import api from './api';
import { clearAuthCookies } from './cookies';

/**
 * Logout user
 * Calls the logout API and clears local auth cookies
 * @returns {Promise} API response
 */
export const logout = async () => {
  try {
    // Call logout API
    const response = await api.post('/user/logout');
    
    // Clear cookies regardless of API response
    clearAuthCookies();
    
    // Redirect to home page (not login)
    window.location.href = '/home';
    
    return response.data;
  } catch (error) {
    // Even if API call fails, clear local cookies
    console.error('Error during logout:', error);
    clearAuthCookies();
    
    // Redirect to home page (not login)
    window.location.href = '/home';
    
    // Return error for handling in UI if needed
    throw error;
  }
};

