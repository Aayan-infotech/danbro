import { Box } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export const HelpSupportTab = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <SupportAgentIcon sx={{ fontSize: { xs: 32, md: 40 }, color: "var(--themeColor)" }} />
        <CustomText
          variant="h4"
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: "var(--themeColor)",
          }}
        >
          Help &amp; Support
        </CustomText>
      </Box>

      <CustomText sx={{ fontSize: { xs: 14, md: 15 }, color: "#555", mb: 2 }}>
        For any help related to your orders, payments, refunds, or account, please reach out to us:
      </CustomText>

      <Box sx={{ mt: 1.5, p: 2, borderRadius: 2, bgcolor: "#FFF8F2", border: "1px solid #FFDFBF" }}>
        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, mb: 0.5 }}>
          Customer Support
        </CustomText>
        <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
          Email: info@mrbrownbakery.com
        </CustomText>
        <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
          Phone: +91-7309032618
        </CustomText>
        <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666", mt: 1 }}>
          Our team is available to assist you with order status, cancellations, returns, and other queries.
        </CustomText>
      </Box>
    </Box>
  );
}

