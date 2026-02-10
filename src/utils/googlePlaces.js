// Google Places API utility functions

let autocompleteService = null;
let geocoderService = null;

// Initialize Google Places services
export const initGooglePlaces = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService = new window.google.maps.places.AutocompleteService();
      geocoderService = new window.google.maps.Geocoder();
      resolve();
      return;
    }

    // Load Google Maps script if not already loaded
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Script is loading, wait for it
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          autocompleteService = new window.google.maps.places.AutocompleteService();
          geocoderService = new window.google.maps.Geocoder();
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Google Maps API failed to load'));
      }, 10000);
      return;
    }

    // Load Google Maps script (API key from Jenkins build-arg in production, or .env for local dev)
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!API_KEY) {
      console.warn('Google Maps API key not set. Set VITE_GOOGLE_MAPS_API_KEY in .env for local dev. Address search will be limited.');
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteService = new window.google.maps.places.AutocompleteService();
        geocoderService = new window.google.maps.Geocoder();
        console.log('Google Places API loaded successfully');
        resolve();
      } else {
        console.error('Google Maps API loaded but places library not available');
        reject(new Error('Google Maps API failed to initialize'));
      }
    };
    script.onerror = (error) => {
      console.error('Failed to load Google Maps API script:', error);
      reject(new Error('Failed to load Google Maps API'));
    };
    document.head.appendChild(script);
  });
};

/**
 * Build a short address from Google address_components (e.g. "C-84, Vibhuti Khand, Gomti Nagar").
 * Uses premise, sublocality, locality so the label is concise instead of full postal formatted_address.
 * @param {Array<{long_name: string, short_name: string, types: string[]}>} addressComponents
 * @returns {string} Short address or empty if no components
 */
export const getShortAddressFromComponents = (addressComponents) => {
  if (!Array.isArray(addressComponents) || addressComponents.length === 0) return '';

  const get = (types) => {
    const c = addressComponents.find((comp) => types.some((t) => comp.types && comp.types.includes(t)));
    return c ? c.long_name : '';
  };

  const premise = get(['premise', 'subpremise']);
  const sublocality = get(['sublocality_level_1', 'sublocality']);
  const locality = get(['locality']);
  const route = get(['route']);
  const streetNumber = get(['street_number']);

  const parts = [];
  if (premise) parts.push(premise);
  else if (streetNumber || route) parts.push([streetNumber, route].filter(Boolean).join(' '));
  if (sublocality) parts.push(sublocality);
  if (locality) parts.push(locality);

  return parts.filter(Boolean).join(', ') || '';
};

// Get autocomplete predictions
export const getPlacePredictions = (input, callback) => {
  if (!autocompleteService) {
    initGooglePlaces().then(() => {
      if (autocompleteService) {
        autocompleteService.getPlacePredictions(
          {
            input: input,
            componentRestrictions: { country: 'in' }, // Restrict to India
          },
          (predictions, status) => {
            if (status === window.google?.maps?.places?.PlacesServiceStatus.OK) {
              callback(predictions, status);
            } else {
              console.error('Google Places API error:', status);
              callback([], status);
            }
          }
        );
      } else {
        // Expected when VITE_GOOGLE_MAPS_API_KEY is not set (e.g. local dev)
        callback([], 'ERROR');
      }
    }).catch((error) => {
      console.warn('Google Places not available:', error?.message || error);
      callback([], 'ERROR');
    });
    return;
  }

  autocompleteService.getPlacePredictions(
    {
      input: input,
      componentRestrictions: { country: 'in' }, // Restrict to India
    },
    (predictions, status) => {
      if (status === window.google?.maps?.places?.PlacesServiceStatus.OK) {
        callback(predictions, status);
      } else {
        console.error('Google Places API error:', status);
        callback([], status);
      }
    }
  );
};

// Get place details including lat/long
export const getPlaceDetails = (placeId) => {
  return new Promise((resolve, reject) => {
    if (!geocoderService) {
      initGooglePlaces().then(() => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(
          {
            placeId: placeId,
            fields: ['geometry', 'formatted_address', 'name', 'address_components'],
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
              const shortAddr = getShortAddressFromComponents(place.address_components || []);
              resolve({
                lat: place.geometry.location.lat(),
                long: place.geometry.location.lng(),
                address: shortAddr || place.formatted_address || place.name,
              });
            } else {
              reject(new Error('Failed to get place details'));
            }
          }
        );
      }).catch(reject);
      return;
    }

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
      {
        placeId: placeId,
        fields: ['geometry', 'formatted_address', 'name', 'address_components'],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const shortAddr = getShortAddressFromComponents(place.address_components || []);
          resolve({
            lat: place.geometry.location.lat(),
            long: place.geometry.location.lng(),
            address: shortAddr || place.formatted_address || place.name,
          });
        } else {
          reject(new Error('Failed to get place details'));
        }
      }
    );
  });
};

