'use client'
// import "./globals.css";
import { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Home, Shapes, UserCircle2, UserCircle2Icon } from 'lucide-react';
import SettingsPanel from '@/components/setting/settingPannel';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import "../../public/style/xnay.css";
import "../../public/style/UI_Responsive.css";
import Topbar from '@/components/topbar/bar';
import Topbar_ from '@/components/topbar_/topbar';
import Link from 'next/link';
import { Icon } from '@/components/lib/icons';
import useSWR from "swr";
import { apiFetch } from '@/app/(api)/api';

// ✅ one shared fetcher
const fetcher = async (url) => {
    const res = await apiFetch(url);
    return res.json();
};

export const dynamic_ = createContext();
export const floaters_ = createContext();
export const menu_ = createContext();
export const Menu = [
    {
        menu_ctg_: 'Pizza', list_: [
            ['Veggie Pizza A', 299, 0],
            ['Veggie Pizza A', 299, 0],
            ['Veggie Pizza A', 299, 0]
        ]
    },

    {
        menu_ctg_: 'Burger', list_: [
            ['Burger A', 149, 0],
            ['Burger A', 149, 0],
            ['Burger A', 149, 0]
        ]
    },

    {
        menu_ctg_: 'French Fries', list_: [
            ['French Fries A', 111, 0],
            ['French Fries A', 111, 0],
            ['French Fries A', 111, 0]
        ]
    }];

export default function MainContext({ device, children }) {
    const [dynamic_portal_main, set_dynamics_portal_main] = useState(null)

    const [dynamic_portal_ab, set_dynamics_portal_ab] = useState(null)
    // const [cart__i, set_cart__i] = useState(null);
    const [floaters, set_floaters] = useState([{ name: 1, child: 0 }]);
    const [feature_option, set_feature_option] = useState(null);


    const noLayoutOnPages = ['loginl', 'signup']

    const floaterRef = useRef(null);
    const mainRef = useRef(null);

    const pathname = usePathname()
    const router = useRouter(); // Place near top of your component
    const searchParams = useSearchParams();
    const panel = searchParams.get('panel');
    console.log(searchParams.get('page'), typeof (searchParams.get('page')), searchParams.get('page') in ['login', 'signup'], noLayoutOnPages)


    const { data: usr, error: usrError } = useSWR("/api/me/", fetcher, {
        revalidateOnFocus: false,      // Don't refresh when window gains focus
        revalidateOnReconnect: false,  // Don't refresh when internet reconnects
        refreshInterval: 0,             // Don't refresh automatically at intervals
        shouldRetryOnError: false
    });

    const { data: menu___i, error: menuError } = useSWR("/menu/", fetcher, {
        revalidateOnFocus: false,      // Don't refresh when window gains focus
        revalidateOnReconnect: false,  // Don't refresh when internet reconnects
        refreshInterval: 0,             // Don't refresh automatically at intervals

    });

    const { data: cart__i, error: cartError } = useSWR("/cart", fetcher, {
        revalidateOnFocus: false,      // Don't refresh when window gains focus
        revalidateOnReconnect: false,  // Don't refresh when internet reconnects
        refreshInterval: 0,             // Don't refresh automatically at intervals
        shouldRetryOnError: false

    });


    useEffect(() => {
        function check_floaters() {
            if (mainRef.current) {
                const floaterHeight = floaterRef.current?.offsetHeight || 0;
                mainRef.current.style.paddingBottom = `${floaterHeight}px`;
            }
        }
        check_floaters();
    }, [floaters]);

    function display_menu_list(e) {
        if (e.target.textContent === "X Close") {
            e.target.textContent = "Menu"
            set_floaters((prev) => prev.filter((v, i) => v.name !== 'menu'));
        } else {
            e.target.textContent = "X Close"
            set_floaters((prev) => [...prev, {
                name: 'menu', child: <>
                    <style>{`
        lowscreen-nav{
        border-top:none !important;
        }
        #lsn-1{
        border-top:1px solid #f8f8f8;
        }
        `}</style>
                    <style>{`    .menu_list{width: 70vw;
    position: absolute;
    bottom: 5px;
    right: 10px;
    height: 40vh;
    box-shadow: 0 0 12px 1px #b2b2b2;
    animation:menu_ani 0.8s linear;
    z-index:1;
    }

    @keyframes menu_ani {
    0% {
        height:0;
        width:0;
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
            }
    `}</style>
                    <div className="df fd-c aic padx1 pdy1 menu_list bdTrds bdBrds xfg gap08 oy" style={{ background: 'black', color: 'white' }}>
                        {menu___i && menu___i.map((v, i) => <div className="bdy df aic jcsb wfp pdx1 pdy03" key={i}><div className="df aic gap05"><span className="font600">{v.name}</span></div><span>{v.items.length}</span></div>)}
                    </div>
                </>
            }])
        }
    }

    return (
        <>
            {device === 'pc' &&
                <dynamic_.Provider value={{ device, dynamic_portal_main, set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab }}>

                    <div className="df fd-c hfp wfp">

                        {/* <style>{`main.fx1.oh{width:100%;max-width:2200px;align-self:center;}`}</style> */}

                        <Topbar_ topbar={<Topbar />} />

                        <main className="pR oh fx1">
                            <div className="hfp oy" style={{ scrollbarWidth: 'none' }}>
                                {children}
                            </div>
                            {dynamic_portal_ab}
                        </main>

                        {device === 'mobile' && <lowscreen-nav className="df jcsb aic gap05 xfg font-sm pdy05 bdt" id="topbar" style={{ background: '#fafafa', fontSize: '0.75rem', paddingInline: 'calc(1rem + 3vmin)' }}>
                            <Link href='/' className="df fd-c aic gap02"><Icon.Home /><span>Home</span></Link><Link href='/cart' className="df fd-c aic gap02"><Icon.Catagories /><span>Categories</span></Link><Link href='/order' className="df fd-c aic gap02"><Icon.Catagories /><span>Orders</span></Link><Link href='/cart' className="df fd-c aic gap02"><Icon.Cart_ /><span>Cart</span></Link><Link href='/account' className="df fd-c aic gap02"><Icon.Account /><span>Account</span></Link></lowscreen-nav>}

                    </div>
                </dynamic_.Provider>
            }


            {device === 'mobile' && <>
                <menu_.Provider value={{ menu___i }}>
                    <dynamic_.Provider value={{ device, dynamic_portal_main, set_dynamics_portal_main, dynamic_portal_ab, set_dynamics_portal_ab, menu___i, cart__i, usr, floaters, set_floaters, set_feature_option }}>
                        <div className="hfp wfp  df fd-c" style={{ alignContent: 'space-between' }}>
                            <main className="main fx1" ref={mainRef}>
                                <div className="hfp oy1 oh1" style={{ scrollbarWidth: 'none' }} >
                                    {children}
                                </div>
                            </main>
                            <div className="wfp" style={{ position: 'fixed', bottom: 0 }} ref={floaterRef}>
                                <div className='containers-area pR' >
                                    <div className="pA wfp" style={{ bottom: 0, zIndex: 1 }}>{dynamic_portal_main}
                                    </div>
                                    {floaters &&
                                        <div className='floater-container'>
                                            {console.log(floaters)}
                                            {floaters.map((v, k) => <div key={k}>{v.child}</div>)}
                                        </div>
                                    }
                                </div>


                                <lowscreen-nav className="df bdt pR" id="topbar" style={{ background: '#fafafa', fontSize: '0.75rem', zIndex: 2, ...(feature_option ? { paddingInlineStart: 'calc(0.5rem + 1vmin)' } : { paddingInline: 'calc(0.5rem + 1vmin)' }) }}>
                                    {/* lowscreen-nav's earlier paddingInline: 'calc(1rem + 3vmin)' */}
                                    <div className="df jcsb aic xbg pdy05 bdr fx1" id="lsn-1">
                                        <Link href='/' className="df fd-c aic gap02 fx1 pdy02" id="home"><Icon.Home /><span>Home</span></Link><Link href='/cart' className="df fd-c aic gap02 fx1" id="categories"><Icon.Catagories /><span>Categories</span></Link><Link href='/order' className="df fd-c aic gap02 fx1" id="orders"><Icon.Orders /><span>Orders</span></Link><Link href='/cart' className="dfl dn fd-c aic gap02 fx1" id="cart"><Icon.Cart_ /><span>Cart</span></Link><Link href='/account' className="dfl dn fd-c aic gap02 fx1" id="account"><Icon.Account /><span>Account</span></Link>
                                    </div>
                                    {feature_option &&
                                        feature_option
                                    }
                                </lowscreen-nav>
                            </div>
                        </div>
                        {device === 'mobile' && dynamic_portal_ab !== null ? <div className='pA xbg wfp' style={{ top: 0, zIndex: 1, height:'100vh' }}>{dynamic_portal_ab}</div> : null}
                    </dynamic_.Provider>
                </menu_.Provider>
            </>
            }
        </>

    );
}
