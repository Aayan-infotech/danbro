import { useState, useEffect } from 'react';
import { fetchBranches } from '../utils/apiService';

/**
 * Custom hook to fetch and manage branches/POS
 * @returns {Object} Object containing branches, loading state, and error
 */
export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBranches = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchBranches();
        
        if (response.status === 'sucess' && response.records) {
          setBranches(response.records);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch branches');
        console.error('Error loading branches:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBranches();
  }, []);

  return { branches, loading, error };
};

