import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/apiService';

/**
 * Custom hook to fetch and manage products with pagination
 * @param {number} categoryId - Optional category ID to filter products
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 20)
 * @param {string} search - Search query (default: '')
 * @returns {Object} Object containing products, loading state, error, pagination info, and loadMore function
 */
export const useProducts = (categoryId = null, page = 1, limit = 20, search = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasMore: false
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If no category is selected, set empty products and return
        if (!categoryId) {
          setProducts([]);
          setLoading(false);
          setPagination({
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0,
            hasMore: false
          });
          return;
        }
        
        const response = await fetchProducts(categoryId, page, limit, search);
        
        if (!response?.success) {
          setProducts([]);
          setError(null); 
          setPagination({
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0,
            hasMore: false
          });
          return;
        }
        
        // Check for success and data array
        let productsData = [];
        if (response?.success && response?.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response?.data && Array.isArray(response.data)) {
          productsData = response.data;
        }
        
        // Update pagination info if available
        if (response?.pagination) {
          setPagination({
            page: response.pagination.page || page,
            limit: response.pagination.limit || limit,
            total: response.pagination.total || 0,
            totalPages: response.pagination.totalPages || 0,
            hasMore: (response.pagination.page || page) < (response.pagination.totalPages || 0)
          });
        } else {
          // If no pagination metadata, estimate based on data length
          const hasMore = productsData.length === limit;
          setPagination({
            page: page,
            limit: limit,
            total: 0,
            totalPages: 0,
            hasMore: hasMore
          });
        }
        
        // Always set products to current page data (component will handle accumulation)
        setProducts(productsData);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error loading products:', err);
        setProducts([]);
        setPagination({
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasMore: false
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId, page, limit, search]);

  return { products, loading, error, pagination };
};

