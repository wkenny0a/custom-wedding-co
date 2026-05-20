'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'

export function Newsletter() {
    const [email, setEmail] = useState('')
    const [showToast, setShowToast] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setShowToast(true)
            setEmail('')
        }
    }

    return (
        <section className="py-24 bg-cream border-t border-gold/20">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <h2 className="font-display text-3xl md:text-4xl text-espresso mb-4">
                    Get Exclusive Wedding Inspiration
                </h2>
                <p className="font-sans text-espresso/80 text-sm md:text-base leading-relaxed mb-8">
                    Join 50,000+ couples who get styling tips, seasonal inspiration, and exclusive deals delivered straight to their inbox.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-white border border-gold/30 px-6 py-3.5 focus:outline-none focus:border-gold font-sans text-sm text-espresso placeholder-gray-400"
                        required
                    />
                    <Button type="submit" variant="primary">
                        Subscribe
                    </Button>
                </form>

                <p className="font-sans text-xs text-gray-400 italic">
                    No spam, ever. Unsubscribe anytime.
                </p>
            </div>

            <Toast
                message="✦ Welcome to the Custom Wedding Co. family!"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </section>
    )
}
