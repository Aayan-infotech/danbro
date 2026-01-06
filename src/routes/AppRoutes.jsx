import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// Lazy load all route components
// Default exports
const Home = lazy(() => import("../layouts/MainLayout"));
const BlogDetails = lazy(() => import("../pages/home/BlogDetails"));

// Named exports - transform to default for lazy loading
const AboutUs = lazy(() => import("../pages/home/AboutUs").then(module => ({ default: module.AboutUs })));
const Blog = lazy(() => import("../pages/home/Blog").then(module => ({ default: module.Blog })));
const Contact = lazy(() => import("../pages/home/Contact").then(module => ({ default: module.Contact })));
const PressandMedia = lazy(() => import("../pages/home/PressandMedia").then(module => ({ default: module.PressandMedia })));
const Career = lazy(() => import("../pages/home/Career").then(module => ({ default: module.Career })));
const Offers = lazy(() => import("../pages/home/Offers").then(module => ({ default: module.Offers })));
const CateringEvents = lazy(() => import("../pages/home/CateringEvents").then(module => ({ default: module.CateringEvents })));
const Login = lazy(() => import("../pages/auth/Login").then(module => ({ default: module.Login })));
const Register = lazy(() => import("../pages/auth/Register").then(module => ({ default: module.Register })));
const UserProfile = lazy(() => import("../pages/user/UserProfile").then(module => ({ default: module.UserProfile })));
const TrackOrder = lazy(() => import("../pages/orders/TrackOrder").then(module => ({ default: module.TrackOrder })));
const ProductList = lazy(() => import("../pages/products/ProductList").then(module => ({ default: module.ProductList })));
const ProductDetails = lazy(() => import("../pages/products/ProductDetails").then(module => ({ default: module.ProductDetails })));
const Store = lazy(() => import("../pages/home/Store").then(module => ({ default: module.Store })));
const NotFound = lazy(() => import("../pages/NotFound").then(module => ({ default: module.NotFound })));
const Cart = lazy(() => import("../pages/cart/Cart").then(module => ({ default: module.Cart })));
const PrivacyPolicy = lazy(() => import("../pages/home/PrivacyPolicy").then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import("../pages/home/TermsAndConditions").then(module => ({ default: module.TermsAndConditions })));

// Loading fallback component
const LoadingFallback = () => (
    <Box 
        sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            minHeight: "60vh" 
        }}
    >
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
    </Box>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-details" element={<BlogDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/media" element={<PressandMedia />} />
                <Route path="/store" element={<Store />} />
                <Route path="/career" element={<Career />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/events" element={<CateringEvents />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
