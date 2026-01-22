import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  
  Grid,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
  TextField,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import {
  DeleteOutline as DeleteOutlineIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getCart, increaseItemCount, decreaseItemCount } from "../../utils/cart";
import { getAccessToken } from "../../utils/cookies";

export const Cart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAccessToken();
      if (!token) {
        setError("Please login to view your cart");
        setLoading(false);
        return;
      }
      const response = await getCart();
      
      // Handle different response structures
      if (response?.data?.items) {
        setCartItems(response.data.items);
      } else if (response?.items) {
        setCartItems(response.items);
      } else if (Array.isArray(response?.data)) {
        setCartItems(response.data);
      } else if (Array.isArray(response)) {
        setCartItems(response);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Error loading cart:", err);
      setError(err.response?.data?.message || err.message || "Failed to load cart");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, change) => {
    if (updatingItems.has(productId)) return;
    
    try {
      setUpdatingItems((prev) => new Set(prev).add(productId));
      
      if (change > 0) {
        await increaseItemCount(productId);
      } else {
        await decreaseItemCount(productId);
      }
      
      // Reload cart to get updated data
      await loadCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.response?.data?.message || err.message || "Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const removeItem = async (productId) => {
    // For now, we'll decrease quantity to 0 or handle removal
    // If there's a remove endpoint, implement it here
    try {
      // Keep decreasing until quantity is 0 or implement remove endpoint
      await decreaseItemCount(productId);
      await loadCart();
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.response?.data?.message || err.message || "Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);
  const shipping = subtotal > 50 ? 0 : 5.0;
  const total = subtotal + shipping;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 4, md: 0 }, pb: { xs: 12, md: 0 }, p: { xs: 1.25, md: 0 }, mb: 4 }}>
      <Container  sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <CustomText
            variant="h4"
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 700,
              color: "var(--themeColor)",
              mb: 1,
            }}
          >
            Shopping Cart
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#666" }}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </CustomText>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : cartItems.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 8, md: 12 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: { xs: 64, md: 96 }, color: "#ddd" }} />
            <CustomText sx={{ fontSize: { xs: 18, md: 24 }, fontWeight: 600, color: "#666" }}>
              Your cart is empty
            </CustomText>
            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              sx={{
                backgroundColor: "var(--themeColor)",
                color: "#fff",
                textTransform: "none",
                px: { xs: 4, md: 6 },
                py: { xs: 1.2, md: 1.5 },
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                mt: 2,
                "&:hover": {
                  backgroundColor: "var(--specialColor)",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 3 } }}>
                {cartItems.map((item) => {
                  const productId = item.productId || item._id || item.id;
                  const isUpdating = updatingItems.has(productId);
                  
                  return (
                  <Card
                    key={productId || item.id}
                    sx={{
                      borderRadius: { xs: 2, md: 3 },
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 2, md: 3 },
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        {/* Product Image */}
                        <Box
                          sx={{
                            width: { xs: "100%", sm: 120 },
                            height: { xs: 200, sm: 120 },
                            borderRadius: { xs: 2, md: 2 },
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={item.image || item.product?.image || "https://via.placeholder.com/200"}
                            alt={item.name || item.product?.name || "Product"}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>

                        {/* Product Details */}
                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <Box>
                            <CustomText
                              sx={{
                                fontSize: { xs: 16, md: 18 },
                                fontWeight: 600,
                                color: "#2c2c2c",
                                mb: 0.5,
                              }}
                            >
                              {item.name || item.product?.name || "Product"}
                            </CustomText>
                            <CustomText
                              sx={{
                                fontSize: { xs: 12, md: 14 },
                                color: "#666",
                                mb: { xs: 1, md: 1.5 },
                              }}
                            >
                              Weight: {item.weight || item.product?.weight || "N/A"}
                            </CustomText>
                            <CustomText
                              sx={{
                                fontSize: { xs: 18, md: 20 },
                                fontWeight: 700,
                                color: "var(--themeColor)",
                              }}
                            >
                              ₹{typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price || 0).toFixed(2)}
                            </CustomText>
                          </Box>

                          {/* Quantity Controls */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mt: { xs: 2, sm: 0 },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                p: 0.5,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(productId, -1)}
                                disabled={isUpdating}
                                sx={{
                                  color: "var(--themeColor)",
                                  "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" },
                                  "&:disabled": { opacity: 0.5 },
                                }}
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} />
                                ) : (
                                <RemoveIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                                )}
                              </IconButton>
                              <CustomText
                                sx={{
                                  minWidth: { xs: 30, md: 40 },
                                  textAlign: "center",
                                  fontSize: { xs: 14, md: 16 },
                                  fontWeight: 600,
                                }}
                              >
                                {item.quantity}
                              </CustomText>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(productId, 1)}
                                disabled={isUpdating}
                                sx={{
                                  color: "var(--themeColor)",
                                  "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" },
                                  "&:disabled": { opacity: 0.5 },
                                }}
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} />
                                ) : (
                                <AddIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                                )}
                              </IconButton>
                            </Box>

                            <IconButton
                              onClick={() => removeItem(productId)}
                              disabled={isUpdating}
                              sx={{
                                color: "#d32f2f",
                                "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" },
                                "&:disabled": { opacity: 0.5 },
                              }}
                            >
                              <DeleteOutlineIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                  );
                })}
              </Box>

              {/* Continue Shopping Button */}
              <Box sx={{ mt: { xs: 3, md: 4 } }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/products")}
                  sx={{
                    borderColor: "var(--themeColor)",
                    color: "var(--themeColor)",
                    textTransform: "none",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1, md: 1.2 },
                    fontSize: { xs: 14, md: 16 },
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "var(--specialColor)",
                      color: "var(--specialColor)",
                      backgroundColor: "rgba(195, 46, 6, 0.05)",
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  position: { md: "sticky" },
                  top: { md: 100 },
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <CustomText
                    sx={{
                      fontSize: { xs: 20, md: 24 },
                      fontWeight: 700,
                      color: "#2c2c2c",
                      mb: { xs: 2, md: 3 },
                    }}
                  >
                    Order Summary
                  </CustomText>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#666" }}>
                        Subtotal
                      </CustomText>
                      <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>
                        ₹{subtotal.toFixed(2)}
                      </CustomText>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#666" }}>
                        Shipping
                      </CustomText>
                      <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>
                        {shipping === 0 ? (
                          <Box component="span" sx={{ color: "#4caf50" }}>
                            Free
                          </Box>
                        ) : (
                          `₹${shipping.toFixed(2)}`
                        )}
                      </CustomText>
                    </Box>

                    {subtotal < 50 && (
                      <CustomText
                        sx={{
                          fontSize: { xs: 12, md: 13 },
                          color: "#ED7D2B",
                          fontStyle: "italic",
                        }}
                      >
                        Add ₹{(50 - subtotal).toFixed(2)} more for free shipping
                      </CustomText>
                    )}

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <CustomText
                        sx={{
                          fontSize: { xs: 18, md: 20 },
                          fontWeight: 700,
                          color: "#2c2c2c",
                        }}
                      >
                        Total
                      </CustomText>
                      <CustomText
                        sx={{
                          fontSize: { xs: 18, md: 20 },
                          fontWeight: 700,
                          color: "var(--themeColor)",
                        }}
                      >
                        ₹{total.toFixed(2)}
                      </CustomText>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/checkout")}
                    sx={{
                      backgroundColor: "var(--themeColor)",
                      color: "#fff",
                      textTransform: "none",
                      py: { xs: 1.2, md: 1.5 },
                      fontSize: { xs: 14, md: 16 },
                      fontWeight: 600,
                      mb: 2,
                      "&:hover": {
                        backgroundColor: "var(--specialColor)",
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalShippingIcon sx={{ fontSize: { xs: 18, md: 20 }, color: "#666" }} />
                      <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                        Free shipping on orders over ₹50
                      </CustomText>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PaymentIcon sx={{ fontSize: { xs: 18, md: 20 }, color: "#666" }} />
                      <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                        Secure payment
                      </CustomText>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

