export function AnnouncementBar() {
    return (
        <div className="bg-espresso text-cream text-[0.7rem] sm:text-xs font-sans font-medium tracking-wide flex items-center justify-center min-h-[40px] sm:min-h-[36px] px-3 sm:px-4 py-2 sticky top-0 z-50 max-w-full overflow-hidden">
            <p className="text-center w-full max-w-full leading-tight whitespace-normal break-words">
                <span className="sm:hidden">Free shipping $99+ · Use LOVEYOU for 15% off</span>
                <span className="hidden sm:inline">Free personalization on all orders + Free shipping over $99 | Use code LOVEYOU for 15% off</span>
            </p>
        </div>
    )
}
