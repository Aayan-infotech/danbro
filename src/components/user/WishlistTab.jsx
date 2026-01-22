import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Button, IconButton, CircularProgress, Alert } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";
import api from "../../utils/api";
import { getStoredLocation } from "../../utils/location";

export const WishlistTab = ({ onRemoveFromWishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  // Fetch wishlist items
  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      // Headers (lat/long) are automatically added by axios interceptor
      const response = await api.get('/wishlist/get');

      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Format wishlist items - API returns products directly in data array
        const formattedItems = response.data.data.map((item) => {
          // Product data is directly in item (new API structure)
          // Support both old structure (item.product) and new structure (item directly)
          const product = item.product || item;
          
          // Extract price - price is an array
          const price = product.price && Array.isArray(product.price) && product.price.length > 0 
            ? product.price[0] 
            : null;
          
          // Extract image - images is an array of objects with url
          const image = product.images && Array.isArray(product.images) && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300";
          
          return {
            id: item._id || item.id || product.productId || product._id,
            productId: product.productId || product._id || item.productId,
            prdcode: product.prdcode || null,
            name: product.name || "Unknown Product",
            image: image,
            price: price 
              ? `₹${price.rate || price.mrp || "N/A"}` 
              : "Price not available",
            mrp: price?.mrp || null,
            rate: price?.rate || null,
            weight: product.weight || null,
            category: product.category || null,
            subcategory: product.subcategory || null,
          };
        });
        setWishlistItems(formattedItems);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('Failed to load wishlist. Please try again later.');
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    setRemovingId(productId);
    try {
      const response = await api.post('/wishlist/remove', {
        productId: productId,
      });

      if (response.data) {
        // Remove from local state
        setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
        
        // Call parent callback if provided
        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(productId);
        }
        
        // Dispatch event to update wishlist count in TopHeader
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setError('Failed to remove item from wishlist. Please try again.');
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  if (error && wishlistItems.length === 0) {
    return (
      <Box>
        <CustomText
          variant="h4"
          sx={{
            fontSize: { xs: 20, md: 32 },
            fontWeight: 700,
            color: "var(--themeColor)",
            mb: { xs: 2, md: 2 },
          }}
        >
          My Wishlist
        </CustomText>
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <CustomText
        variant="h4"
        sx={{
          fontSize: { xs: 20, md: 32 },
          fontWeight: 700,
          color: "var(--themeColor)",
          mb: { xs: 2, md: 2 },
        }}
      >
        My Wishlist
      </CustomText>

      {error && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {wishlistItems.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            px: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
          }}
        >
          <FavoriteIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
          <CustomText variant="h6" sx={{ color: "#666", mb: 1, fontWeight: 600 }}>
            Your wishlist is empty
          </CustomText>
          <CustomText variant="body2" sx={{ color: "#999" }}>
            Start adding products to your wishlist to see them here!
          </CustomText>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
          {wishlistItems.map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
              <Card
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={item?.image}
                    alt={item?.name}
                    sx={{
                      width: "100%",
                      height: { xs: 140, sm: 160, md: 200 },
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    disabled={removingId === item.productId}
                    sx={{
                      position: "absolute",
                      top: { xs: 4, md: 8 },
                      right: { xs: 4, md: 8 },
                      backgroundColor: "rgba(255,255,255,0.9)",
                      padding: { xs: 0.5, md: 1 },
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
                      "&:disabled": {
                        opacity: 0.6,
                      },
                    }}
                  >
                    {removingId === item.productId ? (
                      <CircularProgress size={20} sx={{ color: "#f44336" }} />
                    ) : (
                      <FavoriteIcon sx={{ color: "#f44336", fontSize: { xs: 18, md: 24 } }} />
                    )}
                  </IconButton>
                </Box>
                <CardContent sx={{ p: { xs: 1.5, md: 2 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <CustomText variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: 13, md: 16 }, lineHeight: 1.3 }}>
                    {item?.name}
                  </CustomText>
                  {item?.weight && (
                    <CustomText variant="body2" sx={{ color: "#666", mb: 0.5, fontSize: { xs: 11, md: 12 } }}>
                      {item.weight}
                    </CustomText>
                  )}
                  <CustomText variant="body2" sx={{ color: "var(--themeColor)", fontWeight: 700, mb: { xs: 1.5, md: 2 }, fontSize: { xs: 13, md: 14 } }}>
                    {item?.price}
                  </CustomText>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      // Navigate to product details using prdcode (product code)
                      if (item?.prdcode) {
                        window.location.href = `/products/${item.prdcode}`;
                      } else if (item?.productId) {
                        window.location.href = `/products/${item.productId}`;
                      }
                    }}
                    sx={{
                      backgroundColor: "#FFB5A1",
                      color: "black",
                      textTransform: "none",
                      borderRadius: { xs: 1.5, md: 2 },
                      fontWeight: 600,
                      fontSize: { xs: 12, md: 14 },
                      py: { xs: 0.8, md: 1 },
                      mt: "auto",
                      "&:hover": {
                        backgroundColor: "#F2709C",
                      },
                    }}
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

