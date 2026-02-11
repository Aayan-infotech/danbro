import { Box, Container } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { useEffect } from "react";
import SchoolIcon from "@mui/icons-material/School";

export const Institute = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 10 },
        p: { xs: 1.25, md: 0 },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(30px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <SchoolIcon
            sx={{
              fontSize: { xs: 64, md: 80 },
              color: "var(--themeColor)",
              mb: 2,
              opacity: 0.9,
            }}
          />
          <CustomText
            sx={{
              fontSize: { xs: 28, sm: 34, md: 42 },
              fontWeight: 700,
              color: "var(--themeColor)",
              mb: 1.5,
              textTransform: "none",
            }}
          >
            Institute
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 20, sm: 24, md: 28 },
              fontWeight: 600,
              color: "#555",
              letterSpacing: "0.02em",
            }}
          >
            Coming soon...
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 14, sm: 15 },
              color: "#777",
              mt: 2,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            We are working on something exciting. Check back later.
          </CustomText>
        </Box>
      </Container>
    </Box>
  );
};
