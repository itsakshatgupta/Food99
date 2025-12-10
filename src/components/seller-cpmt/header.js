'use client'
// These icons are placeholders, assuming a library like 'lucide-react' is installed in a full Next.js project.
// In a standalone JS/HTML file, these would be replaced by inline SVG or images.
import { UserCircle2, Stamp, NotebookPenIcon, Bell, Calculator, Calendar, File, Stars, ChevronDown, Wifi, Settings, Info, ArrowLeftIcon, } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import DropDown_1 from './widget';


export const lang__ = [
    'English (US)',
    'English (UK)',
    'Chinese',
    'Hindi',
    'Poland'
]


export default function Seller_Page_Header({ pageTitle, icon,  pageSubTitle, bg, newRow_, newRow__, buttons, subButtons, back=null }) {
const r_ = useRouter();
    return (
        <div className={`bg-[#4527A0]_ ${bg?bg:"bg-white"} text-black border-b`}>
            <div className="pdr1 pdl08 df jcsb text-lg font500 bdb border-[black] py-1.5 ">
                <div className="df gap-2 aic">{back&&<span className="p-1 bg-gray-100 df rounded-full cursor-pointer" onClick={()=>r_.back()}><ArrowLeftIcon size={20} /></span>}<div className=""><span className="df aic gap-1">{icon&&icon}{pageTitle}</span>{pageSubTitle&&<div className="text-xs">{pageSubTitle}</div>}</div>
                </div>
                {newRow__&&<div className="fx1">{newRow__}</div>}
                <div className="df aic hfc_ gap1 text-sm">
                    {buttons&&buttons.map((v, i)=><span key={i} className="hover:text-orange-500 cursor-pointer">{v}</span>)}

                    <DropDown_1 d="r" title="En" flowData={<div>{lang__.map((item, subIndex) => (
                <span key={subIndex} className="block text-[black] py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                  {item}
                </span>
              ))}</div>}/>
                </div>
            </div>
            {newRow_&&newRow_}
        </div>
    );
}

export function Seller_Page_Top_Bar({children}){
    return(<div className="df aic gap-6 bg-white text-black">{children}</div>)
}

export function Basic_Page_Header({ pageTitle, icon, pageSubTitle, bg, newRow__, buttons, back=null }) {
const r_ = useRouter();
    return (
        <div className={`bg-[#4527A0]_ ${bg?bg:"bg-white"} text-black border-b`}>
            <div className="pdr1 pl-2 df jcsb text-md font500 bdb border-[black] py-1 ">
                <div className="df gap-2 aic">{back&&<span className="p-1 bg-gray-100 df rounded-full cursor-pointer" onClick={()=>r_.back()}><ArrowLeftIcon size={20} /></span>}<div className=""><span className="df aic gap-1">{icon&&icon}{pageTitle}</span>{pageSubTitle&&<div className="text-xs">{pageSubTitle}</div>}</div>
                </div>
                {newRow__&&<div className="fx1">{newRow__}</div>}
                <div className="df aic hfc_ gap1 text-sm">
                    {buttons&&buttons.map((v, i)=><span key={i} className="hover:text-orange-500 cursor-pointer">{v}</span>)}
                </div>
            </div>
        </div>
    );
}