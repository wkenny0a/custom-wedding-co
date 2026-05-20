import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full bg-cream min-h-screen">
      
      {/* Hero Section: The Spark */}
      <section className="relative w-full h-[70vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero_about_us_v2_1775684972343.png"
            alt="Couple crafting bespoke wedding details"
            fill
            className="object-cover"
            priority
          />
          {/* Neutral dark overlay for readability as per brand guidelines */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="font-display text-5xl md:text-7xl text-cream tracking-wide drop-shadow-lg">
            Every Love Story is Unique.
            <br />
            <span className="italic text-gold-pale">Your Wedding Should Be Too.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-cream-dark max-w-2xl mx-auto font-light tracking-wide">
            How a personal search for something meaningful became a mission to celebrate every couple&apos;s unique bond.
          </p>
        </div>
      </section>

      {/* Part I: The Struggle & The Solution */}
      <section className="w-full py-28 px-4 md:px-8 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-espresso">
              It Started With Our Own Vows
            </h2>
            <div className="space-y-4 font-sans text-espresso/80 text-lg leading-relaxed font-light">
              <p>
                When we began planning our own wedding, we hit a wall. Everything felt like a cookie-cutter template.
              </p>
              <p>
                We wanted our special day to be deeply personal and meaningful—to tell our actual story. But flipping through endless catalogs of generic designs left us feeling uninspired. 
              </p>
              <p>
                When we couldn&apos;t find the unique, bespoke details we were dreaming of, we decided to create them ourselves. That single decision sparked everything.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about/struggle_about_us_v2_1775684987068.png"
              alt="Couple searching through generic wedding catalogs"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Part II: The Mission */}
      <section className="w-full py-24 px-4 bg-blush text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl text-espresso italic">
            "We believe no two couples are exactly alike, so no two weddings should look the same."
          </h2>
          <p className="font-sans text-lg text-espresso/80 leading-relaxed font-light max-w-3xl mx-auto">
            Custom Wedding Co. was born from a simple realization: if we were searching for truly personalized, high-quality wedding details, other couples were too. Our mission became clear—we wanted to ensure every couple&apos;s special day was authentically, uniquely theirs.
          </p>
        </div>
      </section>

      {/* Part III: The Journey (Growth & Scale) */}
      <section className="w-full py-28 px-4 md:px-8 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative h-[600px] rounded-xl overflow-hidden shadow-2xl group">
             <Image
              src="/images/about/warehouse_about_us_v3_1775685340668.png"
              alt="Custom Wedding Co warehouse and artisans"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-espresso">
              From a Dining Room Table to Thousands of "I Dos"
            </h2>
            <div className="space-y-4 font-sans text-espresso/80 text-lg leading-relaxed font-light">
              <p>
                What started as a labor of love for our own wedding has blossomed into something beyond our wildest dreams.
              </p>
              <p>
                Today, we operate out of a bustling warehouse, carefully crafting and fulfilling thousands of bespoke orders every year for couples across the globe. We have a dedicated team of artisans who treat every single order with the utmost care.
              </p>
              <p>
                Yet, through all the growth, our core promise remains the exact same as day one: pouring love into every detail so that your special day is truly unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-24 px-4 bg-espresso text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <h2 className="font-display text-4xl md:text-5xl text-cream">
            Let’s Craft Your Story.
          </h2>
          <p className="font-sans text-cream/80 text-lg mb-8 font-light">
            Ready to make your Pinterest board a reality? Start designing your perfect day with our artisan collections.
          </p>
          <Link 
            href="https://custom-wedding-co.vercel.app/shop" 
            className="inline-block px-10 py-4 bg-gold text-espresso font-sans uppercase tracking-widest text-sm hover:bg-gold-light transition-colors duration-500 rounded-sm"
          >
            Explore Our Collections
          </Link>
        </div>
      </section>

    </main>
  );
}
