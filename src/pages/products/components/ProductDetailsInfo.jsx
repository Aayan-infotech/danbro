import {
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
  Alert,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Add, Remove, Favorite, FavoriteBorder, LocalShipping } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { CustomText } from "../../../components/comman/CustomText";

export const ProductDetailsInfo = ({
  productData,
  weightOptions,
  productWeight,
  onWeightChange,
  cakeMessage,
  onCakeMessageChange,
  hasSavedLocation,
  deliveryLocationLabel,
  quantity,
  onQuantityChange,
  onAddToCart,
  addingToCart,
  product,
  cartMessage,
  onDismissCartMessage,
  inWishlist,
  wishlistLoading,
  onWishlistToggle,
}) => (
  <Box sx={{ minWidth: 0 }}>
    <CustomText
      variant="h3"
      autoTitleCase
      sx={{
        fontSize: { xs: 20, sm: 26, md: 32 },
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        color: "#2c2c2c",
        mb: 1,
        wordBreak: "break-word",
      }}
    >
      {productData?.name}
    </CustomText>
    <Box>
      <CustomText sx={{ fontSize: { xs: 20, sm: 26, md: 32 }, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#F31400", wordBreak: "break-word" }}>
        {productData?.price}
        <Box component="span" sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 400, color: "#666", ml: 0.5 }}>
          / {productData?.weight}
        </Box>
      </CustomText>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, flexWrap: "wrap" }}>
      <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ color: "#FF643A" }} />
      <CustomText sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#333" }}>4.5</CustomText>
      <CustomText sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#777" }}>(245 Reviews)</CustomText>
    </Box>
    <CustomText
      variant="body1"
      autoTitleCase
      sx={{
        color: "#666",
        lineHeight: 1.7,
        mb: 1,
        fontSize: { xs: 14, sm: 15 },
        fontWeight: 400,
        fontFamily: "'Inter', sans-serif",
        wordBreak: "break-word",
      }}
    >
      {productData?.description}
    </CustomText>

    {weightOptions.length > 0 && (
      <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14 }}>Select Weight</CustomText>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {weightOptions?.map((w) => (
            <Chip
              key={w}
              label={w}
              clickable
              onClick={() => onWeightChange(w)}
              size="small"
              sx={{
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                borderRadius: "999px",
                px: 1.8,
                py: 0.6,
                border: productWeight === w ? "2px solid #F31400" : "1px solid #ddd",
                backgroundColor: productWeight === w ? "#FFE9E3" : "#fff",
                color: productWeight === w ? "#F31400" : "#333",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: productWeight === w ? "#FFE9E3" : "#fafafa" },
              }}
            />
          ))}
        </Box>
      </Box>
    )}

    <Box sx={{ mb: 0.5 }}>
      <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14, mb: 1 }}>Cake Message</CustomText>
      <TextField
        fullWidth
        placeholder="Write a sweet wish!"
        value={cakeMessage}
        onChange={(e) => onCakeMessageChange(e.target.value.slice(0, 25))}
        size="small"
        inputProps={{ maxLength: 25 }}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, fontFamily: "'Inter', sans-serif" } }}
        helperText={`${cakeMessage.length}/25`}
      />
    </Box>

    <Box sx={{ mb: 0, p: 1, borderRadius: 1, border: "1px solid #e0e0e0", backgroundColor: "#fafafa" }}>
      <CustomText sx={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14 }}>Delivery Location</CustomText>
      {hasSavedLocation ? (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1.5, alignItems: { xs: "flex-start", sm: "center" } }}>
          <Box>
            <CustomText sx={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "#2c2c2c" }}>{deliveryLocationLabel}</CustomText>
            <CustomText sx={{ fontSize: 13, fontWeight: 400, fontFamily: "'Inter', sans-serif", color: "#1B9C3F", mt: 0.5 }}>Awesome, we deliver to this location.</CustomText>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => window.dispatchEvent(new Event("openLocationDialog"))}
            sx={{
              borderRadius: 1,
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              px: 2,
              borderColor: "#F31400",
              color: "#F31400",
              "&:hover": { borderColor: "#C22A00", backgroundColor: "rgba(255, 148, 114, 0.08)" },
            }}
          >
            Change
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, alignItems: { xs: "stretch", sm: "center" } }}>
          <TextField
            fullWidth
            placeholder="Enter area / locality / pincode"
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, fontFamily: "'Inter', sans-serif" } }}
            onFocus={() => window.dispatchEvent(new Event("openLocationDialog"))}
            onClick={() => window.dispatchEvent(new Event("openLocationDialog"))}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => window.dispatchEvent(new Event("openLocationDialog"))}
            sx={{
              borderRadius: 1,
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              px: 2.5,
              backgroundColor: "#F31400",
              "&:hover": { backgroundColor: "#C22A00" },
            }}
          >
            Set Location
          </Button>
        </Box>
      )}
    </Box>

    <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 1 }}>
      <Grid size={{ xs: 4, sm: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 1,
            border: "1px solid #ddd",
            p: { xs: 0.75, sm: 1 },
            backgroundColor: "#fff",
          }}
        >
          <Box onClick={() => onQuantityChange(Math.max(1, quantity - 1))} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Remove sx={{ color: "#2c2c2c", fontSize: 20 }} />
          </Box>
          <CustomText sx={{ fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#2c2c2c", fontSize: 14 }}>{quantity}</CustomText>
          <Box onClick={() => onQuantityChange(quantity + 1)} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Add sx={{ color: "#2c2c2c", fontSize: 20 }} />
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 6, sm: 7 }}>
        <Button
          onClick={onAddToCart}
          disabled={addingToCart || !product}
          fullWidth
          sx={{
            backgroundColor: "#FF9472",
            color: "#fff",
            py: { xs: 1, sm: 1.2 },
            borderRadius: 1,
            fontSize: { xs: 13, sm: 15 },
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            textTransform: "none",
            "&:hover": { backgroundColor: "#F2709C" },
            "&:disabled": { backgroundColor: "#ccc", color: "#999" },
          }}
        >
          {addingToCart ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} sx={{ color: "#fff" }} />
              <CustomText sx={{ fontFamily: "'Inter', sans-serif" }}>Adding...</CustomText>
            </Box>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </Grid>
      <Grid size={{ xs: 2, sm: 2 }}>
        <IconButton
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={onWishlistToggle}
          disabled={wishlistLoading}
          sx={{
            backgroundColor: inWishlist ? "rgba(244, 67, 54, 0.08)" : "#f5f5f5",
            borderRadius: 1,
            "&:hover": { backgroundColor: inWishlist ? "rgba(244, 67, 54, 0.15)" : "#e0e0e0" },
          }}
        >
          {wishlistLoading ? (
            <CircularProgress size={20} sx={{ color: "var(--themeColor)" }} />
          ) : inWishlist ? (
            <Favorite sx={{ color: "#f44336", fontSize: 20 }} />
          ) : (
            <FavoriteBorder sx={{ color: "#2c2c2c", fontSize: 20 }} />
          )}
        </IconButton>
      </Grid>
    </Grid>

    {cartMessage && (
      <Alert severity={cartMessage.type} sx={{ mt: 1, borderRadius: 1 }} onClose={onDismissCartMessage}>
        {cartMessage.text}
      </Alert>
    )}

    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, backgroundColor: "#f0f9f0", p: 1.5, borderRadius: 1, border: "1px solid #c8e6c9" }}>
      <LocalShipping sx={{ fontSize: 18, color: "#00A819" }} />
      <CustomText sx={{ fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#00A819" }}>
        Order within 2hrs for delivery today.
      </CustomText>
    </Box>
  </Box>
);
