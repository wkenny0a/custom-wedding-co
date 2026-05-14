/**
 * Analytics & Pixel Event Helpers
 * ────────────────────────────────
 * Centralised utility for firing e-commerce events across all installed pixels:
 *   • Meta Pixel (Facebook / Instagram)
 *   • Google Analytics 4 (GA4)
 *   • TikTok Pixel
 *   • Pinterest Tag
 *   • Microsoft Clarity (session recording only — no custom events needed)
 *
 * Usage:
 *   import { trackAddToCart, trackPurchase } from '@/lib/analytics'
 *
 * Each helper gracefully no-ops if the corresponding pixel isn't loaded yet
 * (e.g. blocked by ad-blocker or consent not given).
 */

/* ─── Type Declarations ──────────────────────────────────────────────────── */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    ttq?: { track: (...args: any[]) => void; page: () => void };
    pintrk?: (...args: any[]) => void;
  }
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const fbq = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.fbq) window.fbq(...args);
};

const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) window.gtag(...args);
};

const ttq = (event: string, data?: any) => {
  if (typeof window !== 'undefined' && window.ttq) window.ttq.track(event, data);
};

const pintrk = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.pintrk) window.pintrk(...args);
};

/* ─── Page View ──────────────────────────────────────────────────────────── */

export function trackPageView() {
  fbq('track', 'PageView');
  // GA4 handles pageviews automatically via gtag config
  if (typeof window !== 'undefined' && window.ttq) window.ttq.page();
  pintrk('page');
}

/* ─── View Content (Product Page) ────────────────────────────────────────── */

export function trackViewContent(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  fbq('track', 'ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'USD',
  });

  gtag('event', 'view_item', {
    currency: 'USD',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      },
    ],
  });

  ttq('ViewContent', {
    content_id: product.id,
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'USD',
  });

  pintrk('track', 'pagevisit', {
    line_items: [
      {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
      },
    ],
  });
}

/* ─── Add to Cart ────────────────────────────────────────────────────────── */

export function trackAddToCart(product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}) {
  const value = product.price * product.quantity;

  fbq('track', 'AddToCart', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value,
    currency: 'USD',
  });

  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  });

  ttq('AddToCart', {
    content_id: product.id,
    content_name: product.name,
    content_type: 'product',
    value,
    currency: 'USD',
    quantity: product.quantity,
  });

  pintrk('track', 'addtocart', {
    value,
    currency: 'USD',
    line_items: [
      {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_quantity: product.quantity,
      },
    ],
  });
}

/* ─── Initiate Checkout ──────────────────────────────────────────────────── */

export function trackInitiateCheckout(cart: {
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
}) {
  fbq('track', 'InitiateCheckout', {
    content_ids: cart.items.map((i) => i.id),
    num_items: cart.items.length,
    value: cart.total,
    currency: 'USD',
  });

  gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: cart.total,
    items: cart.items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });

  ttq('InitiateCheckout', {
    value: cart.total,
    currency: 'USD',
    quantity: cart.items.length,
  });

  pintrk('track', 'checkout', {
    value: cart.total,
    currency: 'USD',
    line_items: cart.items.map((i) => ({
      product_id: i.id,
      product_name: i.name,
      product_price: i.price,
      product_quantity: i.quantity,
    })),
  });
}

/* ─── Purchase ───────────────────────────────────────────────────────────── */

export function trackPurchase(order: {
  orderId: string;
  total: number;
  items: { id: string; name: string; price: number; quantity: number }[];
}) {
  fbq('track', 'Purchase', {
    content_ids: order.items.map((i) => i.id),
    content_type: 'product',
    value: order.total,
    currency: 'USD',
  });

  gtag('event', 'purchase', {
    transaction_id: order.orderId,
    currency: 'USD',
    value: order.total,
    items: order.items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });

  ttq('CompletePayment', {
    value: order.total,
    currency: 'USD',
    quantity: order.items.length,
  });

  pintrk('track', 'checkout', {
    value: order.total,
    currency: 'USD',
    order_id: order.orderId,
    line_items: order.items.map((i) => ({
      product_id: i.id,
      product_name: i.name,
      product_price: i.price,
      product_quantity: i.quantity,
    })),
  });
}

/* ─── Lead / Email Capture ───────────────────────────────────────────────── */

export function trackLead(data?: { email?: string }) {
  fbq('track', 'Lead');
  gtag('event', 'generate_lead', { currency: 'USD', value: 0 });
  ttq('SubmitForm');
  pintrk('track', 'lead');
}

/* ─── Search ─────────────────────────────────────────────────────────────── */

export function trackSearch(query: string) {
  fbq('track', 'Search', { search_string: query });
  gtag('event', 'search', { search_term: query });
  ttq('Search', { query });
  pintrk('track', 'search', { search_query: query });
}
