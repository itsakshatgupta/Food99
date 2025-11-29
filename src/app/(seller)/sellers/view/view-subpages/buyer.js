'use client'
import React, { useMemo } from 'react';
import {
    User, DollarSign, Clock, Package, MapPin, Mail, Phone, Calendar,
    CreditCard, ShoppingCart, MessageSquare, ClipboardList, TrendingUp,
    List, Edit, CheckCircle, XCircle, BarChart, UserCog
} from 'lucide-react';
import Seller_Page_Header from '@/components/seller-cpmt/header';

// --- MOCK DATA ---

const MOCK_CUSTOMER = {
    id: 9001,
    firstName: 'Jamie',
    lastName: 'Davidson',
    email: 'jamie.d@bigcorp.com',
    phone: '+1 (555) 890-1234',
    address: '456 Tech Lane, San Jose, CA 95110',
    status: 'VIP Buyer',
    memberSince: '2022-08-15',
    totalLifetimeSales: 87250.75,
    currentPayable: 4500.00, // Outstanding balance
    lastActivity: '2024-11-12',
    internalScore: 92, // New metric for this layout
};

const MOCK_ORDERS = [
    { id: 'ORD-1045', date: '2024-11-01', amount: 12500.00, status: 'Completed', product: 'Industrial Compressor Unit' },
    { id: 'ORD-1046', date: '2024-10-20', amount: 4500.00, status: 'Pending Payment', product: 'Spare Parts Kit X9' },
    { id: 'ORD-1047', date: '2024-09-15', amount: 35000.75, status: 'Completed', product: 'Automated Assembly Line' },
    { id: 'ORD-1048', date: '2024-08-10', amount: 1250.00, status: 'Cancelled', product: 'Consulting Service (Initial)' },
    { id: 'ORD-1049', date: '2024-07-05', amount: 34000.00, status: 'Completed', product: 'Custom Robotics Arm' },
];

const MOCK_ACTIVITY = [
    { date: '2024-11-12', type: 'Call', agent: 'Agent Ava', note: 'Discussed late payment (ORD-1046). Buyer confirmed payment scheduling for Friday.' },
    { date: '2024-11-01', type: 'Order Placement', agent: 'System', note: 'Order ORD-1045 for $12,500 placed.' },
    { date: '2024-10-25', type: 'Email', agent: 'Agent Ben', note: 'Sent pricing sheet for Spare Parts Kit X9 as requested.' },
    { date: '2024-09-15', type: 'Fulfillment', agent: 'Logistics Team', note: 'Automated Assembly Line delivered and signed for.' },
    { date: '2024-09-01', type: 'Meeting', agent: 'Manager Chloe', note: 'Quarterly review meeting. Discussed future equipment needs and potential Q4 orders.' },
];

// --- UTILITY COMPONENTS ---

const StatCard = ({ icon: Icon, title, value, unit, color }) => (
    <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg">
        <div className={`p-3 rounded-full inline-block mb-1 ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="text-[0.975rem] font-bold text-gray-900 mt-1">
            {unit === '$' ? unit : ''}{typeof value === 'number' ? value.toLocaleString('en-US', { minimumFractionDigits: unit === '$' ? 2 : 0 }) : value}
            {unit !== '$' ? unit : ''}
        </p>
    </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
    <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-100 flex items-center">
        <Icon className="w-5 h-5 mr-3 text-indigo-600" />
        {title}
    </h2>
);

const ActivityIcon = ({ type }) => {
    switch (type) {
        case 'Call': return <Phone className="w-4 h-4 text-green-600" />;
        case 'Email': return <Mail className="w-4 h-4 text-blue-600" />;
        case 'Meeting': return <UserCog className="w-4 h-4 text-purple-600" />;
        case 'Order Placement': return <ShoppingCart className="w-4 h-4 text-indigo-600" />;
        case 'Fulfillment': return <Package className="w-4 h-4 text-yellow-600" />;
        default: return <ClipboardList className="w-4 h-4 text-gray-500" />;
    }
};

const ActivityTimeline = ({ activity }) => (
    <ol className="relative ml-2">
        {activity.map((item, index) => (
            <li key={index} className="mb-4 pl-8 border-l border-gray-200">
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white bg-gray-100 shadow-sm">
                    <ActivityIcon type={item.type} />
                </span>
                <div className="py-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">{item.type}</span>
                        <time className="text-xs text-gray-500">{item.date}</time>
                    </div>
                    <p className="text-sm text-gray-800 font-medium">
                        {item.agent === 'System' ? 'System Event' : `By: ${item.agent}`}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{item.note}</p>
                </div>
            </li>
        ))}
    </ol>
);

const OrderRow = ({ order }) => (
    <div className="grid grid-cols-10 gap-3 items-center py-2.5 px-3 border-b hover:bg-gray-50 transition duration-150">
        <div className="col-span-2 text-xs font-medium text-indigo-600 truncate">{order.id}</div>
        <div className="col-span-2 text-xs text-gray-600">{order.date}</div>
        <div className="col-span-3 text-xs text-gray-700 truncate">{order.product}</div>
        <div className="col-span-2 text-xs font-bold text-gray-800">
            ${order.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="col-span-1 flex justify-end">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                order.status === 'Pending Payment' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                {order.status === 'Completed' ? <CheckCircle className="w-3 h-3 mr-1" /> : ''}
                {order.status.split(' ')[0]}
            </span>
        </div>
    </div>
);


// --- MAIN APP COMPONENT ---

export default function ViewCustomer() {
    const customer = MOCK_CUSTOMER;
    const totalOrders = useMemo(() => MOCK_ORDERS.length, []);

    const sidebarItems = [
        { icon: Mail, label: 'Email', value: customer.email },
        { icon: Phone, label: 'Phone', value: customer.phone },
        { icon: MapPin, label: 'Address', value: customer.address },
        { icon: Calendar, label: 'Member Since', value: new Date(customer.memberSince).toLocaleDateString() },
        { icon: Clock, label: 'Last Activity', value: customer.lastActivity },
    ];

    return (
        <>
            <div className="df fd-c hfp">
                <Seller_Page_Header pageTitle="Engaged Buyers" />
                {/* Header: Customer Name and Actions */}
                <div className="fx1 oy bg-white font-sans">
                <header className="flex flex-wrap justify-between items-center px-3 py-2.5 border-b bg-[#ededff] border-gray-200">
                    <div className="flex items-center space-x-4">
                        <User className="w-10 h-10 text-indigo-600 bg-indigo-100 p-2 rounded-full" />
                        <div>
                            <h1 className="text-sm font-extrabold text-gray-900">{customer.firstName} {customer.lastName}</h1>
                            <p className="text-[0.775rem] font-medium text-indigo-700">{customer.status}</p>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 space-x-3 flex">
                        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition text-[0.775rem] shadow-md">
                            <Edit className="w-4 h-4 mr-2" /> Edit Profile
                        </button>
                        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-lg text-[0.775rem]">
                            <MessageSquare className="w-4 h-4 mr-2" /> Contact
                        </button>
                    </div>
                </header>
                <div className="hfp p-4 md:p-8">

                    {/* Top Section: Financial Stats (Full Width) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={TrendingUp}
                            title="Total Lifetime Sales"
                            value={customer.totalLifetimeSales}
                            unit="$"
                            color="text-green-600 bg-green-50"
                        />
                        <StatCard
                            icon={CreditCard}
                            title="Current Payable"
                            value={customer.currentPayable}
                            unit="$"
                            color="text-red-600 bg-red-50"
                        />
                        <StatCard
                            icon={ShoppingCart}
                            title="Total Orders"
                            value={totalOrders}
                            unit=" Orders"
                            color="text-indigo-600 bg-indigo-50"
                        />
                        <StatCard
                            icon={BarChart}
                            title="Internal Score"
                            value={customer.internalScore}
                            unit="/100"
                            color="text-yellow-600 bg-yellow-50"
                        />
                    </div>

                    {/* Main Content Layout: Two Scrolling Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column (Main Scrollable Content - 2/3 width) */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Order History */}
                            <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200">
                                <SectionTitle icon={Package} title="Order History (Full View)" />
                                <div className="wfp ox">
                                <div className="grid grid-cols-10 gap-3 items-center font-semibold text-xs text-gray-500 bg-gray-50 py-2.5 px-3 rounded-t-lg">
                                    <div className="col-span-2">Order ID</div>
                                    <div className="col-span-2">Date</div>
                                    <div className="col-span-3">Product/Service</div>
                                    <div className="col-span-2">Amount</div>
                                    <div className="col-span-1 text-right">Status</div>
                                </div>
                                <div className="max-h-[500px] overflow-y-auto">
                                    {MOCK_ORDERS.map(order => (
                                        <OrderRow key={order.id} order={order} />
                                    ))}
                                </div>
                                </div>
                            </div>

                            {/* Activity Log */}
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                <SectionTitle icon={Clock} title="Communication & Activity Log" />
                                <ActivityTimeline activity={MOCK_ACTIVITY} />
                            </div>

                        </div>

                        {/* Right Column (Sidebar - 1/3 width) */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 sticky top-4">
                                <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center"><UserCog className="w-5 h-5 mr-2 text-indigo-500" /> Customer Profile</h3>
                                <ul className="space-y-4 text-sm text-gray-700">
                                    {sidebarItems.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <item.icon className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-500 uppercase text-[0.725rem]">{item.label}</p>
                                                <p className="font-semibold text-gray-900 break-words text-[0.7rem]">{item.value}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

        </>
    );
};