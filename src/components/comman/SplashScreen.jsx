import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import logo from "../../assets/logo.webp";

export const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  useEffect(() => {
    // Logo entrance animation
    const timer1 = setTimeout(() => {
      setLogoScale(1);
      setLogoOpacity(1);
    }, 100);

    // Start fade out after 2 seconds
    const timer2 = setTimeout(() => {
      setLogoOpacity(0);
      setLogoScale(0.8);
      setBackgroundOpacity(0);
    }, 2000);

    // Remove splash screen after animation completes
    const timer3 = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: backgroundOpacity,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      {/* Animated background circles */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(95,41,48,0.05) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": {
                transform: "scale(1)",
                opacity: 0.5,
              },
              "50%": {
                transform: "scale(1.2)",
                opacity: 0.8,
              },
            },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-30%",
            right: "-30%",
            width: "60%",
            height: "60%",
            background: "radial-gradient(circle, rgba(195,46,6,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 4s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0) scale(1)",
              },
              "50%": {
                transform: "translateY(-20px) scale(1.1)",
              },
            },
          },
        }}
      />

      {/* Logo container with animations */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Logo with glow effect */}
        <Box
          sx={{
            position: "relative",
            padding: 3,
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%",
              height: "120%",
              background: "radial-gradient(circle, rgba(95,41,48,0.2) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "glow 2s ease-in-out infinite",
              "@keyframes glow": {
                "0%, 100%": {
                  opacity: 0.5,
                  transform: "translate(-50%, -50%) scale(1)",
                },
                "50%": {
                  opacity: 0.8,
                  transform: "translate(-50%, -50%) scale(1.1)",
                },
              },
            },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Danbro Logo"
            sx={{
              height: { xs: 120, sm: 150, md: 180 },
              width: "auto",
              position: "relative",
              zIndex: 1,
              filter: "drop-shadow(0 10px 30px rgba(95,41,48,0.3))",
              animation: "logoFloat 3s ease-in-out infinite",
              "@keyframes logoFloat": {
                "0%, 100%": {
                  transform: "translateY(0) rotate(0deg)",
                },
                "50%": {
                  transform: "translateY(-10px) rotate(2deg)",
                },
              },
            }}
          />
        </Box>

        {/* Loading dots */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
            opacity: logoOpacity,
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "var(--themeColor)",
                animation: `bounce 1.4s ease-in-out infinite ${index * 0.2}s`,
                "@keyframes bounce": {
                  "0%, 80%, 100%": {
                    transform: "scale(0.8)",
                    opacity: 0.5,
                  },
                  "40%": {
                    transform: "scale(1.2)",
                    opacity: 1,
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

