import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { LocalShipping as LocalShippingIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { CustomText } from "../comman/CustomText";
import { ProfileTable } from "./ProfileTable";
import blankImage from "../../assets/blankimage.png";

const getStatusMeta = (status) => {
  const raw = (status || "").toString().trim();
  const key = raw.toUpperCase();
  const map = {
    PLACED: { label: "Placed", color: "#4caf50" },
    CONFIRMED: { label: "Confirmed", color: "#FF9472" },
    PREPARING: { label: "Preparing", color: "#FFB5A1" },
    READY: { label: "Ready", color: "#1976d2" },
    DISPATCHED: { label: "Dispatched", color: "#FF9472" },
    DELIVERED: { label: "Delivered", color: "#4caf50" },
    CANCELLED: { label: "Cancelled", color: "#d32f2f" },
  };
  if (map[key]) return map[key];
  return { label: raw || "—", color: "#FFB5A1" };
};

export const DashboardTab = ({ favoriteItems, setActiveTab, isMobile, userProfile, recentOrder, recentOrderRaw, ordersLoading }) => {
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  // Get user's first name or fallback to "User"
  const getUserName = () => {
    if (userProfile?.name) {
      // Get first name from full name
      const firstName = userProfile.name.split(' ')[0];
      return firstName;
    }
    if (userProfile?.email) {
      // Get name from email (before @)
      return userProfile.email.split('@')[0];
    }
    return "User";
  };

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <CustomText variant="h3" sx={{ fontSize: { xs: 18, md: 26 }, fontWeight: 700, color: "var(--themeColor)", mb: 1, mt: { xs: isMobile ? 0 : 0, md: 0 }, }}>
          Welcome back, {getUserName()}.
        </CustomText>
        <CustomText variant="body1" sx={{ fontSize: { xs: 14, md: 16 }, color: "#333", }}>
          Here's a quick look at your recent activity and rewards.
        </CustomText>
        <CustomText variant="body2" sx={{ fontSize: { xs: 13, md: 14 }, color: "#333", lineHeight: 1.8, }}>
          From your account dashboard you can view your{" "}
          <Box component="span" onClick={() => setActiveTab("order-history")} sx={{ color: "#FF9472", textDecoration: "underline", cursor: "pointer", "&:hover": { color: "#F2709C" }, }}>
            recent orders
          </Box>
          , manage your{" "}
          <Box component="span" onClick={() => setActiveTab("addresses")} sx={{ color: "#FF9472", textDecoration: "underline", cursor: "pointer", "&:hover": { color: "#F2709C" }, }}>
            shipping and billing addresses
          </Box>
          , and edit your password and account details.
        </CustomText>
      </Box>

      <Box sx={{ width: "100%", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalShippingIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "var(--themeColor)", mr: 1.5 }} />
            <Box>
              <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                Recent Order
              </CustomText>
              {ordersLoading ? (
                <CustomText variant="body2" sx={{ color: "#666", display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={14} />
                  Loading...
                </CustomText>
              ) : (
                <CustomText variant="body2" sx={{ color: "#666" }}>
                  Order ID: {recentOrder?.id || "—"}
                </CustomText>
              )}
            </Box>
          </Box>
          <Box>
            <CustomText variant="body2" sx={{ color: "#4caf50", fontWeight: 600, mb: 1, }}>
          Order Status - {ordersLoading ? "Loading..." : (recentOrder?.status || "—")}
        </CustomText>
          <Button
            onClick={() => setOrderDetailsOpen(true)}
            disabled={!recentOrderRaw}
            size="small"
            variant="contained"
            sx={{
              bgcolor: "var(--themeColor)",
              color: "#fff",
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              px: 2,
              py: 1,
              boxShadow: "0 2px 8px rgba(95, 41, 48, 0.25)",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "var(--specialColor)",
                boxShadow: "0 4px 12px rgba(95, 41, 48, 0.3)",
              },
              "&:disabled": { bgcolor: "#ccc", color: "#888" },
            }}
          >
            View Details
          </Button>
          </Box>
        </Box>
      </Box>

      <CustomText variant="h5" sx={{ fontWeight: 700, color: "var(--themeColor)", fontSize: { xs: 18, md: 24 }, mb: 1 }}>
        Your Recent Items
      </CustomText>
      {Array.isArray(favoriteItems) && favoriteItems.length > 0 ? (
        <ProfileTable
          data={favoriteItems}
          getRowKey={(item) => item?.id}
          columns={[
            {
              id: "product",
              label: "Product",
              render: (item) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={item?.image || blankImage}
                    alt={item?.name || "Product"}
                    variant="rounded"
                    onError={(e) => {
                      e.target.src = blankImage;
                    }}
                    sx={{
                      width: { xs: 40, md: 60 },
                      height: { xs: 40, md: 60 },
                      borderRadius: 1.5,
                      cursor: "pointer",
                      "&:hover": { opacity: 0.8 },
                    }}
                    onClick={() => item?.id && (window.location.href = `/products/${item.id}`)}
                  />
                  <CustomText
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: 13, md: 14 },
                      color: "#2c2c2c",
                      cursor: "pointer",
                      "&:hover": { color: "var(--themeColor)" },
                      textTransform: "none",
                    }}
                    onClick={() => item?.id && (window.location.href = `/products/${item.id}`)}
                  >
                    {item?.name}
                  </CustomText>
                </Box>
              ),
            },
            {
              id: "price",
              label: "Price",
              render: (item) => (
                <CustomText sx={{ fontWeight: 700, color: "var(--themeColor)", fontSize: { xs: 14, md: 16 }, textTransform: "none" }}>
                  {item?.price}
                </CustomText>
              ),
            },
            {
              id: "action",
              label: "Action",
              align: "center",
              render: (item) => (
                <Button
                  component={Link}
                  to={item?.id ? `/products/${item.id}` : "/products"}
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "var(--themeColor)",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    px: 2,
                    py: 0.75,
                    boxShadow: "0 2px 6px rgba(95, 41, 48, 0.2)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "var(--specialColor)",
                      boxShadow: "0 3px 10px rgba(95, 41, 48, 0.28)",
                    },
                  }}
                >
                  View
                </Button>
              ),
            },
          ]}
        />
      ) : (
        <Box sx={{ border: '1px solid #BEBEBE', borderRadius: { xs: 3, md: 5 }, p: { xs: 0.5, sm: 1, md: 3 } }}>
          <CustomText sx={{ color: "#666", fontSize: 14, py: 2, textAlign: "center" }}>
            No recently viewed items yet.
          </CustomText>
        </Box>
      )}

      <Dialog
        open={orderDetailsOpen}
        onClose={() => setOrderDetailsOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pr: 6 }}>
          <CustomText sx={{ fontSize: 18, fontWeight: 700, color: "var(--themeColor)" }}>
            Order Details
          </CustomText>
          <IconButton
            onClick={() => setOrderDetailsOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "70vh" }}>
          {recentOrderRaw ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              <CustomText sx={{ fontSize: 14, fontWeight: 700 }}>
                #{recentOrderRaw?.orderId || recentOrderRaw?._id || recentOrderRaw?.id || "—"}
              </CustomText>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: getStatusMeta(
                      (recentOrderRaw?.order_state || recentOrderRaw?.orderStatus || recentOrderRaw?.status || "").toString()
                    ).color,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {getStatusMeta(
                    (recentOrderRaw?.order_state || recentOrderRaw?.orderStatus || recentOrderRaw?.status || "").toString()
                  ).label}
                </Box>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  Payment: {recentOrderRaw?.paymentMode || "—"} / {recentOrderRaw?.paymentStatus || "—"}
                </CustomText>
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Delivery Address</CustomText>
              <Box sx={{ bgcolor: "#fafafa", border: "1px solid #eee", borderRadius: 2, p: 1.5 }}>
                <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                  {recentOrderRaw?.deliveryAddress?.name || "—"}{" "}
                  {recentOrderRaw?.deliveryAddress?.phone ? `(${recentOrderRaw?.deliveryAddress.phone})` : ""}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[
                    recentOrderRaw?.deliveryAddress?.houseNumber,
                    recentOrderRaw?.deliveryAddress?.streetName,
                    recentOrderRaw?.deliveryAddress?.area,
                    recentOrderRaw?.deliveryAddress?.landmark,
                  ]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[recentOrderRaw?.deliveryAddress?.city, recentOrderRaw?.deliveryAddress?.state].filter(Boolean).join(", ")}
                  {recentOrderRaw?.deliveryAddress?.zipCode ? ` - ${recentOrderRaw?.deliveryAddress.zipCode}` : ""}
                </CustomText>
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Items</CustomText>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {(recentOrderRaw?.items || []).map((it, i) => (
                  <Box
                    key={`${it.product || it._id || i}`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      bgcolor: "#fff",
                      border: "1px solid #eee",
                      borderRadius: 2,
                      p: 1.25,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>{it.name || "—"}</CustomText>
                      <CustomText sx={{ fontSize: 12, color: "#666" }}>
                        Qty: {it.quantity || 0} × ₹{Number(it.rate ?? 0).toFixed(2)}
                        {it.tax != null && !Number.isNaN(Number(it.tax)) ? ` · Tax: ₹${Number(it.tax).toFixed(2)}` : ""}
                      </CustomText>
                    </Box>
                    <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "var(--themeColor)" }}>
                      ₹{Number(it.total ?? 0).toFixed(2)}
                    </CustomText>
                  </Box>
                ))}
                {(!recentOrderRaw?.items || recentOrderRaw?.items.length === 0) && (
                  <CustomText sx={{ fontSize: 13, color: "#666" }}>No items</CustomText>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Totals</CustomText>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 0.5 }}>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>Subtotal</CustomText>
                <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                  {recentOrderRaw?.order_subtotal != null ? `₹${Number(recentOrderRaw?.order_subtotal).toFixed(2)}` : "—"}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>Tax</CustomText>
                <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                  {(recentOrderRaw?.order_level_total_taxes ?? recentOrderRaw?.item_taxes) != null
                    ? `₹${Number(recentOrderRaw?.order_level_total_taxes ?? recentOrderRaw?.item_taxes).toFixed(2)}`
                    : "—"}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>Discount</CustomText>
                <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                  {recentOrderRaw?.discount != null ? `₹${Number(recentOrderRaw?.discount).toFixed(2)}` : "—"}
                </CustomText>
                <CustomText sx={{ fontSize: 14, fontWeight: 800 }}>Grand Total</CustomText>
                <CustomText sx={{ fontSize: 14, fontWeight: 800, color: "var(--themeColor)" }}>
                  {recentOrderRaw?.total_charges != null ? `₹${Number(recentOrderRaw?.total_charges).toFixed(2)}` : "—"}
                </CustomText>
              </Box>

              {recentOrderRaw?.receipt?.pdfUrl && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333", mb: 0.5 }}>Receipt</CustomText>
                  {recentOrderRaw?.receipt?.generatedAt && (
                    <CustomText sx={{ fontSize: 12, color: "#666" }}>
                      Generated on{" "}
                      {new Date(recentOrderRaw.receipt.generatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </CustomText>
                  )}
                  <Button
                    component="a"
                    href={recentOrderRaw.receipt.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      bgcolor: "var(--themeColor)",
                      color: "#fff",
                      fontWeight: 600,
                      width: "fit-content",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(95, 41, 48, 0.25)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "var(--specialColor)",
                        boxShadow: "0 4px 12px rgba(95, 41, 48, 0.3)",
                      },
                    }}
                  >
                    Download receipt (PDF)
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <CustomText sx={{ fontSize: 14, color: "#666" }}>No order details available.</CustomText>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
