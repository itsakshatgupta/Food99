'use client';
import { useState, useContext } from "react";
import { dynamic_ } from "@/components/main-context";
import Link from "next/link";
export default function Statement() {
    const { device } = useContext(dynamic_);
    const backBtn = <Link href='/account' className="df pd03 bdrds" style={{ background: 'rgb(182 182 182)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
    </Link>

    return (
        <>
            <style>{`#_A_STMT{user-select:none; background:#eeeeee}`}</style>
            <div className={`pdx1 pdy05 ${device === 'mobile' && 'df aic gap05'}`}>{device === 'mobile' && backBtn}<span className="mg0 font-lg" style={{ color: '#6c6c6c ' }}>Statement</span></div>
            <div className="df mgt05 aic mgx1">
                <span className="mg0 bd tac" style={{
                    background: '#edeafe',
                    alignContent: "center",
                    borderRadius: '100%',
                    width: '50px',
                    height: '50px',
                    borderColor: '#6476dd',
                    color: '#F44336',
                }}
                >AG</span>
                <div className="fx1 df fd-c pdx1">
                    <span className="mg0 font08" style={{ color: '#6476dd' }}>Name</span>
                    <span className="mg0">Statements</span>
                </div>
            </div>
            <div className="fx1 df fd-c pdx03 gap05 font-md pdy05" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <div className="pdb05 bdb">
                    <div>
                        <span className="mg0 font08" style={{ color: '#6c6c6c ' }}>Email</span>
                    </div>
                    <div className="pdx02">
                        <span
                            className="mg0 font09">akshatguptanov@gmail.com</span>
                    </div>
                </div>
                <div className="pdb05 bdb">
                    <div>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Permanent Address</span>
                    </div>
                    <div className="pdx02">
                        <span className="mg0 font09">Manduadhi sabji mandi, varanasi</span>
                    </div>
                </div>
                <div className="pdb05 bdb">
                    <div>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Phone No.</span>
                    </div>
                    <div className="pdx02">
                        <span className="mg0 font09">+91 8881316612</span>
                    </div>
                    <div className="pdx02">
                        <span className="mg0 font09">+91 9696607224</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Gender</span>
                    </div>
                    <div className="pdx02">
                        <span className="mg0 font09">Male</span>
                    </div>
                </div>
            </div>
        </>
    )
}