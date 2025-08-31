'use client';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { cart } from "../dummy_data";
import { addToCart, removeCartItem, updateCartItem } from "./cart_api";

export function Cart_Control_Direct({ Cart_Item_No, Cart_Item_Qn, redirect_to_home_on_Nothing, item_name }) {

    const [cart_quantity, set_cart_quantity] = useState(Cart_Item_Qn)
    useEffect(() => {

        if (cart_quantity <= 0) {
            // remove item to server's cart database
            if (Cart_Item_No && document.getElementById(Cart_Item_No) !== null || undefined) {
                document.getElementById(Cart_Item_No).remove();
                if (redirect_to_home_on_Nothing === true && document.querySelector('.ITEMS') === null || undefined) {
                    redirect('/')
                }
            }

        } else {
            // send quantity to server's cart database

            cart.forEach((v, i) => {
                // 
                if (v.item_no === Cart_Item_No) {
                    v.quantity = cart_quantity;
                }
            })
        }


    }, [cart_quantity])

    return (<>
        <div className="add_cart_control font-sm oh" style={{ width: '5.2rem', fontSize: '0.875rem', background: 'white' }}><span className="fx1 df aic jcc tac CKEFT pdy01" onClickCapture={(e) => { cart_quantity !== "ADD" && set_cart_quantity(cart_quantity - 1) }}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="tac fx1 pdy01" id="orderNo">{cart_quantity}</span><span className="fx1 df aic jcc tac CKEFT pdy01" onClickCapture={(e) => { cart_quantity !== "ADD" ? set_cart_quantity(cart_quantity + 1) : set_cart_quantity(1) }}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}

export function Cart_Control_Indirect({ item }) {

    const [cart_quantity_indirect, set_cart_quantity_indirect] = useState(item.quantity)
    useEffect(() => {
        <div className="pA add_cart_control oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  "
            onClickCapture={() => {
                if (cart_quantity_indirect >= 1) {
                    const newQty = cart_quantity_indirect - 1;
                    set_cart_quantity_indirect(newQty);
                    updateCartItem(item.id, newQty);
                } else {
                    removeCartItem(item.id);
                    document.getElementById(item.id).remove()
                    if (document.getElementById('product-container').hasChildNodes===false) {
                        return window.location.href="/"
                    }
                }
            }}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{cart_quantity_indirect}</span><span className="df aic fx1 tac jcc CKEFT "
            onClickCapture={() => {
                if (cart_quantity_indirect !== "ADD") {
                    const newQty = cart_quantity_indirect + 1;
                    set_cart_quantity_indirect(newQty);
                    updateCartItem(item.id, newQty);
                } else {
                    set_cart_quantity_indirect(1);
                    addToCart(item.id, 1);
                }
            }}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    }, [cart_quantity_indirect])

    return (<>
        <div className="pA add_cart_control oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  "
            onClickCapture={() => {
                if (cart_quantity_indirect !== "ADD" && cart_quantity_indirect > 1) {
                    const newQty = cart_quantity_indirect - 1;
                    set_cart_quantity_indirect(newQty);
                    updateCartItem(item.id, newQty);
                } else {
                    removeCartItem(item.id);
                    set_cart_quantity_indirect("ADD");
                }
            }}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{cart_quantity_indirect}</span><span className="df aic fx1 tac jcc CKEFT "
            onClickCapture={() => {
                if (cart_quantity_indirect !== "ADD") {
                    const newQty = cart_quantity_indirect + 1;
                    set_cart_quantity_indirect(newQty);
                    updateCartItem(item.id, newQty);
                } else {
                    set_cart_quantity_indirect(1);
                    addToCart(item.id, 1);
                }
            }}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}