import { StarRating } from '@/components/ui/StarRating'

export function Testimonials() {
    const reviews = [
        {
            text: "Absolutely stunning. Our guests couldn't stop complimenting our welcome sign. It set the perfect tone for the evening.",
            author: "Isabelle M.",
            date: "August 2025",
        },
        {
            text: "The vow books were breathtaking. Exceeded every expectation. We will cherish them for the rest of our lives.",
            author: "Charlotte R.",
            date: "September 2025",
        },
        {
            text: "Ordered the song lyrics print for our 1st anniversary. Frame-worthy from day one. Thank you for capturing our memory so beautifully.",
            author: "Amelia T.",
            date: "July 2025",
        },
    ]

    return (
        <section className="py-20 lg:py-28 bg-blush-dark/30">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-espresso font-bold text-xs sm:text-sm mb-4">
                        Couples Love Us
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso">
                        Words From The Heart
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="bg-cream p-10 flex flex-col items-center text-center shadow-sm border border-gold/10 hover:shadow-md transition-shadow duration-300">
                            <StarRating rating={5} className="mb-6" starClassName="w-5 h-5" />
                            <p className="font-serif italic text-lg lg:text-xl text-espresso leading-relaxed mb-8 flex-1">
                                "{rev.text}"
                            </p>
                            <div className="flex flex-col gap-1 items-center">
                                <span className="font-sans font-bold uppercase tracking-wider text-xs text-espresso">
                                    {rev.author}
                                </span>
                                <span className="font-sans text-xs text-gray-400">
                                    {rev.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
