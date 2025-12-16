"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import "../globals.css"
import "../../../public/style/xnay.css";
import "../../../public/style/UI_Responsive.css";
import { Boxes, CircleDollarSign, Compass, Database, DollarSign, FileBox, Handshake, LayoutDashboard, LucideFilePenLine, MessageSquare, Settings, Settings2, Table } from "lucide-react";
import { Inter } from 'next/font/google';
import { useEffect, useState } from "react";
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
export default function SellerLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null)

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
    if (u) setUser(JSON.parse(u));
  }, []);


  return (
    <html>
      <title>Seller Dashboard || Yggimy</title>
      <body className={`${inter.variable}`}>

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
      </body>
    </html>
  );
}
