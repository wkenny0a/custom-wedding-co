import BridesmaidBoxConfigurator from '@/components/configurator/BridesmaidBoxConfigurator';
import { getProducts, getLowestDisplayPrice, getProductBySlug } from '@/lib/swell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Your Bridesmaid Box | The Box That Makes Her Cry Happy Tears | Custom Wedding Co.',
  description: 'Design the perfect personalized bridesmaid gift box in 3 steps. Choose your box color, add a heartfelt inner lid message, and curate luxury items. Free personalization · Ships in 5–7 days.',
};

export default async function BridesmaidBoxPage() {
  const [result, baseBox] = await Promise.all([
    getProducts({ category: 'bridesmaid-box' }),
    getProductBySlug('bridesmaid-box')
  ]);
  
  const swellProducts = result?.results || [];

  const catalogProducts = swellProducts.map((p: any) => {
    const options = p.options || [];

    return {
      id: p.id,
      name: p.name,
      price: getLowestDisplayPrice(p),
      image: p.images?.[0]?.file?.url || '', // Fallback to placeholder if not found can be handled in UI
      isCustomizable: options.length > 0,
      swellData: p
    };
  });

  return (
    <div className="w-full py-6 md:py-10">
      <BridesmaidBoxConfigurator 
        catalogProducts={catalogProducts} 
        baseBoxProduct={baseBox}
      />
    </div>
  );
}
