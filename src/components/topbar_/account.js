import { useState, useContext } from "react";
import { dynamic_ } from "../main-context";

export default function Account() {
    const { set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab, cart_ } = useContext(dynamic_);

    const pagebyopt = {
        profile: <>
            <style>{`#_A_P{user-select:none; background:#eeeeee}`}</style>
            <span className="mg0" style={{ color: '#6c6c6c ' }}>Profile</span>
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
                    <span className="  mg0">Akshat Gupta</span>
                </div>
            </div>
            <div className="fx1 df fd-c pdx03 gap05 font-md pdy05" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <div className="pdb05 bdb">
                    <div className="df aic gap03">
                        <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#6c6c6c"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Email</span>
                    </div>
                    <div className="pdx02 mgt01">
                        <span
                            className="mg0 font09">akshatguptanov@gmail.com</span>
                    </div>
                </div>
                <div className="pdb05 bdb">
                    <div className="df aic gap03">
                        <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#6c6c6c"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Permanent Address</span>
                    </div>
                    <div className="pdx02 mgt01">
                        <span className="mg0 font09">Manduadhi sabji mandi, varanasi</span>
                    </div>
                </div>
                <div className="pdb05 bdb">
                    <div className="df aic gap03">
                        <svg xmlns="http://www.w3.org/2000/svg" height="0.9rem" viewBox="0 -960 960 960" width="0.9rem" fill="#6c6c6c"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Phone No.</span>
                    </div>
                    <div className="pdx02 mgt01">
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
        </>,
        statement: <>
            <style>{`#_A_STMT{user-select:none; background:#eeeeee}`}</style>
            <span className="mg0" style={{ color: '#6c6c6c ' }}>Statement</span>
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
        </>,
        help_support: <>
            <style>{`#_A_HPNDSP{user-select:none; background:#eeeeee}`}</style>
            <span className="mg0" style={{ color: '#6c6c6c ' }}>Help & Support</span>
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
        </>,
        about_us: <>
            <style>{`#_A_AU{user-select:none; background:#eeeeee}`}</style>
            <span className="mg0" style={{ color: '#6c6c6c ' }}>About Us</span>
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
                    <span className="  mg0">About US</span>
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
                <div>
                    <div>
                        <span className="mg0 font08" style={{ color: '#6c6c6c' }}>Phone No.</span>
                    </div>
                    <div className="pdx02">
                        <span className="mg0 font09">0542-5426845</span>
                    </div>
                    <div className="pdx02">
                        <span className="mg0 font09">+91 9696607224</span>
                    </div>
                </div>
            </div>
        </>,

    }
    const [content, set_content] = useState(pagebyopt['profile']);

    return (
        <>
            {/* <style>{`#account_{box-shadow:0 0 5px 1px gray; border-color:black}`}</style> */}
            <div className="df aic pdy1">
                <div className="df aic fx1 gap1">
                    <h3 className="mg0">Account</h3>
                    <div className="df aic pdy02 pdx05 font08" style={{ background: '#dce1ff', borderRadius: '5px' }}><svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg> Search</div>
                </div>
                <span className="df pd03 bdrds" style={{ background: 'rgb(245 245 245)', boxShadow:'0 0 5px 1px #d8d8d8'}} onClickCapture={() => set_dynamics_portal_ab(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></span>
            </div>
            <div className="df gap05 mgb1 fx1">
                <div className="df fd-c gap1 bdr pdx05">
                    <span className=" __menu_items mg0 gap02" onClickCapture={() => set_content(pagebyopt['profile'])} id="_A_P"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>Profile</span>
                    <span className=" __menu_items mg0 gap02" onClickCapture={() => set_content(pagebyopt['statement'])} id="_A_STMT"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z"/></svg>Statement</span>
                    <span className=" __menu_items mg0 gap02" onClickCapture={() => set_content(pagebyopt['help_support'])} id="_A_HPNDSP"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M480-40v-80h280v-40H600v-320h160v-40q0-116-82-198t-198-82q-116 0-198 82t-82 198v40h160v320H200q-33 0-56.5-23.5T120-240v-280q0-74 28.5-139.5T226-774q49-49 114.5-77.5T480-880q74 0 139.5 28.5T734-774q49 49 77.5 114.5T840-520v400q0 33-23.5 56.5T760-40H480ZM200-240h80v-160h-80v160Zm480 0h80v-160h-80v160ZM200-400h80-80Zm480 0h80-80Z"/></svg>Help & Support</span>
                    <span className=" __menu_items mg0 gap02" onClickCapture={() => set_content(pagebyopt['about_us'])} id="_A_AU"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>About Us</span>
                </div>
                <div className="df fd-c gap1 fx1">
                    {content}
                </div>
            </div>
        </>

    )
}