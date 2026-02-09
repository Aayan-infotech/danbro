import { Box, Container, Grid, FormControl, Select, MenuItem, CircularProgress, Avatar } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { useState, useEffect, useMemo } from "react";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getAllReviews } from "../../utils/apiService";
import { Link } from "react-router-dom";
import user1 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";

const mapReview = (r) => ({
  id: r?._id,
  name: r?.user?.name ?? "Customer",
  productName: r?.product?.name ?? "",
  rating: typeof r?.rating === "number" ? Math.min(5, Math.max(1, r.rating)) : 5,
  comment: r?.review ?? "",
  createdAt: r?.createdAt,
  image: user1,
});

export const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStar, setFilterStar] = useState("all");

  useEffect(() => {
    let cancelled = false;
    getAllReviews()
      .then((data) => {
        if (cancelled) return;
        const list = (Array.isArray(data) ? data : [])
          .filter((r) => (r?.status || "").toLowerCase() === "approved")
          .map(mapReview)
          .filter((t) => t.comment?.trim());
        setReviews(list);
      })
      .catch(() => setReviews([]))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filteredReviews = useMemo(() => {
    if (filterStar === "all") return reviews;
    const star = Number(filterStar);
    return reviews.filter((r) => r.rating === star);
  }, [reviews, filterStar]);

  const averageRating = useMemo(() => {
    if (filteredReviews.length === 0) return 0;
    const sum = filteredReviews.reduce((s, r) => s + r.rating, 0);
    return (sum / filteredReviews.length).toFixed(1);
  }, [filteredReviews]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return "—";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: 8, px: { xs: 1.5, md: 0 }, }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Link to="/#testimonials" style={{ color: "var(--themeColor)", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
            ← Back to Home
          </Link>
        </Box>

        {/* Header: Ratings & Reviews */}
        <Box sx={{ mb: 1 }}>
          <CustomText sx={{ fontSize: { xs: 24, md: 28 }, fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
            Ratings &amp; Reviews
          </CustomText>

          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 4 }}>
              <CircularProgress size={28} sx={{ color: "var(--themeColor)" }} />
              <CustomText sx={{ color: "#666" }}>Loading reviews...</CustomText>
            </Box>
          ) : (
            <>
              {/* Overall rating summary */}
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 2, md: 4 }, mb: 3, p: 2, }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StarIcon sx={{ fontSize: 48, color: "#4caf50" }} />
                  <CustomText sx={{ fontSize: 32, fontWeight: 700, color: "#2c2c2c" }}>
                    {averageRating}/5
                  </CustomText>
                </Box>
                <CustomText sx={{ fontSize: 15, color: "#666" }}>
                  Based on {filteredReviews.length} Reviews &amp; Ratings
                </CustomText>
                <FormControl size="small" sx={{ minWidth: 140, ml: "auto" }}>
                  <Select
                    value={filterStar}
                    onChange={(e) => setFilterStar(e.target.value)}
                    displayEmpty
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
                    }}
                  >
                    <MenuItem value="all">All Stars</MenuItem>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <MenuItem key={n} value={String(n)}>
                        {n} Star{n > 1 ? "s" : ""}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Review cards grid - reference style: light grey cards, stars, quote text, name, Verified, date */}
              <Grid container spacing={2}>
                {filteredReviews?.map((item) => (
                  <Grid key={item?.id} size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        p: 2,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        transition: "0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      {/* ⭐ Rating */}
                      <Box sx={{ display: "flex", gap: 0.5, mb: 1.5 }}>
                        {[...Array(item?.rating || 5)].map((_, i) => (
                          <StarIcon key={i} sx={{ fontSize: 20, color: "#4caf50" }} />
                        ))}
                      </Box>

                      {/* 💬 Comment */}
                      <CustomText
                        sx={{
                          fontSize: 15,
                          color: "#333",
                          lineHeight: 1.6,
                          fontStyle: "italic",
                          flexGrow: 1,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        &ldquo;{item?.comment}&rdquo;
                      </CustomText>

                      {/* 👤 User Info */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                        <Avatar
                          src={item?.image}
                          alt={item?.name}
                          sx={{ width: 28, height: 28 }}
                        />

                        <CustomText sx={{ fontSize: 14, fontWeight: 600 }}>
                          {item?.name}
                        </CustomText>
                      </Box>

                      {/* 📅 Date */}
                      <CustomText sx={{ fontSize: 12, color: "#888", mt: 0.5 }}>
                        {item?.productName ? `${item.productName} • ` : ""}
                        {formatDate(item?.createdAt)}
                      </CustomText>
                    </Box>
                  </Grid>
                ))}
                {filteredReviews.length === 0 && (
                  <Grid size={12}>
                    <Box sx={{ textAlign: "center", py: 6, color: "#666" }}>
                      <CustomText>No reviews match the selected filter.</CustomText>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};
