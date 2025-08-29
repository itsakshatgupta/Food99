'use client'
import { useState, useContext } from "react";
import { dynamic_ } from "@/components/main-context";
import { Icon } from "@/components/lib/icons";
import Link from "next/link";
import Image from "next/image";

export default function Order() {
    const { device } = useContext(dynamic_);
    const orderList = [
        {
            order_id: 425672,
            items: [
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/b.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/g.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/d.jpeg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },


            ],
            amount: 268,
            order_status: 'Food is Preparing..'
        },
        {
            order_id: 326549,
            items: [
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: '/food_img/j.jpg'
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/g.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/d.jpeg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },

            ],
            amount: 512,
            order_status: 'Food is Preparing..'
        },
        {
            order_id: 336298,
            items: [
                {
                    item_name: 'Heavy veggi loaded',
                    quantity: 1,
                    img_src: "/food_img/e.png"

                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/g.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/d.jpeg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },

            ],
            amount: 824,
            order_status: 'Arriving Soon..'
        },
        {
            order_id: 163498,
            items: [
                {
                    item_name: 'Cheese burger',
                    quantity: 5,
                    img_src: "/food_img/d.jpeg"

                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                }, {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/g.jpg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/d.jpeg"
                },
                {
                    item_name: 'marherita',
                    quantity: 2,
                    img_src: "/food_img/c.jpg"
                },

            ],
            amount: 958,
            order_status: 'Food is Preparing..'
        }
    ]
    return (
        <>

            <div className="pdb1" style={{ background: 'whitesmokel' }}>
                <div className="df aic jcsb pS pdx1 xbg bdb" style={{ top: 0 }}>
                    <h4 className="mgy05">Orders</h4>
                    <span><Icon.more_vert s="18px" /></span>
                </div>
                <div className="df fd-c pdx03 gap05">
                    {orderList.map((o, i) => (
                        <div className="df fd-c pdy04 pdx04 bdt bdrds1 xbg" key={i}>
                            <div className="pd05 bdbl df jcsb" style={{ borderBottomStyle: 'dashedl', borderColor: 'black', alignItems: 'flex-start' }}>
                                <div className="df fd-c gap04">
                                    <span className="font500" style={{ float: 'left' }}>{o.items.length} items | ${o.amount}</span>
                                    <span className="font-sm font500" style={{ float: 'left' }}>{o.order_status}</span>
                                </div>
                                <Link href={`/order/${o.order_id}`} className="font600 pdx05 pdy03 xfg" style={{ float: 'right', color: '#5b24dbff', borderRadius: '5px', fontSize: '0.75rem' }}>View Detail</Link>
                            </div>
                            {/* <div className="pdx05 pdy06 bdBrds  xbg">
                            </div> */}
                            <div className="df gap1 pdy08 ox xbg bdrds pdx04" style={{ alignItems: 'flex-start', borderRadius: '10px' }}>
                                {o.items.map((item, ii) => {
                                    if (ii <= 4) {
                                        const c = () => (ii < 4 ?
                                            <Image
                                                src={item.img_src}
                                                alt="iphone 15"
                                                width={55}
                                                height={58}
                                                className=" brdrs bd oh xfg"
                                                style={{ borderRadius: '5px' }} key={ii}
                                            />
                                            : <span className="db tac bd oh xfg" style={{ width: '55px', height: '55px', alignContent: 'center', borderRadius: '5px' }} key={ii}>+{o.items.length - 4}</span>)
                                        return c()
                                    }
                                })}
                            </div>
                            <div className="pdy02 pdx05 font07 font500" style={{ textAlign: 'end', color: 'GrayText' }}>
                                Order id:#{o.order_id}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )

}