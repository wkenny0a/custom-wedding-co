'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ProductFAQ({ block }: { block: any }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    if (!block.questions || block.questions.length === 0) return null

    return (
        <div className="max-w-[800px] mx-auto py-16 px-6">
            <h2 className="font-display text-4xl text-espresso mb-10 text-center">{block.heading || 'Frequently Asked Questions'}</h2>
            <div className="flex flex-col gap-4">
                {block.questions.map((q: any, i: number) => (
                    <div key={i} className="border border-gold/30 bg-cream/50">
                        <button
                            onClick={() => toggle(i)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gold/5 transition-colors"
                        >
                            <span className="font-sans font-bold text-lg text-espresso">{q.question}</span>
                            {openIndex === i ? <ChevronUp className="text-gold flex-shrink-0" /> : <ChevronDown className="text-gold flex-shrink-0" />}
                        </button>
                        {openIndex === i && (
                            <div className="px-6 pb-6 text-espresso/80 font-sans leading-relaxed">
                                {q.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
