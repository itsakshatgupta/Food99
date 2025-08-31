'use client';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { cart } from "../dummy_data";
import { addToCart, removeCartItem, updateCartItem } from "./cart_api";

export function Cart_Control_Direct({ item }) {

    const [cart_quantity_direct, set_cart_quantity_direct] = useState(item.quantity)

    return (<>
        <div className="add_cart_control oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  "

            onClickCapture={() => {
                if (cart_quantity_direct >= 1) {
                    const newQty = cart_quantity_direct - 1;
                    set_cart_quantity_direct(newQty);
                    updateCartItem(item.id, newQty);
                } else {
                    removeCartItem(item.id);
                    document.getElementById(item.id).remove()
                    if (document.getElementById('product-container').hasChildNodes === false) {
                        return window.location.href = "/"
                    }
                }
            }}

        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{cart_quantity_direct}</span><span className="df aic fx1 tac jcc CKEFT "
            onClickCapture={() => {
                if (cart_quantity_direct >= 1) {
                    const newQty = cart_quantity_direct + 1;
                    set_cart_quantity_direct(newQty);
                    updateCartItem(item.id, newQty);
                } else {
                    removeCartItem(item.id);
                    document.getElementById(item.id).remove()
                    if (document.getElementById('product-container').hasChildNodes === false) {
                        return window.location.href = "/"
                    }
                }
            }}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}

export function Cart_Control_Indirect({ item }) {

    const [cart_quantity_indirect, set_cart_quantity_indirect] = useState("ADD")
    useEffect(() => {

        if (cart_quantity_indirect < 1) {
            // remove item to server's cart database
            removeCartItem(item.id)

        }
        // else {
        //     if (cart_quantity_indirect === 1) {
        //         // remove item to server's cart database
        //         addToCart(item.id, cart_quantity_indirect)

        //     } else {
        //         // send quantity to server's cart database
        //         updateCartItem(item.id, cart_quantity_indirect)
        //     }
        // }


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