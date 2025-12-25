'use client';
import Seller_Page_Header, { Basic_Page_Header } from "@/components/seller-cpmt/header";
import { ArrowRight, Bold, ChevronDown, Copy, Earth, FormInput, Headset, Home, Image, Italic, MapPin, MessageCircle, Minus, Paintbrush2, Plus, RefreshCw, Search, ShoppingBag, Underline, Users } from "lucide-react";
import ViewCustomer from "../view/view-subpages/buyer";
import MainSideNav, { MainSideNavButtons } from "@/components/seller-cpmt/main-side-nav";
import { useState } from "react";
import DropDown_1, { MoreOptions } from "@/components/seller-cpmt/widget";
import MessagePage from "./s-messages_manage";

// Mock Data representing the Distributor's Active Retail Partners
const MOCK_PARTNERS = [
    { id: 1, name: "City Hardware Retail", agreement: "Tier 1 Distributor", lastTrade: "2025-11-15", status: "Active", volume: 145000, orders: 345, contractId: "D-4890", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
    { id: 2, name: "Midwest Building Supply", agreement: "Tier 2 Retailer", lastTrade: "2025-12-01", status: "Active", volume: 82000, orders: 150, contractId: "R-9342", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
    { id: 3, name: "Zeta E-Commerce Solutions", agreement: "Tier 1 Retailer", lastTrade: "2025-10-20", status: "Active", volume: 210000, orders: 450, contractId: "R-0012", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
    { id: 4, name: "North Star Logistics", agreement: "Inactive", lastTrade: "2025-08-01", status: "On Hold", volume: 12000, orders: 20, contractId: "L-2019", location: 'UP-VNS', type: 'Distributor', Description: 'We are good and valuable bussniess that provide maximum...', tags: ['Delivery'] },
];

function ViewOrder() {
    const [view, setView] = useState("All Orders");

    const AllOrders = () => (
        <>
            <h1 className="text-gray-600 text-sm font-semibold px-1 mb-3"> (New)</h1>
            <div className="space-y-2_ grid grid-cols-3 gap-4 mx-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => <div className="border rounded-md border-gray-200 p-2 space-y-2 shadow-sm">
                    <div>
                        <div className="df aic jcsb mb-1">
                            <span className="df aic gap-1 text-md fx1"><Image size={20} />bussniess_name</span>
                            <MoreOptions y={true} viewOnHover={true} d="r"><div className="df aic gap-1 text-sm"><Headset size={18} />Help</div></MoreOptions>
                        </div>
                        <div className="px-1 text-xs text-gray-600 df aic jcsb"><span className="df aic gap-1">Order Id:123456<Copy size={12} /></span>11-21-2003</div>
                    </div>
                    <div className="px-2 py-1 text-gray-800 max-h-[10rem] oy sbn bg-gray-50 border_ rounded-sm mx-1 text-sm">
                        <table className="wfp">
                            <thead><th className="text-left">Items</th><th className="text-left">Quantity</th><th className="text-left">Price</th></thead>
                            <tbody>
                                <tr><td>Product A</td> <td>x 3</td> <td>$112</td> </tr>
                                <tr><td>Product B</td> <td>x 3</td> <td>$112</td> </tr>
                                <tr><td>Product C</td> <td>x 3</td> <td>$112</td> </tr>
                                <tr><td>Product D</td> <td>x 3</td> <td>$112</td> </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="df jcsb gap-3 px-2 text-sm"><span>Total</span><span className="font-semibold text-gray-800">~$448</span></div>
                    <div className="df aic gap-1">
                        <span className="py-0.5 px-3 bg-blue-50_ border_ rounded-lg border-blue-500 text-sm mx-1 text-white bg-green-800 cursor-pointer">Accept</span><span className="py-0.5 px-3 bg-gray-900 text-white border_ rounded-lg border-red-400 text-sm cursor-pointer">Decline</span></div>
                </div>)}
            </div>
        </>
    )

    const NewOrders = () => (
        <></>
    )
    const Accepted = () => (
        <></>

    )
    const Processing = () => (
        <></>

    )
    const Ready = () => (
        <></>

    )
    const Completed = () => (
        <></>

    )

    return (
        <div className="df fd-c p-2 hfp">
            <div className="text-md mb-1">Orders</div>
            <div className="df aic gap-3 text-sm mb-2  border-b py-0.5"><span className={`${view === "All Orders" ? "border-b-2 border-gray-800 text-gray-800" : "text-blue-600"} df aic gap-1 text-blue-600_  cursor-pointer`} onClick={() => setView("All Orders")}>All</span><span className={`${view === "New Orders" ? "border-b-2 border-gray-800 text-gray-800" : "text-blue-600"} df aic gap-1 text-blue-600_ cursor-pointer`} onClick={() => setView("New Orders")}>New</span><span className={`${view === "Accepted" ? "border-b-2 border-gray-800 text-gray-800" : "text-blue-600"} df aic gap-1 text-blue-600_ cursor-pointer`} onClick={() => setView("Accepted")}>Accepted</span><span className={`${view === "Processing" ? "border-b-2 border-gray-800 text-gray-800" : "text-blue-600"} df aic gap-1 text-blue-600_ cursor-pointer`} onClick={() => setView("Processing")}>Processing</span><span className={`${view === "Ready" ? "border-b-2 border-gray-800 text-gray-800" : "text-blue-600"} df aic gap-1 text-blue-600_ cursor-pointer`} onClick={() => setView("Ready")}>Ready</span><span className={`${view === "Completed" ? "border-b-2 border-gray-800 text-gray-800" : "text-blue-600"} df aic gap-1 text-blue-600_ cursor-pointer`} onClick={() => setView("Completed")}>Completed</span></div>
            <div className="fx1 border_ rounded-md oy">
                <h1 className="text-md">{view}</h1>
                {view === "All Orders" && AllOrders()}
                {view === "New Orders" && NewOrders()}
                {view === "Processing" && Processing()}
                {view === "Accepted" && Accepted()}
                {view === "Ready" && Ready()}
                {view === "Completed" && Completed()}

            </div>
        </div>
    )
}

function ViewPartner() {
    return (
        <div className="df border-r hfp">

            <div className="fx1 hfp border-r df fd-c p-2_">
                <div className="text-md df gap-5 jcsb_ aic border-b_ px-3 py-1 mb-3_ bg-blue-400_ bg-gray-800_ text-white_ "><h1 className="fx1_">Posts</h1><div className="df aic gap-1  text-sm text-gray-600 border py-0.5 pl-1 pr-3 rounded-md"><Search size={18} />Search anything from form...</div> <DropDown_1 title="Select Form" flowData={"Form"} /> <DropDown_1 title="Sort" flowData={"sort"} /></div>
                <div className="df items-start mt-0 rounded-md_ border-t border-gray-300 fx1 oy bg-gray-50_">
                    <table className="wfp fx1 text-sm">
                        <thead className="border-b border-purple-400_ bg-gray-800_ text-white_">
                            <th className="text-left px-3 py-1">Buyer</th>
                            <th className="text-left px-3 py-1">Type</th>
                            <th className="text-left px-3 py-1">Location</th>
                            <th className="text-left px-3 py-1">Trade Channel</th>
                            <th className="text-left px-3 py-1">Status</th>
                            <th className="text-left px-3 py-1">Timing</th>
                        </thead>
                        <tbody className="">
                            <tr className="text-sm cursor-pointer border-b last:border-b-0 hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 text-blue-600">---</td>
                                <th className="text-left px-3 py-1">Varanasi, U.P</th>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Delivery</td>
                                <td className="px-3 py-2">Fair</td>
                                <th className="text-left px-3 py-1">09:00-22:30</th>
                            </tr>
                            <tr className="text-sm cursor-pointer border-b last:border-b-0 hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 text-blue-600">---</td>
                                <th className="text-left px-3 py-1">Varanasi, U.P</th>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Delivery</td>
                                <td className="px-3 py-2">Fair</td>
                                <th className="text-left px-3 py-1">09:00-22:30</th>
                            </tr>
                            <tr className="text-sm cursor-pointer border-b last:border-b-0 hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 text-blue-600">---</td>
                                <th className="text-left px-3 py-1">Varanasi, U.P</th>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Delivery</td>
                                <td className="px-3 py-2">Fair</td>
                                <th className="text-left px-3 py-1">09:00-22:30</th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-[14rem] hfp dfl dn fd-c p-2 bg-[#fbfbfb] border-l">
                        <div className="text-gray-800_">Preview</div>
                        <div className="fx1 oy">
                            <div className="mt-1 space-y-2 text-sm  font-mono">

                                <div className="px-3 border_ rounded-lg border-blue-400">Name: Akshat Gupta</div>

                                <div className="px-3 border_ rounded-lg border-blue-400">Address: Varanasi, UP</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="w-[14rem] bg-gray-100_ border-l df fd-c py-3 px-2 p-5 bg-gray-50">
                <div className="fx1 bg-[#fbfbfb]_ oy mt-3">
                    <h1 className="text-gray-800 text-sm">Recent</h1>
                    <div className="mt-1 space-y-2 text-sm">
                    {["Demo1","Demo2"].map(v =>
                        <div className="px-3 border_ rounded-lg border-blue-400">{v}</div>
                    )}
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default function TradeManagePage() {
    const [view, setView] = useState("Home");



    return (

        <div className="df fd-c hfp">
            <Seller_Page_Header pageTitle={"Trades"}
            // newRow__={<div className="df aic jcc gap-1"><Home/><ShoppingBag/></div>}
            />
            <div className="df fx1 oh">
                <MainSideNav functional>
                    <MainSideNavButtons icon={<Home size={20} />} name="Home" controller={{ control: view, setController: setView }} />
                    <MainSideNavButtons icon={<ShoppingBag size={20} />} name="Orders" controller={{ control: view, setController: setView }} />
                    <MainSideNavButtons icon={<Users size={20} />} name="Partners" controller={{ control: view, setController: setView }} />
                </MainSideNav>

                <div className="df fd-c fx1 oh hfp">
                    {/* <Basic_Page_Header pageTitle={view} /> */}
                    {view === "Home" &&
                        <div className="df hfp">
                            <div className=" fx1"><ViewCustomer /></div>
                            <div className="w-[14rem] bg-gray-100 border-l df fd-c py-3 px-2">
                                <div className="border-b h-[2rem]_ df aic p-2 text-sm gap-2 jcsb">
                                    <div className="df aic gap-1 rounded-md bg-white fx1 px-1 py-1 min-w-6 border border-gray-200"><Search size={18} className="text-gray-500" /><div className="fx1">Search...</div><ArrowRight size={20} /></div>
                                </div>
                                <div className="fx1 bg-[#fbfbfb]_ oy mt-3 space-y-4 text-sm">
                                    {MOCK_PARTNERS.map(v =>
                                        <div className="px-3 border_ rounded-lg border-blue-400">{v.name}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                    {view === "Orders" && <ViewOrder />}
                    {view === "Partners" && <ViewPartner />}
                </div>
            </div>

        </div>
    )
}