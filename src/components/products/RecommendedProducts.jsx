import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "react-slick";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      right: { xs: "5px", sm: "5px", md: "-10px" },
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: "#fff",
      width: { xs: 32, sm: 36, md: 38 },
      height: { xs: 32, sm: 36, md: 38 },
      borderRadius: "50%",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      display: { xs: "flex", md: "flex" },
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover": { backgroundColor: "#FF643A", color: "#fff" },
    }}
  >
    <ArrowForwardIos sx={{ fontSize: { xs: 16, sm: 17, md: 18 } }} />
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      left: { xs: "5px", sm: "5px", md: "-10px" },
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: "#fff",
      width: { xs: 32, sm: 36, md: 38 },
      height: { xs: 32, sm: 36, md: 38 },
      borderRadius: "50%",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      display: { xs: "flex", md: "flex" },
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover": { backgroundColor: "#FF643A", color: "#fff" },
    }}
  >
    <ArrowBackIosNew sx={{ fontSize: { xs: 16, sm: 17, md: 18 } }} />
  </Box>
);

export const RecommendedProducts = ({ recommendedProducts = [] }) => {
  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: recommendedProducts.length > 5,
    speed: 600,
    slidesToShow: Math.min(5, recommendedProducts.length),
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: recommendedProducts.length > 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: Math.min(4, recommendedProducts.length), slidesToScroll: 2 } },
      { breakpoint: 900, settings: { slidesToShow: Math.min(3, recommendedProducts.length), slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: Math.min(2, recommendedProducts.length), slidesToScroll: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Box
      sx={{
        position: "relative",
        "& .slick-slider": {
          position: "relative",
        },
        "& .slick-list": {
          padding: { xs: "0 20px", md: "0" },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Slider {...settings}>
          {recommendedProducts?.map((product) => (
            <Box key={product?.id} sx={{ px: { xs: 1, md: 1.5 } }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: { xs: 1.5, md: 2 },
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product?.image}
                  alt={product?.name}
                  loading="lazy"
                  sx={{ 
                    height: { xs: 160, sm: 180, md: 200 },
                    objectFit: "cover" 
                  }}
                />

                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#2c2c2c",
                      mb: 0.5,
                      fontSize: { xs: 13, md: 16 },
                    }}
                  >
                    {product?.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#964F73",
                      fontSize: { xs: 11, md: 13 },
                    }}
                  >
                    {product?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

