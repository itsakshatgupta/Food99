'use client';
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { cart } from "../dummy_data";
import { addToCart, removeCartItem, updateCartItem } from "./cart_api";
import { apiFetch } from "@/app/(api)/api";
import { cartprice } from "@/app/(main)/cart/page";

export function Cart_Control_Direct({ item }) {

    const { set_total_amount__i, updatecartprice } = useContext(cartprice);
    const [cart_quantity_direct, set_cart_quantity_direct] = useState(item.quantity);
    const [timer, set_timer] = useState(null);

    
    // async function updatecartprice() {
    //     try {
    //         const res2 = await apiFetch("/cart/items/mycart/"); // Django cart API
    //         const data2 = await res2.json();
    //         console.log('mycart', data2)
    //         set_total_amount__i(data2)
    //     } catch (error) {
    //         console.error("Error fetching cart:", error);
    //     }
    // }
    
    const handleAdd = () => {
        if (cart_quantity_direct >= 1) {
            // update existing
            const newQty = cart_quantity_direct + 1;
            set_cart_quantity_direct(newQty);
            if (timer) clearTimeout(timer)

            const newtimer = setTimeout(async () => {
                try {
                    await updateCartItem(item.id, newQty);
                    updatecartprice();
                } catch (err) {
                    set_cart_quantity_direct(11);
                }
            }, 1500)
            set_timer(newtimer)
        }
    };

    const handleRemove = async () => {
        if (cart_quantity_direct > 1) {
            const newQty = cart_quantity_direct - 1;
            set_cart_quantity_direct(newQty);

            if (timer) clearTimeout(timer)
            const newtimer = setTimeout(async () => {
                try {
                    await updateCartItem(item.id, newQty);
                    updatecartprice();
                } catch (err) {
                    set_cart_quantity_direct(11);
                }
            }, 1500)
            set_timer(newtimer)
        }
        else {
            try {
                document.getElementById(item.id).remove()
                if (document.getElementById('product-container').hasChildNodes() === false) {
                    return window.location.href = "/"
                }
                await removeCartItem(item.id);
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


export function Cart_Control_Indirect({ cart_detail, item }) {
    const { quantity, cart_item_id } = cart_detail();
    const [cart_quantity_indirect, set_cart_quantity_indirect] = useState(quantity !== null ? quantity : "ADD");
    console.log(quantity)
    console.log('iq', quantity, cart_quantity_indirect)
    const [CartItem_id, set_CartItem_id] = useState(cart_item_id || null);
    const [timer, set_timer] = useState(null);
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
            set_cart_quantity_indirect(newQty);
            if (timer) clearTimeout(timer)
            const newtimer = setTimeout(async () => {
                try {
                    await updateCartItem(CartItem_id, newQty);
                } catch (err) {
                    set_cart_quantity_indirect(11);
                }
            }, 1500)
            set_timer(newtimer)
        }
    };

    const handleRemove = async () => {
        if (cart_quantity_indirect > 1) {
            const newQty = cart_quantity_indirect - 1;
            set_cart_quantity_indirect(newQty);
            if (timer) clearTimeout(timer)
            const newtimer = setTimeout(async () => {
                try {
                    await updateCartItem(CartItem_id, newQty);
                } catch (err) {
                    set_cart_quantity_indirect(11);
                }
            }, 1500)
            set_timer(newtimer)

        } else {
            set_cart_quantity_indirect("ADD");
            set_CartItem_id(null);

            if (timer) clearTimeout(timer)
            const newtimer = setTimeout(async () => {
                try {
                    await removeCartItem(CartItem_id);
                } catch (err) {
                    set_cart_quantity_indirect(11);
                }
            }, 1500)
            set_timer(newtimer)


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