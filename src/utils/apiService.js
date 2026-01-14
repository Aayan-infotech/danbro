import { EXTERNAL_API_BASE_URL, EXTERNAL_API_ACCESS_KEY, API_BASE_URL } from './apiUrl';

/**
 * Sanitize JSON string by escaping control characters within string values
 * @param {string} jsonString - The JSON string to sanitize
 * @returns {string} Sanitized JSON string
 */
const sanitizeJsonString = (jsonString) => {
  let result = '';
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    const charCode = char.charCodeAt(0);
    
    if (escapeNext) {
      // We're escaping the next character, so just add it as-is
      result += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      // Next character is escaped
      escapeNext = true;
      result += char;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      // Toggle string state
      inString = !inString;
      result += char;
      continue;
    }
    
    if (inString) {
      // We're inside a string value, escape control characters
      if (charCode >= 0x00 && charCode <= 0x1F) {
        // Control character - escape it
        switch (charCode) {
          case 0x08: result += '\\b'; break;  // Backspace
          case 0x09: result += '\\t'; break;  // Tab
          case 0x0A: result += '\\n'; break;  // Line feed
          case 0x0C: result += '\\f'; break;  // Form feed
          case 0x0D: result += '\\r'; break;  // Carriage return
          default:
            // For other control characters, use Unicode escape
            result += '\\u' + ('0000' + charCode.toString(16)).slice(-4);
        }
      } else {
        result += char;
      }
    } else {
      // Outside string, keep as-is (but remove invalid control characters)
      if (charCode >= 0x00 && charCode <= 0x1F && char !== '\n' && char !== '\r' && char !== '\t') {
        // Remove control characters outside strings (except whitespace)
        continue;
      }
      result += char;
    }
  }
  
  return result;
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} The authentication token or null if not found
 */
const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('authToken');
};

/**
 * Get the API URL for category endpoint
 */
const getApiUrl = () => {
  return `${API_BASE_URL}/category/getAll`;
};

/**
 * Fetch item categories from the external API
 * @returns {Promise<Object>} Response object with status and records array
 */
export const fetchItemCategories = async () => {
  try {
    const url = getApiUrl();
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Always read as text first to avoid "body stream already read" error
    const text = await response.text();
    let data;
    
    try {
      // First try parsing without sanitization
      data = JSON.parse(text);
    } catch (parseError) {
      // If that fails, try sanitizing and parsing again
      try {
        const sanitizedText = sanitizeJsonString(text);
        data = JSON.parse(sanitizedText);
      } catch (sanitizeError) {
        console.error('Failed to parse response as JSON:', sanitizeError);
        console.error('Response text (first 500 chars):', text.substring(0, 500));
        throw new Error(`Invalid response format from API: ${sanitizeError.message}`);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching item categories:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to the API. Please check your internet connection or try again later.');
    }
    throw error;
  }
};

/**
 * Get item categories with error handling
 * @returns {Promise<Array>} Array of category records
 */
export const getItemCategories = async () => {
  try {
    const response = await fetchItemCategories();
    
    if ((response.status === 'sucess' || response.status === 'success') && response.records) {
      return response.records;
    } else if (response.records && Array.isArray(response.records)) {
      // If records exist but status is different, still use it
      return response.records;
    }
    
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error('Error getting item categories:', error);
    throw error;
  }
};

/**
 * Get API URL helper function
 * @param {string} level - API level (ITEMCATEGORY, PRODUCTS, POS)
 * @param {object} params - Additional query parameters
 * @returns {string} API URL
 */
const getExternalApiUrl = (level, params = {}) => {
  const baseUrl = import.meta.env.DEV 
    ? `/api/external/downstream.asp`
    : `${EXTERNAL_API_BASE_URL}/downstream.asp`;
  
  const queryParams = new URLSearchParams({ level, ...params });
  return `${baseUrl}?${queryParams.toString()}`;
};

/**
 * Fetch products from the external API
 * @param {number} categoryId - Category ID to filter products
 * @returns {Promise<Object>} Response object with status and records array
 */
export const fetchProducts = async (categoryId = null) => {
  try {
    const params = categoryId ? { categoryid: categoryId.toString() } : {};
    const url = getExternalApiUrl('PRODUCTS', params);
    
    console.log('Fetching products from URL:', url);
    console.log('Category ID:', categoryId);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `accesskey ${EXTERNAL_API_ACCESS_KEY}`,
      },
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Always read as text first to avoid "body stream already read" error
    const text = await response.text();
    let data;
    
    try {
      // First try parsing without sanitization
      data = JSON.parse(text);
    } catch (parseError) {
      // If that fails, try sanitizing and parsing again
      try {
        const sanitizedText = sanitizeJsonString(text);
        data = JSON.parse(sanitizedText);
      } catch (sanitizeError) {
        console.error('Failed to parse response as JSON:', sanitizeError);
        console.error('Response text (first 500 chars):', text.substring(0, 500));
        throw new Error(`Invalid response format from API: ${sanitizeError.message}`);
      }
    }
    
    console.log('Products API Response Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to the API. Please check your internet connection or try again later.');
    }
    throw error;
  }
};

/**
 * Get products with error handling
 * @param {number} categoryId - Category ID to filter products
 * @returns {Promise<Array>} Array of product records
 */
export const getProducts = async (categoryId = null) => {
  try {
    const response = await fetchProducts(categoryId);
    
    if ((response.status === 'sucess' || response.status === 'success') && response.records) {
      return response.records;
    } else if (response.records && Array.isArray(response.records)) {
      // If records exist but status is different, still use it
      return response.records;
    }
    
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

/**
 * Fetch branches/POS from the external API
 * @returns {Promise<Object>} Response object with status and records array
 */
export const fetchBranches = async () => {
  try {
    const url = getExternalApiUrl('POS');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `accesskey ${EXTERNAL_API_ACCESS_KEY}`,
      },
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Always read as text first to avoid "body stream already read" error
    const text = await response.text();
    let data;
    
    try {
      // First try parsing without sanitization
      data = JSON.parse(text);
    } catch (parseError) {
      // If that fails, try sanitizing and parsing again
      try {
        const sanitizedText = sanitizeJsonString(text);
        data = JSON.parse(sanitizedText);
      } catch (sanitizeError) {
        console.error('Failed to parse response as JSON:', sanitizeError);
        console.error('Response text (first 500 chars):', text.substring(0, 500));
        throw new Error(`Invalid response format from API: ${sanitizeError.message}`);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to the API. Please check your internet connection or try again later.');
    }
    throw error;
  }
};

/**
 * Get branches with error handling
 * @returns {Promise<Array>} Array of branch records
 */
export const getBranches = async () => {
  try {
    const response = await fetchBranches();
    
    if ((response.status === 'sucess' || response.status === 'success') && response.records) {
      return response.records;
    } else if (response.records && Array.isArray(response.records)) {
      // If records exist but status is different, still use it
      return response.records;
    }
    
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error('Error getting branches:', error);
    throw error;
  }
};

