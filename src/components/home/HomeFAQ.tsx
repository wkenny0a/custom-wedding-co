'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
    {
        question: 'How does the customization process work?',
        answer: 'Once you place your order, you\'ll share your personalization details — names, dates, colors, and any custom text. Our design team creates a digital proof within 1–2 business days for your review and approval before we begin production.',
    },
    {
        question: 'What are your shipping times?',
        answer: 'Standard orders ship within 5–7 business days after proof approval. We offer rush processing (2–3 business days) for an additional fee. Free shipping is included on all orders over $75 within the continental US.',
    },
    {
        question: 'Can I see a proof before my order is made?',
        answer: 'Absolutely! Every order includes a complimentary digital proof. You\'ll receive it via email within 1–2 business days of placing your order. We won\'t begin production until you\'re 100% happy with the design.',
    },
    {
        question: 'Do you offer bulk or wedding party discounts?',
        answer: 'Yes! We offer tiered discounts for bulk orders — 10% off orders of 5+ items, and 15% off orders of 10+ items. Contact us for custom quotes on large wedding party orders or full wedding stationery suites.',
    },
    {
        question: 'What is your return and exchange policy?',
        answer: 'Because each item is custom-made to your specifications, we cannot accept returns. However, if there\'s a quality issue or error on our part, we\'ll gladly reprint or replace your order at no charge. Your satisfaction is our top priority.',
    },
    {
        question: 'Can I rush my order for a last-minute event?',
        answer: 'We understand wedding planning can be unpredictable! Rush processing is available at checkout and reduces production time to 2–3 business days. For extremely urgent orders, reach out to us directly and we\'ll do our best to accommodate your timeline.',
    },
]

export function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-[800px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        Common Questions
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="border border-gold/20 bg-cream/40 transition-all duration-300 hover:border-gold/40"
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between p-6 text-left group"
                                aria-expanded={openIndex === i}
                            >
                                <span className="font-sans font-bold text-base lg:text-lg text-espresso pr-4 group-hover:text-gold transition-colors duration-300">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`text-gold flex-shrink-0 w-5 h-5 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 pb-6 pt-0 text-espresso/75 font-sans text-sm lg:text-base leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
