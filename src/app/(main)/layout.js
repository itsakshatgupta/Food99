import { Inter } from 'next/font/google';
import MainWrapper from '@/components/main-context-wrapper';
import { Globe } from 'lucide-react';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Your head content here */}
        <meta name="theme-color" content="whitesmoke" />
        <link rel="manifest" href="/manifest.json" />

      </head>
      <body className={`${inter.variable} font-sans qqqXA`} data-theme="light">
        <style>
          {`
          @media (max-width: 720px) {
            body {
              background: whitesmoke_;
              overflow-x:hidden;
            }
          }
          .nav-menu-active{
            background: #E8F5E9;
            padding-inline: 5px;
            border-radius: 10px;
            padding-block: 3px;
            font-weight: bold;
          }
          `}
        </style>
        <MainWrapper>{children}</MainWrapper>
        <Footer/>
      </body>
    </html>
  );
}