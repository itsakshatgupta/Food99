'use client'
import React, { useState } from 'react';
import { Settings, Clock, Store, Users, ShoppingBag, Truck, Mail, Check, X, ChevronDown, ListPlus, ToggleRight, Loader2 } from 'lucide-react';
import Seller_Page_Header from '@/components/seller-cpmt/header';

// --- Reusable UI Components ---

// Generic Toggle Component (Modern Switch)
const ToggleSwitch = ({ label, description, enabled, onChange, name }) => (
  <div className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0">
    <div>
      <span className="text-gray-900 text-sm font-semibold_">{label}</span>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
    <button
      onClick={() => onChange(name, !enabled)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 p-0 focus:ring-green-500 focus:ring-offset-2 ml-4 flex-shrink-0 ${enabled ? 'bg-green-600' : 'bg-gray-300'
        }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-1'
          }`}
      ></span>
    </button>
  </div>
);

// Input Field Component (Modern Style)
const InputField = ({ label, value, type = 'text', onChange, name, placeholder, helperText }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className="w-full py-1.5 px-4 text-[0.8rem] rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100 transition duration-150 bg-white shadow-sm"
      onChange={(e) => onChange(name, e.target.value)}
    />
    {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
  </div>
);

// Dropdown Selector Component (Modern Style)
const SelectField = ({ label, value, onChange, name, options, helperText }) => (
  <div className="mb-4 mt-3">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full py-1.5 px-4 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 appearance-none shadow-sm transition duration-150"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 w-5 h-5" />
    </div>
    {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
  </div>
);

// --- Settings Data & State Management ---

const initialSettings = {
  // Store Profile
  storeName: 'Fusion Dynamics Inc.',
  storeSlogan: 'Precision components for tomorrow’s industry.',
  storeStatus: true, // true = Active, false = Maintenance
  defaultShippingRegion: 'NAFTA',

  // Store Timing
  startTime: '08:00',
  endTime: '17:00',

  // Product & Inventory
  autoPublishNewProducts: true,
  syncInventoryViaAPI: true,
  inquiryRouting: 'Primary Sales Rep',

  // Operational Controls
  sendOrderEmails: true,
  alertLowStockThreshold: 25,
};

// --- Main Application Component ---

const SettingsCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6  border_ border-gray-100 transition duration-300">
    <h2 className="text-md font-bold text-gray-800 mb-2 flex items-center pb-1 border-b border-red-50">
      <Icon className="w-6 h-6 mr-2 text-black" /> <span className="pt-0.5">{title}</span>
    </h2>
    {children}
  </div>
);


export default function SellerSettingPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(null);

    // Simulate API call delay for saving settings
    setTimeout(() => {
      console.log('Settings Saved:', settings);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(null), 3000); // Clear success message
    }, 1500);
  };

  // Tab data for navigation
  const tabs = [
    { id: 'profile', name: 'Store Profile & Timing', icon: Store },
    { id: 'products', name: 'Products & Inventory', icon: ShoppingBag },
    { id: 'operations', name: 'Operational Controls', icon: Users },
  ];

  // --- Tab Content Renderers ---

  const renderProfileSettings = () => (
    <div className="space-y-2 divide-y-2 divide-gray-300">
      <SettingsCard title="Store Identity & Visibility" icon={Store}>
        <InputField
          label="Store Name"
          name="storeName"
          value={settings.storeName}
          onChange={handleChange}
          placeholder="e.g., Global Distributors Co."
          helperText="This name SellerSettingPageears on your public profile and on all buyer documentation."
        />
        <InputField
          label="Store Slogan/Tagline"
          name="storeSlogan"
          value={settings.storeSlogan}
          onChange={handleChange}
          placeholder="A short description for your profile"
          helperText="Keep it short and descriptive (max 120 characters)."
        />
        <ToggleSwitch
          label="Store Visibility Status"
          name="storeStatus"
          description={settings.storeStatus ? "Your store is currently ACTIVE and accepting inquiries." : "Your store is in MAINTENANCE MODE (only visible to admins)."}
          enabled={settings.storeStatus}
          onChange={handleChange}
        />
      </SettingsCard>

      <SettingsCard title="Store Operating Hours & Region" icon={Clock}>
        <p className="text-xs text-gray-600 mb-6">Set your official operational times to manage buyer expectations for response and fulfillment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Daily Start Time"
            name="startTime"
            value={settings.startTime}
            type="time"
            onChange={handleChange}
          />
          <InputField
            label="Daily End Time"
            name="endTime"
            value={settings.endTime}
            type="time"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <SelectField
            label="Primary Fulfillment Region"
            name="defaultShippingRegion"
            value={settings.defaultShippingRegion}
            onChange={handleChange}
            options={[
              { value: 'NAFTA', label: 'North America (NAFTA)' },
              { value: 'EU', label: 'European Union' },
              { value: 'APAC', label: 'Asia-Pacific' },
              { value: 'GLOBAL', label: 'Worldwide/Global' },
            ]}
            helperText="This helps buyers filter products relevant to their geographical area."
          />
        </div>
      </SettingsCard>
    </div>
  );

  const renderProductSettings = () => (
    <div className="space-y-2 divide-y-2 divide-gray-300">
      <SettingsCard title="Product Listing Automation" icon={ListPlus}>
        <ToggleSwitch
          label="Auto-Publish New Products"
          name="autoPublishNewProducts"
          description="When new products are uploaded (manually or via API), they are immediately set to 'Published' status."
          enabled={settings.autoPublishNewProducts}
          onChange={handleChange}
        />
        <div className="pt-4">
          <button className="text-sm text-green-700 flex items-center hover:underline bg-green-50 p-1.5 rounded-lg border border-green-200">
            <ListPlus className="w-3 h-3 mr-2" /> Manage Product Visibility Rules
          </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Inventory Sync & Alerts" icon={Truck}>
        <ToggleSwitch
          label="Enable External API Inventory Sync"
          name="syncInventoryViaAPI"
          description="Automatically pull inventory levels from your connected ERP/OMS system every hour."
          enabled={settings.syncInventoryViaAPI}
          onChange={handleChange}
        />
        <SelectField
          label="Low Stock Alert Threshold"
          name="alertLowStockThreshold"
          value={settings.alertLowStockThreshold}
          onChange={handleChange}
          options={[
            { value: 10, label: '10 units' },
            { value: 25, label: '25 units' },
            { value: 50, label: '50 units' },
            { value: 100, label: '100 units' },
          ]}
          helperText="You will receive an urgent notification when any product's stock drops below this number."
        />

      </SettingsCard>
    </div>
  );

  const renderOperationalSettings = () => (
    <div className="space-y-2 divide-y-2 divide-gray-300">
      <SettingsCard title="Inquiry and Communication Routing" icon={Mail}>
        <SelectField
          label="Buyer Inquiry Routing Strategy"
          name="inquiryRouting"
          value={settings.inquiryRouting}
          onChange={handleChange}
          options={[
            { value: 'Primary Sales Rep', label: 'Primary Sales Rep (Default)' },
            { value: 'General Inbox', label: 'General Team Inbox (info@...)' },
            { value: 'Load Balanced Team', label: 'Load Balanced (Round-Robin)' },
          ]}
          helperText="How specific product inquiries from buyers are assigned internally."
        />
        <ToggleSwitch
          label="Send Order Confirmation Emails"
          name="sendOrderEmails"
          description="Automatically send system-generated confirmation emails to the buyer upon quote acceptance."
          enabled={settings.sendOrderEmails}
          onChange={handleChange}
        />
        <ToggleSwitch
          label="Platform Notification for Low Stock"
          name="alertLowStock"
          description="Enable an immediate pop-up notification within the platform for low stock items."
          enabled={settings.alertLowStock}
          onChange={handleChange}
        />
      </SettingsCard>

      <SettingsCard title="Team and Access Management" icon={Users}>
        <p className="text-sm text-gray-600 mb-6">Define roles and permissions for all internal users (sales, fulfillment, accounting) who access this dashboard.</p>
        <button className="w-full bg-red-50 text-red-700 border border-red-300 py-3 rounded-xl hover:bg-red-100 transition duration-150 text-sm font-bold flex items-center justify-center shadow-md">
          <Users className="w-4 h-4 mr-2" /> Open Role & Permission Editor
        </button>
      </SettingsCard>
    </div>
  );

  // --- Main Render ---
const lang__ = [
    'English (US)',
    'English (UK)',
    'Chinese',
    'Hindi',
    'Poland'
]

  return (
    <div className="h-screen df fd-c bg-gray-50 font-sans">

      {/* Header and Save Status */}
      <Seller_Page_Header pageTitle="Setting" buttons={
        [<div className="pR  group cursor-pointer">
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
        </div>]
      } />
      <div className="flexl dn flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center">
          <Settings className="w-8 h-8 mr-3 text-red-600" />
          <span className="hidden sm:inline">B2B Store Configuration</span>
          <span className="sm:hidden">Store Settings</span>
        </h1>
        {saveSuccess === true && (
          <div className="flex items-center text-green-700 bg-green-100 p-3 rounded-full text-sm font-bold shadow-md mt-4 sm:mt-0">
            <Check className="w-4 h-4 mr-2" /> Changes Applied!
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="df fx1 oh">

        {/* Navigation Tabs (Left/Sticky) */}
        <div className="hfp border-r bg-white ">
          <nav className="py-2 pr-4 pl-1 w-[15rem]">
            <h1 className="text-xs font-semibold text-gray-800 UPPERCASE mb-3 px-1">Navigations</h1>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left flex items-center px-2 py-2 mb-2 rounded-xl transition duration-300 font-semibold_ text-sm 
                  ${activeTab === tab.id
                    ? 'bg-gray-100'
                    : 'text-black-500 hover:bg-blue-50/50'
                  }`}
              >
                <tab.icon className="w-4 h-4 mr-3" />
                {tab.name}
              </button>

            ))}
          </nav>
        </div>

        {/* Settings Content & Action Bar */}
        <div className="fx1 bg-white oy p-2_">
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'products' && renderProductSettings()}
          {activeTab === 'operations' && renderOperationalSettings()}

          {/* Action Buttons (Sticky Footer) */}
          <div className="mt-12 flex justify-end gap-4 p-4 pS" style={{ bottom: 0 }}>

            <button
              className="flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition duration-200 shadow-md"
              onClick={() => setSettings(initialSettings)}
            >
              <X className="w-5 h-5 mr-2" /> Reset
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold text-white shadow-xl transition duration-300
                  ${isSaving
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:scale-[1.01]'
                }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-3" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-2" /> Save All Changes
                </>
              )}
            </button>
          </div>
        </div>



      </div>

    </div>
  );
}