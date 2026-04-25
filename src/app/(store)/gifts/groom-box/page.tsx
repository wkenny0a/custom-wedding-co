import BridesmaidBoxConfigurator from '@/components/configurator/BridesmaidBoxConfigurator';
import { getProducts, getLowestDisplayPrice, getProductBySlug } from '@/lib/swell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Your Groom Box | Custom Wedding Co.',
  description: 'Design the perfect personalized groom box.',
};

export default async function GroomBoxPage() {
  const [result, baseBox] = await Promise.all([
    getProducts({ category: 'groom-box' }),
    getProductBySlug('groom-box')
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
        theme="groomsman"
        catalogProducts={catalogProducts} 
        baseBoxProduct={baseBox}
        title="Design Your Groom Box"
        presetMessage="Will you be my groomsman, Brady?"
        emptyCategoryText="No products found in the groom-box category."
      />
    </div>
  );
}
