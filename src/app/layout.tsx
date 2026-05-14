import { Inter, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cormorant' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'Custom Wedding Co.',
  description: 'Celebrate Love with a Personal Touch',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${playfair.variable}`}>
      <body>
        {children}
        <AnalyticsScripts />
        <Script src="https://js.stripe.com/v3/" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
