import { useContext } from "react";
import { dynamic_ } from "../main-context";


export default function Address() {
    const { set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab, cart_ } = useContext(dynamic_);
    return (
        <>
            <style>{`#address{background:#f0c9ab; border-color:black}`}</style>
            <div className="df jcsb aic pdy1">
                <div className="df aic fx1 gap1">
                    <h3 className="mg0">Address</h3>
                    <div className="pdy02 pdx05 font-sm mgl1" style={{ background: '#dce1ff', borderRadius: '5px', color: '#4963ff' }}>Add New</div>
                </div>
                <h3 className="mg0 pdx07 pdy01 bdrds bd" style={{ background: '#403b3b', color: 'white' }} onClickCapture={() => set_dynamics_portal_ab(null)}>x</h3>
            </div><div className="df fd-c gap1">
                <div className="pdy2 pdx1 bd" style={{
                    background: 'aliceblue',
                    borderRadius: '5px'
                }}>M</div>
                <div style={{ borderRadius: '5px' }} className="pdy2 pdx1 bd">M</div>
            </div>
        </>

    )
}