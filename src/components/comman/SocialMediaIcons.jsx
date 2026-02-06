import { Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export const SocialMediaIcons = () => {
  const socialLinks = {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    twitter: "https://www.twitter.com",
    youtube: "https://www.youtube.com",
  };

  const handleSocialClick = (platform, url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: { md: 20 },
        top: { md: "60%" },
        transform: "translateY(-50%)",
        zIndex: 999,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        gap: 1.5,
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => handleSocialClick("facebook", socialLinks.facebook)}
        sx={{
          backgroundColor: "#1877F2",
          color: "#fff",
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          boxShadow: "0 4px 12px rgba(24, 119, 242, 0.4)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#166FE5",
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(24, 119, 242, 0.6)",
          },
        }}
        aria-label="Facebook"
      >
        <FacebookIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>

      <IconButton
        onClick={() => handleSocialClick("instagram", socialLinks.instagram)}
        sx={{
          background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
          color: "#fff",
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          boxShadow: "0 4px 12px rgba(225, 48, 108, 0.4)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(225, 48, 108, 0.6)",
          },
        }}
        aria-label="Instagram"
      >
        <InstagramIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>

      <IconButton
        onClick={() => handleSocialClick("twitter", socialLinks.twitter)}
        sx={{
          backgroundColor: "#1DA1F2",
          color: "#fff",
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          boxShadow: "0 4px 12px rgba(29, 161, 242, 0.4)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#1A91DA",
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(29, 161, 242, 0.6)",
          },
        }}
        aria-label="Twitter"
      >
        <TwitterIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>

      <IconButton
        onClick={() => handleSocialClick("youtube", socialLinks.youtube)}
        sx={{
          backgroundColor: "#FF0000",
          color: "#fff",
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          boxShadow: "0 4px 12px rgba(255, 0, 0, 0.4)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#E60000",
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(255, 0, 0, 0.6)",
          },
        }}
        aria-label="YouTube"
      >
        <YouTubeIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>
    </Box>
  );
};
