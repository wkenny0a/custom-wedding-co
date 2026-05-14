/**
 * /api/webhooks/swell — Swell Order Webhook Handler
 * ──────────────────────────────────────────────────
 * Swell fires this webhook when an order is created (paid).
 * We use it to send a server-side Purchase event to Meta CAPI,
 * ensuring the conversion is tracked even if the browser pixel
 * was blocked by ad blockers or iOS privacy settings.
 *
 * Setup in Swell Dashboard:
 *   Settings → Webhooks → Add Webhook
 *   Event: orders.created
 *   URL: https://your-domain.com/api/webhooks/swell
 *   Secret: (set in META_SWELL_WEBHOOK_SECRET env var)
 */

import { NextRequest, NextResponse } from 'next/server';
import { capiPurchase, generateEventId } from '@/lib/meta-capi';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Swell sends the order object directly
    const order = body;

    // Only process order creation events
    if (!order?.id || !order?.grand_total) {
      return NextResponse.json(
        { error: 'Invalid or incomplete order payload' },
        { status: 400 }
      );
    }

    // Extract product IDs from order items
    const contentIds = (order.items || []).map(
      (item: any) => item.product_id || item.id
    );

    // Extract customer data for better matching
    const billing = order.billing || order.shipping || {};
    const account = order.account || {};

    console.log(`[Swell Webhook] Processing order ${order.number || order.id} — $${order.grand_total}`);

    const success = await capiPurchase({
      eventId: `purchase_${order.id}_${generateEventId()}`,
      orderId: order.number?.toString() || order.id,
      contentIds,
      value: order.grand_total,
      numItems: order.item_quantity || contentIds.length,
      userData: {
        email: account.email || billing.email,
        firstName: billing.first_name || account.first_name,
        lastName: billing.last_name || account.last_name,
        phone: billing.phone || account.phone,
        city: billing.city,
        state: billing.state,
        zip: billing.zip,
        country: billing.country,
      },
      sourceUrl: `https://customweddingco.com/checkout`,
    });

    console.log(
      `[Swell Webhook] Purchase CAPI event ${success ? '✓ sent' : '✗ failed'} for order ${order.number || order.id}`
    );

    return NextResponse.json({ success, orderId: order.id });
  } catch (error) {
    console.error('[Swell Webhook] Error processing order webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
