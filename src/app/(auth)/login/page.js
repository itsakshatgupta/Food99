'use client'
import React, { useEffect, useState } from 'react';
import { fetchAPI } from "@/app/(api)/api";
import { useRouter } from "next/navigation";
import { LogIn, User, Lock, Loader2, AlertTriangle, ArrowRight, Home, Zap, HelpCircle, Briefcase, Globe, TrendingUp, Handshake, Box, Twitter, Facebook } from 'lucide-react';

// --- Header Component ---
const Header = () => (
  <header className="bg-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-2 flex justify-between items-center">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-2">
        {/* <Zap className="w-7 h-7" /> */}
        <span className="text-2xl font-extrabold tracking-tighter">
          Trade<span className="text-[aqua]">B2B</span>
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
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [logout, setLogout] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      if (timer) clearTimeout(timer);
      if (logout) {
        try {
          async function lg_() {
            const res = await fetchAPI("logout", "POST", { refresh: localStorage.getItem("refresh") }, true, false, false);
            console.log(res.error)
            if (res === "success") {
              localStorage.clear()
            } else {
              setError(res.error);
              localStorage.clear()
            }
            setLogout(false);
            setIsUser(false)
          }
          lg_()
        }
        catch (err) {
          console.error('Logut Error:', err.message);
          setError(err.message || "Logout failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        let i;
        setTimer(setTimeout(() => router.push("/"), 5000))
      };
    }
  }, [logout])

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!form.username || !form.password) {
      setError("Both username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetchAPI("token", "POST", form);

      // Store tokens and user data (using localStorage here to match original prompt)
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("access", res.access);
      localStorage.setItem("user", JSON.stringify(res.user));

      router.push("/");

    } catch (err) {
      console.error('Login Error:', err.message);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 3000);
    }
  }, [error])

  useEffect(()=> {
    if (localStorage.getItem("user")) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  },[])
  // Feature list for the Context Panel
  const features = [
    { icon: TrendingUp, title: "Global Reach", description: "Expand your market across 50+ countries instantly." },
    { icon: Handshake, title: "Secure Transactions", description: "Blockchain-verified contracts and escrow services." },
    { icon: Box, title: "Optimized Logistics", description: "Integrated shipping and inventory management tools." },
  ];
  const logout_ = () => <div className="max-w-auto w-full_ p-3 border rounded-sm">
    {error && <div className="flex items-center p-3 mb-4 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg" role="alert">
      <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
      <span>{error}</span>
    </div>}
    <div className="mb-5">
      <h1 className="text-lg mb-3 text-gray-900">Logout Here</h1>
      <span className="ml-1 px-3 py-1 text-sm bg-blue-600 rounded-md text-white cursor-pointer" onClick={() => setLogout(true)}>Logout</span>
      <p className="ml-1 mt-3 text-sm">You need to logout before a fresh login.</p>
    </div>
    <div className="text-sm text-gray-800">Redirecting to TradeB2B.com in 5 sec.
    </div>
  </div>

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
      <div className="border_ py-2 mb-3">
        <div className="text-sm df_ items-center gap-2">
          <div className="df aic gap-3"><span className="border rounded-sm px-2 py-1  df aic gap-1"><Twitter size={18}/>Twitter</span><span className="border rounded-sm px-2 py-1  df aic gap-1"><Facebook size={18}/>Facebook</span><span className="border rounded-sm px-2 py-1  df aic gap-1"><svg width="16px" height="16px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>Google</span></div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center p-3 mb-4 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg" role="alert">
          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">

        {/* Username Input */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Username (e.g., demo)"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password (e.g., password)"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              disabled={isLoading}
              required
            />
          </div>
          <div className="text-[0.675rem] cursor-pointer text-end mt-1 font500 text-blue-800">Forget Password?</div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full_ flex justify-center items-center py-2 px-3 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 transition duration-200"
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

      <div id="login-status" className="text-center text-xs text-gray-400 mt-4">
        Try username: **demo**, password: **password**
      </div>
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
      <main className="flex-grow flex items-center h-screen justify-center p-4 py-5 md:py-5" >
        {isUser&&logout_()}
        {isUser===false&&login_()}
        {isUser===null&&<h1 className="df aic"> <Loader2 className="w-5 h-5 mr-2 animate-spin" />Loading...</h1>}
      </main>

      {/* 3. Footer */}
      <Footer />

    </div>
  );
}