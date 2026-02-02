import React, { useEffect, useState } from "react";
import { Box, Container, Button, CircularProgress, Alert } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { verifyOrderPayment } from "../../utils/apiService";
import { useAppDispatch } from "../../store/hooks";
import { loadCartItems } from "../../store/cartSlice";

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'failure'
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // From Cart after immediate verify (no Razorpay redirect)
    const stateOrderId = location.state?.orderId;
    if (stateOrderId) {
      setOrderId(stateOrderId);
      setStatus("success");
      dispatch(loadCartItems());
      return;
    }

    // From Razorpay redirect: URL params or sessionStorage
    const id =
      searchParams.get("orderId") ||
      searchParams.get("order_id") ||
      sessionStorage.getItem("pendingOrderId") ||
      "";

    if (!id) {
      setStatus("failure");
      setError("Invalid return. No order ID found.");
      return;
    }

    setOrderId(id);

    const verify = async () => {
      try {
        const res = await verifyOrderPayment(id);
        if (res?.success) {
          sessionStorage.removeItem("pendingOrderId");
          dispatch(loadCartItems());
          setStatus("success");
        } else {
          setStatus("failure");
          setError(res?.message || "Payment verification failed.");
        }
      } catch (err) {
        setStatus("failure");
        setError(err.message || "Payment verification failed. Please try again.");
      }
    };

    verify();
  }, [searchParams, location.state, dispatch]);

  return (
    <Box sx={{ minHeight: "60vh", py: 6, px: 2 }}>
      <Container maxWidth="sm">
        {status === "loading" && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={48} sx={{ color: "var(--themeColor)" }} />
            <CustomText sx={{ fontSize: 16, color: "#666" }}>
              Verifying your payment...
            </CustomText>
          </Box>
        )}

        {status === "success" && (
          <Box sx={{ textAlign: "center" }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: "#2e7d32", mb: 2 }} />
            <CustomText variant="h5" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
              Order placed successfully!
            </CustomText>
            <CustomText sx={{ fontSize: 14, color: "#666", mb: 3 }}>
              Order ID: {orderId}
            </CustomText>
            <Button
              variant="contained"
              onClick={() => navigate("/track-order")}
              sx={{
                backgroundColor: "var(--themeColor)",
                textTransform: "none",
                px: 3,
                py: 1.5,
                "&:hover": { backgroundColor: "var(--specialColor)" },
              }}
            >
              Track Order
            </Button>
          </Box>
        )}

        {status === "failure" && (
          <Box>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Button
              variant="outlined"
              onClick={() => navigate("/cart")}
              sx={{
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                textTransform: "none",
              }}
            >
              Back to Cart
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};
