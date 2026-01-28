import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, IconButton, Autocomplete, CircularProgress, Paper } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getCurrentLocation, storeLocation } from "../../utils/location";
import { initGooglePlaces, getPlacePredictions, getPlaceDetails } from "../../utils/googlePlaces";

export const DeliveryCheckDialog = ({ open, onClose }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const autocompleteRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (open) {
      // Initialize Google Places when dialog opens
      initGooglePlaces().catch((error) => {
        console.error('Failed to initialize Google Places:', error);
      });

      // Prevent body scroll when dialog is open
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore body scroll when dialog closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // Debounced search for autocomplete
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (inputValue.trim().length > 2) {
      debounceTimer.current = setTimeout(() => {
        setLoading(true);
        getPlacePredictions(inputValue, (predictions, status) => {
          setLoading(false);
          if (status === window.google?.maps?.places?.PlacesServiceStatus.OK && predictions) {
            setPredictions(predictions);
          } else {
            console.warn('Autocomplete status:', status, 'Predictions:', predictions);
            setPredictions([]);
          }
        });
      }, 300);
    } else {
      setPredictions([]);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputValue]);

  const handlePlaceSelect = async (placeId) => {
    if (!placeId) return;

    try {
      setLoading(true);
      const placeDetails = await getPlaceDetails(placeId);

      // Store location
      storeLocation(placeDetails.lat, placeDetails.long, placeDetails.address);

      // Dispatch event to update location in API calls
      window.dispatchEvent(new CustomEvent('locationUpdated', {
        detail: { lat: placeDetails.lat, long: placeDetails.long, label: placeDetails.address }
      }));

      // Close dialog
      onClose();
    } catch (error) {
      console.error('Error getting place details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      const location = await getCurrentLocation();

      // Try to reverse‑geocode coordinates to a readable address
      let addressLabel = "Selected location";
      try {
        if (window.google && window.google.maps && window.google.maps.Geocoder) {
          const geocoder = new window.google.maps.Geocoder();
          const response = await geocoder.geocode({
            location: { lat: location.lat, lng: location.long },
          });
          if (Array.isArray(response.results) && response.results[0]?.formatted_address) {
            addressLabel = response.results[0].formatted_address;
          }
        }
      } catch (geoError) {
        console.error("Reverse geocoding failed:", geoError);
      }

      // Store location with resolved address (or fallback label)
      storeLocation(location.lat, location.long, addressLabel);

      // Dispatch event to update location in API calls & header
      window.dispatchEvent(new CustomEvent("locationUpdated", {
        detail: { lat: location.lat, long: location.long, label: addressLabel }
      }));

      // Close dialog
      onClose();
    } catch (error) {
      console.error('Error getting current location:', error);
    } finally {
      setGettingLocation(false);
    }
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        animation: "fadeIn 0.3s ease-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
      onWheel={(e) => {
        // Prevent scroll on backdrop
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        // Prevent touch scroll on backdrop
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={(e) => {
        // Don't close on backdrop click - user must select location
        // onClose();
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: { xs: 3, md: 4 },
          width: { xs: "90%", sm: "500px", md: "600px" },
          maxWidth: "90%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          position: "relative",
          animation: "slideUp 0.3s ease-out",
          "@keyframes slideUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(20px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#666",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              color: "#000",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header with title and location icons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, position: "relative", pr: 5 }}>
          <CustomText sx={{ fontSize: { xs: 20, md: 22 }, fontWeight: 700, color: "#333", }}>
            Enter Delivery Location
          </CustomText>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, position: "relative", width: 40, height: 50 }}>
            <LocationOnIcon sx={{ color: "#d32f2f", fontSize: 24, position: "absolute", top: 0, zIndex: 2 }} />
            <Box
              sx={{
                width: "2px",
                height: "24px",
                position: "absolute",
                top: 12,
                background: "repeating-linear-gradient(to bottom, #d32f2f 0px, #d32f2f 4px, transparent 4px, transparent 8px)",
                zIndex: 1,
              }}
            />
            <LocationOnIcon sx={{ color: "#d32f2f", fontSize: 24, position: "absolute", bottom: 0, zIndex: 2 }} />
          </Box>
        </Box>

        {/* Search Input with Autocomplete */}
        <Autocomplete
          ref={autocompleteRef}
          freeSolo
          options={predictions}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description || ''
          }
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, newValue) => {
            if (newValue && newValue.place_id) {
              handlePlaceSelect(newValue.place_id);
            }
          }}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for area/locality/pincode"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  paddingLeft: "12px",
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
                "& input": {
                  fontSize: { xs: 14, md: 16 },
                  padding: { xs: "14px 14px 14px 8px", md: "16px 16px 16px 8px" },
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <SearchIcon sx={{ color: "#999", mr: 1, fontSize: 20 }} />
                ),
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 1.5,
                px: 2,
              }}
            >
              <LocationOnIcon sx={{ color: "#d32f2f", fontSize: 20 }} />
              <Box>
                <CustomText sx={{ fontSize: 14, fontWeight: 600 }}>
                  {option.structured_formatting?.main_text || option.description}
                </CustomText>
                {option.structured_formatting?.secondary_text && (
                  <CustomText sx={{ fontSize: 12, color: "#666" }}>
                    {option.structured_formatting.secondary_text}
                  </CustomText>
                )}
              </Box>
            </Box>
          )}
          PaperComponent={({ children, ...other }) => (
            <Paper {...other} sx={{ mt: 1, borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
              {children}
            </Paper>
          )}
          sx={{ mb: 3 }}
        />

        {/* Use Current Location Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            color: "#d32f2f",
            py: 1.5,
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.05)",
            },
          }}
          onClick={handleUseCurrentLocation}
        >
          {gettingLocation ? (
            <CircularProgress size={20} sx={{ color: "#d32f2f" }} />
          ) : (
            <MyLocationIcon sx={{ fontSize: 20 }} />
          )}
          <CustomText
            sx={{
              fontSize: { xs: 14, md: 15 },
              fontWeight: 500,
              color: "#d32f2f",
            }}
          >
            Use my current location
          </CustomText>
        </Box>
      </Box>
    </Box>
  );
};

