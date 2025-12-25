'use client';
import Seller_Page_Header from "@/components/seller-cpmt/header";
import { ArrowRight, Bold, ChevronDown, FormInput, Home, Image, Italic, MapPin, Minus, Paintbrush2, Plus, RefreshCw, Search, Underline, Users } from "lucide-react";
import ViewCustomer from "../view/view-subpages/buyer";
import { useEffect, useState } from 'react';
import { fetchAPI } from "@/app/(api)/api";

// Mock Data representing the Distributor's Active Retail Partners
const MOCK_PARTNERS = [
    { id: 1, name: "City Hardware Retail", agreement: "Tier 1 Distributor", lastTrade: "2025-11-15", status: "Active", volume: 145000, orders: 345, contractId: "D-4890", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
    { id: 2, name: "Midwest Building Supply", agreement: "Tier 2 Retailer", lastTrade: "2025-12-01", status: "Active", volume: 82000, orders: 150, contractId: "R-9342", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
    { id: 3, name: "Zeta E-Commerce Solutions", agreement: "Tier 1 Retailer", lastTrade: "2025-10-20", status: "Active", volume: 210000, orders: 450, contractId: "R-0012", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
    { id: 4, name: "North Star Logistics", agreement: "Inactive", lastTrade: "2025-08-01", status: "On Hold", volume: 12000, orders: 20, contractId: "L-2019", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
];

export default function SearchManagePage() {
    const [SEARCH, setSearch] = useState(null)

    useEffect(() => {
        async function getting_fresh_Search() {
            const res = await fetchAPI("users/search_", "GET", false, true)
            setSearch(res)
        }
        getting_fresh_Search()
    }, [])

    return (

        <div className="df fd-c hfp">
            <Seller_Page_Header pageTitle={"Search"} newRow__={<div className="border-b_ h-[2rem]_ df aic p-2 text-sm gap-2 jcsb max-w-[35rem] ml-3">
                <div className="df aic gap-1 rounded-md bg-white fx1 px-2 py-1.5 min-w-6 border border-gray-200  shadow-sm"><Search size={18} className="text-gray-500" /><div className="fx1">Search...</div><ArrowRight size={20} /></div>
            </div>} bg="#fbfbfb" />
            <div className="df fx1 oh">

                <div className="fx1 oh">
                    <div className="hfp bg-[#fbfbfb]_ oy p-3_ space-y-3 text-md">
                        {/* <ViewCustomer /> */}
                        <div>

                            <div className="df p-3"> <h1 className="fx1 text-gray-800">Search result</h1> <span className=" text-xs df aic gap-1 mr-3">Sort<ChevronDown size={14} fill="black" stroke="none" /></span><span className=" text-xs df aic gap-1 ">Filter<ChevronDown size={14} fill="black" stroke="none" /></span></div>

                            <div className="fx1 bg-[#fbfbfb]_ oy mt-3 space-y-4 text-md px-1">
                                {SEARCH?.map(v =>
                                    <div className="hover:bg-[#fbfbfb] cursor-pointer px-3 border_ rounded-lg border-blue-400 space-y-1">
                                        <h1 className="text-blue-600 font-semibold">{v.user.username}</h1>
                                        <div className="text-green-600 text-sm">Bussniess Type: <span className="font-semibold">{v.business_type}</span></div>
                                        <div className="text-sm text-gray-600 text-sm">{v.description}</div>
                                        <div className="df aic  gap-3 text-xs"><span className="df aic gap-1"><MapPin size={12} />{v.user.location}</span><div>{v.interested_categories.map(t => <span className="px-2 bg-gray-100">{t}</span>)}</div></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}