import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollingBanner } from '@/components/home/ScrollingBanner'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { ShopByMoment } from '@/components/home/ShopByMoment'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { ShopTheLook } from '@/components/home/ShopTheLook'
import { HowItWorks } from '@/components/home/HowItWorks'
import { BrandStory } from '@/components/home/BrandStory'
import { Testimonials } from '@/components/home/Testimonials'
import { BlogInspiration } from '@/components/home/BlogInspiration'
import { InstagramGrid } from '@/components/home/InstagramGrid'
import { HomeFAQ } from '@/components/home/HomeFAQ'
import { Newsletter } from '@/components/home/Newsletter'
import { getProducts } from '@/lib/swell'

export default async function Home() {
  // Fetch products in the "Homepage" category from Swell
  const homepageProducts = await getProducts({ category: 'homepage' })
  const products = (homepageProducts?.results || []).map((p: any) => ({
    _id: p.id,
    name: p.name,
    slug: { current: p.slug },
    price: p.price || 0,
    badge: undefined,
    category: p.categories?.[0] ? { title: p.categories[0].name } : undefined,
    rating: 4.9,
    reviewCount: Math.floor(Math.random() * 30) + 10,
    images: p.images || [],
  }))

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ScrollingBanner />
      <FeaturedProducts products={products} />
      <ShopByMoment />
      <CategoryGrid />
      <ShopTheLook />
      <HowItWorks />
      <BrandStory />
      <Testimonials />
      <BlogInspiration />
      <InstagramGrid />
      <HomeFAQ />
      <Newsletter />
    </>
  )
}
