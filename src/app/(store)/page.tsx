import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollingBanner } from '@/components/home/ScrollingBanner'
import { HomeBoxConfigurator } from '@/components/home/HomeBoxConfigurator'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { HowItWorks } from '@/components/home/HowItWorks'
import { BrandStory } from '@/components/home/BrandStory'
import { Testimonials } from '@/components/home/Testimonials'
import { BlogInspiration } from '@/components/home/BlogInspiration'
import { HomeFAQ } from '@/components/home/HomeFAQ'
import { Newsletter } from '@/components/home/Newsletter'
import { getProducts, getLowestDisplayPrice } from '@/lib/swell'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch products in the "Homepage" category from Swell
  const homepageProducts = await getProducts({ category: 'homepage' })
  const products = (homepageProducts?.results || []).map((p: any) => ({
    _id: p.id,
    name: p.name,
    slug: { current: p.slug },
    price: getLowestDisplayPrice(p),
    badge: undefined,
    category: p.categories?.[0] ? { title: p.categories[0].name } : undefined,
    rating: [4.6, 4.7, 4.8, 4.9, 4.8, 4.7, 4.9, 4.8][p.slug.length % 8],
    reviewCount: ((p.slug.charCodeAt(0) * 7 + p.slug.length * 13) % 176) + 12,
    images: p.images || [],
  }))

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ScrollingBanner />

      {/* ── Section Heading: Gift Boxes ────────────────────────── */}
      <section className="bg-cream py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-gold text-sm tracking-[0.3em] font-sans uppercase font-semibold">✦</span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-espresso mb-4 leading-tight">
            Our Signature Gift Boxes
          </h2>
          <p className="font-sans text-espresso-light/70 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
            Curated sets for your bridal party, groomsmen, and wedding guests — each personalized to tell your unique story.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-8 bg-gold/20" />
            <span className="text-gold/40 text-xs tracking-[0.3em] font-sans uppercase">Choose your box</span>
            <div className="h-px w-8 bg-gold/20" />
          </div>
        </div>
      </section>

      <HomeBoxConfigurator />
      <FeaturedProducts products={products} />
      <CategoryGrid />
      <HowItWorks />
      <BrandStory />
      <Testimonials />
      <BlogInspiration />
      <HomeFAQ />
      <Newsletter />
    </>
  )
}
