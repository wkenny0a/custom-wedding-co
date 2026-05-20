import Link from 'next/link';

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Format slug into a readable title (e.g., "shipping-returns" -> "Shipping Returns")
    const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="min-h-[60vh] bg-cream flex flex-col items-center justify-center px-6 py-20 text-center">
            <span className="text-4xl mb-6">✨</span>
            <h1 className="font-display text-4xl md:text-5xl text-espresso mb-4">
                {title}
            </h1>
            <p className="font-sans text-espresso/70 max-w-md mx-auto mb-8">
                We're currently crafting this page. It will be available soon with all the details you need.
            </p>
            <Link 
                href="/"
                className="px-8 py-3 bg-espresso text-cream font-sans text-xs font-bold uppercase tracking-wider hover:bg-espresso-light transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
