'use client'
import React, { useState, useMemo } from 'react';
import { Mail, Search, Filter, Clock, MapPin, Tag, Hash, Calendar, Layers, ChevronDown, User } from 'lucide-react';
import Seller_Page_Header from '@/components/seller-cpmt/header';

// --- DUMMY DATA ---
const initialLeads = [
  { id: 101, buyer: 'Fusion Dynamics Co.', product: 'High-Torque Actuator Unit', query: 'Need technical drawing and bulk pricing (Qty 50).', date: '2025-11-10', status: 'New', priority: 'High', location: 'Houston, TX', daysActive: 1 },
  { id: 102, buyer: 'Apex Manufacturing', product: 'CNC Precision Router', query: 'What is the lead time for 2 units?', date: '2025-11-09', status: 'Contacted', priority: 'Medium', location: 'Chicago, IL', daysActive: 2 },
  { id: 103, buyer: 'Global Constructors', product: 'Industrial Grade Steel Beam', query: 'Looking for distributor partnership in EU.', date: '2025-11-08', status: 'Follow-up', priority: 'Medium', location: 'London, UK', daysActive: 3 },
  { id: 104, buyer: 'Tech Solutions Inc.', product: 'Advanced Sensor Array Kit', query: 'Compatibility with Siemens PLCs?', date: '2025-11-05', status: 'New', priority: 'High', location: 'San Jose, CA', daysActive: 6 },
  { id: 105, buyer: 'HydroPump Systems', product: 'Hydraulic Piston Set (Medium)', query: 'Inquiry on maintenance requirements.', date: '2025-11-01', status: 'Closed', priority: 'Low', location: 'Miami, FL', daysActive: 10 },
  { id: 106, buyer: 'Eastern Fabrication', product: 'Reinforced Concrete Mix', query: 'Price list for pallet quantities.', date: '2025-10-25', status: 'Follow-up', priority: 'Low', location: 'New York, NY', daysActive: 17 },
  { id: 107, buyer: 'Midwest Tools', product: 'Heavy Duty Lathe Machine', query: 'Requesting a demo schedule.', date: '2025-10-20', status: 'New', priority: 'Medium', location: 'Kansas City, MO', daysActive: 22 },
];

const STATUS_OPTIONS = ['All', 'New', 'Contacted', 'Follow-up', 'Closed'];

// Helper function to get color classes based on status and priority (adjusted for light theme)
const getStatusColor = (status) => {
  switch (status) {
    // Using light background colors with distinct dark text for high readability
    case 'New': return 'bg-red-100 text-red-800 border-red-300';
    case 'Contacted': return 'bg-cyan-100 text-cyan-800 border-cyan-300';
    case 'Follow-up': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Closed': return 'bg-green-100 text-green-800 border-green-300';
    default: return 'bg-gray-200 text-gray-600 border-gray-400';
  }
};

const getPriorityColor = (priority) => {
  // Using darker shades of red, yellow, and green for visibility against a light background
  switch (priority) {
    case 'High': return 'text-red-600';
    case 'Medium': return 'text-yellow-600';
    case 'Low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};


export default function LeadsManager() {
  const [leads, setLeads] = useState(initialLeads);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Filter by Status
      const statusMatch = filterStatus === 'All' || lead.status === filterStatus;

      // Filter by Search Term (Buyer, Product, or Query)
      const searchLower = searchTerm.toLowerCase();
      const searchMatch = lead.buyer.toLowerCase().includes(searchLower) ||
        lead.product.toLowerCase().includes(searchLower) ||
        lead.query.toLowerCase().includes(searchLower);

      return statusMatch && searchMatch;
    }).sort((a, b) => b.daysActive - a.daysActive); // Sort by days active (oldest first)
  }, [leads, filterStatus, searchTerm]);


  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;


  // Placeholder action: Update lead status
  const updateStatus = (id, newStatus) => {
    setLeads(prev => prev.map(lead =>
      lead.id === id ? { ...lead, status: newStatus } : lead
    ));
    console.log(`Lead ${id} status updated to: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pR">

      {/* Header */}
     <Seller_Page_Header pageTitle={'Lead'} />

      {/* Metrics Row */}


      {/* Controls and Table */}
      <div className="bg-white " style={{    boxShadow: 'inset 0 2px 5px 2px #f1f1f1'}}>

        {/* Lead Table */}
        <div className="overflow-x-auto border max-h-[calc(100vh-54px)] oy shadow-inner" style={{ scrollbarWidth: 'thin' }}>
          <table className="w-full text-left whitespace-nowrap ">

            <thead className="pS" style={{ top: 0 }}><tr  className="uppercase text-[0.650rem] text-[#1c1c1c]" style={{
              borderBottom: '1px solid #dddddd',
              boxShadow: '0 1px 3px 1px #ededed'
            }}>
              
              <th className="p-2 flex items-center text-gray-600"><Hash className="w-4 h-4 mr-1" /> ID</th>
              <th className="p-2 text-gray-600"><User className="w-4 h-4 mr-1 inline" /> Buyer</th>
              <th className="p-2 text-gray-600"><Layers className="w-4 h-4 mr-1 inline" /> Product</th>
              <th className="p-2 text-gray-600"><Clock className="w-4 h-4 mr-1 inline" /> Status</th>
              <th className="p-2 text-gray-600"><MapPin className="w-4 h-4 mr-1 inline" /> Location</th>
              <th className="p-2 text-gray-600"><Calendar className="w-4 h-4 mr-1 inline" /> Days Active</th>
              <th className="p-2 text-gray-600"><Tag className="w-4 h-4 mr-1 inline" /> Priority</th>
              <th className="p-2 text-center text-gray-600">Action</th>
            </tr></thead>

            <tbody className="divide-y divide-gray-200">{filteredLeads.map((lead) => (
              <tr key={lead.id} className="cursor-pointer hover:bg-red-50 transition duration-150">
                <td className="p-2.5 font-mono text-[0.775rem] text-gray-500">{lead.id}</td>
                <td className="p-2.5 text-[0.775rem] text-gray-800">{lead.buyer}</td>
                <td className="p-2.5 text-[0.775rem] text-cyan-700">{lead.product}</td>
                <td className="p-2">
                  <span className={`inline-block text-[0.6rem] font-semibold px-[8px] py-[1px] rounded-full border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="p-2.5 text-[0.775rem] text-gray-600">{lead.location}</td>
                <td className="p-2.5 text-[0.775rem] font-mono text-gray-700">{lead.daysActive}</td>
                <td className="p-2.5 text-[0.725rem] font-semibold">
                  <span className={getPriorityColor(lead.priority)}>{lead.priority}</span>
                </td>
                <td className="p-2.5 text-center">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`bg-gray-100 text-gray-800 text-[0.775rem] px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-400 cursor-pointer appearance-none transition duration-150`}
                  >
                    {STATUS_OPTIONS.filter(s => s !== 'All').map(s => (
                      <option
                        key={s}
                        value={s}
                        className="bg-white text-gray-900"
                      >
                        Move to {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}</tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-lg">
              No leads found matching the current filters.
            </div>
          )}

          <div className="df aic jcsb px-5 py-2  pS wfp" style={{
            bottom: 0, left: 0, background: '#ffffff80',
            boxShadow: '0 -5px 15px 5px white'
          }}>
            <div className="df aic gap-6">
              {/* Card: Total Leads */}
              <div className="bg-white bdArds df gap03 p-1.5 bg-gray-200 shadow-lg border-t-4 border-gray-300">
                <p className="text-xs font-mono  bdrds py-[4px] px-[9px]   font-bold bg-gray-200">{totalLeads}</p>
                <p className="text-[0.775rem] uppercase text-gray-500">Total Leads</p>
              </div>
              {/* Card: New Leads */}
              <div className="bg-white bdArds df gap03 p-1.5 bg-gray-200 shadow-lg border-t-4 border-red-600">
                <p className="text-xs font-mono  bdrds py-[4px] px-[9px]   font-bold bg-red-200">{newLeadsCount}</p>
                <p className="text-[0.775rem] uppercase text-gray-500">New Leads</p>
              </div>
              {/* Card: Follow-up */}
              <div className="bg-white bdArds df gap03 p-1.5 bg-gray-200 shadow-lg border-t-4 border-yellow-600">
                <p className="text-xs font-mono  bdrds py-[4px] px-[9px]   font-bold bg-yellow-200">{leads.filter(l => l.status === 'Follow-up').length}</p>
                <p className="text-[0.775rem] uppercase text-gray-500">Awaiting Follow-up</p>
              </div>
              {/* Card: Closed (Win/Loss) */}
              <div className="bg-white bdArds df gap03 p-1.5 bg-gray-200 shadow-lg border-t-4 border-green-600">
                <p className="text-xs font-mono  bdrds py-[4px] px-[9px]   font-bold bg-green-200">{leads.filter(l => l.status === 'Closed').length}</p>
                <p className="text-[0.775rem] uppercase text-gray-500">Closed</p>
              </div>
            </div>
            <div className="mt-4 text-right text-sm text-gray-500">
              Displaying {filteredLeads.length} of {totalLeads} Total Leads.
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}