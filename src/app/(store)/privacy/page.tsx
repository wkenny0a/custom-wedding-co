export const metadata = {
    title: 'Privacy Policy | Custom Wedding Co.',
    description: 'Privacy Policy for Custom Wedding Co.',
}

export default function PrivacyPage() {
    return (
        <main className="flex flex-col w-full bg-cream min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto w-full">
                <h1 className="font-display text-4xl md:text-5xl text-espresso mb-8 text-center">Privacy Policy</h1>
                <div className="font-sans text-espresso/80 text-lg leading-relaxed space-y-6 bg-white p-8 sm:p-12 border border-gold/20 shadow-xl">
                    <p>At Custom Wedding Co., we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
                    
                    <h2 className="font-serif text-2xl text-espresso mt-8 mb-4">Information We Collect</h2>
                    <p>We collect information you provide directly to us when you create an account, place an order, or contact customer support. This may include your name, email address, shipping address, and payment information.</p>

                    <h2 className="font-serif text-2xl text-espresso mt-8 mb-4">How We Use Your Information</h2>
                    <p>We use the information we collect to fulfill your orders, communicate with you about your purchase, and send you digital proofs of your personalized items.</p>

                    <h2 className="font-serif text-2xl text-espresso mt-8 mb-4">Data Security</h2>
                    <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or access your personal information.</p>
                </div>
            </div>
        </main>
    );
}
