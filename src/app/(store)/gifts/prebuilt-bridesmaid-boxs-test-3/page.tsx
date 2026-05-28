import { Metadata } from 'next';
import { getProducts, getLowestDisplayPrice } from '@/lib/swell';
import PrebuiltBridesmaidBoxConfigurator from '@/components/configurator/PrebuiltBridesmaidBoxConfigurator';

type SwellProduct = {
  id: string;
  name: string;
  slug: string;
  price?: number;
  options?: unknown[];
  images?: {
    file?: {
      url?: string;
    };
    url?: string;
  }[];
}

export const metadata: Metadata = {
  title: 'Build Your Custom Prebuilt Bridesmaid Box | Personalize Every Detail | Custom Wedding Co.',
  description: 'Select our premium pre-built bridesmaid proposal box. Customize the outside name, print a heartfelt message inside the lid, and choose between our Classic and Deluxe VIP keepsake tiers. Heavily discounted bundle price, ships gift-ready in 5–7 days.',
};

export const dynamic = 'force-dynamic';

export default async function PrebuiltBridesmaidBoxPage() {
  // 1. Fetch all products from Swell to search by slug
  const productResponse = await getProducts();
  const allProducts = (productResponse?.results || []) as SwellProduct[];

  // Slugs for the required items
  const baseBoxSlug = 'bridesmaid-box';
  
  // Classic Tier Stuffers
  const compactMirrorSlug = 'personalized-compact-mirror-custom-heirloom-bridal-gift';
  const hairbrushSlug = 'the-heirloom-botanical-hairbrush';
  const jewelryCaseSlug = 'bespoke-velvet-heirloom-jewelry-case';
  const sleepCollectionSlug = 'bespoke-satin-sleep-collection';

  // Deluxe Tier Additional Stuffers
  const pearlBraceletSlug = 'dainty-pearl-bracelet-bridal';
  const soyCandleSlug = 'artisan-soy-candle-bridal';

  // 2. Fetch Base Box Product
  const baseBoxProduct = allProducts.find((product) => product.slug === baseBoxSlug) || null;

  // 3. Hydrate Stuffer Products
  const stufferSlugs = [
    compactMirrorSlug,
    hairbrushSlug,
    jewelryCaseSlug,
    sleepCollectionSlug,
    pearlBraceletSlug,
    soyCandleSlug
  ];

  const hydratedStuffers = stufferSlugs.map(slug => {
    const match = allProducts.find((product) => product.slug === slug);
    if (!match) return null;

    return {
      id: match.id,
      name: match.name,
      slug: match.slug,
      price: getLowestDisplayPrice(match),
      image: match.images?.[0]?.file?.url || match.images?.[0]?.url || '',
      isCustomizable: match.options && match.options.length > 0,
      swellData: match
    };
  }).filter((stuffer): stuffer is NonNullable<typeof stuffer> => Boolean(stuffer));

  return (
    <div className="w-full py-6 md:py-10 bg-cream">
      <PrebuiltBridesmaidBoxConfigurator 
        baseBoxProduct={baseBoxProduct}
        prebuiltStuffers={hydratedStuffers}
      />
    </div>
  );
}
