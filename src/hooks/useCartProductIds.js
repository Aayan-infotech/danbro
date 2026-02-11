import { useState, useEffect, useCallback } from "react";
import { getCart } from "../utils/cart";

const normalizeWeight = (w) => {
  const s = (w == null ? "" : String(w)).trim();
  return s === "" || s.toLowerCase() === "n/a" ? "" : s;
};

const getItemKey = (productId, weight) => `${String(productId ?? "")}|${normalizeWeight(weight)}`;

/**
 * Returns cart product IDs and quantity-by-key (for product cards: show quantity, update UI).
 * Listens to cartUpdated so UI stays in sync (guest localStorage + logged-in API).
 * @returns {{ cartProductIds: Set<string>, cartQuantityByKey: Map<string, number>, getCartQuantity: function, refreshCartIds: function }}
 */
export function useCartProductIds() {
  const [cartProductIds, setCartProductIds] = useState(new Set());
  const [cartQuantityByKey, setCartQuantityByKey] = useState(new Map());

  const refreshCartIds = useCallback(async () => {
    try {
      const res = await getCart();
      const items = Array.isArray(res?.items) ? res.items : (Array.isArray(res?.data) ? res.data : []);
      const ids = new Set();
      const byKey = new Map();
      items.forEach((item) => {
        const pid = String(item.productId || item._id || "").trim();
        if (!pid) return;
        ids.add(pid);
        const qty = typeof item.quantity === "number" ? item.quantity : parseInt(item.quantity, 10) || 1;
        const weight = item.weight ?? item.rawWeight ?? "";
        byKey.set(getItemKey(pid, weight), qty);
      });
      setCartProductIds(ids);
      setCartQuantityByKey(byKey);
    } catch {
      setCartProductIds(new Set());
      setCartQuantityByKey(new Map());
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

  const getCartQuantity = useCallback((productId, weight) => {
    const key = getItemKey(productId, weight);
    return cartQuantityByKey.get(key) ?? 0;
  }, [cartQuantityByKey]);

  return { cartProductIds, cartQuantityByKey, getCartQuantity, refreshCartIds };
}
