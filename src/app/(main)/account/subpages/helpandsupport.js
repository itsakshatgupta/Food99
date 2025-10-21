'use client';
import { useState, useContext } from "react";
import { dynamic_ } from "@/components/main-context";
import Link from "next/link";
export default function HelpAndSupport() {
    const { device } = useContext(dynamic_);
    const backBtn = <Link href='/account' className="df pd03 bdrds" style={{ background: 'rgb(182 182 182)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
    </Link>

    return (
        <>
            <style>{`#_A_HPNDSP{user-select:none; background:#eeeeee}`}</style>
            <div className={`pdx1 pdy05 ${device === 'mobile' && 'df aic gap05'}`}>{device === 'mobile' && backBtn}<span className="mg0 font-lg" style={{ color: '#6c6c6c ' }}>Help & Support</span></div>
            <div className="df mgt05 aic ">
                <div className="fx1 df fd-c pdx1 pdy05 bd" style={{ background: 'rgb(255 250 250)', borderRadius: '10px' }}>
                    <span className="mg0">Ticket Open</span>
                    <span className="mg0 font08" style={{ color: '#6476dd' }}>Ticket No.TNA000UB6</span>
                </div>
            </div>
            <div className="fx1 df fd-c pdx03 gap05 font-md pdy05" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <div className="pdb05 bdb">
                    <div>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>FAQs</span>
                    </div>
                    <div className="pdx02 font09">
                        <span className="mg0">Male</span>
                    </div>
                </div>
                <div className="pdb05 bdb">
                    <div className="df aic gap02">
                        <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#6c6c6c "><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                        <span className="mg0 font08" style={{ color: '#6c6c6c ' }}>Email</span>
                    </div>
                    <div className="pdx02">
                        <span
                            className="mg0 font09">support@vnspizza.com</span>
                    </div>
                </div>
                <div>
                    <div className="df aic gap02">
                        <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#6c6c6c"><path d="M480-40v-80h280v-40H600v-320h160v-40q0-116-82-198t-198-82q-116 0-198 82t-82 198v40h160v320H200q-33 0-56.5-23.5T120-240v-280q0-74 28.5-139.5T226-774q49-49 114.5-77.5T480-880q74 0 139.5 28.5T734-774q49 49 77.5 114.5T840-520v400q0 33-23.5 56.5T760-40H480ZM200-240h80v-160h-80v160Zm480 0h80v-160h-80v160ZM200-400h80-80Zm480 0h80-80Z"></path></svg>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Voice Support No.</span>
                    </div>
                    <div className="pdx02 font09">
                        <span className="mg0">0542-5426845</span>
                    </div>
                    <div className="pdx02 font09">
                        <span className="mg0">0542-5426846</span>
                    </div>
                </div>
            </div>
        </>
    )
}