'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import { MobileDrawer } from './MobileDrawer'
import { useCart } from '@/context/CartContext'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { cart, setIsCartOpen } = useCart()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <header
                className={`sticky top-[40px] sm:top-[36px] z-40 transition-all duration-300
          ${isScrolled
                        ? 'bg-cream/85 backdrop-blur-md shadow-[0_4px_24px_rgba(74,44,42,0.06)] py-3'
                        : 'bg-cream/85 backdrop-blur-md py-5 border-b border-gold/10'
                    }`}
            >
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between">

                    {/* Left Nav (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-8 w-1/3">
                        <Link href="/shop" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Shop All</Link>
                        <Link href="/shop/paper-goods" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Stationery</Link>
                        <Link href="/shop/decor-signage" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Décor</Link>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden p-2 -ml-2 text-espresso hover:text-gold"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Center Logo */}
                    <div className="w-1/3 flex justify-center">
                        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                            <Image src="/assets/logo.png" alt="Custom Wedding Co. Logo" width={250} height={100} className="object-contain" priority />
                        </Link>
                    </div>

                    {/* Right Nav */}
                    <div className="flex items-center justify-end gap-6 w-1/3">
                        <nav className="hidden lg:flex items-center gap-8 mr-4">
                            <Link href="/shop/keepsakes" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Keepsakes</Link>
                            <Link href="/shop/sentimental-gifts" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Gifts</Link>
                        </nav>
                        <div className="flex items-center gap-4 text-espresso">
                            <button className="hover:text-gold transition-colors">
                                <Search size={20} strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative hover:text-gold transition-colors flex items-center group"
                            >
                                <ShoppingBag size={20} className="group-hover:text-gold" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-2 bg-gold text-cream text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cart?.items?.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0) || 0}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    )
}
