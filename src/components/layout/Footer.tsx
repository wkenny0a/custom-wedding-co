import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Heart } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-cream-dark text-espresso pt-16 pb-8 px-6 lg:px-12 border-t border-gold/20 mt-auto">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
                {/* Col 1 - Brand */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Image src="/assets/logo.png" alt="Custom Wedding Co. Logo" width={220} height={88} className="object-contain" />
                    </Link>
                    <p className="font-serif italic text-lg opacity-80">
                        &quot;Celebrate Love with a Personal Touch&quot;
                    </p>
                    <div className="flex gap-4 items-center">
                        <a href="https://instagram.com/customweddingco" aria-label="Custom Wedding Co. on Instagram" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"><Instagram size={18} /></a>
                        <a href="https://pinterest.com/customweddingco" aria-label="Custom Wedding Co. on Pinterest" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                        </a>
                        <Link href="/reviews" aria-label="Customer reviews" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"><Heart size={18} /></Link>
                        <a href="https://facebook.com/customweddingco" aria-label="Custom Wedding Co. on Facebook" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"><Facebook size={18} /></a>
                    </div>
                </div>

                {/* Col 2 - Shop */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-gold">Shop</h4>
                    <Link href="/shop/welcome-signs-signage" className="font-sans text-sm hover:text-gold transition-colors">Welcome Signs</Link>
                    <Link href="/shop/stationery-paper-goods" className="font-sans text-sm hover:text-gold transition-colors">Stationery & Paper</Link>
                    <Link href="/shop/barware-drinkware" className="font-sans text-sm hover:text-gold transition-colors">Tabletop & Barware</Link>
                    <Link href="/shop/bridal-party-gifts" className="font-sans text-sm hover:text-gold transition-colors">Bridal Party Gifts</Link>
                    <Link href="/shop/groomsmen-gifts" className="font-sans text-sm hover:text-gold transition-colors">Groomsmen Gifts</Link>
                    <Link href="/shop/wedding-keepsakes" className="font-sans text-sm hover:text-gold transition-colors">Wedding Keepsakes</Link>
                </div>

                {/* Col 3 - Help */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-gold">Help</h4>
                    <Link href="/proofing-process" className="font-sans text-sm hover:text-gold transition-colors">Proofing Process</Link>
                    <Link href="/shipping-returns" className="font-sans text-sm hover:text-gold transition-colors">Shipping & Returns</Link>
                    <Link href="/faq" className="font-sans text-sm hover:text-gold transition-colors">FAQ</Link>
                    <Link href="/contact" className="font-sans text-sm hover:text-gold transition-colors">Contact Us</Link>
                </div>

                {/* Col 4 - About */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-gold">About</h4>
                    <Link href="/about" className="font-sans text-sm hover:text-gold transition-colors">Our Story</Link>
                    <Link href="/wedding-must-haves-2026-2027-v2" className="font-sans text-sm hover:text-gold transition-colors">2026/2027 Guide</Link>
                    <Link href="/blog" className="font-sans text-sm hover:text-gold transition-colors">Blog</Link>
                    <Link href="/contact" className="font-sans text-sm hover:text-gold transition-colors">Wholesale & Etsy</Link>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto pt-8 border-t border-espresso/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="font-sans text-xs text-gray-600 flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <span>© {new Date().getFullYear()} Custom Wedding Co. All rights reserved.</span>
                    <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
                </div>
                <div className="flex gap-2 text-gray-400">
                    {/* Mock payment icons */}
                    <div className="h-6 w-10 bg-gray-200 rounded border border-gray-300"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded border border-gray-300"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded border border-gray-300"></div>
                </div>
            </div>
        </footer>
    )
}
