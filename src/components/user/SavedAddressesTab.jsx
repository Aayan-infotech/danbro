import { Box, Grid, Card, CardContent, Button } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";

export const SavedAddressesTab = ({ addresses }) => {
  return (
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
  );
};

