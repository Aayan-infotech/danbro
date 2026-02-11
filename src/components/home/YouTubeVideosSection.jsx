import { Box, Container, Grid, IconButton } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MovieIcon from "@mui/icons-material/Movie";

const BRAND_COLOR = "#5F2930";
const GOLD_ACCENT = "#fcd34d";

const youtubeVideos = [
  { id: 1, videoId: "33d42UTJRzo", title: "Danbro Bakery Story", thumbnail: `https://img.youtube.com/vi/33d42UTJRzo/hqdefault.jpg` },
  { id: 2, videoId: "rYRDiLcCj4Q", title: "Our Bakery Products", thumbnail: `https://img.youtube.com/vi/rYRDiLcCj4Q/hqdefault.jpg` },
  { id: 3, videoId: "s1TvejLsfXU", title: "Customer Experience", thumbnail: `https://img.youtube.com/vi/s1TvejLsfXU/hqdefault.jpg` },
  { id: 4, videoId: "gjOQ8Fo4xWs", title: "Behind the Scenes", thumbnail: `https://img.youtube.com/vi/gjOQ8Fo4xWs/hqdefault.jpg` },
];

export const YouTubeVideosSection = () => {
  const [visible, setVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          overflow: "hidden",
          background: "#1e1513",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(95, 41, 48, 0.25) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(190, 130, 100, 0.12) 0%, transparent 45%)
          `,
          py: { xs: 4, md: 6 },
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          {/* Header: Discover Danbro Bakery – Playfair Display */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 3.5,
              backdropFilter: "blur(20px)",
              background: "rgba(30, 21, 19, 0.65)",
              padding: "1.2rem 2.2rem",
              borderRadius: "120px",
              border: "1px solid rgba(255, 215, 200, 0.15)",
              boxShadow: "0 25px 45px -12px rgba(0,0,0,0.4)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Box
                component="h1"
                className="home-section-heading"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                  fontWeight: 700,
                  color: "#fffcf5",
                  letterSpacing: "-0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  m: 0,
                }}
              >
                <Box
                  sx={{
                    color: GOLD_ACCENT,
                    background: "rgba(95, 41, 48, 0.7)",
                    padding: 0.8,
                    borderRadius: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,215,0,0.3)",
                    boxShadow: "0 12px 28px rgba(252,211,77,0.2)",
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: "1.8rem" }} />
                </Box>
                Discover Danbro Bakery
                <Box
                  component="span"
                  sx={{
                    background: BRAND_COLOR,
                    color: "white",
                    py: 0.6,
                    px: 1.8,
                    borderRadius: "100px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow: "0 15px 30px -10px #5F2930",
                  }}
                >
                  <YouTubeIcon sx={{ fontSize: "1.1rem" }} />
                  4K CINEMATIC
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", color: "rgba(255,235,220,0.7)", letterSpacing: "1px", fontSize: "0.9rem", bgcolor: "rgba(0,0,0,0.25)", py: 0.5, px: 1.5, borderRadius: "60px" }}>
              <MovieIcon sx={{ color: GOLD_ACCENT, fontSize: "1.1rem" }} />
              {youtubeVideos.length} stories
            </Box>
          </Box>

          <CustomText
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "rgba(255, 235, 220, 0.85)",
              maxWidth: 600,
              textAlign: "center",
              mx: "auto",
              mb: 3,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Watch our journey, see our products, and experience the passion behind every creation
          </CustomText>

          {/* Video Grid – cinematic cards */}
          <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ mt: 1.5 }}>
            {youtubeVideos.map((video, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={video.id}>
                <Box
                  onClick={() => openVideo(video.videoId)}
                  sx={{
                    position: "relative",
                    borderRadius: "48px",
                    background: "rgba(25, 18, 17, 0.6)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 215, 200, 0.12)",
                    overflow: "hidden",
                    transition: "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
                    cursor: "pointer",
                    boxShadow: "0 30px 50px -25px rgba(0,0,0,0.5)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(30px)",
                    animation: visible ? `fadeInUp 0.5s ease ${index * 0.1}s both` : "none",
                    "@keyframes fadeInUp": {
                      "0%": { opacity: 0, transform: "translateY(30px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                    "&:hover": {
                      transform: "translateY(-16px) scale(1.02)",
                      border: "1px solid rgba(252, 211, 77, 0.4)",
                      background: "rgba(35, 25, 23, 0.8)",
                      boxShadow: "0 50px 70px -20px rgba(252,211,77,0.15), 0 0 0 2px rgba(95,41,48,0.3)",
                      "& .thumbnail-img": {
                        transform: "scale(1.13)",
                        filter: "brightness(1) saturate(1.2)",
                      },
                      "& .play-overlay": { opacity: 1 },
                      "& .play-icon-3d": { background: GOLD_ACCENT, transform: "scale(1.15)" },
                      "& .video-title": { color: GOLD_ACCENT },
                      "& .accent-bar": { width: "100px", background: GOLD_ACCENT },
                    },
                  }}
                >
                  {index === 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        width: 8,
                        height: 8,
                        bgcolor: GOLD_ACCENT,
                        opacity: 0.2,
                        borderRadius: "50%",
                        top: "10%",
                        left: "5%",
                        filter: "blur(3px)",
                        animation: "particleFloat 10s infinite alternate",
                        "@keyframes particleFloat": {
                          "0%": { transform: "translate(0, 0) scale(1)", opacity: 0.2 },
                          "100%": { transform: "translate(-25px, -30px) scale(2)", opacity: 0.6 },
                        },
                      }}
                    />
                  )}

                  {/* Thumbnail */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      overflow: "hidden",
                      borderRadius: "48px 48px 32px 32px",
                      transition: "all 0.4s",
                      "&:hover": { borderRadius: "32px 32px 24px 24px" },
                    }}
                  >
                    <Box
                      className="thumbnail-img"
                      component="img"
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                      }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1), filter 0.5s",
                        filter: "brightness(0.85) saturate(1.1)",
                      }}
                    />
                    <Box
                      className="play-overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0,0,0,0.2)",
                        opacity: 0,
                        transition: "all 0.35s",
                      }}
                    >
                      <Box
                        className="play-icon-3d"
                        sx={{
                          width: 70,
                          height: 70,
                          background: "rgba(252, 211, 77, 0.9)",
                          borderRadius: "38% 62% 42% 58% / 56% 44% 56% 44%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#1e1513",
                          border: "2px solid rgba(255,255,255,0.5)",
                          boxShadow: "0 20px 30px -8px rgba(0,0,0,0.5)",
                          transition: "all 0.3s",
                        }}
                      >
                        <PlayArrowIcon sx={{ fontSize: "2rem" }} />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 20,
                        background: "rgba(30, 21, 19, 0.75)",
                        color: "white",
                        py: 0.4,
                        px: 1.1,
                        borderRadius: "60px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        zIndex: 5,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <ScheduleIcon sx={{ fontSize: "0.9rem" }} />
                      Watch
                    </Box>
                  </Box>

                  {/* Video info */}
                  <Box sx={{ p: "1.8rem 1.5rem 2rem 1.8rem", display: "flex", flexDirection: "column" }}>
                    <CustomText
                      className="video-title"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.45rem",
                        fontWeight: 700,
                        color: "#fffbf5",
                        lineHeight: 1.2,
                        mb: 0.6,
                        letterSpacing: "-0.02em",
                        transition: "color 0.2s",
                      }}
                    >
                      {video.title}
                    </CustomText>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, fontSize: "0.75rem", color: "rgba(255, 235, 220, 0.7)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "1px" }}>
                      <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, bgcolor: "rgba(255,255,255,0.05)", py: 0.35, px: 1, borderRadius: "60px", border: "1px solid rgba(255,215,200,0.1)" }}>
                        #{video.videoId}
                      </Box>
                    </Box>
                    <Box
                      className="accent-bar"
                      sx={{
                        width: 60,
                        height: 4,
                        background: BRAND_COLOR,
                        borderRadius: "10px",
                        my: "1rem 0.2rem",
                        transition: "width 0.3s",
                      }}
                    />
                    <Box sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", mt: 0.7, display: "flex", gap: 1.5, alignItems: "center" }}>
                      <YouTubeIcon sx={{ color: "#ff0000", fontSize: "1rem" }} />
                      YouTube
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Footer: nav orbs + subscribe */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 3, gap: 1.5, flexWrap: "wrap" }}>
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: "100px",
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(252,211,77,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: GOLD_ACCENT,
                "&:hover": { bgcolor: GOLD_ACCENT, color: "#1e1513", borderColor: GOLD_ACCENT, transform: "scale(1.1)" },
                transition: "all 0.25s",
              }}
            >
              ←
            </Box>
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: "100px",
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(252,211,77,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: GOLD_ACCENT,
                "&:hover": { bgcolor: GOLD_ACCENT, color: "#1e1513", borderColor: GOLD_ACCENT, transform: "scale(1.1)" },
                transition: "all 0.25s",
              }}
            >
              →
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "rgba(255,255,255,0.03)", py: 0.2, px: 1.5, borderRadius: "100px", border: "1px solid rgba(255,215,200,0.1)" }}>
              <YouTubeIcon sx={{ color: "#ff0000", fontSize: "1.3rem" }} />
              <Box component="span" sx={{ color: "white", fontSize: "0.85rem", fontWeight: 500 }}>subscribe</Box>
            </Box>
          </Box>

          {/* Micro footer */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5, gap: 2, flexWrap: "wrap" }}>
            <Box component="span" sx={{ bgcolor: "rgba(255,255,255,0.02)", py: 0.5, px: 2, borderRadius: "60px", border: "1px solid rgba(252,211,77,0.2)", color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: 0.75 }}>
              <PlayArrowIcon sx={{ color: GOLD_ACCENT, fontSize: "1.1rem" }} />
              {youtubeVideos.length} cinematic stories
            </Box>
            <Box component="span" sx={{ bgcolor: "rgba(95, 41, 48, 0.3)", py: 0.5, px: 2, borderRadius: "60px", border: "1px solid rgba(252,211,77,0.25)", color: "#fff3e0", fontSize: "0.85rem" }}>
              DANBRO BAKERY
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Video Modal – unchanged */}
      {selectedVideo && (
        <Box
          onClick={closeVideo}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 4 },
            animation: "fadeIn 0.3s ease",
            "@keyframes fadeIn": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: "100%", md: "900px" },
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              animation: "scaleIn 0.3s ease",
              "@keyframes scaleIn": { "0%": { transform: "scale(0.9)", opacity: 0 }, "100%": { transform: "scale(1)", opacity: 1 } },
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
            <IconButton
              onClick={closeVideo}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.9)" },
              }}
            >
              ×
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};
