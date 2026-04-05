'use client'

import { useState } from 'react'
import { StarRating } from '@/components/ui/StarRating'

export function ProductTabs({ product }: { product: any }) {
    const [activeTab, setActiveTab] = useState('description')

    const tabs = [
        { id: 'description', label: 'Description' },
    ]

    if (product.specifications && product.specifications.length > 0) {
        tabs.push({ id: 'specifications', label: 'Specifications' })
    }

    tabs.push(
        { id: 'reviews', label: 'Reviews' },
        { id: 'shipping', label: 'Shipping' }
    )

    const reviews = product.content?.reviews || [
        {
            rating: 5,
            date: 'Oct 12, 2025',
            title: 'Absolutely Perfect',
            text: '"This was exactly what we were looking for. The quality is exceptional and the personalization process was wonderfully easy. Highly recommend to any couple!"',
            author: 'Sarah M.',
            verified: true
        },
        {
            rating: 5,
            date: 'Sep 04, 2025',
            title: 'Beautiful Quality',
            text: '"I bought these as a wedding gift. They are stunning in person!"',
            author: 'John D.',
            verified: true
        },
        {
            rating: 4,
            date: 'Aug 22, 2025',
            title: 'Very nice',
            text: '"Great product. Shipping took a little longer than expected."',
            author: 'Emily R.',
            verified: true
        }
    ];

    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc: number, cur: any) => acc + cur.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    return (
        <div className="w-full mt-16 pt-16 border-t border-gold/20">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-8 justify-center border-b border-gray-200 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 font-sans text-sm uppercase tracking-widest font-bold transition-all ${activeTab === tab.id
                            ? 'border-b-2 border-espresso text-espresso'
                            : 'text-gray-400 hover:text-espresso'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-3xl mx-auto">
                {activeTab === 'description' && (
                    <div className="font-sans text-espresso/80 leading-relaxed text-center flex flex-col gap-6">
                        <p>
                            Beautifully handcrafted and fully customized, this piece is designed to tell your unique love story.
                            Our expert artisans meticulously create every order, ensuring the highest quality materials and attention to detail.
                        </p>
                        <p>
                            Perfect as a keepsake for yourself or a meaningful gift for someone you love.
                            Each item comes carefully packaged in our signature Custom Wedding Co. unboxing experience, ready to be cherished.
                        </p>
                        <ul className="text-left list-disc list-inside mt-4 space-y-2 w-max mx-auto">
                            <li>100% Custom designed for you</li>
                            <li>Premium, heirloom-quality materials</li>
                            <li>Archival-safe inks and finishes</li>
                            <li>Hand-assembled in our studio</li>
                        </ul>
                    </div>
                )}

                {activeTab === 'specifications' && product.specifications && (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm text-espresso border-collapse">
                            <tbody>
                                {product.specifications.map((spec: any, index: number) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <th className="py-4 font-semibold w-1/3">{spec.key}</th>
                                        <td className="py-4 text-gray-600">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between bg-cream p-8 rounded border border-gold/10">
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                                <span className="font-display text-4xl text-gold">{averageRating}</span>
                                <StarRating rating={Number(averageRating)} />
                                <span className="font-sans text-xs text-gray-500 uppercase tracking-widest mt-1">Based on {reviews.length} Reviews</span>
                            </div>
                            <button className="font-sans text-sm font-bold uppercase tracking-widest text-espresso border border-espresso px-6 py-3 hover:bg-espresso hover:text-cream transition-colors">
                                Write a Review
                            </button>
                        </div>

                        {/* Reviews List */}
                        {reviews.map((review: any, i: number) => (
                            <div key={i} className="flex flex-col gap-3 py-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <StarRating rating={review.rating} />
                                    <span className="font-sans text-xs text-gray-400">{review.date}</span>
                                </div>
                                <h4 className="font-serif font-bold text-lg text-espresso">{review.title}</h4>
                                <p className="font-sans text-sm text-espresso/80 leading-relaxed">
                                    "{review.text.replace(/^"|"$/g, '')}"
                                </p>
                                
                                {review.image && (
                                    <div className="mt-3 mb-2 h-32 w-32 relative overflow-hidden border border-gold/20 rounded object-cover">
                                        <img src={review.image} alt="Customer review" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                
                                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mt-2">
                                    — {review.author} {review.verified && <span className="text-gray-400 font-normal lowercase tracking-normal">(Verified Buyer)</span>}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'shipping' && (
                    <div className="font-sans text-espresso/80 leading-relaxed flex flex-col gap-6">
                        <div>
                            <h4 className="font-bold text-espresso uppercase tracking-widest text-xs mb-2">Processing Time</h4>
                            <p className="text-sm">Once you approve your digital proof, your custom piece enters production. Please allow 3-5 business days for our artisans to craft your order.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-espresso uppercase tracking-widest text-xs mb-2">Shipping Transit</h4>
                            <p className="text-sm border-l-2 border-gold/40 pl-4 py-1 italic mb-2">Free Standard Shipping on orders over $75 within the contiguous US.</p>
                            <ul className="text-sm space-y-1 list-disc list-inside">
                                <li>Standard: 3-5 business days</li>
                                <li>Expedited: 2 business days</li>
                                <li>Overnight: Next business day</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-espresso uppercase tracking-widest text-xs mb-2">Returns Policy</h4>
                            <p className="text-sm">Due to the highly personalized nature of our products, we do not accept returns or exchanges unless the item arrives damaged or contains a spelling error that differs from your approved proof.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
