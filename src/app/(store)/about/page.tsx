import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Custom Wedding Co. | Personalized Wedding Details',
  description:
    'Learn how Custom Wedding Co. creates personalized wedding gifts, favors, barware, welcome boxes, and keepsakes with a premium proofing process.',
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-cream text-espresso">
      <section className="relative flex min-h-[620px] w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:min-h-[680px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero_about_us_v2_1775684972343.png"
            alt="Couple planning personalized wedding details"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-gold-pale">
            Custom Wedding Co.
          </p>
          <h1 className="font-display text-4xl leading-tight text-cream drop-shadow-lg sm:text-5xl md:text-7xl">
            Every love story is unique.
            <span className="mt-2 block font-serif italic text-gold-pale">
              Your wedding should be too.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl font-sans text-base leading-7 text-cream-dark sm:text-lg">
            How a personal search for meaningful wedding details became a mission to help every couple create pieces that feel thoughtful, useful, and unmistakably theirs.
          </p>
        </div>
      </section>

      <section className="w-full bg-cream px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-7">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">
              The Spark
            </p>
            <h2 className="font-serif text-4xl leading-tight text-espresso sm:text-5xl">
              It started with our own vows
            </h2>
            <div className="space-y-4 font-sans text-base leading-8 text-espresso/75 sm:text-lg">
              <p>
                When we began planning our own wedding, we kept running into the same problem: everything felt like a template.
              </p>
              <p>
                We wanted the details to feel personal, elevated, and connected to our actual story. When we could not find the pieces we were imagining, we started making them ourselves.
              </p>
              <p>
                That first decision became the heart of Custom Wedding Co.: personalized wedding details that look beautiful, feel useful, and turn into keepsakes after the day is over.
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-lg shadow-2xl sm:min-h-[520px]">
            <Image
              src="/images/about/struggle_about_us_v2_1775684987068.png"
              alt="Couple searching for meaningful wedding details"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-blush px-4 py-18 text-center sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-7">
          <h2 className="font-serif text-3xl italic leading-tight text-espresso sm:text-4xl">
            &ldquo;No two couples are exactly alike, so no two weddings should feel generic.&rdquo;
          </h2>
          <p className="mx-auto max-w-3xl font-sans text-base leading-8 text-espresso/75 sm:text-lg">
            We focus on the moments couples actually remember: bridesmaid proposals, guest welcomes, cocktail hour, reception tables, keepsake favors, and the gifts that make your people feel chosen.
          </p>
        </div>
      </section>

      <section className="w-full bg-cream px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[460px] overflow-hidden rounded-lg shadow-2xl sm:min-h-[600px]">
            <Image
              src="/images/about/warehouse_about_us_v3_1775685340668.png"
              alt="Custom Wedding Co. fulfillment studio"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="space-y-7">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">
              How We Work
            </p>
            <h2 className="font-serif text-4xl leading-tight text-espresso sm:text-5xl">
              From a dining room table to thousands of wedding moments
            </h2>
            <div className="space-y-4 font-sans text-base leading-8 text-espresso/75 sm:text-lg">
              <p>
                Today, we craft and fulfill personalized wedding orders for couples, bridal parties, planners, and event hosts who care about the small details.
              </p>
              <p>
                Many pieces include personalization, bulk-friendly options, and a digital proof before production so names, dates, monograms, artwork, and messages are reviewed with care.
              </p>
              <p>
                Through the growth, the promise stays the same: make each order feel personal enough for one couple and polished enough for the biggest day on their calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-espresso px-4 py-20 text-center sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-2xl space-y-8">
          <h2 className="font-display text-4xl leading-tight text-cream sm:text-5xl">
            Let us craft your story.
          </h2>
          <p className="font-sans text-base leading-7 text-cream/80 sm:text-lg">
            Start with a personalized wedding detail, a curated gift box, or a guest-experience piece your people will actually use and remember.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center bg-gold px-8 font-sans text-xs font-bold uppercase tracking-[0.16em] text-espresso transition-colors duration-500 hover:bg-gold-light"
            >
              Explore Collections
            </Link>
            <Link
              href="/reviews"
              className="inline-flex h-12 items-center justify-center border border-cream/50 px-8 font-sans text-xs font-bold uppercase tracking-[0.16em] text-cream transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
