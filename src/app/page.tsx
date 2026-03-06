import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollingBanner } from '@/components/home/ScrollingBanner'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProductSpotlights } from '@/components/home/FeaturedProductSpotlights'
import { HowItWorks } from '@/components/home/HowItWorks'
import { BrandStory } from '@/components/home/BrandStory'
import { Testimonials } from '@/components/home/Testimonials'
import { InstagramGrid } from '@/components/home/InstagramGrid'
import { Newsletter } from '@/components/home/Newsletter'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ScrollingBanner />
      <FeaturedProducts />
      <CategoryGrid />
      <FeaturedProductSpotlights />
      <HowItWorks />
      <BrandStory />
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
    </>
  )
}
