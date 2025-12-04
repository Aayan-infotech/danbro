import { Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef } from "react";
import banner from "../../assets/banner.png";

export const HeroBanner = () => {
  let sliderRef = null;
  const bannerRef = useRef(null);

  // Create multiple banner slides (using same image for carousel effect)
  const bannerSlides = [
    { id: 1, img: banner, alt: "hero banner 1" },
    { id: 2, img: banner, alt: "hero banner 2" },
    { id: 3, img: banner, alt: "hero banner 3" },
  ];

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    pauseOnHover: true,
    fade: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  return (
    <Box
      ref={bannerRef}
      sx={{
        width: "100%",
        maxWidth: "100vw",
        mb: 4,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        opacity: 0,
        transform: "translateY(20px)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,181,161,0.15) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(30px, 30px) scale(1.1)" },
          },
          zIndex: 0,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-30px",
          right: "-30px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,199,181,0.12) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(-20px, -20px) scale(1.1)" },
          },
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          position: "relative",
          zIndex: 1,
          borderRadius: { xs: "15px", md: "20px" },
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        }}
      >
        {/* Left Arrow */}
        <IconButton
          onClick={() => sliderRef?.slickPrev()}
          sx={{
            position: "absolute",
            left: { xs: 10, md: 20 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              transform: "translateY(-50%) scale(1.1)",
            },
            display: { xs: "none", md: "flex" },
            transition: "all 0.3s ease",
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "var(--themeColor)", fontSize: 28 }} />
        </IconButton>

        {/* Carousel */}
        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          {bannerSlides.map((slide) => (
            <Box
              key={slide.id}
              sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 100%)",
                  pointerEvents: "none",
                  zIndex: 1,
                },
                "&:hover": {
                  "& img": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={slide.img}
                alt={slide.alt}
                sx={{
                  width: "100%",
                  maxWidth: "1400px",
                  height: "auto",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </Box>
          ))}
        </Slider>

        {/* Right Arrow */}
        <IconButton
          onClick={() => sliderRef?.slickNext()}
          sx={{
            position: "absolute",
            right: { xs: 10, md: 20 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              transform: "translateY(-50%) scale(1.1)",
            },
            display: { xs: "none", md: "flex" },
            transition: "all 0.3s ease",
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "var(--themeColor)", fontSize: 28 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
