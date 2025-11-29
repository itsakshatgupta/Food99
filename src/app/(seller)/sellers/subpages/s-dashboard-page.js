'use client'
// These icons are placeholders, assuming a library like 'lucide-react' is installed in a full Next.js project.
// In a standalone JS/HTML file, these would be replaced by inline SVG or images.
import { TrendingUp, Package, AlertTriangle, User, UserCircle2, HardDriveDownload, Stamp, NotebookPenIcon, FileBox, FileBadge, FileUser, Bell, Calculator, HandCoins, Calendar, Activity, ActivitySquare, FormInput, File, Stars, ChevronDown, Network, Wifi, Eye, MessageSquare, Search, BarChart3 } from 'lucide-react';
import { initialProducts, EVProductMetricsChart, METRIC_OPTIONS } from './s-product_manage';
import React, { useState, useMemo } from 'react';
import Seller_Page_Header from '@/components/seller-cpmt/header';


const lang__ = [
  'English (US)',
  'English (UK)',
  'Chinese',
  'Hindi',
  'Poland'
]
// Reusable Card component for metrics
const Card = ({ title, value, icon: Icon, colorClass, highlight }) => (
  <div className="bg-[#153443] border-t-4 border-b-2 border-slate-700/50 p-2 rounded-lg shadow-5xlg hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
    style={{ borderTopColor: highlight }}>
    <div className="flex items-center gap-1 justify-between mb-1">
      {/* Title */}
      <h2 className="text-xs font-light uppercase text-gray-400 tracking-wider">{title}</h2>
      {/* Icon */}
      <Icon size={18} className={` ${colorClass}`} />
    </div>
    <div className=" df aic gap01">

      {/* Value, using a monospaced font for a system/data feel */}
      <p className="text-md font-extrabold font-mono" style={{ color: highlight }}>
        {value}
      </p>

      <span className="text-sm">8/Aug'25 - 8/Aug'25</span>
    </div>
  </div>
);

// Component for the Recent Leads table
const RecentLeads = () => {
  const leads = [
    { buyer: 'Ramesh Kumar', product: 'Organic Honey', message: 'Need bulk order (Urgent)', date: '2025-11-10', statusColor: 'text-red-600' },
    { buyer: 'Priya Sharma', product: 'Dry Fruits Mix', message: 'Can you deliver in Delhi?', date: '2025-11-09', statusColor: 'text-cyan-600' },
    { buyer: 'Gita Patel', product: 'Industrial Steel Pipe', message: 'Requesting specification sheet.', date: '2025-11-08', statusColor: 'text-green-600' },
    { buyer: 'Vijay Singh', product: 'Custom CNC Parts', message: 'Urgent need for QTY 500.', date: '2025-11-08', statusColor: 'text-red-600' },
  ];

  return (
    <div className="mx-3">
      {/* Table Header */}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-xl border border-r border-gray-200">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            {/* Table Head Row - Darker background for contrast */}
            <tr className="uppercase text-xs border-b  border-gray-300">
              <th className="p-2 border-r border-gray-300">Buyer ID</th>
              <th className="p-2 border-r border-gray-300">Product Line</th>
              <th className="p-2 border-r border-gray-300">Query</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer transition duration-150">
                <td className="p-2.5 font-mono text-sm border-r border-gray-300 text-gray-600">{lead.buyer}</td>
                <td className="p-2.5 font-mono text-sm border-r border-gray-300 text-gray-600">{lead.product}</td>
                <td className="p-2.5 text-sm border-r border-gray-300">
                  <span className={lead.statusColor + ' font-medium'}>
                    {lead.message}
                  </span>
                </td>
                <td className="p-2.5 text-xs text-gray-500">{lead.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Call to action button */}
      <div className="mt-1 text-right">
        <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition duration-150">
          VIEW FULL LOG &rarr;
        </button>
      </div>
    </div>
  );
};

export default function SellerDashboard() {
  // const [selected_chart, set_selected_chart] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState(METRIC_OPTIONS[0].key);
  const [MetricChart, setMetricChart] = useState(METRIC_OPTIONS[0].key);

  // Define colors for consistent branding across cards
  const CYAN_PRIMARY = '#22d3ee'; // Tailwind cyan-400
  const RED_ALERT = '#f87171'; // Tailwind red-400
  const GREEN_SUCCESS = '#4ade80'; // Tailwind green-400

  return (
    <div className="h-screen font-sans oy pR">

      {/* Main Header - Bold, structured, with a separating line */}

      <Seller_Page_Header pageTitle={'Dashboard'} buttons={["Notification", "Forms", "Reports"]} />

      <div className="df gap-4 mx-3 my-4">
        <div className="border_ fx1">
          <div className="text-black px-1.5 py-2 df aic jcsb bg-white">
            <span className="df aic font-semibold md"><BarChart3 className="w-5 h-5 mr-2 text-green-600" />PRODUCT METRICS
              <div className="pR  ml-3 group cursor-pointer pdx05  text-sm pdy01 hover:bg-white">
                <span className="df aic gap01 font-normal" style={{ borderRadius: '5px' }}>Today<ChevronDown size={14} />
                </span>

                {/* Mega Menu Dropdown */}
                <div className="pA left-[calc(100%-180px)]">
                  <div className=" pR top-full mt-3    md:translate-x-0 hidden group-hover:block bg-[white] p-3 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                    {['Last week', 'This Month', 'Last Month', 'Last six Months', 'Custom Date'].map((item, subIndex) => (
                      <span key={subIndex} className="block text-[black] py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                        {item}
                      </span>
                    ))}
                  </div></div>
              </div>
            </span>
          </div>
          <div className="min-h-[fit-content] mx-3_">
            <div className="fx1 bg-[gray] h-full pR mb-2">

              <EVProductMetricsChart key={selectedMetric} products={initialProducts} a={selectedMetric} n={true} ct={null} />
            </div>
            <div className=" bg-[white] h-auto oy border border-gray-200 ">
              <div className="df gap-1">
                {[
                  { key: 'views', title: 'Most Viewed', color: 'green', icon: Eye },
                  { key: 'enquiries', title: 'Most Enquired', color: 'red', icon: MessageSquare },
                  { key: 'searches', title: 'Most Searched', color: 'blue', icon: Search },
                ].map(v =>
                  <div className="p-2 pR text-black text-[0.7rem] tac cursor-pointer hover:text-orange-600" onClick={() => setSelectedMetric(v.key)} style={{ userSelect: 'none' }}>
                    <div className="mb-1 xfg h-[100px]">
                      <div className="hfp wfp z-50 pA dn"></div>
                      <EVProductMetricsChart products={initialProducts} a={v.key} n={false} ct={'line'} />
                    </div>
                    <span>{v.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[15rem] text-gray-800">
          <div className="df fd-c hfp gap-2">
            <div className="border rounded-sm shadow-sm bg-white fx1 border-b">
              <h1 className="text-md font-semibold border-b mb-3 px-2 py-1  ">Summary last 7 days</h1>
              <div className=" mx-2">
                <div className="divide-y-2 divide-gray-100 space-y-2  text-sm">
                  <div>Product:---</div>
                  <div>Product:---</div>
                  <div>Product:---</div>
                  <div>Product:---</div>
                </div>
              </div>
            </div>
            <div className="border rounded-sm shadow-sm bg-white">

              <div className="divide-y-2 divide-gray-100 space-y-2 mx-2 text-sm border px-2 rounded-lg my-5">
                <div>Product:---</div>
                <div>Product:---</div>
                <div>Product:---</div>
                <div>Product:---</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Recent Leads Table */}
      <RecentLeads />

      {/* Metrics Grid */}
      <div className="dfl gap1 item-end pdy05  pdx1 gap-6 pS b-0 wfc dn " style={{ bottom: 0, left: 0 }}>
        <Card
          title="Leads Awaiting Processing"
          value="12"
          icon={TrendingUp}
          colorClass="text-cyan-400"
          highlight={CYAN_PRIMARY}
        />

        {/* <Card
          title="Total Product Inventory"
          value="56 SKUs"
          icon={Package}
          colorClass="text-green-400"
          highlight={GREEN_SUCCESS}
        />

        <Card
          title="CRITICAL Stock Alerts"
          value="4"
          icon={AlertTriangle}
          colorClass="text-red-400"
          highlight={RED_ALERT}
        /> */}
      </div>

    </div>
  );
}