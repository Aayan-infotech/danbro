import { Box, Container, Grid } from "@mui/material";
import { LocalGroceryStore, Handshake, Shield, Verified } from "@mui/icons-material";
import { CustomText } from "../../../components/comman/CustomText";

const ICONS = [<LocalGroceryStore />, <Handshake />, <Shield />, <Verified />];
const FEATURES = [
  "100% Organic Flour\nLocally sourced",
  "Handmade Daily\nBaked fresh at 4 AM",
  "No Preservatives\nClean ingredients",
  "Quality Guarantee\nTaste the difference",
];

export const ProductDetailsFeatures = () => (
  <Box sx={{ py: { xs: 1.5, md: 1 }, backgroundColor: "#fafafa" }}>
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, maxWidth: "100%" }}>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {FEATURES.map((text, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: 1,
                border: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, md: 2 },
                height: "100%",
                minWidth: 0,
              }}
            >
              <Box sx={{ backgroundColor: "#fff5f2", color: "#FF6F61", width: { xs: 44, sm: 50 }, height: { xs: 44, sm: 50 }, borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {ICONS[i]}
              </Box>
              <CustomText sx={{ whiteSpace: "pre-line", fontSize: { xs: 12, sm: 13 }, fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#515151", lineHeight: 1.6, wordBreak: "break-word" }}>
                {text}
              </CustomText>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
