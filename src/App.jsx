import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Footer } from "./components/comman/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/comman/Navbar";
import { TopHeader } from "./components/comman/TopHeader";
import { SplashScreen } from "./components/comman/SplashScreen";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          position: "relative",
          opacity: showSplash ? 0 : 1,
          visibility: showSplash ? "hidden" : "visible",
          pointerEvents: showSplash ? "none" : "auto",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <TopHeader />
        <Navbar />
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
