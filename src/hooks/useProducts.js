import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/apiService';

/**
 * Custom hook to fetch and manage products
 * @param {number} categoryId - Optional category ID to filter products
 * @returns {Object} Object containing products, loading state, and error
 */
export const useProducts = (categoryId = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If no category is selected, set empty products and return
        if (!categoryId) {
          setProducts([]);
          setLoading(false);
          return;
        }
        
        const response = await fetchProducts(categoryId);
        
        // Log response for debugging
        console.log('Products API Response:', response);
        console.log('Response status:', response?.status);
        console.log('Response records type:', typeof response?.records);
        console.log('Response records is array:', Array.isArray(response?.records));
        console.log('Response records length:', response?.records?.length);
        
        if (response?.status === 'Error') {
          console.log('API returned error status:', response?.msg || 'Unknown error');
          setProducts([]);
          setError(null); 
          return;
        }
        
        // Check for both 'sucess' (API typo) and 'success' (standard)
        if ((response?.status === 'sucess' || response?.status === 'success') && response?.records && Array.isArray(response.records)) {
          setProducts(response.records);
        } else if (response?.records && Array.isArray(response.records)) {
          setProducts(response.records);
        } else {
          if (response?.status && response.status !== 'Error') {
            console.log('No records found for status:', response.status);
            setProducts([]);
            setError(null);
          } else {
            console.error('Invalid response format - Full response:', JSON.stringify(response, null, 2));
            throw new Error(`Invalid response format. Status: ${response?.status || 'undefined'}, Records: ${response?.records ? (Array.isArray(response.records) ? `array(${response.records.length})` : typeof response.records) : 'missing'}`);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error loading products:', err);
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  return { products, loading, error };
};

