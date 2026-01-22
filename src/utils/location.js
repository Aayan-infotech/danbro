// Utility functions for location handling

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        // Default to a fallback location (can be set to a default city)
        console.warn('Error getting location:', error);
        // Default location (example: Lucknow, India)
        resolve({
          lat: 26.86957,
          long: 81.00935,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

export const getStoredLocation = () => {
  try {
    const stored = localStorage.getItem('userLocation');
    if (stored) {
      const location = JSON.parse(stored);
      return {
        lat: location.lat || 26.86957,
        long: location.long || 81.00935,
      };
    }
  } catch (error) {
    console.error('Error reading stored location:', error);
  }
  // Default location
  return {
    lat: 26.86957,
    long: 81.00935,
  };
};

export const storeLocation = (lat, long) => {
  try {
    localStorage.setItem('userLocation', JSON.stringify({ lat, long }));
  } catch (error) {
    console.error('Error storing location:', error);
  }
};

