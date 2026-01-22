// Wishlist utility functions

import api from './api';

/**
 * Add a product to wishlist
 * @param {string} productId - The product ID to add
 * @returns {Promise} API response
 */
export const addToWishlist = async (productId) => {
  try {
    if (!productId) {
      throw new Error('ProductId is required');
    }
    
    // Payload matches the API format exactly
    const payload = {
      productId: productId,
    };
    
    // API call - axios instance already has Content-Type and Authorization headers
    const response = await api.post('/wishlist/add', payload);
    
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    console.error('ProductId sent:', productId);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

/**
 * Remove a product from wishlist
 * @param {string} productId - The product ID to remove
 * @returns {Promise} API response
 */
export const removeFromWishlist = async (productId) => {
  try {
    if (!productId) {
      throw new Error('ProductId is required');
    }
    
    const payload = {
      productId: productId,
    };
    
    const response = await api.post('/wishlist/remove', payload);
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    console.error('ProductId sent:', productId);
    throw error;
  }
};

/**
 * Get wishlist items
 * @param {number} lat - Latitude (optional, will use stored location if not provided)
 * @param {number} long - Longitude (optional, will use stored location if not provided)
 * @returns {Promise} API response with wishlist items
 */
export const getWishlist = async (lat, long) => {
  try {
    // Headers (lat/long) are automatically added by the axios interceptor
    const response = await api.get('/wishlist/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

/**
 * Check if a product is in wishlist
 * @param {string} productId - The product ID to check
 * @param {number} lat - Latitude
 * @param {number} long - Longitude
 * @returns {Promise<boolean>} True if product is in wishlist
 */
export const isInWishlist = async (productId, lat, long) => {
  try {
    const wishlistData = await getWishlist(lat, long);
    if (wishlistData && wishlistData.data && Array.isArray(wishlistData.data)) {
      return wishlistData.data.some(
        (item) => {
          // Support both old structure (item.product) and new structure (item directly)
          const product = item.product || item;
          return product.productId === productId || 
                 product._id === productId || 
                 item.productId === productId;
        }
      );
    }
    return false;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

