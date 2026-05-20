export function ScrollingBanner() {
    return (
        <div className="bg-espresso text-gold py-4 overflow-hidden relative flex">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center">
                        <span className="font-display italic text-xl sm:text-2xl mx-6">Paper Goods</span>
                        <span className="mx-2">✦</span>
                        <span className="font-display italic text-xl sm:text-2xl mx-6">Décor & Signage</span>
                        <span className="mx-2">✦</span>
                        <span className="font-display italic text-xl sm:text-2xl mx-6">Keepsakes</span>
                        <span className="mx-2">✦</span>
                        <span className="font-display italic text-xl sm:text-2xl mx-6">Wearables</span>
                        <span className="mx-2">✦</span>
                        <span className="font-display italic text-xl sm:text-2xl mx-6">Day-Of Essentials</span>
                        <span className="mx-2">✦</span>
                        <span className="font-display italic text-xl sm:text-2xl mx-6">Sentimental Gifts</span>
                        <span className="mx-2">✦</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
