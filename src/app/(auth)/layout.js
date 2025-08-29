import { Inter } from 'next/font/google';
import "../../../public/style/xnay.css";
import "../../../public/style/UI_Responsive.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
                background: repeating-linear-gradient(45deg, #ffffff, #e4e4e4 100px);
            }
          }
          `}
        </style>
        {children}
      </body>
    </html>
  );
}