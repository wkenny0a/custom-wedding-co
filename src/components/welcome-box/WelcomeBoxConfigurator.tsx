/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Gift,
  Minus,
  PackageCheck,
  PenLine,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  WalletCards,
  X,
} from 'lucide-react';
import { BoxColorOption, DesignOption, ProductItem, WelcomeBoxState } from './WelcomeBoxTypes';
import { useCart } from '@/context/CartContext';

type BaseBoxProduct = {
  id?: string;
  name?: string;
  price?: number | string;
  options?: SwellProductOption[];
};

type SwellProductOptionValue = {
  id?: string;
  name?: string;
  value?: string;
  price?: number;
};

type SwellProductOption = {
  id?: string;
  name?: string;
  input_type?: string;
  type?: string;
  required?: boolean;
  values?: SwellProductOptionValue[];
};

type RewardTier = {
  threshold: number;
  title: string;
  shortTitle: string;
  detail: string;
  valueLabel: (boxQuantity: number) => string;
  value: (boxQuantity: number) => number;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  imageUrl?: string;
};

const TIERS = [
  { min: 5, discount: 10 },
  { min: 20, discount: 20 },
  { min: 30, discount: 30 },
  { min: 50, discount: 45 },
];

const PRESETS = [
  { qty: 5, label: '5 boxes', discount: '10% off' },
  { qty: 20, label: '20 boxes', discount: '20% off' },
  { qty: 30, label: '30 boxes', discount: '30% off' },
  { qty: 50, label: '50 boxes', discount: '45% off' },
  { qty: 100, label: '100 boxes', discount: '45% off' },
];

const BOX_COLORS: BoxColorOption[] = [
  { id: 'c1', name: 'Navy Blue', hexCode: '#3b5998', imageUrl: '/images/boxes/box_closed_navy_blue.png' },
  { id: 'c2', name: 'Sky Blue', hexCode: '#88d8ed', imageUrl: '/images/boxes/box_closed_sky_blue.png' },
  { id: 'c4', name: 'Premium Cream', hexCode: '#f3f1ea', imageUrl: '/images/boxes/box_closed_premium_cream.png', mostPopular: true },
  { id: 'c5', name: 'Light Pink', hexCode: '#f5c4c9', imageUrl: '/images/boxes/box_closed_light_pink.png' },
  { id: 'c7', name: 'Yellow', hexCode: '#ffd54f', imageUrl: '/images/boxes/box_closed_yellow.png' },
  { id: 'c8', name: 'Matte Black', hexCode: '#212121', imageUrl: '/images/boxes/box_closed_matte_black.png' },
];

const DESIGNS: DesignOption[] = [
  { id: 1, name: 'The Classic Initial', imageUrl: '/images/gift-boxes/monograms/2.png', isCustomUpload: false },
  { id: 2, name: 'The Modern Serif', imageUrl: '/images/gift-boxes/monograms/3.png', isCustomUpload: false },
  { id: 3, name: 'The Romantic Script', imageUrl: '/images/gift-boxes/monograms/4.png', isCustomUpload: false },
  { id: 4, name: 'The Elegant Floral', imageUrl: '/images/gift-boxes/monograms/5.png', isCustomUpload: false },
  { id: 5, name: 'The Minimalist Block', imageUrl: '/images/gift-boxes/monograms/6.png', isCustomUpload: false },
  { id: 6, name: 'The Vintage Crest', imageUrl: '/images/gift-boxes/monograms/7.png', isCustomUpload: false },
  { id: 7, name: 'The Artisan Frame', imageUrl: '/images/gift-boxes/monograms/8.png', isCustomUpload: false },
  { id: 8, name: 'The Timeless Calligraphy', imageUrl: '/images/gift-boxes/monograms/9.png', isCustomUpload: false },
  { id: 9, name: 'The Botanical Wreath', imageUrl: '/images/gift-boxes/monograms/10.png', isCustomUpload: false },
  { id: 10, name: 'The Regal Monogram', imageUrl: '/images/gift-boxes/monograms/11.png', isCustomUpload: false },
  { id: 11, name: 'The Contemporary Sans', imageUrl: '/images/gift-boxes/monograms/12.png', isCustomUpload: false },
  { id: 12, name: 'Upload Your Own', imageUrl: '/images/gift-boxes/monograms/custom-design.png', isCustomUpload: true },
];

const REWARDS: RewardTier[] = [
  {
    threshold: 2,
    title: 'Free shipping',
    shortTitle: 'Free shipping',
    detail: 'Unlocked after 2 selected items',
    valueLabel: () => '$19 value',
    value: () => 19,
    icon: Truck,
  },
  {
    threshold: 3,
    title: 'Free metal money clip',
    shortTitle: 'Money clip',
    detail: 'One included in every box',
    valueLabel: (qty) => `$${19 * qty} value`,
    value: (qty) => 19 * qty,
    icon: WalletCards,
  },
  {
    threshold: 4,
    title: 'Free passport holder',
    shortTitle: 'Passport holder',
    detail: 'One included in every box',
    valueLabel: (qty) => `$${25 * qty} value`,
    value: (qty) => 25 * qty,
    icon: PackageCheck,
    imageUrl: '/images/passport_holder.png',
  },
  {
    threshold: 5,
    title: 'Free signature pen with case',
    shortTitle: 'Pen with case',
    detail: 'One included in every box',
    valueLabel: (qty) => `$${30 * qty} value`,
    value: (qty) => 30 * qty,
    icon: PenLine,
    imageUrl: '/images/signature_pen.png',
  },
];

const REVIEWS = [
  {
    name: 'Amanda R.',
    location: 'New York, NY',
    text: 'Our guests opened the boxes before the welcome party and kept talking about how polished everything felt.',
    rating: 5,
    date: 'March 2025',
  },
  {
    name: 'James & Sarah',
    location: 'Austin, TX',
    text: 'We ordered 80 boxes and the one-page build process made it easy to compare what we were adding.',
    rating: 5,
    date: 'January 2025',
  },
  {
    name: 'Rachel M.',
    location: 'Denver, CO',
    text: 'The volume discount and free gift value made the final total feel much clearer for our planner.',
    rating: 5,
    date: 'April 2025',
  },
];

const REVIEW_IMAGES = [
  {
    src: '/images/ugc/welcome-review-1.jpeg',
    alt: 'Custom wedding welcome box styled for guests',
  },
  {
    src: '/images/ugc/welcome-review-2.jpeg',
    alt: 'Personalized welcome box contents from a real wedding order',
  },
  {
    src: '/images/ugc/welcome-review-3.jpeg',
    alt: 'Wedding welcome boxes prepared for a guest celebration',
  },
];

const FAQS = [
  {
    q: "What's the minimum order?",
    a: '5 boxes. Volume discounts begin at 5 boxes and increase for larger wedding, welcome party, and destination event orders.',
  },
  {
    q: 'Can I use my own design on the lid?',
    a: 'Yes. Choose Upload Your Own, then add a JPG, PNG, or WEBP file up to 4.5MB.',
  },
  {
    q: 'Do all boxes get the same contents?',
    a: 'Yes. One order creates identical boxes with the same color, lid design, welcome message, and selected items.',
  },
  {
    q: 'When do the free gifts unlock?',
    a: 'Free shipping unlocks at 2 selected items. Money clips unlock at 3 items, passport holders at 4 items, and signature pens with cases at 5 items.',
  },
  {
    q: 'How far in advance should I order?',
    a: 'We recommend ordering 3 to 4 weeks before your event. Contact us before ordering if your timeline is close.',
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

const getDiscount = (qty: number): number => {
  let discount = 0;
  for (const tier of TIERS) {
    if (qty >= tier.min) discount = tier.discount;
  }
  return discount;
};

const getCouponCode = (qty: number) => {
  if (qty >= 50) return 'welcome45';
  if (qty >= 30) return 'welcome30';
  if (qty >= 20) return 'welcome20';
  if (qty >= 5) return 'welcome10';
  return null;
};

const getSwellOptions = (product: { options?: SwellProductOption[]; swellData?: unknown } | null | undefined) => {
  const directOptions = product?.options;
  if (Array.isArray(directOptions)) return directOptions;

  const swellData = product?.swellData as { options?: SwellProductOption[] } | undefined;
  return Array.isArray(swellData?.options) ? swellData.options : [];
};

const findOptionByName = (options: SwellProductOption[], targetName: string) =>
  options.find((option) => option.name?.trim().toLowerCase() === targetName.toLowerCase());

const getOptionValueName = (value: SwellProductOptionValue | undefined) => value?.name || value?.value || '';

const getProductImages = (product: ProductItem | null) => {
  if (!product) return [];
  const swellImages = product.swellData?.images || [];
  const images = Array.isArray(swellImages)
    ? swellImages
        .map((image: { file?: { url?: string } }) => image.file?.url)
        .filter((url: string | undefined): url is string => Boolean(url))
    : [];
  return images.length ? images : [product.image || '/images/box_closed.png'];
};

const getProductDescription = (product: ProductItem | null) => {
  if (!product) return '';
  return (
    product.swellData?.description ||
    product.swellData?.meta_description ||
    'A curated welcome-box item selected for guest gifting, wedding weekends, and personalized event details.'
  );
};

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} star rating`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function WelcomeBoxConfigurator({
  catalogProducts = [],
  baseBoxProduct = null,
}: {
  catalogProducts?: ProductItem[];
  baseBoxProduct?: BaseBoxProduct | null;
}) {
  const { addToCart, setIsCartOpen, cart, applyCoupon } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boxQuantity, setBoxQuantity] = useState<number>(5);
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadPreview, setUploadPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [failedDesignImages, setFailedDesignImages] = useState<Set<number>>(new Set());
  const [activePreviewTab, setActivePreviewTab] = useState<'closed' | 'inside' | 'lid'>('closed');
  const [viewingProduct, setViewingProduct] = useState<ProductItem | null>(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<WelcomeBoxState>({
    boxColor: BOX_COLORS.find((color) => color.mostPopular) || BOX_COLORS[0],
    selectedDesign: DESIGNS[0],
    namesOrInitials: '',
    eventDate: '',
    customUploadUrl: '',
    customUploadFilename: '',
    welcomeMessage: '',
    selectedProducts: [],
    baseBoxCartItemId: undefined,
    includeMatchingBag: false,
  });

  const discountAmount = getDiscount(boxQuantity);
  const selectedCount = state.selectedProducts.length;
  const selectedProductIds = useMemo(
    () => new Set(state.selectedProducts.map((product) => product.id)),
    [state.selectedProducts],
  );
  const selectedItemsUnitTotal = useMemo(
    () => state.selectedProducts.reduce((sum, product) => sum + (Number(product.price) || 0), 0),
    [state.selectedProducts],
  );
  const baseBoxUnitPrice = Number(baseBoxProduct?.price || 0);
  const matchingBagUnitPrice = state.includeMatchingBag ? 2 : 0;
  const unitTotalBeforeDiscount = baseBoxUnitPrice + selectedItemsUnitTotal + matchingBagUnitPrice;
  const subtotalBeforeDiscount = unitTotalBeforeDiscount * boxQuantity;
  const volumeSavings = subtotalBeforeDiscount * (discountAmount / 100);
  const unlockedRewards = REWARDS.filter((reward) => selectedCount >= reward.threshold);
  const rewardSavings = unlockedRewards.reduce((sum, reward) => sum + reward.value(boxQuantity), 0);
  const totalSavings = volumeSavings + rewardSavings;
  const estimatedTotal = Math.max(0, subtotalBeforeDiscount - volumeSavings);
  const progressPercent = Math.min(100, (selectedCount / 5) * 100);
  const nextReward = REWARDS.find((reward) => selectedCount < reward.threshold);
  const isCustomDesign = state.selectedDesign?.isCustomUpload === true;
  const hasPersonalization = isCustomDesign
    ? state.customUploadUrl.trim() !== ''
    : state.namesOrInitials.trim() !== '' && state.eventDate.trim() !== '';
  const isReadyToAdd =
    Boolean(baseBoxProduct?.id) &&
    Boolean(state.boxColor) &&
    Boolean(state.selectedDesign) &&
    hasPersonalization &&
    selectedCount >= 2 &&
    !isSubmitting;

  const setBoxColor = (color: BoxColorOption) => setState((s) => ({ ...s, boxColor: color }));
  const setSelectedDesign = (design: DesignOption) => setState((s) => ({ ...s, selectedDesign: design }));
  const setNamesOrInitials = (value: string) => setState((s) => ({ ...s, namesOrInitials: value }));
  const setEventDate = (value: string) => setState((s) => ({ ...s, eventDate: value }));
  const setWelcomeMessage = (value: string) => setState((s) => ({ ...s, welcomeMessage: value }));
  const setIncludeMatchingBag = (value: boolean) => setState((s) => ({ ...s, includeMatchingBag: value }));

  const processFile = useCallback(
    async (file: File) => {
      setUploadError('');
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowed.includes(file.type)) {
        setUploadError('Please upload a JPG, PNG, or WEBP file.');
        return;
      }
      if (file.size > 4718592) {
        setUploadError('Please keep your upload under 4.5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => setUploadPreview(String(event.target?.result || ''));
      reader.readAsDataURL(file);

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('cartId', cart?.id || '');

        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = (await response.json()) as { url?: string; error?: string };

        if (!response.ok || !data.url) {
          throw new Error(data.error || 'Upload failed');
        }

        setState((s) => ({
          ...s,
          customUploadUrl: data.url || '',
          customUploadFilename: file.name,
        }));
        setUploadPreview(data.url);
      } catch (error: unknown) {
        setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
        setUploadPreview('');
      } finally {
        setIsUploading(false);
      }
    },
    [cart?.id],
  );

  const handleFileDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const addProduct = (product: ProductItem) => {
    setState((s) => {
      if (s.selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)) return s;
      return { ...s, selectedProducts: [...s.selectedProducts, product] };
    });
  };

  const removeProduct = (productId: string) => {
    setState((s) => ({
      ...s,
      selectedProducts: s.selectedProducts.filter((product) => product.id !== productId),
    }));
  };

  const openProductDetail = (product: ProductItem) => {
    setDetailImageIndex(0);
    setViewingProduct(product);
  };

  const buildBaseOptions = () => {
    const options: { name: string; value: string }[] = [];

    const matchingBagOption = findOptionByName(getSwellOptions(baseBoxProduct), 'Matching Custom Welcome Bag');
    if (matchingBagOption) {
      const targetValue = matchingBagOption.values?.find((value) =>
        state.includeMatchingBag
          ? /yes/i.test(getOptionValueName(value))
          : /^no$/i.test(getOptionValueName(value)),
      );
      const fallbackValue = matchingBagOption.values?.[state.includeMatchingBag ? 1 : 0];
      const value = getOptionValueName(targetValue || fallbackValue);
      if (matchingBagOption.name && value) {
        options.push({ name: matchingBagOption.name, value });
      }
    }

    return options;
  };

  const buildBaseMetadata = () => ({
    welcome_box_builder: true,
    welcome_box_box_color: state.boxColor?.name || '',
    welcome_box_lid_design: state.selectedDesign?.name || '',
    welcome_box_names_or_initials: state.namesOrInitials.trim(),
    welcome_box_event_date: state.eventDate.trim(),
    welcome_box_custom_upload_url: state.customUploadUrl,
    welcome_box_welcome_message: state.welcomeMessage.trim(),
    welcome_box_matching_bag: state.includeMatchingBag ? 'Yes (+$2 per box)' : 'No',
    welcome_box_selected_items: state.selectedProducts.map((product) => product.name).join(', '),
    welcome_box_item_count: selectedCount,
    welcome_box_quantity: boxQuantity,
    welcome_box_free_value: unlockedRewards.length
      ? unlockedRewards
          .map((reward) => `${reward.shortTitle} (${reward.valueLabel(boxQuantity)})`)
          .join(' + ')
      : 'No free gifts unlocked',
    welcome_box_total_savings: formatCurrency(totalSavings),
    welcome_box_volume_discount: `${discountAmount}% off`,
  });

  const buildProductOptions = (product: ProductItem) => {
    const options: { name: string; value: string }[] = [];

    for (const option of getSwellOptions(product)) {
      if (!option.name) continue;
      const inputType = option.input_type || option.type || '';
      const optionName = option.name.toLowerCase();

      if (Array.isArray(option.values) && option.values.length > 0) {
        let selectedValue: SwellProductOptionValue | undefined;

        if (optionName.includes('design')) {
          selectedValue = option.values.find((value) =>
            getOptionValueName(value).toLowerCase() === `design #${state.selectedDesign?.id || 1}`.toLowerCase(),
          );
        }

        selectedValue = selectedValue || option.values[0];
        const value = getOptionValueName(selectedValue);
        if (value) options.push({ name: option.name, value });
        continue;
      }

      if (optionName.includes('names') || optionName.includes('initials')) {
        options.push({
          name: option.name,
          value: state.namesOrInitials.trim() || 'Custom artwork uploaded',
        });
        continue;
      }

      if (optionName.includes('event date') || optionName === 'date') {
        options.push({
          name: option.name,
          value: state.eventDate.trim() || 'See custom artwork',
        });
        continue;
      }

      if (optionName.includes('upload') || optionName.includes('artwork')) {
        options.push({
          name: option.name,
          value: state.customUploadUrl || 'Provided with welcome box',
        });
        continue;
      }

      if (option.required || inputType === 'short_text' || inputType === 'text') {
        options.push({ name: option.name, value: 'Provided with welcome box' });
      }
    }

    return options;
  };

  const handleAddBundleToCart = async () => {
    if (!isReadyToAdd || !baseBoxProduct?.id) return;
    setIsSubmitting(true);

    try {
      await addToCart(baseBoxProduct.id, boxQuantity, buildBaseOptions(), buildBaseMetadata(), true);

      for (const product of state.selectedProducts) {
        await addToCart(product.id, boxQuantity, buildProductOptions(product), null, true);
      }

      setIsCartOpen(true);

      const couponCode = getCouponCode(boxQuantity);
      if (couponCode) {
        try {
          await applyCoupon(couponCode);
        } catch (couponError) {
          console.warn('Welcome box coupon auto-apply skipped:', couponCode, couponError);
        }
      }
    } catch (error) {
      console.error('Failed to add welcome box bundle:', error);
      alert('We could not add the welcome box to cart. Please try again or contact us for help.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const readyMessage = useMemo(() => {
    if (!baseBoxProduct?.id) return 'Welcome box product is not available yet.';
    if (selectedCount < 2) return `Add ${2 - selectedCount} more item${2 - selectedCount === 1 ? '' : 's'} to unlock checkout.`;
    if (!state.boxColor) return 'Choose a box color.';
    if (!state.selectedDesign) return 'Choose a lid design.';
    if (!hasPersonalization) {
      return isCustomDesign ? 'Upload your lid artwork.' : 'Add names and event date.';
    }
    return 'Ready to add your completed welcome box.';
  }, [baseBoxProduct?.id, hasPersonalization, isCustomDesign, selectedCount, state.boxColor, state.selectedDesign]);

  const detailImages = getProductImages(viewingProduct);
  const detailImage = detailImages[detailImageIndex] || viewingProduct?.image || '/images/box_closed.png';
  const detailDescription = getProductDescription(viewingProduct);

  return (
    <div className="w-full pb-28 lg:pb-32">
      <div className="w-full bg-espresso text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 py-3 text-center font-sans text-[11px] uppercase tracking-[0.16em] sm:gap-6">
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-gold" />
            4.9 from 1,200+ couples
          </span>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" />
          <span>8,500+ welcome boxes delivered</span>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" />
          <span>Bulk discounts up to 45% off</span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 grid gap-6 border-b border-gold-pale/40 pb-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Build Your Wedding Welcome Box
            </span>
            <h1 className="font-serif text-4xl leading-tight text-espresso sm:text-5xl lg:text-6xl">
              Curate guest boxes in one simple flow.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-espresso-light/80 sm:text-lg">
              Choose the box count, personalize the lid, add the items guests will actually use, and unlock free wedding-weekend upgrades as your box gets fuller.
            </p>
          </div>
          <div className="rounded-2xl border border-gold-pale/40 bg-white/70 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.18em] text-espresso/50">Current savings</p>
                <p className="mt-1 font-serif text-3xl text-espresso">{formatCurrency(totalSavings)}</p>
              </div>
              <div className="rounded-full bg-gold/10 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                {discountAmount}% box discount
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
          <div className="order-2 lg:order-1">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Fill the box
                </span>
                <h2 className="mt-2 font-serif text-3xl text-espresso">Select guest-ready items</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-espresso-light/70">
                Pick at least two items. Rewards unlock as you add more unique products.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {catalogProducts.map((product) => {
                const isSelected = selectedProductIds.has(product.id);
                return (
                  <article
                    key={product.id}
                    className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
                      isSelected
                        ? 'border-gold shadow-md shadow-gold/10'
                        : 'border-gold-pale/30 hover:border-gold/60 hover:shadow-md'
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-cream-dark/60">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-espresso/30">
                          <Gift size={32} strokeWidth={1.5} />
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white shadow-md">
                          <Check size={18} strokeWidth={2} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-xl leading-tight text-espresso">{product.name}</h3>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="font-sans text-sm font-semibold text-espresso">
                          {formatCurrency(Number(product.price) || 0)} each
                        </span>
                        {product.isCustomizable && (
                          <span className="rounded-full bg-gold/10 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                            Custom
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => (isSelected ? removeProduct(product.id) : addProduct(product))}
                        className={`mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full border font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                          isSelected
                            ? 'border-espresso/20 bg-cream text-espresso hover:border-espresso/40'
                            : 'border-espresso bg-espresso text-cream hover:bg-espresso-light'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Minus size={15} /> Remove
                          </>
                        ) : (
                          <>
                            <Plus size={15} /> Add to box
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => openProductDetail(product)}
                        className="mt-2 flex h-9 w-full items-center justify-center rounded-full border border-gold-pale/50 bg-white font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso/65 transition-all duration-300 hover:border-gold hover:text-espresso"
                      >
                        View detail
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {catalogProducts.length === 0 && (
              <div className="rounded-2xl border border-gold-pale/40 bg-white/70 p-8 text-center">
                <h3 className="font-serif text-2xl text-espresso">Welcome box items are loading</h3>
                <p className="mt-2 text-sm text-espresso-light/70">
                  If this persists, refresh the page or contact us and we can help build the box manually.
                </p>
              </div>
            )}
          </div>

          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-gold-pale/40 bg-white/85 p-4 shadow-xl shadow-espresso/5 backdrop-blur sm:p-5">
                <div className="mb-5 flex items-start justify-between gap-4 border-b border-gold-pale/40 pb-4">
                  <div>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                      Your box builder
                    </span>
                    <h2 className="mt-1 font-serif text-2xl text-espresso">Customize the full box</h2>
                  </div>
                  <div className="rounded-full bg-cream px-3 py-1 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso/70">
                    {selectedCount} items
                  </div>
                </div>

                <div className="space-y-5">
                  <section>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-espresso">
                        1. Box quantity
                      </h3>
                      <span className="font-sans text-xs font-semibold text-gold">{discountAmount}% off</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset.qty}
                          onClick={() => {
                            setBoxQuantity(preset.qty);
                            setIsCustomQuantity(false);
                          }}
                          className={`rounded-xl border px-2 py-3 text-center transition-all duration-300 ${
                            !isCustomQuantity && boxQuantity === preset.qty
                              ? 'border-gold bg-gold/10 shadow-sm'
                              : 'border-gold-pale/40 bg-white/60 hover:border-gold/60'
                          }`}
                        >
                          <span className="block font-serif text-xl leading-none text-espresso">{preset.qty}</span>
                          <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.12em] text-espresso/50">
                            {preset.label}
                          </span>
                          <span className="mt-1 block font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-gold">
                            {preset.discount}
                          </span>
                        </button>
                      ))}
                      {isCustomQuantity ? (
                        <label className="rounded-xl border border-gold bg-gold/10 px-2 py-2 text-center shadow-sm">
                          <input
                            type="number"
                            min="5"
                            value={boxQuantity}
                            onChange={(event) => setBoxQuantity(Math.max(5, Number(event.target.value) || 5))}
                            className="w-full bg-transparent text-center font-serif text-xl text-espresso outline-none"
                          />
                          <span className="block font-sans text-[9px] uppercase tracking-[0.12em] text-espresso/50">
                            boxes
                          </span>
                          <span className="block font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-gold">
                            custom
                          </span>
                        </label>
                      ) : (
                        <button
                          onClick={() => {
                            setIsCustomQuantity(true);
                            setBoxQuantity(5);
                          }}
                          className="rounded-xl border border-gold-pale/40 bg-white/60 px-2 py-3 text-center transition-all duration-300 hover:border-gold/60"
                        >
                          <span className="block font-serif text-xl leading-none text-espresso">Custom</span>
                          <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.12em] text-espresso/50">
                            enter qty
                          </span>
                        </button>
                      )}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-gold-pale/40 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-espresso">
                          Live box preview
                        </h3>
                        <p className="mt-1 text-xs text-espresso-light/65">
                          See the box, lid, and selected items update as you build.
                        </p>
                      </div>
                      <Sparkles size={18} className="text-gold" strokeWidth={1.5} />
                    </div>

                    <div className="mb-3 grid grid-cols-3 gap-2 rounded-full bg-cream p-1">
                      {[
                        { id: 'closed', label: 'Box' },
                        { id: 'inside', label: 'Inside' },
                        { id: 'lid', label: 'Lid' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActivePreviewTab(tab.id as 'closed' | 'inside' | 'lid')}
                          className={`h-9 rounded-full font-sans text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                            activePreviewTab === tab.id
                              ? 'bg-espresso text-cream shadow-sm'
                              : 'text-espresso/55 hover:text-espresso'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-gold-pale/30 bg-cream-dark/45">
                      {activePreviewTab === 'closed' && (
                        <div className="flex h-full w-full items-center justify-center p-5">
                          <img
                            src={state.boxColor?.imageUrl || '/images/box_closed.png'}
                            alt={`${state.boxColor?.name || 'Welcome'} box preview`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}

                      {activePreviewTab === 'inside' && (
                        <div className="relative flex h-full w-full items-center justify-center p-5">
                          <img
                            src="/images/box_open.png"
                            alt="Open welcome box preview"
                            className="absolute inset-0 h-full w-full object-contain opacity-35"
                          />
                          {state.selectedProducts.length > 0 ? (
                            <div className="relative z-10 grid max-h-[82%] w-[86%] grid-cols-3 gap-2 overflow-y-auto rounded-2xl border border-gold-pale/30 bg-white/80 p-2 shadow-sm backdrop-blur-sm">
                              {state.selectedProducts.map((product) => (
                                <div key={product.id} className="overflow-hidden rounded-lg border border-gold-pale/25 bg-white text-center shadow-sm">
                                  <img src={product.image || '/images/box_closed.png'} alt={product.name} className="h-12 w-full object-cover" />
                                  <span className="block truncate px-1 py-1 font-sans text-[9px] text-espresso/70">
                                    {product.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="relative z-10 flex flex-col items-center rounded-2xl bg-white/75 px-5 py-4 text-center shadow-sm">
                              <Gift size={28} className="text-gold" strokeWidth={1.4} />
                              <p className="mt-2 font-serif text-sm text-espresso">Choose items to fill the box</p>
                            </div>
                          )}
                        </div>
                      )}

                      {activePreviewTab === 'lid' && (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-white p-5 text-center">
                          <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-2xl border border-gold-pale/40 bg-cream">
                            <img
                              src={
                                state.selectedDesign?.isCustomUpload && state.customUploadUrl
                                  ? state.customUploadUrl
                                  : state.selectedDesign?.imageUrl || '/images/gift-boxes/monograms/2.png'
                              }
                              alt={state.selectedDesign?.name || 'Lid design preview'}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <p className="font-serif text-xl leading-tight text-espresso">
                            {state.namesOrInitials || 'Names or initials'}
                          </p>
                          <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-espresso-light/65">
                            {state.eventDate || 'Event date'}
                          </p>
                          {state.welcomeMessage && (
                            <p className="mt-3 max-h-16 max-w-[260px] overflow-hidden text-xs leading-5 text-espresso-light/75">
                              {state.welcomeMessage}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-espresso/55">
                      <span className="rounded-full bg-cream px-2.5 py-1">Color: {state.boxColor?.name}</span>
                      <span className="rounded-full bg-cream px-2.5 py-1">Design: {state.selectedDesign?.name}</span>
                      <span className="rounded-full bg-cream px-2.5 py-1">{selectedCount} items</span>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-espresso">
                      2. Box color
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {BOX_COLORS.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setBoxColor(color)}
                          className={`relative rounded-xl border px-2 py-3 text-center transition-all duration-300 ${
                            state.boxColor?.id === color.id
                              ? 'border-gold bg-gold/10 shadow-sm'
                              : 'border-gold-pale/40 bg-white/60 hover:border-gold/60'
                          }`}
                        >
                          {color.mostPopular && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-2 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-[0.12em] text-white">
                              Most loved
                            </span>
                          )}
                          <span
                            className="mx-auto block h-8 w-8 rounded-full border border-espresso/10 shadow-inner"
                            style={{ backgroundColor: color.hexCode }}
                          />
                          <span className="mt-2 block font-sans text-[10px] font-semibold leading-tight text-espresso">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-espresso">
                      3. Lid design and message
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {DESIGNS.map((design) => {
                        const isSelected = state.selectedDesign?.id === design.id;
                        const hasFailed = failedDesignImages.has(design.id);
                        const designImage = design.isCustomUpload && (state.customUploadUrl || uploadPreview)
                          ? state.customUploadUrl || uploadPreview
                          : design.imageUrl;

                        return (
                          <button
                            key={design.id}
                            onClick={() => setSelectedDesign(design)}
                            className={`group overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                              isSelected
                                ? 'border-gold shadow-sm'
                                : 'border-gold-pale/30 hover:border-gold/60'
                            }`}
                            aria-label={`Choose ${design.name}`}
                          >
                            <div className="relative aspect-square bg-cream-dark/50">
                              {hasFailed && !state.customUploadUrl ? (
                                <div className="flex h-full w-full items-center justify-center text-espresso/30">
                                  <Sparkles size={18} strokeWidth={1.5} />
                                </div>
                              ) : (
                                <img
                                  src={designImage}
                                  alt={design.name}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  onError={() => setFailedDesignImages((prev) => new Set(prev).add(design.id))}
                                />
                              )}
                              {isSelected && (
                                <span className="absolute inset-0 flex items-center justify-center bg-gold/20">
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white">
                                    <Check size={14} />
                                  </span>
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {state.selectedDesign?.isCustomUpload ? (
                      <div className="mt-3 rounded-2xl border border-gold-pale/40 bg-cream/60 p-3">
                        <div
                          onDragOver={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleFileDrop}
                          className={`rounded-xl border border-dashed p-4 text-center transition-all duration-300 ${
                            isDragging ? 'border-gold bg-gold/10' : 'border-gold-pale/60 bg-white/60'
                          }`}
                        >
                          {state.customUploadUrl ? (
                            <div className="flex items-center gap-3 text-left">
                              <img
                                src={state.customUploadUrl}
                                alt="Uploaded lid design"
                                className="h-14 w-14 rounded-lg border border-gold-pale/40 object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                                  Artwork uploaded
                                </p>
                                <p className="truncate text-xs text-espresso-light/70">{state.customUploadFilename}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso"
                              >
                                Replace
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full font-sans text-xs font-semibold uppercase tracking-[0.16em] text-espresso"
                            >
                              {isUploading ? 'Uploading artwork...' : 'Upload lid artwork'}
                            </button>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </div>
                        {uploadError && <p className="mt-2 text-xs text-red-800">{uploadError}</p>}
                      </div>
                    ) : (
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        <label className="block">
                          <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso/55">
                            Names or initials
                          </span>
                          <input
                            type="text"
                            value={state.namesOrInitials}
                            onChange={(event) => setNamesOrInitials(event.target.value)}
                            placeholder="J & S, The Millers"
                            className="h-11 w-full rounded-xl border border-gold-pale/50 bg-white px-3 font-serif text-sm text-espresso outline-none transition-colors focus:border-gold"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso/55">
                            Event date
                          </span>
                          <input
                            type="text"
                            value={state.eventDate}
                            onChange={(event) => setEventDate(event.target.value)}
                            placeholder="June 14, 2027"
                            className="h-11 w-full rounded-xl border border-gold-pale/50 bg-white px-3 font-serif text-sm text-espresso outline-none transition-colors focus:border-gold"
                          />
                        </label>
                      </div>
                    )}

                    <label className="mt-3 block">
                      <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso/55">
                        Welcome message
                      </span>
                      <textarea
                        value={state.welcomeMessage}
                        onChange={(event) => setWelcomeMessage(event.target.value)}
                        placeholder="Welcome to our wedding weekend..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gold-pale/50 bg-white px-3 py-3 font-serif text-sm text-espresso outline-none transition-colors focus:border-gold"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setIncludeMatchingBag(!state.includeMatchingBag)}
                      className="mt-3 flex w-full items-center justify-between gap-4 rounded-2xl border border-gold-pale/40 bg-cream/50 px-4 py-3 text-left transition-colors hover:border-gold/60"
                    >
                      <span>
                        <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                          Matching custom welcome bag
                        </span>
                        <span className="mt-1 block text-xs text-espresso-light/65">Add a matching personalized bag for $2 per box.</span>
                      </span>
                      <span
                        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                          state.includeMatchingBag ? 'bg-gold' : 'bg-espresso/15'
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            state.includeMatchingBag ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </span>
                    </button>
                  </section>

                  <section className="rounded-2xl border border-gold-pale/40 bg-cream/60 p-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-espresso">
                          Reward progress
                        </h3>
                        <p className="mt-1 text-xs text-espresso-light/65">
                          {nextReward
                            ? `Add ${nextReward.threshold - selectedCount} more item${nextReward.threshold - selectedCount === 1 ? '' : 's'} to unlock ${nextReward.shortTitle}.`
                            : 'Every welcome box reward is unlocked.'}
                        </p>
                      </div>
                      <Gift size={20} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-espresso/10">
                      <div
                        className="h-full rounded-full bg-gold transition-all duration-700"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {REWARDS.map((reward) => {
                        const unlocked = selectedCount >= reward.threshold;
                        const Icon = reward.icon;
                        return (
                          <div
                            key={reward.threshold}
                            className={`rounded-xl border p-3 transition-all duration-300 ${
                              unlocked
                                ? 'border-gold bg-white shadow-sm'
                                : 'border-gold-pale/30 bg-white/45 opacity-70'
                            }`}
                          >
                            <div className="mb-2 flex items-center justify-between gap-2">
                              {reward.imageUrl ? (
                                <span className="h-9 w-9 overflow-hidden rounded-lg border border-gold-pale/40 bg-cream-dark">
                                  <img
                                    src={reward.imageUrl}
                                    alt={reward.title}
                                    className={`h-full w-full object-cover ${unlocked ? '' : 'opacity-45 grayscale'}`}
                                  />
                                </span>
                              ) : (
                                <span
                                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                    unlocked ? 'bg-gold/10 text-gold' : 'bg-espresso/5 text-espresso/35'
                                  }`}
                                >
                                  <Icon size={17} strokeWidth={1.6} />
                                </span>
                              )}
                              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-espresso/50">
                                {reward.threshold} items
                              </span>
                            </div>
                            <p className="font-serif text-sm leading-tight text-espresso">{reward.title}</p>
                            <p className="mt-1 text-[11px] leading-4 text-espresso-light/65">{reward.valueLabel(boxQuantity)}</p>
                            {unlocked && (
                              <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                                Unlocked
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-gold-pale/40 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-espresso">
                        Box summary
                      </h3>
                      <span className="text-xs text-espresso-light/65">{boxQuantity} boxes</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Items per box</span>
                        <span className="font-semibold text-espresso">{selectedCount}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Items subtotal</span>
                        <span className="font-semibold text-espresso">{formatCurrency(selectedItemsUnitTotal * boxQuantity)}</span>
                      </div>
                      {state.includeMatchingBag && (
                        <div className="flex justify-between gap-4">
                          <span className="text-espresso-light/70">Matching bags</span>
                          <span className="font-semibold text-espresso">{formatCurrency(matchingBagUnitPrice * boxQuantity)}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Volume discount</span>
                        <span className="font-semibold text-gold">-{formatCurrency(volumeSavings)}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-espresso-light/70">Free-gift value</span>
                        <span className="font-semibold text-gold">{formatCurrency(rewardSavings)}</span>
                      </div>
                      {unlockedRewards.length > 0 && (
                        <div className="rounded-2xl border border-gold-pale/35 bg-cream/50 p-3">
                          <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso/55">
                            Gift value included
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {unlockedRewards.map((reward) => {
                              const Icon = reward.icon;
                              return (
                                <div key={reward.threshold} className="flex items-center gap-2 rounded-xl border border-gold-pale/30 bg-white px-2 py-2">
                                  {reward.imageUrl ? (
                                    <img
                                      src={reward.imageUrl}
                                      alt={reward.title}
                                      className="h-9 w-9 rounded-lg object-cover"
                                    />
                                  ) : (
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
                                      <Icon size={16} strokeWidth={1.6} />
                                    </span>
                                  )}
                                  <span className="max-w-[86px] font-sans text-[10px] font-semibold leading-4 text-espresso">
                                    {reward.shortTitle}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="border-t border-gold-pale/40 pt-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-espresso">
                            Total saved
                          </span>
                          <span className="font-serif text-2xl text-espresso">{formatCurrency(totalSavings)}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="rounded-2xl border border-gold-pale/40 bg-espresso p-4 text-cream shadow-lg">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/60">
                          Ready status
                        </p>
                        <p className="mt-1 text-sm text-cream/90">{readyMessage}</p>
                      </div>
                      <div className="rounded-full bg-cream/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-cream">
                        Save {formatCurrency(totalSavings)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddBundleToCart}
                      disabled={!isReadyToAdd}
                      className={`flex h-14 w-full items-center justify-center gap-2 rounded-full font-sans text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                        isReadyToAdd
                          ? 'bg-gold text-white hover:bg-gold-dark'
                          : 'cursor-not-allowed bg-cream/15 text-cream/45'
                      }`}
                    >
                      <ShoppingBag size={18} strokeWidth={1.6} />
                      {isSubmitting ? 'Adding bundle...' : `Add ${boxQuantity} boxes to cart`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mb-12">
          <div className="mb-6 text-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Real Couples
            </span>
            <h2 className="mt-2 font-serif text-3xl text-espresso sm:text-4xl">
              Welcome boxes guests remembered
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-espresso-light/70">
              A look at the personalized welcome-box details couples have created for wedding weekends, destination arrivals, and guest gifting moments.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {REVIEW_IMAGES.map((image, index) => (
              <figure
                key={image.src}
                className={`group overflow-hidden rounded-2xl border border-gold-pale/35 bg-white shadow-sm ${
                  index === 1 ? 'sm:translate-y-5' : ''
                }`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <article key={`${review.name}-${review.date}`} className="rounded-2xl border border-gold-pale/35 bg-white/70 p-6 shadow-sm">
              <StarRating count={review.rating} />
              <p className="mt-4 font-serif text-lg leading-7 text-espresso">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-5 border-t border-gold-pale/35 pt-4">
                <p className="font-sans text-sm font-semibold text-espresso">{review.name}</p>
                <p className="mt-1 font-sans text-xs text-espresso-light/60">
                  {review.location} · {review.date}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-gold-pale/40 bg-white/70 p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">Questions</span>
              <h2 className="mt-2 font-serif text-3xl text-espresso">Welcome box FAQs</h2>
            </div>
            <Sparkles className="hidden text-gold sm:block" size={28} strokeWidth={1.4} />
          </div>
          <div className="divide-y divide-gold-pale/40">
            {FAQS.map((faq, index) => (
              <div key={faq.q} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-serif text-lg text-espresso">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-gold transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-espresso-light/75">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-pale/50 bg-cream/95 px-3 py-3 shadow-2xl shadow-espresso/15 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso/50">
              Estimated total
            </p>
            <div className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span className="font-serif text-2xl leading-none text-espresso">
                {formatCurrency(estimatedTotal)}
              </span>
              <span className="font-sans text-xs font-semibold text-gold">
                Save {formatCurrency(totalSavings)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddBundleToCart}
            disabled={!isReadyToAdd}
            className={`flex h-12 min-w-[156px] items-center justify-center gap-2 rounded-full px-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:min-w-[220px] ${
              isReadyToAdd
                ? 'bg-espresso text-cream hover:bg-espresso-light'
                : 'cursor-not-allowed bg-espresso/20 text-espresso/40'
            }`}
          >
            <ShoppingBag size={16} strokeWidth={1.6} />
            {isSubmitting ? 'Adding...' : 'Add to cart'}
          </button>
        </div>
      </div>

      {viewingProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/55 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-gold-pale/40 bg-cream shadow-2xl sm:rounded-3xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold-pale/40 bg-cream/95 px-5 py-4 backdrop-blur">
              <div className="min-w-0 pr-4">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Product detail
                </p>
                <h3 className="truncate font-serif text-xl text-espresso sm:text-2xl">
                  {viewingProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingProduct(null)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold-pale/45 bg-white text-espresso transition-colors hover:border-gold"
                aria-label="Close product detail"
              >
                <X size={18} strokeWidth={1.7} />
              </button>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:p-7">
              <div>
                <div className="aspect-square overflow-hidden rounded-2xl border border-gold-pale/35 bg-white">
                  <img
                    src={detailImage}
                    alt={viewingProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {detailImages.length > 1 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {detailImages.slice(0, 10).map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setDetailImageIndex(index)}
                        className={`aspect-square overflow-hidden rounded-xl border bg-white transition-all ${
                          detailImageIndex === index ? 'border-gold shadow-sm' : 'border-gold-pale/35 hover:border-gold/70'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img src={image} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <p className="font-sans text-sm font-semibold text-gold">
                  {formatCurrency(Number(viewingProduct.price) || 0)} each
                </p>
                <div
                  className="mt-4 text-sm leading-7 text-espresso-light/80 [&_p]:mb-4 [&_strong]:text-espresso [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: detailDescription }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
