export const metadata = {
    title: 'FAQ | Custom Wedding Co.',
    description: 'Frequently asked questions about our custom wedding products.',
}

export default function FAQPage() {
    return (
        <main className="flex flex-col w-full bg-cream min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto w-full">
                <h1 className="font-display text-4xl md:text-5xl text-espresso mb-8 text-center">Frequently Asked Questions</h1>
                <div className="font-sans text-espresso/80 text-lg leading-relaxed space-y-8 bg-white p-8 sm:p-12 border border-gold/20 shadow-xl">
                    <div>
                        <h3 className="font-serif text-2xl text-espresso font-bold mb-2">How long will my order take?</h3>
                        <p>After you approve your digital proof, standard production takes 5-7 business days. Shipping usually takes an additional 3-5 business days within the US.</p>
                    </div>
                    
                    <div>
                        <h3 className="font-serif text-2xl text-espresso font-bold mb-2">Can I see a proof before you print?</h3>
                        <p>Absolutely! We send a digital proof for all personalized orders within 24 hours of your purchase. We won't begin production until we have your final approval.</p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-espresso font-bold mb-2">Do you offer bulk discounts?</h3>
                        <p>Yes, we do. For items like wedding favors or bridesmaid gifts, bulk pricing is automatically applied at checkout for orders of 10 or more of the same item.</p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-espresso font-bold mb-2">What if I need to change my order?</h3>
                        <p>If you need to make changes, please contact us immediately. Once a proof is approved and the order goes into production, we are unable to make any further changes or accept cancellations.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
