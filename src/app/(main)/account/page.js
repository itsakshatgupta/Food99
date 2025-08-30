'use client'
import { useState, useContext, useEffect } from "react";
import { dynamic_ } from "@/components/main-context";
import Link from "next/link";
import { BadgeHelpIcon, HandHeart, IdCard, LogOut, LucideMapPinHouse, Shield, ShieldUser, User2 } from 'lucide-react';
import dynamic from "next/dynamic";
import Image from "next/image";
import { apiFetch } from "@/app/calling/api";

export default function Account() {
    const { device } = useContext(dynamic_);
    const [user, setUser] = useState(null);

    // ✅ Correct async usage in useEffect
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiFetch("/api/me/");
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.error("Failed:", res.status);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, []);

    // ✅ Logout handler
    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
        window.location.href = "/login"; // redirect to login page
    };


    const [content, set_content] = useState(null);


    return (
        <>
            {/* <style>{`#account_{box-shadow:0 0 5px 1px gray; border-color:black}`}</style> */}
            {device === 'pc' &&
                //  <div className="df fd-c hfp">
                //     <div className={`df aic pdy1`}>
                //         <div className="df aic fx1 gap1 jcsb">
                //             <h3 className="mg0">Account</h3>
                //             <span className="font-sm font600 df aic gap02"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="black"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm280-80h280v-560H480v560Z" /></svg>Logout</span>
                //         </div>
                //     </div>
                //     <div className={`${device === 'pc' && 'df gap05 mgb1 fx1'}  ${device === 'mobile' && 'fx1'}`}>
                //         <div className="df fd-c gap1 bdr pdx05">
                //             {device === 'mobile' && <div className="df fd-c mgt05 aic mgx1 jcc pdy1 gap1">
                //                 <span className="mg0 bd tac font-lg" style={{
                //                     background: '#f0efefff',
                //                     alignContent: "center",
                //                     borderRadius: '100%',
                //                     width: '100px',
                //                     height: '100px',
                //                     borderColor: 'green',
                //                     color: 'red',
                //                 }}
                //                 >AG</span>
                //                 <div className="">
                //                     <span className="mg0 font900" style={{ color: '#0f7a2aff' }}>Hi, </span>
                //                     <span className="  mg0">Akshat Gupta</span>
                //                 </div>
                //             </div>}

                //             <span className={` __menu_items mg0 gap02 ${device === 'mobile' && 'pdy08 bd bdrds'}`} onClickCapture={() => set_content(dynamic(() => import("./subpages/profile"), {
                //                 ssr: true, loading: () => <span className="tac mg0 fx1 font-sm" style={{
                //                     alignContent: 'center',
                //                     color:'gray',
                //                 }}>Loading..
                //                 </span>
                //             }))} id="_A_P"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>Profile</span>
                //             <span className={` __menu_items mg0 gap02 ${device === 'mobile' && 'pdy08 bd bdrds'}`} onClickCapture={() => set_content(dynamic(() => import("./subpages/helpandsupport"), {
                //                 ssr: true, loading: () => <span className="tac mg0 fx1 font-sm" style={{
                //                     alignContent: 'center',
                //                     color:'gray',
                //                 }}>Loading..
                //                 </span>
                //             }))} id="_A_STMT"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M80-120v-720h400v160h400v560H80Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h320v-400H480v80h80v80h-80v80h80v80h-80v80Zm160-240v-80h80v80h-80Zm0 160v-80h80v80h-80Z" /></svg>Address Book</span>
                //             <span className={` __menu_items mg0 gap02 ${device === 'mobile' && 'pdy08 bd bdrds'}`} onClickCapture={() => set_content(dynamic(() => import("./subpages/helpandsupport"), {
                //                 ssr: true, loading: () => <span className="tac mg0 fx1 font-sm" style={{
                //                     alignContent: 'center',
                //                     color:'gray',
                //                 }}>Loading..
                //                 </span>
                //             }))} id="_A_HPNDSP"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M480-40v-80h280v-40H600v-320h160v-40q0-116-82-198t-198-82q-116 0-198 82t-82 198v40h160v320H200q-33 0-56.5-23.5T120-240v-280q0-74 28.5-139.5T226-774q49-49 114.5-77.5T480-880q74 0 139.5 28.5T734-774q49 49 77.5 114.5T840-520v400q0 33-23.5 56.5T760-40H480ZM200-240h80v-160h-80v160Zm480 0h80v-160h-80v160ZM200-400h80-80Zm480 0h80-80Z" /></svg>Help & Support</span>
                //             <span className={` __menu_items mg0 gap02 ${device === 'mobile' && 'pdy08 bd bdrds'}`} onClickCapture={() => set_content(dynamic(() => import("./subpages/aboutus"), {
                //                 ssr: true, loading: () => <span className="tac mg0 fx1 font-sm" style={{
                //                     alignContent: 'center',
                //                     color:'gray',
                //                 }}>Loading..
                //                 </span>
                //             }))} id="_A_AU"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>About Us</span>
                //             <span className={` __menu_items mg0 gap02 ${device === 'mobile' && 'pdy08 bd bdrds'}`} onClickCapture={() => set_content(dynamic(() => import("./subpages/aboutus"), {
                //                 ssr: true, loading: () => <span className="tac mg0 fx1 font-sm" style={{
                //                     alignContent: 'center',
                //                     color:'gray',
                //                 }}>Loading..
                //                 </span>
                //             }))} id="_A_AU"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>Legal & Licences</span>

                //         </div>
                //         <div className="df fd-c gap1 fx1">
                //             {content}
                //         </div>
                //     </div>
                // </div>
                <h1>'1'</h1>
            }

            {device === 'mobile' && user && (
                <div className="hfp df fd-c">
                    {/* Header */}
                    <div className="pdy05 pdx1 df aic jcsb xbg" style={{ boxShadow: '0px 1px 9px 1px #e6e6e6' }}>
                        <h3 className="mg0">Account</h3>
                        <span onClick={handleLogout} className="cursor-pointer font-sm font600 df aic gap02">
                            <LogOut /> Logout
                        </span>
                    </div>

                    {/* Profile Card */}
                    <div className="df fd-c gap1 bdr pd1 fx1" style={{ background: '#f7f7f7ff' }}>
                        <div className="df mgt05 pdx1 pdy1 gap1 xbg bdrds bd aic">
                            <span className="bdrds oh df"
                                style={{
                                    background: '#f0efef',
                                    boxShadow: '2px 4px 10px 1px #cdcdcd',
                                }}>
                                <Image
                                    alt="profile"
                                    src={user.profile_image || "/default_user.png"} // ✅ fallback
                                    width={100}
                                    height={100}
                                />
                            </span>
                            <div className="fx1 df fd-c jcsb pd03 gap05" style={{ color: 'rgb(50, 50, 50)' }}>
                                <span className="mg0 font-lg font700 bdb pdb05">
                                    <b>Hi, </b>{user.username}
                                </span>
                                <div className="mg0 font-md df aic font900 pdx1 gap2" style={{ justifyContent: 'space-around', color: '#3f51b5' }}>
                                    <div className="df fd-c aic gap01"><span>Orders</span><span>10+</span></div>
                                    <div className="df fd-c aic gap01"><span>Save</span><span>$1250+</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Menu Links */}
                        <div className="df fd-c pd08 xbg bdrds" style={{ boxShadow: '0px -1px 9px 1px #e6e6e6' }}>
                            <Link href='/account/profile' className="__menu_items mg0 gap03 font500 pdy1"><User2 />Profile</Link>
                            <Link href='/account/address_book' className="__menu_items mg0 gap03 font500 pdy1"><LucideMapPinHouse />Address Book</Link>
                            <Link href='/account/help&support' className="__menu_items mg0 gap03 font500 pdy1"><BadgeHelpIcon />Help & Support</Link>
                            <Link href='/account/aboutus' className="__menu_items mg0 gap03 font500 pdy1"><ShieldUser />Security</Link>
                            <Link href='/account/aboutus' className="__menu_items mg0 gap03 font500 pdy1"><HandHeart />About Us</Link>
                            <Link href='/account/aboutus' className="__menu_items mg0 gap03 font500 pdy1"><IdCard />Legal & Licences</Link>
                        </div>
                    </div>

                    <div className="tac font-sm mgb1 font08 font600" style={{ color: '#babbbbff' }}>
                        Terms of use | Privacy Policy
                    </div>
                </div>
            )}
        </>

    )
}