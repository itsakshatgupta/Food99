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
    {icon:<LayoutDashboard/>,  name: "Dashboard", path: "/sellers/seller_dsbd" },
    {icon:<FileBox/>,  name: "Products", path: "/sellers/seller_prod" },
    {icon:<Table/>,  name: "Leads", path: "/sellers/seller_lead" },
    {icon:<MessageSquare/>,  name: "Messages", path: "/sellers/seller_msg" },
    {icon:<Boxes/>,  name: "Stock", path: "/seller/stock" },
    {icon:<Settings/>,  name: "Tools", path: "/seller/tools" },
    {icon:<Settings2/>,  name: "Settings", path: "/sellers/seller_stng" },
  ];

  return (
    <html>
      <title>Seller Dashboard || Yggimy</title>
      <body className={`${inter.variable}`}>

    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col border-r">
        <div className="p-4 df gap03 item-end text-[larger] text-white font-bold border-b border-[black] bg-[#263238]">
          Yggimy <span className="text-[#90A4AE] text-[medium] df aic">Seller</span>
        </div>
        <nav className="flex-1 mt-4 space-y-1 pdx05 text-sm">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-2 py-2 rounded-md hover:bg-gray-100 hover:text-[#ff6c00] transition ${
                pathname === item.path ? "bg-[#e2ecf4]" : ""
              }`}
            >
              <div className="df gap05">{item.icon}{item.name}</div>
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
