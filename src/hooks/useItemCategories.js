import { useState, useEffect } from 'react';
import { fetchItemCategories } from '../utils/apiService';

/**
 * Custom hook to fetch and manage item categories
 * @returns {Object} Object containing categories, loading state, and error
 */
export const useItemCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchItemCategories();
        
        if (response.status === 'sucess' && response.records) {
          setCategories(response.records);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch item categories');
        console.error('Error loading item categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

