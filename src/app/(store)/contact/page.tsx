export const metadata = {
    title: 'Contact Us | Custom Wedding Co.',
    description: 'Get in touch with Custom Wedding Co. for your bespoke wedding needs.',
}

export default function ContactPage() {
    return (
        <main className="flex flex-col w-full bg-cream min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto w-full">
                <h1 className="font-display text-4xl md:text-5xl text-espresso mb-8 text-center">Contact Us</h1>
                <div className="font-sans text-espresso/80 text-lg leading-relaxed space-y-6 bg-white p-8 sm:p-12 border border-gold/20 shadow-xl">
                    <p>We would love to hear from you! Whether you have a question about our products, need help with a custom design, or want to inquire about a bulk order, our team is here to assist.</p>
                    
                    <div className="mt-8">
                        <h2 className="font-serif text-2xl text-espresso mb-4">Get In Touch</h2>
                        <ul className="space-y-4">
                            <li><strong>Email:</strong> <a href="mailto:info@customweddingco.com" className="text-gold hover:underline">info@customweddingco.com</a></li>
                            <li><strong>Hours:</strong> Monday - Friday, 9am - 5pm EST</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-serif text-2xl text-espresso mb-4">Quick Answers</h2>
                        <p>Have a question? Check out our <a href="/faq" className="text-gold hover:underline">FAQ</a> or learn more about our <a href="/proofing-process" className="text-gold hover:underline">Proofing Process</a> and <a href="/shipping-returns" className="text-gold hover:underline">Shipping & Returns</a> policies.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
