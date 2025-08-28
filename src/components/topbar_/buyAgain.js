import { useContext } from "react";
import { dynamic_ } from "../main-context";

export default function BuyAgain() {
    const { set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab, cart_ } = useContext(dynamic_);
    return (
        <>
            <style>{`#buy-again{background:#f0c9ab; border-color:black}`}</style>
            <div className="df aic mgb1 pdy1">
                <div className="df aic fx1 gap1">
                    <h3 className="mg0">Buy Again</h3>
                    <div className="pdy02 pdx05 font-sm" style={{ background: '#dce1ff', borderRadius: '5px' }}>Date range</div>
                </div>
                <h3 className="mg0 pdx07 pdy01 bdrds bd" style={{ background: '#403b3b', color: 'white' }} onClickCapture={() => set_dynamics_portal_ab(null)}>x</h3>
            </div>
            <div className="df fd-c gap1 mgb1 pdt1">
                <div>
                    <h4 className="mg0">Yesterday</h4>
                </div>
                <div className="df fd-c" style={{ background: '#ededed', borderRadius: '2px' }}>
                    <div className="df aic jcsb pdx02 pdy02">
                        <span className="font-sm pdx02" style={{
                            background: 'white'
                        }}>Order-ID:0995</span>
                        <span className="font-sm pdy02 pdx05" style={{ color: 'forestgreen' }}>Delivered</span>
                        <span className="font-sm pdx02" >Amount:599</span>
                    </div><div className="pdy4 pdx2 bd" style={{
                        borderRadius: '5px',
                        background: 'white'
                    }}
                    ></div>
                </div>
            </div>
        </>

    )
}