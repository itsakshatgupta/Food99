"use client";
import { Inter } from 'next/font/google';
import "../../../public/style/xnay.css";
import "../../../public/style/UI_Responsive.css";
import "../globals.css"
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Your head content here */}
        <meta name="theme-color" content="whitesmoke" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans`} data-theme="light">
        <style>
          {`
          @media (max-width: 720px) {
            body {
                backdrop-filter: brightness(0.95);
            }
          }
          `}
        </style>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}