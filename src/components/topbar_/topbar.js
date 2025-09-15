'use client';
import Topbar from "../topbar/bar"
import { Suspense, useContext, useEffect, useState } from "react";
import { Box, Home, LogIn, MapPinHouse, Search, Shapes, UserCircle2, User2, UserCircle } from 'lucide-react';
import { dynamic_ } from "../main-context";
import dynamic from "next/dynamic";

import Portal_Ab from "../main_portal/main_protol_ab";
import Account from "./account";
import BuyAgain from "./buyAgain";
import Address from "./address";
import Cart from "./cart";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Topbar_() {
    const { device, set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab, cart_, usr } = useContext(dynamic_);
    const [search_mode, set_search_mode] = useState(false)
    const [top_bar_, set_top_bar_] = useState(null)
    const pathname = usePathname()

    const topbarBtn = {
        l: [
            "native-add_2-Hi",
            "interaction-folder_open-Hi"
        ],
        r: [
            "interaction-save-Hi",
            "interaction-attach_file-Hi",
            "interaction-share-Hi",
            "interaction-dataset_linked-Hi-() => router.push('?panel=settings')",
            "interaction-overview-Hi"

        ]
    }
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

    const tg_btns = {
        cart_: <Cart />,
        address_: <Address />,
        buy_again_: <BuyAgain />,
        account_: <Account />
    }
    function toogle_topbar_nav(e) {
        set_dynamics_portal_ab(<Portal_Ab content={tg_btns[e]} />)
    }
    useEffect(() => {

        if (search_mode) {
            set_dynamics_portal_ab(
                <div className="df fd-c pdy09 pdx1 gap1 bdb"
                // style={{ background: '#b1261cff', color:'white' }}  Jng
                >
                    <Topbar
                        l={
                            <h4 className="mg0 font900 font-lg" style={{ color: '#3e7210' }}>Food<span style={{ color: 'black' }}>99</span></h4>
                        }
                        r={<span className="df pd03" onClickCapture={() => set_search_mode(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span>}
                    />
                    <div className="oh"><div className="pR df aic gap05 dropdowneffect"><div className="fx1 df pdx05 pdy04 gap02 xfg" style={{ borderRadius: '10px', alignContent: 'center' }}><svg xmlns="http://www.w3.org/2000/svg" height="calc(5px + 5vmin)" viewBox="0 -960 960 960" width="calc(5px + 5vmin)" fill=" #000000ff"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg><div className="font-md">{pathname}</div></div></div></div>
                </div>)

        } else { set_dynamics_portal_ab(null) }

        set_top_bar_(<Topbar
            l={
                <h4 className="mg0 font900 font-lg" style={{ fontSize: '1.25rem' }}>Food<span>99</span></h4>
            }

            r={
                <>

                    <div className="df aic gap05 wfp">
                        <style>{`
                                    .dropdowneffect{
                                    overflow:hidden;
                                    transition:all 1s;
                                    animation:a_dropdowneffect 0.15s linear;
                                    }
                                    @keyframes a_dropdowneffect{
                                    0%{
                                    top:-50px;
                                    }
                                    100%{
                                    top:0px;
                                    }
                                    }
                                    `}</style>

                        <div className="df aic wfp gap05" style={{ justifyContent: 'flex-end' }}>
                            {usr?.username ? <span className="df aic fx1 oh font-sm gap02  bdrds bd" style={{ color: 'black' }}>
                                <span className="pdl05 pdr03 pdt02 xfg"><MapPinHouse /></span>
                                <span className="oh font08 font600" style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}><span className="font900">Home:</span> Sigra abc colony, Varanasi 221010</span>
                            </span> : <Link href="/login"><span className="oh font600 font-md bdrds bd pdx06 pdy02 gap03" style={{
                                color: '#ffffff',
                                background: '#000000',
                                borderColor: 'black'
                            }}>Login</span></Link>}
                            <svg version="1.1" id="Capa_1" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.532 45.532" stroke="#ffffff" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"></path> </g> </g></svg>
                        </div>
                    </div>
                </>
            }
        />)

    }, [device, search_mode, pathname, usr])

    const searchTexts = [
        "Pizza..",
        "Burgers..",
        "Panner handi.."
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Set up the interval to change text every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % searchTexts.length);
        }, 2000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <>
            {device === "mobile" &&


                <div className="df fd-c pdy09 pdx1 gap1"
                // style={{ background: '#b1261cff', color:'white' }}  
                >
                    {top_bar_}
                    <div className="df aic gap03 pdy05 bd bdTrds bdBrds pdl05" onClick={() => set_search_mode(true)}>
                        <span className="df aic xfg pdx02 pdy02" style={{ background: '#ffffffff' }} ><Search /></span>
                        <style>{`.search-animation-container {

    overflow: hidden;
}

.search-animation-inner {
    height: 24px; /* adjust as needed */
}

.search-item {
    position: absolute;
    width: 100%;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
}

.search-item.active {
    opacity: 1;
    transform: translateY(0);
}
`}</style>

                        <div className="wfp df aic gap03" >
                            <span>Search </span> 

                            <div className="search-animation-inner">
                                {searchTexts.map((text, i) => (
                                    <div
                                        key={i}
                                        className={`search-item ${i === currentIndex ? 'active' : ''}`}
                                    >
                                         {text}
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>

            }

            {device === "pc" && <Topbar
                l={
                    <h4 className="mg0 font-sm font-lighter font-lg">Vns Pizza</h4>
                }
                m={
                    <span className="df aic pdy05 pdx1 bd bdrds wfc gap03" style={{
                        borderColor: '#dbdbdb', width: '100%', minWidth: 'max-content',
                        maxWidth: '25rem', borderRadius: '5px',
                        boxShadow: '2px 2px 3px 1px #eeeeee'
                    }}><svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 -960 960 960" width="1.25rem" fill="#8BC34A"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg><span className="font-sm">Search your daily needs here...</span></span>
                }

                r={
                    <>
                        <div className="df gap03 oh mgx1" style={{ alignItems: 'flex-end', whiteSpace: 'nowrap', maxWidth: '320px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-440h80v-110h80v110h80v-190l-120-80-120 80v190Zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" style={{ fontWeight: '900', borderColor: 'black' }} onClickCapture={(e) => toogle_topbar_nav('address_')} id="address" /></svg>
                            <span>Home: Sigra abc colony, Varanasi 221010</span>
                        </div>
                        <div className="df aic gap1">
                            <div className="__menu_items" style={{
                                fontWeight: '900',
                                paddingInline: '5px',
                                paddingBlock: '5px',
                                background: 'whitesmoke',
                                boxShadow: '0 0 3px 0px lightgray'
                            }} onClickCapture={(e) => toogle_topbar_nav('buy_again_')} id="buy-again"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg></div>

                            <div className="pR">
                                <div className="__menu_items bd" style={{
                                    fontWeight: '900',
                                    paddingInline: '5px',
                                    paddingBlock: '5px',
                                    background: 'whitesmoke',
                                    boxShadow: '0 0 3px 0px lightgray'
                                }} onClickCapture={(e) => dynamic(() => import('./cart'), { ssr: 'false', loading: () => <p>Loading</p> })} id="cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                                </div>
                                <span className="pA" style={{
                                    top: '-2px',
                                    right: '0px',
                                    background: '#FFC107',
                                    paddingInline: '4px',
                                    borderRadius: '10px',
                                    fontSize: '11px',
                                    border: '1px solid navy'
                                }}
                                >{cart_}</span></div>

                            <div className="pR">
                                <div className="__menu_items bd" style={{
                                    fontWeight: '900',
                                    paddingInline: '5px',
                                    paddingBlock: '5px',
                                    background: '#f1f8e9',
                                    boxShadow: '0 0 3px 0px lightgray'
                                }} onClickCapture={(e) => toogle_topbar_nav('cart_')} id="cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8bc34a"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" /></svg>
                                </div></div>


                            <a className="__menu_items bd" style={{ borderColor: 'orangered', borderStyle: 'dashed', color: 'orangered', background: 'antiquewhite' }} onClickCapture={(e) => toogle_topbar_nav('buy_again_')}><div>Coupons</div></a>
                            <span className="df" id="account_" title="Account" onClickCapture={(e) => toogle_topbar_nav('account_')} style={{ "--local-ht-color": "white" }} >
                                <svg className="native-btn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                            </span>
                        </div>
                    </>
                }
            />}
        </>
    )
}


