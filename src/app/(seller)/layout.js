"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import "../globals.css"
import "../../../public/style/xnay.css";
import "../../../public/style/UI_Responsive.css";
import { Boxes, Database, FileBox, LayoutDashboard, MessageSquare, Settings, Settings2, Table } from "lucide-react";
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
export default function SellerLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    {icon:<LayoutDashboard size={18}/>,  name: "Dashboard", path: "/sellers/seller_dsbd" },
    {icon:<FileBox size={18}/>,  name: "Products", path: "/sellers/seller_prod" },
    {icon:<Table size={18}/>,  name: "Leads", path: "/sellers/seller_lead" },
    {icon:<MessageSquare size={18}/>,  name: "Messages", path: "/sellers/seller_msg" },
    {icon:<Boxes size={18}/>,  name: "Stock", path: "/seller/stock" },
    {icon:<Settings size={18}/>,  name: "Tools", path: "/seller/tools" },
    {icon:<Settings2 size={18}/>,  name: "Settings", path: "/sellers/seller_stng" },
  ];

  return (
    <html>
      <title>Seller Dashboard || Yggimy</title>
      <body className={`${inter.variable}`}>

    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r">
        <div className="p-4 dfl dn gap03 item-end text-[larger] text-white font-bold border-b border-[black] bg-[#263238]">
          Yggimy <span className="text-[#90A4AE] text-[medium] df aic">Seller</span>
        </div>
        <h1 className="mg1">Menu</h1>
        <nav className="flex-1 mt-4 space-y-1 pdx05 text-md font500">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-2 py-1.5 rounded-md hover:bg-gray-100 hover:text-[royalblue] transition ${
                pathname === item.path ? "bg-[#fafafa] py-1 border border-[dodgerblue]" : ""
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
