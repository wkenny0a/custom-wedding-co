export const metadata = {
    title: 'Terms of Service | Custom Wedding Co.',
    description: 'Terms of Service for Custom Wedding Co.',
}

export default function TermsPage() {
    return (
        <main className="flex flex-col w-full bg-cream min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto w-full">
                <h1 className="font-display text-4xl md:text-5xl text-espresso mb-8 text-center">Terms of Service</h1>
                <div className="font-sans text-espresso/80 text-lg leading-relaxed space-y-6 bg-white p-8 sm:p-12 border border-gold/20 shadow-xl">
                    <p>Welcome to Custom Wedding Co. By using our website and purchasing our products, you agree to the following terms.</p>
                    
                    <h2 className="font-serif text-2xl text-espresso mt-8 mb-4">Personalized Products</h2>
                    <p>Due to the custom nature of our products, all sales are final once the digital proof has been approved by the customer and production has begun.</p>

                    <h2 className="font-serif text-2xl text-espresso mt-8 mb-4">Intellectual Property</h2>
                    <p>All content on this website, including designs, text, graphics, logos, and images, is the property of Custom Wedding Co. and protected by intellectual property laws. Customers uploading custom designs warrant they have the right to use those designs.</p>

                    <h2 className="font-serif text-2xl text-espresso mt-8 mb-4">Limitation of Liability</h2>
                    <p>Custom Wedding Co. shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our products or website.</p>
                </div>
            </div>
        </main>
    );
}
