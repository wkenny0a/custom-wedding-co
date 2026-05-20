export const metadata = {
    title: 'Shipping & Returns | Custom Wedding Co.',
    description: 'Learn about our shipping and return policies.',
}

export default function ShippingReturnsPage() {
    return (
        <main className="flex flex-col w-full bg-cream min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto w-full">
                <h1 className="font-display text-4xl md:text-5xl text-espresso mb-8 text-center">Shipping & Returns</h1>
                <div className="font-sans text-espresso/80 text-lg leading-relaxed space-y-8 bg-white p-8 sm:p-12 border border-gold/20 shadow-xl">
                    <section>
                        <h2 className="font-serif text-2xl text-espresso mb-4">Shipping Policy</h2>
                        <p>We know how important timing is for your big day! Our standard production time is 5-7 business days from the moment you approve your digital proof.</p>
                        <p className="mt-4"><strong>Domestic Shipping:</strong> Orders typically arrive within 3-5 business days after leaving our warehouse. Expedited shipping options are available at checkout.</p>
                        <p className="mt-4"><strong>Free Shipping:</strong> We offer free standard shipping on all domestic orders over $75.</p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-espresso mb-4">Return Policy</h2>
                        <p>Because our items are personalized and made to order just for you, we cannot accept returns or exchanges on customized products.</p>
                        <p className="mt-4">However, if your order arrives damaged, defective, or incorrect due to an error on our part, we will happily replace it at no cost to you. Please contact us within 7 days of delivery with a photo of the item, and we'll make it right.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
