import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../../globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Secure Checkout | Custom Wedding Co.",
  description: "Complete your order securely.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} ${cormorant.variable} antialiased font-sans min-h-screen text-espresso bg-cream`}
    >
      <CartProvider>
        {/* Minimal header — no nav, just logo + trust signal */}
        <header className="w-full border-b border-gold-pale/30 bg-cream/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <a href="/" className="font-serif text-xl tracking-[0.15em] uppercase text-espresso">
              Custom Wedding Co.
            </a>
            <div className="flex items-center gap-2 text-xs font-sans text-espresso/60 uppercase tracking-wider">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </div>
          </div>
          {/* Progress breadcrumb */}
          <div className="w-full bg-espresso/5 border-t border-gold-pale/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest text-espresso/50">
              <a href="/shop" className="hover:text-espresso transition-colors">Shop</a>
              <span>›</span>
              <span className="text-espresso font-semibold">Checkout</span>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gold-pale/30 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-espresso/50">
            <span>© 2025 Custom Wedding Co. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-espresso transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-espresso transition-colors">Terms of Service</a>
              <a href="/shop" className="hover:text-espresso transition-colors">Continue Shopping</a>
            </div>
          </div>
        </footer>
      </CartProvider>
    </div>
  );
}
