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

### 4.1 Get cart before payment

```bash
curl -X GET 'http://34.206.193.218:5656/api/cart/get' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'lat: 26.86957' \
  -H 'long: 81.00935'
```

### 4.2 Initiate order (final APIs)

#### (A) Order for SELF – use saved address

```bash
curl -X POST 'http://34.206.193.218:5656/api/order/initiate' \
  -H 'lat: 26.8467' \
  -H 'long: 80.9462' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -d '{
    "orderFor": "SELF",
    "addressId": "69731cb93a9e6dde905ecf60",
    "paymentMode": "UPI",
    "instructions": "Leave order at the door"
  }'
```

#### (B) Order for OTHER – custom delivery address (e.g. guest flow after login)

```bash
curl -X POST 'http://localhost:5656/api/order/initiate' \
  -H 'lat: 26.8467' \
  -H 'long: 80.9462' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -d '{
    "orderFor": "OTHER",
    "deliveryAddress": {
      "name": "Amit Sharma",
      "phone": "9876543210",
      "houseNumber": "12A",
      "streetName": "MG Road",
      "area": "Gomti Nagar",
      "landmark": "Near Metro Station",
      "city": "Lucknow",
      "state": "Uttar Pradesh",
      "zipCode": "226010",
      "coordinates": {
        "lat": 26.8467,
        "long": 80.9462
      }
    },
    "paymentMode": "UPI",
    "instructions": "Call before delivery"
  }'
```

> Note: **Guest mode** is only frontend (LocalStorage + Redux).  
> At payment time, user **must be logged in** and a valid `Authorization: Bearer <ACCESS_TOKEN>` header is always required. The payload is the same for both guest-converted users and normal logged‑in users.

### 4.3 Verify order payment

After `/order/initiate` returns an `orderId`, verify payment with:

```bash
curl -X POST 'http://localhost:5656/api/order/verify/<ORDER_ID>' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

Frontend helper `verifyOrderPayment(orderId)` now calls:

- `POST /api/order/verify/:orderId` (path param, no body)
- With headers: `Content-Type`, `Accept`, `Authorization: Bearer <token>`

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
