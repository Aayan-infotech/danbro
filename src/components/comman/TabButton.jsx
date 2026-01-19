import { Button, Box } from "@mui/material";

/**
 * Reusable Tab Button Component
 * @param {string} label - Button label text
 * @param {boolean} isActive - Whether the button is currently active
 * @param {function} onClick - Click handler function
 * @param {object} sx - Additional sx styles to override defaults
 */
export const TabButton = ({ label, isActive, onClick, sx = {} }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        fontSize: { xs: 11, sm: 12, md: 14 },
        color: isActive ? "var(--themeColor)" : "rgba(0,0,0,0.7)",
        border: isActive ? "2px solid var(--themeColor)" : "2px solid transparent",
        backgroundColor: isActive ? "#fff4f0" : "transparent",
        borderRadius: 20,
        px: isActive ? { xs: 2, md: 3 } : 0,
        py: isActive ? { xs: 0.4, md: 0.6 } : 0,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        whiteSpace: "nowrap",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "0",
          height: "0",
          borderRadius: "50%",
          background: isActive
            ? "radial-gradient(circle, rgba(95,41,48,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,181,161,0.2) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "all 0.5s ease",
          zIndex: 0,
        },
        "&:hover": {
          transform: "translateY(-3px) scale(1.05)",
          backgroundColor: isActive ? "#fff4f0" : "rgba(255,244,240,0.6)",
          border: "2px solid var(--themeColor)",
          boxShadow: "0 6px 20px rgba(95,41,48,0.2)",
          "&::before": {
            width: "300%",
            height: "300%",
          },
        },
        "&:active": {
          transform: "translateY(-1px) scale(1.02)",
        },
        ...sx,
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>{label}</Box>
    </Button>
  );
};

