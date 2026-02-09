import { Box, Skeleton } from "@mui/material";

const skeletonTheme = { bgcolor: "grey.200" };

/**
 * Generic full-page skeleton for lazy route fallback (reduces layout shift)
 */
export const PageSkeleton = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      p: { xs: 2, md: 3 },
    }}
  >
    <Skeleton variant="rectangular" height={56} sx={{ maxWidth: 320, mb: 3, ...skeletonTheme }} />
    <Skeleton variant="rectangular" height={120} sx={{ mb: 2, ...skeletonTheme }} />
    <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant="rounded" width={80} height={36} sx={skeletonTheme} />
      ))}
    </Box>
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 2 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </Box>
  </Box>
);

/**
 * Single product card skeleton (matches ProductGrid card layout)
 */
export const ProductCardSkeleton = () => (
  <Box sx={{ borderRadius: 2, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
    <Skeleton variant="rectangular" height={{ xs: 160, sm: 180, md: 200 }} sx={skeletonTheme} />
    <Box sx={{ p: 2 }}>
      <Skeleton width="80%" height={22} sx={{ mb: 1, ...skeletonTheme }} />
      <Skeleton width="50%" height={20} sx={{ mb: 1, ...skeletonTheme }} />
      <Skeleton width="40%" height={28} sx={skeletonTheme} />
    </Box>
  </Box>
);

/**
 * Grid of product card skeletons for ProductList / Search
 */
export const ProductListSkeleton = ({ count = 8 }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      },
      gap: { xs: 1.5, md: 2 },
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </Box>
);

/**
 * Home page skeleton: hero + category strip + product sections
 */
export const HomePageSkeleton = () => (
  <Box sx={{ width: "100%", maxWidth: "100%" }}>
    <Skeleton variant="rectangular" height={{ xs: 320, md: 420 }} sx={{ width: "100%", ...skeletonTheme }} />
    <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      <Box sx={{ display: "flex", gap: 1, overflow: "hidden", mb: 3 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" width={100} height={100} sx={{ flexShrink: 0, ...skeletonTheme }} />
        ))}
      </Box>
      <Skeleton width={180} height={32} sx={{ mb: 2, ...skeletonTheme }} />
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </Box>
      <Skeleton width={200} height={32} sx={{ mb: 2, ...skeletonTheme }} />
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {[1, 2, 3, 4].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </Box>
    </Box>
  </Box>
);

/**
 * Product details page skeleton (image gallery + info block)
 */
export const ProductDetailsSkeleton = () => (
  <Box sx={{ maxWidth: "100%", p: { xs: 1.5, md: 3 } }}>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
      <Box sx={{ flex: { md: "0 0 50%" } }}>
        <Skeleton variant="rectangular" height={{ xs: 280, md: 400 }} sx={{ borderRadius: 2, ...skeletonTheme }} />
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rounded" width={64} height={64} sx={skeletonTheme} />
          ))}
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Skeleton width="70%" height={36} sx={{ mb: 2, ...skeletonTheme }} />
        <Skeleton width="30%" height={28} sx={{ mb: 2, ...skeletonTheme }} />
        <Skeleton width="100%" height={60} sx={{ mb: 2, ...skeletonTheme }} />
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Skeleton variant="rounded" width={48} height={48} sx={skeletonTheme} />
          <Skeleton variant="rounded" width={120} height={48} sx={skeletonTheme} />
        </Box>
        <Skeleton width="100%" height={44} sx={skeletonTheme} />
      </Box>
    </Box>
    <Box sx={{ mt: 4 }}>
      <Skeleton width={140} height={32} sx={{ mb: 2, ...skeletonTheme }} />
      <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1, ...skeletonTheme }} />
    </Box>
  </Box>
);

/**
 * Single review row skeleton
 */
export const ReviewCardSkeleton = () => (
  <Box sx={{ display: "flex", gap: 2, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
    <Skeleton variant="circular" width={48} height={48} sx={skeletonTheme} />
    <Box sx={{ flex: 1 }}>
      <Skeleton width="40%" height={22} sx={{ mb: 1, ...skeletonTheme }} />
      <Skeleton width="20%" height={20} sx={{ mb: 1, ...skeletonTheme }} />
      <Skeleton width="100%" height={18} sx={{ mb: 0.5, ...skeletonTheme }} />
      <Skeleton width="90%" height={18} sx={skeletonTheme} />
    </Box>
  </Box>
);

/**
 * List of review skeletons (ProductDetailsReviews / AllReviews)
 */
export const ReviewsListSkeleton = ({ count = 5 }) => (
  <Box>
    {Array.from({ length: count }).map((_, i) => (
      <ReviewCardSkeleton key={i} />
    ))}
  </Box>
);

/**
 * Wishlist grid skeleton
 */
export const WishlistSkeleton = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      },
      gap: 2,
      p: 2,
    }}
  >
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Box key={i} sx={{ borderRadius: 2, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <Skeleton variant="rectangular" height={190} sx={skeletonTheme} />
        <Box sx={{ p: 2 }}>
          <Skeleton width="90%" height={22} sx={{ mb: 1, ...skeletonTheme }} />
          <Skeleton width="50%" height={20} sx={skeletonTheme} />
        </Box>
      </Box>
    ))}
  </Box>
);

/**
 * Profile sidebar skeleton (avatar + name + menu)
 */
export const ProfileSidebarSkeleton = () => (
  <Box sx={{ p: 2 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
      <Skeleton variant="circular" width={80} height={80} sx={{ mb: 1.5, ...skeletonTheme }} />
      <Skeleton width={120} height={24} sx={skeletonTheme} />
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} variant="rounded" height={44} sx={skeletonTheme} />
      ))}
    </Box>
  </Box>
);

/**
 * Saved addresses list skeleton
 */
export const AddressesListSkeleton = ({ count = 3 }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <Box key={i} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2 }}>
        <Skeleton width="30%" height={22} sx={{ mb: 1, ...skeletonTheme }} />
        <Skeleton width="90%" height={18} sx={{ mb: 0.5, ...skeletonTheme }} />
        <Skeleton width="70%" height={18} sx={skeletonTheme} />
      </Box>
    ))}
  </Box>
);

/**
 * Categories + products page skeleton (ProductList initial load)
 */
export const ProductListPageSkeleton = () => (
  <Box sx={{ minHeight: "100vh", py: 3, px: { xs: 2, md: 3 } }}>
    <Skeleton width={200} height={40} sx={{ mb: 2, ...skeletonTheme }} />
    <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
      <Skeleton variant="rounded" width={120} height={40} sx={skeletonTheme} />
      <Skeleton variant="rounded" width={100} height={40} sx={skeletonTheme} />
      <Skeleton variant="rounded" width={160} height={40} sx={skeletonTheme} />
    </Box>
    <ProductListSkeleton count={8} />
  </Box>
);
