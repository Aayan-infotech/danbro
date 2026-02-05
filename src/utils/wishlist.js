// Wishlist utility functions

import api from './api';
import { getAccessToken } from './cookies';
import { store } from '../store/store';
import { addToGuestWishlist, removeFromGuestWishlist } from '../store/guestSlice';

const WISHLIST_ICON_LOADING_EVENT = 'headerWishlistLoading';

// In-memory cache + dedupe: reduce repeated /wishlist/get calls across TopHeader, ProductGrid, Carousel, etc.
const WISHLIST_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes
let wishlistCache = { data: null, timestamp: 0 };
let wishlistInFlight = null;

/** Invalidate wishlist cache (call after add/remove so next getWishlist refetches) */
export const invalidateWishlistCache = () => {
  wishlistCache = { data: null, timestamp: 0 };
  wishlistInFlight = null;
};

/**
 * Add a product to wishlist (guest: LocalStorage + Redux; logged-in: API)
 * @param {string} productId - The product ID to add
 * @returns {Promise} API response or guest success object
 */
export const addToWishlist = async (productId) => {
  window.dispatchEvent(new CustomEvent(WISHLIST_ICON_LOADING_EVENT, { detail: { loading: true } }));
  try {
    if (!productId) throw new Error('ProductId is required');
    const token = getAccessToken();
    if (!token) {
      store.dispatch(addToGuestWishlist(productId));
      window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      return { success: true, message: 'Added to wishlist', data: [] };
    }
    const payload = { productId };
    const response = await api.post('/wishlist/add', payload);
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  } finally {
    window.dispatchEvent(new CustomEvent(WISHLIST_ICON_LOADING_EVENT, { detail: { loading: false } }));
  }
};

/**
 * Remove a product from wishlist (guest: Redux; logged-in: API)
 * @param {string} productId - The product ID to remove
 * @returns {Promise} API response or guest success
 */
export const removeFromWishlist = async (productId) => {
  window.dispatchEvent(new CustomEvent(WISHLIST_ICON_LOADING_EVENT, { detail: { loading: true } }));
  try {
    if (!productId) throw new Error('ProductId is required');
    const token = getAccessToken();
    if (!token) {
      store.dispatch(removeFromGuestWishlist(productId));
      window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      return { success: true };
    }
    const payload = { productId };
    const response = await api.post('/wishlist/remove', payload);
    invalidateWishlistCache();
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  } finally {
    window.dispatchEvent(new CustomEvent(WISHLIST_ICON_LOADING_EVENT, { detail: { loading: false } }));
  }
};

/**
 * Get wishlist items (guest: from Redux/LocalStorage; logged-in: API)
 * Uses in-memory cache + request deduplication to avoid repeated /wishlist/get calls.
 * @returns {Promise} API response or guest wishlist data { data: productIds[] }
 */
export const getWishlist = async () => {
  const token = getAccessToken();
  if (!token) {
    const state = store.getState();
    const ids = state.guest?.guestWishlist ?? [];
    return { data: ids.map((id) => ({ productId: id })), success: true };
  }
  const now = Date.now();
  if (wishlistCache.data != null && now - wishlistCache.timestamp < WISHLIST_CACHE_TTL_MS) {
    return wishlistCache.data;
  }
  if (wishlistInFlight) {
    return wishlistInFlight;
  }
  wishlistInFlight = api.get('/wishlist/get').then((res) => {
    const data = res?.data ?? res;
    wishlistCache = { data, timestamp: Date.now() };
    wishlistInFlight = null;
    return data;
  }).catch((error) => {
    wishlistInFlight = null;
    console.error('Error fetching wishlist:', error);
    throw error;
  });
  return wishlistInFlight;
};

/**
 * Check if a product is in wishlist (guest: from Redux; logged-in: API)
 * @param {string} productId - The product ID to check
 * @returns {Promise<boolean>} True if in wishlist
 */
export const isInWishlist = async (productId) => {
  try {
    const token = getAccessToken();
    if (!token) {
      const state = store.getState();
      const ids = state.guest?.guestWishlist ?? [];
      return ids.includes(productId);
    }
    const wishlistData = await getWishlist();
    if (wishlistData && wishlistData.data && Array.isArray(wishlistData.data)) {
      return wishlistData.data.some(
        (item) => {
          const product = item.product || item;
          return product.productId === productId || product._id === productId || item.productId === productId;
        }
      );
    }
    return false;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

