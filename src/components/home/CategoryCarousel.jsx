import Slider from "react-slick";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import cat1 from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.png";
import cat2 from "../../assets/60be109ca830b1d8ab92f161cd0ca3083a16e4ca.png";
import cat3 from "../../assets/43676d15934fc50bdda59d3e39fd8a4ceaadcb9e.png";

const items = [
  { title: "PIZZA & BURGERS", img: cat1 },
  { title: "PINEAPPLE CAKES", img: cat2 },
  { title: "PASTRY & CUP CAKES", img: cat1 },
  { title: "BLUEBERRY CHOCOLATE CAKE", img: cat3 },
  { title: "CRISMAS CELEBRATION", img: cat1 },
  { title: "BLACKFOREST CAKES", img: cat1 },
  { title: "RED VELVET CLASSIC", img: cat2 },
  { title: "OREO CRUNCH CAKE", img: cat3 },
  { title: "STRAWBERRY DREAM PASTRY", img: cat2 },
  { title: "FRUIT & NUT DELIGHT", img: cat1 },
  { title: "COFFEE MOCHA CAKE", img: cat2 },
  { title: "KITKAT SURPRISE CAKE", img: cat3 },
  { title: "CARAMEL BUTTERSCOTCH CAKE", img: cat1 },
  { title: "BIRTHDAY SPECIAL THEME CAKE", img: cat3 },
  { title: "PARTY CELEBRATION COMBO", img: cat2 },
  { title: "FRESH CREAM VANILLA CAKE", img: cat1 },
  { title: "ANNIVERSARY SPECIAL CAKE", img: cat3 },
  { title: "CHOCO TRUFFLE PREMIUM", img: cat2 },
  { title: "DOLL SHAPE DESIGN CAKE", img: cat1 },
  { title: "KIDS CARTOON THEME CAKE", img: cat3 },
];


export const CategoryCarousel = () => {
  let sliderRef = null;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fbd9d3",
        borderRadius: { xs: "30px", md: "100px" },
        py: { xs: 2, md: 4 },
        px: { xs: 2, md: 5 },
        mb: { xs: 3, md: 5 },
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => sliderRef.slickPrev()}
        sx={{
          position: "absolute",
          left: { xs: 5, md: 10 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 28 } }} />
      </IconButton>

      {/* Carousel */}
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {items?.map((item, i) => (
          <Box
            key={i}
            sx={{
              px: { xs: 1, sm: 2, md: 5 },
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-8px)",
                "& img": {
                  transform: "scale(1.15) rotate(5deg)",
                },
                "& .category-title": {
                  color: "var(--specialColor)",
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <Box
              component="img"
              src={item.img}
              alt=""
              sx={{
                height: { xs: 60, md: 85 },
                width: "100%",
                objectFit: "contain",
                mb: 1,
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              }}
            />
            <Typography
              className="category-title"
              sx={{
                fontSize: { xs: 10, sm: 11, md: 13 },
                fontWeight: 600,
                color: "var(--themeColor)",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Slider>

      {/* Right Arrow */}
      <IconButton
        onClick={() => sliderRef.slickNext()}
        sx={{
          position: "absolute",
          right: { xs: 5, md: 10 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <ArrowForwardIosIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 28 } }} />
      </IconButton>
    </Box>
  );
};
