import { Box, Grid, Card, CardContent, Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";

export const DownloadsTab = ({ downloads }) => {
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
        Downloads
      </CustomText>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {downloads?.map((download) => (
          <Grid size={{ xs: 12 }} key={download.id}>
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <DownloadIcon sx={{ fontSize: 40, color: "var(--themeColor)" }} />
                    <Box>
                      <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c", mb: 0.5 }}>
                        {download.name}
                      </CustomText>
                      <CustomText variant="body2" sx={{ color: "#666" }}>
                        Downloaded on {download.date} • {download.type}
                      </CustomText>
                    </Box>
                  </Box>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="contained"
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
                    Download
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

