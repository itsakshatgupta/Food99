import { LogIn, User, Lock, Loader2, AlertTriangle, ArrowRight, Home, Zap, HelpCircle, Briefcase, Globe, TrendingUp, Handshake, Box, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

// --- Footer Component (with common widgets) ---
export default function Footer(){
    return(
  <footer className="bg-gray-800 text-white pt-8 pb-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-6 mb-6">

        {/* Widget 1: Company Info */}
        <div>
          <Link href="/"><h3 className="text-lg font-semibold mb-3 text-indigo-400">TradeB2B</h3></Link>
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
            <li>Email: support@tradeb2b.online</li>
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
)};
