/**
 * Meta Conversions API (CAPI) — Server-Side Event Sender
 * ───────────────────────────────────────────────────────
 * Sends events directly from the server to Meta's Graph API,
 * bypassing the browser entirely. This ensures conversion data
 * reaches Meta even when:
 *   - The user has an ad blocker
 *   - iOS 14+ ATT prompt was declined
 *   - The browser tab was closed before the pixel could fire
 *
 * Events are deduplicated with the browser pixel using a shared
 * `event_id`. Meta matches pixel + CAPI events and keeps only one.
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import crypto from 'crypto';

/* ─── Config ─────────────────────────────────────────────────────────────── */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || '';
const API_VERSION = 'v21.0';
const ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface CAPIUserData {
  email?: string;         // Will be SHA-256 hashed before sending
  phone?: string;         // Will be SHA-256 hashed before sending
  firstName?: string;     // Will be SHA-256 hashed before sending
  lastName?: string;      // Will be SHA-256 hashed before sending
  city?: string;          // Will be SHA-256 hashed before sending
  state?: string;         // Will be SHA-256 hashed before sending
  zip?: string;           // Will be SHA-256 hashed before sending
  country?: string;       // Will be SHA-256 hashed before sending
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string;           // Facebook click ID (from _fbc cookie)
  fbp?: string;           // Facebook browser ID (from _fbp cookie)
}

interface CAPICustomData {
  value?: number;
  currency?: string;
  contentIds?: string[];
  contentType?: string;
  contentName?: string;
  numItems?: number;
  orderId?: string;
}

interface CAPIEvent {
  eventName: string;
  eventId: string;        // Must match the event_id sent by the browser pixel
  eventTime?: number;     // Unix timestamp (seconds)
  eventSourceUrl?: string;
  userData: CAPIUserData;
  customData?: CAPICustomData;
  actionSource?: 'website' | 'app' | 'email' | 'phone_call';
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** SHA-256 hash for PII fields (Meta requirement) */
function hashPII(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return crypto
    .createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex');
}

/** Generate a unique event ID for deduplication between pixel + CAPI */
export function generateEventId(): string {
  return crypto.randomUUID();
}

/* ─── Core Sender ────────────────────────────────────────────────────────── */

/**
 * Send a single event to Meta's Conversions API.
 * Returns true on success, false on failure (never throws).
 */
export async function sendCAPIEvent(event: CAPIEvent): Promise<boolean> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[CAPI] Missing PIXEL_ID or ACCESS_TOKEN — skipping server event.');
    return false;
  }

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_id: event.eventId,
        event_time: event.eventTime || Math.floor(Date.now() / 1000),
        event_source_url: event.eventSourceUrl,
        action_source: event.actionSource || 'website',
        user_data: {
          em: hashPII(event.userData.email),
          ph: hashPII(event.userData.phone),
          fn: hashPII(event.userData.firstName),
          ln: hashPII(event.userData.lastName),
          ct: hashPII(event.userData.city),
          st: hashPII(event.userData.state),
          zp: hashPII(event.userData.zip),
          country: hashPII(event.userData.country),
          client_ip_address: event.userData.clientIpAddress,
          client_user_agent: event.userData.clientUserAgent,
          fbc: event.userData.fbc,
          fbp: event.userData.fbp,
        },
        custom_data: event.customData
          ? {
              value: event.customData.value,
              currency: event.customData.currency || 'USD',
              content_ids: event.customData.contentIds,
              content_type: event.customData.contentType || 'product',
              content_name: event.customData.contentName,
              num_items: event.customData.numItems,
              order_id: event.customData.orderId,
            }
          : undefined,
      },
    ],
  };

  try {
    const response = await fetch(`${ENDPOINT}?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[CAPI] Meta API error (${response.status}):`, errorBody);
      return false;
    }

    const result = await response.json();
    console.log(`[CAPI] ✓ ${event.eventName} sent successfully. Events received: ${result.events_received}`);
    return true;
  } catch (error) {
    console.error('[CAPI] Network error sending event:', error);
    return false;
  }
}

/* ─── Convenience Methods ────────────────────────────────────────────────── */

/** Server-side AddToCart event */
export async function capiAddToCart(params: {
  eventId: string;
  productId: string;
  productName: string;
  value: number;
  quantity: number;
  userData: CAPIUserData;
  sourceUrl?: string;
}) {
  return sendCAPIEvent({
    eventName: 'AddToCart',
    eventId: params.eventId,
    eventSourceUrl: params.sourceUrl,
    userData: params.userData,
    customData: {
      contentIds: [params.productId],
      contentName: params.productName,
      contentType: 'product',
      value: params.value,
      currency: 'USD',
      numItems: params.quantity,
    },
  });
}

/** Server-side InitiateCheckout event */
export async function capiInitiateCheckout(params: {
  eventId: string;
  contentIds: string[];
  value: number;
  numItems: number;
  userData: CAPIUserData;
  sourceUrl?: string;
}) {
  return sendCAPIEvent({
    eventName: 'InitiateCheckout',
    eventId: params.eventId,
    eventSourceUrl: params.sourceUrl,
    userData: params.userData,
    customData: {
      contentIds: params.contentIds,
      contentType: 'product',
      value: params.value,
      currency: 'USD',
      numItems: params.numItems,
    },
  });
}

/** Server-side Purchase event (the most critical one) */
export async function capiPurchase(params: {
  eventId: string;
  orderId: string;
  contentIds: string[];
  value: number;
  numItems: number;
  userData: CAPIUserData;
  sourceUrl?: string;
}) {
  return sendCAPIEvent({
    eventName: 'Purchase',
    eventId: params.eventId,
    eventSourceUrl: params.sourceUrl,
    userData: params.userData,
    customData: {
      contentIds: params.contentIds,
      contentType: 'product',
      value: params.value,
      currency: 'USD',
      numItems: params.numItems,
      orderId: params.orderId,
    },
  });
}

/** Server-side Lead event */
export async function capiLead(params: {
  eventId: string;
  userData: CAPIUserData;
  sourceUrl?: string;
}) {
  return sendCAPIEvent({
    eventName: 'Lead',
    eventId: params.eventId,
    eventSourceUrl: params.sourceUrl,
    userData: params.userData,
  });
}
