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
      <body className={`${inter.variable} font-sans`} data-theme="light">
        <style>
          {`
          @media (max-width: 720px) {
            body {
              background: whitesmoke;
            }
          }
          `}
        </style>
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}