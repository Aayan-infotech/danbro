import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadCartItems, updateCartItemQuantity, removeCartItem, clearCartItems } from "../../store/cartSlice";
import { getGuestWishlist } from "../../store/guestSlice";
import { getAccessToken } from "../../utils/cookies";
import { getMyAddresses, getAllCoupons, validateCoupon } from "../../utils/apiService";
import { initiateOrderSelf, initiateOrderOther } from "../../utils/apiService";
import { CartItem } from "../../components/cart/CartItem";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { AddressSection } from "../../components/cart/AddressSection";
import { EmptyCart } from "../../components/cart/EmptyCart";
import { LocalShipping as LocalShippingIcon, Schedule as ScheduleIcon, Note as NoteIcon } from "@mui/icons-material";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux state
  const {
    items: cartItems,
    cartTotal,
    loading,
    error,
    updatingItems,
    updatingAction,
    isGuest,
    cartSubtotal,
    cartTaxTotal,
    cartDiscount,
    cartFinalAmount,
  } = useAppSelector((state) => state.cart);
  const guestWishlist = useAppSelector(getGuestWishlist);

  // Local state for addresses and coupons
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('self'); // 'self' or 'someone_else'
  // For "OTHER" orders (guest-style address entry)
  const [someoneElseData, setSomeoneElseData] = useState({
    name: "",
    phone: "",
    houseNumber: "",
    streetName: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [coupons, setCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  // Order initiation state
  const [orderInitiating, setOrderInitiating] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentVerifying, setPaymentVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failure', null

  const getItemKey = (productId, weight) => `${productId ?? ""}|${weight ?? ""}`;

  const getDisplayAddress = () => {
    if (deliveryType === "self" && selectedAddress) {
      const addr = addresses.find((a) => (a._id || a.id) === selectedAddress);
      if (addr) {
        const parts = [addr.houseNumber, addr.streetName, addr.area, addr.landmark && `Near ${addr.landmark}`, addr.city, addr.state, addr.zipCode].filter(Boolean);
        return parts.join(", ");
      }
    }
    const o = someoneElseData;
    if (o?.houseNumber || o?.streetName || o?.area || o?.city) {
      const parts = [o.houseNumber, o.streetName, o.area, o.landmark && `Near ${o.landmark}`, o.city, o.state, o.zipCode].filter(Boolean);
      return parts.join(", ");
    }
    return "";
  };

  useEffect(() => {
    dispatch(loadCartItems());
    loadAddresses();
    loadCoupons();
  }, [dispatch]);

  // Scroll to top when order error appears so user sees it without scrolling
  useEffect(() => {
    if (orderError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderError]);

  const loadAddresses = async () => {
    try {
      setAddressesLoading(true);
      const token = getAccessToken();
      if (!token) {
        setAddresses([]);
        return;
      }
      const data = await getMyAddresses();
      setAddresses(data || []);
      const defaultAddress = data?.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id || defaultAddress.id);
      } else if (data && data.length > 0) {
        setSelectedAddress(data[0]._id || data[0].id);
      }
    } catch (err) {
      console.error("Error loading addresses:", err);
      setAddresses([]);
    } finally {
      setAddressesLoading(false);
    }
  };

  const loadCoupons = async () => {
    try {
      setCouponsLoading(true);
      const response = await getAllCoupons();
      if (response && response.data) {
        const formattedCoupons = response.data.map((coupon) => {
          const isPercentage = coupon.discountType === "ITEM_DISCOUNT_PERCENTAGE";
          const discount = isPercentage
            ? `${coupon.discountPercentage}%`
            : `₹${coupon.discountAmount}`;

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
            isValid: isValid,
          };
        }).filter(coupon => coupon.isValid); // Only show valid coupons
        setCoupons(formattedCoupons);
      }
    } catch (err) {
      console.error("Error loading coupons:", err);
      setCoupons([]);
    } finally {
      setCouponsLoading(false);
    }
  };

  const handleAddressSuccess = () => {
    loadAddresses();
    setAddressDialogOpen(false);
  };

  const handleCouponSelect = (couponId) => {
    const coupon = coupons.find(c => c.id === couponId);
    if (coupon) {
      setSelectedCoupon(couponId);
      setAppliedCoupon({
        code: coupon.code,
        discountPercent: coupon.discountPercentage || 0,
        discountAmount: coupon.discountAmount || 0,
        discountType: coupon.discountType,
      });
      setCouponCode(coupon.code);
      setCouponError("");
    }
  };

  const handleInitiateOrder = async () => {
    if (isGuest) {
      navigate("/login", {
        state: {
          fromCart: true,
          cartItems: cartItems?.map((item) => ({
            productId: item?.productId || item?.id,
            quantity: Number(item?.quantity) || 1,
          })) || [],
          wishlist: guestWishlist || [],
          appliedCoupon: appliedCoupon?.code ? { couponCode: appliedCoupon.code } : undefined,
        },
      });
      return;
    }
    try {
      setOrderInitiating(true);
      setOrderError("");
      setPaymentStatus(null);
      let orderResponse;
      if (deliveryType === 'self') {
        if (!selectedAddress) {
          setOrderError("Please select a delivery address");
          setOrderInitiating(false);
          return;
        }
        orderResponse = await initiateOrderSelf({
          addressId: selectedAddress,
          paymentMode: paymentMode,
          instructions: deliveryInstructions,
          couponCode: appliedCoupon?.code || couponCode || undefined,
        });
      } else {
        if (
          !someoneElseData?.name ||
          !someoneElseData?.phone ||
          !someoneElseData?.houseNumber ||
          !someoneElseData?.streetName ||
          !someoneElseData?.area ||
          !someoneElseData?.city ||
          !someoneElseData?.state ||
          !someoneElseData?.zipCode
        ) {
          setOrderError("Please fill in all required delivery address fields");
          setOrderInitiating(false);
          return;
        }
        const nameTrim = (someoneElseData?.name || "").trim();
        const phoneTrim = (someoneElseData?.phone || "").trim();
        const nameValid = /^[a-zA-Z\s.'-]+$/.test(nameTrim);
        const phoneValid = /^\d{10}$/.test(phoneTrim.replace(/\D/g, ""));
        if (!nameValid || nameTrim.length < 2) {
          setOrderError("Recipient name should contain only letters and spaces (at least 2 characters).");
          setOrderInitiating(false);
          return;
        }
        if (!phoneValid) {
          setOrderError("Please enter a valid 10 digit phone number.");
          setOrderInitiating(false);
          return;
        }
        orderResponse = await initiateOrderOther({
          deliveryAddress: {
            name: someoneElseData?.name,
            phone: someoneElseData?.phone,
            houseNumber: someoneElseData?.houseNumber,
            streetName: someoneElseData?.streetName,
            area: someoneElseData?.area,
            landmark: someoneElseData?.landmark,
            city: someoneElseData?.city,
            state: someoneElseData?.state,
            zipCode: someoneElseData?.zipCode,
          },
          paymentMode: paymentMode,
          instructions: deliveryInstructions,
          couponCode: appliedCoupon?.code || couponCode || undefined,
        });
      }
      const orderId = orderResponse?.orderId;
      const paymentLink = orderResponse?.paymentLink;
      const intentId = orderResponse?.intentId;
      const responsePaymentMode = (orderResponse?.paymentMode || paymentMode || "").toString().toUpperCase();

      if (!orderId) {
        throw new Error("Order initiation failed: No order ID received");
      }

      if (responsePaymentMode === "COD") {
        if (intentId) {
          sessionStorage.setItem("pendingIntentId", intentId);
          sessionStorage.setItem("pendingOrderId", orderId);
        }
        dispatch(loadCartItems());
        navigate("/order-success", {
          state: {
            orderId,
            orderDetails: {
              orderId,
              amount: orderResponse?.amount,
              intentId,
            },
            intentId,
          },
        });
        return;
      }

      if (paymentLink && intentId) {
        sessionStorage.setItem("pendingIntentId", intentId);
        sessionStorage.setItem("pendingOrderId", orderId);
        window.location.href = paymentLink;
        return;
      }

      setOrderError("Order initiated but payment link missing. Please contact support.");
    } catch (error) {
      console.error("Order initiation error:", error);
      setOrderError(error.message || "Failed to initiate order. Please try again.");
      setPaymentStatus('failure');
    } finally {
      setOrderInitiating(false);
    }
  };

  const updateQuantity = async (productId, change, weight) => {
    const itemKey = getItemKey(productId, weight);
    if (updatingItems.has(itemKey)) return;

    try {
      await dispatch(updateCartItemQuantity({ productId, change, weight }));
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId, weight) => {
    try {
      await dispatch(removeCartItem({ productId, weight }));
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Remove all items from your cart?")) return;
    try {
      await dispatch(clearCartItems());
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // Apply coupon (validate API – works for guest and logged-in)
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    if (!cartItems?.length) {
      setCouponError("Add items to cart to apply a coupon");
      return;
    }

    setApplyingCoupon(true);
    setCouponError("");

    try {
      const cart = cartItems.map((item) => ({
        productId: item?.productId || item?.id,
        quantity: Number(item?.quantity) || 1,
      }));
      const res = await validateCoupon(couponCode.trim(), cart);

      const valid = res?.valid === true;
      const discountType = res?.discountType || "";
      const discountValue = Number(res?.discount) || 0;

      if (valid && discountType) {
        const isPercentage = discountType === "ITEM_DISCOUNT_PERCENTAGE";
        setAppliedCoupon({
          code: couponCode.trim(),
          discountPercent: isPercentage ? discountValue : 0,
          discountAmount: isPercentage ? 0 : discountValue,
          discountType,
        });
        setCouponCode("");
      } else {
        setCouponError(res?.message || "Invalid or expired coupon");
      }
    } catch (err) {
      console.error("Error validating coupon:", err);
      setCouponError(err?.message || "Failed to apply coupon");
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setSelectedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Calculate subtotal from cart items (guest items have lineTotal = rate * qty already)
  const subtotal = cartItems?.reduce((sum, item) => {
    if (item?.lineTotal != null && !isNaN(item?.lineTotal)) {
      return sum + Number(item?.lineTotal);
    }
    let itemPrice = 0;
    if (Array.isArray(item?.price) && item?.price.length > 0) {
      itemPrice = item?.price[0].rate || item?.price[0].mrp || 0;
    } else if (typeof item?.price === "object" && item?.price && (item?.price.rate != null || item?.price.mrp != null)) {
      itemPrice = Number(item?.price.rate) || Number(item?.price.mrp) || 0;
    } else if (typeof item?.price === "number") {
      itemPrice = item?.price;
    }
    const quantity = typeof item?.quantity === "number" ? item?.quantity : parseInt(item?.quantity, 10) || 0;
    return sum + itemPrice * quantity;
  }, 0);

  // Use API summary when available (logged-in cart/get), otherwise calculate
  const hasApiSummary = cartSubtotal != null || cartFinalAmount != null;
  const finalSubtotal = hasApiSummary && cartSubtotal != null ? cartSubtotal : (cartTotal > 0 ? cartTotal : subtotal);
  const taxTotal = hasApiSummary && cartTaxTotal != null ? cartTaxTotal : 0;

  // Discount: from API when available, else from applied coupon
  let discount = 0;
  if (hasApiSummary && cartDiscount != null) {
    discount = cartDiscount;
  } else if (appliedCoupon) {
    if (appliedCoupon.discountType === "ITEM_DISCOUNT_PERCENTAGE") {
      discount = (finalSubtotal * (appliedCoupon.discountPercent || 0)) / 100;
    } else if (appliedCoupon.discountType === "ITEM_DISCOUNT_AMOUNT") {
      discount = Math.min(appliedCoupon.discountAmount || 0, finalSubtotal);
    } else {
      if (appliedCoupon.discountPercent) {
        discount = (finalSubtotal * appliedCoupon.discountPercent) / 100;
      } else if (appliedCoupon.discountAmount) {
        discount = Math.min(appliedCoupon.discountAmount, finalSubtotal);
      }
    }
  }

  const shipping = finalSubtotal > 50 ? 0 : 5.0;
  const total = hasApiSummary && cartFinalAmount != null ? cartFinalAmount : finalSubtotal - discount + shipping;

  return (
    <Box sx={{ minHeight: "100vh", pb: { xs: 14, sm: 12, md: 6 }, boxSizing: "border-box", }}>
      <Container sx={{ px: { xs: 0, sm: 2, md: 3 }, maxWidth: "100%", width: "100%" }}>
        <Box sx={{ mb: { xs: 1, md: 1.5 } }}>
          <CustomText variant="h4" sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 700, color: "var(--themeColor)" }}>
            Shopping Cart
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 13, md: 15 }, color: "#666" }}>
            {cartItems?.length || 0} {cartItems?.length === 1 ? "item" : "items"} in your cart
          </CustomText>
        </Box>

        {orderError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setOrderError("")}>
            {orderError}
          </Alert>
        )}
        {error && !orderError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading && !cartItems?.length ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : cartItems?.length === 0 ? (
          <EmptyCart navigate={navigate} />
        ) : (
          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            {/* Left column: Delivery, Preparation, Cart items, Add note */}
            <Grid size={{ xs: 12, md: 8 }} sx={{ order: { xs: 1, md: 1 }, minWidth: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                {!isGuest && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "rgba(230, 120, 80, 0.12)",
                        border: "1px solid rgba(230, 120, 80, 0.25)",
                      }}
                    >
                      <LocalShippingIcon sx={{ color: "var(--themeColor)", fontSize: 24, mt: 0.25 }} />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <CustomText sx={{ fontSize: 15, fontWeight: 600, color: "#2c2c2c", mb: 0.5 }}>
                          Delivery
                        </CustomText>
                        <CustomText sx={{ fontSize: 13, color: "#555" }}>
                          {getDisplayAddress() || "Select delivery address"}
                        </CustomText>
                        <Button
                          size="small"
                          onClick={() => setAddressDialogOpen(true)}
                          sx={{ mt: 1, textTransform: "none", color: "var(--themeColor)", fontWeight: 600, p: 0, minWidth: 0 }}
                        >
                          Change
                        </Button>
                      </Box>
                    </Box>
                    <AddressSection
                      addresses={addresses}
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress}
                      addressesLoading={addressesLoading}
                      addressDialogOpen={addressDialogOpen}
                      setAddressDialogOpen={setAddressDialogOpen}
                      handleAddressSuccess={handleAddressSuccess}
                      deliveryType={deliveryType}
                      setDeliveryType={setDeliveryType}
                      someoneElseData={someoneElseData}
                      setSomeoneElseData={setSomeoneElseData}
                    />
                  </>
                )}
                <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ px: 2, pt: 1, pb: 1, "&:last-child": { pb: 2 } }}>
                    {cartItems?.map((item, index) => (
                      <CartItem
                        key={item?.productId || item?._id || item?.id}
                        item={item}
                        updatingItems={updatingItems}
                        updatingAction={updatingAction}
                        getItemKey={getItemKey}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        compact
                        showDivider={index < (cartItems?.length || 0) - 1}
                      />
                    ))}
                  </CardContent>
                </Card>

                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/products")}
                    disabled={loading}
                    size="small"
                    sx={{
                      borderColor: "var(--themeColor)",
                      color: "var(--themeColor)",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": { borderColor: "var(--specialColor)", color: "var(--specialColor)", backgroundColor: "rgba(195, 46, 6, 0.05)" },
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClearCart}
                    disabled={loading || !cartItems?.length}
                    size="small"
                    sx={{
                      borderColor: "#d32f2f",
                      color: "#d32f2f",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": { borderColor: "#b71c1c", backgroundColor: "rgba(211, 47, 47, 0.08)" },
                    }}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right column: Offers + Bill details + Place order */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ order: { xs: 2, md: 2 }, minWidth: 0 }}>
              <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
                <OrderSummary
                  finalSubtotal={finalSubtotal}
                  taxTotal={taxTotal}
                  discount={discount}
                  shipping={shipping}
                  total={total}
                  appliedCoupon={appliedCoupon}
                  couponError={couponError}
                  applyingCoupon={applyingCoupon}
                  handleRemoveCoupon={handleRemoveCoupon}
                  coupons={coupons}
                  couponsLoading={couponsLoading}
                  selectedCoupon={selectedCoupon}
                  handleCouponSelect={handleCouponSelect}
                  selectedAddress={selectedAddress}
                  cartItems={cartItems}
                  deliveryType={deliveryType}
                  someoneElseData={someoneElseData}
                  onInitiateOrder={handleInitiateOrder}
                  orderInitiating={orderInitiating}
                  paymentMode={paymentMode}
                  setPaymentMode={setPaymentMode}
                  paymentStatus={paymentStatus}
                  paymentVerifying={paymentVerifying}
                  isGuest={isGuest}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
