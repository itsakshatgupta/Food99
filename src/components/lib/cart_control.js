'use client';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { cart } from "../dummy_data";
import { addToCart, removeCartItem, updateCartItem } from "./cart_api";

export function Cart_Control_Direct({ item }) {

    const [cart_quantity_direct, set_cart_quantity_direct] = useState(item.quantity);

    const handleAdd = async () => {
        if (cart_quantity_direct >= 1) {
            try {
                // update existing
                const newQty = cart_quantity_direct + 1;
                set_cart_quantity_direct(newQty);
                await updateCartItem(item.id, newQty);
            } catch (err) {
                set_cart_quantity_direct(11);
            }
        }
    };

    const handleRemove = async () => {
        if (cart_quantity_direct > 1) {
            try {
                const newQty = cart_quantity_direct - 1;
                set_cart_quantity_direct(newQty);
                await updateCartItem(item.id, newQty);
            } catch (err) {
                set_cart_quantity_direct(11);
            }
        } else {
            try {
                await removeCartItem(item.id);
                document.getElementById(item.id).remove()
                if (document.getElementById('product-container').hasChildNodes() === false) {
                    return window.location.href = "/"
                }
            } catch (err) {
                console.log('hi error', err)
            }
        }
    }

return (<>
    <div className="add_cart_control oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  "

        onClickCapture={handleRemove}

    ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{cart_quantity_direct}</span><span className="df aic fx1 tac jcc CKEFT "
        onClickCapture={handleAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
</>)
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