import { Box, Grid, Button } from "@mui/material";
import { CustomText } from "../comman/CustomText";

export const SettingsTab = () => {
  return (
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
  );
};

