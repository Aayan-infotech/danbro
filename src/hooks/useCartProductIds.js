import { useState, useEffect, useCallback } from "react";
import { getCart } from "../utils/cart";

/**
 * Returns a Set of product IDs currently in the cart.
 * Listens to cartUpdated so UI can show "Go to Cart" when product is in cart.
 * @returns {{ cartProductIds: Set<string>, refreshCartIds: function }}
 */
export function useCartProductIds() {
  const [cartProductIds, setCartProductIds] = useState(new Set());

  const refreshCartIds = useCallback(async () => {
    try {
      const res = await getCart();
      const items = Array.isArray(res?.items) ? res.items : (Array.isArray(res?.data) ? res.data : []);
      const ids = new Set(items.map((item) => String(item.productId || item._id || "")).filter(Boolean));
      setCartProductIds(ids);
    } catch {
      setCartProductIds(new Set());
    }
  }, []);

  useEffect(() => {
    refreshCartIds();
  }, [refreshCartIds]);

  useEffect(() => {
    const handler = () => refreshCartIds();
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [refreshCartIds]);

  return { cartProductIds, refreshCartIds };
}
