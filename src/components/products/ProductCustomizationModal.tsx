/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { ProductHero } from './ProductHero'

export interface ProductCustomizationModalProps {
    product: any
    onClose: () => void
}

export function ProductCustomizationModal({
    product,
    onClose,
}: ProductCustomizationModalProps) {
    // Disable body scroll when modal is open to prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-md transition-opacity duration-300">
            {/* Clickable Backdrop */}
            <div
                className="absolute inset-0 cursor-pointer"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-6xl bg-white border border-gold/30 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto rounded-sm animate-in fade-in zoom-in-95 duration-300">
                {/* Floating Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-espresso hover:text-gold transition-all bg-cream/80 hover:bg-white border border-gold/25 rounded-full hover:rotate-90 duration-300"
                    aria-label="Close modal"
                >
                    <X size={20} strokeWidth={1.5} />
                </button>

                {/* Premium Inner Content Container */}
                <div className="p-6 md:p-12">
                    <ProductHero product={product} />
                </div>
            </div>
        </div>
    )
}
