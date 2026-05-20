'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingBag, Menu, ChevronDown } from 'lucide-react'
import { MobileDrawer } from './MobileDrawer'
import { useCart } from '@/context/CartContext'

type CartLine = {
    quantity?: number
}

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
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3">

                    {/* Left Nav (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-5 xl:gap-8 w-1/3">
                        <Link href="/shop" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Shop All</Link>
                        <Link href="/shop/bridal-party-gifts" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Bridal</Link>
                        <div className="relative group py-2">
                            <button className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors flex items-center gap-1">
                                Build a Box <ChevronDown size={14} className="group-hover:-rotate-180 transition-transform duration-300" />
                            </button>
                            <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                                <div className="bg-cream border border-gold/20 shadow-xl rounded-md py-2 w-48 flex flex-col">
                                    <Link href="/gifts/bridesmaid-box" className="px-4 py-2.5 font-sans text-xs uppercase tracking-widest hover:bg-gold/5 hover:text-gold transition-colors text-espresso">Bridesmaid Box</Link>
                                    <Link href="/gifts/groom-box" className="px-4 py-2.5 font-sans text-xs uppercase tracking-widest hover:bg-gold/5 hover:text-gold transition-colors text-espresso">Groomsman Box</Link>
                                    <Link href="/gifts/welcome-gift-box" className="px-4 py-2.5 font-sans text-xs uppercase tracking-widest hover:bg-gold/5 hover:text-gold transition-colors text-espresso">Welcome Box</Link>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden p-2 -ml-2 text-espresso hover:text-gold"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Center Logo */}
                    <div className="min-w-0 flex-1 lg:w-1/3 lg:flex-none flex justify-center">
                        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                            <Image src="/assets/logo.png" alt="Custom Wedding Co. Logo" width={250} height={100} className="w-[160px] max-w-[46vw] sm:w-[210px] lg:w-[250px] h-auto object-contain" priority />
                        </Link>
                    </div>

                    {/* Right Nav */}
                    <div className="flex items-center justify-end gap-5 xl:gap-6 w-1/3">
                        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 mr-2 xl:mr-4">
                            <Link href="/shop/barware-drinkware" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Tabletop</Link>
                            <Link href="/shop/favors-party-extras" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">Favors</Link>
                            <Link href="/about" className="font-sans text-[0.8rem] uppercase tracking-widest font-medium hover:text-gold transition-colors">About</Link>
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
                                    {cart?.items?.reduce((acc: number, item: CartLine) => acc + (item.quantity || 1), 0) || 0}
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
