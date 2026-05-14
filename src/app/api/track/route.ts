/**
 * /api/track — Server-Side CAPI Proxy
 * ─────────────────────────────────────
 * This API route receives events from:
 *   1. The browser (client-side analytics.ts) — for AddToCart / InitiateCheckout
 *      deduplication with the pixel.
 *   2. Direct server calls — for Purchase events triggered after payment.
 *
 * The browser sends the same `event_id` it used for the pixel event,
 * allowing Meta to deduplicate and keep only one record.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendCAPIEvent, generateEventId } from '@/lib/meta-capi';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      eventName,
      eventId,
      sourceUrl,
      userData = {},
      customData = {},
    } = body;

    if (!eventName) {
      return NextResponse.json(
        { error: 'Missing required field: eventName' },
        { status: 400 }
      );
    }

    // Extract real IP and user agent from the request headers
    const clientIpAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '0.0.0.0';
    const clientUserAgent =
      request.headers.get('user-agent') || '';

    const success = await sendCAPIEvent({
      eventName,
      eventId: eventId || generateEventId(),
      eventSourceUrl: sourceUrl || request.headers.get('referer') || undefined,
      userData: {
        ...userData,
        clientIpAddress,
        clientUserAgent,
      },
      customData: {
        value: customData.value,
        currency: customData.currency || 'USD',
        contentIds: customData.contentIds,
        contentType: customData.contentType || 'product',
        contentName: customData.contentName,
        numItems: customData.numItems,
        orderId: customData.orderId,
      },
    });

    return NextResponse.json({ success });
  } catch (error) {
    console.error('[/api/track] Error processing CAPI event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
