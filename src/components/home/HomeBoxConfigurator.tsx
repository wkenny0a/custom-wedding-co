import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HomeBoxConfigurator() {
  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row w-full h-[600px] lg:h-[700px]">
        
        {/* Left Side: Bridesmaid Box */}
        <Link 
          href="/gifts/bridesmaid-box"
          className="flex-1 relative group overflow-hidden h-1/2 lg:h-full block cursor-pointer"
        >
          {/* Background Image Panel */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://cdn.swell.store/customweddingco/69ecc27fef6ed90012760a26/3971a5504e31bafda2f79407f8183cd9/bridesmaid_box_lifestyle.png"
              alt="Design Your Bridesmaid Box"
              fill
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            />
            {/* Cinematic Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
          </div>

          {/* Typography Content Layer */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 lg:p-16">
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              The Bridesmaid Box
            </h3>
            <p className="text-white/80 font-sans text-sm md:text-base max-w-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out mb-8">
              Curate the ultimate gifting experience. Choose custom colors, foiled text, and premium silk goods.
            </p>
            
            {/* Elegant Call To Action Button */}
            <div className="overflow-hidden">
               <div className="flex items-center gap-3 text-white font-sans font-semibold uppercase tracking-widest text-xs translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 ease-out">
                 Start Personalizing <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
               </div>
            </div>
            
            {/* Passive Mobile-Friendly Indicator if not hovering */}
            <div className="absolute bottom-8 lg:bottom-16 flex items-center gap-2 text-white/60 font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs xl:hidden group-hover:opacity-0 transition-opacity duration-300">
               Tap to Configure
            </div>
          </div>
        </Link>


        {/* Right Side: Groom Box */}
        <Link 
          href="/gifts/groom-box"
          className="flex-1 relative group overflow-hidden h-1/2 lg:h-full block cursor-pointer"
        >
          {/* Background Image Panel */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://cdn.swell.store/customweddingco/69ecc280ef6ed90012760a49/be6b87d359d9e0f14530ffa101940731/groom_box_lifestyle.png"
              alt="Design Your Groom Box"
              fill
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            />
            {/* Cinematic Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
          </div>

          {/* Typography Content Layer */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 lg:p-16">
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              The Groomsman Box
            </h3>
            <p className="text-white/80 font-sans text-sm md:text-base max-w-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out mb-8">
              Forge an unforgettable statement piece. Assemble premium matte boxes with masculine finishings.
            </p>
            
            {/* Elegant Call To Action Button */}
            <div className="overflow-hidden">
               <div className="flex items-center gap-3 text-white font-sans font-semibold uppercase tracking-widest text-xs translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 ease-out">
                 Start Personalizing <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
               </div>
            </div>

            {/* Passive Mobile-Friendly Indicator if not hovering */}
            <div className="absolute bottom-8 lg:bottom-16 flex items-center gap-2 text-white/60 font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs xl:hidden group-hover:opacity-0 transition-opacity duration-300">
               Tap to Configure
            </div>
          </div>
        </Link>
        
      </div>
    </section>
  );
}
