'use client'
import React, { useState, useMemo, useEffect } from 'react';
// Assuming lucide-react icons are available for a Next.js environment
import { Edit, Trash2, ToggleLeft, ToggleRight, BarChart3, Package, CheckCircle, XCircle, ChevronDown, Eye, Search, MessageSquare, PieChart as PieIcon, LineChart as LineIcon, PlusSquare, Network, File, Plus, Delete, Box, Group, Archive } from 'lucide-react';

import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts";
import Seller_Page_Header, { lang__, Seller_Page_Top_Bar } from '@/components/seller-cpmt/header';
import { fetchAPI } from '@/app/(api)/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


// --- DUMMY DATA ---
export const initialProducts = [
  // Added fields for Enquiry and Search metrics
  { id: 1001, name: 'Industrial Grade Steel Beam (Type A)', model_no: 'SB-001-A', views: 6000, enquires: 150, searches: 800, status: true, category: 'Structural Materials' },
  { id: 1002, name: 'CNC Precision Router', model_no: 'CR-4K-22', views: 4500, enquires: 90, searches: 550, status: true, category: 'Machinery & Tools' },
  { id: 1003, name: 'High-Torque Actuator Unit', model_no: 'HTAU-900', views: 1800, enquires: 200, searches: 1200, status: false, category: 'Automation Components' }, // High Enquiry/Search
  { id: 1004, name: 'Advanced Sensor Array Kit', model_no: 'ASA-V3', views: 3200, enquires: 40, searches: 300, status: true, category: 'Automation Components' },
  { id: 1005, name: 'Hydraulic Piston Set (Medium)', model_no: 'HPS-M-05', views: 5500, enquires: 120, searches: 700, status: true, category: 'Hydraulics' },
  { id: 1006, name: 'Reinforced Concrete Mix (Bag)', model_no: 'RCM-40', views: 1200, enquires: 30, searches: 200, status: true, category: 'Structural Materials' },
  { id: 1007, name: 'Heavy Duty Lathe Machine', model_no: 'HDLM-X', views: 7100, enquires: 80, searches: 400, status: false, category: 'Machinery & Tools' }, // High View
];

const ALL_CATEGORIES = ['All Categories', ...new Set(initialProducts.map(p => p.category))];

export const METRIC_OPTIONS = [
  { key: 'views', title: 'Most Viewed', color: 'green', icon: Eye },
  { key: 'enquiries', title: 'Most Enquired', color: 'red', icon: MessageSquare },
  { key: 'searches', title: 'Most Searched', color: 'blue', icon: Search },
];

const CHART_TYPES = [
  { key: 'bar', title: 'Bar', icon: BarChart3 },
  { key: 'line', title: 'Line', icon: LineIcon },
  { key: 'pie', title: 'Pie', icon: PieIcon },
];

// --- MAIN CHART COMPONENT ---
export const EVProductMetricsChart = ({ products, a, n, ct }) => {
  const [selectedMetric, setSelectedMetric] = useState(a || METRIC_OPTIONS[0].key);
  const [chartType, setChartType] = useState(ct ? ct : "bar");

  const metric = METRIC_OPTIONS.find(m => m.key === selectedMetric);
  const color = metric.color;

  // Sort and slice top 5
  const chartData = products
    .sort((a, b) => b[metric.key] - a[metric.key])
    .slice(0, 5)
    .map(p => ({ name: p.name.split(" ").slice(0, 2).join(" "), value: p[metric.key] }));

  const MAX_VALUE = Math.max(...chartData.map(c => c.value), 1);

  return (
    <div className={`bg-white border border-gray-200 shadow-sm flex flex-col transition-all ${!n && 'hover:shadow-md'} duration-200 p-3 hfp`}>
      {/* Header */}
      <div className={`flex ${n ? 'justify-between' : 'justify-end'} items-center mb-2`}>
        {n && (
          <h2 className="font-bold text-md flex items-center text-gray-700">

            <span className="ml-1 text-blue-700">{metric.title.toUpperCase()}</span>
          </h2>
        )}
        {!n && <span className="font-mono text-[0.6rem] text-gray-500">{MAX_VALUE} {metric.title}</span>}

        {/* Metric Selector */}
        {n && (
          <div className="flex gap-2">
            <div className="dn ;inline-flex rounded-md border border-gray-300 shadow-sm overflow-hidden">
              {METRIC_OPTIONS.map((opt) => {
                const isActive = selectedMetric === opt.key;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedMetric(opt.key)}
                    className={`flex items-center px-2 py-1 text-xs transition-all ${isActive ? "text-white" : "text-gray-700"
                      }`}
                    style={{
                      backgroundColor: isActive ? opt.color : "white",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    <Icon size={12} className="mr-1" />
                    {opt.title}
                  </button>
                );
              })}
            </div>

            {/* Chart Type Selector */}
            <div className="inline-flex rounded-md border border-gray-300 shadow-sm overflow-hidden">
              {CHART_TYPES.map((type) => {
                const Icon = type.icon;
                const active = chartType === type.key;
                return (
                  <button
                    key={type.key}
                    onClick={() => setChartType(type.key)}
                    className={`flex items-center gap-1 px-2 py-1 text-xs transition-all ${active ? "bg-blue-600 text-white" : "text-gray-700 bg-white"
                      }`}
                  >
                    <Icon size={14} /> {type.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className={`${n ? 'h-[45vh] w-full' : 'h-[80vh] w-[calc(100%+52px)] ml-[-45px]'}  ${n ? 'text-xs' : 'text-[0.3rem]'}`} id="ccn">
        <style>{`#ccn svg{outline:none;}`}</style>
        <ResponsiveContainer width="100%" height={`${n ? "100%" : "150%"}`}>
          {chartType === "bar" && (
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="text-black ">
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={n && true} axisLine={n && true} />
              <YAxis tick={true} axisLine={true} />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar dataKey="value" fill={color} />
            </BarChart>
          )}

          {chartType === "line" && (
            <LineChart data={chartData} margin={{ ...(!n ? { top: 0, right: 0, left: 0, bottom: 0 } : { top: 8, right: 8, left: 8, bottom: 8 }) }} className="text-black">
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={n && true} axisLine={n && true} />
              <YAxis tick={true} axisLine={true} />
              {n && <Tooltip />}
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={n && true} activeDot={{ r: n ? 6 : 1 }} />
            </LineChart>
          )}

          {chartType === "pie" && (
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }} tick={true} className=" bg-[mintcream] text-black">

              <Tooltip />

              <Pie data={chartData} dataKey="value" nameKey="name" outerRadius="70%" label={({ name, value }) => `${name}: ${value}`}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={METRIC_OPTIONS[i % METRIC_OPTIONS.length]?.color || color} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      {n && (
        <div className="text-xs text-gray-500 mt-1">
          <span className="font-mono">MAX VALUE:</span> {MAX_VALUE} {metric.title}
        </div>
      )}
    </div>
  );
};

// --- CHART COMPONENT ---
export const ProductMetricsChart = ({ products }) => {
  const [selectedMetric, setSelectedMetric] = useState(METRIC_OPTIONS[0].key);

  const metric = METRIC_OPTIONS.find(m => m.key === selectedMetric);

  // Calculate max value for scaling the bars
  const MAX_VALUE = Math.max(...products.map(p => p[metric.key]), 1);

  const getMetricData = (p) => p[metric.key];
  const chartData = products
    .sort((a, b) => b[metric.key] - a[metric.key])
    .slice(0, 5) // Show top 5 products
    .map(p => ({
      name: p.name,
      value: getMetricData(p)
    }));

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-xl">
      {/* Chart Header and Selector */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`font-bold text-xl flex items-center text-${metric.color}-600`}>
          <BarChart3 className="w-5 h-5 mr-2" />
          PRODUCT METRICS: {metric.title.toUpperCase()}
        </h2>

        {/* Metric Selector Buttons */}
        <div className="inline-flex rounded-lg border border-gray-300 shadow-sm">
          {METRIC_OPTIONS.map((opt) => {
            const isActive = selectedMetric === opt.key;
            const Icon = opt.icon;
            return (
              <button
                key={opt.key}
                onClick={() => setSelectedMetric(opt.key)}
                className={`
                                flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 
                                ${isActive
                    ? `bg-${opt.color}-600 text-white hover:bg-${opt.color}-500`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                                ${opt.key === METRIC_OPTIONS[0].key ? 'rounded-l-lg' : ''}
                                ${opt.key === METRIC_OPTIONS[METRIC_OPTIONS.length - 1].key ? 'rounded-r-lg' : ''}
                            `}
              >
                <Icon className="w-4 h-4 mr-2" />
                {opt.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Bars */}
      <div className="flex items-end h-64 border-b-2 border-l-2 border-gray-300 pb-2 px-2">
        {chartData.map((item) => {
          const heightPercentage = Math.ceil((item.value / MAX_VALUE) * 90); // Max height 90%
          const barHeight = `${heightPercentage}%`;

          return (
            <div
              key={item.name}
              className="flex flex-col items-center mx-2 h-full justify-end"
              style={{ flexBasis: '20%' }}
            >
              {/* Tooltip/Value */}
              <span className={`text-xs font-mono text-${metric.color}-600 mb-1 animate-fadeInDown`}>
                {item.value}
              </span>
              {/* Bar */}
              <div
                className={`w-full bg-${metric.color}-500 hover:bg-${metric.color}-400 transition-all duration-500 ease-out rounded-t-sm`}
                style={{
                  height: barHeight,
                  boxShadow: `0 0 10px rgba(var(--tw-color-${metric.color}-500), 0.3)`
                }}
              ></div>
              {/* Label */}
              <span className="text-[10px] text-gray-600 font-sans mt-1 text-center truncate w-full" title={item.name}>
                {item.name.split(' ').slice(0, 2).join(' ')}...
              </span>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        <span className="font-mono">MAX VALUE: </span>{MAX_VALUE} {metric.title}
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---
export default function ProductManager() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [todelete, set_todelete] = useState(null);
  const r_ = useRouter()

  useEffect(() => {
    try {
      async function getsellerproduct() {
        const result = await fetchAPI("products", "GET", null, true);
        const res = await result;
        setProducts(res);
        console.log('res:', res);
      }

      getsellerproduct()
    } catch (error) {
      console.log('ee:', error)
    }
  }, [])

  useEffect(() => {
    if (todelete) {
      try {
        async function deletesellerproduct() {
          const result = await fetchAPI("products/" + todelete, "DELETE", null, true);
          const res = await result;
          setProducts(res);
          console.log('res:', res);
        }

        deletesellerproduct()
      } catch (error) {
        console.log('ee:', error)
      }
    }
  }, [todelete])

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All Categories') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Toggle the status (Active/Disabled) of a product
  const toggleProductStatus = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: !p.status } : p
      )
    );
    console.log(`Product ID ${id} status toggled.`);
  };

  // Delete a product
  const deleteProduct = (id) => {
    // Replaced alert() with console log for compliance
    console.log(`CONFIRM: Delete product ID ${id} is simulated. Product will be removed from list.`);
    setProducts(prev => prev.filter(p => p.id !== id));
    // In a real app, this should be replaced with a custom modal confirmation UI.
  };

  // Placeholder for Edit (in a real app, this would open a modal/form)
  const editProduct = (id) => {
    console.log(`Editing product ID ${id}. Opening editor...`);
    const productToEdit = products.find(p => p.id === id);
    // Replaced alert() with console log for compliance
    console.log(`Editing Product ${productToEdit.sku}: ${productToEdit.name}`);
    // In a real app, this should be replaced with a custom modal UI.
  };

  const h_buttons = [
    <Link href="http://localhost:3000/sellers/new/product" className="df aic gap-1"><Plus size={14} /> Add</Link>,
    <span className="df aic gap-1"><Network size={14} />Trace</span>,
    <span className="df aic gap-1"><File size={14} />Reports</span>,
  ]
  return (
    <div className="hfp df fd-c text-gray-800 oh">

      <Seller_Page_Header pageTitle={'Product'} buttons={h_buttons} subButtons={[
        <div className="pR  pdy01 pdx05 bdrds bg-[white] text-[0.725rem] group cursor-pointer  border hover:border-[currentcolor]">
          <span className="df aic gap01 " style={{ borderRadius: '5px' }}>Category<ChevronDown size={16} className="pl-1" />
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
        </div>]} />

      {/* Chart Row */}
      {/* <div className="mb-8 dn">
        <ProductMetricsChart products={products} />
      </div> */}

      <div className="fx1 df oh">

        {/* Product Table */}

        <div className="bg-white w-[16rem] border-r df fd-c">
          {/* Search */}
          <div className="py-1 mx-1 border-b_ border-gray-200 df aic jcsb gap1">
            <span className="mr-5 text-md  fx1 p-1">Category</span>
            <div className="relative fx1 dn">
              <Search className="w-4 h-4 absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Find colleague or vendor..."
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-1 pl-6 pr-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              //  value={searchQuery}
              //  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Search size={16} />
            <Group size={16} />
            <Archive size={16} />
          </div>
          <div className="text-sm px-1 fx1 oy" style={{scrollbarWidth:'thin'}}>
            {[{category_name:'Machinary', sub_category_name:['Machinary', 'Catipillar', 'Usha', 'Eachier']},
            {category_name:'Component', sub_category_name:['Component', 'Usha', 'Eachier', 'Cromption']},
            {category_name:'Tools', sub_category_name:['Tools', 'Usha', 'Max Iron', 'Havells']}
   ].map(i => <div className="px-1 py-2 border-b bg-gray-50_ space-y-[5px]"><div className="bg-gray-100_">{i.category_name} ({i.sub_category_name.length})</div>{i.sub_category_name.map(v=><div className="px-2 py-[1px] border_ rounded-md bg-white hover:bg-gray-50">{v}</div>)}</div>)}
          </div>

        </div>

        {/* Responsive Table Container */}
        <div className="fx1 df fd-c hfp oh">
          <div className="rounded-md_ _m-1 p-3 py-1">
            <div className="df aic">
              <div className="fx1">
            <h1 className="text-md font-semibold">Machinary</h1>
            <h2 className="text-xs">Commercial machines and related product</h2>
              </div>
              <span className="rounded-full text-white bg-black px-2.5 text-sm">Edit</span>
              </div>
          </div>

          <div className="oy border-t fx1">
            <table className="w-full text-left whitespace-nowrap">
              <thead><tr className="uppercase text-[0.650rem] text-[#1c1c1c] border-b pS top-0 bg-white z-50">
                {/* <th className="p-2 border-rl border-gray-200">Media</th> */}
                <th className="p-2 border-rl border-gray-200 tac">Product</th>
                <th className="p-2 border-rl border-gray-200 tac">SKU / ID</th>
                {/* <th className="p-2 border-rl border-gray-200 tac">Category</th> */}
                <th className="p-2 border-rl border-gray-200 tac">Views (7d)</th>
                <th className="p-2 border-rl border-gray-200 tac">Enquiries</th>
                <th className="p-2 border-rl border-gray-200 tac">Availability</th>
                {/* <th className="p-2 text-center dn">Actions</th> */}
              </tr></thead>
              <tbody className="divide-y divide-gray-200 tac">{filteredProducts.map((p, i) => (
                <tr key={i} className="m-1 cursor-pointer hover:bg-gray-50 transition duration-150" onClick={() => {
                  //  set_todelete(p.id)
                  r_.push('product/'+p.id)
                   }}>
                  {/* <td className="px-1.5 font-mono text-sm border-rl border-gray-200 text-gray-700">
                    <div className="w-[64px] h-[64px] bdArds oh pR border border-black_ m-1" onClick={() => { set_todelete(p.id) }}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                      />
                    </div>
                  </td> */}
                  <td className="px-2 tac text-sm border-rl df border-gray-200 text-gray-900 gap-2 my-1.5">
                    <div className="w-[54px] h-[54px] bdArds oh pR border border-black_ " onClick={() => { set_todelete(p.id) }}>
                      <Image
                        src={p.image||'/Food99.png'}
                        alt={p.name}
                        fill
                      />
                    </div>
                    <div className="">
                      <div>{p.name}</div>                   {!p.status && false===true&& <span
                        className={`inline-flex items-center px-[8px] py-[1px] font-semibold_ rounded-full text-xs ${p.status ? 'bg-green-100_' : 'bg-red-100 text-red-700'}`}
                      >
                        {p.status ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                        {p.status ? 'In stock' : 'Out of stock'}
                      </span>}
                    </div></td>
                  <td className="px-1.5 tac font-mono text-xs border-rl border-gray-200 text-gray-700">{p.model_no}</td>
                  {/* <td className="px-1.5 tac text-xs border-rl border-gray-200 text-gray-700">
                    <span className="bg-[#fbfbfb] border px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  </td> */}
                  <td className="px-1.5 tac text-sm font-mono border-rl border-gray-200 text-green-600">{p.views}</td>
                  {/* New Enquiry Column */}
                  <td className="px-1.5 tac text-sm font-mono border-rl border-gray-200 text-red-600">{p.enquires}</td>
                  <td className="px-1.5 tac text-xs border-rl border-gray-200">
                    <span
                      className={`inline-flex items-center px-[8px] py-[1px] font-semibold_ rounded-full ${p.status ? 'bg-green-100_' : 'bg-red-100 text-red-700'}`}
                    >
                      {p.status ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                      {p.status ? 'In stock' : 'Out of stock'}
                    </span>
                  </td>
                  <td className="p-1.5 text-center dn">
                    <div className="flex justify-center space-x-3">

                      {/* Toggle Button */}
                      <button
                        onClick={() => toggleProductStatus(p.id)}
                        className={`p-1.5 rounded-full transition duration-150 ${p.status ? 'bg-red-100 hover:bg-red-200' : 'bg-green-100 hover:bg-green-200'} ${p.status ? 'text-red-600' : 'text-green-600'}`}
                        title={p.status ? "Disable Product" : "Activate Product"}
                      >
                        {p.status ? <ToggleLeft size={17} /> : <ToggleRight size={17} />}
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => editProduct(p.id)}
                        className="p-1.5 bg-cyan-100 hover:bg-cyan-200 rounded-full transition duration-150 text-cyan-600"
                        title="Edit Product"
                      >
                        <Edit size={17} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150 text-gray-500"
                        title="Delete Product"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-lg">
              No products found in the "{selectedCategory}" category.
            </div>
          )}
        </div>
        {/* New Product Button
        <div className="mt-6 text-center">
            <button className="text-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-xl transition duration-150 ease-in-out">
                + ADD NEW PRODUCT
            </button>
        </div> */}
      </div>
    </div>
  );
}