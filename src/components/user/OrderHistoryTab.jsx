import { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import CloseIcon from "@mui/icons-material/Close";

const DEFAULT_LIMIT = 5;

export const OrderHistoryTab = ({
  orders = [],
  page = 1,
  totalCount = 0,
  limit = DEFAULT_LIMIT,
  onPageChange,
  loading = false,
}) => {
  const totalPages = Math.max(1, Math.ceil(Number(totalCount) / Number(limit)));
  const handlePageChange = (_, value) => {
    if (typeof onPageChange === "function") onPageChange(value);
  };
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const normalizedOrders = useMemo(() => {
    const list = Array.isArray(orders) ? orders : [];
    console.log(list, 'list')
    return list.map((o) => {
      const id = o?.orderId || o?._id || o?.id || "—";
      const createdAt = o?.createdAt || o?.created_at || o?.date;
      const itemsCount = Array.isArray(o?.items) ? o.items.length : (o?.itemsCount || 0);
      const total =
        o?.total_charges ??
        o?.totalAmount ??
        o?.pricing?.grandTotal ??
        o?.amountPaid ??
        o?.amount ??
        o?.total;
      const statusRaw = (o?.order_state || o?.orderStatus || o?.status || "").toString();
      const statusMeta = getStatusMeta(statusRaw);

      let dateLabel = "—";
      if (createdAt) {
        try {
          dateLabel = new Date(createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        } catch {
          dateLabel = String(createdAt);
        }
      }

      const totalLabel =
        total != null && !Number.isNaN(Number(total)) ? `₹${Number(total).toFixed(2)}` : "—";

      return {
        raw: o,
        idLabel: `#${id}`,
        dateLabel,
        itemsCount,
        totalLabel,
        statusRaw,
        statusLabel: statusMeta.label,
        statusColor: statusMeta.color,
      };
    });
  }, [orders]);

  const handleOpen = (o) => {
    setSelectedOrder(o);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Box>
      <CustomText variant="h4" sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: "var(--themeColor)", mb: 2, }}>
        Order History
      </CustomText>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "var(--themeColor)" }} />
        </Box>
      ) : (
        <>
      <Box sx={{ maxHeight: { xs: "70vh", md: "68vh" }, overflowY: "auto", pr: 1, }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {normalizedOrders.map((o, idx) => (
            <Grid size={{ xs: 12 }} key={`${o.idLabel}-${idx}`}>
              <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", }, }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
                    <Box>
                      <CustomText variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: 1 }}>
                        {o.idLabel}
                      </CustomText>
                      <CustomText variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                        Date: {o.dateLabel}
                      </CustomText>
                      <CustomText variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                        Items: {o.itemsCount}
                      </CustomText>
                      <CustomText variant="body2" sx={{ color: "#666", fontWeight: 600, mt: 1 }}>
                        Total: {o.totalLabel}
                      </CustomText>
                    </Box>
                    <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          backgroundColor: o.statusColor,
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 12,
                          mb: 2,
                        }}
                      >
                        {o.statusLabel}
                      </Box>
                      <Box>
                        <Button
                          onClick={() => handleOpen(o.raw)}
                          variant="contained"
                          size="small"
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
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, pb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": { fontWeight: 600 },
            }}
          />
        </Box>
      )}
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pr: 6 }}>
          <CustomText sx={{ fontSize: 18, fontWeight: 700, color: "var(--themeColor)" }}>
            Order Details
          </CustomText>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "70vh" }}>
          {selectedOrder ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              <CustomText sx={{ fontSize: 14, fontWeight: 700 }}>
                #{selectedOrder?.orderId || selectedOrder?._id || selectedOrder?.id || "—"}
              </CustomText>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: getStatusMeta(
                      (selectedOrder?.order_state || selectedOrder?.orderStatus || selectedOrder?.status || "").toString()
                    ).color,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {getStatusMeta(
                    (selectedOrder?.order_state || selectedOrder?.orderStatus || selectedOrder?.status || "").toString()
                  ).label}
                </Box>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  Payment: {selectedOrder?.paymentMode || "—"} / {selectedOrder?.paymentStatus || "—"}
                </CustomText>
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Delivery Address</CustomText>
              <Box sx={{ bgcolor: "#fafafa", border: "1px solid #eee", borderRadius: 2, p: 1.5 }}>
                <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                  {selectedOrder?.deliveryAddress?.name || "—"} {selectedOrder?.deliveryAddress?.phone ? `(${selectedOrder?.deliveryAddress.phone})` : ""}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[
                    selectedOrder?.deliveryAddress?.houseNumber,
                    selectedOrder?.deliveryAddress?.streetName,
                    selectedOrder?.deliveryAddress?.area,
                    selectedOrder?.deliveryAddress?.landmark,
                  ].filter(Boolean).join(", ") || "—"}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[
                    selectedOrder?.deliveryAddress?.city,
                    selectedOrder?.deliveryAddress?.state,
                  ].filter(Boolean).join(", ")}
                  {selectedOrder?.deliveryAddress?.zipCode ? ` - ${selectedOrder?.deliveryAddress.zipCode}` : ""}
                </CustomText>
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Items</CustomText>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {(selectedOrder?.items || []).map((it, i) => (
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
                      <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                        {it.name || "—"}
                      </CustomText>
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
                {(!selectedOrder?.items || selectedOrder?.items.length === 0) && (
                  <CustomText sx={{ fontSize: 13, color: "#666" }}>No items</CustomText>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Totals</CustomText>
              {(() => {
                const items = selectedOrder?.items || [];
                const orderTax =
                  selectedOrder?.order_level_total_taxes ??
                  selectedOrder?.item_taxes ??
                  (items.length ? items.reduce((sum, it) => sum + Number(it.tax ?? 0), 0) : null);
                const hasTax = orderTax != null && !Number.isNaN(Number(orderTax));
                return (
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 0.5 }}>
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>Subtotal</CustomText>
                    <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                      {selectedOrder?.order_subtotal != null ? `₹${Number(selectedOrder?.order_subtotal).toFixed(2)}` : "—"}
                    </CustomText>
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>Tax</CustomText>
                    <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                      {hasTax ? `₹${Number(orderTax).toFixed(2)}` : "—"}
                    </CustomText>
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>Discount</CustomText>
                    <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                      {selectedOrder?.discount != null ? `₹${Number(selectedOrder?.discount).toFixed(2)}` : "—"}
                    </CustomText>
                    <CustomText sx={{ fontSize: 14, fontWeight: 800 }}>Grand Total</CustomText>
                    <CustomText sx={{ fontSize: 14, fontWeight: 800, color: "var(--themeColor)" }}>
                      {selectedOrder?.total_charges != null ? `₹${Number(selectedOrder?.total_charges).toFixed(2)}` : "—"}
                    </CustomText>
                  </Box>
                );
              })()}

              {selectedOrder?.receipt?.pdfUrl && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <CustomText sx={{ fontSize: 13, fontWeight: 700, color: "#333", mb: 0.5 }}>Receipt</CustomText>
                  {selectedOrder?.receipt.generatedAt && (
                    <CustomText sx={{ fontSize: 12, color: "#666" }}>
                      Generated on{" "}
                      {new Date(selectedOrder?.receipt.generatedAt).toLocaleDateString("en-GB", {
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
                    href={selectedOrder?.receipt.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "var(--themeColor)",
                      color: "#fff",
                      width: "fit-content",
                      "&:hover": { backgroundColor: "var(--specialColor)" },
                    }}
                  >
                    Download receipt (PDF)
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <CustomText sx={{ fontSize: 14, color: "#666" }}>No order selected.</CustomText>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

