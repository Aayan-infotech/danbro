# Guest Mode – Cart / Wishlist & Checkout

## Overview

- **Guest cart** and **guest wishlist** are stored in **LocalStorage** and **Redux** (frontend only).
- Guest can add/remove/update cart and wishlist without login.
- At **checkout**, guest is asked to **login**. After login, guest cart can be merged with the user’s cart via API (if backend supports it).

---

## 1. Guest cart (LocalStorage + Redux)

- **Keys:** `danbro_guest_cart`, `danbro_guest_wishlist`
- **Guest cart item shape (frontend):**
  - `productId` (string)
  - `quantity` (number)
  - `weight` (string, optional, e.g. `"500g"`)
  - `productSnapshot` (object, optional – name, price, images for display)

---

## 2. When guest clicks “Proceed to Checkout”

- User is redirected to **Login** with state: `{ from: "cart", returnUrl: "/cart" }`.
- After login, app can redirect back to `/cart` or `/checkout`.

---

## 3. Payload to send after login (merge guest cart)

If backend has a **merge guest cart** endpoint, send the **guest cart** from Redux/LocalStorage in the payload.

### Example: Merge guest cart (after login)

**Assumption:** Backend exposes something like `POST /api/cart/merge` (or similar) that accepts an array of guest items and adds them to the logged-in user’s cart.

**Request (curl):**

```bash
curl -X POST 'http://34.206.193.218:5656/api/cart/merge' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'lat: 26.86957' \
  -H 'long: 81.00935' \
  -d '{
    "items": [
      {
        "productId": "PRODUCT_ID_1",
        "quantity": 2,
        "weight": "500g"
      },
      {
        "productId": "PRODUCT_ID_2",
        "quantity": 1,
        "weight": "1kg"
      }
    ]
  }'
```

**Payload (guest cart merge):**

| Field     | Type   | Description                    |
|----------|--------|--------------------------------|
| `items`  | array  | List of guest cart line items  |
| `items[].productId` | string | Product ID   |
| `items[].quantity`  | number | Quantity     |
| `items[].weight`    | string | Optional (e.g. "500g", "1kg") |

If your backend uses a different endpoint (e.g. multiple `POST /cart/add` calls), the **same payload fields** (`productId`, `quantity`, `weight`) can be used for each add.

---

## 4. Checkout / payment (logged-in user)

After guest has logged in and cart is merged (or user had already added items while logged in), **checkout/payment** uses the **logged-in user’s cart** from the backend (e.g. `GET /cart/get`). No “guest payload” is sent at payment; payment APIs use **Bearer token + normal cart APIs**.

**Example – Get cart before payment:**

```bash
curl -X GET 'http://34.206.193.218:5656/api/cart/get' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'lat: 26.86957' \
  -H 'long: 81.00935'
```

**Example – Create order / payment (placeholder):**

```bash
curl -X POST 'http://34.206.193.218:5656/api/order/create' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'lat: 26.86957' \
  -H 'long: 81.00935' \
  -d '{
    "addressId": "ADDRESS_ID",
    "paymentMethod": "ONLINE",
    "couponCode": ""
  }'
```

(Replace endpoint and body with your actual order/payment API.)

---

## 5. Summary

| Step              | Who    | What happens                                                                 |
|-------------------|--------|-------------------------------------------------------------------------------|
| Add to cart       | Guest  | Stored in LocalStorage + Redux only (no API).                                |
| Add to wishlist   | Guest  | Stored in LocalStorage + Redux only (no API).                                |
| View cart/wishlist| Guest  | Read from Redux/LocalStorage.                                                |
| Proceed to checkout | Guest | Redirect to Login with `returnUrl`; no payment API called.                   |
| After login       | User   | Optional: call **merge guest cart** API with payload above.                  |
| Payment           | User   | Normal checkout APIs with `Authorization: Bearer <token>` and cart from API. |

If your backend does **not** have a merge endpoint, you can:

- After login, call **add-to-cart** once per guest cart item using the same `productId`, `quantity`, and `weight` from the guest cart payload above.
