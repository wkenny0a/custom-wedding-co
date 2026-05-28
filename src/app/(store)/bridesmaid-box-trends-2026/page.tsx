import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { getLowestDisplayPrice, getProducts } from '@/lib/swell';

export const metadata: Metadata = {
  title: '2026 Bridesmaid Box Trends | Build a Custom Bridesmaid Gift Box | Custom Wedding Co.',
  description:
    'Shop 2026 bridesmaid box trends and build a personalized gift box with keepsakes, self-care gifts, getting-ready essentials, and custom bridal party details.',
};

export const dynamic = 'force-dynamic';

const builderHref = '/gifts/bridesmaid-box';

const adAngles = [
  {
    title: 'Top Bridesmaid Box Trends of 2026',
    hook: 'A curated box that feels personal, useful, and made for the people standing beside you.',
    visual: 'Flat lay of a finished bridesmaid box with ribbon, inner lid message, and 3 to 4 gift items.',
    headline: 'Top Bridesmaid Box Trends',
    description: 'Build a personalized bridesmaid box with gifts they will actually use.',
  },
  {
    title: 'The Happy-Tears Proposal Box',
    hook: 'Lead with the emotional reveal: her name, your message, and a box that makes the ask feel unforgettable.',
    visual: 'Open bridesmaid box with a custom inner lid message and soft neutral packaging.',
    headline: 'Ask Her in a Better Way',
    description: 'Personalized boxes for bridesmaid proposals, maid of honor asks, and bridal party gifting.',
  },
  {
    title: 'Bachelorette Weekend Survival Kit',
    hook: 'Turn practical minis into a polished weekend box for travel, recovery, and photos.',
    visual: 'Compact mirror, face mist, lip balm, sleep mask, and emergency kit styled for a weekend bag.',
    headline: 'Bachelorette Weekend Ready',
    description: 'Create a bridesmaid box with beauty, self-care, and travel-ready essentials.',
  },
  {
    title: 'Getting-Ready Suite Gifts',
    hook: 'Give her the details that make the morning feel coordinated: robes, pajamas, flutes, and small keepsakes.',
    visual: 'Getting-ready suite with robes, champagne flutes, satin textures, and a gift box.',
    headline: 'The Getting-Ready Edit',
    description: 'Shop bridesmaid box ideas made for photos, toasts, and wedding morning moments.',
  },
  {
    title: 'Destination Bride Boxes',
    hook: 'For beach weekends, vineyard trips, and resort weddings, build boxes around travel-friendly gifts.',
    visual: 'Canvas tote, Turkish towel, tumbler, sunglasses, and a soft destination palette.',
    headline: 'Destination Wedding Gifts',
    description: 'Build a box for travel, bachelorette weekends, and warm-weather wedding plans.',
  },
  {
    title: 'Keepsakes They Use After the Wedding',
    hook: 'The strongest gifts do not disappear after the wedding. They live on a vanity, nightstand, or desk.',
    visual: 'Jewelry case, ring dish, candle, and pearl bracelet styled at home.',
    headline: 'Keepsakes They Will Use',
    description: 'Personalized bridal party gifts that feel meaningful beyond the wedding day.',
  },
  {
    title: 'Personalized Everything',
    hook: 'Names, initials, roles, and message details make the box feel made for her instead of pulled from a shelf.',
    visual: 'Close-up of personalized pouch, tumbler, box lid, and name details.',
    headline: 'Make Every Box Personal',
    description: 'Add names, custom messages, and personalized gift details in one easy builder.',
  },
  {
    title: 'Build Each Box Around Her',
    hook: 'Choose the box color, write the message, and fill it with gifts that match her style.',
    visual: 'Three different bridesmaid boxes, each styled for a different personality.',
    headline: 'Build Her Box in Minutes',
    description: 'Choose the box, personalize the message, add gifts, and checkout.',
  },
];

const productGroups = [
  {
    eyebrow: 'Proposal Moment',
    title: 'Make the ask feel personal',
    copy: 'Start with a custom bridesmaid box, then add the pieces that turn the ask into a keepsake moment.',
    productSlugs: ['bridesmaid-box', 'rose-gold-compact-mirror-bridal', 'luxury-botanical-lip-balm-trio'],
  },
  {
    eyebrow: 'Getting Ready',
    title: 'Create the wedding morning edit',
    copy: 'These are the gifts that make the suite feel coordinated in photos and useful after the toast.',
    productSlugs: ['bespoke-satin-lace-bridal-robe', 'bespoke-satin-bridesmaid-pajama-set', 'bespoke-engraved-champagne-flute'],
  },
  {
    eyebrow: 'Self-Care',
    title: 'Add the soft extras bridesmaids keep',
    copy: 'Small luxuries are easy to add, easy to gift, and strong for a polished unboxing experience.',
    productSlugs: ['artisan-soy-candle-bridal', 'luxe-satin-sleep-mask', 'rosewater-face-mist-bridal'],
  },
  {
    eyebrow: 'Destination',
    title: 'Build for the bachelorette weekend',
    copy: 'For beach trips, travel weekends, and warm-weather wedding plans, anchor the box with practical gifts.',
    productSlugs: ['bespoke-embroidered-heirloom-canvas-tote', 'personalized-organic-turkish-cotton-towel', 'bespoke-16oz-acrylic-tumbler'],
  },
  {
    eyebrow: 'Keepsakes',
    title: 'Choose gifts that last past the wedding',
    copy: 'These pieces live on a nightstand, vanity, or dresser long after the bridal party photos are done.',
    productSlugs: ['the-heirloom-mini-velvet-jewelry-case', 'gold-rimmed-ceramic-jewelry-dish', 'dainty-pearl-bracelet-bridal'],
  },
];

const proofPoints = [
  'Choose your box color',
  'Add a custom inner lid message',
  'Personalize eligible gifts',
  'Build one box or a full bridal party set',
  'Volume savings for multiple boxes',
  'Ships gift-ready',
];

type SwellProduct = {
  id?: string;
  name?: string;
  slug?: string;
  price?: number;
  images?: Array<{ file?: { url?: string }; url?: string }>;
  options?: unknown[];
};

function cleanName(name?: string) {
  return (name || 'Custom bridesmaid gift').split('|')[0].trim();
}

function productImage(product?: SwellProduct | null) {
  return product?.images?.[0]?.file?.url || product?.images?.[0]?.url || '';
}

function priceLabel(product?: SwellProduct | null) {
  if (!product) return 'Build in box';
  const price = getLowestDisplayPrice(product);
  if (!price) return 'Build in box';
  return `From $${price.toFixed(price % 1 ? 2 : 0)}`;
}

function ProductMiniCard({
  product,
  fallbackName,
}: {
  product?: SwellProduct | null;
  fallbackName: string;
}) {
  const href = product?.slug ? `/products/${product.slug}` : builderHref;
  const imageUrl = productImage(product);

  return (
    <Link href={href} className="group block min-w-0">
      <div className="overflow-hidden rounded-lg border border-gold-pale/30 bg-white">
        <div className="relative aspect-[4/5] bg-cream-dark">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={cleanName(product?.name || fallbackName)}
              fill
              sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-xs uppercase tracking-[0.18em] text-espresso/40">
              Product thumbnail loads from catalog
            </div>
          )}
        </div>
        <div className="space-y-2 p-4">
          <p className="font-serif text-lg leading-tight text-espresso">{cleanName(product?.name || fallbackName)}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{priceLabel(product)}</p>
        </div>
      </div>
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
      <h2 className="font-serif text-3xl leading-tight text-espresso sm:text-4xl md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-espresso/70 sm:text-lg">{copy}</p>
    </div>
  );
}

export default async function BridesmaidBoxTrendsPage() {
  const builderProducts = await getProducts({ category: 'custom-brides-box' });
  const products = (builderProducts.results || []) as SwellProduct[];
  const productBySlug = new Map(products.filter((product) => product.slug).map((product) => [product.slug, product]));

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream text-espresso">
      <section className="border-b border-gold/15 bg-cream">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:py-20">
          <div className="flex min-w-0 w-full max-w-[calc(100vw-2rem)] flex-col justify-center sm:max-w-none">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">2026 Bridesmaid Box Trends</p>
            <h1 className="w-full max-w-[calc(100vw-2rem)] break-words font-serif text-3xl leading-[1.08] text-espresso sm:max-w-3xl sm:text-5xl lg:text-6xl">
              Bridesmaid boxes that make the ask feel personal.
            </h1>
            <p className="mt-5 w-full max-w-[calc(100vw-2rem)] break-words text-base leading-7 text-espresso/75 sm:max-w-2xl sm:text-lg">
              Turn the trend brides are saving into a custom gift box she can open, photograph, and actually use after the wedding.
            </p>
            <div className="mt-8 flex w-full max-w-[calc(100vw-2rem)] flex-col gap-3 sm:max-w-none sm:flex-row">
              <Button href={builderHref} size="lg" className="w-full sm:w-auto">
                Build My Bridesmaid Box
              </Button>
              <Button href="#shop-the-box" variant="outline" size="lg" className="w-full bg-cream/40 sm:w-auto">
                Shop Box Ideas
              </Button>
            </div>
            <div className="mt-8 grid w-full max-w-[calc(100vw-2rem)] grid-cols-1 gap-3 text-sm text-espresso/70 sm:max-w-none sm:grid-cols-3">
              <div className="border-l border-gold/40 pl-4">
                <strong className="block font-sans text-espresso">Free personalization</strong>
                Names and messages make every box feel made for her.
              </div>
              <div className="border-l border-gold/40 pl-4">
                <strong className="block font-sans text-espresso">Built in minutes</strong>
                Choose the box, write the message, add gifts, and checkout.
              </div>
              <div className="border-l border-gold/40 pl-4">
                <strong className="block font-sans text-espresso">Gift-ready arrival</strong>
                A polished unboxing moment without DIY assembly.
              </div>
            </div>
          </div>
          <div className="min-w-0 max-w-full">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-cream-dark shadow-xl">
              <Image
                src="/images/home/bridesmaid_box_lifestyle.png"
                alt="Personalized bridesmaid box styled for a wedding proposal"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/45 px-4 py-10 sm:px-6 lg:px-12">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point} className="rounded-lg border border-gold-pale/30 bg-cream/70 px-5 py-4 text-sm font-semibold text-espresso/80">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section id="shop-the-box" className="px-4 py-16 sm:px-6 md:py-20 lg:px-12">
        <SectionHeading
          eyebrow="Shop the ad"
          title="Turn each saved trend into a box she can open."
          copy="Use these 2026 carousel angles to warm the buyer up, then let the page show real products from the bridesmaid box catalog."
        />
        <div className="mx-auto mt-12 grid max-w-[1180px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {adAngles.map((angle, index) => (
            <article key={angle.title} className="rounded-lg border border-gold-pale/30 bg-white p-5 shadow-sm">
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 font-serif text-lg text-gold">
                {index + 1}
              </span>
              <h3 className="font-serif text-2xl leading-tight text-espresso">{angle.title}</h3>
              <p className="mt-3 text-sm leading-6 text-espresso/70">{angle.hook}</p>
              <div className="mt-5 border-t border-gold-pale/30 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Meta headline</p>
                <p className="mt-1 font-serif text-lg text-espresso">{angle.headline}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Description</p>
                <p className="mt-1 text-sm text-espresso/65">{angle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-espresso px-4 py-16 text-cream sm:px-6 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Campaign strategy</p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Do not sell a box first. Sell the moment she opens it.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              ['Hook', 'Use trend language to stop the scroll: 2026 bridesmaid boxes, bachelorette weekend boxes, getting-ready suite gifts.'],
              ['Bridge', 'Show the box as the easiest way to recreate the trend without shopping from ten different places.'],
              ['Proof', 'Lead with personalization, gift-ready packaging, volume savings, and real bride reactions.'],
              ['Conversion', 'Send every CTA to the builder and repeat the same promise: choose, personalize, fill, checkout.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-cream/15 bg-cream/5 p-5">
                <h3 className="font-serif text-2xl text-gold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/75">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-12">
        <SectionHeading
          eyebrow="What to put inside"
          title="Five box formulas that match the way brides shop."
          copy="Each formula gives paid traffic a clear path from inspiration to products, while the final action stays focused on building a box."
        />
        <div className="mx-auto mt-12 grid max-w-[1180px] grid-cols-1 gap-8">
          {productGroups.map((group) => (
            <article key={group.title} className="grid grid-cols-1 gap-6 border-b border-gold-pale/40 pb-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{group.eyebrow}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-espresso">{group.title}</h3>
                <p className="mt-3 text-sm leading-6 text-espresso/70">{group.copy}</p>
                <Button href={builderHref} variant="outline" className="mt-6 w-full bg-cream/30 sm:w-auto">
                  Build This Box
                </Button>
              </div>
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
                {group.productSlugs.map((slug) => (
                  <ProductMiniCard
                    key={slug}
                    product={productBySlug.get(slug)}
                    fallbackName={slug.replaceAll('-', ' ')}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white/50 px-4 py-16 sm:px-6 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-cream-dark lg:aspect-[5/4]">
            <Image
              src="/images/ugc/bridesmaid-review-1.jpeg"
              alt="Real bridesmaid box unboxing photo"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Why it converts</p>
            <h2 className="font-serif text-3xl leading-tight text-espresso sm:text-4xl md:text-5xl">
              A bridesmaid box solves the gift problem and the presentation problem.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-espresso/75">
              <p>
                Brides are not only buying products. They are buying the moment their bridal party feels chosen. The box lets them personalize the ask, make it photo-worthy, and still pick practical gifts.
              </p>
              <p>
                That is why Meta traffic should land on a page that repeats one action: start building. The trends create curiosity, the product thumbnails create trust, and the builder turns the interest into cart additions.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={builderHref} size="lg" className="w-full sm:w-auto">
                Start Building
              </Button>
              <Button href="/contact" variant="ghost" size="lg" className="w-full sm:w-auto">
                Ask About Bulk Orders
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 pb-28 sm:px-6 md:py-20 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Ready to build</p>
          <h2 className="font-serif text-4xl leading-tight text-espresso sm:text-5xl">
            Build the box she will remember opening.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-espresso/70">
            Choose the box color, write the inner lid message, add her gifts, and send a bridesmaid proposal that feels finished from the first click.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={builderHref} size="lg" className="w-full sm:w-auto">
              Build My Bridesmaid Box
            </Button>
            <Button href="/shop/bridal-party-gifts" variant="outline" size="lg" className="w-full bg-cream/40 sm:w-auto">
              Shop Bridal Party Gifts
            </Button>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/20 bg-cream/95 px-4 py-3 shadow-[0_-8px_30px_rgba(74,44,42,0.12)] backdrop-blur lg:hidden">
        <Button href={builderHref} className="w-full">
          Build My Bridesmaid Box
        </Button>
      </div>
    </main>
  );
}
