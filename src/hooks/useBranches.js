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

        const records =
          response?.records ??
          response?.data?.records ??
          response?.data ??
          (Array.isArray(response) ? response : null);

        if (Array.isArray(records)) {
          setBranches(records);
        } else {
          setBranches([]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch branches');
        console.error('Error loading branches:', err);
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    loadBranches();
  }, []);

  return { branches, loading, error };
};

