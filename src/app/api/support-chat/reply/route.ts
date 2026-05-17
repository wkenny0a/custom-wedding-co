import { NextRequest, NextResponse } from 'next/server'
import { recordSupportMessage, sanitizeSupportText } from '@/lib/support-chat'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.SUPPORT_CHAT_WEBHOOK_SECRET
  const providedSecret = request.headers.get('x-support-chat-secret')

  if (!configuredSecret || providedSecret !== configuredSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const conversationId = sanitizeSupportText(body.conversationId)
    const message = sanitizeSupportText(body.message)
    const from = sanitizeSupportText(body.from, 'Custom Wedding Co.')

    if (!conversationId || !message) {
      return NextResponse.json(
        { error: 'conversationId and message are required' },
        { status: 400 }
      )
    }

    const savedMessage = recordSupportMessage(conversationId, {
      role: 'support',
      body: message,
      authorName: from,
    })

    return NextResponse.json({
      conversationId,
      message: savedMessage,
    })
  } catch (error) {
    console.error('[/api/support-chat/reply] Error recording support reply:', error)
    return NextResponse.json(
      { error: 'Something went wrong recording the reply.' },
      { status: 500 }
    )
  }
}
