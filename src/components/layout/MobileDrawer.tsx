'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface MobileDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-espresso/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 bottom-0 w-[300px] bg-cream z-[70] shadow-2xl transition-transform duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-6 flex items-center justify-between border-b justify-end border-gold/20">
                    <span className="font-display text-xl text-espresso">Menu</span>
                    <button onClick={onClose} className="p-2 -mr-2 text-espresso hover:text-gold">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    <Link href="/shop" onClick={onClose} className="font-serif text-2xl text-espresso hover:text-gold transition-colors">Shop All</Link>
                    <Link href="/shop/paper-goods" onClick={onClose} className="font-serif text-2xl text-espresso hover:text-gold transition-colors">Stationery</Link>
                    <Link href="/shop/decor-signage" onClick={onClose} className="font-serif text-2xl text-espresso hover:text-gold transition-colors">Décor</Link>
                    <Link href="/shop/keepsakes" onClick={onClose} className="font-serif text-2xl text-espresso hover:text-gold transition-colors">Keepsakes</Link>
                    <Link href="/shop/sentimental-gifts" onClick={onClose} className="font-serif text-2xl text-espresso hover:text-gold transition-colors">Gifts</Link>

                    <div className="mt-8 pt-8 border-t border-gold/20 flex flex-col gap-4">
                        <Link href="/our-story" onClick={onClose} className="font-sans tracking-wide uppercase text-sm text-gray-600 hover:text-gold">Our Story</Link>
                        <Link href="/how-to-order" onClick={onClose} className="font-sans tracking-wide uppercase text-sm text-gray-600 hover:text-gold">How to Order</Link>
                        <Link href="/contact" onClick={onClose} className="font-sans tracking-wide uppercase text-sm text-gray-600 hover:text-gold">Contact Us</Link>
                    </div>
                </nav>
            </div>
        </>
    )
}
