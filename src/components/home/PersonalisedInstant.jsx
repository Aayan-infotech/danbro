import { Box, Typography, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import mens from "../../assets/bbd53846cb92a734a26973d3c7cd83699addf233.png";

export const PersonalisedInstant = () => {
    const contentRef = useRef(null);
    const imageRef = useRef(null);

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

        if (contentRef.current) observer.observe(contentRef.current);
        if (imageRef.current) observer.observe(imageRef.current);

        return () => {
            if (contentRef.current) observer.unobserve(contentRef.current);
            if (imageRef.current) observer.unobserve(imageRef.current);
        };
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100vw",
                bgcolor: "#f7f7f7",
                borderRadius: "0 0 30px 30px",
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(251,199,181,0.1) 0%, rgba(255,181,161,0.05) 100%)",
                    pointerEvents: "none",
                },
            }}
        >
            {/* Animated Background Elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,181,161,0.2) 0%, transparent 70%)",
                    animation: "float 6s ease-in-out infinite",
                    "@keyframes float": {
                        "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                        "50%": { transform: "translateY(-20px) rotate(180deg)" },
                    },
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "-30px",
                    left: "-30px",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(251,199,181,0.15) 0%, transparent 70%)",
                    animation: "float 8s ease-in-out infinite reverse",
                    "@keyframes float": {
                        "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                        "50%": { transform: "translateY(-15px) rotate(-180deg)" },
                    },
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            <Box
                ref={imageRef}
                sx={{
                    width: { xs: "100%", md: "50%" },
                    position: "relative",
                    opacity: 0,
                    transform: "translateX(-50px)",
                    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(to right, transparent 0%, rgba(247,247,247,0.3) 100%)",
                        pointerEvents: "none",
                    },
                }}
            >
                <Box
                    component="img"
                    src={mens}
                    alt="App Banner"
                    sx={{
                        width: "100%",
                        height: { xs: "auto", md: "100%" },
                        minHeight: { xs: "300px", md: "500px" },
                        objectFit: "cover",
                        display: "block",
                    }}
                />
            </Box>
            <Box
                ref={contentRef}
                sx={{
                    width: { xs: "100%", md: "50%" },
                    px: { xs: 3, md: 6 },
                    py: { xs: 4, md: 6 },
                    textAlign: { xs: "center", md: "left" },
                    position: "relative",
                    zIndex: 2,
                    opacity: 0,
                    transform: "translateX(50px)",
                    transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="logo"
                    sx={{
                        height: { xs: 60, sm: 80, md: 100 },
                        width: "auto",
                        mb: { xs: 2, md: 3 },
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }}
                />

                <Typography
                    sx={{
                        mt: { xs: 2, md: 3 },
                        fontSize: { xs: 24, sm: 28, md: 36 },
                        fontWeight: 800,
                        mb: { xs: 2, md: 3 },
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            backgroundColor: "#0f1b40",
                            color: "#fff",
                            borderRadius: "40px",
                            px: { xs: 2, sm: 2.5, md: 3 },
                            py: { xs: "8px", md: "10px" },
                            display: "inline-block",
                            boxShadow: "0 4px 15px rgba(15,27,64,0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 20px rgba(15,27,64,0.4)",
                            },
                        }}
                    >
                        <Box
                            component="strong"
                            sx={{
                                color: "#FFB5A1",
                                textDecoration: "underline",
                                textDecorationThickness: "2px",
                                textUnderlineOffset: "4px",
                            }}
                        >
                            Personalised
                        </Box>{" "}
                        & Instant
                    </Box>
                </Typography>

                <Typography
                    sx={{
                        mt: { xs: 1.5, md: 2 },
                        fontSize: { xs: 14, sm: 16, md: 18 },
                        color: "#444",
                        mb: { xs: 2.5, md: 3 },
                        fontWeight: 500,
                    }}
                >
                    Download the DANBRO app for faster ordering
                </Typography>

                {/* Store Buttons */}
                <Box
                    sx={{
                        mt: { xs: 2, md: 3 },
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 1.5, md: 2 },
                        justifyContent: { xs: "center", md: "flex-start" },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            bgcolor: "#000",
                            color: "#fff",
                            px: { xs: 2.5, md: 3 },
                            py: { xs: 1, md: 1.2 },
                            borderRadius: "12px",
                            cursor: "pointer",
                            width: { xs: "100%", sm: 180 },
                            maxWidth: { xs: "280px", sm: "180px" },
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                                bgcolor: "#1a1a1a",
                            },
                        }}
                    >
                        <svg
                            width="22"
                            height="22"
                            fill="#fff"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16.365 1.43c0 1.14-.52 2.26-1.29 3.1-.83.9-2.21 1.61-3.47 1.51-.17-1.09.39-2.27 1.23-3.08.83-.83 2.25-1.45 3.5-1.53.02.02.02 0 .02.02zM20.26 17.43c-.49 1.12-.72 1.6-1.35 2.58-.88 1.35-2.13 3.03-3.69 3.06-1.38.03-1.83-.9-3.42-.9-1.61 0-2.11.87-3.43.93-1.38.05-2.43-1.47-3.32-2.8-1.81-2.78-3.2-7.88-1.34-11.33.92-1.65 2.57-2.71 4.37-2.71 1.37 0 2.67.93 3.42.93.7 0 2.37-1.15 3.99-.98.68.03 2.57.27 3.79 2.05-.1.06-2.27 1.33-2.24 3.96.03 3.14 2.75 4.18 2.81 4.21z" />
                        </svg>
                        <Box>
                            <Typography sx={{ fontSize: 10 }}>Download on the</Typography>
                            <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                                App Store
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            bgcolor: "#000",
                            color: "#fff",
                            px: { xs: 2.5, md: 3 },
                            py: { xs: 1, md: 1.2 },
                            borderRadius: "12px",
                            cursor: "pointer",
                            width: { xs: "100%", sm: 200 },
                            maxWidth: { xs: "280px", sm: "200px" },
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                                bgcolor: "#1a1a1a",
                            },
                        }}
                    >
                        <svg width="25" height="25" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#34A853" d="M325.3 234.3 98.6 7.6l242 139.7z" />
                            <path fill="#FBBC04" d="m98.6 7.6 0 496.8 226.7-270z" />
                            <path fill="#EA4335" d="M340.6 218.5 505.3 143c18.3-8.8 18.3-36.2 0-45L340.6 23z" />
                            <path fill="#4285F4" d="M340.6 293.5 340.6 489l164.7-87c18.3-8.8 18.3-36.2 0-45z" />
                        </svg>
                        <Box>
                            <Typography sx={{ fontSize: 10 }}>GET IT ON</Typography>
                            <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                                Google Play
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};
