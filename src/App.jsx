import { Box, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Footer } from "./components/comman/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/comman/Navbar";
import { TopHeader } from "./components/comman/TopHeader";
import { DeliveryCheckDialog } from "./components/comman/DeliveryCheckDialog";
import { getStoredLocation } from "./utils/location";
import { prefetchRoute } from "./utils/routePrefetch";

const SocialMediaIcons = lazy(() =>
  import("./components/comman/SocialMediaIcons").then((m) => ({ default: m.SocialMediaIcons }))
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame for non-blocking scroll
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);

  // Preload key routes when browser is idle so navigation feels instant
  useEffect(() => {
    const prefetchKeyRoutes = () => {
      prefetchRoute("/cart");
      prefetchRoute("/products");
      prefetchRoute("/blog");
      prefetchRoute("/contact");
      prefetchRoute("/about-us");
      prefetchRoute("/offers");
    };
    const useIdle = typeof requestIdleCallback !== "undefined";
    const id = useIdle
      ? requestIdleCallback(prefetchKeyRoutes, { timeout: 1200 })
      : setTimeout(prefetchKeyRoutes, 400);
    return () => (useIdle ? cancelIdleCallback(id) : clearTimeout(id));
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const hasCheckedDeliveryDialog = useRef(false);

  // Load Danbro chatbot widget (replaces WhatsApp floating icon)
  useEffect(() => {
    const src =
      "http://34.206.193.218:5656/api/plugins/danbro/agent/emb_9cce4ed201ad5f7edaa03d59ae977919d519e5ce0244d305.js";

    // Guard: React 18 StrictMode may run effects twice in dev
    const alreadyLoaded = Array.from(document.scripts).some((s) => s?.src === src);
    if (alreadyLoaded) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Hide Navbar on profile page
  const hideNavbar = pathname === "/profile" || pathname === "/user-profile";
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/verify-otp";
  const isStorePage = pathname === "/store";
  const isEventsPage = pathname === "/events";
  const isNoPaddingPage =
    pathname === "/about-us" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog-details") ||
    pathname === "/contact";

  useEffect(() => {
    // Do not auto-open location dialog on payment result pages
    const suppressAutoDialog = pathname === "/order-success" || pathname === "/order-failure";
    if (suppressAutoDialog) {
      setShowDeliveryDialog(false);
      return;
    }

    // Run the auto-open check only once (on first non-suppressed route)
    if (hasCheckedDeliveryDialog.current) return;
    hasCheckedDeliveryDialog.current = true;

    // Check if location is already set
    const hasLocation = localStorage.getItem("userLocation");
    const hasSeenDialog = localStorage.getItem("deliveryDialogShown");

    // Show dialog if location is not set OR if user hasn't seen the dialog
    if (!hasLocation || !hasSeenDialog) {
      setShowDeliveryDialog(true);
    }
  }, [pathname]);

  useEffect(() => {
    const openDialog = () => setShowDeliveryDialog(true);
    window.addEventListener("openLocationDialog", openDialog);
    return () => window.removeEventListener("openLocationDialog", openDialog);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setShowScrollTop(scrollTop > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseDeliveryDialog = () => {
    setShowDeliveryDialog(false);
    localStorage.setItem("deliveryDialogShown", "true");
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isHomePage = pathname === "/" || pathname === "/home";

  return (
    <>
      <ScrollToTop />
      {isHomePage && (
        <Suspense fallback={null}>
          <SocialMediaIcons />
        </Suspense>
      )}
      <DeliveryCheckDialog
        open={showDeliveryDialog}
        onClose={handleCloseDeliveryDialog}
        initialLocationLabel={getStoredLocation().label || ""}
      />
      {/* TopHeader + Navbar outside scrollable area so they stay fixed/sticky */}
      <TopHeader
        onOpenMobileMenu={!hideNavbar ? () => setMobileMenuOpen(true) : undefined}
      />
      {!hideNavbar && (
        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuClose={() => setMobileMenuOpen(false)}
        />
      )}
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
        <Box
          sx={{
            flex: 1,
            // Add padding-top to account for fixed TopHeader / Navbar on most pages.
            pt: isAuthPage || isStorePage || isEventsPage || isNoPaddingPage
              ? { xs: "0px", sm: "0px", md: "0px", lg: "0px" }
              : hideNavbar
                ? { xs: "65px", sm: "70px", md: "65px", lg: "70px" } // Profile page: only TopHeader
                : { xs: "65px", sm: "70px", md: "107px", lg: "111px" } // Mobile: header only; Desktop: header + navbar bar
          }}
        >
          <AppRoutes />
        </Box>
        {!hideNavbar && <Footer />}
      </Box>

      {/* Floating Scroll to Top Button - Shows on Scroll */}
      {showScrollTop && (
        <Fab
          className="scroll-to-top-fab"
          onClick={handleScrollToTop}
          sx={{
            position: "fixed",
            bottom: { xs: 86, md: 104 },
            right: { xs: 20, md: 30 },
            backgroundColor: "#5F2930",
            color: "#fff",
            width: { xs: 56, md: 64 },
            height: { xs: 56, md: 64 },
            zIndex: 9998,
            boxShadow: "0 4px 20px rgba(95, 41, 48, 0.4)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
            "&:hover": {
              backgroundColor: "#4a1f25",
              transform: "scale(1.1)",
              boxShadow: "0 6px 30px rgba(95, 41, 48, 0.6)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
          aria-label="Scroll to top"
        >
          <KeyboardArrowUp sx={{ fontSize: { xs: 32, md: 36 } }} />
        </Fab>
      )}
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
