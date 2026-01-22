// Cart utility functions

import api from './api';

/**
 * Add a product to cart
 * @param {string} productId - The product ID to add
 * @param {number|string} quantity - The quantity to add
 * @returns {Promise} API response
 */
export const addToCart = async (productId, quantity = 1) => {
  try {
    if (!productId) {
      throw new Error('ProductId is required');
    }
    
    const payload = {
      productId: productId,
      quantity: quantity.toString(),
    };
    
    // API call - axios instance already has Content-Type, Authorization, lat, and long headers
    const response = await api.post('/cart/add', payload);
    
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    console.error('ProductId sent:', productId);
    console.error('Quantity sent:', quantity);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

/**
 * Get cart items
 * @returns {Promise} API response with cart items
 */
export const getCart = async () => {
  try {
    // Headers (lat/long, Authorization) are automatically added by the axios interceptor
    const response = await api.get('/cart/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

/**
 * Increase item count in cart
 * @param {string} productId - The product ID to increase quantity
 * @returns {Promise} API response
 */
export const increaseItemCount = async (productId) => {
  try {
    if (!productId) {
      throw new Error('ProductId is required');
    }
    
    const payload = {
      productId: productId,
    };
    
    const response = await api.post('/cart/increaseItemCount', payload);
    return response.data;
  } catch (error) {
    console.error('Error increasing item count:', error);
    console.error('ProductId sent:', productId);
    throw error;
  }
};

/**
 * Decrease item count in cart
 * @param {string} productId - The product ID to decrease quantity
 * @returns {Promise} API response
 */
export const decreaseItemCount = async (productId) => {
  try {
    if (!productId) {
      throw new Error('ProductId is required');
    }
    
    const payload = {
      productId: productId,
    };
    
    // Note: API endpoint has typo "decreseItemCount" instead of "decreaseItemCount"
    const response = await api.post('/cart/decreseItemCount', payload);
    return response.data;
  } catch (error) {
    console.error('Error decreasing item count:', error);
    console.error('ProductId sent:', productId);
    throw error;
  }
};

/**
 * Remove item from cart (if API supports it)
 * @param {string} productId - The product ID to remove
 * @returns {Promise} API response
 */
export const removeFromCart = async (productId) => {
  try {
    if (!productId) {
      throw new Error('ProductId is required');
    }
    
    // This might need to be implemented based on actual API endpoint
    // For now, we can decrease quantity to 0 or use a remove endpoint if available
    const payload = {
      productId: productId,
    };
    
    // If there's a remove endpoint, use it. Otherwise, this is a placeholder
    const response = await api.post('/cart/remove', payload);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    console.error('ProductId sent:', productId);
    throw error;
  }
};

