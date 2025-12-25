'use client';
import Seller_Page_Header, { Basic_Page_Header } from "@/components/seller-cpmt/header";
import MainSideNav, { MainSideNavButtons } from "@/components/seller-cpmt/main-side-nav";
import DropDown_1, { ToggleSwitch } from "@/components/seller-cpmt/widget";
import { ArrowRight, CheckCircle, Earth, File, Files, FormInput, Image, Link as L, LucideExternalLink, Minus, Search } from "lucide-react";
import { Basic } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
export default function FormManagePage() {
    const [view, setView] = useState("All Forms");


    // Theme
    const [theme, setTheme] = useState("light");

    // Business form header
    const [formHeader, setFormHeader] = useState({
        businessName: "Your Business Name",
        location: "Your Location",
        formName: "Untitled Form",
        phone: "9999999999"
    });

    // Dynamic fields (main form)
    const [fields, setFields] = useState([
        { id: 1, type: "text", label: "Customer Name", required: false },
    ]);

    const addField = (type) => {
        setFields(prev => [
            ...prev,
            {
                id: Date.now(),
                type,
                label: "Untitled Question",
                required: false
            }
        ]);
    };

    const themes = {
        light: "bg-white",
        gray: "bg-[#f5f5f5]",
        blue: "bg-[#e0f2fe]",
        violet: "bg-[#f3e8ff]"
    };

    // Submit handler
    const handleSubmit = () => {
        // Build payload
        const payload = {
            header: formHeader,
            fields: fields
        };

        console.log("Submitting form:", payload);

        // TODO: Replace with your API call
        // fetch('/api/forms/create', { method: 'POST', body: JSON.stringify(payload), ... })
        alert("Form submitted! Check console for payload.");
    };
    const FormCreate = () => (
        <div className="df border-r hfp">

            <div className="fx1 hfp border-r df fd-c p-2_">
                <div className="text-md df gap-5 jcsb_ aic border-b_ px-3 py-1 mb-3_ bg-blue-400_ bg-gray-800_ text-white_ "><h1 className="fx1_">Posts</h1><div className="df aic gap-1  text-sm text-gray-600 border py-0.5 pl-1 pr-3 rounded-md"><Search size={18}/>Search anything from form...</div> <DropDown_1 title="Select Form" flowData={"Form"}/> <DropDown_1 title="Sort" flowData={"sort"}/></div>
                <div className="df items-start mt-0 rounded-md_ border-t border-gray-300 fx1 oy bg-gray-50_">
                    <table className="wfp fx1 text-sm">
                        <thead className="border-b border-purple-400_ bg-gray-800_ text-white_">
                            <th className="text-left px-3 py-1">Buyer</th>
                            <th className="text-left px-3 py-1">Name</th>
                            <th className="text-left px-3 py-1">Via</th>
                            <th className="text-left px-3 py-1">Date</th>
                            <th className="text-left px-3 py-1">View</th>
                        </thead>
                        <tbody className="">
                            <tr className="text-sm cursor-pointer border-b_ last:border-b-0_ hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Public</td>
                                <td className="px-3 py-2">21-11-2025</td>
                                <th className="text-left px-3 py-1">Date</th>
                            </tr>
                            <tr className="text-sm cursor-pointer border-b_ last:border-b-0_ hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Public</td>
                                <td className="px-3 py-2">21-11-2025</td>
                                <th className="text-left px-3 py-1">Date</th>
                            </tr>
                            <tr className="text-sm cursor-pointer border-b_ last:border-b-0_ hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Public</td>
                                <td className="px-3 py-2">21-11-2025</td>
                                <th className="text-left px-3 py-1">Date</th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-[14rem] hfp df fd-c p-2 bg-[#fbfbfb] border-l">
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

    );

    const AllForms = () => (
        <div className="df border-r hfp">

            <div className="fx1 hfp border-r df fd-c p-2_">
                <div className="text-md df jcsb border-b_ px-3 py-1 mb-3_ bg-blue-400_ bg-gray-800_ text-white_ "><h1>All forms</h1><Search /></div>
                <div className="text-sm m-3_ mt-0 rounded-md_ border-t border-gray-300 fx1 oy bg-gray-50_">
                    <table className="wfp">
                        <thead className="border-b border-purple-400_ bg-gray-800_ text-white_">
                            <th className="text-left px-3 py-1">Name</th>
                            <th className="text-left px-3 py-1">Type</th>
                            <th className="text-left px-3 py-1">Created</th>
                            <th className="text-left px-3 py-1">Status</th>
                            <th className="text-left px-3 py-1">Vists</th>
                            <th className="text-left px-3 py-1">Submits</th>
                        </thead>
                        <tbody className="">
                            <tr className="text-sm cursor-pointer border-b_ last:border-b-0_ hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Public</td>
                                <td className="px-3 py-2">21-11-2025</td>
                                <td className="px-3 py-2 df aic gap-1"><CheckCircle size={12} />Active</td>
                                <td className="px-3 py-2 text-gray-800">59</td>
                                <td className="px-3 py-2 text-green-600">38</td>
                            </tr>
                            <tr className="text-sm cursor-pointer border-b_ last:border-b-0_ hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Public</td>
                                <td className="px-3 py-2">21-11-2025</td>
                                <td className="px-3 py-2 df aic gap-1"><CheckCircle size={12} />Active</td>
                                <td className="px-3 py-2 text-gray-800">59</td>
                                <td className="px-3 py-2 text-green-600">38</td>
                            </tr>
                            <tr className="text-sm cursor-pointer border-b_ last:border-b-0_ hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2 text-blue-600">Demo Form</td>
                                <td className="px-3 py-2 df aic gap-1 text-gray-900"><Earth size={12} className="text-gray-500" /> Public</td>
                                <td className="px-3 py-2">21-11-2025</td>
                                <td className="px-3 py-2 df aic gap-1"><CheckCircle size={12} />Active</td>
                                <td className="px-3 py-2 text-gray-800">59</td>
                                <td className="px-3 py-2 text-green-600">38</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <div className="w-[14rem] bg-gray-100 border-l df fd-c py-3 px-2">
                <div className="border-b h-[2rem]_ df aic p-2 text-sm gap-2 jcsb">
                    <div className="df aic gap-1 rounded-md bg-white fx1 px-1 py-1 min-w-6 border border-gray-200"><Search size={18} className="text-gray-500" /><div className="fx1">Search...</div><ArrowRight size={20} /></div>
                </div>
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
    return (
        <div className="df fd-c hfp">

            <Seller_Page_Header pageTitle={"Forms"} buttons={[<Link href="new/form" className="border-b-dashed df aic gap-1"><LucideExternalLink size={14} /> Create Form</Link>]} />

            <div className="fx1 df oy bg-white">
                <MainSideNav functional>
                    <MainSideNavButtons icon={<Files size={20} />} name="Posts" controller={{ control: view, setController: setView }} />
                    <MainSideNavButtons icon={<File size={20} />} name="All Forms" controller={{ control: view, setController: setView }} />
                    <MainSideNavButtons icon={<L size={20} />} name="Shares" controller={{ control: view, setController: setView }} />
                </MainSideNav>

                <div className="df fd-c fx1 oh hfp">
                    {/* <Basic_Page_Header pageTitle={view} /> */}
                    {view === "Posts" && FormCreate()}
                    {view === "All Forms" && AllForms()}
                </div>

            </div>

        </div>
    );
}

import { BadgeQuestionMark, UserCircle2 } from "lucide-react";

export function FormNewPage_() {
    const [view, setView] = useState("Posts");


    // Theme
    const [theme, setTheme] = useState("light");

    // Business form header
    const [formHeader, setFormHeader] = useState({
        businessName: "Your Business Name",
        location: "Your Location",
        formName: "Untitled Form",
        phone: "9999999999"
    });

    // Dynamic fields (main form)
    const [fields, setFields] = useState([
        { id: 1, type: "text", label: "Customer Name", required: false },
    ]);

    const addField = (type) => {
        setFields(prev => [
            ...prev,
            {
                id: Date.now(),
                type,
                label: "Untitled Question",
                required: false
            }
        ]);
    };

    const themes = {
        light: { bg: "bg-white", heading1: "text-gray-800", f_bg: "bg-gray-50" },
        gray: { bg: "bg-gray-50", heading1: "text-gray-800", f_bg: "bg-gray-200/80" },
        blue: { bg: "bg-blue-100", heading1: "text-blue-600", f_bg: "bg-blue-50" },
        violet: { bg: "bg-purple-100", heading1: "text-purple-600", f_bg: "bg-purple-50" }
    };

    // Submit handler
    const handleSubmit = () => {
        // Build payload
        const payload = {
            header: formHeader,
            fields: fields
        };

        console.log("Submitting form:", payload);

        // TODO: Replace with your API call
        // fetch('/api/forms/create', { method: 'POST', body: JSON.stringify(payload), ... })
        alert("Form submitted! Check console for payload.");
    };
    const FormCreate = () => (
        <>
            {/* CENTER — FORM BUILDER */}
            <div className="hfp">
                <div className={`hfp mx-5 shadow-md df fd-c oy ${themes[theme].bg} border rounded-md`}>
                    <div className="px-6 py-5 fx1 border-t-4 border-purple-600">
                        <h1 className="fx1 dfl dn mb-2">Trade<span className="text-purple-600">B2B</span></h1>
                        <h1 className="text-lg mb-2 df gap-1"><UserCircle2 /><div className="df fd-c">Bussniess Name<h2 className={`text-sm ${themes[theme].heading1}`}>Vist:tradeb2b.com/bussniess_name</h2></div></h1>

                        <h2 className={`text-md tac ${themes[theme].heading1} bg-gray-200_`}>Form Name</h2>
                        <h2 className={`text-sm mb-3 ${themes[theme].f_bg} p-2`} >Vist:tradeb2b.com/bussniess_name</h2>
                        <div className="space-y-6">
                            {/* FORM FIELDS */}
                            {fields.map(field => (
                                <div key={field.id} className="bg-white p-4 rounded-lg border shadow-sm df fd-c gap-3">

                                    <input
                                        className="border-b text-lg px-1 py-1 outline-none"
                                        value={field.label}
                                        onChange={(e) => {
                                            setFields(prev => prev.map(f => f.id === field.id ? { ...f, label: e.target.value } : f));
                                        }}
                                    />

                                    <div className="text-sm text-gray-600">Type: {field.type}</div>

                                    <div className="df aic jcsb text-sm">

                                        <label className="df aic gap-1">
                                            <input
                                                type="checkbox"
                                                checked={field.required}
                                                onChange={() => {
                                                    setFields(prev => prev.map(f => f.id === field.id ? { ...f, required: !f.required } : f));
                                                }}
                                            /> Required
                                        </label>

                                        <Minus
                                            size={18}
                                            className="cursor-pointer text-red-500"
                                            onClick={() =>
                                                setFields(prev => prev.filter(f => f.id !== field.id))
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50">
                        <div className="df aic fx1"><div className="fx1 df">Trade<span className="text-purple-600">B2B</span><div className="text-gray-500 ml-1">Forms </div></div><div className="text-gray-600 text-sm">https://tradeb2b.com/bussniess_name</div></div>
                    </div>
                </div>
            </div>
        </>

    );

    return (

        FormCreate()

    );
}