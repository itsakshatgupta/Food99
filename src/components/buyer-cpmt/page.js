'use client';
import { Camera, ChevronDown, Mic, Search, ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "../lib/icons";

export function PageHeader({ title, links = [{ e: null, href_: null }] }) {
    const pathname = usePathname()
    const [search_mode, set_search_mode] = useState(false)
    const [searchText, set_searchText] = useState("")

    useEffect(()=>{
        if(searchText){
            set_search_mode(true);
        }else{
            set_search_mode(false);
        }
    },[searchText])

    return (
        <header className="font-['Inter', sans-serif] border-b pS z-[500]" style={{ top: 0, background: 'linear-gradient(45deg, #3F51B5, #673AB7)' }}>

            {/* Top Row - Brand, Search, Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 md:px-6">

                {/* Brand */}
                <div className="fx1 df aic gap-5">
                    <div className="text-2xl font-black tracking-wider_ text-white hover:text-[#FF9900] transition duration-200">
                        Trade<span className="text-[aqua]">B2B</span><span className=" ml-1 text-lg text-blue-300">{title}</span>
                    </div>

                    {/* Search Box: Bright White for High Visibility */}
                    {!title&&<div className={`flex-grow w-full max-w-[200px] md:w-auto md:min-w-[400px] lg:min-w-[500px] pR bg-white border border-purple-400 rounded-lg`}>

                        <div className={`df`}>

                            <span className={`df aic gap-1 px-2 text-black  border-r transition duration-100 ${search_mode ? '' : 'bg-[chocolate]_'} rounded-l-lg`}>


                                <span className={`text-sm font500 transition duration-100 `}
                                >All</span>
                                <ChevronDown size={14} />

                            </span>

                            <div className="df fd-c fx1">

                                <div className={`flex items-center gap-2.5 p-1 pl-0 ml-2 fx1 pR`} >
                                    <Search size={20} className="text-gray-800" />
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
                                <div className="pR">

                                    {search_mode &&
                                        <div className="pA w-full top-[-5px] oh text-black xbg z-50 bdBrds shadow-md">
                                            <div className="pR mt-1 text-sm">
                                                <div className="fd fd-c w-full pR text-sm pdb03 pdx04" >
                                                    <div className="df jcsb px-3 py-1 hover:bg-gray-100 hover:text-black rounded-md">
                                                        <div className="df gap05"><span>{searchText}</span></div>
                                                    </div>
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
                                                    >All</span></span>
                                                    <span className="text-xs text-gray-400"><i>**Search Suggestions</i></span>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                </div>
                            </div>

                        </div>

                    </div>}
                </div>
                {/* Actions: Utility Links & Primary CTAs */}
                <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">

                    {/* Utility Links (Track Shipment, RFQ, Messages) */}
                    {links && links.map((b, i) => (
                        <Link href={b.href_} key={i} className="text-gray-200 transition-colors hover:text-[#F97316] text-sm font-medium whitespace-nowrap px-2 py-1">
                            {b.e}
                        </Link>
                    ))}

                </div>
            </div>
        </header>
    )
}