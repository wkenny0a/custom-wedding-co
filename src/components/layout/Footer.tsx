import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Heart, Instagram, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const shopLinks = [
    { href: '/shop/signage-displays', label: 'Signage & Displays' },
    { href: '/shop/ceremony-reception', label: 'Ceremony & Reception' },
    { href: '/shop/favors-party-extras', label: 'Wedding Favors' },
    { href: '/shop/barware-drinkware', label: 'Tabletop & Barware' },
    { href: '/shop/bridal-party-gifts', label: 'Bridal Party Gifts' },
    { href: '/shop/groomsmen-gifts', label: 'Groomsmen Gifts' },
    { href: '/shop/wedding-keepsakes', label: 'Wedding Keepsakes' },
]

const trustItems = [
    { icon: Sparkles, label: 'Free personalization' },
    { icon: ShieldCheck, label: 'Proof before production' },
    { icon: Truck, label: 'Free shipping $99+' },
]

export function Footer() {
    return (
        <footer className="bg-cream-dark text-espresso pt-16 pb-24 px-6 lg:px-12 lg:pb-8 border-t border-gold/20 mt-auto">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
                {/* Col 1 - Brand */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Image src="/assets/logo.png" alt="Custom Wedding Co. Logo" width={220} height={88} className="object-contain" />
                    </Link>
                    <p className="font-serif italic text-lg opacity-80">
                        &ldquo;Celebrate Love with a Personal Touch&rdquo;
                    </p>
                    <div className="grid gap-2">
                        {trustItems.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-espresso/70">
                                <Icon className="h-4 w-4 text-gold" />
                                {label}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 items-center">
                        <a href="https://instagram.com/customweddingco" target="_blank" rel="noopener noreferrer" aria-label="Custom Wedding Co. on Instagram" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"><Instagram size={18} /></a>
                        <a href="https://www.pinterest.com/customweddingco/" target="_blank" rel="noopener noreferrer" aria-label="Custom Wedding Co. on Pinterest" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors">
                            <span className="font-serif text-lg font-bold leading-none">P</span>
                        </a>
                        <a href="https://www.etsy.com/shop/CustomWeddingCo" target="_blank" rel="noopener noreferrer" aria-label="Custom Wedding Co. on Etsy" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"><Heart size={18} /></a>
                        <a href="https://facebook.com/customweddingco" target="_blank" rel="noopener noreferrer" aria-label="Custom Wedding Co. on Facebook" className="w-10 h-10 rounded-full border border-espresso flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"><Facebook size={18} /></a>
                    </div>
                </div>

                {/* Col 2 - Shop */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-gold">Shop</h4>
                    {shopLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="font-sans text-sm hover:text-gold transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Col 3 - Help */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-gold">Help</h4>
                    <Link href="/how-to-order" className="font-sans text-sm hover:text-gold transition-colors">How to Order</Link>
                    <Link href="/proofing-process" className="font-sans text-sm hover:text-gold transition-colors">Proofing Process</Link>
                    <Link href="/shipping-returns" className="font-sans text-sm hover:text-gold transition-colors">Shipping & Returns</Link>
                    <Link href="/faq" className="font-sans text-sm hover:text-gold transition-colors">FAQ</Link>
                    <Link href="/contact" className="font-sans text-sm hover:text-gold transition-colors">Contact Us</Link>
                </div>

                {/* Col 4 - About */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-2 text-gold">About</h4>
                    <Link href="/our-story" className="font-sans text-sm hover:text-gold transition-colors">Our Story</Link>
                    <Link href="/about" className="font-sans text-sm hover:text-gold transition-colors">About Us</Link>
                    <Link href="/reviews" className="font-sans text-sm hover:text-gold transition-colors">Customer Reviews</Link>
                    <Link href="/real-weddings" className="font-sans text-sm hover:text-gold transition-colors">Real Weddings</Link>
                    <Link href="/press" className="font-sans text-sm hover:text-gold transition-colors">Press</Link>
                    <Link href="/blog" className="font-sans text-sm hover:text-gold transition-colors">Blog</Link>
                    <a href="https://www.etsy.com/shop/CustomWeddingCo" target="_blank" rel="noopener noreferrer" className="font-sans text-sm hover:text-gold transition-colors">Etsy Shop</a>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto pt-8 border-t border-espresso/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-sans text-xs text-gray-600">
                    © {new Date().getFullYear()} Custom Wedding Co. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-gray-600">
                    <span className="border border-gold/25 bg-cream px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]">
                        Secure checkout
                    </span>
                    <span className="border border-gold/25 bg-cream px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]">
                        Bulk friendly
                    </span>
                    <span className="border border-gold/25 bg-cream px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]">
                        Wedding ready
                    </span>
                </div>
            </div>
        </footer>
    )
}
