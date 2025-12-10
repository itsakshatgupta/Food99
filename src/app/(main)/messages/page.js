'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Clock, User, HardHat, Truck, Briefcase, ChevronLeft, Group, Image, File, Archive, LucideTimer, OctagonAlert, Video, PhoneCall, MoreVertical, RefreshCw, Paperclip, SendHorizonal, LucideFileText, Box, Info, BadgeInfoIcon, MessageCircleOff, BellOff, Flag, Phone, UserRoundSearchIcon, Users2, History, ArrowLeft } from 'lucide-react';
import Seller_Page_Header from '@/components/seller-cpmt/header';
import DropDown_1, { MoreOptions } from '@/components/seller-cpmt/widget';
import MainSideNav, { MainSideNavButtons } from '@/components/seller-cpmt/main-side-nav';
import { PageHeader } from '@/components/buyer-cpmt/page';
import { useRouter } from 'next/navigation';
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

const getStatusColor = (status) => {
  switch (status) {
    case 'Online': return 'bg-green-500';
    case 'Away': return 'bg-yellow-500';
    case 'Offline': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

const ContactListItem = ({ contact, isActive, setActiveChat }) => {
  const Icon = contact.icon || User;
  return (
    <div
      onClick={() => setActiveChat(contact.id)}
      className={`flex items-center px-2 py-2.5 border-gray-200 cursor-pointer transition duration-150 ${isActive ? 'bg-[lightcyan] rounded-md border-gray-500' : 'hover:bg-gray-50'
        }`}
    >
      <div className="relative mr-4">
        <Icon className="w-8 h-8 text-gray-600 rounded-full p-1 bg-gray-200 shadow-inner" />
        <div className={`w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-white ${getStatusColor(contact.status)}`}></div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="font500 text-sm text-gray-900 truncate">{contact.name}</p>
          <span className="text-xs text-gray-500">{contact.time}</span>
        </div>
        <p className="text-xs text-gray-600 truncate">{contact.lastMessage}</p>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs sm:max-w-md p-3 rounded-xl shadow-sm ${isUser
          ? 'bg-white rounded-br-none border-gray-100 border'
          : 'bg-[lightcyan]  rounded-tl-none border border-gray-100'
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

const ChatArea = ({ activeContact, messages, sendMessage, setActiveChat }) => {
  const messageEndRef = useRef(null);
  const [inputText, setInputText] = useState('');

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="flex flex-col h-full oh wfp bg-white">
      {/* Header */}
      <div className="flex items-center px-2 py-1 border-b_ bg-white shadow-sm pR
      ">
        <button className="sm:hidden mr-3 text-gray-800 hover:text-red-600" onClick={() => setActiveChat(null)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <Icon className="w-8 h-8 text-gray-700 mr-3 bg-gray-100 rounded-full" />
        <div className="flex-1">
          <h2 className="text-md font500 text-gray-800">{activeContact.name}</h2>
          <div className="flex items-center text-xs text-gray-800">
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusColor(activeContact.status)}`}></span>
            {activeContact.status}
          </div>
        </div>
        <div className="df gap-3 aic">
          <UserRoundSearchIcon size={16} />
          <div className="df aic gap-1 px-2 rounded-full border text-blue-800">
            <Phone size={14} />
            <span className='text-sm'>Connect</span>
          </div>
          {/* <Video fill='cadetblue' size={18} /> */}
          {/* <MoreVertical fill='cadetblue' size={18} /> */}
          <MoreOptions d="r">
            <div className="text-sm space-y-1">
              <span className="df aic gap-2 cursor-pointer hover:bg-gray-50 transition px-1 py-0.5"><Archive size={14} />Archive</span>
              <span className="df aic gap-2 cursor-pointer hover:bg-gray-50 transition px-1 py-0.5"><BellOff size={14} />Mute</span>
              <span className="df aic gap-2 cursor-pointer hover:bg-gray-50 transition px-1 py-0.5 text-red-600"><Flag size={14} />Report User</span>
              <span className="df aic gap-2 cursor-pointer hover:bg-gray-50 transition px-1 py-0.5 text-red-600"><MessageCircleOff size={14} />Block User</span>
            </div>
          </MoreOptions>
        </div>

      </div>

      {/* Message History */}
      <div className="flex-1  oh df fd-c">
        <div className="p-4 overflow-y-auto fx1 hfp bg-[#fcfcfc]_ bg-[#fbffff] text-black">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
          <div ref={messageEndRef} />
        </div>
        {/* Input Area */}
        <div className="df fd-c aic_ pb-3 pt-2 bg-[#f5f5f5]_ bg-gray-50_ border-t px-4 gap-2">
          <div className="fx1 flex shadow-sm bg-white items-center border border-gray-400 pl-2 rounded-md overflow-hidden py-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a new operational message..."
              rows="1"
              className="flex-1 resize-none text-sm text-gray-800 focus:ring-0 focus:outline-none bg-white"
              style={{ maxHeight: '100px' }}
            />
            <span className="px-1 py-1 text-gray-800 bg-gray-100 rounded-full"><Paperclip className="w-4 h-4 text-gray-600" /></span>
            <button
              onClick={handleSend}
              className="p-1_ df aic transition duration-150 disabled:text-gray-300"
              disabled={!inputText.trim()}
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};


export function MessagePage() {
  const [contacts, setContacts] = useState(contactData);
  const [activeChatId, setActiveChatId] = useState(contactData[0].id); // Default to the first contact
  const [messages, setMessages] = useState(messageData);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('All');

  const activeContact = contacts.find(c => c.id === activeChatId);
  const activeMessages = messages[activeChatId] || [];
  const r_ = useRouter();
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


  return (
    <div className="h-full w-full df fd-c font-sans bg-white">
      <PageHeader links={[{ e: "Channels", href_: "/channels" }, { e: "Responses", href_: "/responses" }]} />
      <div className="fx1 w-full mx-auto max-w-7xl overflow-hidden bg-gray-100">
        <div className="flex h-full">
          {/* Left Pane (Contacts Sidebar) - Hidden on mobile if a chat is active */}
          <div className={`w-[30rem] df fd-c border-r border-gray-200 flex-col bg-[#fbfbfb]_ ml-3_ ${activeChatId ? 'hidden sm:flex' : 'flex'} pR bg-white`}>

            {/* Search */}
            <div className="px-2 py-1 ml-1_ border-gray-200 df aic jcsb gap1 border-b">
              <div className="mr-5 text-xl fx1 df aic gap-2"><ArrowLeft size={18} className="cursor-pointer" onClick={() => r_.back()} /> Messages</div>
              <div className="relative fx1 dn">
                <Search className="w-4 h-4 absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find colleague or vendor..."
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg py-1 pl-6 pr-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Search size={20} />
              {/* <Group size={18} />
              <Archive size={18} /> */}
              <MoreVertical size={18} />
            </div>

            <div className="df fx1">
              <MainSideNav center={false}>
                <MainSideNavButtons vertical={false} icon={<History size={18} />} name="All" controller={{ control: view, setController: setView }} />
                <MainSideNavButtons vertical={false} icon={<User size={18} />} name="Responses" controller={{ control: view, setController: setView }} />
                <MainSideNavButtons vertical={false} icon={<Users2 size={18} />} name="Channels" controller={{ control: view, setController: setView }} />
              </MainSideNav>

              {/* Contact List */}
              <div className="flex-1 overflow-y-auto  mx-2">
                <h1 className="text-lg mt-1">{view}</h1> 
                {filteredContacts.map((contact) => (
                  <ContactListItem
                    key={contact.id}
                    contact={contact}
                    isActive={contact.id === activeChatId}
                    setActiveChat={setActiveChatId}
                  />
                ))}
                {filteredContacts.length === 0 && (
                  <div className="text-center p-6 text-gray-500 text-xs">No contacts matched your search.</div>
                )}
              </div>

            </div>

          </div>



          {/* Right Pane (Chat Area) */}
          <div className={`flex-1 ${activeChatId ? 'flex' : 'hidden sm:flex'} border-4_ border-t-0_ border-[#f5f5f5] rounded-lg_ oh m-3_ shadow-md_ m-3_`}>
            <ChatArea
              activeContact={activeContact}
              messages={activeMessages}
              sendMessage={sendMessage}
              setActiveChat={setActiveChatId}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default MessagePage;