'use client'
import React, { useEffect, useState } from 'react';
import { fetchAPI } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { LogIn, User, Lock, Loader2, AlertTriangle, ArrowRight, Home, Zap, HelpCircle, Briefcase, Globe, TrendingUp, Handshake, Box, Twitter, Facebook } from 'lucide-react';

// --- Header Component ---
const Header = () => (
  <header className="">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-2 flex justify-between items-center">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-2">
        {/* <Zap className="w-7 h-7" /> */}
        <span className="text-2xl font-extrabold tracking-tighter">
          Trade<span className="text-purple-600">B2B</span>
        </span>
      </div>
      {/* Navigation (Hidden on Mobile, simplified for login page) */}
      <nav className="hidden sm:flex space-x-8 text-sm font-medium">
        <a href="#" className="hover:text-indigo-600 transition flex items-center"><HelpCircle className="w-4 h-4 mr-1" /> Support</a>
        <a href="signup/X2_reg" className="hover:bg-blue-600 bg-[royalblue] text-white px-2 py-1 transition flex items-center"><HelpCircle className="w-4 h-4 mr-1" /> Signup</a>
      </nav>
    </div>
  </header>
);

// --- Footer Component (with common widgets) ---
const Footer = () => (
  <footer className="bg-gray-800 text-white pt-8 pb-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-6 mb-6">

        {/* Widget 1: Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">SynergyLink</h3>
          <p className="text-sm text-gray-400">
            The definitive B2B commerce platform connecting manufacturers and global distributors efficiently.
          </p>
        </div>

        {/* Widget 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-indigo-300 transition">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-300 transition">Our Vision</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-300 transition">Careers</a></li>
          </ul>
        </div>

        {/* Widget 3: Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-indigo-300 transition">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-300 transition">Terms of Service</a></li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-300 transition">Security</a></li>
          </ul>
        </div>

        {/* Widget 4: Contact/Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@syn.link</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li><a href="#" className="text-gray-300 hover:text-indigo-300 transition">Help Center</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Row */}
      <div className="flex justify-center items-center pt-4 text-sm text-gray-500">
        <Globe className="w-4 h-4 mr-2" />
        &copy; {new Date().getFullYear()} SynergyLink. All rights reserved.
      </div>
    </div>
  </footer>
);


// --- Main Component: LoginPage ---
export default function BuyerLoginPage() {
  const [form, setForm] = useState({
    company_name: "",
    business_type: "",
    gst_number: "",
    address: "",
    state: "",
    city: "",
    state: "",
    whatsapp_number: "",
    logo: ""
  });
  const [error, setError] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [logout, setLogout] = useState(false);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");

  }, [logout])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);
    console.log(form)

    try {
      const formData = new FormData();

      // append everything
      for (const key in form) {
        formData.append(key, form[key]);
      }
      const user = localStorage.getItem("user")
      console.log(user, JSON.parse(user).id)
      const result = await fetchAPI(`s/sellers`, "POST", formData, true, 'FormData');

      setResponse({
        status: "success",
        message: "Product uploaded successfully",
      });

      // setProduct(defaultProductState);
      // document.getElementById("imageFile").value = "";

    } catch (err) {
      setResponse({ status: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  }, [])
  // Feature list for the Context Panel
  const features = [
    { icon: TrendingUp, title: "Global Reach", description: "Expand your market across 50+ countries instantly." },
    { icon: Handshake, title: "Secure Transactions", description: "Blockchain-verified contracts and escrow services." },
    { icon: Box, title: "Optimized Logistics", description: "Integrated shipping and inventory management tools." },
  ];


  const login_ = () => <div className="max-w-6xl w-full">
    <h1 className="text-2xl tac font-bold mb-3 text-gray-800 dn">Welcome Back!</h1>

    {/* Login Form Card (Existing) */}
    <div className="w-full max-w-[50rem]  mx-auto bg-white p-8 sm:p-6 rounded-sm shadow-2xl_ border_ border-gray-400">

      {/* Header */}
      <div className="text-center_ mb-3">
        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">
          Sign In to SynergyLink
        </h1>
      </div>

      {/* Error Message */}
      {response && (
        <div className="flex items-center p-3 mb-4 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg" role="alert">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{response?.status}{response?.message}</span>
        </div>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* User type */}
        <div className="dn">
          <label className="block mb-1 text-sm font-semibold text-gray-600">
            Register as
          </label>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.user_type}
            onChange={(e) => setForm((prev) => ({ ...prev, user_type: e.target.value }))}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {/* company_name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="company_name (e.g., demo)"
            name="company_name"
            value={form.company_name}
            onChange={(e) => setForm((prev) => ({ ...prev, company_name: e.target.value }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>


        {/* business_type */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="business_type (e.g., demo)"
            name="business_type"
            value={form.business_type}
            onChange={(e) => setForm((prev) => ({ ...prev, business_type: e.target.value }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>


        {/* gst_number */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="gst_number (e.g., gst_number)"
            name="gst_number"
            value={form.gst_number}
            onChange={(e) => setForm((prev) => ({ ...prev, gst_number: e.target.value }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>

        {/* address */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="address"
            placeholder="address (e.g., address)"
            name="text"
            value={form.address}
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>
        {/* city */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="city"
            placeholder="city (e.g., city)"
            name="text"
            value={form.city}
            onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>
        {/* state */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="state (e.g., state)"
            name="text"
            value={form.state}
            onChange={(e) => setForm((prev) => ({ ...prev, state: e.target.value }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>

        {/* whatsapp_number */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            placeholder="whatsapp_number (e.g., demo)"
            name="whatsapp_number"
            value={form.whatsapp_number}
            onChange={(e) => setForm((prev) => ({ ...prev, whatsapp_number: e.target.value }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>

        {/* logo */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="file"
            placeholder="Business logo (e.g., demo)"
            name="logo"
            accept="image/*"
            onChange={(e) => setForm((prev) => ({ ...prev, logo: e.target.files[0] }))}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full_ flex justify-self-end items-center py-2 px-3 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <>
              Secure Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </form>


    </div>

  </div>

  return (
    // Updated background for a richer look
    <div className="min-h-screen flex flex-col font-sans bg-gray-100/50_ bg-white bg-gray-50_">

      {/* 1. Header */}
      <Header />
      <style>{`body{background-image: url(/3072.jpg);
    background-repeat: repeat;
    background-size: 800px;}`}</style>

      {/* 2. Main Content Area (Login Form + Context Panel) */}
      {/* The main background uses a subtle gradient for depth */}
      <main className="flex-grow flex items-center min-h-screen justify-center p-4 py-5 md:py-5" >
        {isUser && login_()}
      </main>

      {/* 3. Footer */}
      <Footer />

    </div>
  );
}