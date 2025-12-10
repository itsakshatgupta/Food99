'use client';
import Seller_Page_Header, { Basic_Page_Header } from "@/components/seller-cpmt/header";
import MainSideNav, { MainSideNavButtons } from "@/components/seller-cpmt/main-side-nav";
import DropDown_1, { ToggleSwitch } from "@/components/seller-cpmt/widget";
import { BadgeQuestionMark, File, Files, FormInput, Image, Link, LucideExternalLink, Minus, UserCircle2 } from "lucide-react";
import { Basic } from "next/font/google";
import { useState } from "react";

export default function FormNewPage() {
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
            <div className="px-3_ fx1 df fd-c">
                <div className="my-2 text-sm dfl dn gap-3 bg-white rounded-md"><div className="fx1"><span><DropDown_1 title={"Templates(Classic)"} flowData={"Hi"} /></span></div><span className="df aic gap-1"><input type="checkbox" />Show Detail</span><span className="df aic gap-1"><input type="checkbox" />Preview</span></div>
                <div className={`mx-5 fx1 df fd-c oy ${themes[theme].bg} border-x border-gray-300`}>
                    <div className="px-6 py-6 fx1">
                        <h1 className="fx1 dfl dn mb-2">Trade<span className="text-purple-600">B2B</span></h1>
                        <h1 className="text-lg mb-1 df gap-1"><UserCircle2 /><div className="df fd-c">Bussniess Name<h2 className={`text-sm ${themes[theme].heading1}`}>Vist:tradeb2b.com/bussniess_name</h2></div></h1>
                        
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


            {/* RIGHT SIDEBAR — SINGLE SIDEBAR */}
            <div className="w-[17rem] border-l bg-white p-4 df fd-c gap-6 hfp oy">

                {/* FIELD CONTROLS */}
                <div>
                    <h1 className="text-md mb-3">Add Field</h1>

                    <button
                        onClick={() => addField("text")}
                        className="df aic gap-2 px-2 py-1 bg-gray-100 rounded-md border w-full mb-2"
                    >
                        <FormInput size={16} /> Text Field
                    </button>

                    <button
                        onClick={() => addField("number")}
                        className="df aic gap-2 px-2 py-1 bg-gray-100 rounded-md border w-full mb-2"
                    >
                        <FormInput size={16} /> Number Field
                    </button>

                    <button
                        onClick={() => addField("image")}
                        className="df aic gap-2 px-2 py-1 bg-gray-100 rounded-md border w-full"
                    >
                        <Image size={16} /> Image Upload
                    </button>
                </div>

                {/* THEME */}
                <div>
                    <h1 className="text-md mb-2">Theme</h1>
                    <div className="df gap-3">
                        {Object.keys(themes).map(t => (
                            <div
                                key={t}
                                onClick={() => setTheme(t)}
                                className={`w-7 h-7 rounded-full border border-gray-300 cursor-pointer shadow-sm ${themes[t].bg}`}
                            ></div>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-md mb-2">Configuration</h1>
                    <div>
                        <ToggleSwitch label="Show Response No." description="Everyone can see total responses number. " onChange={() => 0} enabled={false} />
                        <ToggleSwitch label="Public Access" description="Anyone can access via link" onChange={() => 0} enabled={false} />
                        <ToggleSwitch label="Add to Bussniess Page" description="Form can accessable via yours bussniess page." onChange={() => 0} enabled={false} />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    onClick={handleSubmit}
                    className="mt-auto bg-blue-500 pS bottom-0 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
                >
                    Submit Form
                </button>

            </div>
        </>

    );
    
    return (
        <div className="df fd-c hfp">

            <Seller_Page_Header pageTitle={"New Form"} back={true} buttons={[<span className="border-b-dashed df aic gap-1"><LucideExternalLink size={14} />How it works</span>, <span className="border-b-dashed df aic gap-1"><BadgeQuestionMark size={14} />FAQs</span>]} />

            <div className="fx1 df oy bg-white">
                {/* <Basic_Page_Header pageTitle={view} /> */}
                {view === "Posts" && FormCreate()}
                {view === "All Forms" && "hi"}
            </div>

        </div>
    );
}
