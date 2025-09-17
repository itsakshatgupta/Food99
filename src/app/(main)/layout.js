import { Inter } from 'next/font/google';
import MainWrapper from '@/components/main-context-wrapper';


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
      <body className={`${inter.variable} font-sans qqqXA`} data-theme="light">
        <style>
          {`
          @media (max-width: 720px) {
            body {
              background: whitesmoke;
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
      </body>
    </html>
  );
}