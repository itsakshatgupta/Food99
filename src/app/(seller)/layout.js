"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import "../globals.css"
import "../../../public/style/xnay.css";
import "../../../public/style/UI_Responsive.css";
import { Boxes, CircleDollarSign, Compass, Database, DollarSign, FileBox, Handshake, LayoutDashboard, LucideFilePenLine, MessageSquare, Settings, Settings2, Table, Loader2 } from "lucide-react";
import { Inter } from 'next/font/google';
import { createContext, useEffect, useReducer, useState } from "react";
import { fetchAPI } from "../(api)/api";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const userContext = createContext();

export default function SellerLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null)

  const [r_, setR_] = useState({loading:false, sync:false})
console.log(1, r_)

  const menu = [
    { icon: <LayoutDashboard size={18} />, name: "Dashboard", path: "/sellers/seller_dsbd" },
    { icon: <DollarSign size={18} />, name: "Trades", path: "/sellers/seller_trdes" },
    { icon: <Compass size={18} />, name: "Search", path: "/sellers/seller_scrh" },
    { icon: <FileBox size={18} />, name: "Products", path: "/sellers/seller_prod" },
    { icon: <Table size={18} />, name: "Leads", path: "/sellers/seller_lead" },
    { icon: <MessageSquare size={18} />, name: "Messages", path: "/sellers/seller_msg" },
    { icon: <LucideFilePenLine size={18} />, name: "Forms", path: "/sellers/seller_form" },
    { icon: <Settings2 size={18} />, name: "Settings", path: "/sellers/seller_stng" },
  ];

  useEffect(() => {
    const u = localStorage.getItem("user");
    async function gettingUser() {
      const res = await fetchAPI("users", "GET", false, true)
      if (res) setUser(res[0])
    }
    if (u) gettingUser();
  }, []);
console.log("P_", pathname)

    useEffect(()=>{
      if(r_.loading){
        setR_(prev=>({...prev, loading:false}))
      }
    },[pathname])
  return (
    <html>
      <title>Seller Dashboard || Yggimy</title>
      <body className={`${inter.variable}`}>
        {r_.loading&&<div className="pA wfp hfp df aic jcc z-1000"><h1 className="text-lg_ df aic px-3 py-1 rounded-sm bg-gray-50 border shadow-md"><Loader2 className="w-5 h-5 mr-2 animate-spin" />loading...</h1></div>}
        {user?.user_type === "seller" &&
          <userContext.Provider value={{ user, r_ }}>
            <div className="flex h-screen">
              {/* Sidebar */}
              <aside className="w-[220px] flex flex-col border-r border-[#e2d2ff] bg-[#fbfbfb]">
                <h1 className="p-4 mb-5 pb-0 df aic text-[larger] text-gray-800 font-bold">
                  Trade<span className="text-purple-600">B2B</span>
                </h1>
                <span>{user?.username}-{user?.user_type}</span>
                <h1 className="pdx07 text-sm text-gray-600 mb-1">Menu</h1>
                <nav className="flex-1 space-y-1 pdx05 text-[0.925rem]">
                  {menu.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-2 py-1.5 rounded-md hover:bg-gray-100 hover:text-[royalblue] transition ${pathname === item.path ? "bg-[#fafafa] py-1 border border-[dodgerblue]" : ""
                        }`}
                      onClick={()=>pathname!==item.path&&setR_(prev=>({...prev, loading:true}))}
                    >
                      <div className="df aic gap05">{item.icon}{item.name}</div>
                    </Link>
                  ))}
                </nav>
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    router.push("/login");
                  }}
                  className="m-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
                >
                  Logout
                </button>
              </aside>

              {/* Main content */}
              <main className="flex-1 bg-white oy">
                {children}
              </main>

            </div>
          </userContext.Provider>}
        {user?.user_type === "buyer" &&
          <h1 className="text-xl">You don't have seller account. Click here to create one.</h1>
        }
        {user === null && <div className="hfp df aic jcc"> <h1 className="df aic"> <Loader2 className="w-5 h-5 mr-2 animate-spin" />Loading...</h1></div>}

      </body>
    </html>
  );
}
