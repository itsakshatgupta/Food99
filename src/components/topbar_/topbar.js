'use client';
import Topbar from "../topbar/bar"
import { useContext, useEffect, useState } from "react";
import { Search, Mic, ChevronDown, House, ArrowLeft, Filter, TrendingUp, ExternalLink, LucideHistory, ShoppingBag, Bell, UserCircle, UserCircle2, SearchIcon, MessageSquare, Camera } from 'lucide-react';
import { dynamic_ } from "../main-context";
import dynamic from "next/dynamic";

import Portal_Ab from "../main_portal/main_protol_ab";
import Account from "./account";
import BuyAgain from "./buyAgain";
import Address from "./address";
import Cart from "./cart";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "../lib/icons";
import Image from "next/image";
export default function Topbar_() {
    const { device, set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab, cart_, usr } = useContext(dynamic_);
    const [search_mode, set_search_mode] = useState(false)
    const [top_bar_, set_top_bar_] = useState(null)
    const pathname = usePathname()
    const [searchText, set_searchText] = useState("")


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
                <div className="hfp oy">
                    <style>{`
                               .dropdowneffect{
                               overflow:hidden;
                               transition:all 1s;
                               animation:a_dropdowneffect 0.15s linear;
                               }
                               @keyframes a_dropdowneffect{
                               0%{
                               position:relative;
                               top:-50px;
                               }
                               100%{
                               position:relative;

                               top:0px;
                               }
                               }
                               `}</style>
                    <div className="df aic pd08 gap1 xbg dropdowneffect pS" style={{ boxShadow: '0 0 5px 1px #a7a7a7ff', top: 0 }}
                    //  Jng
                    >

                        <span className="df aic" onClick={() => set_search_mode(false)}><ArrowLeft /></span>

                        <div className="df aic gap05 wfp fx1">
                            <div className="df aic gap03 pdy06 bd bdrds pdl05 xbg wfp xbg" onClick={() => set_search_mode(true)} style={{ borderColor: '#6e70faff', color: 'black', borderWidth: '2px', background: '#ffffffff' }}>
                                <span className="df aic pdx02 pdy02" ><Search /></span>
                                <style jsx>{`
                            .focus-border{
                            border:2px solid black !important;
                            }
                            `}</style>
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
                                <div className="fx1 df aic gap03 " style={{ borderColor: '#323232' }}>
                                    <input type="text" autoFocus="true" placeholder="Search dishes, food.." className="wfp bdn font1 font600" id="search-input" style={{ outline: 'none', background: 'transparent' }} onChange={(e) => set_searchText(e.target.value)} />
                                </div>
                                <span className="df" style={{ visibility: searchText === "" && 'hidden' }} onClick={(e) => { document.querySelector('#search-input').value = ""; set_searchText("") }}><Icon.close fill="#414141ff" /></span>
                                <span className="df aic pdx051 pdy02 mgr02" ><Mic size={22} className="mgx05" /></span>
                            </div>
                        </div>

                    </div>
                    <div className="hfp" style={{ background: !searchText && "#f2f2ffff" }}>

                        {searchText ? <>
                            <div className="df aic pdx05 pdt08 font-sm font500 gap05 ox " style={{ scrollbarWidth: 'none' }}>
                                <span className="df aic"><Filter size={15} /> Filters</span> |
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                                <span className="bdArds font600 pdy04 pdx05 font08 xfg" style={{ textWrap: 'nowrap', borderColor: 'black' }}>Price below 200</span>
                            </div>
                            <div className="df fd-c">
                                <div className="df aic gap05 pdx05 pdy2 bdb"><Search /><div className="font600">{searchText}<span className="font700" style={{ color: '#6e70faff' }}> See all result</span></div></div>
                            </div>
                        </> :
                            <>

                                <div className="pdt1 pS" style={{ top: '79.16px', background: !searchText && "#f2f2ffff" }}><span className="font600 font-sm tac df aic gap01 pdx05 oh"> <LucideHistory size={20} /> Recent Searches
                                </span><div className="df aic ox pdx08 pd1 sbn"><div className="df gap1"><span className="bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={48}
                                    height={48}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span><span className=" bdArds gap03 pdy3 df jcc aic fd-c" style={{ width: '90px', height: '80px', background: 'white', boxShadow: '2px 2px 4px 1px #bbbbbb' }}><Image
                                    src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                    width={50}
                                    height={50}
                                    alt='food'
                                /><span className="font08 font600">Thali</span></span></div></div></div>

                                <div className="df fd-c bdTrds bd xbg pR oy" style={{ zIndex: 1, height: 'calc(100vh - 79.16px)' }}>

                                    <span className="pd05 font500 font-sm" style={{ color: 'gray' }}>Suggestions</span>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>
                                    <div className="df aic gap05 pdx05 pdy1 bdb" style={{ paddingBlock: '1.5rem' }}><Search size={22} style={{ alignSelf: 'start' }} />
                                        <div className="font600 fx1"><div className="font1 font600">Panner Handi</div><div className="df aic font08 gap03 mgt03" style={{ color: 'green' }}><TrendingUp size={15} /> Trending</div></div><span className="df mgr05 aic gap1" style={{ float: 'right' }}>                                <Image
                                            src={"/static-img/indian-cuisine-at-a-thali_59246817.png"}
                                            width={48}
                                            height={48}
                                            alt='food'
                                        />
                                            <ExternalLink color="gray" size={20} />
                                        </span></div>

                                </div>

                            </>
                        }

                    </div>
                </div>
            )

        } else { set_dynamics_portal_ab(null); set_searchText(""); }

        set_top_bar_(<Topbar
            l={<div className="font06 font700">
                <h4 className="mg0 font900 font-lg" style={{ fontSize: '1.25rem' }}>Yggimy</h4>
                Food AttheRate
            </div>
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
                            {usr ?
                                <Link href="/account/address_book" className="oh bd bdArds pd04  font06 font600 df fd-c" style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', background: 'linear-gradient(45deg, #e8ebf7c0, #e9e9e9ff)' }}>
                                    <span className="font900 font09 df aic"><House className="pdx01" size={18} fill="black" />Home<ChevronDown size={15} /></span> Sigra abc colony, Varanasi 221010
                                </Link>

                                : <Link href="/login" className="oh font600 font-md bdrds bd pdx08 pdy02 gap03" style={{
                                    color: '#673AB7',
                                    background: '#EDE7F6'
                                }}>Login</Link>}
                            {usr && <Link href="/account" className="df aic fd-c font07 font600 gap01"> <svg version="1.1" id="Capa_1" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.532 45.532" stroke="#000000ff" fill="black"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"></path> </g> </g></svg> You</Link>}
                        </div>
                    </div>
                </>
            }
        />)


    }, [device, search_mode, pathname, usr])
    const SearchIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
    );

    // Shopping Cart Icon
    const ShoppingCartIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
    );

    // User/Account Icon
    const UserIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    // --- Data ---
    const categories = [
        {
            name: "Hardware",
            sub: ["Hand Tools", "Power Tools", "Fasteners"],
        },
        {
            name: "Electricals",
            sub: ["Cables", "Switchgear", "Lighting"],
        },
        {
            name: "Chemicals",
            sub: ["Solvents", "Adhesives", "Industrial Oils"],
        },
        {
            name: "PPE",
            sub: ["Gloves", "Helmets", "Safety Shoes"],
        },
    ];

    useEffect(() => {
        if (searchText.length > 0) {
            set_search_mode(true);
        } else {
            set_search_mode(false);
        }

    }, [searchText])
    return (
        <>   <style>{`
                               .dropdowneffect{
                               overflow:hidden;
                               transition:all 1s;
                               animation:a_dropdowneffect 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                               }
                               @keyframes a_dropdowneffect{
                               0%{
                               top:-100px;
                               }
                               100%{
                               top:0px;
                               }
                               }
                               `}</style>
            {device === "mobile" &&


                <Topbar
                    l={<div className="font06 font700">
                        <h4 className="mg0 font900 font-lg" style={{ fontSize: '1.25rem' }}>Yggimy</h4>
                        Food AttheRate
                    </div>
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
                                    {usr ?
                                        <Link href="/account/address_book" className="oh bd bdArds pd04  font06 font600 df fd-c" style={{ width: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', background: 'linear-gradient(45deg, #e8ebf7c0, #e9e9e9ff)' }}>
                                            <span className="font900 font09 df aic"><House className="pdx01" size={18} fill="black" />Home<ChevronDown size={15} /></span> Sigra abc colony, Varanasi 221010
                                        </Link>

                                        : <Link href="/login" className="oh font600 font-md bdrds bd pdx08 pdy02 gap03" style={{
                                            color: '#673AB7',
                                            background: '#EDE7F6'
                                        }}>Login</Link>}
                                    {usr && <Link href="/account" className="df aic fd-c font07 font600 gap01"> <svg version="1.1" id="Capa_1" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.532 45.532" stroke="#000000ff" fill="black"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"></path> </g> </g></svg> You</Link>}
                                </div>
                            </div>
                        </>
                    }
                />
            }

            {device === "pc" &&

                <header className="bg-[#0F172A] text-white font-['Inter', sans-serif] border-b border-gray-700/50 shadow-xl pS z-[500]" style={{ top: 0 }}>

                    {/* Top Row - Brand, Search, Actions */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:px-6">

                        {/* Brand */}
                        <div className="text-2xl font-black tracking-wider text-[#F97316] hover:text-[#FF9900] transition duration-200">
                            Yggimy
                        </div>

                        {/* Search Box: Bright White for High Visibility */}
                        <div className={`flex-grow w-full md:w-auto md:min-w-[400px] lg:min-w-[500px] pR ${search_mode && 'bdTrds xbg_'} `}>
                            <div className={`df oh xbg $ ${search_mode ? ' bdTrds ' : 'shadow-md rounded-lg '}`}>
                                <span className={`df aic pdx07 text-black transition duration-100 gap-1 ${search_mode ? '' : 'bg-[chocolate]'}`}>
                                    {!search_mode ? <>
                                    <Search size={20}/>
                                        <span className={`bg-[; text-xs font500 transition duration-100 ${search_mode && 'bg-[black] text-[white] pdy02'}`} style={{
                                            paddingInline: search_mode && '10px',
                                            borderRadius: '5px'
                                        }}
                                        >All</span>
                                    </>:<Search size={20} stroke="orangered"/>
                                    }
                                </span>
                                <div className={`flex items-center gap-2.5 p-2.5 fx1 ${search_mode&&'pdl0'}`} >
                                    <input
                                        placeholder="Search sellers • products • distributors"
                                        className="border-none bg-transparent text-gray-900 fx1 outline-none placeholder-gray-500 text-sm"
                                        id="search-input_main"
                                        onChange={(e) => { set_searchText(e.target.value) }}
                                    />
                                    <div className="df aic gap-4 mgr02 text-[#414141ff]">
                                        <span className="df bdrds pd01 hover:bg-gray-200" style={{ visibility: searchText === "" && 'hidden' }} onClick={(e) => { document.querySelector('#search-input_main').value = ""; set_searchText("") }}><Icon.close s={20} fill="#414141ff" /></span>
                                        <div className="df aic gap-3 text-[#414141ff] bdrds pdy02 pdx05 bg-[aliceblue]">
                                            <span className="df aic hover:text-[#F97316]" ><Mic size={22} className="mgx05_" fill="currentcolor" stroke="aliceblue" /></span><span className="df aic hover:text-[#F97316]" ><Camera size={22} fill="currentcolor" stroke="aliceblue" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {search_mode &&
                                <div className="pA w-full  z-[1000] oh text-black xbg z-50 bdBrds shadow-md">
                                    <div className="pR dropdowneffect">
                                    <div className="fd fd-c w-full pR text-sm pdb03 pdx04 dropdowneffect_ bdBrds" >
                                        <div className="df jcsb pd05 hover:bg-gray-100 hover:text-black bdrds">
                                            <div className="df gap05"><span><Search size={18} /></span><span>{searchText}</span></div>
                                        </div>
                                        <div className="df jcsb pd05 hover:bg-gray-100 hover:text-black bdrds">
                                            <div className="df gap05"><span><ExternalLink size={18} /></span><span>Helsd</span></div>
                                        </div>
                                        <div className="df jcsb pd05 hover:bg-gray-100 hover:text-black bdrds">
                                            <div className="df gap05"><span><ExternalLink size={18} /></span><span>Helsd</span></div>
                                        </div>
                                        <div className="df jcsb pd05 hover:bg-gray-100 hover:text-black bdrds">
                                            <div className="df gap05"><span><ExternalLink size={18} /></span><span>Helsd</span></div>
                                        </div>
                                    </div>
                                   <div className="df aic jcsb bdt pdx08 pdy05 font08">
                                        <span className="text-gray-500"><i>Categories:</i><span className={`mgl03 font07 font500 transition duration-100 text-[black] ${search_mode && 'bg-gray-300 pdy01'}`} style={{
                                            paddingInline: search_mode && '6px',
                                            borderRadius: '5px'
                                        }}
                                        >All</span></span>
                                        <span className="text-xs text-gray-400"><i>**Search Suggestions</i></span>
                                    </div>
                                    </div>
                                </div>

                            }
                        </div>

                        {/* Actions: Utility Links & Primary CTAs */}
                        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end">

                            {/* Utility Links (Track Shipment, RFQ, Messages) */}
                            {['track Shipment', 'RFQ', 'Messages'].map((b, i) => (
                                <button key={i} className="text-gray-300 transition-colors hover:text-[#F97316] text-sm font-medium whitespace-nowrap px-2 py-1">
                                    {b}
                                </button>
                            ))}

                            {/* Primary CTA: Cart (Vibrant Orange Background) */}
                            <button className="flex items-center bg-[#F97316] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors hover:bg-[#FF9900] shadow-lg whitespace-nowrap">
                                <ShoppingCartIcon />
                                Cart
                            </button>

                            {/* Secondary CTA: Account (Bordered White) */}
                            <button className="flex items-center border border-white/30 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors hover:bg-white/10 whitespace-nowrap">
                                <UserIcon />
                                Account
                            </button>
                        </div>
                    </div>

                    {/* Categories Bar (Mega Menu) */}
                    <div className="bg-[#1E293B] flex flex-wrap justify-center md:justify-start gap-4 md:gap-2 px-4 md:px-6 py-1 border-t border-gray-700/50 text-sm">
                        {categories.map((cat, index) => (
                            // Group container for hover effect
                            <div key={index} className="group relative py-1 px-1 cursor-pointer">
                                <div className="opacity-95 transition-all group-hover:opacity-100 group-hover:text-[#F97316] text-xs font500">
                                    {cat.name}
                                </div>

                                {/* Mega Menu Dropdown */}
                                <div className="mega absolute top-full mt-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 hidden group-hover:block bg-[#1E293B] p-3 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                                    {cat.sub.map((item, subIndex) => (
                                        <span key={subIndex} className="block text-gray-300 py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </header>
            }
        </>
    )
}


