import BridesmaidBoxConfigurator from '@/components/configurator/BridesmaidBoxConfigurator';
import { getProducts, getLowestDisplayPrice, getProductBySlug } from '@/lib/swell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Your Bridesmaid Box | Custom Wedding Co.',
  description: 'Design the perfect personalized bridesmaid box.',
};

export default async function BridesmaidBoxPage() {
  const [result, baseBox] = await Promise.all([
    getProducts({ category: 'bridesmaid-box' }),
    getProductBySlug('bridesmaid-box')
  ]);
  
  const swellProducts = result?.results || [];

  const catalogProducts = swellProducts.map((p: any) => {
    // Check if the product has "Names or initials" modifier
    const options = p.options || [];
    const nameOption = options.find((opt: any) => 
      opt.name?.toLowerCase().includes('name') || 
      opt.name?.toLowerCase().includes('initial')
    );

    return {
      id: p.id,
      name: p.name,
      price: getLowestDisplayPrice(p),
      image: p.images?.[0]?.file?.url || '', // Fallback to placeholder if not found can be handled in UI
      isCustomizable: !!nameOption,
      swellData: p
    };
  });

  return (
    <div className="w-full py-8 md:py-16">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl mb-4">Design Your Bridesmaid Box</h2>
        <p className="text-espresso-light/80 text-lg max-w-2xl mx-auto">
          Create a beautifully curated, personalized gift experience for your bridal party.
        </p>
      </div>
      <BridesmaidBoxConfigurator 
        catalogProducts={catalogProducts} 
        baseBoxProduct={baseBox}
      />
    </div>
  );
}
