'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ToastProps {
    message: string
    isVisible: boolean
    onClose: () => void
    duration?: number
}

export function Toast({ message, isVisible, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [isVisible, duration, onClose])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-espresso text-cream px-6 py-4 rounded shadow-lg flex items-center justify-between gap-4 max-w-sm">
                <p className="font-sans text-sm">{message}</p>
                <button onClick={onClose} className="text-cream hover:text-gold transition-colors">
                    <X size={18} />
                </button>
            </div>
        </div>
    )
}
