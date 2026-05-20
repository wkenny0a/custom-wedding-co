export function HowItWorks() {
    const steps = [
        {
            num: '01',
            title: 'Choose Your Product',
            desc: 'Browse our collection of expertly designed pieces.',
        },
        {
            num: '02',
            title: 'Share Your Details',
            desc: 'Provide your names, date, colors, and custom message.',
        },
        {
            num: '03',
            title: 'Approve Your Proof',
            desc: 'Review your digital preview within 1-2 business days.',
        },
        {
            num: '04',
            title: 'Receive & Cherish',
            desc: 'Your custom piece ships securely within 5-7 days.',
        },
    ]

    return (
        <section className="py-20 lg:py-28 bg-cream-dark">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        Simple Process
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-espresso">
                        How It Works
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
                    {/* Connector Line DTA */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gold/30 z-0" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-cream border border-gold/40 flex items-center justify-center mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
                                <span className="font-display text-3xl text-gold">{step.num}</span>
                            </div>
                            <h3 className="font-serif text-2xl text-espresso mb-3">{step.title}</h3>
                            <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-[240px]">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
