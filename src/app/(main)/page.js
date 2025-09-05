'use client'
import ContainerAContents from '@/components/container-A-contents';
import { dynamic_ } from '@/components/main-context';
import { useContext, useEffect, useState } from "react"
import Portal_ from "@/components/main_portal/main_protral";
import Link from 'next/link';
import { Icon } from '@/components/lib/icons';
import Image from 'next/image';
import { Cart_Control_Direct, Cart_Control_Indirect } from '@/components/lib/cart_control';
import Topbar_ from '@/components/topbar_/topbar';
import { BookOpen } from 'lucide-react';
import { apiFetch } from '../(api)/api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const banner_ = <>
    <div className="df jcsb wfp hfp" style={{ background: '#f1f8e9' }}>
        <div className="pdx1" style={{ justifyItems: 'center' }}>
            <h2>Sales Live</h2>
            <h1 className="pdx05" style={{
                background: '#FFEB3B',
                border: '1px solid #33691E'
            }}>Get 50% Off</h1>
        </div>
        <div className="fx1 pdx05 pdy05" style={{ alignContent: 'center' }}>
            <div className=" catg df aic pdy05 pdx1 gap2 fxw">
                <div>
                    <div className="pR">
                        <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                    </div>
                    <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                    <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                </div>
                <div>
                    <div className="pR">
                        <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                    </div>
                    <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                    <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                </div>
                <div>
                    <div className="pR">
                        <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                    </div>
                    <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                    <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                </div>
                <div>
                    <div className="pR">
                        <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                    </div>
                    <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                    <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                </div>
                <div>
                    <div className="pR">
                        <div className="bd" style={{ width: '75px', height: '80px', borderRadius: '10px', justifySelf: 'center', background: 'white' }}></div>
                    </div>
                    <div style={{ justifySelf: 'center', marginTop: '3px', fontSize: '0.8rem' }}>Veggie house 'aaa'</div>
                    <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige', color: 'black' }}>250</div>
                </div>
            </div>
        </div>
    </div>
</>

const mobile_banner = <>
    <div className="wfp oh">
        <div className="pdx08" style={{
            color: '#323232'
        }}
        ><h4 className="mg0 pdt1">Don't Miss this Deal</h4><h1 className="pdx02 mg0">Get 50% Off</h1></div>
        <div className="pdx05 pdy05 oh" style={{ background: '#ededed' }}>
            <div className=" catg df aic pdy05 pdx1 gap2 oy">

                <style>{`.e{width: 75px; height: 80px; border-radius: 10px; justify-self: center; background: white; box-shadow:2px 2px 5px 1px #cfcfcfff`}</style>
                <div>
                    <div className="pR">
                        <div className="bd e oh">
                            <Image
                                alt="offer"
                                src="/food_img/k.jpg"
                                width={75}
                                height={80}
                            />
                        </div>
                        <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                    </div>
                    <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                </div>
                <div>
                    <div className="pR">
                        <div className="bd e oh">
                            <Image
                                alt="offer"
                                src="/food_img/k.jpg"
                                width={75}
                                height={80}
                            />
                        </div>
                        <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                    </div>
                    <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                </div>
                <div>
                    <div className="pR">
                        <div className="bd e oh">
                            <Image
                                alt="offer"
                                src="/food_img/k.jpg"
                                width={75}
                                height={80}
                            />
                        </div>
                        <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                    </div>
                    <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                </div>
                <div>
                    <div className="pR">
                        <div className="bd e oh">
                            <Image
                                alt="offer"
                                src="/food_img/k.jpg"
                                width={75}
                                height={80}
                            />
                        </div>
                        <div className="pA pdx04 bdrds font500" style={{ justifySelf: 'end', background: 'green', border: '1px solid black', color: 'white', fontSize: '0.65rem', bottom: '-3px' }}>$250</div>
                    </div>
                    <div style={{ justifySelf: 'cente1r', marginTop: '5px', fontSize: '0.65rem' }} className="font500">Heavy Veggie Loaded</div>

                </div>
            </div>
        </div>
    </div>
</>

export default function branches() {
    const { device } = useContext(dynamic_);
    const [menu___i, set_menu___i] = useState(null);
    const [cart__i, set_cart__i] = useState(null);

    const { dynamic_portal_main, set_dynamics_portal_main, cart_, set_cart, floaters, set_floaters } = useContext(dynamic_);


    useEffect(() => {
        if (cart_ && menu___i) {
            set_floaters(<div className='df fd-c' style={{ alignItems: 'flex-end' }}>
                <span className='xbg oh mg05 mgx07 font07 font600 df fd-c aic jcc bd gap01' style={{ borderRadius: '100%', height: '3.8rem', width: '3.8rem', background: '#9970faff', color: '#ffffffff', border: '1px solid black' }}>
                    <BookOpen />
                    Menu
                </span>

                <div className="pS pd05l jcsb wfp bdt oh bdTrds" style=
                    {{ bottom: 0, borderColor: 'blac1k' }}><div className="pdy02 pdx05 font700 " style={{ background: '#ffffffe1', color: 'green', backdropFilter: 'blur(2px)' }}><span className='font08 font700'>Add item worth 99 and get 50% flat discount</span></div>
                    <div className="df aic jcsb gap05 pdy06 pdx05 bdt xbg" style={{ boxShadow: '0 0 6px 5px #ecececff' }}><span>21 Items</span>
                        <Link href='/cart' style={{
                            background: '#9970faff',
                            color: 'white',
                            borderRadius: '10px',
                        }}
                            className="pdx2 xfg df aic pdy1 font700 font-md"><span className='df'><Icon.Cart_ c='white' s='20' /></span>Checkout</Link>
                    </div>
                </div>
            </div>)
        }
    }, [menu___i])

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await apiFetch("/cart"); // Django cart API
                const data = await res.json();
                set_cart__i(data);

            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
        async function fetchMenu() {
            try {
                const res = await apiFetch("/menu/"); // Django cart API
                const data = await res.json();
                set_menu___i(data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
        fetchCart();
        fetchMenu();
    }, []);
    
    const d = (fall_ctg_, n, p, d) => {
        return (<>
            <style>
                {`
                .CKEFT pd04{
                    transition: all 0.16s;
                    cursor:pointer;
                }
                .CKEFT pd04:hover{
                    background:#d6ebd1;
                }
                `}
            </style>
            <div className="df aic jcsb wfp pdy05 pdl05 pdr08 bdb pS" style={{ background: '#8BC34A', top: '0' }}>
                <h3 className="mg0">{fall_ctg_}</h3>
                <div className="df aic gap1">
                    <span className="df bdrds" style={{
                        background: 'whitesmoke',
                        padding: '2px',
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>
                    </span>
                    <span className="df" onClick={() => set_dynamics_portal_main(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span></div>
            </div>
            <div className="hfp oy" style={{
                scrollbarColor: 'rgb(234 234 234) white',
                scrollbarWidth: 'thin'
            }}>
                <div className="df fd-c">
                    <img className="img_"
                        src="file:///home/akshat-gupta/Downloads/old%201/Coding.jpg"
                        style={{
                            background: 'rgb(251 251 251)'
                        }}
                        height='190px'
                        width='350px'
                    ></img>
                    <div className="pdy1 df aic pdx05 bdt"><span className="fx1">{n}</span><div className="add_cart_control_ICart_Control_Indirect font-sm oh" style={{ width: '5.2rem', fontSize: '0.875rem', background: 'white' }}><span className="fx1 df aic jcc tac CKEFT pd04 pdy01" onClick={(e) => less(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="tac fx1 pdy01" id="orderNo">0</span><span className="fx1 df aic jcc tac CKEFT pdy01" onClick={(e) => add(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div></div></div><div className="pdy5 pdx05" style={{ borderRadius: '5px', background: '#f8f8f8' }}>Description</div>
            </div>
        </>)
    }

    function less(e) {
        let n = e.currentTarget.parentElement.children[1].textContent;

        if (n <= 1 || n === 'ADD') {
            e.currentTarget.parentElement.children[1].textContent = 'ADD';
        }
        else {
            e.currentTarget.parentElement.children[1].textContent = n - 1
            let nn = parseInt(e.currentTarget.parentElement.children[1].textContent);
            if (nn <= 0) { e.currentTarget.parentElement.classList.remove('dfIMP') }
            set_cart(nn)
            n = parseInt(e.currentTarget.parentElement.children[1].textContent);
        }

    }
    function add(e) {
        let n;
        if (e.currentTarget.parentElement.children[1].textContent === 'ADD') {
            n = 0;
        }
        else { n = parseInt(e.currentTarget.parentElement.children[1].textContent); }

        e.currentTarget.parentElement.children[1].textContent = n + 1
        let nn = parseInt(e.currentTarget.parentElement.children[1].textContent);
        if (nn > 0) { e.currentTarget.parentElement.classList.add('dfIMP') }
        console.log('?cart', typeof cart_)

        set_cart(nn)
        // console.log('?cart', cart_)
    }

    const menu__ = [
        {
            main_ctg__: 'pizza', items_list__: [
                { item_name__: 'Marhertia', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 120 },
                { item_name__: 'Farm Loaded', item_description__: 'Tomato Sauce, Mozorolla Cheese, Capscium, Basil and Veggies', img_src: '/food_img/b.jpg', item_price__: 150 },
                { item_name__: 'Farm House', item_description__: 'Tomato Sauce, Mozorolla Cheese, Onions, Corn, Basil and Veggies', img_src: '/food_img/c.jpg', item_price__: 149 },
                { item_name__: 'Heavy Veggie Loaded', item_description__: 'Tomato Sauce, Mozorolla, Onion, Mashroom, Cheese, Basil and Veggies', img_src: '/food_img/d.jpeg', item_price__: 190 },
                { item_name__: 'Farmer Pizza', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/e.png', item_price__: 180 },
                { item_name__: 'Panner Makhani Pizza', item_description__: 'Tomato Sauce, Mozorolla Cheese, Panner, Makhani Grevy, Basil and Veggies', img_src: '/food_img/f.png', item_price__: 170 },
                { item_name__: 'Golden Corn', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Corn', img_src: '/food_img/g.jpg', item_price__: 130 },
                { item_name__: 'Mushroom Loaded', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Mushroom', img_src: '/food_img/h.png', item_price__: 160 },
                { item_name__: 'Italy Florentina', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil, Spinach and Veggies', img_src: '/food_img/i.png', item_price__: 180 },
                { item_name__: 'Cheese Loaded', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 120 },
            ]
        },
        {
            main_ctg__: 'Burger', items_list__: [
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/k.jpg', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/l.png', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/i.png', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/b.jpg', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/c.jpg', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/d.jpeg', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/e.png', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/f.png', item_price__: 69 },
                { item_name__: 'Cheesey Burger', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/g.jpg', item_price__: 69 },
            ]
        },
        {
            main_ctg__: 'Pasta', items_list__: [
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/h.png', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/i.png', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/b.jpg', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/k.jpg', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/e.png', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/l.png', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/f.png', item_price__: 99 },
                { item_name__: 'White Cheesey Pasta', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/i.png', item_price__: 99 },
            ]
        },
        {
            main_ctg__: 'French Fries', items_list__: [
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/b.jpg', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/c.jpg', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/d.jpeg', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/e.png', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/f.png', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/g.jpg', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/h.png', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/i.png', item_price__: 49 },
                { item_name__: 'American French Fries', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 49 },
            ]
        },
        {
            main_ctg__: 'Roll', items_list__: [
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/h.png', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/d.jpeg', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/b.jpg', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/i.png', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/l.png', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/d.jpeg', item_price__: 49 },
                { item_name__: 'Spring Roll', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/h.png', item_price__: 49 },
            ]
        },
        {
            main_ctg__: 'Breverages', items_list__: [
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/b.jpg', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/k.jpg', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/g.jpg', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/d.jpeg', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/f.png', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/e.png', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/i.png', item_price__: 29 },
                { item_name__: 'Lassi', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 29 },
            ]
        },
        {
            main_ctg__: 'Combo', items_list__: [
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/l.png', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/b.jpg', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/e.png', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/j.jpg', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/k.jpg', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/a.jpeg', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/i.png', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/k.jpg', item_price__: 149 },
                { item_name__: 'Pizza with Burger Combo', item_description__: 'Tomato Sauce, Mozorolla Cheese, Basil and Veggies', img_src: '/food_img/g.jpg', item_price__: 149 },
            ]
        },
    ]

    return (<>
        {/* <style>{`#topbar{box-shadow: 0px 3px 4px 0px #eaeaea82;}`}</style> */}
        <style>{`
        .add_cart_control_ICart_Control_Indirect{    
            display: flex;
            background: #ffffff;
            width: 70%;
            justify-self: center;
            font-size: 0.75rem;
            font-weight: bold;
            color: #2c720a;
            border-radius: 5px;
            background: #f9fffa;
            border: 1px solid #31b137;
            justify-content: space-around;
            user-select:none;
        }
        .dfIMP{
            display:flex !important;
        }
        `}</style>
        <style>
            {`
                .CKEFT{
                    transition: all 0.16s;
                    cursor:pointer;
                }
                .CKEFT:hover{
                    background:#d6ebd1;
                }
                `}
        </style>



        {device === 'mobile' && menu___i ?
            <>
                <div className="pS xbg" style={{ top: 0, zIndex: 1 }}>
                    <Topbar_ />
                </div>
                {mobile_banner}
                <div className="df aic jcsb bdb pdx1 pdt06 xbg gap3 ox pS1 bdBrds" style={{
                    scrollbarColor: '#f8f8f8 white',
                    scrollbarWidth: 'none',
                    top: 0,

                }}>
                    <div className="df aic gap1 fx1">
                        <span className="df aic gap02 font08 pdx05 pdy03"><svg className="dn" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="xfg1 bdTrds font600 pdx03 pdy02" style={{ color: '#9970faff', borderBottom: '1px solid #9970faff' }}>Pizza</span></span>
                        <span className="df aic gap02 font08 pdx05 pdy03"><svg className="dn" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg><span className="font600">Recommended</span></span>
                        <span className="df aic gap02 font08 pdx05 pdy03"><svg className="dn" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font600">Trending</span></span>
                        <span className="df"><svg className="dn" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#000000"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" /></svg></span></div>
                </div>
                {/* </div> */}


                <div className="fx1" style={{
                    scrollbarColor: '#e7e7e7ff white',
                    scrollbarWidth: 'thin',
                    background: 'whitesmoke',
                    paddingBlockEnd: `${floaters ? '150px' : 0}`
                }}>

                    {menu___i?.map((categories) => {
                        console.log('ccc', cart__i)
                        if (categories.items.length >= 1) {
                            return (


                                <div className="bdrds mgx05 mgt2 pdb1" key={categories.id} style={{ border: '1px dashed #9970faff' }}>
                                    <span className="mgl04 pdx05 pdy02 pR font-md font600 bdrds df aic wfc bd" style={{ top: '-15px', background: '#9970faff', color: 'white', fontVariant: 'all-petite-caps', borderColor: 'black' }}>{categories.name}</span>
                                    <div className={` catg df fd-c fxw`} style={{ gap: '1.2rem' }}>

                                        {categories.items.map((menu_items, i) =>
                                            <div key={i}>
                                                {device === 'mobile' &&
                                                    <>
                                                        <style>
                                                            {`              
                                                .lowscreen-portal{
                                                  animation:a_lowscreen-porta_ 0.15s linear ;
                                                }
                                                @keyframes a_lowscreen-porta_{
                                                0%{
                                                bottom:-100%;
                                                }
                                                100%{
                                                bottom:0;
                                                }
                                                }`}
                                                        </style>
                                                        <div className=" xbg df jcsb pdt1 pdb2 mgx08 pdx07  bdrds" style={{ boxShadow: '1px 0 10px 1px #f7f7f7ff' }}>
                                                            <div className="pdr06">
                                                                <div className="df" style={{ alignItems: 'flex-start' }}>
                                                                    <span className="mgl01 font-lg font700">{menu_items.name}</span>
                                                                    <span className="pdx02 pdy02 bdrds aic font-sm df font600 font07" style={{ background: 'white', color: '#3d5dc7ff' }}><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg></span>
                                                                </div>
                                                                <div className="df aic pdt02 pdx02 gap02">
                                                                    <span className="pdx03 pdy01 bdrds aic font-sm df" style={{ background: 'green', color: 'white', fontSize: '0.7rem' }}>4.5<svg xmlns="http://www.w3.org/2000/svg" height="0.8rem" viewBox="0 -960 960 960" width="0.8rem" fill="#ffffffff"><path d="M480-644v236l96 74-36-122 90-64H518l-38-124ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" /></svg></span></div>
                                                                <div className="font-sm font500 pdt05">{menu_items.description}</div>
                                                            </div>
                                                            <div>
                                                                <div className="df fd-c aic pR" onMouseMoveCapture={(e) => { e.currentTarget.children[1].style.display = "flex" }} ><div className="bd bdrds oh" onClick={() => set_dynamics_portal_main(
                                                                    <div className="lowscreen-portal wfp df fd-c oh" style={{
                                                                        background: 'white',
                                                                        borderTop: '1px solid', borderTopRightRadius: '10px', borderTopLeftRadius: '10px'
                                                                    }}>
                                                                        <div className="pdy05 pdx1 font600 bdb">{menu_items.name}  <span className="df" style={{ float: 'right' }} onClick={() => set_dynamics_portal_main(null)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span></div>
                                                                        <div className="xfg" style={{ height: '200px' }}>
                                                                            {/* Hii */}
                                                                            <Image
                                                                                src={menu_items.image}
                                                                                alt="iphone 15"
                                                                                width={400}
                                                                                height={200}
                                                                            />
                                                                        </div>
                                                                        {/* <div>{menu_items.item_price__}</div> */}

                                                                    </div>
                                                                )} style={{
                                                                    width: '121px',
                                                                    height: "120px",
                                                                    borderRadius: '10px',
                                                                    justifySelf: 'center',
                                                                    background: 'white'
                                                                }}>                                                    <Image
                                                                        src={menu_items.image}
                                                                        alt="iphone 15"
                                                                        width={122}
                                                                        height={120}
                                                                    /></div>

                                                                    <Cart_Control_Indirect
                                                                        cart_detail={() => {
                                                                            const cartItem = cart__i?.items.find((v) => v.menu_item.id === menu_items.id);

                                                                            return {
                                                                                quantity: cartItem ? cartItem.quantity : null,
                                                                                cart_item_id: cartItem ? cartItem.id : null,
                                                                            };
                                                                        }}
                                                                        item={{
                                                                            id: menu_items.id,
                                                                            name: menu_items.name,
                                                                            price: menu_items.price,
                                                                            image: menu_items.image
                                                                        }}

                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>

                            )
                        }

                    }

                    )}

                </div>

                {/* {device === 'mobile' && dynamic_portal_main} */}
            </>
        :    <div className="hfp wfp df aic jcc"><div className="df fd-c aic"><span style={{height:'200px', width:'200px'}}><DotLottieReact
      src="https://lottie.host/ae3002b6-0032-483e-befc-5bef572881dc/Eu5RhsnUUn.lottie"
      loop
      autoplay
    /></span><span className='font08 font600' style={{color:'#8a8a8a'}}>Loading..</span></div></div>}


    </>)
}
{/* for pc */ }
// {device === 'pc' && <div className="hfp oh pR df bdt">

//     <div className="pdx1 pdt1 bdr df fd-c jcsb fxw" style={{ background: '#f8f8f8', width: 'calc(200px + 2rem + 1px)' }}>
//         <div className="container-A  xs:dn xs:dn df fd-c fxn font-md" style={{ overflow: "hidden", width: '200px', fontWeight: "var(--font-weight-300)", zIndex: '1', borderRadius: '10px' }}>
//             <ContainerAContents />
//         </div>
//         <div className="tac font-sm font300"><span>Terms and Conditions | Privacy Policy</span></div>
//     </div>
//     <div className="fx1 df fd-c pR oh">
//         <div className={`df gap03 fx1 oh`}>

//             <div className="fx1 oy" style={{
//                 scrollbarColor: '#f8f8f8 white',
//                 scrollbarWidth: 'thin'
//             }}>
//                 <div className="df fd-c pdy1" style={{ position: 'sticky', top: '0' }}>
//                     <div className="df jcc aic">
//                         <div className="bd bdrds oh" style={{
//                             width: '75%',
//                             height: '11rem',
//                             borderColor: 'black'
//                         }}>{banner_}</div>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="df aic jcsb bdb pdx1 pdy06 xbg gap3 ox" style={{
//                         scrollbarColor: '#f8f8f8 white',
//                         scrollbarWidth: 'none'
//                     }}><div className="df aic gap1 fx1">
//                             <span className="df aic gap02 font08 pdx05 pdy03"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font900">Trending</span></span>
//                             <span className="df aic gap02 font08 bd xfg bdrds pdx05 pdy03"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg><span className="font900">Recommended</span></span>
//                             <span className="df aic gap02 font08 bd xfg bdrds pdx05 pdy03"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#4a810bff"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg><span className="font900">Trending</span></span>
//                             <span className="df"><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#000000"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" /></svg></span></div>
//                     </div>
//                     {menu__.map((ctg, i) => (

//                         <div className="pdy1" key={i}>
//                             <h2 className="mg0 pdx1 pdy08">{ctg.main_ctg__}</h2>
//                             <div className={` catg df ${device === 'pc' && 'aic'} pdy1 pdx1 gap2l fxw ${device === 'mobile' && 'fd-c'}`} style={{ gap: '1.5rem' }}>
//                                 {ctg.items_list__.map((v, i) => (
//                                     <div key={i}>
//                                         {device === 'pc' &&
//                                             <>
//                                                 <div className="pR" onMouseMoveCapture={(e) => { e.currentTarget.children[1].style.display = "flex" }} onMouseOut={(e) => { e.currentTarget.children[1].style.display = "none" }}><div className="bd" onClick={() => set_dynamics_portal_main(<Portal_ content={d(ctg.main_ctg__, v.item_name__, v.item_price__)} />)} style={{
//                                                     width: '110px',
//                                                     height: "120px",
//                                                     borderRadius: '10px',
//                                                     justifySelf: 'center',
//                                                     background: 'white'
//                                                 }}></div> <div className="pA add_cart_control_ICart_Control_Indirect oh" style={{ display: 'none', bottom: '-10px' }}><span className="df aic fx1 tac jcc CKEFT" onClick={(e) => less(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo">0</span><span className="df aic fx1 tac jcc CKEFT" onClick={(e) => add(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div></div>
//                                                 <div className="font-sm" style={{ justifySelf: 'center', marginTop: '13px' }}>{v.item_name__}</div>
//                                                 <div className="font07 pdx05 bdrds" style={{ justifySelf: 'center', background: 'beige' }}>{v.item_price__}</div>
//                                             </>
//                                         }
//                                         {device === 'mobile' &&
//                                             <>
//                                                 <style>
//                                                     {`
//                                         .lowscreen-portal{
//                                           animation:a_lowscreen-porta_ 0.15s linear ;
//                                         }
//                                         @keyframes a_lowscreen-porta_{
//                                         0%{
//                                         bottom:-100%;
//                                         }
//                                         100%{
//                                         bottom:0;
//                                         }
//                                         }`}
//                                                 </style>
//                                                 <div className="bd bdrds xbg df jcsb pd1 pdb2">
//                                                     <div className="pdr06">
//                                                         <div className="df" style={{ alignItems: 'flex-start' }}>
//                                                             <h3 className="mg0">{v.item_name__}</h3>
//                                                             <span className="pdx04 pdy02 bdrds aic font-sm df font600 font07" style={{ background: 'white', color: '#3d5dc7ff' }}><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#3d5dc7ff"><path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z" /></svg></span>
//                                                         </div>
//                                                         <div className="df aic pdt02 pdx02 gap02">
//                                                             <span className="pdx04 pdy02 bdrds aic font-sm df" style={{ background: 'green', color: 'white', fontSize: '0.75rem' }}>4.5<svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#ffffffff"><path d="M480-644v236l96 74-36-122 90-64H518l-38-124ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" /></svg></span></div>
//                                                         <div className="font-sm pdt05">{v.item_description__}</div>
//                                                     </div>
//                                                     <div>
//                                                         <div className="df fd-c aic pR" onMouseMoveCapture={(e) => { e.currentTarget.children[1].style.display = "flex" }} ><div className="bd" onClick={() => set_dynamics_portal_main(
//                                                             <div className="lowscreen-portal pA wfp df fd-c oh" style={{
//                                                                 background: 'white', bottom: 0,
//                                                                 borderTop: '1px solid', borderTopRightRadius: '10px', borderTopLeftRadius: '10px'
//                                                             }}>
//                                                                 <div className="pdy05 pdx1 font600 bdb">{v.item_name__}  <span className="df" style={{ float: 'right' }} onClick={() => set_dynamics_portal_main(null)}>
//                                                                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span></div>
//                                                                 <div className="xfg" style={{ height: '200px' }}>Hii</div>
//                                                                 {/* <div>{v.item_price__}</div> */}

//                                                             </div>
//                                                         )} style={{
//                                                             width: '110px',
//                                                             height: "120px",
//                                                             borderRadius: '10px',
//                                                             justifySelf: 'center',
//                                                             background: 'white'
//                                                         }}></div> <div className="pA add_cart_control_ICart_Control_Indirect oh font09 font900" style={{ bottom: '-15px', width: "100px", height: '30px' }} ><span className="df aic fx1 tac jcc CKEFT  " onClick={(e) => less(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M200-440v-80h560v80H200Z" /></svg></span><span className="fx1 tac" id="orderNo" style={{ alignContent: 'center' }}>ADD</span><span className="df aic fx1 tac jcc CKEFT " onClick={(e) => add(e)}><svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#2c720a"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></span></div></div>

//                                                     </div>
//                                                 </div>
//                                             </>
//                                         }
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )
//                     )}
//                 </div>

//             </div>
//             {device === 'pc' && dynamic_portal_main}
//         </div>
//         {device === 'mobile' && cart_ && <div className="pA pd05l jcsb wfp bdt bdr bdl bdTrds xbg oh" style=
//             {{ bottom: 0, borderColor: 'black' }}><div className="pd03 font600 bdb" style={{ background: 'lavender', color: 'wlhite' }}><span className='font-sm'>Add item worth 99 and get 50% flat discout</span></div>
//             <div className="df aic jcsb gap05 bdtl pdy06 pdx05" style={{ borderColor: 'black' }}><span>FI</span>
//                 <span style={{
//                     background: 'green',
//                     color: 'white',
//                     borderRadius: '10px',
//                 }}
//                     className="pd05 xfg df aic pdy07"><span className='df'><Icon.Cart_ c='white' s='24' /></span>Checkout</span>
//             </div>
//         </div>}
//         {device === 'mobile' && dynamic_portal_main}
//     </div>
// </div>}