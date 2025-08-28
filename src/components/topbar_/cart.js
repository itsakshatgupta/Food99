import { useContext } from "react";
import { dynamic_ } from "../main-context";
export default function Cart() {
    const { set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab, cart_ } = useContext(dynamic_);
    return (
        <>
            <style>{`#cart{background:#f0c9ab; border-color:black}`}</style>
            <div className="df aic pdy1" style={{ background: 'white', position: 'sticky', top: '0' }}>
                <div className="df aic fx1 gap1">
                    <h3 className="mg0">Cart</h3>
                    <div className="pdy02 pdx05 font-sm" style={{
                        background: '#dce1ff',
                        borderRadius: '5px'
                    }}>Date range</div>
                </div>
                <h3 className="mg0 pdx07 pdy01 bdrds bd" style={{ background: '#403b3b', color: 'white' }} onClickCapture={() => set_dynamics_portal_ab(null)}>x</h3>
            </div>
            <div className="pdy4 pdx2 bd" style={{
                borderRadius: '5px',
                background: 'white'
            }}
            ></div>
            <div className="df fd-c gap01">
                <div className="mgb05">
                    <h4 className="mg0">Coupons</h4>
                </div>
                <div className="df fd-c pdx05">
                    <div className="pdy05 pdx1 font-sm" style={{
                        background: '#f8f8f8',
                        color: 'orangered'
                    }}>
                        <span>FREEBURGER200</span>
                        <span style={{
                            float: 'right',
                            color: 'forestgreen'
                        }}>Applied!</span>
                    </div>
                </div>
                <div className="df fd-c pdx05">
                    <div className="pdy05 pdx1 font-sm" style={{
                        background: '#f8f8f8',
                        color: 'orangered'
                    }}>
                        <span>Get 50% Off upto 300</span>
                        <span style={{
                            float: 'right',
                            color: 'forestgreen'
                        }}>Applied!</span>
                    </div>
                </div>
                <div className="df fd-c pdx05">
                    <div className="pdy05 pdx1 bd font-sm" style={{
                        borderRadius: '5px',
                        background: '#f3f3f3',
                        textAlign: 'center'
                    }}>
                        <span>More Available Coupons</span>
                    </div>
                </div>
            </div>
            <div className="gap01">
                <div className="mgb05">
                    <h4 className="mg0">Summary</h4>
                </div>
                <div className="df fd-c pdx05">
                    <div className="pdy5 pdx1 font-sm" style={{
                        background: '#f8f8f8',
                        color: 'orangered'
                    }}>
                        <span>FREEBURGER200</span>
                        <span style={{
                            float: 'right',
                            color: 'forestgreen'
                        }}>Applied!</span>
                    </div>
                </div>
            </div>
            <div className="mgb1" style={{ background: 'rgb(248, 248, 248)', position: 'sticky', bottom: '0px' }}>
                <div className="df fd-c mgb05 bd" style={{ boxShadow: '0 0px 5px 1px #c7c7c7' }}>
                    <div className="pdy02 pdx1 xbg">Applied!</div>
                    <div className="pdy08 pdx1 font-sm df aic jcsb">
                        <span className="pdy05 pdx1 bd xbg">Using Payment</span>
                        <span className="pdy05 pdx1" style={{ float: 'right', color: 'white', background: '#008600', borderRadius: '5px' }}>Place Order</span>
                    </div>
                </div>
            </div>
        </>

    )
}