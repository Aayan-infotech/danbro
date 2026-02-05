import { Box, Breadcrumbs, Link } from "@mui/material";
import { CustomText } from "../../../components/comman/CustomText";

export const ProductDetailsBreadcrumbs = ({ product, productData, apiCategories, onNavigate }) => (
  <Breadcrumbs sx={{ mb: { xs: 2, sm: 3, md: 4 }, overflow: "hidden", textOverflow: "ellipsis" }}>
    <Link
      component="button"
      variant="body1"
      onClick={() => onNavigate("/")}
      sx={{
        color: "#666",
        textDecoration: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: { xs: 12, sm: 14 },
        fontWeight: 400,
        "&:hover": { color: "#FF9472" },
      }}
    >
      Home
    </Link>
    <Link
      component="button"
      variant="body1"
      onClick={() => onNavigate(product?.categoryid != null ? `/products?categoryId=${product.categoryid}` : "/products")}
      sx={{
        color: "#666",
        textDecoration: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: { xs: 12, sm: 14 },
        fontWeight: 400,
        "&:hover": { color: "#FF9472" },
      }}
    >
      {apiCategories?.find((c) => c.id === product?.categoryid || c.id === parseInt(product?.categoryid, 10))?.groupname || product?.subcategory || "Products"}
    </Link>
    <CustomText color="text.primary" autoTitleCase sx={{ fontFamily: "'Inter', sans-serif", fontSize: { xs: 12, sm: 14 }, fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: { xs: 120, sm: 200 } }}>
      {productData?.name}
    </CustomText>
  </Breadcrumbs>
);
