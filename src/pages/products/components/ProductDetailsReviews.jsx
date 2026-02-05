import { Box, Container, Avatar, Rating } from "@mui/material";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material";
import { CustomText } from "../../../components/comman/CustomText";

const MOCK_REVIEWS = [
  { name: "Sophia Carter", time: "2 weeks ago", text: "These chocolate muffins are absolutely divine! Perfect balance of sweetness and rich chocolate flavor." },
  { name: "Ethan Bennett", time: "1 month ago", text: "Good taste, a little too sweet for me. Texture is soft and moist overall decent treat." },
];

export const ProductDetailsReviews = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 0, sm: 0 }, px: { xs: 2, sm: 3, md: 4 }, maxWidth: "100%" }}>
    <Box sx={{ mt: { xs: 3, md: 5 }, mb: { xs: 3, md: 4 } }}>
      <CustomText sx={{ fontSize: { xs: 22, sm: 26, md: 28 }, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", mb: 0.5 }}>
        4.5 ⭐
      </CustomText>
      <CustomText sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666", mb: 3 }}>
        120 reviews
      </CustomText>
      {[5, 4, 3, 2, 1].map((r, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, mb: 1.5, minWidth: 0 }}>
          <CustomText sx={{ width: 20, flexShrink: 0, fontSize: { xs: 13, sm: 14 }, fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#2c2c2c" }}>{r}</CustomText>
          <Box sx={{ flex: 1, height: 8, backgroundColor: "#f0f0f0", borderRadius: 1, overflow: "hidden" }}>
            <Box sx={{ height: "100%", width: `${[40, 20, 19, 10, 7][i]}%`, backgroundColor: "#FF6F61" }} />
          </Box>
          <CustomText sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666", width: 40, flexShrink: 0, textAlign: "right" }}>
            {[40, 20, 19, 10, 7][i]}%
          </CustomText>
        </Box>
      ))}
    </Box>
    <Box sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 4, md: 5 } }}>
      {MOCK_REVIEWS.map((review, i) => (
        <Box
          key={i}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 1,
            backgroundColor: "#fafafa",
            border: "1px solid #e0e0e0",
            mt: 2,
            minWidth: 0,
          }}
        >
          <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2 }, alignItems: "center", mb: 1.5, flexWrap: "wrap" }}>
            <Avatar alt={review.name} sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 }, backgroundColor: "#FF9472" }}>
              {review.name.charAt(0)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", fontSize: { xs: 14, sm: 15 }, color: "#2c2c2c" }}>{review.name}</CustomText>
              <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666" }}>{review.time}</CustomText>
            </Box>
          </Box>
          <Rating value={5 - i} readOnly size="small" sx={{ mb: 1.5, color: "#FF643A" }} />
          <CustomText sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666", lineHeight: 1.7, mb: 2, wordBreak: "break-word" }}>
            {review.text}
          </CustomText>
          <Box sx={{ display: "flex", gap: 3, color: "#707070" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
              <ThumbUpOffAlt sx={{ fontSize: 18 }} />
              <CustomText sx={{ fontSize: 13, fontWeight: 400, fontFamily: "'Inter', sans-serif" }}>12</CustomText>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
              <ThumbDownOffAlt sx={{ fontSize: 18 }} />
              <CustomText sx={{ fontSize: 13, fontWeight: 400, fontFamily: "'Inter', sans-serif" }}>3</CustomText>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  </Container>
);
