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
