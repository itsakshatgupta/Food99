// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { fetchAPI } from "@/app/(api)/api";
// import { EyeIcon, EyeOffIcon } from "lucide-react";

// export default function RegisterPage() {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     user_type: "buyer",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const router = useRouter();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     try {
//       // Basic field validation
//       if (!form.username || !form.email || !form.password) {
//         throw new Error("Please fill all required fields");
//       }

//       await fetchAPI("register", "POST", form);

//       alert("🎉 Registration successful! Please login now.");
//       router.push("/login");
//     } catch (err) {
//       console.error("Register error:", err);
//       setErrorMsg(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (

//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* User type */}
//       <div>
//         <label className="block mb-1 text-sm font-semibold text-gray-600">
//           Register as
//         </label>
//         <select
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.user_type}
//           onChange={(e) => setForm({ ...form, user_type: e.target.value })}
//         >
//           <option value="buyer">Buyer</option>
//           <option value="seller">Seller</option>
//         </select>
//       </div>

//       {/* Phone */}
//       <div>
//         <label className="block mb-1 text-sm font-semibold text-gray-600">
//           Phone Number
//         </label>
//         <input
//           type="tel"
//           placeholder="Enter phone number"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//         />
//       </div>

//       {/* Username */}
//       <div>
//         <label className="block mb-1 text-sm font-semibold text-gray-600">
//           Username
//         </label>
//         <input
//           type="text"
//           placeholder="Choose a username"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.username}
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block mb-1 text-sm font-semibold text-gray-600">
//           Email
//         </label>
//         <input
//           type="email"
//           placeholder="Enter email"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//       </div>

//       {/* Password */}
//       <div className="relative">
//         <label className="block mb-1 text-sm font-semibold text-gray-600">
//           Password
//         </label>
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter password"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
//         >
//           {showPassword ? (
//             <EyeOffIcon size={18} />
//           ) : (
//             <EyeIcon size={18} />
//           )}
//         </button>
//       </div>

//       {/* Submit */}
//       <button
//         disabled={loading}
//         className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${loading
//             ? "bg-blue-300 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//           }`}
//       >
//         {loading ? "Creating account..." : "Register"}
//       </button>
//     </form>


//   );
// }
'use client'
import React, { useState, useEffect } from 'react';
import { fetchAPI } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { LogIn, User, Lock, Loader2, AlertTriangle, ArrowRight, Home, Zap, HelpCircle, Briefcase, Globe, TrendingUp, Handshake, Box, Twitter, Facebook } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';


// --- Header Component ---
const Header = () => (
  <header className="">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-2">
        {/* <Zap className="w-7 h-7 text-indigo-600" /> */}
        <span className="text-2xl font-extrabold text-gray-900 tracking-tighter">
          Trade<span className="text-purple-600">B2B</span>
        </span>
      </div>
      {/* Navigation (Hidden on Mobile, simplified for login page) */}
      <nav className="hidden sm:flex space-x-8 text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-800 transition flex items-center"><Home className="w-4 h-4 mr-1" /> Home</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition flex items-center"><Briefcase className="w-4 h-4 mr-1" /> Features</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition flex items-center"><HelpCircle className="w-4 h-4 mr-1" /> Support</a>
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
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">TradeB2B</h3>
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
        &copy; {new Date().getFullYear()} TradeB2B. All rights reserved.
      </div>
    </div>
  </footer>
);


// --- Main Component: LoginPage ---
export default function SellerSignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    user_type: "seller",
    phone: "",
  });

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [self_verify, setSelf_verify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const p__ = useParams();
  const p___ = useSearchParams();



  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Basic field validation
      if (!form.username || !form.email || !form.password) {
        throw new Error("Please fill all required fields");
      }

      const res = await fetchAPI("register", "POST", form);
      // Store tokens and user data (using localStorage here to match original prompt)
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("access", res.access);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {

    if (p___.has('verify')) {
      alert(p___.get('verify'))
      setSelf_verify(true);
      
      async function Requesting_UserAsSeller(id) {
        setIsLoading(true);
        setError("");

        try {


          const res = await fetchAPI("register/"+user.id, "PATCH", {user_type:"seller"}, true);
          // router.push("/login");
          console.log("MMMV:". res)
        } catch (err) {
          console.error("Register error:", err);
          setError(err.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }

      Requesting_UserAsSeller(p___.get('verify'))
    }
    console.log('M:', p___.get('verify'))

  }, [p___])



  // Feature list for the Context Panel
  const features = [
    { icon: TrendingUp, title: "Global Reach", description: "Expand your market across 50+ countries instantly." },
    { icon: Handshake, title: "Secure Transactions", description: "Blockchain-verified contracts and escrow services." },
    { icon: Box, title: "Optimized Logistics", description: "Integrated shipping and inventory management tools." },
  ];
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    // Updated background for a richer look
    <div className="min-h-screen flex flex-col font-sans bg-gray-100/50_ bg-white" style={{ background: 'linear-gradient(45deg, #f8f8f8f5, #fdfdffff)_' }}>

      {/* 1. Header */}
      <Header />
      <style>{`body{background-image: url(/3072.jpg);
    background-repeat: repeat;
    background-size: 800px;}`}</style>
      {/* 2. Main Content Area (Login Form + Context Panel) */}
      {/* The main background uses a subtle gradient for depth */}
      <main className="flex-grow flex items-center justify-center p-4 py-5 md:py-5" >
        {!self_verify ? <div className="max-w-6xl pR w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="220"
            height="220"
            viewBox="0 0 220 220"
            style={{
              position: "absolute",
              top: 0,
            }}
          >
            <g>
              {/* Row 1 */}
              <circle
                className="dot"
                cx={50}
                cy={50}
                r={100}
                fill="#3730a30d"
                style={{
                  stroke: "#3730a30d",
                }}
              />

              {/* Row 2 */}
              <circle
                className="dot"
                cx={144}
                cy={10}
                r={35}
                style={{
                  fill: "#d3d1f1",
                }}
              />
            </g>
          </svg>
          {/* Contextual Background Panel (Visible on Large Screens) */}
          <div className="space-y-8 p-8 rounded-2xl bg-white_ shadow-xl_ border_ border-indigo-100/70">

            <h2 className="text-3xl font-extrabold text-indigo-800 tracking-tight leading-snug">
              <span className="text-indigo-600">Powering</span> the Next Generation of B2B Commerce.
            </h2>
            <p className="text-gray-600 text-md">
              TradeB2B is designed for high-volume transactions, providing unparalleled transparency and efficiency for manufacturers, suppliers, and buyers worldwide.
            </p>

            <div className="space-y-6 pt-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start space-x-4">
                  <feature.icon className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
                    <p className="text-gray-500 text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form Card (Existing) */}
          <div className="w-full max-w-[25rem]  mx-auto bg-white p-8 sm:p-6 rounded-xl shadow-md_ border border-gray-200">

            {/* Header */}
            <div className="text-center mb-8">
              <LogIn className="w-10 h-10 mx-auto text-indigo-600 mb-3" />
              <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">
                Sign Up to TradeB2B Seller
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Your gateway to B2B global commerce.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 mb-4 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg" role="alert">
                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {user && <div className="p-2 tac bg-black rounded-sm text-sm text-white mb-3 hover:bg-black/80 cursor-pointer" onClick={() => router.push("?verify=" + user.id)}>
              Continue with Exsisting TradeB2B Account

            </div>}

            <div className="border dn px-2 py-2">
              <div className="text-sm df items-center gap-2">Signup With : 
                <div className="df aic gap-3"><span><Twitter/></span><span><Facebook/></span><span><svg width="24px" height="24px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg></span></div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6  dn text-sm">
              {/* User type */}
              <div className="dn">
                <label className="block mb-1 text-sm font-semibold text-gray-600">
                  Register as
                </label>
                <select
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.user_type}
                  onChange={(e) => setForm({ ...form, user_type: e.target.value })}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              {/* Username Input */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username (e.g., demo)"
                  name="username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
                  disabled={isLoading}
                  required
                />
              </div>


              {/* Email Input */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email (e.g., demo)"
                  name="username"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
                  disabled={isLoading}
                  required
                />
              </div>


              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password (e.g., password)"
                  name="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone (e.g., demo)"
                  name="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-3 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <>
                    Proceed
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div id="login-status" className="text-center text-xs dn text-gray-400 mt-4">

            </div>
          </div>



        </div> : <div>Verifying you {user.username} ...</div>}
      </main>

      {/* 3. Footer */}
      <Footer />

    </div>
  );
}
