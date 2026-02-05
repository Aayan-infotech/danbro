import { useState, useEffect, useMemo } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { addToRecentlyViewed, fetchProducts, fetchProductById } from "../../utils/apiService";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useHomeLayout } from "../../hooks/useHomeLayout";
import { addToCart } from "../../utils/cart";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../../utils/wishlist";
import { getStoredLocation } from "../../utils/location";
import blankImage from "../../assets/blankimage.png";
import {
  ProductDetailsLoading,
  ProductDetailsError,
  ProductDetailsBreadcrumbs,
  ProductDetailsImageGallery,
  ProductDetailsInfo,
  ProductDetailsFeatures,
  ProductDetailsIngredientsNutrition,
  ProductDetailsReviews,
} from "./components";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productWeight, setProductWeight] = useState("500g");
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);
  const [cakeMessage, setCakeMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [deliveryLocationLabel, setDeliveryLocationLabel] = useState("");
  const [hasSavedLocation, setHasSavedLocation] = useState(false);

  const { categories: apiCategories } = useItemCategories();
  const { products: homeLayoutProducts } = useHomeLayout();

  // On mount, determine if we already have a stored delivery location
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userLocation");
      if (stored) {
        const parsed = JSON.parse(stored);
        setHasSavedLocation(true);
        setDeliveryLocationLabel(parsed.label || "Saved delivery location");
      } else {
        setHasSavedLocation(false);
        setDeliveryLocationLabel("");
      }
    } catch {
      setHasSavedLocation(false);
      setDeliveryLocationLabel("");
    }
  }, []);

  // Update delivery label when location is changed anywhere in the app
  useEffect(() => {
    const handleLocationUpdated = (event) => {
      const detail = event.detail || {};
      const label = detail.label || getStoredLocation().label || "Saved delivery location";
      setHasSavedLocation(true);
      setDeliveryLocationLabel(label);
    };

    window.addEventListener("locationUpdated", handleLocationUpdated);
    return () => {
      window.removeEventListener("locationUpdated", handleLocationUpdated);
    };
  }, []);

  useEffect(() => {
    if (!id) return;
    setQuantity(1);
    setSelectedImage(0);
    setProductWeight("500g");
    setCartMessage(null);
    setCakeMessage("");
  }, [id]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          setError("Product ID not found");
          setLoading(false);
          return;
        }
        const productId = id;
        const markRecentlyViewed = async () => {
          try {
            await addToRecentlyViewed(productId);
          } catch {
            // ignore (guest user / token missing / API failure)
          }
        };

        // OPTIMIZATION 1: Use direct API endpoint to get product by ID (fastest)
        try {
          const response = await fetchProductById(productId);
          const data = response?.data;
          const hasValidProduct = data && typeof data === "object" && !Array.isArray(data) && (data.productId || data._id || data.name);
          if (response?.success && hasValidProduct) {
            setProduct(data);
            setProductWeight(data.weight || "500g");
            markRecentlyViewed();
            setLoading(false);
            return;
          }
          if (response?.success === false && response?.message) {
            setError(response.message);
            setLoading(false);
            return;
          }
          if (response?.success && !hasValidProduct && response?.message) {
            setError(response.message);
            setLoading(false);
            return;
          }
          if (hasValidProduct) {
            setProduct(data);
            setProductWeight(data.weight || "500g");
            markRecentlyViewed();
            setLoading(false);
            return;
          }
        } catch (err) {
          const apiMessage = err.response?.data?.message;
          const isLocationError = err.response?.status === 400 && apiMessage;
          if (isLocationError) {
            setError(apiMessage);
            setLoading(false);
            return;
          }
          console.log('Direct product fetch failed, trying fallback methods...', err);
        }

        // FALLBACK 1: Check homeLayout products data (already loaded)
        if (homeLayoutProducts && homeLayoutProducts.length > 0) {
          for (const categoryData of homeLayoutProducts) {
            if (categoryData.products && Array.isArray(categoryData.products)) {
              const foundProduct = categoryData.products.find(p =>
                p.productId === productId ||
                p._id === productId ||
                p.id === productId
              );
              if (foundProduct) {
                try {
                  const response = await fetchProductById(productId);
                  if (response?.success && response?.data) {
                    setProduct(response.data);
                    setProductWeight(response.data.weight || "500g");
                    markRecentlyViewed();
                    setLoading(false);
                    return;
                  }
                } catch (err) {
                  setProduct(foundProduct);
                  setProductWeight(foundProduct.weight || "500g");
                  markRecentlyViewed();
                  setLoading(false);
                  return;
                }
              }
            }
          }
        }

        // FALLBACK 2: Search without category filter
        let lastApiMessage = null;
        try {
          const response = await fetchProducts(null, 1, 100, productId);
          if (response?.success && response?.data && Array.isArray(response.data)) {
            const foundProduct = response.data.find(p =>
              p._id === productId ||
              p.productId === productId ||
              p.id === productId ||
              p.productId?.toString() === productId ||
              p._id?.toString() === productId
            );
            if (foundProduct) {
              setProduct(foundProduct);
              setProductWeight(foundProduct.weight || "500g");
              markRecentlyViewed();
              setLoading(false);
              return;
            }
            if (response?.message) lastApiMessage = response.message;
          } else if (response?.message) {
            lastApiMessage = response.message;
          }
        } catch (err) {
          if (err.response?.data?.message) lastApiMessage = err.response.data.message;
          console.log('Search without category failed');
        }
        console.log(lastApiMessage, 'lastApiMessage');
        setError(lastApiMessage?.message);
      } catch (err) {
        console.error('Error loading product:', err);
        const apiMessage = err.response?.data?.message;
        setError(apiMessage || err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    // Load product immediately when id is available
    if (id) {
      loadProduct();
    }
  }, [id, apiCategories, homeLayoutProducts]);

  const productIdForWishlist = product?._id || product?.productId || product?.id || id;

  useEffect(() => {
    if (!productIdForWishlist) return;
    let cancelled = false;
    isInWishlist(productIdForWishlist).then((inList) => {
      if (!cancelled) setInWishlist(!!inList);
    });
    return () => { cancelled = true; };
  }, [productIdForWishlist]);

  useEffect(() => {
    const handleWishlistUpdated = () => {
      if (productIdForWishlist) {
        isInWishlist(productIdForWishlist).then(setInWishlist);
      }
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdated);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdated);
  }, [productIdForWishlist]);

  const handleWishlistToggle = async () => {
    if (!productIdForWishlist || wishlistLoading) return;
    setWishlistLoading(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(productIdForWishlist);
        setInWishlist(false);
      } else {
        await addToWishlist(productIdForWishlist);
        setInWishlist(true);
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      setAddingToCart(true);
      setCartMessage(null);
      const productId = product._id || product.productId || product.id || product.prdcode?.toString();
      if (!productId) {
        throw new Error("Product ID not found");
      }
      const options = productData ? { weight: productWeight, productSnapshot: { name: productData?.name, price: product?.price, images: product?.images, weight: productWeight } } : {};
      const response = await addToCart(productId, quantity, options);

      setCartMessage({
        type: "success",
        text: response?.message || "Item added to cart successfully!"
      });

      // Dispatch event to update cart count in header
      window.dispatchEvent(new CustomEvent('cartUpdated'));

      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      setCartMessage({
        type: "error",
        text: error.response?.data?.message || error.message || "Failed to add item to cart"
      });
      setTimeout(() => setCartMessage(null), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  // Transform product data for display
  const productData = useMemo(() => {
    if (!product) return null;

    const priceObj = product.price && product.price.length > 0 ? product.price[0] : { rate: 0, mrp: 0 };
    const displayPrice = priceObj.rate || priceObj.mrp || 0;

    // Transform nutrition array to object
    const nutritionObj = {};
    if (product.nutrition && Array.isArray(product.nutrition)) {
      product.nutrition.forEach(item => {
        const key = Object.keys(item)[0];
        const value = item[key];
        nutritionObj[key] = value;
      });
    }

    let images = [];

    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      images = product.images.map(img => img.url || blankImage);
    } else {
      images = [blankImage, blankImage, blankImage, blankImage];
    }

    return {
      name: product.name || "Product",
      description: product.ingredient || product.name || "",
      price: `₹${displayPrice}`,
      weight: product.weight || "500g",
      images: images,
      nutrition: nutritionObj,
      ingredient: product.ingredient || "",
    };
  }, [product]);

  const weightOptions = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.weightOptions) && product.weightOptions.length > 0) {
      return product.weightOptions;
    }

    if (typeof product.weight === "string" && product.weight.trim()) {
      return [product.weight.trim()];
    }

    return [];
  }, [product]);

  if (loading) return <ProductDetailsLoading />;
  if (error || !productData) return <ProductDetailsError error={error} />;

  return (
    <Box sx={{ overflowX: "hidden", maxWidth: "100%" }}>
      <Container maxWidth="lg" sx={{ pb: { xs: 4, sm: 5, md: 6 }, p: { xs: 1.5, sm: 2, md: 3 }, maxWidth: "100%" }}>
        <ProductDetailsBreadcrumbs
          product={product}
          productData={productData}
          apiCategories={apiCategories}
          onNavigate={navigate}
        />
        <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} sx={{ alignItems: "stretch", maxWidth: "100%" }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: { md: "flex" }, minWidth: 0 }}>
            <ProductDetailsImageGallery
              productData={productData}
              product={product}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
            <ProductDetailsInfo
              productData={productData}
              weightOptions={weightOptions}
              productWeight={productWeight}
              onWeightChange={setProductWeight}
              cakeMessage={cakeMessage}
              onCakeMessageChange={setCakeMessage}
              hasSavedLocation={hasSavedLocation}
              deliveryLocationLabel={deliveryLocationLabel}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              addingToCart={addingToCart}
              product={product}
              cartMessage={cartMessage}
              onDismissCartMessage={() => setCartMessage(null)}
              inWishlist={inWishlist}
              wishlistLoading={wishlistLoading}
              onWishlistToggle={handleWishlistToggle}
            />
          </Grid>
        </Grid>
      </Container>
      <ProductDetailsFeatures />
      <ProductDetailsIngredientsNutrition
        productData={productData}
        product={product}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
      <ProductDetailsReviews />
    </Box>
  );
};

