import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Chip,
  Breadcrumbs,
  Link,
  Rating,
  Divider,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  CheckCircle as CheckCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  Add,
  Remove,
  FavoriteBorder,
  LocalGroceryStore,
  Handshake,
  Shield,
  Verified,
  LocalShipping,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [tab, setTab] = useState("cake");

  const product = {
    name: "Chocolate Muffin",
    description:
      "Break open sweetness with our Red Velvet Hammer Pinata Cake – 500 g of creamy, romantic indulgence hidden inside a smashable chocolate dome.",
    price: "$3.50",
    weight: "500g",
    stock: 235,
    images: [
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
    ],
  };

  const icons = [<LocalGroceryStore />, <Handshake />, <Shield />, <Verified />];
  const features = [
    "100% Organic Flour\nLocally sourced",
    "Handmade Daily\nBaked fresh at 4 AM",
    "No Preservatives\nClean ingredients",
    "Quality Guarantee\nTaste the difference"
  ];

  const images = [
    "https://picsum.photos/id/1040/300/200",
    "https://picsum.photos/id/1060/300/200",
    "https://picsum.photos/id/1080/300/200",
    "https://picsum.photos/id/109/300/200",
    "https://picsum.photos/id/120/300/200",
    "https://picsum.photos/id/121/300/200",
    "https://picsum.photos/id/122/300/200",
    "https://picsum.photos/id/123/300/200"
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 4, md: 6 }, pb: { xs: 12, md: 16 } }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component="button" variant="body1" onClick={() => navigate("/products")} sx={{ color: "#666", textDecoration: "none", cursor: "pointer", "&:hover": { color: "#FF9472", }, }}>
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid size={6}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", gap: 1 }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImage === index ? "2px solid #FF9472" : "2px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: "2px solid #FF9472",
                      },
                    }}
                  >
                    <Box component="img" src={image} alt={`${product.name} ${index + 1}`} sx={{ width: "100%", height: "200px", objectFit: "cover", }} />
                  </Box>
                ))}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ width: "100%", height: "450px", borderRadius: 2, overflow: "hidden", mb: 2 }}>
                  <Box component="img" src={product.images[selectedImage]} alt={product.name} sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box>
              <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: "#2c2c2c", mb: 2, }}>
                {product.name}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: "#F31400", mb: 2, display: "flex", alignItems: "center" }}>
                {product.price} / <Typography variant="body1" sx={{ fontSize: '13px', fontWeight: 600, color: "#2c2c2c", }}>
                  {product.weight}
                </Typography>
              </Typography>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={4.5} precision={0.5} readOnly sx={{ color: "#FF643A" }} />
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#333" }}>
                    4.5 <span style={{ fontWeight: 400, color: "#777" }}>/ 5</span>
                  </Typography>
                  <Typography sx={{ color: "#777" }}>(245 Reviews)</Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, mb: 3, fontSize: { xs: 14, md: 16 }, }}>
                {product.description}
              </Typography>
              <Divider sx={{ my: 2, backgroundColor: "#F31400" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Weight
                  </Typography>
                  <Select value={product.weight} size="small" onChange={(e) => setProductWeight(e.target.value)} sx={{ width: 250, mt: 1 }}>
                    <MenuItem value="500g">Regular (500g)</MenuItem>
                    <MenuItem value="1000g">Medium (1kg)</MenuItem>
                    <MenuItem value="2000g">Large (2kg)</MenuItem>
                    <MenuItem value="3000g">Party Pack (3kg)</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                  {product.weight === "custom" && (
                    <TextField type="number" label="Enter weight (g)" onBlur={(e) => setProductWeight(e.target.value + "g")} size="small" sx={{ mt: 1, width: 150 }} />
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#9BFF82", borderRadius: 2, p: 1 }}>
                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 20 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    {product.stock} in stock
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2} mt={4}>
                <Grid size={3}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, borderRadius: 10, border: "1px solid #2c2c2c", p: 1, backgroundColor: "#gainsboro" }}>
                    <Box>
                      <Add sx={{ color: "#2c2c2c", fontSize: 20 }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                      1
                    </Typography>
                    <Box>
                      <Remove sx={{ color: "#2c2c2c", fontSize: 20 }} />
                    </Box>
                  </Box>
                </Grid>
                <Grid size={8} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      backgroundColor: "#FF9472",
                      color: "#fff",
                      p: 1,
                      borderRadius: "12px",
                      fontSize: { xs: 16, md: 18 },
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "50px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 4px 15px rgba(255,148,114,0.3)",
                      "&:hover": {
                        backgroundColor: "#F2709C",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 25px rgba(255,148,114,0.5)",
                      },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                        color: "#999",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
                <Grid size={1} sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
                  <IconButton aria-label="delete" size="large" sx={{ backgroundColor: "#edecec", borderRadius: "50px" }}>
                    <FavoriteBorder sx={{ color: "#2c2c2c", fontSize: 20 }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 2, backgroundColor: "#F0FFF4", p: 1, borderRadius: 2, border: "1px solid #B5FFC9" }}>
              <Typography variant="subtitle1" sx={{ fontSize: 14, fontWeight: 600, color: "#00A819" }}>
                <LocalShipping /> Order within 2hrs for delivery today.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box sx={{ py: 6 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ backgroundColor: "#FFEFEA", height: "200px", px: 2 }}>
          {features?.map((text, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Box sx={{ backgroundColor: "#FFEFEA", p: 3, borderRadius: 3, textAlign: "start", display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                <Box sx={{ backgroundColor: "#fff", color: "#FF6F61", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, }}>
                  {icons[i]}
                </Box>
                <Typography fontWeight={600} sx={{ whiteSpace: "pre-line", fontSize: 14, color: "#515151", fontWeight: 'bold' }}>
                  {text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔶 What's Inside + Nutrition Facts */}
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid size={6}>
            <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography fontWeight={600}>What's Inside</Typography>
              <Typography mt={1} fontSize={14} color="text.secondary">
                We use only the finest ingredients sourced from trusted local farmers and premium importers.
                Premium Type 55 French Wheat Flour, Normandy Butter (82% fat), Belgian Dark Chocolate (54.5%),
                Free-range Eggs, Fresh Whole Milk, Cane Sugar, Sea Salt, Yeast.
              </Typography>
              <Box mt={2} sx={{ p: 2, background: "#FFF1EE", borderRadius: 2, display: "flex", alignItems: "center", gap: 2, border: "1px solid #FF643A" }}>
                <ThumbUpOffAlt sx={{ color: "#FF643A" }} />
                <Box>
                  <Typography fontWeight={600}>Allergen Information</Typography>
                  <Typography fontSize={13}>Contains: Wheat, Gluten, Milk, Eggs, Soy.</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography fontWeight={600} fontSize={18} mb={1}>
                Nutrition Facts
              </Typography>
              <Box fontSize={14}>
                {[
                  { label: "Calories", value: "320 kcal" },
                  { label: "Fat", value: "19g" },
                  { label: "Carbohydrates", value: "35g" },
                  { label: "Protein", value: "4g" },
                  { label: "Sugar", value: "12g" }
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1.2,
                      borderBottom: index !== 4 ? "1px solid #eee" : "none"
                    }}
                  >
                    <Typography>{item.label}</Typography>
                    <Typography fontWeight={600}>{item.value}</Typography>
                  </Box>
                ))}
              </Box>
              <Box mt={2} sx={{ p: 2, background: "#F8F8F8", borderRadius: 2, border: "1px solid #D5D5D5" }}>
                <Typography fontWeight={600}>Storage Instructions</Typography>
                <Typography fontSize={13}>
                  Keep in a cool dry place. Consume within 24 hours.
                  Can be rewarmed in an oven for 2 mins at 180°C.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Rating Section */}
        <Box mt={6}>
          <Typography fontSize={34} fontWeight={700}>4.5 ⭐</Typography>
          <Typography fontSize={14} color="text.secondary">120 reviews</Typography>

          {/* Rating Bars */}
          {[5, 4, 3, 2, 1].map((r, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, my: 0.5 }}>
              <Typography width={20}>{r}</Typography>
              <Box sx={{ flex: 1, height: 8, background: "#FFE1DA", borderRadius: 4, position: 'relative' }}>
                <Box sx={{
                  height: "100%",
                  width: `${[40, 20, 19, 10, 7][i]}%`,
                  bgcolor: "#FF6F61",
                  borderRadius: 4
                }} />
              </Box>
              <Typography>{[40, 20, 19, 10, 7][i]}%</Typography>
            </Box>
          ))}
        </Box>

        {/* Reviews */}
        <Box mt={4}>
          {[{
            name: "Sophia Carter", time: "2 weeks ago",
            text: "These chocolate muffins are absolutely divine! Perfect balance of sweetness and rich chocolate flavor."
          }, {
            name: "Ethan Bennett", time: "1 month ago",
            text: "Good taste, a little too sweet for me. Texture is soft and moist overall decent treat."
          }].map((review, i) => (
            <Box key={i} sx={{ p: 3, borderRadius: 2, backgroundColor: "#FCF7FA", mt: 2 }}>
              <Box display="flex" gap={2} alignItems="center">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Box>
                  <Typography fontWeight={600}>{review.name}</Typography>
                  <Typography fontSize={12} color="text.secondary">{review.time}</Typography>
                </Box>
              </Box>
              <Rating value={5 - i} readOnly size="small" sx={{ mt: 1 }} />
              <Typography mt={1} fontSize={14}>{review.text}</Typography>
              <Box sx={{ display: "flex", gap: 3, mt: 2, color: "#707070" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: .5, cursor: "pointer" }}>
                  <ThumbUpOffAlt />
                  <Typography fontSize={13}>12</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: .5, cursor: "pointer" }}>
                  <ThumbDownOffAlt />
                  <Typography fontSize={13}>3</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Explore More */}
        <h1 className="title-style text-center mt-5 mb-4">Explore More</h1>
        <Box sx={{ width: "100%", borderBottom: "1px solid #e5e5e5" }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            centered
            TabIndicatorProps={{
              sx: {
                backgroundColor: "#C22A00",
                height: 10,
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            }}
            sx={{
              "& .MuiTab-root": {
                fontSize: 18,
                textTransform: "capitalize",
                fontWeight: 500,
                mx: 2
              },
              "& .Mui-selected": { color: "#FF643A", fontWeight: 700 }
            }}
          >
            {["Cake", "Muffins", "Croissant", "Bread", "Tart", "Favorite"].map((item) => (
              <Tab key={item} label={item} value={item.toLowerCase()} />
            ))}
          </Tabs>
        </Box>
        <Grid container spacing={3} mt={4}>
          {images.map((img, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Box
                component="img"
                src={img}
                sx={{
                  width: "100%",
                  height: 230,
                  objectFit: "cover",
                  borderRadius: 3,
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.03)" } // subtle hover like premium UI
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

