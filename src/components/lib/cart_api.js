// utils/cart_api.js
import { apiFetch } from "../../app/(api)/api";

// add a new item to cart
export async function addToCart(itemNo, quantity = 1) {
  return apiFetch("/cart/items/", {
    method: "POST",
    body: JSON.stringify({ menu_item_id: itemNo, quantity }),
  });
}

// update an existing cart item
export async function updateCartItem(cartItemId, quantity) {
  return apiFetch(`/cart/items/${cartItemId}/`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

// remove an item from cart
export async function removeCartItem(cartItemId) {
  return apiFetch(`/cart/items/${cartItemId}/`, { method: "DELETE" });
}
