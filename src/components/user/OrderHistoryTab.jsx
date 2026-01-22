import { Box, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CustomText } from "../comman/CustomText";

export const OrderHistoryTab = ({ orders }) => {
  return (
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
  );
};

