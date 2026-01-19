import { Box } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer } from "./components/comman/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/comman/Navbar";
import { TopHeader } from "./components/comman/TopHeader";
import { DeliveryCheckDialog } from "./components/comman/DeliveryCheckDialog";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("deliveryDialogShown");
    if (!hasSeenDialog) {
      setTimeout(() => {
        setShowDeliveryDialog(true);
      }, 500);
    }
  }, []);

  const handleCloseDeliveryDialog = () => {
    setShowDeliveryDialog(false);
    localStorage.setItem("deliveryDialogShown", "true");
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <DeliveryCheckDialog open={showDeliveryDialog} onClose={handleCloseDeliveryDialog} />
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopHeader />
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
