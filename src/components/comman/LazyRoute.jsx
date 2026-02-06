import { lazy, Suspense, ComponentType } from "react";
import { Box, CircularProgress } from "@mui/material";

/**
 * Loading fallback - full height, soft so transition feels smooth
 */
const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      opacity: 0.96,
      transition: "opacity 0.2s ease",
    }}
  >
    <CircularProgress size={44} sx={{ color: "var(--themeColor)" }} />
  </Box>
);

/**
 * LazyRoute Component
 * Wraps a lazy-loaded component with Suspense and loading fallback
 * 
 * @param {Object} props
 * @param {ComponentType} props.component - The lazy-loaded component
 * @param {React.ReactNode} props.fallback - Optional custom loading fallback
 * @returns {JSX.Element}
 */
export const LazyRoute = ({ 
  component: Component, 
  fallback = <LoadingFallback /> 
}) => {
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

