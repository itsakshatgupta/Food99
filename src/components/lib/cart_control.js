'use client';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { cart } from "../dummy_data";

export function Cart_Control_Direct({ Cart_Item_No, Cart_Item_Qn, redirect_to_home_on_Nothing, item_name }) {
    const orderList = [

        {
            item_name: 'marherita',
            item_no: 'Lx2202gh0',
            quantity: 2,
            price: 86,
            img_src: "/food_img/b.jpg"
        },
        {
            item_name: 'marherita',
            item_no: 'K430RTNBV',
            quantity: 2,
            price: 99,
            img_src: "/food_img/c.jpg"
        },
        {
            item_name: 'marherita',
            item_no: 'QFVBTHGD23',
            quantity: 2,
            price: 120,
            img_src: "/food_img/g.jpg"
        },
        {
            item_name: 'marherita',
            item_no: 'ANBIFMX6JZ',
            quantity: 2,
            price: 115,
            img_src: "/food_img/d.jpeg"
        },
        {
            item_name: 'marherita',
            item_no: 'GBKIOE45V21ZSR',
            quantity: 2,
            price: 109,
            img_src: "/food_img/c.jpg"
        }
    ]
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
            // console.log('c', cart)
        }


    }, [cart_quantity])
    // function less(e) {
    //     let n = cart_quantity;

    //     if (n <= 1 || n === 'ADD') {
    //         set_cart_quantity('ADD');
    //     }
    //     else {
    //         set_cart_quantity(n - 1);
    //         let nn = parseInt(cart_quantity);
    //         if (nn <= 0) { e.currentTarget.parentElement.classList.remove('dfIMP') }
    //         set_cart(nn)
    //         n = parseInt(e.currentTarget.parentElement.children[1].textContent);
    //     }

    // }
    // function add(e) {
    //     let n;
    //     if (e.currentTarget.parentElement.children[1].textContent === 'ADD') {
    //         n = 0;
    //     }
    //     else { n = parseInt(e.currentTarget.parentElement.children[1].textContent); }

    //     e.currentTarget.parentElement.children[1].textContent = n + 1
    //     let nn = parseInt(e.currentTarget.parentElement.children[1].textContent);
    //     if (nn > 0) { e.currentTarget.parentElement.classList.add('dfIMP') }
    //     console.log('?cart', typeof cart)

    //     set_cart(nn)
    //     // console.log('?cart', cart_)
    // }
    return (<>
        <div className="add_cart_control font-sm oh" style={{ width: '5.2rem', fontSize: '0.875rem', background: 'white' }}><span className="fx1 df aic jcc tac CKEFT pdy01" onClickCapture={(e) => { cart_quantity !== "ADD" && set_cart_quantity(cart_quantity - 1) }}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="tac fx1 pdy01" id="orderNo">{cart_quantity}</span><span className="fx1 df aic jcc tac CKEFT pdy01" onClickCapture={(e) => { cart_quantity !== "ADD" ? set_cart_quantity(cart_quantity + 1) : set_cart_quantity(1) }}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}

export function Cart_Control_Indirect({ item_name }) {

    const [cart_quantity_indirect, set_cart_quantity_indirect] = useState("ADD")
    useEffect(() => {

        if (cart_quantity_indirect < 1) {
            // remove item to server's cart database
            set_cart_quantity_indirect("ADD")

        } else {
            // send quantity to server's cart database
        }


    }, [cart_quantity_indirect])

    return (<>
        <div className="pA add_cart_control oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  " onClickCapture={(e) => { cart_quantity_indirect !== "ADD" && set_cart_quantity_indirect(cart_quantity_indirect - 1) }}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{cart_quantity_indirect}</span><span className="df aic fx1 tac jcc CKEFT " onClickCapture={(e) => { cart_quantity_indirect !== "ADD" ? set_cart_quantity_indirect(cart_quantity_indirect + 1) : set_cart_quantity_indirect(1) }}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}