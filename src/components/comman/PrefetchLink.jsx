import { Link, useResolvedPath } from "react-router-dom";
import { prefetchRoute } from "../../utils/routePrefetch";

/**
 * Link that prefetches the route's JS chunk on hover so navigation feels instant.
 * Use for internal nav links (header, footer, etc).
 */
export const PrefetchLink = ({ to, onMouseEnter, ...props }) => {
  const resolved = useResolvedPath(to);
  const path = resolved.pathname;

  const handleMouseEnter = (e) => {
    prefetchRoute(path);
    onMouseEnter?.(e);
  };

  return <Link to={to} onMouseEnter={handleMouseEnter} {...props} />;
};

export default PrefetchLink;
