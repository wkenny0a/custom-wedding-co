import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Curated Gift Boxes | Bridesmaid, Groomsman & Welcome Boxes | Custom Wedding Co.',
  description:
    'Discover our luxury personalized gift boxes — from bridesmaid proposals to groomsman gifts and guest welcome boxes. Beautifully packaged, fully customizable, hassle-free.',
};

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const BOXES = [
  {
    id: 'bridesmaid',
    title: 'The Bridesmaid Box',
    subtitle: 'The Box That Makes Her Cry Happy Tears',
    description:
      'Propose to your girls with a luxury box they\'ll never forget. Choose your box color, write a heartfelt inner-lid message, and fill it with hand-picked items — satin pajamas, acrylic tumblers, diamond name necklaces, compact mirrors, and more. Every piece is personalized with her name, making it the ultimate keepsake.',
    image: '/images/gift-boxes/bridesmaid-box.png',
    href: '/gifts/prebuilt-bridesmaid-boxs-test',
    cta: 'Shop Bridesmaid Boxes',
    items: [
      'Personalized Satin Pajama Set',
      'Diamond Pavé Name Necklace',
      'Engraved Compact Mirror',
      'Custom Acrylic Tumbler',
      'Heirloom Corduroy Cosmetic Pouch',
      'Embroidered Canvas Tote',
      'Engraved Champagne Flute',
    ],
    accent: 'blush',
  },
  {
    id: 'groom',
    title: 'The Groom Box',
    subtitle: 'Built for the Boys. Refined for the Moment.',
    description:
      'Ask your best men to stand beside you with a box that matches the occasion. Dark espresso wood, gold foil calligraphy, and curated masculine gifts — leather hip flasks, whiskey decanters, personalized golf balls, and laser-engraved shot glasses. Every piece says "this guy matters."',
    image: '/images/gift-boxes/groom-box.png',
    href: '/gifts/groom-box',
    cta: 'Design Your Groom Box',
    items: [
      'Leather-Wrapped Hip Flask',
      'Heirloom Whiskey Glass & Decanter',
      'Custom Personalized Golf Balls',
      'Laser-Engraved Shot Glasses',
      '"Beers & Birdies" Can Cooler',
      'Engraved Stemless Wine Glass',
    ],
    accent: 'espresso',
  },
  {
    id: 'welcome',
    title: 'The Welcome Gift Box',
    subtitle: 'First Impressions That Last a Lifetime',
    description:
      'Set the tone from the moment your guests arrive. Our welcome boxes are delivered to their hotel room or venue seat — filled with curated treats, custom candles, organic towels, and a personalized itinerary card. Available in bulk with volume discounts up to 50% off.',
    image: '/images/gift-boxes/welcome-box.png',
    href: '/gifts/welcome-gift-box',
    cta: 'Design Your Welcome Box',
    items: [
      'Custom Scented Candle',
      'Organic Turkish Cotton Towel',
      'Personalized Itinerary Card',
      'Handmade Wax Seal Stickers',
      'Artisan Snacks & Treats',
      'Monogram Cocktail Napkins',
    ],
    accent: 'gold',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Choose Your Box',
    description: 'Select your box type, color, and inner-lid personalization.',
  },
  {
    number: '02',
    title: 'Curate the Inside',
    description: 'Pick from our catalog of luxury items. Personalize each piece with names, dates, or initials.',
  },
  {
    number: '03',
    title: 'We Package & Ship',
    description: 'We hand-wrap every item in tissue paper, seal it with a wax stamp, and ship it in premium protective packaging.',
  },
];

const PROMISES = [
  {
    icon: '✦',
    title: 'Fully Personalized',
    description: 'Every item inside is customized with names, initials, or dates — no generic gifts.',
  },
  {
    icon: '◈',
    title: 'Hand-Wrapped with Care',
    description: 'Tissue paper, wax seals, satin ribbons — unboxing is half the experience.',
  },
  {
    icon: '❖',
    title: 'Hassle-Free Gifting',
    description: 'You curate online, we handle the rest. Ships directly to your bridesmaids, groomsmen, or venue.',
  },
  {
    icon: '✧',
    title: 'Volume Discounts',
    description: 'Ordering for the full bridal party? Unlock up to 50% off with our tiered pricing.',
  },
];

/* ─── Page Component ────────────────────────────────────────────────────────── */

export default function GiftBoxesPage() {
  return (
    <div className="bg-cream">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gift-boxes/hero.png"
            alt="Three luxury personalized wedding gift boxes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 md:py-48 lg:py-56">
          <p className="text-gold-light font-serif tracking-[0.35em] uppercase text-sm mb-4 animate-fade-in">
            Curated · Personalized · Unforgettable
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl">
            Gift Boxes Designed <br className="hidden md:block" />
            <span className="italic">for Your People</span>
          </h1>
          <p className="mt-6 text-cream/80 text-base md:text-lg max-w-xl leading-relaxed">
            Luxury bridesmaid, groomsman, and welcome boxes — each one hand-wrapped and personalized to make every moment feel extraordinary.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="#boxes"
              className="px-8 py-3.5 bg-gold text-white font-sans text-sm tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all duration-500"
            >
              Explore Our Boxes
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-3.5 border border-white/40 text-white font-sans text-sm tracking-widest uppercase rounded-sm hover:bg-white/10 transition-all duration-500"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND PROMISES ────────────────────────────────────────────── */}
      <section className="bg-espresso py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {PROMISES.map((p) => (
            <div key={p.title} className="text-center">
              <span className="text-gold text-3xl block mb-3">{p.icon}</span>
              <h3 className="font-serif text-lg text-cream mb-2">{p.title}</h3>
              <p className="text-cream/60 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GIFT BOX SHOWCASES ────────────────────────────────────────── */}
      <section id="boxes" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-gold font-serif tracking-[0.3em] uppercase text-sm mb-3">Our Collections</p>
            <h2 className="font-display text-3xl md:text-5xl text-espresso">
              Three Boxes. Infinite Personalization.
            </h2>
          </div>

          <div className="space-y-28 md:space-y-36">
            {BOXES.map((box, idx) => (
              <div
                key={box.id}
                className={`flex flex-col gap-10 md:gap-16 items-center ${
                  idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="aspect-[3/4] relative rounded-sm overflow-hidden shadow-2xl">
                    <Image
                      src={box.image}
                      alt={box.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Decorative corner accent */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/30 rounded-br-sm hidden lg:block" />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <p className="text-gold font-serif tracking-[0.25em] uppercase text-xs">{box.subtitle}</p>
                  <h3 className="font-display text-3xl md:text-4xl text-espresso">{box.title}</h3>
                  <p className="text-espresso/70 leading-relaxed text-[15px]">{box.description}</p>

                  {/* Items list */}
                  <div className="pt-4">
                    <p className="font-serif text-sm text-gold uppercase tracking-widest mb-3">What&apos;s Inside</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {box.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-espresso/70">
                          <span className="text-gold mt-0.5 text-xs">✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={box.href}
                    className="inline-block mt-4 px-8 py-3.5 bg-espresso text-cream font-sans text-sm tracking-widest uppercase rounded-sm hover:bg-espresso-light transition-all duration-500"
                  >
                    {box.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-cream-dark py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold font-serif tracking-[0.3em] uppercase text-sm mb-3">Hassle-Free Gifting</p>
            <h2 className="font-display text-3xl md:text-5xl text-espresso">
              How It Works
            </h2>
            <p className="mt-4 text-espresso/60 max-w-lg mx-auto text-[15px]">
              Three simple steps to the most beautiful gift they&apos;ve ever received.
            </p>
          </div>

          {/* Steps Image */}
          <div className="relative aspect-[16/7] rounded-sm overflow-hidden shadow-xl mb-16">
            <Image
              src="/images/gift-boxes/how-it-works.png"
              alt="Three steps to building your custom gift box"
              fill
              className="object-cover"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="text-center md:text-left">
                <span className="font-display text-5xl text-gold/30 block mb-2">{step.number}</span>
                <h3 className="font-serif text-xl text-espresso mb-2">{step.title}</h3>
                <p className="text-espresso/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGING DETAIL ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
            {/* Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[16/10] relative rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/images/gift-boxes/packaging-detail.png"
                  alt="Hand-wrapped gift packaging with wax seals"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="text-gold font-serif tracking-[0.3em] uppercase text-xs">The Unboxing Experience</p>
              <h2 className="font-display text-3xl md:text-4xl text-espresso leading-tight">
                Packaging Is <span className="italic">Half</span> the Gift
              </h2>
              <p className="text-espresso/70 leading-relaxed text-[15px]">
                We believe the moment someone lifts that lid should feel like an event in itself. Every single item inside your box is individually hand-wrapped in premium tissue paper and sealed with our signature gold wax stamp.
              </p>
              <p className="text-espresso/70 leading-relaxed text-[15px]">
                Satin ribbons, protective inserts, and a handwritten-style message card complete the experience. When your bridesmaid, groomsman, or guest opens this box — they won&apos;t just see a gift. They&apos;ll feel how much thought you put into it.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="border border-gold/20 rounded-sm p-4 text-center">
                  <span className="text-gold text-2xl block mb-1">✦</span>
                  <p className="font-serif text-sm text-espresso">Gold Wax Seals</p>
                </div>
                <div className="border border-gold/20 rounded-sm p-4 text-center">
                  <span className="text-gold text-2xl block mb-1">◈</span>
                  <p className="font-serif text-sm text-espresso">Satin Ribbons</p>
                </div>
                <div className="border border-gold/20 rounded-sm p-4 text-center">
                  <span className="text-gold text-2xl block mb-1">❖</span>
                  <p className="font-serif text-sm text-espresso">Tissue Paper Wrap</p>
                </div>
                <div className="border border-gold/20 rounded-sm p-4 text-center">
                  <span className="text-gold text-2xl block mb-1">✧</span>
                  <p className="font-serif text-sm text-espresso">Personal Message</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="bg-espresso py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold font-serif tracking-[0.35em] uppercase text-sm mb-4">Ready to Start?</p>
          <h2 className="font-display text-3xl md:text-5xl text-cream leading-tight mb-6">
            Create Something They&apos;ll <br className="hidden md:block" />
            <span className="italic">Never Forget</span>
          </h2>
          <p className="text-cream/60 text-[15px] leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you&apos;re proposing to your bridesmaids, thanking your groomsmen, or welcoming 200 guests — we&apos;ll make sure every box feels like it was made with love. Because it is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gifts/prebuilt-bridesmaid-boxs-test"
              className="px-8 py-3.5 bg-gold text-white font-sans text-sm tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all duration-500"
            >
              Bridesmaid Box
            </Link>
            <Link
              href="/gifts/groom-box"
              className="px-8 py-3.5 border border-gold/40 text-cream font-sans text-sm tracking-widest uppercase rounded-sm hover:bg-gold/10 transition-all duration-500"
            >
              Groom Box
            </Link>
            <Link
              href="/gifts/welcome-gift-box"
              className="px-8 py-3.5 border border-cream/20 text-cream font-sans text-sm tracking-widest uppercase rounded-sm hover:bg-cream/10 transition-all duration-500"
            >
              Welcome Box
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
