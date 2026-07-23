'use client';
import Topbar from "../topbar/bar"
import { useContext, useEffect, useState } from "react";
import { Search, Mic, ChevronDown, House, Bell, Camera, MessageCircleIcon, Store, LogIn } from 'lucide-react';
import { dynamic_ } from "../main-context";

import Link from "next/link";
import { Icon } from "../lib/icons";
import Image from "next/image";
import DropDown_1, { DropDown_2, MoreOptions } from "../seller-cpmt/widget";
import { useSearchParams } from "next/navigation";

export default function Topbar_() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { device, user } = useContext(dynamic_);
    const [search_mode, set_search_mode] = useState(false)
    const [searchText, set_searchText] = useState("")

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
    const lang__ = [
        'English (US)',
        'English (UK)',
        'Chinese',
        'Hindi',
        'Poland'
    ]

    const Mystore__ = [
        { name: "Todays's Leads", path: "sellers/seller_lead" },
        { name: "Messages", path: "sellers/seller_msg" },
        { name: "Stocks", path: "sellers/seller_lead" },
        { name: "Enquires", path: "sellers/seller_lead" },
        { name: "Products", path: "sellers/seller_prod" },
        { name: "Manage", path: "sellers/seller_dsbd" },
    ]

    const pathname = useSearchParams();
    const p = pathname.get("p");
    const f = pathname.get("f");


    const [s_, set_s_] = useState(p ? p : "")

    useEffect(() => {
        if (p === searchText || searchText.length === 0) set_search_mode(false);
        if (p !== searchText && searchText.length > 0) set_search_mode(true);
        set_searchText(s_);


    }, [searchText, s_])

    //     useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex(prev => (prev + 1) % 3);
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, [device==="mobile"]);

    const [search_for, set_search_for] = useState('All')
    useEffect(() => {
        let a = document.getElementById('search-for')?.getAttribute('workingtitle')
        console.log(a, search_for)
    }, [search_for])


    return (
        <>
            {/* {console.log("USER", user)} */}
            <style>{`
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

            {device &&

                <header className="font-['Inter', sans-serif] border-b pS z-[500] bg-black" style={{ top: 0, background: 'linear-gradient(45deg, #3F51B5, #673AB7)_' }}>

                    {/* Top Row - Brand, Search, Actions */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 md:px-8 md:px-5">

                        {/* Brand */}
                        <Link href="/"><div className="text-2xl font-black tracking-wider_ text-white">
                            Trade<span className="text-[aqua]">B2B</span>
                        </div></Link>

                        {/* Search Box: Bright White for High Visibility */}
                        <div className={`flex-grow w-full md:w-auto md:min-w-[400px] lg:min-w-[500px] pR bg-white border border-purple-400 rounded-lg md:rounded-sm`}>

                            <div className={`df`}>

                                <span className={`df aic gap-1 px-2 text-black  border-r transition duration-100 ${search_mode ? '' : 'bg-[chocolate]_'} rounded-l-lg`}>


                                    <DropDown_2 static_title={true} title={'All'} flowData={['All', 'Electronics', 'Home Decors']} className={"text-sm font500 transition duration-100 "} id="search-for" call_update={set_search_for} />
                                    {/* <ChevronDown size={14} /> */}

                                </span>

                                <div className="df fd-c fx1">

                                    <div className={`flex items-center gap-2.5 p-1 pl-0 ml-2 fx1 pR`} >
                                        <Search size={20} className="text-gray-800" />
                                        <input
                                            placeholder="Search sellers • products • distributors"
                                            className="border-none bg-transparent text-gray-900 fx1 outline-none placeholder-gray-500 text-sm"
                                            id="search-input_main"
                                            value={s_}
                                            onChange={(e) => {
                                                // set_searchText(e.target.value) 
                                                set_s_(e.target.value)
                                            }}
                                        />
                                        <div className="df aic gap-4 mgr02 text-[#414141ff]">
                                            <span className="df cursor-pointer bdrds pd01 hover:bg-gray-200" style={{ visibility: searchText === "" && 'hidden' }} onClick={(e) => { document.querySelector('#search-input_main').value = ""; set_s_("") }}><Icon.close s={20} fill="#414141ff" /></span>
                                            <div className="df aic gap-3 text-[#414141ff] bdrds pdy02 pdx05 bg-[aliceblue]">
                                                <span className="df aic cursor-pointer hover:text-[#F97316]" ><Mic size={22} className="mgx05_" fill="currentcolor" stroke="aliceblue" /></span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="pR">

                                        {search_mode &&
                                            <div className="pA w-full top-[-5px] oh text-black xbg z-50 bdBrds shadow-md">
                                                <div className="pR mt-1 text-sm">
                                                    <div className="fd fd-c w-full pR text-sm pdb03 pdx04" >
                                                        <Link href={`/s?p=${searchText}&tag=${"search"}&f=${search_for}&ref=${"tradeb2b-home"}`} onClick={() => set_search_mode(false)}>
                                                            <div className="df jcsb px-3 py-1 hover:bg-gray-100 hover:text-black rounded-md">
                                                                <div className="df gap05"><span>{searchText}</span></div>

                                                            </div>
                                                        </Link>
                                                        <div className="df jcsb px-3 py-1 hover:bg-gray-100 hover:text-black rounded-md">
                                                            <div className="df gap05"><span>Helsd</span></div>
                                                        </div>
                                                        <div className="df jcsb px-3 py-1 hover:bg-gray-100 hover:text-black rounded-md">
                                                            <div className="df gap05"><span>Helsd</span></div>
                                                        </div>
                                                        <div className="df jcsb px-3 py-1 hover:bg-gray-100 hover:text-black rounded-md">
                                                            <div className="df gap05"><span>Helsd</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="df aic jcsb bdt pdx08 pdy05 font08">
                                                        <span className="text-gray-500"><i>Categories:</i><span className={`mgl03 font07 font500 transition duration-100 text-[black] ${search_mode && 'bg-gray-300 pdy01'}`} style={{
                                                            paddingInline: search_mode && '6px',
                                                            borderRadius: '5px'
                                                        }}
                                                        >{search_for}</span></span>
                                                        <span className="text-xs text-gray-400"><i>**Search Suggestions</i></span>
                                                    </div>
                                                </div>
                                            </div>

                                        }
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Actions: Utility Links & Primary CTAs */}

                        {device==="pc"&&<div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">

                            {/* Utility Links (Track Shipment, RFQ, Messages) */}
                            {[{ e: <span className="border rounded-full p-1 df border-[aqua]_ text-black_ bg-white_"><Bell size={18} /></span>, href_: '#' }, { e: 'Events', href_: '#' }, { e: <span className="df gap-1 aic"><MessageCircleIcon size={20} />Messages</span>, href_: 'messages' }].map((b, i) => (
                                <Link href={b.href_} key={i} className="text-gray-200 transition-colors hover:text-[#F97316] text-sm font-medium whitespace-nowrap px-2 py-1">
                                    {b.e}
                                </Link>
                            ))}

                            {/* Primary CTA: Cart (Vibrant Orange Background) */}
                            <Link className="flex items-center bg-[#F97316]_ text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors hover:bg-[#FF9900] shadow-lg_ whitespace-nowrap" href={user?.username ? "/cart" : "login"}>
                                <ShoppingCartIcon />
                                Cart
                            </Link>

                            {/* Secondary CTA: Account (Bordered White) */}
                            <Link className={`bg-blue-800 flex items-center border border-white/30 text-white text-sm font-bold ${user?.username ? "px-4 py-2" : "px-3 py-1"} rounded-lg transition-colors hover:bg-blue-600 whitespace-nowrap`} href={user?.username ? "/account" : "login"}>
                                {user?.username ? <><UserIcon />Account</> : <><LogIn size={20} className="mr-1" />Login</>}
                            </Link>
                        </div>}
                    </div>


                    {/* Categories Bar (Mega Menu) */}
                    <div className="df jcsb aic_ bg-white/10 text-white bg-white_ md:gap-2 px-4 md:px-2 py-1 border-t border-gray-700/50 text-sm mt-5">
                        <div className="fx1 overflow-x-auto flex sbt justify-center md:justify-start gap-4 text-sm ">
                            {categories.map((cat, index) => (
                                // Group container for hover effect
                                <div key={index} className="group relative py-1_ px-1 cursor-pointer">
                                    <div className="opacity-95 transition-all group-hover:opacity-100 group-hover:text-[#F97316] font500 text-sm">
                                        {cat.name}
                                    </div>

                                    {/* Mega Menu Dropdown */}
                                    <div className="mega absolute top-full pt-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 hidden group-hover:block bg-[#1E293B] p-3 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                                        {cat.sub.map((item, subIndex) => (
                                            <span key={subIndex} className="block text-gray-300 py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {categories.map((cat, index) => (
                                // Group container for hover effect
                                <div key={index} className="group relative py-1_ px-1 cursor-pointer">
                                    <div className="opacity-95 transition-all group-hover:opacity-100 group-hover:text-[#F97316] font500 text-sm">
                                        {cat.name}
                                    </div>

                                    {/* Mega Menu Dropdown */}
                                    <div className="mega absolute top-full pt-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 hidden group-hover:block bg-[#1E293B] p-3 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                                        {cat.sub.map((item, subIndex) => (
                                            <span key={subIndex} className="block text-gray-300 py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {user && <div className="df aic gap-3 pl-2 border-l">
                            <span className="cursor-pointer pdy01 hover:bg-[#37474F]_" style={{ borderRadius: '5px' }}>Hi, {user.username}</span>

                            {user.user_type === 'seller' ? <div className="pR  group cursor-pointer bg-[#05487d] text-white pdx05 pdy01 hover:bg-[#37474F]_">
                                <Link href="/sellers/seller_dsbd" className="df aic gap01 " style={{ borderRadius: '5px' }}>My Store<ChevronDown size={14} />
                                </Link>

                                {/* Mega Menu Dropdown */}
                                <div className="pA left-[calc(100%-180px)]">
                                    <div className=" pR top-full mt-3    md:translate-x-0 hidden group-hover:block bg-[white] p-3 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                                        {Mystore__.map((item, subIndex) => (
                                            <Link href={`/${item.path}`} key={subIndex} className="block text-[black] py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-100 text-[0.85rem] font-normal">
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div></div>
                            </div> :
                                <Link href="signup/X1_unq"><span className="df aic gap-1"><Store size={16} />Become a Seller</span></Link>}

                            <div className="pR  group cursor-pointer pdy01 hover:bg-[#37474F]_">
                                <span className="df aic gap01 " style={{ borderRadius: '5px' }}>En<ChevronDown size={14} />
                                </span>

                                {/* Mega Menu Dropdown */}
                                <div className="pA left-[calc(100%-180px)]">
                                    <div className=" pR top-full mt-3    md:translate-x-0 hidden group-hover:block bg-[white] p-3 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                                        {lang__.map((item, subIndex) => (
                                            <span key={subIndex} className="block text-[black] py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                                                {item}
                                            </span>
                                        ))}
                                    </div></div>
                            </div>

                        </div>}
                    </div>
                </header>
            }
        </>
    )
}


