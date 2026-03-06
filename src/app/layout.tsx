import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Custom Wedding Co.",
  description: "Celebrate Love with a Personal Touch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.css" />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${playfair.variable} antialiased font-sans flex flex-col min-h-screen text-espresso bg-cream`}>
        <AnnouncementBar />
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <script async src="https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.js"></script>
        <div hidden id="snipcart" data-api-key="NTRjZGFiNjItZjBhZS00Y2ViLWFjNmQtNTgxYzNjMmNiNmZmNjM4MjM4NzMxOTQxNDkxNTgw" data-config-modal-style="side"></div>
      </body>
    </html>
  );
}
