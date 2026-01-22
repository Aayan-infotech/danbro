import { Box, Grid, Card, CardContent, Button, CircularProgress, Alert } from "@mui/material";
import { Celebration as CelebrationIcon, LocalOffer as OfferIcon, ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";

export const MyCouponsTab = ({ coupons, couponsLoading, couponsError }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <CelebrationIcon sx={{ fontSize: { xs: 32, md: 40 }, color: "var(--themeColor)" }} />
        <CustomText
          variant="h4"
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: "var(--themeColor)",
            background: "linear-gradient(135deg, #FF9472 0%, #F2709C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          My Coupons
        </CustomText>
      </Box>

      {couponsLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
          <CircularProgress sx={{ color: "var(--themeColor)" }} />
        </Box>
      ) : couponsError ? (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {couponsError}
        </Alert>
      ) : coupons && coupons.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {coupons.map((coupon, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={coupon.id}>
              <Card
                sx={{
                  borderRadius: { xs: 3, md: 4 },
                  boxShadow: coupon.isValid
                    ? "0 8px 32px rgba(255,148,114,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset"
                    : "0 4px 16px rgba(0,0,0,0.1)",
                  background: coupon.isValid
                    ? "linear-gradient(145deg, #FF9472 0%, #F2709C 50%, #FF9472 100%)"
                    : "linear-gradient(145deg, #e0e0e0 0%, #bdbdbd 100%)",
                  color: "#fff",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  "@keyframes fadeInUp": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(30px) scale(0.9)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0) scale(1)",
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: coupon.isValid
                      ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    animation: coupon.isValid ? "rotate 20s linear infinite" : "none",
                    "@keyframes rotate": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                    zIndex: 0,
                    pointerEvents: "none",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: coupon.isValid
                      ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                      : "none",
                    animation: coupon.isValid ? "shimmer 3s ease-in-out infinite" : "none",
                    "@keyframes shimmer": {
                      "0%": { left: "-100%" },
                      "100%": { left: "100%" },
                    },
                    zIndex: 1,
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: coupon.isValid ? "translateY(-12px) scale(1.02)" : "translateY(-5px)",
                    boxShadow: coupon.isValid
                      ? "0 20px 60px rgba(255,148,114,0.4), 0 0 0 1px rgba(255,255,255,0.2) inset"
                      : "0 12px 40px rgba(0,0,0,0.15)",
                    "& .coupon-discount": {
                      transform: "scale(1.1)",
                    },
                    "& .coupon-code": {
                      transform: "scale(1.05) rotate(2deg)",
                    },
                  },
                }}
              >
                {/* Decorative Elements */}
                {coupon.isValid && (
                  <>
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        zIndex: 1,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -30,
                        left: -30,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                        zIndex: 1,
                      }}
                    />
                  </>
                )}

                {!coupon.isValid && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      px: 2,
                      py: 0.75,
                      borderRadius: 2,
                      background: "rgba(0,0,0,0.3)",
                      backdropFilter: "blur(10px)",
                      zIndex: 2,
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <CustomText variant="caption" sx={{ fontWeight: 700, fontSize: 11, letterSpacing: 0.5 }}>
                      EXPIRED
                    </CustomText>
                  </Box>
                )}

                <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, position: "relative", zIndex: 2 }}>
                  {/* Discount Badge */}
                  <Box sx={{ mb: 2.5, position: "relative" }}>
                    <Box
                      className="coupon-discount"
                      sx={{
                        display: "inline-block",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <CustomText
                        variant="h3"
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: 36, md: 48 },
                          lineHeight: 1,
                          mb: 0.5,
                          textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          background: "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.9) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {coupon.discount}
                      </CustomText>
                      <CustomText
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: 14, md: 16 },
                          opacity: 0.95,
                          textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                      >
                        OFF
                      </CustomText>
                    </Box>
                  </Box>

                  {/* Coupon Code */}
                  <Box
                    className="coupon-code"
                    sx={{
                      mb: 2.5,
                      px: 2.5,
                      py: 1.5,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.25)",
                      backdropFilter: "blur(15px)",
                      border: "2px dashed rgba(255,255,255,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1) inset",
                    }}
                  >
                    <CustomText
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: 16, md: 18 },
                        letterSpacing: 1.5,
                        fontFamily: "monospace",
                      }}
                    >
                      {coupon.code}
                    </CustomText>
                    <OfferIcon sx={{ fontSize: { xs: 20, md: 24 }, opacity: 0.8 }} />
                  </Box>

                  {/* Description */}
                  <CustomText
                    variant="body1"
                    sx={{
                      mb: 2,
                      opacity: 0.95,
                      fontSize: { xs: 13, md: 14 },
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {coupon.description}
                  </CustomText>

                  {/* Validity Dates */}
                  <Box
                    sx={{
                      mb: 2.5,
                      p: 1.5,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
                      <CustomText
                        variant="caption"
                        sx={{
                          fontSize: { xs: 10, md: 11 },
                          opacity: 0.9,
                          fontWeight: 600,
                          mr: 1,
                        }}
                      >
                        From:
                      </CustomText>
                      <CustomText
                        variant="body2"
                        sx={{
                          fontSize: { xs: 11, md: 12 },
                          opacity: 0.95,
                          fontWeight: 500,
                        }}
                      >
                        {coupon.validFrom}
                      </CustomText>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CustomText
                        variant="caption"
                        sx={{
                          fontSize: { xs: 10, md: 11 },
                          opacity: 0.9,
                          fontWeight: 600,
                          mr: 1,
                        }}
                      >
                        Until:
                      </CustomText>
                      <CustomText
                        variant="body2"
                        sx={{
                          fontSize: { xs: 11, md: 12 },
                          opacity: 0.95,
                          fontWeight: 500,
                        }}
                      >
                        {coupon.validTo}
                      </CustomText>
                    </Box>
                  </Box>

                  {/* Copy Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!coupon.isValid}
                    onClick={() => {
                      navigator.clipboard.writeText(coupon.code);
                    }}
                    startIcon={coupon.isValid ? <ContentCopyIcon /> : null}
                    sx={{
                      backgroundColor: "#fff",
                      color: "var(--themeColor)",
                      textTransform: "none",
                      borderRadius: 2.5,
                      fontWeight: 700,
                      py: 1.75,
                      fontSize: { xs: 14, md: 15 },
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#fff",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(255,255,255,0.4)",
                        color: "rgba(0,0,0,0.3)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {coupon.isValid ? "Copy Code" : "Expired"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            px: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
          }}
        >
          <OfferIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
          <CustomText variant="h6" sx={{ color: "#666", mb: 1, fontWeight: 600 }}>
            No coupons available
          </CustomText>
          <CustomText variant="body2" sx={{ color: "#999" }}>
            Check back later for exciting offers!
          </CustomText>
        </Box>
      )}
    </Box>
  );
};

