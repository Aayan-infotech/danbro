import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";
import { getMyAddresses, deleteAddress } from "../../utils/apiService";
import { AddressFormDialog } from "./AddressFormDialog";

export const SavedAddressesTab = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyAddresses();
      setAddresses(data || []);
    } catch (err) {
      console.error("Error loading addresses:", err);
      setError(err.message || "Failed to load addresses. Please try again.");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!addressToDelete) return;

    try {
      setDeletingId(addressToDelete._id || addressToDelete.id);
      await deleteAddress(addressToDelete._id || addressToDelete.id);
      await loadAddresses();
      setDeleteConfirmOpen(false);
      setAddressToDelete(null);
    } catch (err) {
      console.error("Error deleting address:", err);
      setError(err.message || "Failed to delete address. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingAddress(null);
  };

  const handleDialogSuccess = () => {
    loadAddresses();
  };

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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 2 }}>
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
          onClick={handleAddNew}
          sx={{
            bgcolor: "var(--themeColor)",
            color: "#fff",
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            px: 2.5,
            py: 1,
            boxShadow: "0 2px 8px rgba(95, 41, 48, 0.25)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "var(--specialColor)",
              boxShadow: "0 4px 12px rgba(95, 41, 48, 0.3)",
            },
          }}
        >
          Add New Address
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {addresses.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 6, md: 8 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CustomText sx={{ fontSize: { xs: 16, md: 18 }, color: "#666" }}>
            No saved addresses yet
          </CustomText>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{
              bgcolor: "var(--themeColor)",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
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
            Add Your First Address
          </Button>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid #eee",
            overflow: "auto",
          }}
        >
          <Table size="small" sx={{ minWidth: { xs: 600, md: 720 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FFF8F2" }}>
                <TableCell sx={{ fontWeight: 700, color: "var(--themeColor)" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "var(--themeColor)" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "var(--themeColor)", width: 100 }}>Default</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "var(--themeColor)", width: 120 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.map((address) => {
                const addressId = address._id || address.id;
                const isDeleting = deletingId === addressId;
                return (
                  <TableRow
                    key={addressId}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(255, 181, 161, 0.06)" },
                      borderLeft: address.isDefault ? "3px solid var(--themeColor)" : "3px solid transparent",
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: "#333" }}>
                      {address.addressType || "Address"}
                    </TableCell>
                    <TableCell sx={{ color: "#666", lineHeight: 1.5 }}>
                      {formatAddress(address)}
                    </TableCell>
                    <TableCell>
                      {address.isDefault ? (
                        <Box
                          component="span"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: "#FFB5A1",
                            color: "#000",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Default
                        </Box>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(address)}
                        disabled={isDeleting}
                        sx={{
                          color: "var(--themeColor)",
                          "&:hover": { backgroundColor: "rgba(255, 148, 114, 0.12)" },
                        }}
                        aria-label="Edit"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(address)}
                        disabled={isDeleting}
                        sx={{
                          color: "#f44336",
                          "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.08)" },
                        }}
                        aria-label="Delete"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <AddressFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        address={editingAddress}
        onSuccess={handleDialogSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>
          <CustomText sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600 }}>
            Confirm Delete
          </CustomText>
        </DialogTitle>
        <DialogContent>
          <CustomText>
            Are you sure you want to delete this address? This action cannot be undone.
          </CustomText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
