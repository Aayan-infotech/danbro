/**
 * Route prefetch map: path -> dynamic import()
 * Calling the import loads the JS chunk so navigation is instant when user clicks.
 */
const prefetchMap = {
  "/": () => import("../layouts/MainLayout"),
  "/home": () => import("../layouts/MainLayout"),
  "/about-us": () => import("../pages/home/AboutUs"),
  "/blog": () => import("../pages/home/Blog"),
  "/blog-details": () => import("../pages/home/BlogDetails"),
  "/contact": () => import("../pages/home/Contact"),
  "/media": () => import("../pages/home/PressandMedia"),
  "/store": () => import("../pages/home/Store"),
  "/career": () => import("../pages/home/Career"),
  "/offers": () => import("../pages/home/Offers"),
  "/events": () => import("../pages/home/CateringEvents"),
  "/products": () => import("../pages/products/ProductList"),
  "/search": () => import("../pages/products/SearchPage"),
  "/privacy-policy": () => import("../pages/home/PrivacyPolicy"),
  "/terms-conditions": () => import("../pages/home/TermsAndConditions"),
  "/refund-returns-policy": () => import("../pages/home/RefundReturnsPolicy"),
  "/shipping-policy": () => import("../pages/home/ShippingPolicy"),
  "/shipping-policies": () => import("../pages/home/ShippingPolicy"),
  "/corporate-queries": () => import("../pages/home/CorporateQueries"),
  "/cart": () => import("../pages/cart/Cart"),
  "/wishlist": () => import("../pages/user/Wishlist"),
  "/track-order": () => import("../pages/order/TrackOrder"),
  "/order-success": () => import("../pages/home/paymentSuccess"),
  "/order-failure": () => import("../pages/home/paymentFailure"),
  "/danbro-fresh-b2b": () => import("../pages/home/DanbroFreshB2B"),
  "/login": () => import("../pages/auth/Login"),
  "/register": () => import("../pages/auth/Register"),
  "/verify-otp": () => import("../pages/auth/VerifyOtp"),
  "/profile": () => import("../pages/user/UserProfile"),
};

const prefetched = new Set();

/**
 * Prefetch a route's JS chunk by path. Safe to call multiple times.
 * @param {string} path - Route pathname (e.g. "/cart", "/blog")
 */
export function prefetchRoute(path) {
  if (!path || typeof path !== "string") return;
  const pathname = path.split("?")[0];
  const segments = pathname.split("/").filter(Boolean);
  const key = pathname === "/" ? "/" : `/${segments.join("/")}`;

  // /products/123 -> ProductDetails chunk
  if (segments[0] === "products" && segments.length > 1) {
    if (prefetched.has("/products/:id")) return;
    prefetched.add("/products/:id");
    import("../pages/products/ProductDetails").catch(() => prefetched.delete("/products/:id"));
    return;
  }

  const fn = prefetchMap[key];
  if (!fn || prefetched.has(key)) return;
  prefetched.add(key);
  fn().catch(() => { prefetched.delete(key); });
}
