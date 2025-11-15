'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Clock, User, HardHat, Truck, Briefcase, ChevronLeft } from 'lucide-react';
import Seller_Page_Header from '@/components/seller-cpmt/header';
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
      className={`flex items-center px-2 py-3.5 border-b border-gray-200 cursor-pointer transition duration-150 ${isActive ? 'bg-[#fffef6] border-r-4 border-red-600' : 'hover:bg-gray-100'
        }`}
    >
      <div className="relative mr-4">
        <Icon className="w-8 h-8 text-gray-600 rounded-full p-1 bg-gray-200 shadow-inner" />
        <div className={`w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-white ${getStatusColor(contact.status)}`}></div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[0.750rem] text-gray-800 truncate">{contact.name}</p>
          <span className="text-[0.625rem] text-gray-400">{contact.time}</span>
        </div>
        <p className="text-[0.725rem] text-gray-500 truncate">{contact.lastMessage}</p>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs sm:max-w-md p-3 rounded-xl shadow-md ${isUser
            ? 'bg-[#37474F] text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
          }`}
      >
        <p className="text-[0.775rem] break-words">{message.text}</p>
        <span className={`block mt-1 text-right text-xs ${isUser ? 'text-red-200' : 'text-gray-400'}`}>
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
    <div className="flex flex-col h-full bg-white wfp">
      {/* Header */}
      <div className="flex items-center p-2 border-b border-gray-200 shadow-sm bg-white">
        <button className="sm:hidden mr-3 text-gray-600 hover:text-red-600" onClick={() => setActiveChat(null)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <Icon className="w-8 h-8 text-gray-700 mr-3" />
        <div className="flex-1">
          <h2 className="text-sm font-bold text-gray-800">{activeContact.name}</h2>
          <div className="flex items-center text-xs text-gray-500">
            <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(activeContact.status)}`}></span>
            {activeContact.status}
          </div>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-1 border-t border-gray-200 bg-white">
        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-inner">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a new operational message..."
            rows="1"
            className="flex-1 resize-none p-3 text-sm text-gray-800 border-none focus:ring-0 focus:outline-none bg-white"
            style={{ maxHeight: '100px' }}
          />
          <button
            onClick={handleSend}
            className="p-3 bg-red-600 text-white hover:bg-red-700 transition duration-150 disabled:bg-red-300"
            disabled={!inputText.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
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


  return (
    <div className="min-h-screen h-screen w-full bg-gray-50 df fd-c bg-[lightgray] font-sans ">
      <Seller_Page_Header pageTitle="Message"/>
      <div className="fx1 w-full mx-auto max-w-7xl bg-white shadow-2xl overflow-hidden border border-gray-100">
        <div className="flex h-full">

          {/* Left Pane (Contacts Sidebar) - Hidden on mobile if a chat is active */}
                    <div className={`w-full sm:w-80 border-r border-gray-200 flex-col ${activeChatId ? 'hidden sm:flex' : 'flex'}`}>

            {/* Header */}
            <div className="p-2 border-b border-gray-200 bg-white">
              <h1 className="text-md font-extrabold text-gray-800 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                Inbox
              </h1>
            </div>

            {/* Search */}
            <div className="p-2 border-b border-gray-200 pdx08 dn">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find colleague or vendor..."
                  className="w-full bg-gray-100 border border-gray-300 rounded-full py-1 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto bg-white">
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



          {/* Right Pane (Chat Area) */}
          <div className={`flex-1 ${activeChatId ? 'flex' : 'hidden sm:flex'}`}>
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