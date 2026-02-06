import { useState, useEffect, useCallback } from 'react';
import { getStaticContent } from '../utils/apiService';

/**
 * Fetches static page content by slug.
 * @param {string} slug - aboutUs | termsAndConditions | privacyPolicy | refundAndReturnPolicy | shippingPolicy
 * @returns {{ data: object | null, loading: boolean, error: Error | null, refetch: function }}
 */
export function useStaticContent(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await getStaticContent(slug);
      setData(result ?? null);
    } catch (err) {
      console.error('useStaticContent:', err);
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, loading, error, refetch: fetchContent };
}
