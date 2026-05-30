'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, PackageCheck, ShoppingBag, Sparkles, Star, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { trackViewContent } from '@/lib/analytics'

export type BuilderProduct = {
  id: string
  name: string
  slug: string
  price: number
  image: string
  images?: string[]
  description?: string
  options?: BuilderOption[]
}

export type BuilderOption = {
  name?: string
  input_type?: string
  type?: string
  required?: boolean
  values?: {
    name?: string
    value?: string
    price?: number
  }[]
}

type TierId = 'signature' | 'luxe'

type Tier = {
  id: TierId
  name: string
  eyebrow: string
  price: number
  productKeys: ProductKey[]
  product: BuilderProduct
  description: string
}

type ProductKey =
  | 'compactMirror'
  | 'hairbrush'
  | 'jewelryCase'
  | 'sleepCollection'
  | 'robe'
  | 'slippers'

type BonusKey = 'hairClaw' | 'scrunchies'

type PrebuiltBridesmaidProposalBoxBuilderProps = {
  tierProducts: Record<TierId, BuilderProduct>
  products: Record<ProductKey, BuilderProduct>
  bonusProducts: Record<BonusKey, BuilderProduct>
  hideHeaderBar?: boolean
  showStickyCart?: boolean
}

const timerSeconds = 10 * 60
const defaultLidMessage = 'Will you be my bridesmaid?'

type Personalization = {
  name: string
  message: string
}

const colors = [
  {
    id: 'black',
    label: 'Black',
    swellName: 'Matte Black',
    image: '/images/boxes/box_closed_matte_black_new.jpg',
    swatch: '#212121',
  },
  {
    id: 'white',
    label: 'White',
    swellName: 'Premium Cream',
    image: '/images/boxes/box_closed_premium_cream_new.jpg',
    swatch: '#f3f1ea',
  },
  {
    id: 'pink',
    label: 'Pink',
    swellName: 'Light Pink',
    image: '/images/boxes/box_closed_light_pink_new.jpg',
    swatch: '#f5c4c9',
  },
]

const reviewImages = [
  '/images/ugc/bridesmaid-review-1.jpeg',
  '/images/ugc/bridesmaid-review-2.jpeg',
  '/images/ugc/bridesmaid-review-3.jpeg',
]

const reviews = [
  'The proposal box felt personal without me having to build every detail from scratch.',
  'The names on the keepsakes made each bridesmaid feel like the box was truly theirs.',
  'Everything arrived beautifully packed and ready for the bridesmaid proposal weekend.',
]

const faqs = [
  {
    q: 'What is included in the standard box?',
    a: 'The standard proposal box includes the custom outside and inside gift box, compact mirror, botanical hairbrush, velvet jewelry case, and satin sleep collection.',
  },
  {
    q: 'Can I personalize each box?',
    a: 'Yes. Add a separate outside-lid name and inside-lid message for every box in the order. Those details are attached to the box order.',
  },
  {
    q: 'Do the items exist on the site?',
    a: 'Yes. The included items are real Custom Wedding Co. products from the site, bundled into a faster proposal-box experience.',
  },
  {
    q: 'How does the free gift timer work?',
    a: 'While the timer is active, the order metadata includes the free hair claw and silk scrunchies value for each box. If the timer expires, you can reset it.',
  },
  {
    q: 'How soon should I order?',
    a: 'Order as early as possible for bridal party gifts. If your event is close, contact us before ordering so we can confirm timing.',
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function getTierMsrp(tier: Tier, products: Record<ProductKey, BuilderProduct>) {
  return tier.productKeys.reduce((sum, key) => sum + products[key].price, 0)
}

export function PrebuiltBridesmaidProposalBoxBuilder({
  tierProducts,
  products,
  bonusProducts,
  hideHeaderBar = false,
  showStickyCart = true,
}: PrebuiltBridesmaidProposalBoxBuilderProps) {
  const { addToCart } = useCart()
  const [tierId, setTierId] = useState<TierId>('signature')
  const [quantity, setQuantity] = useState(1)
  const [isCustomQuantity, setIsCustomQuantity] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[2])
  const [personalizations, setPersonalizations] = useState<Personalization[]>([
    { name: '', message: defaultLidMessage },
  ])
  const [previewTab, setPreviewTab] = useState<'box' | 'inside' | 'lid'>('box')
  const [activePreviewIndex, setActivePreviewIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(timerSeconds)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [detailProduct, setDetailProduct] = useState<BuilderProduct | null>(null)

  const tiers: Tier[] = useMemo(
    () => [
      {
        id: 'signature',
        name: 'The Bridesmaid Proposal Box',
        eyebrow: 'Signature tier',
        price: tierProducts.signature.price || 70,
        productKeys: ['compactMirror', 'hairbrush', 'jewelryCase', 'sleepCollection'],
        product: tierProducts.signature,
        description: 'A ready-to-personalize proposal box with the keepsake details bridesmaids actually use.',
      },
      {
        id: 'luxe',
        name: 'The Bridesmaid Luxe Proposal Box',
        eyebrow: 'Luxe tier',
        price: tierProducts.luxe.price || 99,
        productKeys: ['compactMirror', 'hairbrush', 'jewelryCase', 'sleepCollection', 'robe', 'slippers'],
        product: tierProducts.luxe,
        description: 'The full proposal and getting-ready gift experience with robe and custom slipper upgrades.',
      },
    ],
    [tierProducts],
  )

  const activeTier = tiers.find((tier) => tier.id === tierId) || tiers[0]

  useEffect(() => {
    if (activeTier?.product?.id) {
      trackViewContent({
        id: activeTier.product.id,
        name: activeTier.product.name || 'Prebuilt Bridesmaid Proposal Box',
        price: activeTier.price,
        category: 'Gifts & Boxes',
      })
    }
  }, [activeTier])
  const includedProducts = activeTier.productKeys.map((key) => products[key])
  const bonusItems = [bonusProducts.hairClaw, bonusProducts.scrunchies]
  const nameList = personalizations.map((item) => item.name.trim()).filter(Boolean).join(', ')
  const messageList = personalizations.map((item, index) => `Box ${index + 1}: ${item.message.trim()}`).join(' | ')
  const activePreviewPersonalization = personalizations[activePreviewIndex] || personalizations[0] || { name: '', message: defaultLidMessage }
  const activePreviewName = activePreviewPersonalization.name.trim() || `Box ${activePreviewIndex + 1}`
  const activePreviewMessage = activePreviewPersonalization.message.trim() || defaultLidMessage
  const msrpUnit = getTierMsrp(activeTier, products)
  const bundleSavingsUnit = Math.max(0, msrpUnit - activeTier.price)
  const bonusUnitValue = bonusItems.reduce((sum, product) => sum + product.price, 0)
  const timerGiftValue = secondsLeft > 0 ? bonusUnitValue * quantity : 0
  const subtotal = activeTier.price * quantity
  const totalMsrp = msrpUnit * quantity
  const totalSavings = bundleSavingsUnit * quantity + timerGiftValue
  const canSubmit =
    personalizations.length === quantity &&
    personalizations.every((item) => item.name.trim().length > 0 && item.message.trim().length > 0) &&
    !isSubmitting

  const tierImages =
    activeTier.product.images?.length ? activeTier.product.images : activeTier.product.image ? [activeTier.product.image] : []
  const galleryImages = [
    ...tierImages,
    ...includedProducts.map((product) => product.image),
  ].filter(Boolean)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [secondsLeft])

  useEffect(() => {
    setPersonalizations((current) =>
      Array.from({ length: quantity }, (_, index) => current[index] || { name: '', message: defaultLidMessage }),
    )
  }, [quantity])

  useEffect(() => {
    setActivePreviewIndex((current) => Math.min(current, Math.max(0, quantity - 1)))
  }, [quantity])

  useEffect(() => {
    setImageIndex(0)
  }, [tierId])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const updatePersonalization = (index: number, field: keyof Personalization, value: string) => {
    setPersonalizations((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    )
  }

  const changePreviewBox = (direction: -1 | 1) => {
    setActivePreviewIndex((current) => {
      if (quantity <= 1) return 0
      return (current + direction + quantity) % quantity
    })
  }

  const changeGalleryImage = (direction: -1 | 1) => {
    setImageIndex((current) => {
      if (galleryImages.length <= 1) return 0
      return (current + direction + galleryImages.length) % galleryImages.length
    })
  }

  const handleAddToCart = async () => {
    if (!canSubmit) return
    setIsSubmitting(true)

    try {
      const optionsArray: any[] = []

      // 1. Box Color
      optionsArray.push({ name: 'Box Color', value: selectedColor.swellName || selectedColor.label })

      // 2. Personalization & Keepsakes (Consolidated with clean line breaks)
      let detailsString = ''
      personalizations.forEach((item, index) => {
        detailsString += `Name ${index + 1}: ${item.name.trim()}\n`
        detailsString += `Box Message ${index + 1}: ${item.message.trim()}\n\n`
      })

      detailsString += `Included Keepsakes:\n`
      includedProducts.forEach((product) => {
        detailsString += `- ${product.name}\n`
      })

      if (secondsLeft > 0) {
        detailsString += `\nFree Checkout Bonus:\n`
        bonusItems.forEach((product) => {
          detailsString += `- ${product.name}\n`
        })
      } else {
        detailsString += `\nFree Checkout Bonus:\n- None (Timer Expired)\n`
      }

      optionsArray.push({ name: 'Personalization & Keepsakes', value: detailsString })

      const baseMetadata = {
        prebuilt_bridesmaid_box: true,
        prebuilt_box_parent_listing_id: activeTier.product.id,
        prebuilt_box_parent_listing_slug: activeTier.product.slug,
        prebuilt_box_tier: activeTier.name,
        prebuilt_box_display_unit_price: formatCurrency(activeTier.price),
        prebuilt_box_msrp_unit: formatCurrency(msrpUnit),
        prebuilt_box_savings_unit: formatCurrency(bundleSavingsUnit),
        prebuilt_box_quantity: quantity,
        prebuilt_box_total_display: formatCurrency(subtotal),
        prebuilt_box_total_savings: formatCurrency(totalSavings),
        prebuilt_box_names: nameList,
        prebuilt_box_inner_lid_messages: messageList,
        prebuilt_box_personalizations: JSON.stringify(personalizations),
        prebuilt_box_color: selectedColor.label,
        prebuilt_box_cart_behavior: 'Selected preset box SKU only; included products are recorded in metadata.',
        prebuilt_box_included_products: includedProducts.map((product) => product.name).join(', '),
        prebuilt_box_included_product_ids: includedProducts.map((product) => product.id).join(', '),
        prebuilt_box_bonus_products: bonusItems.map((product) => product.name).join(', '),
        prebuilt_box_timer_gift:
          secondsLeft > 0
            ? `Free hair claw and silk scrunchies per box (${formatCurrency(timerGiftValue)} value)`
            : 'Timer expired',
      }

      await addToCart(activeTier.product.id, quantity, optionsArray, baseMetadata, true)

      window.location.href = '/checkout'
    } catch (error) {
      console.error('Failed to add prebuilt bridesmaid box:', error)
      const errorMsg = error instanceof Error ? error.message : String(error)
      alert(`We could not add the bridesmaid box to cart: ${errorMsg}. Please try again or contact us for help.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-cream pb-28 text-espresso">
      {!hideHeaderBar && (
        <section className="bg-espresso text-cream">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-3 text-center font-sans text-[11px] uppercase tracking-[0.16em] sm:gap-6">
            <span className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              4.9 from 1,200+ couples
            </span>
            <span className="hidden h-4 w-px bg-cream/20 sm:block" />
            <span>8,500+ welcome boxes delivered</span>
            <span className="hidden h-4 w-px bg-cream/20 sm:block" />
            <span>Bulk discounts up to 45% off</span>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.24em] text-gold">
            The Bridesmaid Proposal Box
          </p>
          <h1 className="font-display text-4xl leading-tight text-espresso sm:text-5xl md:text-6xl">
            Pick the box. Personalize every detail. Make each bridesmaid feel chosen.
          </h1>
          <p className="mt-4 text-base leading-7 text-espresso-light/80 sm:text-lg">
            A preset bridal-party box built for faster gifting, real product value, and the proposal moment your bridesmaids will remember.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
          <div className="order-1 min-w-0">
            <div className="border border-gold-pale/40 bg-white p-4 shadow-xl shadow-espresso/5">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <Image
                  src={galleryImages[imageIndex] || '/images/gift-boxes/bridesmaid-box.png'}
                  alt={activeTier.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 bg-cream px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-espresso">
                  {activeTier.eyebrow}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeGalleryImage(-1)}
                  disabled={galleryImages.length <= 1}
                  className="flex h-12 w-9 flex-shrink-0 items-center justify-center border border-gold-pale/40 bg-cream text-espresso transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="View previous gallery image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1 overflow-x-auto pb-1">
                  <div className="flex gap-2">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setImageIndex(index)}
                        className={`relative h-14 w-14 flex-shrink-0 overflow-hidden border bg-cream-dark transition-colors sm:h-20 sm:w-20 ${
                          imageIndex === index ? 'border-gold' : 'border-gold-pale/35 hover:border-gold/70'
                        }`}
                        aria-label={`View gallery image ${index + 1} of ${galleryImages.length}`}
                      >
                        <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => changeGalleryImage(1)}
                  disabled={galleryImages.length <= 1}
                  className="flex h-12 w-9 flex-shrink-0 items-center justify-center border border-gold-pale/40 bg-cream text-espresso transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="View next gallery image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Inline CSS for the customized smooth fade-in animation on tier shift */}
            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(12px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-custom-fade-in {
                animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>

            <div className="mt-6 grid gap-3 grid-cols-2">
              {tiers.map((tier) => {
                const selected = tier.id === activeTier.id
                const tierMsrp = getTierMsrp(tier, products)
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setTierId(tier.id)}
                    className={`relative border p-3 sm:p-5 text-left transition-all duration-300 rounded-2xl flex flex-col h-full justify-between overflow-hidden ${
                      selected
                        ? 'border-gold bg-gold/[0.03] shadow-xl shadow-gold/15 ring-2 ring-gold/50 scale-[1.02] z-10'
                        : 'border-gold-pale/35 bg-white/70 hover:border-gold/50 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full">
                      <div className={`relative mb-3 sm:mb-4 aspect-[4/3] overflow-hidden bg-cream-dark rounded-xl transition-all duration-300 ${
                        selected ? 'ring-2 ring-gold border-gold' : 'border border-transparent'
                      }`}>
                        <Image src={tier.product.image} alt={tier.name} fill sizes="(min-width: 768px) 240px, 50vw" className="object-cover" />
                      </div>
                      <p className="font-sans text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-gold">{tier.eyebrow}</p>
                      <h2 className="mt-1 sm:mt-2 font-serif text-sm sm:text-2xl leading-tight text-espresso font-semibold">{tier.name}</h2>
                      <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm leading-normal sm:leading-6 text-espresso-light/75 line-clamp-2 sm:line-clamp-none">{tier.description}</p>
                    </div>
                    <div className="mt-3 sm:mt-4 flex items-end justify-between gap-2 w-full pt-2 border-t border-gold-pale/20">
                      <div>
                        <p className="font-sans text-[9px] sm:text-xs text-espresso/45 line-through">{formatCurrency(tierMsrp)} Value</p>
                        <p className="font-serif text-lg sm:text-3xl text-espresso font-bold">{formatCurrency(tier.price)}</p>
                      </div>
                      <span className={`flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all duration-300 ${
                        selected
                          ? 'bg-gold text-white ring-4 ring-gold/20 scale-110 shadow-lg'
                          : 'border-2 border-gold-pale/60 text-transparent bg-white hover:border-gold'
                      }`}>
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="relative mt-10 border-2 border-gold bg-white shadow-2xl shadow-gold/10 p-5 sm:p-6 rounded-2xl ring-4 ring-gold/15 transition-all duration-500">
              {/* Dynamic pointer arrow connecting the active tier box to the "What's inside" section */}
              <div
                className="absolute -top-3.5 h-0 w-0 border-l-[14px] border-r-[14px] border-b-[14px] border-transparent border-b-gold transition-all duration-500 ease-in-out"
                style={{
                  left: activeTier.id === 'signature' ? '25%' : '75%',
                  transform: 'translateX(-50%)',
                }}
              />
              <div
                className="absolute -top-3 h-0 w-0 border-l-[12px] border-r-[12px] border-b-[12px] border-transparent border-b-white transition-all duration-500 ease-in-out"
                style={{
                  left: activeTier.id === 'signature' ? '25%' : '75%',
                  transform: 'translateX(-50%)',
                }}
              />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="font-serif text-xl sm:text-2xl text-espresso font-semibold flex items-center gap-2">
                  What&apos;s inside
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold font-sans text-[10px] font-bold uppercase tracking-widest transition-all duration-300">
                  <Check className="w-3 h-3 stroke-[2.5]" /> Included in {activeTier.name}
                </span>
              </div>
              
              <div key={activeTier.id} className="mt-4 grid gap-3 sm:grid-cols-2 animate-custom-fade-in transition-all duration-500">
                {includedProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex gap-4 border border-gold/30 bg-gold/[0.01] p-3.5 rounded-xl shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md hover:scale-[1.01] hover:bg-gold/[0.03]"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-cream-dark rounded-lg border-2 border-gold/25 shadow-sm">
                      <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
                      {/* Premium visual check circle icon overlay on product images */}
                      <div className="absolute top-1 right-1 bg-gold text-cream rounded-full h-4.5 w-4.5 flex items-center justify-center p-0.5 shadow-md border border-white">
                        <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-sm sm:text-base leading-tight text-espresso font-semibold line-clamp-1">{product.name}</h3>
                        <p className="mt-1 font-sans text-xs font-bold text-gold">{formatCurrency(product.price)} Value</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDetailProduct(product)}
                        className="mt-2 text-left font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-espresso/60 transition-colors hover:text-gold"
                      >
                        View details &rarr;
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Limited Checkout Bonus nested inside the "What's inside" section */}
              <div className="mt-6 pt-6 border-t border-gold/20">
                <div className="bg-gold/[0.03] border border-gold/40 p-4 sm:p-5 rounded-xl shadow-inner relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex h-2 w-2 rounded-full bg-gold animate-ping" />
                        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Limited checkout bonus</p>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-espresso font-semibold">
                        Free bridal hair claw & cream silk scrunchies included, valued at {formatCurrency(bonusUnitValue)} per box.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-4 py-2 border border-gold/30 rounded-lg shadow-sm w-fit">
                      <Clock3 className="h-4.5 w-4.5 text-gold animate-pulse" />
                      <div>
                        {secondsLeft > 0 ? (
                          <span className="font-mono text-xl sm:text-2xl font-bold text-espresso tracking-tight">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSecondsLeft(timerSeconds)}
                            className="flex h-8 items-center justify-center border border-espresso bg-espresso px-3 rounded font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-espresso-light"
                          >
                            Reset timer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {bonusItems.map((product) => (
                      <article key={product.id} className="flex gap-3 border border-gold/25 bg-white p-3 rounded-lg shadow-sm hover:border-gold hover:shadow-md transition-all duration-300">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden bg-cream-dark rounded-md border border-gold/20">
                          <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="line-clamp-1 font-serif text-xs sm:text-sm leading-tight text-espresso font-semibold">{product.name}</h4>
                            <p className="mt-0.5 font-sans text-[10px] font-semibold text-gold">{formatCurrency(product.price)} value</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDetailProduct(product)}
                            className="mt-1 text-left font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.12em] text-espresso/50 transition-colors hover:text-gold"
                          >
                            View details &rarr;
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="order-2 min-w-0">
            <div className="lg:sticky lg:top-24">
              <div className="border border-gold-pale/40 bg-white/90 p-5 shadow-xl shadow-espresso/5 backdrop-blur">
                <div className="mb-5 flex items-start justify-between gap-4 border-b border-gold-pale/40 pb-4">
                  <div>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Your box builder</p>
                    <h2 className="mt-1 font-serif text-2xl text-espresso">Personalize the preset</h2>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-espresso/45">Bundle</p>
                    <p className="font-serif text-2xl text-espresso">{formatCurrency(activeTier.price)}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <section>
                    <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-espresso">Box quantity</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setQuantity(amount)
                            setIsCustomQuantity(false)
                          }}
                          className={`h-12 border font-serif text-xl transition-colors ${
                            !isCustomQuantity && quantity === amount
                              ? 'border-gold bg-gold/10 text-espresso'
                              : 'border-gold-pale/40 bg-cream text-espresso-light hover:border-gold'
                          }`}
                        >
                          {amount}
                        </button>
                      ))}
                      {isCustomQuantity ? (
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                          className="h-12 border border-gold bg-gold/10 text-center font-serif text-xl text-espresso outline-none"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setQuantity(6)
                            setIsCustomQuantity(true)
                          }}
                          className="h-12 border border-gold-pale/40 bg-cream font-sans text-xs font-bold uppercase tracking-[0.12em] text-espresso-light hover:border-gold"
                        >
                          Custom
                        </button>
                      )}
                    </div>
                  </section>

                  <section className="border border-gold-pale/40 bg-cream p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-espresso">Live box preview</h3>
                      <Sparkles className="h-4 w-4 text-gold" />
                    </div>
                    <div className="mb-3 flex items-center justify-between gap-2 border border-gold-pale/35 bg-white px-2 py-2">
                      <button
                        type="button"
                        onClick={() => changePreviewBox(-1)}
                        disabled={quantity <= 1}
                        className="flex h-9 w-9 items-center justify-center border border-gold-pale/45 bg-cream text-espresso transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label="Preview previous box"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <div className="min-w-0 text-center">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                          Box {activePreviewIndex + 1} of {quantity}
                        </p>
                        <p className="truncate font-serif text-base leading-tight text-espresso">
                          {activePreviewName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => changePreviewBox(1)}
                        disabled={quantity <= 1}
                        className="flex h-9 w-9 items-center justify-center border border-gold-pale/45 bg-cream text-espresso transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label="Preview next box"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
                      {personalizations.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActivePreviewIndex(index)}
                          className={`h-8 flex-shrink-0 border px-3 font-sans text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                            activePreviewIndex === index
                              ? 'border-gold bg-gold/10 text-espresso'
                              : 'border-gold-pale/35 bg-white text-espresso/55 hover:border-gold'
                          }`}
                          aria-label={`Preview box ${index + 1}`}
                        >
                          {item.name.trim() || `Box ${index + 1}`}
                        </button>
                      ))}
                    </div>
                    <div className="mb-3 grid grid-cols-3 gap-1 bg-cream-dark p-1">
                      {(['box', 'inside', 'lid'] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setPreviewTab(tab)}
                          className={`h-9 font-sans text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                            previewTab === tab ? 'bg-espresso text-cream' : 'text-espresso/55 hover:text-espresso'
                          }`}
                        >
                          {tab === 'box' ? 'Outside' : tab === 'inside' ? 'Inside' : 'Message'}
                        </button>
                      ))}
                    </div>

                    <div className="relative aspect-square overflow-hidden border border-gold-pale/35 bg-white">
                      {previewTab === 'box' && (
                        <div className="relative flex h-full items-center justify-center p-6">
                          <Image src={selectedColor.image} alt={`${selectedColor.label} bridesmaid box`} fill sizes="390px" className="object-contain p-6" />
                        </div>
                      )}

                      {previewTab === 'inside' && (
                        <div className="relative flex h-full items-center justify-center p-5">
                          <Image src="/images/box_open.png" alt="Open bridesmaid box" fill sizes="390px" className="object-contain opacity-30" />
                          <div className="relative z-10 grid max-h-[80%] w-[86%] grid-cols-3 gap-2 overflow-y-auto border border-gold-pale/35 bg-white/82 p-2 backdrop-blur">
                            {includedProducts.map((product) => (
                              <div key={product.id} className="overflow-hidden border border-gold-pale/25 bg-white text-center">
                                <div className="relative h-12 w-full">
                                  <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
                                </div>
                                <span className="block truncate px-1 py-1 font-sans text-[9px] text-espresso/70">
                                  {product.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {previewTab === 'lid' && (
                        <div className="flex h-full flex-col items-center justify-center bg-white p-5 text-center">
                          <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                            Inside lid message
                          </p>
                          <p
                            className="max-w-[260px] text-3xl leading-tight text-espresso"
                            style={{ fontFamily: '"Brush Script MT", "Segoe Script", cursive' }}
                          >
                            {activePreviewMessage}
                          </p>
                          <p className="mt-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-espresso-light/65">
                            {activePreviewName}
                          </p>
                        </div>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-espresso">Box color</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`border px-2 py-3 transition-colors ${
                            selectedColor.id === color.id ? 'border-gold bg-gold/10' : 'border-gold-pale/40 bg-cream hover:border-gold'
                          }`}
                        >
                          <span className="mx-auto block h-7 w-7 rounded-full border border-espresso/10" style={{ backgroundColor: color.swatch }} />
                          <span className="mt-2 block font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-espresso">{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <div>
                      <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-espresso">
                        Personalize each box
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-espresso-light/70">
                        Add one outside-lid name and one inside-lid message for every box in this order.
                      </p>
                    </div>
                    {personalizations.map((item, index) => (
                      <div key={index} className="border border-gold-pale/40 bg-cream p-3">
                        <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                          Box {index + 1}
                        </p>
                        <label>
                          <span className="mb-1 block font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-espresso/55">
                            Outside lid name, also used for the personalized items inside this box
                          </span>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(event) => updatePersonalization(index, 'name', event.target.value)}
                            placeholder="Emily"
                            className="h-11 w-full border border-gold-pale/50 bg-white px-3 font-serif text-sm text-espresso outline-none focus:border-gold"
                          />
                        </label>
                        <label className="mt-3 block">
                          <span className="mb-1 block font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-espresso/55">
                            Inside lid message
                          </span>
                          <input
                            type="text"
                            value={item.message}
                            onChange={(event) => updatePersonalization(index, 'message', event.target.value)}
                            placeholder={defaultLidMessage}
                            className="h-11 w-full border border-gold-pale/50 bg-white px-3 font-serif text-sm text-espresso outline-none focus:border-gold"
                          />
                        </label>
                      </div>
                    ))}
                  </section>



                  <section className="border border-gold-pale/40 bg-white p-4">
                    <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-espresso">Box summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Value total</span>
                        <span className="font-semibold text-espresso line-through">{formatCurrency(totalMsrp)}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Bundle total</span>
                        <span className="font-semibold text-espresso">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Bundle savings</span>
                        <span className="font-semibold text-gold">{formatCurrency(bundleSavingsUnit * quantity)}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Free gift value</span>
                        <span className="font-semibold text-gold">{formatCurrency(timerGiftValue)}</span>
                      </div>
                      <div className="border-t border-gold-pale/40 pt-3 space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-espresso">Total savings</span>
                          <span className="font-semibold text-gold">{formatCurrency(totalSavings)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-gold-pale/25">
                          <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-espresso">Total cost</span>
                          <span className="font-serif text-2xl text-espresso">{formatCurrency(subtotal)}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!canSubmit}
                    className={`flex h-14 w-full items-center justify-center gap-2 bg-espresso px-5 font-sans text-sm font-bold uppercase tracking-[0.16em] text-cream transition-colors ${
                      canSubmit ? 'hover:bg-espresso-light' : 'cursor-not-allowed opacity-45'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {isSubmitting ? 'Adding...' : 'Add to cart and checkout'}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">Real proposal moments</p>
          <h2 className="mt-2 font-display text-3xl text-espresso sm:text-4xl">Bridesmaid gifts that feel thoughtful</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {reviewImages.map((image, index) => (
            <figure key={image} className="overflow-hidden border border-gold-pale/35 bg-white">
              <div className="relative aspect-[4/5] bg-cream-dark">
                <Image src={image} alt={`Bridesmaid proposal review ${index + 1}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
            </figure>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review} className="border border-gold-pale/35 bg-white/75 p-5">
              <div className="mb-3 flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <p className="font-serif text-lg leading-7 text-espresso">&ldquo;{review}&rdquo;</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="border border-gold-pale/40 bg-white/75 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">FAQ</p>
              <h2 className="mt-2 font-display text-3xl text-espresso">Before you personalize</h2>
            </div>
            <PackageCheck className="hidden h-8 w-8 text-gold sm:block" />
          </div>
          <div className="divide-y divide-gold-pale/40">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-serif text-lg text-espresso">{faq.q}</span>
                  <span className={`text-gold transition-transform ${openFaq === index ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === index && <p className="mt-3 text-sm leading-6 text-espresso-light/75">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {detailProduct && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-espresso/60 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-gold-pale/40 bg-cream shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold-pale/40 bg-cream/95 px-5 py-4 backdrop-blur">
              <div className="min-w-0 pr-4">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Product detail</p>
                <h3 className="truncate font-serif text-xl text-espresso">{detailProduct.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailProduct(null)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-gold-pale/45 bg-white text-espresso"
                aria-label="Close product detail"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="relative aspect-square overflow-hidden border border-gold-pale/35 bg-white">
                <Image src={detailProduct.image} alt={detailProduct.name} fill sizes="360px" className="object-cover" />
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-gold">{formatCurrency(detailProduct.price)} Value</p>
                <p className="mt-4 text-sm leading-7 text-espresso-light/80">
                  {stripHtml(detailProduct.description) || 'A personalized keepsake selected for the bridesmaid proposal box experience.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
