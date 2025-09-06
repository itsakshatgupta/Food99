'use client'
// import "./globals.css";
import { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {Box, Home, Shapes, UserCircle2} from 'lucide-react';
import SettingsPanel from '@/components/setting/settingPannel';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import "../../public/style/xnay.css";
import "../../public/style/UI_Responsive.css";
import Topbar from '@/components/topbar/bar';
import Topbar_ from '@/components/topbar_/topbar';
import Link from 'next/link';
import { Icon } from '@/components/lib/icons';




export const dynamic_ = createContext();
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
    const [cart_, set_cart] = useState(10);
    const [floaters, set_floaters] = useState(null);


    const noLayoutOnPages = ['loginl', 'signup']

    const floaterRef = useRef(null);
    const mainRef = useRef(null);

    const pathname = usePathname()
    const router = useRouter(); // Place near top of your component
    const searchParams = useSearchParams();
    const panel = searchParams.get('panel');
    console.log(searchParams.get('page'), typeof (searchParams.get('page')), searchParams.get('page') in ['login', 'signup'], noLayoutOnPages)


    useEffect(() => {
        console.log('check run')
        if (['/', '/cart'].includes(pathname) === false) {
            set_floaters(null)
            console.log('pn', pathname, ['/', '/cart'].includes(pathname) === false)
        } else {
        }

    }, [pathname])

    useEffect(() => {
        function check_floaters() {
            if (mainRef.current) {
                const floaterHeight = floaterRef.current?.offsetHeight || 0;
                mainRef.current.style.paddingBottom = `${floaterHeight}px`;
            }
        }
        check_floaters();
        return () => set_floaters(null);
    }, [floaters]);

    return (
        <>
            {device === 'pc' &&
                <dynamic_.Provider value={{ device, dynamic_portal_main, set_dynamics_portal_main, cart_, set_cart, dynamic_portal_ab, set_dynamics_portal_ab }}>

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
                <dynamic_.Provider value={{ device, dynamic_portal_main, set_dynamics_portal_main, cart_, set_cart, dynamic_portal_ab, set_dynamics_portal_ab, floaters, set_floaters }}>
                    <div className="hfp wfp  df fd-c" style={{ alignContent: 'space-between' }}>

                        <main className="main fx1"
                            ref={mainRef}
                        >
                            <div className="hfp oy1 oh1" style={{ scrollbarWidth: 'none' }} >
                                {children}
                            </div>
                        </main>
                        <div className="wfp" style={{ position: 'fixed', bottom: 0 }} ref={floaterRef}>
                            <div className='containers-area pR' >
                                <div className="pA" style={{ bottom: 0, zIndex: 1 }}>{dynamic_portal_main}</div>
                                {floaters &&
                                    <div className='floater-container'>
                                        {floaters}
                                    </div>
                                }
                            </div>

                            <lowscreen-nav className="df jcsb aic gap05 xfg font-sm pdy05 bdt" id="topbar" style={{ background: '#fafafa', fontSize: '0.75rem', paddingInline: 'calc(1rem + 3vmin)' }}>
                                <Link href='/' className="df fd-c aic gap02"><Home /><span>Home</span></Link><Link href='/cart' className="df fd-c aic gap02"><Shapes/><span>Categories</span></Link><Link href='/order' className="df fd-c aic gap02"><Box/><span>Orders</span></Link><Link href='/cart' className="df fd-c aic gap02"><Icon.Cart_ /><span>Cart</span></Link><Link href='/account' className="df fd-c aic gap02"><UserCircle2 /><span>Account</span></Link></lowscreen-nav>
                        </div>

                    </div>
                    {device === 'mobile' && dynamic_portal_ab !== null ? <div className='pA hfp xbg wfp' style={{ top: 0, zIndex: 1 }}>{dynamic_portal_ab}</div> : null}
                </dynamic_.Provider>
            </>
            }
        </>

    );
}
