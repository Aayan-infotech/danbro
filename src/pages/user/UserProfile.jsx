import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Download as DownloadIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  LocalOffer as LocalOfferIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LocalShipping as LocalShippingIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  ContentCopy as ContentCopyIcon,
  LocalOffer as OfferIcon,
  Celebration as CelebrationIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { CustomTextField } from "../../components/comman/CustomTextField";
import { CustomText } from "../../components/comman/CustomText";
import { API_BASE_URL } from "../../utils/apiUrl";
import axios from "axios";
import { CircularProgress, Alert } from "@mui/material";

export const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "order-history", label: "Order History", icon: <HistoryIcon /> },
    { id: "downloads", label: "Downloads", icon: <DownloadIcon /> },
    { id: "addresses", label: "Saved Addresses", icon: <LocationOnIcon /> },
    { id: "account", label: "Account Details", icon: <PersonIcon /> },
    { id: "coupons", label: "My Coupons", icon: <LocalOfferIcon /> },
    { id: "wishlist", label: "Wishlist", icon: <FavoriteIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
    { id: "logout", label: "Logout", icon: <LogoutIcon /> },
  ];

  const favoriteItems = [
    { id: 1, name: "Chocolate Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", price: "₹450" },
    { id: 2, name: "Red Velvet Cake", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop", price: "₹550" },
    { id: 3, name: "Black Forest Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", price: "₹500" },
    { id: 4, name: "Vanilla Cake", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop", price: "₹400" },
  ];

  const orders = [
    { id: "#ORD-001", date: "2024-01-15", items: 3, total: "₹1,250", status: "Delivered" },
    { id: "#ORD-002", date: "2024-01-10", items: 2, total: "₹850", status: "Out for Delivery" },
    { id: "#ORD-003", date: "2024-01-05", items: 5, total: "₹2,100", status: "Processing" },
    { id: "#ORD-004", date: "2023-12-28", items: 1, total: "₹450", status: "Delivered" },
  ];

  const downloads = [
    { id: 1, name: "Invoice #ORD-001", date: "2024-01-15", type: "PDF" },
    { id: 2, name: "Invoice #ORD-002", date: "2024-01-10", type: "PDF" },
    { id: 3, name: "Receipt #ORD-003", date: "2024-01-05", type: "PDF" },
  ];

  const addresses = [
    { id: 1, type: "Home", name: "Aditya Kumar", phone: "+91 9876543210", address: "123, Main Street, Lucknow, UP - 226001", isDefault: true },
    { id: 2, type: "Work", name: "Aditya Kumar", phone: "+91 9876543210", address: "456, Business Park, Kanpur, UP - 208001", isDefault: false },
  ];

  const [coupons, setCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [couponsError, setCouponsError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [accountData, setAccountData] = useState({
    firstName: "Aditya",
    lastName: "Kumar",
    email: "aditya@example.com",
    phone: "+91 9876543210",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch coupons from API
  const fetchCoupons = async () => {
    setCouponsLoading(true);
    setCouponsError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/coupon/getAll`);
      if (response.data && response.data.data) {
        // Format coupon data
        const formattedCoupons = response.data.data.map((coupon) => {
          const isPercentage = coupon.discountType === "ITEM_DISCOUNT_PERCENTAGE";
          const discount = isPercentage 
            ? `${coupon.discountPercentage}%` 
            : `₹${coupon.discountAmount}`;
          
          // Format dates
          const validFrom = new Date(coupon.validFrom).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
          const validTo = new Date(coupon.validTo).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });

          // Check if coupon is still valid
          const now = new Date();
          const validUntil = new Date(coupon.validTo);
          const isValid = validUntil >= now;

          return {
            id: coupon._id,
            code: coupon.couponCode,
            discount: discount,
            discountType: coupon.discountType,
            discountPercentage: coupon.discountPercentage,
            discountAmount: coupon.discountAmount,
            description: isPercentage 
              ? `Get ${coupon.discountPercentage}% off on your order` 
              : `Flat ₹${coupon.discountAmount} off on your order`,
            validFrom: validFrom,
            validTo: validTo,
            validUntil: validUntil,
            status: isValid ? "Active" : "Expired",
            isValid: isValid,
            usageCount: coupon.usageCount || 0,
          };
        });
        setCoupons(formattedCoupons);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setCouponsError('Failed to load coupons. Please try again later.');
    } finally {
      setCouponsLoading(false);
    }
  };

  // Fetch coupons when coupons tab is active
  useEffect(() => {
    if (activeTab === "coupons") {
      fetchCoupons();
    }
  }, [activeTab]);

  const sidebarContent = (
    <Box
      sx={{
        width: { xs: 280, md: 280 },
        height: "100%",
        backgroundColor: "#FFF8F2",
        color: "black",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        py: 3,
      }}
    >
      {/* Profile Section */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
          }}
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
        />
        <CustomText variant="h6" sx={{ fontWeight: 'bold', color: "#2c2c2c", fontSize: { xs: 16, md: 20 } }}>
          Aditya Kumar
        </CustomText>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item?.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                setActiveTab(item?.id);
                if (isMobile) setMobileDrawerOpen(false);
                if (item?.id === "logout") {
                  navigate("/login");
                }
              }}
              sx={{
                borderRadius: 2,
                backgroundColor: activeTab === item?.id ? "#FFDFBF" : "transparent",
                color: activeTab === item?.id ? "#2c2c2c" : "#666",
                "&:hover": {
                  backgroundColor: activeTab === item?.id ? "#FFDFBF" : "rgba(255,223,191,0.3)",
                },
                py: 1.5,
              }}
            >
              <ListItemIcon sx={{ color: activeTab === item?.id ? "#FF9472" : "#666", minWidth: 40 }}>
                {item?.icon}
              </ListItemIcon>
              <ListItemText
                primary={item?.label}
                primaryProps={{
                  fontSize: 14,
                  fontWeight: activeTab === item?.id ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 3, md: 0 }, pb: { xs: 8, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container  sx={{ px: { xs: 2, md: 3, lg: 2 }, py: 4 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: { xs: "auto", md: "80vh" },
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 0 },
          }}
        >
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Box
              sx={{
                width: { md: 280, lg: 300 },
                flexShrink: 0,
                position: "sticky",
                top: { md: 96, lg: 110 },
                alignSelf: "flex-start",
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
              }}
            >
              {sidebarContent}
            </Box>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: 280,
              },
            }}
          >
            {sidebarContent}
          </Drawer>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", md: "auto" },
              ml: { xs: 0, md: 2 },
              position: "relative",
            }}
          >
            {isMobile && (
              <IconButton
                onClick={() => setMobileDrawerOpen(true)}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "#FF9472",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#F2709C",
                  },
                  zIndex: 10,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ width: "100%" }}>
              {activeTab === "dashboard" && (
                <>
                  <Box sx={{ mb: 4 }}>
                    <CustomText
                      variant="h3"
                      sx={{
                        fontSize: { xs: 18, md: 26 },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                        mb: 1,
                        mt: { xs: isMobile ? 0 : 0, md: 0 },
                      }}
                    >
                      Welcome back, Aditya.
                    </CustomText>
                    <CustomText
                      variant="body1"
                      sx={{
                        fontSize: { xs: 14, md: 16 },
                        color: "#333",
                        mb: 2,
                      }}
                    >
                      Here's a quick look at your recent activity and rewards.
                    </CustomText>
                    <CustomText
                      variant="body2"
                      sx={{
                        fontSize: { xs: 13, md: 14 },
                        color: "#333",
                        lineHeight: 1.8,
                      }}
                    >
                      From your account dashboard you can view your{" "}
                      <Box
                        component="span"
                        onClick={() => setActiveTab("order-history")}
                        sx={{
                          color: "#FF9472",
                          textDecoration: "underline",
                          cursor: "pointer",
                          "&:hover": { color: "#F2709C" },
                        }}
                      >
                        recent orders
                      </Box>
                      , manage your{" "}
                      <Box
                        component="span"
                        onClick={() => setActiveTab("addresses")}
                        sx={{
                          color: "#FF9472",
                          textDecoration: "underline",
                          cursor: "pointer",
                          "&:hover": { color: "#F2709C" },
                        }}
                      >
                        shipping and billing addresses
                      </Box>
                      , and edit your password and account details.
                    </CustomText>
                  </Box>

                  <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 5 } }}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <LocalShippingIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "var(--themeColor)", mr: 1.5 }} />
                            <Box>
                              <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                                Recent Order
                              </CustomText>
                              <CustomText variant="body2" sx={{ color: "#666", mb: 1 }}>
                                Order ID: #ORD-001
                              </CustomText>
                            </Box>
                          </Box>
                          <CustomText
                            variant="body2"
                            sx={{
                              color: "#4caf50",
                              fontWeight: 600,
                              mb: 2,
                            }}
                          >
                            Order Status - Out for Delivery
                          </CustomText>
                          <Link to="/track-order">
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#FFB5A1",
                                color: "black",
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 'bold',
                                px: 3,
                                "&:hover": {
                                  backgroundColor: "#F2709C",
                                },
                              }}
                            >
                              Track Order
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <LocalOfferIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "var(--themeColor)", mr: 1.5 }} />
                            <Box>
                              <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                                Loyalty Points
                              </CustomText>
                              <CustomText variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
                                1250
                              </CustomText>
                            </Box>
                          </Box>
                          <CustomText variant="body2" sx={{ color: "#666", mb: 2 }}>
                            You're 250 points away from a free pastry!
                          </CustomText>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#FFB5A1",
                              color: "black",
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 'bold',
                              px: 3,
                              "&:hover": {
                                backgroundColor: "#F2709C",
                              },
                            }}
                          >
                            View Rewards
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <LocalOfferIcon sx={{ fontSize: 32, color: "var(--themeColor)", mr: 1.5 }} />
                            <Box>
                              <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                                Available Coupons
                              </CustomText>
                              <CustomText variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
                                3
                              </CustomText>
                            </Box>
                          </Box>
                          <CustomText variant="body2" sx={{ color: "#666", mb: 2 }}>
                            Including a 20% off your next purchase.
                          </CustomText>
                          <Button
                            onClick={() => setActiveTab("coupons")}
                            variant="contained"
                            sx={{
                              backgroundColor: "#FFB5A1",
                              color: "black",
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 'bold',
                              px: 3,
                              "&:hover": {
                                backgroundColor: "#F2709C",
                              },
                            }}
                          >
                            See Coupon
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 4, border: '1px solid #BEBEBE', borderRadius: { xs: 3, md: 5 }, p: { xs: 2, sm: 3, md: 5 } }}>
                    <CustomText variant="h5" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: { xs: 2, md: 3 }, fontSize: { xs: 18, md: 24 } }}>
                      Your Favorite Items
                    </CustomText>
                    <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                      {favoriteItems.map((item) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item?.id}>
                          <Box
                            sx={{
                              position: "relative",
                              borderRadius: { xs: 1.5, md: 2 },
                              overflow: "hidden",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                              },
                            }}
                          >
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
                            <Box textAlign="center" sx={{ p: { xs: 1, md: 2 } }}>
                              <CustomText variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: 12, md: 14 } }}>
                                {item?.name}
                              </CustomText>
                              <CustomText variant="body2" sx={{ color: "var(--themeColor)", fontWeight: 700, fontSize: { xs: 13, md: 14 } }}>
                                {item?.price}
                              </CustomText>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}

              {/* Order History Section */}
              {activeTab === "order-history" && (
                <Box>
                  <CustomText
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 2,
                    }}
                  >
                    Order History
                  </CustomText>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {orders?.map((order) => (
                      <Grid size={{ xs: 12 }} key={order.id}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
                              <Box>
                                <CustomText variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: 1 }}>
                                  {order.id}
                                </CustomText>
                                <CustomText variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                                  Date: {order.date}
                                </CustomText>
                                <CustomText variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                                  Items: {order.items}
                                </CustomText>
                                <CustomText variant="body2" sx={{ color: "#666", fontWeight: 600, mt: 1 }}>
                                  Total: {order.total}
                                </CustomText>
                              </Box>
                              <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                                <Box
                                  sx={{
                                    display: "inline-block",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 2,
                                    backgroundColor:
                                      order.status === "Delivered"
                                        ? "#4caf50"
                                        : order.status === "Out for Delivery"
                                          ? "#FF9472"
                                          : "#FFB5A1",
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: 12,
                                    mb: 2,
                                  }}
                                >
                                  {order.status}
                                </Box>
                                <Box>
                                  <Link to="/track-order">
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: "#FFB5A1",
                                        color: "black",
                                        textTransform: "none",
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        px: 3,
                                        "&:hover": {
                                          backgroundColor: "#F2709C",
                                        },
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </Link>
                                </Box>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Downloads Section */}
              {activeTab === "downloads" && (
                <Box>
                  <CustomText
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 2,
                    }}
                  >
                    Downloads
                  </CustomText>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {downloads?.map((download) => (
                      <Grid size={{ xs: 12 }} key={download.id}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <DownloadIcon sx={{ fontSize: 40, color: "var(--themeColor)" }} />
                                <Box>
                                  <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c", mb: 0.5 }}>
                                    {download.name}
                                  </CustomText>
                                  <CustomText variant="body2" sx={{ color: "#666" }}>
                                    Downloaded on {download.date} • {download.type}
                                  </CustomText>
                                </Box>
                              </Box>
                              <Button
                                startIcon={<DownloadIcon />}
                                variant="contained"
                                sx={{
                                  backgroundColor: "#FFB5A1",
                                  color: "black",
                                  textTransform: "none",
                                  borderRadius: 2,
                                  fontWeight: 600,
                                  px: 3,
                                  "&:hover": {
                                    backgroundColor: "#F2709C",
                                  },
                                }}
                              >
                                Download
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Saved Addresses Section */}
              {activeTab === "addresses" && (
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
                    <CustomText
                      variant="h4"
                      sx={{
                        fontSize: { xs: 24, md: 32 },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                      }}
                    >
                      Saved Addresses
                    </CustomText>
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      sx={{
                        backgroundColor: "#FFB5A1",
                        color: "black",
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 600,
                        px: 3,
                        "&:hover": {
                          backgroundColor: "#F2709C",
                        },
                      }}
                    >
                      Add New Address
                    </Button>
                  </Box>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {addresses?.map((address) => (
                      <Grid size={{ xs: 12, md: 6 }} key={address.id}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            border: "1px solid var(--themeColor)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                              <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                  <CustomText variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)" }}>
                                    {address.type}
                                  </CustomText>
                                  {address.isDefault && (
                                    <Box
                                      sx={{
                                        px: 1.5,
                                        py: 0.3,
                                        borderRadius: 1,
                                        backgroundColor: "#FFB5A1",
                                        color: "#000",
                                        fontSize: 11,
                                        fontWeight: 600,
                                      }}
                                    >
                                      Default
                                    </Box>
                                  )}
                                </Box>
                                <CustomText variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c", mb: 0.5 }}>
                                  {address.name}
                                </CustomText>
                                <CustomText variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                                  {address.phone}
                                </CustomText>
                                <CustomText variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                                  {address.address}
                                </CustomText>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                              <Button
                                startIcon={<EditIcon />}
                                variant="outlined"
                                sx={{
                                  borderColor: "var(--themeColor)",
                                  color: "var(--themeColor)",
                                  textTransform: "none",
                                  borderRadius: 2,
                                  "&:hover": {
                                    borderColor: "var(--themeColor)",
                                    backgroundColor: "#fbeeee",
                                  },
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                startIcon={<DeleteIcon />}
                                variant="outlined"
                                sx={{
                                  borderColor: "#f44336",
                                  color: "#f44336",
                                  textTransform: "none",
                                  borderRadius: 2,
                                  "&:hover": {
                                    borderColor: "#f44336",
                                    backgroundColor: "#ffebee",
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Account Details Section */}
              {activeTab === "account" && (
                <Box>
                  <CustomText
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 2,
                    }}
                  >
                    Account Details
                  </CustomText>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Last Name"
                        name="fullName"
                        placeholder="First Name"
                        value={accountData.firstName}
                        onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Last Name"
                        placeholder="Last Name"
                        value={accountData.lastName}
                        onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Email"
                        placeholder="Email"
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Phone"
                        placeholder="Phone"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <CustomText variant="h6" sx={{ fontWeight: 600, color: "var(--themeColor)", mb: 2 }}>
                        Change Password
                      </CustomText>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Current Password"
                        placeholder="Current Password"
                        type={showPassword ? "text" : "password"}
                        value={accountData.currentPassword}
                        onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="New Password"
                        placeholder="New Password"
                        type={showPassword ? "text" : "password"}
                        value={accountData.newPassword}
                        onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        value={accountData.confirmPassword}
                        onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#FFB5A1",
                            color: "black",
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            px: 4,
                            "&:hover": {
                              backgroundColor: "#F2709C",
                            },
                          }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* My Coupons Section */}
              {activeTab === "coupons" && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                    <CelebrationIcon sx={{ fontSize: { xs: 32, md: 40 }, color: "var(--themeColor)" }} />
                    <CustomText
                      variant="h4"
                      sx={{
                        fontSize: { xs: 24, md: 32 },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                        background: "linear-gradient(135deg, #FF9472 0%, #F2709C 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      My Coupons
                    </CustomText>
                  </Box>

                  {couponsLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
                      <CircularProgress sx={{ color: "var(--themeColor)" }} />
                    </Box>
                  ) : couponsError ? (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                      {couponsError}
                    </Alert>
                  ) : coupons && coupons.length > 0 ? (
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                      {coupons.map((coupon, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={coupon.id}>
                          <Card
                            sx={{
                              borderRadius: { xs: 3, md: 4 },
                              boxShadow: coupon.isValid
                                ? "0 8px 32px rgba(255,148,114,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset"
                                : "0 4px 16px rgba(0,0,0,0.1)",
                              background: coupon.isValid
                                ? "linear-gradient(145deg, #FF9472 0%, #F2709C 50%, #FF9472 100%)"
                                : "linear-gradient(145deg, #e0e0e0 0%, #bdbdbd 100%)",
                              color: "#fff",
                              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              position: "relative",
                              overflow: "hidden",
                              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                              "@keyframes fadeInUp": {
                                "0%": {
                                  opacity: 0,
                                  transform: "translateY(30px) scale(0.9)",
                                },
                                "100%": {
                                  opacity: 1,
                                  transform: "translateY(0) scale(1)",
                                },
                              },
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: "-50%",
                                left: "-50%",
                                width: "200%",
                                height: "200%",
                                background: coupon.isValid
                                  ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
                                  : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                                animation: coupon.isValid ? "rotate 20s linear infinite" : "none",
                                "@keyframes rotate": {
                                  "0%": { transform: "rotate(0deg)" },
                                  "100%": { transform: "rotate(360deg)" },
                                },
                                zIndex: 0,
                                pointerEvents: "none",
                              },
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: coupon.isValid
                                  ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                                  : "none",
                                animation: coupon.isValid ? "shimmer 3s ease-in-out infinite" : "none",
                                "@keyframes shimmer": {
                                  "0%": { left: "-100%" },
                                  "100%": { left: "100%" },
                                },
                                zIndex: 1,
                                pointerEvents: "none",
                              },
                              "&:hover": {
                                transform: coupon.isValid ? "translateY(-12px) scale(1.02)" : "translateY(-5px)",
                                boxShadow: coupon.isValid
                                  ? "0 20px 60px rgba(255,148,114,0.4), 0 0 0 1px rgba(255,255,255,0.2) inset"
                                  : "0 12px 40px rgba(0,0,0,0.15)",
                                "& .coupon-discount": {
                                  transform: "scale(1.1)",
                                },
                                "& .coupon-code": {
                                  transform: "scale(1.05) rotate(2deg)",
                                },
                              },
                            }}
                          >
                            {/* Decorative Elements */}
                            {coupon.isValid && (
                              <>
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: -20,
                                    right: -20,
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.1)",
                                    zIndex: 1,
                                  }}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: -30,
                                    left: -30,
                                    width: 120,
                                    height: 120,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.08)",
                                    zIndex: 1,
                                  }}
                                />
                              </>
                            )}

                            {!coupon.isValid && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 12,
                                  right: 12,
                                  px: 2,
                                  py: 0.75,
                                  borderRadius: 2,
                                  background: "rgba(0,0,0,0.3)",
                                  backdropFilter: "blur(10px)",
                                  zIndex: 2,
                                  border: "1px solid rgba(255,255,255,0.2)",
                                }}
                              >
                                <CustomText variant="caption" sx={{ fontWeight: 700, fontSize: 11, letterSpacing: 0.5 }}>
                                  EXPIRED
                                </CustomText>
                              </Box>
                            )}

                            <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, position: "relative", zIndex: 2 }}>
                              {/* Discount Badge */}
                              <Box sx={{ mb: 2.5, position: "relative" }}>
                                <Box
                                  className="coupon-discount"
                                  sx={{
                                    display: "inline-block",
                                    transition: "transform 0.3s ease",
                                  }}
                                >
                                  <CustomText
                                    variant="h3"
                                    sx={{
                                      fontWeight: 900,
                                      fontSize: { xs: 36, md: 48 },
                                      lineHeight: 1,
                                      mb: 0.5,
                                      textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                      background: "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.9) 100%)",
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      backgroundClip: "text",
                                    }}
                                  >
                                    {coupon.discount}
                                  </CustomText>
                                  <CustomText
                                    variant="h6"
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: { xs: 14, md: 16 },
                                      opacity: 0.95,
                                      textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    }}
                                  >
                                    OFF
                                  </CustomText>
                                </Box>
                              </Box>

                              {/* Coupon Code */}
                              <Box
                                className="coupon-code"
                                sx={{
                                  mb: 2.5,
                                  px: 2.5,
                                  py: 1.5,
                                  borderRadius: 3,
                                  background: "rgba(255,255,255,0.25)",
                                  backdropFilter: "blur(15px)",
                                  border: "2px dashed rgba(255,255,255,0.5)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  transition: "all 0.3s ease",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1) inset",
                                }}
                              >
                                <CustomText
                                  variant="h6"
                                  sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: 16, md: 18 },
                                    letterSpacing: 1.5,
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {coupon.code}
                                </CustomText>
                                <OfferIcon sx={{ fontSize: { xs: 20, md: 24 }, opacity: 0.8 }} />
                              </Box>

                              {/* Description */}
                              <CustomText
                                variant="body1"
                                sx={{
                                  mb: 2,
                                  opacity: 0.95,
                                  fontSize: { xs: 13, md: 14 },
                                  lineHeight: 1.6,
                                  fontWeight: 500,
                                }}
                              >
                                {coupon.description}
                              </CustomText>

                              {/* Validity Dates */}
                              <Box
                                sx={{
                                  mb: 2.5,
                                  p: 1.5,
                                  borderRadius: 2,
                                  background: "rgba(255,255,255,0.15)",
                                  backdropFilter: "blur(10px)",
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
                                  <CustomText
                                    variant="caption"
                                    sx={{
                                      fontSize: { xs: 10, md: 11 },
                                      opacity: 0.9,
                                      fontWeight: 600,
                                      mr: 1,
                                    }}
                                  >
                                    From:
                                  </CustomText>
                                  <CustomText
                                    variant="body2"
                                    sx={{
                                      fontSize: { xs: 11, md: 12 },
                                      opacity: 0.95,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {coupon.validFrom}
                                  </CustomText>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <CustomText
                                    variant="caption"
                                    sx={{
                                      fontSize: { xs: 10, md: 11 },
                                      opacity: 0.9,
                                      fontWeight: 600,
                                      mr: 1,
                                    }}
                                  >
                                    Until:
                                  </CustomText>
                                  <CustomText
                                    variant="body2"
                                    sx={{
                                      fontSize: { xs: 11, md: 12 },
                                      opacity: 0.95,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {coupon.validTo}
                                  </CustomText>
                                </Box>
                              </Box>

                              {/* Copy Button */}
                              <Button
                                fullWidth
                                variant="contained"
                                disabled={!coupon.isValid}
                                onClick={() => {
                                  navigator.clipboard.writeText(coupon.code);
                                }}
                                startIcon={coupon.isValid ? <ContentCopyIcon /> : null}
                                sx={{
                                  backgroundColor: "#fff",
                                  color: "var(--themeColor)",
                                  textTransform: "none",
                                  borderRadius: 2.5,
                                  fontWeight: 700,
                                  py: 1.75,
                                  fontSize: { xs: 14, md: 15 },
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "#fff",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                  },
                                  "&:active": {
                                    transform: "translateY(0)",
                                  },
                                  "&:disabled": {
                                    backgroundColor: "rgba(255,255,255,0.4)",
                                    color: "rgba(0,0,0,0.3)",
                                    boxShadow: "none",
                                  },
                                }}
                              >
                                {coupon.isValid ? "Copy Code" : "Expired"}
                              </Button>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 10,
                        px: 3,
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                      }}
                    >
                      <OfferIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
                      <CustomText variant="h6" sx={{ color: "#666", mb: 1, fontWeight: 600 }}>
                        No coupons available
                      </CustomText>
                      <CustomText variant="body2" sx={{ color: "#999" }}>
                        Check back later for exciting offers!
                      </CustomText>
                    </Box>
                  )}
                </Box>
              )}

              {/* Wishlist Section */}
              {activeTab === "wishlist" && (
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
                  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                    {favoriteItems.map((item) => (
                      <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item?.id}>
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
                              sx={{
                                position: "absolute",
                                top: { xs: 4, md: 8 },
                                right: { xs: 4, md: 8 },
                                backgroundColor: "rgba(255,255,255,0.9)",
                                padding: { xs: 0.5, md: 1 },
                                "&:hover": {
                                  backgroundColor: "#fff",
                                },
                              }}
                            >
                              <FavoriteIcon sx={{ color: "#f44336", fontSize: { xs: 18, md: 24 } }} />
                            </IconButton>
                          </Box>
                          <CardContent sx={{ p: { xs: 1.5, md: 2 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                            <CustomText variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: 13, md: 16 } }}>
                              {item?.name}
                            </CustomText>
                            <CustomText variant="body2" sx={{ color: "var(--themeColor)", fontWeight: 700, mb: { xs: 1.5, md: 2 }, fontSize: { xs: 13, md: 14 } }}>
                              {item?.price}
                            </CustomText>
                            <Button
                              fullWidth
                              variant="contained"
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
                              Add to Cart
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Settings Section */}
              {activeTab === "settings" && (
                <Box>
                  <CustomText
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 4,
                    }}
                  >
                    Settings
                  </CustomText>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid size={{ xs: 12 }}>
                      <CustomText variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: 2 }}>
                        Account Actions
                      </CustomText>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "var(--themeColor)",
                            color: "var(--themeColor)",
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            "&:hover": {
                              borderColor: "var(--themeColor)",
                              backgroundColor: "#fbeeee",
                            },
                          }}
                        >
                          Export Data
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#f44336",
                            color: "#f44336",
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            "&:hover": {
                              borderColor: "#f44336",
                              backgroundColor: "#ffebee",
                            },
                          }}
                        >
                          Delete Account
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

