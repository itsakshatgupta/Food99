'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Mail, Search, Filter, Clock, MapPin, Tag, Hash, Calendar, Layers, ChevronDown, User, Group, Archive, Download, ArrowLeftIcon, MessageCirclePlus, MoreVerticalIcon, MoreVertical, PictureInPicture, Eye, Stars, Info, PhoneCall, MessageCircle, Dot, BookMarked, Bookmark, Carrot, Handshake, CircleArrowUp, LucideRouteOff, EyeOff } from 'lucide-react';
import Seller_Page_Header, { Seller_Page_Top_Bar } from '@/components/seller-cpmt/header';
import { Send, HardHat, Truck, Briefcase, ChevronLeft, Image, File, Video } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

// --- DUMMY DATA ---
const contactData = [
  { id: 'eng-1', name: 'Alice (Lead Engineer)', status: 'Online', role: 'Engineer', icon: HardHat, lastMessage: 'Confirmed batch specs for Actuator.', time: '10:30 AM' },
  { id: 'ven-2', name: 'Bob (Vendor Manager)', status: 'Offline', role: 'Vendor', icon: Truck, lastMessage: 'Waiting on the final quote confirmation.', time: 'Yesterday' },
  { id: 'pm-3', name: 'Charlie (Project Manager)', status: 'Away', role: 'Manager', icon: Briefcase, lastMessage: 'The Q3 report is ready for review.', time: '09:15 AM' },
  { id: 'user-4', name: 'Dana (Logistics)', status: 'Online', role: 'Engineer', icon: User, lastMessage: 'Schedule update: Shipment delayed 1hr.', time: '11:45 AM' },
];
const messageData = {
  'eng-1': [
    { sender: 'other', text: "Hey! Can you confirm the pressure tolerance for the new Actuator units (Batch A) before we start assembly?", timestamp: '10:20 AM' },
    { sender: 'user', text: "Yes, just confirmed the specs. Tolerance is set to 800 PSI. Make sure the testing is documented.", timestamp: '10:25 AM' },
    { sender: 'other', text: "Understood. Starting assembly now. Will send documentation by EOD.", timestamp: '10:30 AM' },
    { sender: 'user', text: "Thanks, Alice.", timestamp: '10:31 AM' },
  ],
  'ven-2': [
    { sender: 'other', text: "We're preparing the final quote for the CNC machine order (2 units). Will include the maintenance package options.", timestamp: 'Yesterday' },
    { sender: 'user', text: "Please expedite the quote. We need to finalize the PO by Tuesday morning.", timestamp: 'Yesterday' },
  ],
  'pm-3': [
    { sender: 'other', text: "The Q3 performance report is on the shared drive. Please review the 'Operational Efficiency' section for next steps.", timestamp: '09:10 AM' },
    { sender: 'user', text: "Got it. I'll review it this afternoon and send feedback.", timestamp: '09:15 AM' },
  ],
  'user-4': [
    { sender: 'other', text: "Heads up: Shipment 45B is delayed by one hour due to traffic congestion near the warehouse.", timestamp: '11:45 AM' },
    { sender: 'user', text: "Acknowledged. Updating receiving schedule. Thanks for the quick notification.", timestamp: '11:47 AM' },
  ],
};

// --- DUMMY DATA ---
const initialLeads = [
  {
    id: 101,
    buyer: 'Fusion Dynamics Co.',
    email: 'demo@demodomain.com',
    phone: '+91-888-131-6612',
    product: 'High-Torque Actuator Unit',
    query: 'Need technical drawing and bulk pricing (Qty 50).',
    date: '2025-11-10',
    status: 'New',
    priority: 'High',
    location: 'Houston, TX',
    daysActive: 1,
    comment:'buyer said to call on earlier morning',
    last_update:'11-23-20',

    // when multi users manage leads.
    // updated_by:'',

    // from fetch on specificlead function.
    stay: '2.86 min',
    search_rank: '22/100+',
    email: 'demo@demostore.com'
  },
  { id: 102, buyer: 'Apex Manufacturing', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'CNC Precision Router', query: 'What is the lead time for 2 units?', date: '2025-11-09', status: 'Contacted', priority: 'Medium', location: 'Chicago, IL', daysActive: 2, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
  { id: 103, buyer: 'Global Constructors', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'Industrial Grade Steel Beam', query: 'Looking for distributor partnership in EU.', date: '2025-11-08', status: 'Follow-up', priority: 'Medium', location: 'London, UK', daysActive: 3, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
  { id: 104, buyer: 'Tech Solutions Inc.', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'Advanced Sensor Array Kit', query: 'Compatibility with Siemens PLCs?', date: '2025-11-05', status: 'New', priority: 'High', location: 'San Jose, CA', daysActive: 6, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
  { id: 105, buyer: 'HydroPump Systems', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'Hydraulic Piston Set (Medium)', query: 'Inquiry on maintenance requirements.', date: '2025-11-01', status: 'Closed', priority: 'Low', location: 'Miami, FL', daysActive: 10, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
  { id: 106, buyer: 'Eastern Fabrication', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'Reinforced Concrete Mix', query: 'Price list for pallet quantities.', date: '2025-10-25', status: 'Follow-up', priority: 'Low', location: 'New York, NY', daysActive: 17, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
  { id: 107, buyer: 'Midwest Tools', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'Heavy Duty Lathe Machine', query: 'Requesting a demo schedule.', date: '2025-10-20', status: 'New', priority: 'Medium', location: 'Kansas City, MO', daysActive: 22, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
  { id: 108, buyer: 'Midwest Tools', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'Heavy Duty Lathe Machine', query: 'Requesting a demo schedule.', date: '2025-10-20', status: 'New', priority: 'Medium', location: 'Kansas City, MO', daysActive: 22, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
  { id: 109, buyer: 'Midwest Tools', email: 'demo@demodomain.com', phone: '+91-888-131-6612', product: 'Heavy Duty Lathe Machine', query: 'Requesting a demo schedule.', date: '2025-10-20', status: 'New', priority: 'Medium', location: 'Kansas City, MO', daysActive: 22, comment:'buyer said to call on earlier morning', last_update:'11-23-20' },
];

const STATUS_OPTIONS = ['All', 'New', 'Contacted', 'Follow-up', 'Closed'];

// Helper function to get color classes based on status and priority (adjusted for light theme)
const getStatusColor = (status) => {
  switch (status) {
    // Using light background colors with distinct dark text for high readability
    case 'New': return 'bg-red-100/80 text-red-800 border-red-300';
    case 'Contacted': return 'bg-cyan-100/80 text-cyan-800 border-cyan-300';
    case 'Follow-up': return 'bg-yellow-100/80 text-yellow-800 border-yellow-300';
    case 'Closed': return 'bg-green-100/80 text-green-800 border-green-300';
    default: return 'bg-gray-200 text-gray-600 border-gray-400';
  }
};
const getStatusIcon = (status) => {
  switch (status) {
    // Using light background colors with distinct dark text for high readability
    case 'New': return <Stars size={14}/>;
    case 'Contacted': return <Handshake size={14}/>;
    case 'Follow-up': return <CircleArrowUp size={14}/>;
    case 'Closed': return <EyeOff size={14}/>;
    default: return <Stars size={14}/>;}
};


const getPriorityColor = (priority) => {
  // Using darker shades of red, yellow, and green for visibility against a light background
  switch (priority) {
    case 'High': return 'bg-red-300 px-[1px]';
    case 'Medium': return 'bg-yellow-300 px-[1px]';
    case 'Low': return 'bg-green-300 px-[1px]';
    default: return 'bg-gray-300 px-[1px]';
  }
};

const ChatArea = ({ activeContact, messages, sendMessage, setActiveChat }) => {
  const messageEndRef = useRef(null);
  const [inputText, setInputText] = useState('');

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const MessageBubble = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
      <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-xs sm:max-w-md p-3 rounded-xl shadow-md ${isUser
            ? 'bg-white text-gray-800 rounded-br-none'
            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
            }`}
        >
          <p className="text-sm break-words">{message.text}</p>
          <span className={`block mt-1 text-right text-xs ${isUser ? 'text-gray-600' : 'text-gray-800'}`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    );
  };

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(activeContact.id, inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeContact) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8">
        <Mail className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-xl font-medium text-gray-500">Select a contact to start a conversation.</p>
        <p className="text-sm text-gray-400 mt-2">All industrial communication, tracked and logged.</p>
      </div>
    );
  }

  const Icon = activeContact.icon || User;

  return (
    <div className="flex flex-col h-full wfp  border_">
      {/* Header */}
      {/* <div className="flex items-center p-2 border-b border-gray-200 bg-white oh
      ">
        <button className="sm:hidden mr-3 text-gray-600 hover:text-red-600" onClick={() => setActiveChat(null)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <Icon className="w-4 h-4 text-gray-700 mr-3" />
        <div className="flex-1">
          <h2 className="text-sm font500 text-gray-800">{activeContact.name}</h2>
          <div className="flex items-center text-xs text-gray-500">
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusColor(activeContact.status)}`}></span>
            {activeContact.status}
          </div>
        </div>
        <span className="text-xs px-2 tac df aic jcc fd-c gap-1 text-gray-800"><MoreVertical size={18}/>More</span>

      </div> */}

      {/* Message History */}
      <div className="flex-1  oh df fd-c bg-gray-50/40 bg-gray-50_">
        <div className="p-4 overflow-y-auto fx1 ">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
          <div ref={messageEndRef} />
        </div>
        {/* Input Area */}
        <div className="py-1 bg-white border-t">
          <div className="px-2">
            <div className="df aic gap-1 py-1.5  text-xs"><span className="px-2 py-1 border rounded-xl border-gray-300 bg-white">Send Product Inforamtion</span> <span className="px-2 py-1 border rounded-xl border-gray-300 bg-white">Send Form</span></div>

            <div className="flex gap-2 bg-white items-center border px-2 py-1 rounded-xl overflow-hidden">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a new operational message..."
                rows="1"
                className="flex-1 resize-none text-sm text-gray-800 border-none focus:ring-0 focus:outline-none bg-white"
                style={{ maxHeight: '100px' }}
              />
              <button
                onClick={handleSend}
                className="p-1.5 df aic bg-gray-100 rounded-xl hover:bg-red-700 transition duration-150 disabled:text-gray-300"
                disabled={!inputText.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

const SpecificLead = ({ lead }) => {
  const [floating, setFloating] = useState(false);
  const [contacts, setContacts] = useState(contactData);
  const [activeChatId, setActiveChatId] = useState(contactData[0].id); // Default to the first contact
  const [messages, setMessages] = useState(messageData);
  const [searchQuery, setSearchQuery] = useState('');

  const activeContact = contacts.find(c => c.id === activeChatId);
  const activeMessages = messages[activeChatId] || [];

  const sendMessage = (chatId, text) => {
    const newMessage = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update last message preview in contacts list
    setContacts(prev => prev.map(c =>
      c.id === chatId ? { ...c, lastMessage: text, time: newMessage.timestamp } : c
    ));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const r__ = useRouter();
  useEffect(() => { setFloating(false) }, [lead])
  //  id: 101, buyer: 'Fusion Dynamics Co.', product: 'High-Torque Actuator Unit', query: 'Need technical drawing and bulk pricing (Qty 50).', date: '2025-11-10', status: 'New', priority: 'High', location: 'Houston, TX', daysActive: 1, stay:'2.86 min', search_rank:'22/100+', email:'demo@demostore.com'
  return (
    <>
      {floating ? <div className="pA w-[14rem] h-[8rem] border rounded-xl bg-white text-sm text-black z-50 df fd-c aic jcc bottom-10 right-5 shadow-md">{lead.buyer}<PictureInPicture className="cursor-pointer" onClick={() => setFloating(false)} /><Carrot className="cursor-pointer" onClick={() => r__.push('?')} /></div> : <div className="pA wfp hfp bg-white z-50 p-2 df fd-c">
        <div className="df jcsb wfp mb-3"><div className="df aic gap-3 whitespace-nowrap"><div className="wfp bg-gray-200 rounded-full p-1"><ArrowLeftIcon className="cursor-pointer" size={18} onClick={() => r__.push('?')} /></div><h1>Lead: #{lead.id}-258 ({lead.priority})</h1></div><div className="df aic gap-5"><PictureInPicture size={20} className="cursor-pointer" onClick={() => setFloating(true)} /><Download size={20} /><Bookmark size={20} /><MoreVertical size={20} /></div></div>

        <div className="fx1 df mx-1 oh gap-1">
          <div className="fx1 space-y-4 oy hfp" style={{ scrollbarWidth: 'thin', scrollbarColor: 'whitesmoke white' }}>
            <div className="bg-gray-100_ df fd-c jcsb px-2 py-1 aic_ border text-xs rounded-md gap02">
              <div className="df gap-1 aic"><span>{lead.date}</span><Dot /><span>{lead.status}</span>
              </div>
            <div className="mx-1_ rounded-md df">
              <h1 className="text-sm mb-1 text-[#42464d]">Comment:</h1>
              <p className="text-sm mx-1">buyer said to call on earlier morning.</p>
            </div>
            </div>
            <div>
              <h1 className="text-sm mb-1">User Profile</h1>
              <div className="border  rounded-lg oh">
                <div className="bg-purple-600 df aic pt-4 mb-2 pR px-3">

                  <div className="z-50 rounded-full border-2 border-white bg-black w-[84px] h-[84px]"></div>
                  <div className="mx-1 z-50">
                    <div className="">
                      <h1 className="text-md text-white font-semibold tac ">Demo Shop</h1>
                      <div className="text-xs text-gray-500  tac">
                        <span className="bg-gray-100 mt-1 px-2 rounded-xl">Joined 5yr ago</span>

                      </div>
                    </div>
                  </div>
                  <div className="fx1 df justify-end">
                    <span className="bg-white text-white_ px-2 py-1 text-xs border border-purple-600 rounded-lg df aic gap-1 px-3"><MessageCircle size={16} />Move to Chat</span>
                  </div>
                </div>
                <div className="df gap-2 pl-[90px] pt-2 bg-white pR bottom-5 text-xs">
                  <span className="p-1 border border-purple-600 rounded-lg df aic gap-1 px-3"><PhoneCall size={16} />Call</span>
                  <span className="p-1 border border-purple-600 rounded-lg df aic gap-1 px-3"><Mail size={16} />Send Mail</span>
                  <span className=" bg-black text-white px-2 py-1 text-xs rounded-md mr-2">Add as B2b Partner</span>

                </div>

                <div className="space-y-4">
                  <div className="text-sm mt-2 mx-1 divide-y-2 divide-gray-100 text-gray-800">
                    <div className="px-1 df aic gap-1 py-1.5"><User size={16} /><div className="fx1">{lead.buyer}</div><span className="text-purple-600 text-xs">Owner</span></div>
                    <div className="px-1 df aic gap-1 py-1.5"><Mail size={16} />{lead.email}</div>
                    <span className="px-1 df aic gap-1 py-1.5"><MapPin size={16} /><div className="fx1">{lead.location}</div><span className="text-xs text-blue-600">Go to map</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-sm mb-1 text-black">Product Viewed</h1>
              <div className="df aic gap-2 bg-gray-50 mx-1 p-2 pR">
                <div className="w-[3rem] h-[3rem] border border-black rounded-md bg-white"></div><div className="text-sm fx1">{lead.product}<div className="text-xs font-mono_ mb-2 text-gray-700">Via Search Result</div></div>
                <span className="text-sm text-blue-600 underline mr-3 cursor-pointer">View</span>
              </div>
            </div>

            <div>
              <div className="df aic gap-2">
                <div className="border-r text-sm tac py-1 px-8  border rounded-xl"><div className="df aic gap-1 "><Clock size={16} />Stay</div><div className="text-sm tac">{lead.stay}</div></div>
                <div className="border-r text-sm tac py-1 px-8  border rounded-xl"><div className="df aic gap-1 "><Eye size={16} />Watch Media</div><div className="text-sm tac">80%</div></div>
                <div className="border-r text-sm tac py-1 px-8  border rounded-xl"><div className="df aic gap-1 "><Stars size={16} />Your Rank <Info size={12} className="ml-2" /></div><div className="text-sm tac">{lead.search_rank}</div></div>
                <div></div></div>
            </div>

            <div className="">
              <h1 className="mb-1 text-sm">User Also Explored</h1>
              <div className="ox df gap-3">
                {[1, 2, 3, 4, 5].map(v => <span className="h-[8rem] min-w-[7rem] max-w-[8rem] border rounded-lg bg-white"></span>)}
              </div>
            </div>
          </div>
          <div className="w-[18rem] hfp rounded-xl border shadow-sm oh bg-gray-50 df fd-c jcsb">
            <div className="py-1.5 px-1 bg-white border-b df"><h1 className="text-sm">Conversations</h1></div>
            <div className="fx1 oy">
              <ChatArea
                activeContact={activeContact}
                messages={activeMessages}
                sendMessage={sendMessage}
                setActiveChat={setActiveChatId}
              />
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
export default function LeadsManager() {
  const [leads, setLeads] = useState(initialLeads);
  const [selectleads, setSelectLeads] = useState(null);
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

  const searchParams = useSearchParams()
  const r_ = useRouter()
  const l_id = searchParams.get('lead')
  useEffect(() => {
    console.log('l_id:', l_id, initialLeads.find(v => v.id === l_id))
    setSelectLeads(initialLeads.find(v => v.id === parseInt(l_id)))
  }, [l_id])

  return (
    <>
      <div className="df fd-c hfp">
        {/* Header */}
        <Seller_Page_Header pageTitle={'Lead'} buttons={['Search Lead', 'Histroy']} />
        <div className="fx1 bg-gray-50_ text-gray-900 pR oh">

          {selectleads && <SpecificLead lead={selectleads} />}

          <div className="fx1 hfp oh df fd-c">
            {/* Lead Table */}
            <div className="fx1 overflow-x-auto max-h-full oy border-r">
              <table className="w-full text-left whitespace-nowrap">

                <thead className="pS" style={{ top: 0 }}><tr className="text-sm font-bold_ uppercase_ border-b">

                  <th className="px-3 py-1 text-left flex items-center"><Hash className="w-3.5 h-3.5 mr-1" /> ID</th>
                  <th className="px-3 _border-l py-1 text-left"><Layers className="w-3.5 h-3.5 mr-1 inline" /> Product</th>
                  <th className="px-3 _border-l py-1 text-left"><User className="w-3.5 h-3.5 mr-1 inline" /> Buyer</th>
                  <th className="px-3 _border-l py-1 text-left"><MapPin className="w-3.5 h-3.5 mr-1 inline" /> Location</th>
                  <th className="px-3 _border-l py-1 text-left"><Clock className="w-3.5 h-3.5 mr-1 inline" /> Status</th>
                  <th className="px-3 _border-l py-1 text-left"><Calendar className="w-3.5 h-3.5 mr-1 inline" /> Date</th>
                  <th className="px-3 _border-l py-1 text-left"><Tag className="w-3.5 h-3.5 mr-1 inline" /> Priority</th>
                  <th className="px-3 _border-l py-1 text-left"><Calendar className="w-3.5 h-3.5 mr-1 inline" /> Contact No.</th>
                  <th className="px-3 _border-l py-1 text-left"><Calendar className="w-3.5 h-3.5 mr-1 inline" /> Days Active</th>
                  <th className="px-3 _border-l py-1 text-left"><Calendar className="w-3.5 h-3.5 mr-1 inline" />Last Update</th>
                  <th className="px-3 _border-l py-1 text-left"><Calendar className="w-3.5 h-3.5 mr-1 inline" />Comment</th>
                  {/* <th className="px-3 py-1.5 text-left text-center _border-l">Action</th> */}
                </tr>
                </thead>

                <tbody className="divide-gray-200">{filteredLeads.map((lead, i) => (
                  <tr key={i} className="cursor-pointer hover:bg-blue-50 hover:text-gray-600 transition duration-150 group  transition border-b" onClick={() => r_.push(`?lead=${lead.id}`)}>
                    <td className="p-2.5 font-mono text-sm text-gray-500  transition border-r group-hover:text-gray-800 border-l-2 border-l-white group-hover:border-l-gray-600">{lead.id}</td>
                    <td className="p-2.5 text-sm text-cyan-700  transition border-l_ group-hover:text-gray-800 ">{lead.product}</td>
                    <td className="p-2.5 text-sm text-gray-800  transition border-l_ group-hover:text-gray-800">{lead.buyer}
                    </td>
                      <td className="p-2.5 text-sm text-gray-800  transition border-l_ group-hover:text-gray-800 "><MapPin className="w-3 h-3 mr-0 inline" /> {lead.location}</td>
                    <td className="p-2  transition border-l_">
                      <span className={`inline-flex gap-1 aic text-xs font-semibold_ px-[8px] py-[1px] rounded-md  transition border ${getStatusColor(lead.status)}`}>
                        {getStatusIcon(lead.status)}
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-sm font-mono text-gray-600  transition border-l_ group-hover:text-gray-800 ">5-10-12</td>
                    <td className=" p-2.5 text-sm transition border-l_">
                      <span className={`${getPriorityColor(lead.priority)} group-hover:text-gray-800`}>{lead.priority}</span>
                    </td>
                    <td className="p-2.5 text-sm text-cyan-700  transition border-l_ group-hover:text-gray-800 ">{lead.phone}</td>
                    <td className="p-2.5 text-sm font-mono text-gray-700  transition border-l_ group-hover:text-gray-800 ">{lead.daysActive}</td>
                    <td className="p-2.5 text-sm font-mono text-gray-600  transition border-l_ group-hover:text-gray-800 ">{lead.last_update}</td>
                    <td className="p-2.5 text-sm  transition border-l_ group-hover:text-gray-800 ">{lead.comment}</td>

                    {/* <td className="p-2.5 text-center  transition border-l group-hover:text-blue-600">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`bg-gray-100 text-gray-800 text-xs px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-400 cursor-pointer appearance-none transition duration-150`}
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
                    </td> */}
                  </tr>
                ))}</tbody>
              </table>
              {filteredLeads.length === 0 && (
                <div className="text-center py-10 text-gray-500 text-lg">
                  No leads found matching the current filters.
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 border-x border-t p-1.5">
              Displaying {filteredLeads.length} of {totalLeads} Total Leads.
            </div>
          </div>


        </div>
      </div >
    </>
  );
}