import { useRef, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export const ProductDetailsImageGallery = ({
  productData,
  product,
  selectedImage,
  onSelectImage,
  onZoomActiveChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageContainerRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updatePosition = (e) => {
    if (!imageContainerRef.current || isMobile) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const lensSize = 120;
    const half = lensSize / 2;
    const left = Math.max(0, Math.min(rect.width - lensSize, relX - half));
    const top = Math.max(0, Math.min(rect.height - lensSize, relY - half));
    setMousePosition({ x: left, y: top });
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleMouseMove = updatePosition;
  const handleMouseEnter = (e) => {
    if (!isMobile) {
      setIsZooming(true);
      onZoomActiveChange?.(true);
      updatePosition(e);
    }
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    onZoomActiveChange?.(false);
  };

  return (
    <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2 }, flexDirection: { xs: "column", md: "row" }, height: { xs: "auto", md: "100%" }, width: "100%", minWidth: 0 }}>
      {/* Thumbnails - desktop only */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 1.5,
          maxHeight: 398,
          overflowY: "auto",
          overflowX: "hidden",
          pr: 0.5,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { borderRadius: 3, bgcolor: "rgba(0,0,0,0.2)" },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        }}
      >
        {productData?.images?.map((image, index) => (
          <Box
            key={index}
            onClick={() => onSelectImage(index)}
            sx={{
              width: 70,
              height: 70,
              flexShrink: 0,
              borderRadius: 1,
              overflow: "hidden",
              cursor: "pointer",
              border: selectedImage === index ? "2px solid #FF9472" : "1px solid #e0e0e0",
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`${productData?.name} ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>

      {/* Main image with zoom */}
      <Box sx={{ flex: 1, position: "relative", minHeight: 0, minWidth: 0 }}>
        <Box
          ref={imageContainerRef}
          sx={{
            width: "100%",
            height: { xs: 260, sm: 320, md: 420 },
            minHeight: { xs: 260, sm: 320, md: 420 },
            borderRadius: 1,
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
            position: "relative",
            cursor: { xs: "default", md: isZooming ? "crosshair" : "zoom-in" },
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <Box
            component="img"
            src={productData?.images?.[selectedImage]}
            alt={productData?.name}
            loading="eager"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {product?.veg != null && product?.veg !== "" && (product?.veg === "Y" || product?.veg === "y" || product?.veg === true || product?.veg === "N" || product?.veg === "n" || product?.veg === false) && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: product?.veg === "Y" || product?.veg === "y" || product?.veg === true ? "#2e7d32" : "#d32f2f",
                border: "2px solid #fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                zIndex: 5,
              }}
              aria-label={product?.veg === "Y" || product?.veg === "y" || product?.veg === true ? "Veg" : "Non-Veg"}
            />
          )}
          {isZooming && !isMobile && (
            <Box
              sx={{
                position: "absolute",
                top: mousePosition.y,
                left: mousePosition.x,
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "2px solid rgba(255, 148, 114, 0.9)",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                pointerEvents: "none",
                display: { xs: "none", md: "block" },
                zIndex: 10,
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.35)",
              }}
            />
          )}
        </Box>
        {isZooming && !isMobile && (
          <Box
            className="product-details-zoom-preview"
            sx={{
              position: "absolute",
              top: 0,
              left: "100%",
              ml: 1.5,
              width: 400,
              height: 420,
              minWidth: 400,
              minHeight: 420,
              borderRadius: 1,
              overflow: "hidden",
              backgroundColor: "#fff",
              zIndex: 1,
              display: { xs: "none", md: "block" },
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              border: "1px solid #eee",
            }}
          >
            <Box
              component="img"
              src={productData?.images?.[selectedImage]}
              alt={`${productData?.name} - Zoomed`}
              sx={{
                width: "200%",
                height: "200%",
                objectFit: "cover",
                position: "absolute",
                /* Flipkart-style: point under cursor stays at center of zoom box (2x zoom) */
                left: `${50 - 2 * zoomPosition.x}%`,
                top: `${50 - 2 * zoomPosition.y}%`,
                pointerEvents: "none",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
