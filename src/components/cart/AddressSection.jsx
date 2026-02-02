import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { AddressFormDialog } from "../user/AddressFormDialog";
import { getAccessToken } from "../../utils/cookies";

export const AddressSection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
  addressesLoading,
  addressDialogOpen,
  setAddressDialogOpen,
  handleAddressSuccess,
  deliveryType,
  setDeliveryType,
  someoneElseData,
  setSomeoneElseData,
}) => {
  const formatAddress = (address) => {
    const parts = [];
    if (address.houseNumber) parts.push(address.houseNumber);
    if (address.streetName) parts.push(address.streetName);
    if (address.area) parts.push(address.area);
    if (address.landmark) parts.push(`Near ${address.landmark}`);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(", ");
  };

  const handleSomeoneElseChange = (field) => (event) => {
    setSomeoneElseData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const isSomeoneElseFormValid = () => {
    return (
      someoneElseData.name &&
      someoneElseData.phone &&
      someoneElseData.houseNumber &&
      someoneElseData.streetName &&
      someoneElseData.area &&
      someoneElseData.city &&
      someoneElseData.state &&
      someoneElseData.zipCode
    );
  };

  const token = getAccessToken();
  const isLoggedIn = !!token;

  // In guest mode, force "someone_else" delivery type so user can fill address
  useEffect(() => {
    if (!isLoggedIn && deliveryType !== "someone_else") {
      setDeliveryType("someone_else");
    }
  }, [isLoggedIn, deliveryType, setDeliveryType]);

  // Dialog state for recipient details (orderFor: OTHER)
  const [recipientDialogOpen, setRecipientDialogOpen] = useState(false);
  const [recipientDraft, setRecipientDraft] = useState(someoneElseData);

  const openRecipientDialog = () => {
    setRecipientDraft(someoneElseData || {
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
    setRecipientDialogOpen(true);
  };

  const handleRecipientDraftChange = (field) => (event) => {
    const value = event.target.value;
    setRecipientDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isRecipientDraftValid = () => {
    return (
      recipientDraft?.name &&
      recipientDraft?.phone &&
      recipientDraft?.houseNumber &&
      recipientDraft?.streetName &&
      recipientDraft?.area &&
      recipientDraft?.city &&
      recipientDraft?.state &&
      recipientDraft?.zipCode
    );
  };

  return (
    <Card
      sx={{
        borderRadius: { xs: 2, md: 2.5 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: { md: "sticky" },
        top: { md: 100 },
        mb: 2,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <CustomText
          sx={{
            fontSize: { xs: 18, md: 22 },
            fontWeight: 700,
            color: "#2c2c2c",
            mb: { xs: 1.5, md: 2 },
          }}
        >
          Delivery Address
        </CustomText>

        {/* Delivery Type Radio Buttons (only when logged in) */}
        {isLoggedIn && (
          <RadioGroup
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="self"
              control={<Radio sx={{ color: "var(--themeColor)" }} />}
              label={
                <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 500 }}>
                  Deliver to My Address
                </CustomText>
              }
            />
            <FormControlLabel
              value="someone_else"
              control={<Radio sx={{ color: "var(--themeColor)" }} />}
              label={
                <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 500 }}>
                  Deliver to Someone Else
                </CustomText>
              }
            />
          </RadioGroup>
        )}

        {/* Self Address Section (only when logged in) */}
        {isLoggedIn && deliveryType === 'self' && (
          <>
            {addressesLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}>
                <CircularProgress size={20} />
              </Box>
            ) : addresses.length === 0 ? (
              <Box sx={{ mb: 1.5 }}>
                <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666", mb: 1.5 }}>
                  No saved addresses. Please add an address.
                </CustomText>
                <Button
                  variant="outlined"
                  onClick={() => setAddressDialogOpen(true)}
                  sx={{
                    borderColor: "var(--themeColor)",
                    color: "var(--themeColor)",
                    textTransform: "none",
                    fontSize: { xs: 12, md: 13 },
                    py: 0.8,
                    "&:hover": {
                      borderColor: "var(--themeColor)",
                      backgroundColor: "#fbeeee",
                    },
                  }}
                >
                  Add Address
                </Button>
              </Box>
            ) : (
              <RadioGroup
                value={selectedAddress || ""}
                onChange={(e) => setSelectedAddress(e.target.value)}
                sx={{ mb: 1.5 }}
              >
                {addresses.map((address) => {
                  const addressId = address._id || address.id;
                  return (
                    <Card
                      key={addressId}
                      sx={{
                        mb: 1.5,
                        border: selectedAddress === addressId ? "2px solid var(--themeColor)" : "1px solid #ddd",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <FormControlLabel
                          value={addressId}
                          control={<Radio sx={{ color: "var(--themeColor)" }} />}
                          label={
                            <Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                <CustomText sx={{ fontWeight: 600, fontSize: { xs: 14, md: 16 } }}>
                                  {address.addressType || "Address"}
                                </CustomText>
                                {address.isDefault && (
                                  <Box
                                    sx={{
                                      px: 1,
                                      py: 0.2,
                                      borderRadius: 1,
                                      backgroundColor: "#FFB5A1",
                                      color: "#000",
                                      fontSize: 10,
                                      fontWeight: 600,
                                    }}
                                  >
                                    Default
                                  </Box>
                                )}
                              </Box>
                              <CustomText sx={{ fontSize: { xs: 12, md: 14 }, color: "#666" }}>
                                {formatAddress(address)}
                              </CustomText>
                            </Box>
                          }
                          sx={{ width: "100%", m: 0, alignItems: "flex-start" }}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </RadioGroup>
            )}
            
            {/* Add New Address Button */}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setAddressDialogOpen(true)}
              sx={{
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                textTransform: "none",
                mt: 1.5,
                py: 1,
                fontSize: { xs: 13, md: 14 },
                fontWeight: 600,
                "&:hover": {
                  borderColor: "var(--themeColor)",
                  backgroundColor: "#fbeeee",
                },
              }}
            >
              Add New Address
            </Button>
          </>
        )}

        {/* Someone Else Section - address via dialog */}
        {deliveryType === 'someone_else' && (
          <Box sx={{ mb: 1.5 }}>
            <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 600, color: "#2c2c2c", mb: 1.5 }}>
              Recipient Details
            </CustomText>

            {isSomeoneElseFormValid() ? (
              <Card
                sx={{
                  mb: 1.5,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <CustomText sx={{ fontWeight: 600, fontSize: { xs: 14, md: 15 }, mb: 0.5 }}>
                    {someoneElseData.name} • {someoneElseData.phone}
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                    {formatAddress({
                      houseNumber: someoneElseData.houseNumber,
                      streetName: someoneElseData.streetName,
                      area: someoneElseData.area,
                      landmark: someoneElseData.landmark,
                      city: someoneElseData.city,
                      state: someoneElseData.state,
                      zipCode: someoneElseData.zipCode,
                    })}
                  </CustomText>
                </CardContent>
              </Card>
            ) : (
              <CustomText sx={{ fontSize: 12, color: "#666", mb: 1 }}>
                No recipient address added yet. Please add recipient details to place order for someone else.
              </CustomText>
            )}

            <Button
              variant="outlined"
              fullWidth
              onClick={openRecipientDialog}
              sx={{
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                textTransform: "none",
                mt: 0.5,
                py: 1,
                fontSize: { xs: 13, md: 14 },
                fontWeight: 600,
                "&:hover": {
                  borderColor: "var(--themeColor)",
                  backgroundColor: "#fbeeee",
                },
              }}
            >
              {isSomeoneElseFormValid() ? "Edit Recipient Address" : "Add Recipient Address"}
            </Button>

            {!isSomeoneElseFormValid() && (
              <CustomText sx={{ fontSize: 12, color: "#d32f2f", mt: 1 }}>
                Please fill all required fields before placing the order.
              </CustomText>
            )}
          </Box>
        )}
      </CardContent>

      {/* Address Form Dialog */}
      <AddressFormDialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        onSuccess={handleAddressSuccess}
      />

      {/* Recipient Details Dialog (for orderFor: OTHER) */}
      <Dialog
        open={recipientDialogOpen}
        onClose={() => setRecipientDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <CustomText sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700 }}>
            Recipient Details
          </CustomText>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 1.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Recipient Name"
              value={recipientDraft?.name || ""}
              onChange={handleRecipientDraftChange("name")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              value={recipientDraft?.phone || ""}
              onChange={handleRecipientDraftChange("phone")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="House / Flat No."
                value={recipientDraft?.houseNumber || ""}
                onChange={handleRecipientDraftChange("houseNumber")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Street Name"
                value={recipientDraft?.streetName || ""}
                onChange={handleRecipientDraftChange("streetName")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              size="small"
              label="Area / Locality"
              value={recipientDraft?.area || ""}
              onChange={handleRecipientDraftChange("area")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              fullWidth
              size="small"
              label="Landmark (Optional)"
              value={recipientDraft?.landmark || ""}
              onChange={handleRecipientDraftChange("landmark")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="City"
                value={recipientDraft?.city || ""}
                onChange={handleRecipientDraftChange("city")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                fullWidth
                size="small"
                label="State"
                value={recipientDraft?.state || ""}
                onChange={handleRecipientDraftChange("state")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                fullWidth
                size="small"
                label="PIN Code"
                value={recipientDraft?.zipCode || ""}
                onChange={handleRecipientDraftChange("zipCode")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {!isRecipientDraftValid() && (
              <CustomText sx={{ fontSize: 12, color: "#d32f2f", mt: 0.5 }}>
                Please fill all required fields.
              </CustomText>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setRecipientDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!isRecipientDraftValid()) return;
              setSomeoneElseData(recipientDraft);
              setRecipientDialogOpen(false);
            }}
            sx={{
              textTransform: "none",
              bgcolor: "var(--themeColor)",
              "&:hover": { bgcolor: "#7a2d3a" },
            }}
          >
            Save Recipient
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
