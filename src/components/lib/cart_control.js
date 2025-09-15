'use client';
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { cart } from "../dummy_data";
import { addToCart, removeCartItem, updateCartItem } from "./cart_api";
import { apiFetch } from "@/app/(api)/api";
import { cartprice } from "@/app/(main)/cart/page";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { mutate } from 'swr';
import { dynamic_, floaters_ } from "../main-context";
import Link from "next/link";


export function Cart_Control_Direct({ item }) {

    const { set_total_amount__i, updatecartprice } = useContext(cartprice);
    const [cart_quantity_direct, set_cart_quantity_direct] = useState(item.quantity);
    const [timer, set_timer] = useState(null);
    const [loading, set_loading] = useState([false, <DotLottieReact
        src="https://lottie.host/d4411d1a-96f8-46d4-9027-5655f21d9d7f/vJjJKUGwPT.lottie"
        loop
        autoplay
    />]);
    useEffect(() => {
        set_cart_quantity_direct(item.quantity)
    }, [item])


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
                    set_loading((pr) => [true, pr[1]])
                    await updateCartItem(item.id, newQty);
                    await updatecartprice();

                } catch (err) {
                    set_loading((pr) => [false, pr[1]])
                    set_cart_quantity_direct(11);
                }
                finally {
                    set_loading((pr) => [false, pr[1]])
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
                    set_loading((pr) => [true, pr[1]])
                    await updateCartItem(item.id, newQty);
                    await updatecartprice();
                } catch (err) {
                    set_loading((pr) => [false, pr[1]])
                    set_cart_quantity_direct(11);
                }
                finally {
                    set_loading((pr) => [false, pr[1]])
                }
            }, 1500)

            set_timer(newtimer)
        }
        else {
            if (timer) clearTimeout(timer)
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

        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{loading[0] ? loading[1] : cart_quantity_direct}</span><span className="df aic fx1 tac jcc CKEFT "
            onClickCapture={handleAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}


export function Cart_Control_Indirect({ cart_detail, item }) {
    const { usr, floaters, set_floaters } = useContext(dynamic_);

    const { quantity, cart_item_id } = cart_detail();
    const [cart_quantity_indirect, set_cart_quantity_indirect] = useState(quantity !== null ? quantity : "ADD");
    // console.log(quantity)
    // console.log('iq', quantity, cart_quantity_indirect)
    const [CartItem_id, set_CartItem_id] = useState(cart_item_id || null);
    const [timer, set_timer] = useState(null);
    const [showmsg, set_showmsg] = useState(false);

    useEffect(() => {
        const { quantity, cart_item_id } = cart_detail();
        set_cart_quantity_indirect(quantity !== null ? quantity : "ADD");
        set_CartItem_id(cart_item_id || null);

    }, [cart_detail])

    useEffect(() => {
        // only add if "msg" doesn't already exist
        const exists = floaters.some(v => v.name === 'msg');
        if (showmsg && !exists) {
            set_floaters((prev) => [...prev, { name: 'msg', child: msg() }])
        }
        if (showmsg === false && exists) {
            console.log("log")
            set_floaters((prev) => prev.filter((v, i) => v.name !== 'msg'))
        }
        return () => {
            set_timer(null)
        }
    }, [showmsg])

    const handleAdd = async () => {
        console.log('a')

        if (cart_quantity_indirect === "ADD") {
            // first add to cart
            set_cart_quantity_indirect(1);
            const response = await addToCart(item.id, 1); // menu_item.id
            if (response.ok) {
                mutate("/cart"); // Refresh the cart data
                let r = await response.json()
                console.log('r', r)
                set_CartItem_id(r.id); // store cartItem.id
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
                } finally {
                    mutate("/cart"); // Refresh the cart data
                }
            }, 1500)
            set_timer(newtimer)
        }
    };

    const handleRemove = async () => {
        console.log('r')
        if (cart_quantity_indirect > 1) {
            const newQty = cart_quantity_indirect - 1;
            set_cart_quantity_indirect(newQty);
            if (timer) clearTimeout(timer)
            const newtimer = setTimeout(async () => {
                try {
                    await updateCartItem(CartItem_id, newQty);
                } catch (err) {
                    set_cart_quantity_indirect(11);
                } finally {
                    mutate("/cart"); // Refresh the cart data
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
            onClickCapture={(e) => {
                e.preventDefault();
                if (usr.hasOwnProperty('username')) {
                    console.log('usr::')
                    handleRemove()
                } else {
                    if (showmsg === false) {
                        set_showmsg(true)
                        const new_msgtimer =
                            setTimeout(() =>
                                set_showmsg(false)
                                , 11000)
                        set_timer(new_msgtimer)
                    } else {
                        if (timer) clearTimeout(timer)
                        const new_msgtimer =
                            setTimeout(() =>
                                set_showmsg(false)
                                , 11000)
                        set_timer(new_msgtimer)
                    }
                }
            }}
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>{cart_quantity_indirect}</span><span className="df aic fx1 tac jcc CKEFT "
            onClickCapture={(e) => {
                e.preventDefault();
                if (usr.hasOwnProperty('username')) {
                    handleAdd()
                } else {
                    if (showmsg === false) {
                        set_showmsg(true)
                        const new_msgtimer =
                            setTimeout(() =>
                                set_showmsg(false)
                                , 11000)
                        set_timer(new_msgtimer)
                    } else {
                        if (timer) clearTimeout(timer)
                        const new_msgtimer =
                            setTimeout(() =>
                                set_showmsg(false)
                                , 11000)
                        set_timer(new_msgtimer)
                    }
                }
            }
            }
        ><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div>
    </>)
}

function msg() {
    return (<>
        <style>{`@keyframes slideRight {
    0% {
        top:100px;
        opacity: 1;
    }
    10% {
        top:0px;
        opacity: 1;
    }
    90% {
        top:0px;
        opacity: 1;
    }
    100% {
        top:100px;
    }
}

.slide-animation {
    animation: slideRight 10s forwards;
}
`}</style>
        <div className="df aic jcsb gap05 pdy06 pdx1 bdt xbg bdTrds font600 pR slide-animation"
            style={{
                boxShadow: 'rgba(128, 128, 128, 0.19) 0px 3px 6px 5px',
                background: '#0f0f0fd0',
                color: 'white',
                zIndex: 1,
                position: 'relative',
            }}
        >
            <span>Login to eat.</span>
            <Link href="/login" className="font800 font-sm" style={{ color: 'orange' }}><u>Login</u></Link>
        </div>
    </>)
}
