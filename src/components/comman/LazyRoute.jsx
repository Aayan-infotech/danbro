import { lazy, Suspense, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  PageSkeleton,
  HomePageSkeleton,
  ProductListPageSkeleton,
  ProductDetailsSkeleton,
} from "./Skeletons";

/**
 * Pick route-specific skeleton so lazy chunk loading matches page layout (feels smoother)
 */
const getRouteFallback = (pathname) => {
  if (pathname === "/" || pathname === "/home") return HomePageSkeleton;
  if (pathname === "/products") return ProductListPageSkeleton;
  if (/^\/products\/[^/]+$/.test(pathname)) return ProductDetailsSkeleton;
  return PageSkeleton;
};

/**
 * LazyRoute Component
 * Wraps a lazy-loaded component with Suspense and loading fallback
 * 
 * @param {Object} props
 * @param {ComponentType} props.component - The lazy-loaded component
 * @param {React.ReactNode} props.fallback - Optional custom loading fallback
 * @returns {JSX.Element}
 */
export const LazyRoute = ({ component: Component, fallback: customFallback }) => {
  const { pathname } = useLocation();
  const hasDispatchedRef = useRef(false);

  const FallbackComponent = useMemo(() => getRouteFallback(pathname), [pathname]);
  const fallback = customFallback ?? <FallbackComponent />;

  useEffect(() => {
    // Only dispatch appReady once, and only if not home page (home page handles it itself)
    if (!hasDispatchedRef.current && !window.__appReadyDispatched) {
      const isHomePage = pathname === "/" || pathname === "/home";

      // For non-home pages, dispatch immediately on mount
      // Home page will dispatch when data loads
      if (!isHomePage) {
        window.__appReadyDispatched = true;
        hasDispatchedRef.current = true;
        window.dispatchEvent(new CustomEvent("appReady"));
      }
    }
  }, [pathname]);

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

/**
 * Helper function to create lazy-loaded components
 * Handles both default and named exports
 * 
 * @param {Function} importFn - The import function for lazy loading
 * @param {string} exportName - Optional named export name (if not default)
 * @returns {LazyExoticComponent}
 */
export const createLazyComponent = (importFn, exportName = null) => {
  if (exportName) {
    return lazy(() => importFn().then(module => ({ default: module[exportName] })));
  }
  return lazy(importFn);
};

export default LazyRoute;

