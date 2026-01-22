import { Routes, Route } from "react-router-dom";
import { LazyRoute } from "../components/comman/LazyRoute";
import { ProtectedRoute } from "../components/comman/ProtectedRoute";
import { publicRoutes, authRoutes, privateRoutes, notFoundRoute } from "./routeConfig";

/**
 * Helper function to render routes
 */
const renderRoutes = (routes, isPrivate = false) => {
  return routes.map((routeConfig, index) => {
    const { path, component: Component, ...rest } = routeConfig;
    
    const routeElement = <LazyRoute component={Component} />;
    const finalElement = isPrivate ? (
      <ProtectedRoute>{routeElement}</ProtectedRoute>
    ) : routeElement;

    return (
      <Route
        key={`${path}-${index}`}
        path={path}
        element={finalElement}
        {...rest}
      />
    );
  });
};

/**
 * AppRoutes Component
 * Main routing component that uses route configuration
 * Automatically handles public, auth, and private routes
 */
const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes - No authentication required */}
            {renderRoutes(publicRoutes, false)}
            
            {/* Auth Routes - Login, Register, etc. */}
            {renderRoutes(authRoutes, false)}
            
            {/* Private Routes - Require authentication (ProtectedRoute applied automatically) */}
            {renderRoutes(privateRoutes, true)}
            
            {/* 404 Route */}
            <Route 
                path={notFoundRoute.path} 
                element={<LazyRoute component={notFoundRoute.component} />} 
            />
        </Routes>
    );
};

export default AppRoutes;
