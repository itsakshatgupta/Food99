'use client'
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
    Users, User, ChevronRight, Settings, Package, DollarSign, Zap,
    ClipboardList, MapPin, Tag, BarChart2, CheckCircle, Save, Loader,
    Percent, Truck, Edit, Trash2, Shield, FileText, Briefcase,
    Group,
    Search
} from 'lucide-react';
import Seller_Page_Header from '@/components/seller-cpmt/header';
import DropDown_1 from '@/components/seller-cpmt/widget';

// --- MOCK DATA ---

const MOCK_ROLES = {
    'Admin': 'Full control over all store and team settings.',
    'Sales Lead': 'Manages leads, product listing visibility, and financial initiation.',
    'Product Editor': 'Can add and edit product data, but cannot manage leads or finances.',
    'Form Processor': 'Primarily handles form filling, validation, and submission.',
    'Junior Sales': 'Can only view leads and fill forms.',
};

const MOCK_TEAM = [
    { id: 1, name: 'Ava Chen', role: 'Admin', email: 'ava.c@corp.com', avatar: 'https://placehold.co/40x40/6366f1/ffffff?text=AC' },
    { id: 2, name: 'Ben Carter', role: 'Sales Lead', email: 'ben.c@corp.com', avatar: 'https://placehold.co/40x40/06b6d4/ffffff?text=BC' },
    { id: 3, name: 'Chloe Davis', role: 'Product Editor', email: 'chloe.d@corp.com', avatar: 'https://placehold.co/40x40/10b981/ffffff?text=CD' },
    { id: 4, name: 'David Lee', role: 'Form Processor', email: 'david.l@corp.com', avatar: 'https://placehold.co/40x40/f97316/ffffff?text=DL' },
    { id: 5, name: 'Elena Rodriguez', role: 'Junior Sales', email: 'elena.r@corp.com', avatar: 'https://placehold.co/40x40/ef4444/ffffff?text=ER' },
];

const INITIAL_PERMISSIONS = {
    // 1. Lead Assignment Rules (Lead "Spearation")
    lead_gender_match: true,
    lead_price_range_assign: '30000_plus', // Options: 'all', 'under_10k', '10k_30k', '30000_plus'
    lead_category_priority: ['Industrial Machinery', 'Electronics'],
    lead_location_match: true,

    // 2. Product Management
    product_add: true,
    product_edit: true,
    product_delete: false,
    product_add_additional_data: true, // e.g., adding certifications, detailed specs
    product_toggle_availability: true, // Mark Offline/Available

    // 3. Financial & Transaction Powers
    finance_initiate_lease: true, // Flex payment initiation
    finance_digital_sign: false, // Digital signature access
    finance_generate_receipt: true,

    // 4. Store Settings
    store_manage_settings: false,
    store_manage_features: false,

    // 5. Form Management
    form_create: false,
    form_fill_existing: true,
    form_validate: true,
    form_receive_and_submit: true,
};


// --- MAIN APP COMPONENT ---

const TeamPage = () => {
    const [selectedMemberId, setSelectedMemberId] = useState(MOCK_TEAM[0].id);
    const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
    const [activeTab, setActiveTab] = useState('summary');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null); // {type: 'success'|'error', text: ''}

    // Get the currently selected team member object
    const selectedMember = useMemo(() => MOCK_TEAM.find(m => m.id === selectedMemberId), [selectedMemberId]);

    // Simplified update handler for all permissions fields
    const handlePermissionChange = useCallback((name, value) => {
        setPermissions(prev => ({ ...prev, [name]: value }));
    }, []);

    // Simulate saving the changes
    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        console.log(`Saving permissions for ${selectedMember.name}:`, permissions);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setMessage({
            type: 'success',
            text: `Permissions for ${selectedMember.name} updated successfully!`,
        });
        setIsSaving(false);
    };

    // Reset message after a delay
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // --- SUB-COMPONENTS ---

    const TabButton = ({ icon: Icon, title, name }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`flex items-center  py-1 px-2 text-xs font-medium rounded-xl transition duration-200 w-full text-left
                ${activeTab === name
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{title}</span>
        </button>
    );

    const PermissionToggle = ({ label, name, description, icon: Icon, hide_border }) => (
        <div className={`flex items-center justify-between p-4 bg-white ${!hide_border&&"border-b border-gray-200"}`}>
            <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3 text-indigo-500" />
                <div>
                    <p className="text-[0.875rem] font-semibold text-gray-800">{label}</p>
                    <p className="text-[0.775rem] text-gray-500">{description}</p>
                </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={permissions[name]}
                    onChange={(e) => handlePermissionChange(name, e.target.checked)}
                    disabled={isSaving}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
        </div>
    );

    const RenderContent = () => {
        switch (activeTab) {
            case 'summary':
                return (
                    <div className="space-y-6">
                        <div className="p-2 bg-indigo-50 rounded-2xl border border-indigo-200 shadow-md">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {selectedMember.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-md font-bold text-gray-800">{selectedMember.name}</h3>
                                    <p className="text-indigo-600 font-medium text-sm">{selectedMember.role} <span className="text-gray-500 text-sm">({selectedMember.email})</span></p>
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-xl mt-3 text-sm border border-indigo-200 text-blue-600">
                                <p className="font-medium">Role Description:</p>
                                <p>{MOCK_ROLES[selectedMember.role]}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-700 flex items-center"><Shield className="w-5 h-5 mr-2 text-yellow-500" /> Current Access Summary</h4>
                            <div className="grid grid-cols-2 gap-4 text-[0.8rem]">
                                <div className={`p-3 rounded-xl shadow-inner ${permissions.product_add ? 'bg-green-50' : 'bg-red-50'}`}>
                                    <p className="font-semibold">Product CRUD</p>
                                    <p>{permissions.product_add ? 'Full Add/Edit' : 'View Only'}</p>
                                </div>
                                <div className={`p-3 rounded-xl shadow-inner ${permissions.finance_digital_sign ? 'bg-green-50' : 'bg-red-50'}`}>
                                    <p className="font-semibold">Digital Signing Power</p>
                                    <p>{permissions.finance_digital_sign ? 'Authorized' : 'Unauthorized'}</p>
                                </div>
                                <div className={`p-3 rounded-xl shadow-inner ${permissions.lead_gender_match ? 'bg-green-50' : 'bg-red-50'}`}>
                                    <p className="font-semibold">Lead Routing Logic</p>
                                    <p>Match Gender/Price: {permissions.lead_gender_match ? 'Active' : 'Inactive'}</p>
                                </div>
                                <div className={`p-3 rounded-xl shadow-inner ${permissions.store_manage_settings ? 'bg-green-50' : 'bg-red-50'}`}>
                                    <p className="font-semibold">Store Settings</p>
                                    <p>{permissions.store_manage_settings ? 'Can Edit Settings' : 'Cannot Edit Settings'}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            case 'leads':
                return (
                    <div className="space-y-3">
                        <h4 className="text-md font-bold text-gray-700 flex items-center border-b pb-2 mb-1"><BarChart2 className="w-5 h-5 mr-2 text-indigo-500" /> Lead Assignment ("Spearation") Rules</h4>
                        <p className="text-gray-500 text-sm m-0">Define the automated criteria for assigning new leads to this team member based on lead characteristics.</p>

                        <PermissionToggle
                            label="Gender-Based Routing"
                            name="lead_gender_match"
                            icon={User}
                            description="Route leads to this member based on inferred gender match for rapport."
                        />

                        <PermissionToggle
                            label="Location-Based Routing"
                            name="lead_location_match"
                            icon={MapPin}
                            description="Only assign leads that fall within the member's designated geographical sales region."
                        />

                        {/* Dropdown for Price/Value Assignment */}
                        <div className="p-4 bg-white">
                            <label htmlFor="price_range" className="text-[0.875rem] font-semibold text-gray-800 flex items-center mb-1">
                                <DollarSign className="w-5 h-5 mr-3 text-indigo-500" /> Assign Leads by Deal Value
                            </label>
                            <p className="text-[0.8rem] text-gray-500 mb-3">Filter leads based on expected deal size (price/value criteria).</p>
                            <select
                                id="price_range"
                                name="lead_price_range_assign"
                                value={permissions.lead_price_range_assign}
                                onChange={(e) => handlePermissionChange('lead_price_range_assign', e.target.value)}
                                disabled={isSaving}
                                className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-70"
                            >
                                <option value="all">All Lead Values</option>
                                <option value="under_10k">Under $10,000</option>
                                <option value="10k_30k">$10,001 to $30,000</option>
                                <option value="30000_plus">$30,001 and Above (High Value)</option>
                            </select>
                        </div>

                        {/* Tags and Categories (Simplified) */}
                        <div className="p-4 mt-1 bg-white shadow-sm border rounded-xl">
                            <label className="text-[0.875rem] font-semibold text-gray-800 flex items-center mb-1">
                                <Tag className="w-5 h-5 mr-3 text-indigo-500" /> Category & Tag Priority
                            </label>
                            <p className="text-[0.8rem] text-gray-500 mb-3">Leads with these categories/tags will be prioritized for this member.</p>
                            <div className="flex flex-wrap gap-2">
                                {['Industrial Machinery', 'Electronics', 'Raw Materials', 'Consulting'].map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => {
                                            const current = permissions.lead_category_priority;
                                            const newArray = current.includes(tag)
                                                ? current.filter(t => t !== tag)
                                                : [...current, tag];
                                            handlePermissionChange('lead_category_priority', newArray);
                                        }}
                                        disabled={isSaving}
                                        className={`px-3 py-1 text-xs font-medium rounded-full transition duration-150 ${permissions.lead_category_priority.includes(tag)
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'products':
                return (
                    <div className="space-y-3">
                        <h4 className="text-md font-bold text-gray-700 flex items-center border-b pb-2 mb-1"><Package className="w-5 h-5 mr-2 text-indigo-500" /> Product Management Permissions</h4>
                        <p className="text-gray-500 text-sm">Control who can modify product listings in the catalogue (CRUD operations).</p>

                        <PermissionToggle label="Can Add New Products" name="product_add" icon={ClipboardList} description="Ability to create new listings from scratch." />
                        <PermissionToggle label="Can Edit Existing Products" name="product_edit" icon={Edit} description="Ability to change price, description, and images of existing items." />
                        <PermissionToggle label="Can Delete Products" name="product_delete" icon={Trash2} description="High-level permission to permanently remove products from the catalog." />
                        <PermissionToggle label="Can Add Additional Data" name="product_add_additional_data" icon={FileText} description="Ability to upload certificates, compliance documents, or detailed specification sheets." />
                        <PermissionToggle hide_border={true} label="Can Toggle Availability" name="product_toggle_availability" icon={Truck} description="Ability to mark a product offline/unavailable or available in the store front." />
                    </div>
                );
            case 'finance':
                return (
                    <div className="space-y-3">
                        <h4 className="text-md font-bold text-gray-700 flex items-center border-b pb-2 mb-1"><DollarSign className="w-5 h-5 mr-2 text-indigo-500" /> Financial & Transaction Powers</h4>
                        <p className="text-gray-500 text-sm">Permissions related to money handling, contracts, and official transaction documents.</p>

                        <PermissionToggle label="Initiate Lease / Flex Payments" name="finance_initiate_lease" icon={Percent} description="Allows the member to submit buyer details for approval of flexible payment terms." />
                        <PermissionToggle label="Access Digital Signature Feature" name="finance_digital_sign" icon={Shield} description="Grants access to apply the store's digital signature on behalf of the organization for contracts." />
                        <PermissionToggle hide_border={true} label="Generate Official Receipts" name="finance_generate_receipt" icon={CheckCircle} description="Allows the member to generate and issue final, official sales receipts." />
                    </div>
                );
            case 'store_settings':
                return (
                    <div className="space-y-3">
                        <h4 className="text-md font-bold text-gray-700 flex items-center border-b pb-2 mb-1"><Settings className="w-5 h-5 mr-2 text-indigo-500" /> Store & Feature Settings</h4>
                        <p className="text-gray-500 text-sm">Control access to high-level system configurations and feature activation.</p>

                        <PermissionToggle label="Manage Global Store Settings" name="store_manage_settings" icon={Zap} description="Change currency, tax rules, shipping methods, and contact information." />
                        <PermissionToggle hide_border={true} label="Manage Feature Activation" name="store_manage_features" icon={Briefcase} description="Toggle experimental or premium store features (e.g., A/B testing, new payment gateways)." />
                    </div>
                );
            case 'forms':
                return (
                    <div className="space-y-3">
                        <h4 className="text-md font-bold text-gray-700 flex items-center border-b pb-2 mb-1"><ClipboardList className="w-5 h-5 mr-2 text-indigo-500" /> Form Management & Processing</h4>
                        <p className="text-gray-500 text-sm">Permissions for creating, processing, and handling custom data collection forms.</p>

                        <PermissionToggle label="Can Create New Form Templates" name="form_create" icon={Edit} description="Ability to design and publish new internal or customer-facing forms." />
                        <PermissionToggle label="Can Fill Existing Forms" name="form_fill_existing" icon={FileText} description="Ability to input data into any published internal form." />
                        <PermissionToggle label="Can Validate Forms" name="form_validate" icon={CheckCircle} description="Ability to review and officially validate submitted form data for correctness." />
                        <PermissionToggle hide_border={true} label="Can Receive & Submit Forms" name="form_receive_and_submit" icon={Truck} description="Ability to receive submitted customer forms and finalize their submission to the database." />
                    </div>
                );
            default:
                return null;
        }
    };

    // --- RENDER ---
    return (
        <>
            <div className="h-screen font-sans oh df fd-c">
                <Seller_Page_Header pageTitle="Team" />
                <div className="flex bg-gray-50 fx1 oh">
                    {/* Sidebar (Team List) */}
                    <div className="w-full sm:w-64 bg-white border-r border-gray-200 flex-shrink-0">
            {/* Search */}
            <div className="p-1.5 border-b border-gray-200 df aic jcsb gap1">
              <div className="relative fx1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find colleague or vendor..."
                  className="w-full bg-gray-100 border border-gray-300 rounded-full py-1 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                //   value={searchQuery}
                //   onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Group size={20} />
            </div>
                        <div className="space-y-2">
                            {MOCK_TEAM.map(member => (
                                <button
                                    key={member.id}
                                    onClick={() => {
                                        setSelectedMemberId(member.id);
                                        setActiveTab('summary'); // Reset to summary on member change
                                        // In a real app, you would fetch and load new permissions here
                                    }}
                                    className={`flex items-center w-full transition duration-200 text-left ${selectedMemberId === member.id
                                        ? 'border-r-2 border-[#607d8b]'
                                        : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full mr-3 border border-gray-200" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[0.750rem] font-semibold  truncate">{member.name}</p>
                                        <p className="text-[0.725rem] text-gray-500 truncate">{member.role}</p>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedMemberId === member.id ? 'transform rotate-90' : ''}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <main className="flex-grow p-4 md:p-2 overflow-y-auto sbn">
                        <div className="df mb-6">
                            <Shield className="w-7 h-7 mr-3 text-indigo-600" />

                            <div className="df fd-c gap-1">
                                <h1 className="text-lg font-bold text-gray-900  flex items-center">
                                    Permissions Management
                                </h1>

                                <DropDown_1 className="" d="l" title={`${selectedMember.name.split(" ")[0]} Permissions`} flowData={<div className="df fd-c gap-1.5">
                                    <TabButton icon={User} title="Summary" name="summary" />
                                    <TabButton icon={BarChart2} title="Lead Assignment Rules" name="leads" />
                                    <TabButton icon={Package} title="Product Management" name="products" />
                                    <TabButton icon={DollarSign} title="Financial Powers" name="finance" />
                                    <TabButton icon={Settings} title="Store Settings" name="store_settings" />
                                    <TabButton icon={ClipboardList} title="Form Management" name="forms" /></div>} />
                            </div>
                        </div>

                        {/* Alert/Message Display */}
                        {message && (
                            <div className={`p-4 mb-6 rounded-xl font-medium flex items-center border-l-4 shadow-md ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-500' : 'bg-red-50 text-red-800 border-red-500'}`}>
                                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                {message.text}
                            </div>
                        )}

                        {/* Tab Navigation */}

                        <div className="flexl dn ox gap-2 p-3 bg-[transparent] mb-8" style={{ scrollbarWidth: 'thin', scrollbarColor: 'royalblue none' }}>

                        </div>

                        {/* Permissions Content Area */}
                        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                            <RenderContent />
                        </div>

                        {/* Save Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200 flexl dn justify-end">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`px-8 py-3 text-lg font-bold rounded-xl transition duration-300 ease-in-out shadow-lg transform active:scale-[0.98] text-white
                            ${isSaving
                                        ? 'bg-indigo-700 cursor-not-allowed opacity-80'
                                        : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-70'
                                    }`
                                }
                            >
                                {isSaving ? (
                                    <>
                                        <Loader className="animate-spin w-6 h-6 mr-3 inline-block" />
                                        Saving Permissions...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-6 h-6 mr-3 inline-block" />
                                        Save Permissions for {selectedMember?.name || 'Member'}
                                    </>
                                )}
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default TeamPage;