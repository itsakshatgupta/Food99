'use client';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { cart } from "../dummy_data";
import { addToCart, removeCartItem, updateCartItem } from "./cart_api";

'use client';
import { useEffect, useState } from "react";
import { addToCart, updateCartItem, removeCartItem } from "./cart_api";

export function Cart_Control_Direct({ item }) {
  const [cartQuantity, setCartQuantity] = useState(item.quantity || "ADD");
  const [cartItemId, setCartItemId] = useState(item.cart_item_id || null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (cartQuantity === "ADD") {
      // first time adding to cart
      setLoading(true);
      const response = await addToCart(item.id, 1);
      const data = await response.json();
      setCartItemId(data.id); // store CartItem ID for future updates
      setCartQuantity(1);
      setLoading(false);
    } else {
      // increase quantity
      const newQty = cartQuantity + 1;
      setCartQuantity(newQty);
      if (cartItemId) {
        await updateCartItem(cartItemId, newQty);
      }
    }
  };

  const handleRemove = async () => {
    if (cartQuantity > 1) {
      const newQty = cartQuantity - 1;
      setCartQuantity(newQty);
      if (cartItemId) {
        await updateCartItem(cartItemId, newQty);
      }
    } else {
      // remove completely
      if (cartItemId) {
        await removeCartItem(cartItemId);
      }
      setCartQuantity("ADD");
      setCartItemId(null);
    }
  };

  return (
    <div className="add_cart_control oh font09 font900" style={{ width: "100px", height: '30px' }}>
      <span className="df aic fx1 tac jcc CKEFT"
        onClickCapture={handleRemove}
        style={{ cursor: 'pointer' }}
      >
        {/* Minus Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a">
          <path d="M200-440v-80h560v80H200Z" />
        </svg>
      </span>

      <span className="fx1 tac" style={{ alignContent: 'center' }}>
        {loading ? "..." : cartQuantity}
      </span>

      <span className="df aic fx1 tac jcc CKEFT"
        onClickCapture={handleAdd}
        style={{ cursor: 'pointer' }}
      >
        {/* Plus Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </span>
    </div>
  );
}







export function Cart_Control_Indirect({ item }) {

    const [cart_quantity_indirect, set_cart_quantity_indirect] = useState("ADD");
    const [CartItem_id, set_CartItem_id] = useState(null);

    const handleAdd = async () => {
        if (cart_quantity_indirect === "ADD") {
            // first add to cart
            const response = await addToCart(item.id, 1); // menu_item.id
            if (response.ok) {
                let r = await response.json()
                console.log('r', r)
                console.log(123, response, response.json())
                set_CartItem_id(r.id); // store cartItem.id
                set_cart_quantity_indirect(1);
            }
        } else {
            // update existing
            const newQty = cart_quantity_indirect + 1;
            const response = await updateCartItem(CartItem_id, newQty);
            if (response.ok) {
                set_cart_quantity_indirect(newQty);
            }
        }
    };

    const handleRemove = async () => {
        if (cart_quantity_indirect > 1) {
            const newQty = cart_quantity_indirect - 1;
            const response = await updateCartItem(CartItem_id, newQty);
            if (response.ok) {
                set_cart_quantity_indirect(newQty);
            }
            set_cart_quantity_indirect(newQty);
        } else {
            await removeCartItem(CartItem_id);
            set_cart_quantity_indirect("ADD");
            set_CartItem_id(null);
        }
    };

    return (<>
        <div className="pA add_cart_control oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  "
            onClickCapture={handleRemove}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{cart_quantity_indirect}</span><span className="df aic fx1 tac jcc CKEFT "
            onClickCapture={handleAdd}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}