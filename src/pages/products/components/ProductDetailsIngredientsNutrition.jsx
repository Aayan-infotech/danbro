import { Box, Container, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, ThumbUpOffAlt } from "@mui/icons-material";
import { CustomText } from "../../../components/comman/CustomText";

export const ProductDetailsIngredientsNutrition = ({
  productData,
  product,
  expanded,
  onExpandedChange,
}) => (
  <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 }, px: { xs: 2, sm: 3, md: 4 }, maxWidth: "100%" }}>
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
        <Box sx={{ p: { xs: 2, md: 3 }, border: "1px solid #e0e0e0", borderRadius: 1, backgroundColor: "#fff", minWidth: 0 }}>
          <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", fontSize: { xs: 16, sm: 18 }, mb: 2, color: "#2c2c2c" }}>
            What's Inside
          </CustomText>
          <CustomText
            autoTitleCase
            sx={{
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
              color: "#666",
              lineHeight: 0,
              mb: product?.veg ? 1 : 0,
              wordBreak: "break-word",
            }}
          >
            {productData?.ingredient || "Ingredients information not available."}
          </CustomText>
          {product?.veg && (
            <Box sx={{ mt: 2, p: 1, backgroundColor: "#fff5f2", borderRadius: 1, display: "flex", alignItems: "flex-start", gap: 1.5, border: "1px solid #FF643A" }}>
              <ThumbUpOffAlt sx={{ color: "#FF643A", fontSize: 20, mt: 0.5 }} />
              <Box>
                <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#2c2c2c", mb: 0.5 }}>Vegetarian Product</CustomText>
                <CustomText sx={{ fontSize: 13, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666" }}>
                  {product.veg === "Y" ? "This is a vegetarian product." : "Please check ingredients for allergen information."}
                </CustomText>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ position: "relative", minWidth: 0 }}>
        <Accordion
          expanded={expanded}
          onChange={() => onExpandedChange(!expanded)}
          sx={{
            position: "relative",
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            backgroundColor: "#fff",
            "&:before": { display: "none" },
            boxShadow: "none",
            minWidth: 0,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "#2c2c2c" }} />}
            sx={{
              px: { xs: 2, md: 3 },
              py: 1.5,
              minHeight: 56,
              "& .MuiAccordionSummary-content": { display: "block", my: 1 },
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", fontSize: { xs: 16, sm: 18 }, color: "#2c2c2c" }}>
                Nutrition Facts
              </CustomText>
              {product?.expiryday && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: "#fff5f2", borderRadius: 1, border: "1px solid #FF643A" }}>
                  <CustomText sx={{ fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", mb: 0.5 }}>Storage Instructions</CustomText>
                  <CustomText sx={{ fontSize: 13, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666" }}>
                    Best consumed within {product.expiryday} days. Keep in a cool dry place.
                  </CustomText>
                </Box>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              pt: 0,
              px: 3,
              pb: 3,
              ...(expanded && {
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                borderRadius: "0 0 4px 4px",
                border: "1px solid #e0e0e0",
                borderTop: "none",
                maxHeight: "70vh",
                overflowY: "auto",
              }),
            }}
          >
            <Box>
              {productData?.nutrition && Object.keys(productData.nutrition).length > 0 ? (
                Object.entries(productData.nutrition).map(([label, value], index, array) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1.2,
                      borderBottom: index !== array.length - 1 ? "1px solid #e0e0e0" : "none",
                    }}
                  >
                    <CustomText sx={{ fontSize: 14, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666" }}>{label}</CustomText>
                    <CustomText sx={{ fontWeight: 500, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#2c2c2c" }}>{value}</CustomText>
                  </Box>
                ))
              ) : (
                <CustomText sx={{ fontSize: 14, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666" }}>
                  Nutrition information not available.
                </CustomText>
              )}
            </Box>
            {product?.expiryday && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1, border: "1px solid #e0e0e0" }}>
                <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#2c2c2c", mb: 0.5 }}>Storage Instructions</CustomText>
                <CustomText sx={{ fontSize: 13, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#666" }}>
                  Best consumed within {product.expiryday} days.
                  <br />
                  Keep in a cool dry place.
                </CustomText>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  </Container>
);
