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

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ScrollingBanner />
      <FeaturedProducts />
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
