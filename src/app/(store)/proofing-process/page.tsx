export const metadata = {
    title: 'Our Proofing Process | Custom Wedding Co.',
    description: 'Learn how we ensure your personalized items are perfect.',
}

export default function ProofingProcessPage() {
    return (
        <main className="flex flex-col w-full bg-cream min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto w-full">
                <h1 className="font-display text-4xl md:text-5xl text-espresso mb-8 text-center">Our Proofing Process</h1>
                <div className="font-sans text-espresso/80 text-lg leading-relaxed space-y-8 bg-white p-8 sm:p-12 border border-gold/20 shadow-xl">
                    <p className="text-xl font-medium text-espresso italic text-center mb-6">We want your order to be absolutely perfect.</p>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold flex-shrink-0">1</div>
                            <div>
                                <h3 className="font-serif text-xl text-espresso font-bold">Place Your Order</h3>
                                <p className="mt-2">Select your items, enter your personalization details, and submit your order. If you select a "Custom Design", you can upload your inspiration file directly on the product page.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold flex-shrink-0">2</div>
                            <div>
                                <h3 className="font-serif text-xl text-espresso font-bold">Receive Your Digital Proof</h3>
                                <p className="mt-2">Within 24 business hours, our design team will email you a digital mockup of your product. This allows you to see exactly how your personalization will look before we start production.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold flex-shrink-0">3</div>
                            <div>
                                <h3 className="font-serif text-xl text-espresso font-bold">Review & Approve</h3>
                                <p className="mt-2">Review your proof carefully for spelling, dates, and layout. You can request up to two rounds of revisions for free. Once you give us the green light, your order moves immediately into production!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
