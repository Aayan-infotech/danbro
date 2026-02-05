import { Box, CircularProgress } from "@mui/material";

export const ProductDetailsLoading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
    <CircularProgress sx={{ color: "var(--themeColor)" }} />
  </Box>
);
