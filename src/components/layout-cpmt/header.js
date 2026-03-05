import { LogIn, User, Lock, Loader2, AlertTriangle, ArrowRight, Home, Zap, HelpCircle, Briefcase, Globe, TrendingUp, Handshake, Box, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

// --- Header Component ---
export default function Header({ elements }) {
  return (
    <header className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 p-2 flex justify-between items-center bg-black text-white">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          {/* <Zap className="w-7 h-7" /> */}
          <Link href='/'>
            <span className="text-2xl font-extrabold tracking-tighter">
              Trade<span className="text-[aqua]">B2B</span>
            </span>
          </Link>
        </div>
        {/* Navigation (Hidden on Mobile, simplified for login page) */}
        <nav className="sm:flex space-x-8 text-sm font-medium">
          {elements.length > 0 && elements.map(v => (<>{v}</>))}
        </nav>
      </div>
    </header>
  )
};