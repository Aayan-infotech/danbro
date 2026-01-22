import { Fragment } from "react";
import { Route } from "react-router-dom";
import { LazyRoute } from "../components/comman/LazyRoute";
import { ProtectedRoute } from "../components/comman/ProtectedRoute";

/**
 * RouteRenderer Component
 * Renders routes based on their configuration
 * Automatically applies ProtectedRoute for private routes
 * 
 * @param {Object} props
 * @param {Array} props.routes - Array of route configurations
 * @param {boolean} props.isPrivate - Whether routes require authentication
 * @returns {JSX.Element}
 */
export const RouteRenderer = ({ routes, isPrivate = false }) => {
  return (
    <Fragment>
      {routes.map((routeConfig, index) => {
        const { path, component: Component, ...rest } = routeConfig;
        
        const routeElement = (
          <LazyRoute component={Component} />
        );

        return (
          <Route
            key={`${path}-${index}`}
            path={path}
            element={isPrivate ? <ProtectedRoute>{routeElement}</ProtectedRoute> : routeElement}
            {...rest}
          />
        );
      })}
    </Fragment>
  );
};

export default RouteRenderer;

