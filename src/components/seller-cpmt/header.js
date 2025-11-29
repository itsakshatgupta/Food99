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


export default function Seller_Page_Header({ pageTitle, pageSubTitle, toolBar, buttons, subButtons, back=null }) {
const r_ = useRouter();
    return (
        <div className="bg-white text-black border-b">
            <div className="pdr1 pdl08 df jcsb text-lg font500 bdb border-[black] py-2.5 ">
                <div className="df gap-2 aic">{back&&<span className="p-1 bg-gray-100 df rounded-full cursor-pointer" onClick={()=>r_.back()}><ArrowLeftIcon size={20} /></span>}<div className=""><span>{pageTitle}</span>{pageSubTitle&&<div  className="text-xs">{pageSubTitle}</div>}</div>
                </div>
                <div className="df aic hfc_ gap1 text-sm">
                    {buttons&&buttons.map((v, i)=><span key={i} className="hover:text-orange-500 cursor-pointer">{v}</span>)}

                    <DropDown_1 d="r" title="En" flowData={<div>{lang__.map((item, subIndex) => (
                <span key={subIndex} className="block text-[black] py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                  {item}
                </span>
              ))}</div>}/>
                </div>
            </div>
            {toolBar&&<div className="df dn aic jcsb text-xs font500 p-1 bg-[#fafafa]">
                {pageTitle&&<h1 className="text-[0.825rem] font600 m-0">{pageTitle}</h1>}
                <div className="df aic gap08 text-[0.7rem]">
                     
                {subButtons&&subButtons.map(v=><span className=" border-blue-900">{v}</span>)}
               <Settings size={14} fill="white"/>
                <Info size={14} stroke="dodgerblue"/>
                    </div>
                <div className="dfl dn aic">
                    <div className="df aic gap03 py-1 cursor-pointer transition px-2 bg-[#2d3d41]l text-green-500">

                        <Wifi size={14} />
                        Broadcast Message
                    </div>
                    <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#546e7a] transition px-2 bg-[#2d3d41]l">
                        <span className="df">
                            Subscribers:
                        </span>
                        12
                    </div>
                    <div className="pR  group cursor-pointer pdx05 pdy01 hover:bg-[#37474F]">
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
                </div>
            </div>}
        </div>
    );
}

export function Seller_Page_Top_Bar({children}){
    return(<div className="df aic gap-6 bg-white text-black">{children}</div>)
}