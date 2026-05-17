import { NextRequest, NextResponse } from 'next/server'
import {
  buildSupportEmailHtml,
  createConversationId,
  getSupportThreadMessages,
  isLikelyEmail,
  isValidSupportContact,
  recordSupportMessage,
  sanitizeSupportText,
  sendSupportEmail,
} from '@/lib/support-chat'

export const runtime = 'nodejs'

type SupportRequestKind = 'order_tracking' | 'message'

function getRequestKind(value: unknown): SupportRequestKind {
  return value === 'order_tracking' ? 'order_tracking' : 'message'
}

function buildPlainText(rows: Array<[string, string]>) {
  return rows
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const conversationId = sanitizeSupportText(searchParams.get('conversationId'), '')

  if (!conversationId) {
    return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 })
  }

  return NextResponse.json({
    conversationId,
    messages: getSupportThreadMessages(conversationId),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const kind = getRequestKind(body.type)
    const conversationId = sanitizeSupportText(body.conversationId, '') || createConversationId()
    const name = sanitizeSupportText(body.name, 'Wedding Guest')
    const contact = sanitizeSupportText(body.contact)
    const orderNumber = sanitizeSupportText(body.orderNumber)
    const message = sanitizeSupportText(body.message)
    const pageUrl = sanitizeSupportText(body.pageUrl)

    if (!isValidSupportContact(contact)) {
      return NextResponse.json(
        { error: 'Please enter a valid email or phone number.' },
        { status: 400 }
      )
    }

    if (kind === 'message' && !message) {
      return NextResponse.json(
        { error: 'Please enter a message for our concierge team.' },
        { status: 400 }
      )
    }

    const visitorMessage =
      kind === 'order_tracking'
        ? `Order tracking request${orderNumber ? ` for ${orderNumber}` : ''}. Preferred contact: ${contact}.${message ? `\n\n${message}` : ''}`
        : message

    const savedVisitorMessage = recordSupportMessage(conversationId, {
      role: 'visitor',
      body: visitorMessage,
      authorName: name,
    })

    const requestLabel = kind === 'order_tracking' ? 'Order Tracking Request' : 'Live Chat Message'
    const subject = `${requestLabel} [${conversationId}]`
    const rows: Array<[string, string]> = [
      ['Request Type', requestLabel],
      ['Conversation ID', conversationId],
      ['Name', name],
      ['Contact', contact],
      ['Order Number', orderNumber],
      ['Message', message || visitorMessage],
      ['Page URL', pageUrl],
      ['Submitted At', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })],
    ]

    const emailResult = await sendSupportEmail({
      subject,
      text: buildPlainText(rows),
      html: buildSupportEmailHtml(rows),
      replyTo: isLikelyEmail(contact) ? contact : undefined,
    })

    const systemMessage = recordSupportMessage(conversationId, {
      role: 'system',
      body:
        kind === 'order_tracking'
          ? 'Thanks. Our concierge team received your tracking request and will follow up with order details as soon as possible.'
          : 'Thanks. Your question was sent to our concierge team. Replies can appear here once email reply syncing is connected.',
      authorName: 'Custom Wedding Co.',
    })

    return NextResponse.json({
      conversationId,
      delivered: emailResult.delivered,
      providerId: emailResult.providerId,
      messages: [savedVisitorMessage, systemMessage],
    })
  } catch (error) {
    console.error('[/api/support-chat] Error processing support request:', error)
    return NextResponse.json(
      { error: 'Something went wrong sending your message.' },
      { status: 500 }
    )
  }
}
