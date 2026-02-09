import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchProductSearch } from '../utils/apiService';

/**
 * Custom hook to fetch and manage products with pagination.
 * When search is non-empty, uses GET /product/search (with optional price range).
 * Otherwise uses getProductsByCategory.
 * @param {string|null} categoryId - Category ID (for category mode)
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 20)
 * @param {string} search - Search query (default: ''); when set, uses search API
 * @param {number|null} minPrice - Min price for search (optional)
 * @param {number|null} maxPrice - Max price for search (optional)
 * @returns {Object} products, loading, error, pagination, refetch
 */
export const useProducts = (categoryId = null, page = 1, limit = 20, search = '', minPrice = null, maxPrice = null) => {
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

  const hasSearchText = typeof search === 'string' && search.trim() !== '';
  const hasPriceFilter = minPrice != null || maxPrice != null;
  const useSearchApi = hasSearchText || hasPriceFilter;

  const loadProducts = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        if (useSearchApi) {
          const response = await fetchProductSearch(
            typeof search === 'string' ? search.trim() : '',
            page,
            limit,
            minPrice,
            maxPrice,
            categoryId || null
          );
          let productsData = [];
          if (response?.data && Array.isArray(response.data)) {
            productsData = response.data;
          }
          const paginationData = response?.pagination || response?.meta;
          if (paginationData) {
            const total = paginationData.total ?? 0;
            const totalPages = paginationData.totalPages ?? (limit > 0 ? Math.ceil(total / limit) : 0);
            const currentPageNum = paginationData.page ?? page;
            setPagination({
              page: currentPageNum,
              limit: paginationData.limit ?? limit,
              total,
              totalPages,
              hasMore: currentPageNum < totalPages
            });
          } else {
            setPagination({
              page,
              limit,
              total: 0,
              totalPages: 0,
              hasMore: productsData.length === limit
            });
          }
          setProducts(productsData);
          return;
        }

        if (!categoryId) {
          setProducts([]);
          setPagination({
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0,
            hasMore: false
          });
          setLoading(false);
          return;
        }

        const response = await fetchProducts(categoryId, page, limit, '');

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
          setLoading(false);
          return;
        }

        let productsData = [];
        if (response?.success && response?.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response?.data && Array.isArray(response.data)) {
          productsData = response.data;
        }

        if (response?.pagination) {
          setPagination({
            page: response.pagination.page || page,
            limit: response.pagination.limit || limit,
            total: response.pagination.total || 0,
            totalPages: response.pagination.totalPages || 0,
            hasMore: (response.pagination.page || page) < (response.pagination.totalPages || 0)
          });
        } else {
          const hasMore = productsData.length === limit;
          setPagination({
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasMore
          });
        }

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
    },
    [categoryId, page, limit, search, minPrice, maxPrice, useSearchApi]
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, pagination, refetch: loadProducts };
};

