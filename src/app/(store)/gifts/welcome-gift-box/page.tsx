import WelcomeBoxConfigurator from '@/components/welcome-box/WelcomeBoxConfigurator';
import { getProducts, getLowestDisplayPrice, getProductBySlug } from '@/lib/swell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Welcome Wedding Box | Bulk Event Favors | Custom Wedding Co.',
  description: 'Design personalized welcome boxes for your wedding guests. Choose a lid design, add names or initials, and fill with curated gifts. Volume discounts up to 50% off.',
};

export default async function WelcomeWeddingBoxPage() {
  const [result, baseBox] = await Promise.all([
    getProducts({ category: 'gift-box' }),
    getProductBySlug('welcome-wedding-box')
  ]);

  const swellProducts = result?.results || [];
  const catalogProducts = swellProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: getLowestDisplayPrice(p),
    image: p.images?.[0]?.file?.url || '',
    isCustomizable: (p.options || []).length > 0,
    swellData: p
  }));

  return (
    <div className="w-full py-6 md:py-10">
      <WelcomeBoxConfigurator
        catalogProducts={catalogProducts}
        baseBoxProduct={baseBox}
      />
    </div>
  );
}
