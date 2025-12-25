'use client'
// import "./globals.css";
import { createContext, useLayoutEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import "../app/globals.css"
import "../../public/style/xnay.css";
import "../../public/style/UI_Responsive.css";
import Topbar from '@/components/topbar/bar';
import Topbar_ from '@/components/topbar_/topbar';
import Link from 'next/link';
import { Icon } from '@/components/lib/icons';
import {
    fetchAPI
} from '@/app/(api)/api';

// ✅ one shared fetcher
const fetcher = async (url) => {
    const res = await fetchAPI
        (url);
    const res_status = 111;
    const res_json = res.json();
    // const ready = res_json.push({status:res_status})
    console.log(':::', res.status)
    console.log(':::', res_json)
    if (res.status === 200) {
        return res_json;
    } else {
        return null
    }
};

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
    const mainRef = useRef(null);

    const pathname = usePathname()
    const router = useRouter(); // Place near top of your component
    const searchParams = useSearchParams();

    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        const u = localStorage.getItem("user");
        async function gettingUser() {
            const res = await fetchAPI("users", "GET", false, true)
            if (res) setUser(res[0])
        }
        if (u) gettingUser();
    }, []);


    // const { data: usr, error: usrError } = useSWR("/api/me/", fetcher, {
    //     revalidateOnFocus: false,      // Don't refresh when window gains focus
    //     revalidateOnReconnect: false,  // Don't refresh when internet reconnects
    //     refreshInterval: 0,             // Don't refresh automatically at intervals
    //     shouldRetryOnError: false
    // });

    // const { data: menu___i, error: menuError } = useSWR("/menu/", fetcher, {
    //     revalidateOnFocus: false,      // Don't refresh when window gains focus
    //     revalidateOnReconnect: false,  // Don't refresh when internet reconnects
    //     refreshInterval: 0,             // Don't refresh automatically at intervals

    // });

    // const { data: cart__i, error: cartError } = useSWR("/cart", fetcher, {
    //     revalidateOnFocus: false,      // Don't refresh when window gains focus
    //     revalidateOnReconnect: false,  // Don't refresh when internet reconnects
    //     refreshInterval: 0,             // Don't refresh automatically at intervals
    //     shouldRetryOnError: false

    // });


    return (
        <>
            {device && <div className="df fd-c hfp_">

                <dynamic_.Provider value={{ device, user }}>

                    {device === 'pc' && ["/messages", "/form"].every(v => v !== pathname) && <Topbar_ topbar={<Topbar />} />}

                    <main className="" ref={mainRef} >
                        {children}
                    </main>

                    <lowscreen-nav className="flex md:hidden bdt pR z-50" id="topbar" style={{ background: '#fafafa', fontSize: '0.75rem', ...(false ? { paddingInlineStart: 'calc(0.5rem + 1vmin)' } : { paddingInline: 'calc(0.5rem + 1vmin)' }) }}>
                        {/* lowscreen-nav's earlier paddingInline: 'calc(1rem + 3vmin)' */}
                        <div className="df jcsb aic xbg pdy05 bdr fx1" id="lsn-1">
                            <Link href='/' className="df fd-c aic gap02 fx1 pdy02" id="home"><Icon.Home /><span>Home</span></Link><Link href='/cart' className="df fd-c aic gap02 fx1" id="categories"><Icon.Catagories /><span>Categories</span></Link><Link href='/order' className="df fd-c aic gap02 fx1" id="orders"><Icon.Orders /><span>Orders</span></Link><Link href='/cart' className="df  fd-c aic gap02 fx1" id="cart"><Icon.Cart_ /><span>Cart</span></Link><Link href='/account' className="df fd-c aic gap02 fx1" id="account"><Icon.Account /><span>Account</span></Link>
                        </div>
                    </lowscreen-nav>

                </dynamic_.Provider>
            </div>
            }
        </>

    );
}
