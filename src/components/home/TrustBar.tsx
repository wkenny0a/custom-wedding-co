import { CheckCircle, Star, Gift, Truck, FileCheck } from 'lucide-react'

export function TrustBar() {
    const trusts = [
        {
            icon: <CheckCircle className="text-gold w-6 h-6" strokeWidth={1.5} />,
            label: '100% Custom',
            sublabel: 'Every piece made just for you',
        },
        {
            icon: <Star className="text-gold w-6 h-6" strokeWidth={1.5} />,
            label: '4.9/5 Stars',
            sublabel: '10,000+ happy couples',
        },
        {
            icon: <Gift className="text-gold w-6 h-6" strokeWidth={1.5} />,
            label: 'Free Personalization',
            sublabel: 'On every single order',
        },
        {
            icon: <Truck className="text-gold w-6 h-6" strokeWidth={1.5} />,
            label: 'Free Shipping',
            sublabel: 'On orders over $75',
        },
        {
            icon: <FileCheck className="text-gold w-6 h-6" strokeWidth={1.5} />,
            label: 'Proof Before Print',
            sublabel: 'Approve before we produce',
        },
    ]

    return (
        <section className="bg-cream py-10 lg:py-14 border-b border-gold/10">
            <div className="max-w-[1280px] mx-auto px-6 overflow-x-auto no-scrollbar">
                <div className="flex flex-nowrap lg:grid lg:grid-cols-5 gap-8 min-w-max lg:min-w-0">
                    {trusts.map((t, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center gap-3 px-4 flex-shrink-0 w-48 lg:w-auto">
                            {t.icon}
                            <div>
                                <h4 className="font-sans font-bold text-espresso text-sm uppercase tracking-wide mb-1 flex items-center justify-center gap-1">
                                    {t.label}
                                </h4>
                                <p className="font-serif italic text-gray-500 text-sm">
                                    {t.sublabel}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
