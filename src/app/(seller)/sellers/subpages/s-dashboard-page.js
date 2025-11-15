'use client'
// These icons are placeholders, assuming a library like 'lucide-react' is installed in a full Next.js project.
// In a standalone JS/HTML file, these would be replaced by inline SVG or images.
import { TrendingUp, Package, AlertTriangle, User, UserCircle2, HardDriveDownload, Stamp, NotebookPenIcon, FileBox, FileBadge, FileUser, Bell, Calculator, HandCoins, Calendar, Activity, ActivitySquare, FormInput, File, Stars, ChevronDown, Network, Wifi, Eye, MessageSquare, Search, BarChart3 } from 'lucide-react';
import { initialProducts, EVProductMetricsChart, METRIC_OPTIONS } from './s-product_manage';
import React, { useState, useMemo } from 'react';


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
    { buyer: 'Ramesh Kumar', product: 'Organic Honey', message: 'Need bulk order (Urgent)', date: '2025-11-10', statusColor: 'text-red-400' },
    { buyer: 'Priya Sharma', product: 'Dry Fruits Mix', message: 'Can you deliver in Delhi?', date: '2025-11-09', statusColor: 'text-cyan-400' },
    { buyer: 'Gita Patel', product: 'Industrial Steel Pipe', message: 'Requesting specification sheet.', date: '2025-11-08', statusColor: 'text-green-400' },
    { buyer: 'Vijay Singh', product: 'Custom CNC Parts', message: 'Urgent need for QTY 500.', date: '2025-11-08', statusColor: 'text-red-400' },
  ];

  return (
    <div className="">
      {/* Table Header */}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto bg-white border border-r border-gray-700">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            {/* Table Head Row - Darker background for contrast */}
            <tr className="uppercase text-xs text-white bg-[#153443]">
              <th className="p-2 border-r border-gray-700">Buyer ID</th>
              <th className="p-2 border-r border-gray-700">Product Line</th>
              <th className="p-2 border-r border-gray-700">Query</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-700">
            {leads.map((lead, index) => (
              <tr key={index} className="hover:bg-blue-100/50 cursor-pointer transition duration-150">
                <td className="p-2.5 font-mono text-sm border-r border-gray-700 text-gray-600">{lead.buyer}</td>
                <td className="p-2.5 font-mono text-sm border-r border-gray-700 text-gray-600">{lead.product}</td>
                <td className="p-2.5 text-sm border-r border-gray-700">
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
      <div className="mt-4 text-right">
        <button className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition duration-150">
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
    <div className="h-screen text-gray-100 font-sans oy bg-[#FAFAFA] pR">

      {/* Main Header - Bold, structured, with a separating line */}
      <div className="bg-[#1a272e] ">
        <div className="pdr1 pdl08 df jcsb text-lg font500 text-[#5d5d5d]  border-b-2 border-cyan-500/50 py-2.5 ">
          <span className="text-[#E0E0E0]">J.k Traders</span>
          <div className="df aic gap05 text-white text-sm">
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#2a3b44] bdArds transition px-2 bg-[]">
              <Bell stroke="white" size={18} />
              Notification
            </div>
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#2a3b44] bdArds transition px-2 bg-[]">
              <Stamp stroke="white" size={18} />

              Digital-Sign
            </div>
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#2a3b44] bdArds transition px-2 bg-[]">
              <NotebookPenIcon stroke="white" size={18} />

              Notebook
            </div>
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#2a3b44] bdArds transition px-2 bg-[]">
              <Calculator stroke="white" size={18} />

              Calculator
            </div>
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#2a3b44] bdArds transition px-2 bg-orange-800 text-[gold]">
              <UserCircle2 stroke="gold" size={18} />

              Account
            </div>

          </div>
        </div>
        <div className="df jcsb text-xs font500 pr-2">
          <div className=" df aic gap01 border-b-2 border-cyan-500/50 bg-[#263238]">
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#546e7a] transition px-2 bg-[#2d3d41]">
              <Stars stroke="white" size={16} />

              AI
            </div>
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#546e7a] transition px-2 bg-[#2d3d41]">
              <Calendar stroke="white" size={16} />

              Calender
            </div>
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#546e7a] transition px-2 bg-[#2d3d41]">
              <File stroke="white" size={16} />

              Forms
            </div>
          </div>
          <div className="df aic">
            <div className="df aic gap03 py-1 cursor-pointer transition px-2 bg-[#2d3d41]l text-green-500">

              <Wifi size={14} />
              Broadcast Message
            </div>
            <div className="df aic gap03 py-1 cursor-pointer hover:bg-[#546e7a] transition px-2 bg-[#2d3d41]l">
              <span className="df">
                Subscribers:
              </span>
              12
            </div>
            <div className="pR  group cursor-pointer pdx05 pdy01 hover:bg-[#37474F]">
              <span className="df aic gap01 " style={{ borderRadius: '5px' }}>En<ChevronDown size={14} />
              </span>

              {/* Mega Menu Dropdown */}
              <div className="pA left-[calc(100%-180px)]">
                <div className=" pR top-full mt-3    md:translate-x-0 hidden group-hover:block bg-[white] p-3 rounded-xl border border-gray-600 min-w-[180px] shadow-2xl z-[60]">
                  {lang__.map((item, subIndex) => (
                    <span key={subIndex} className="block text-[black] py-1 px-2 rounded-lg transition-colors hover:text-[#F97316] hover:bg-gray-700 text-[0.85rem] font-normal">
                      {item}
                    </span>
                  ))}
                </div></div>
            </div>
          </div>
        </div>
      </div>


      <div className="border">
        <div className="text-black px-1.5 py-2 df aic jcsb bg-white">
          <span className="df aic"><BarChart3 className="w-5 h-5 mr-2 text-green-600" />PRODUCT METRICS
            <div className="pR  ml-3 group cursor-pointer pdx05  text-xs pdy01 hover:bg-white">
              <span className="df aic gap01 " style={{ borderRadius: '5px' }}>Today<ChevronDown size={14} />
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
          <span className="df aic gap03 text-gray-800 text-xs">Select Dataset:
            <div className="pR group cursor-pointer bdrds bg-white border pdx05 text-gray-800  pdy01 hover:bg-blue-100">
              <span className="df aic gap01 text-[0.675rem] transition" style={{ borderRadius: '5px' }}>Default<ChevronDown size={10} />
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
        <div className="min-h-[fit-content] df  jcsb ">
          <div className="fx1 bg-[gray] h-full pR ">

            <EVProductMetricsChart key={selectedMetric} products={initialProducts} a={selectedMetric} n={true} ct={null} />
          </div>
          <div className="w-[15vw] bg-[white] h-auto oy bg-gray-100/10  border border-gray-200 ">
            <div className="h-[100px]">
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