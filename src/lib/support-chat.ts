export type SupportMessageRole = 'visitor' | 'support' | 'system'

export type SupportMessage = {
  id: string
  role: SupportMessageRole
  body: string
  createdAt: string
  authorName?: string
}

type SupportThread = {
  id: string
  messages: SupportMessage[]
  updatedAt: string
}

type SupportEmailPayload = {
  subject: string
  text: string
  html: string
  replyTo?: string
}

type SupportEmailResult = {
  delivered: boolean
  providerId?: string
  error?: string
}

type SupportGlobal = typeof globalThis & {
  __cwcSupportChatThreads?: Map<string, SupportThread>
}

const SUPPORT_EMAIL = 'info@customweddingco.com'

function getStore() {
  const supportGlobal = globalThis as SupportGlobal

  if (!supportGlobal.__cwcSupportChatThreads) {
    supportGlobal.__cwcSupportChatThreads = new Map()
  }

  return supportGlobal.__cwcSupportChatThreads
}

function getNow() {
  return new Date().toISOString()
}

export function createConversationId() {
  const random = Math.random().toString(36).slice(2, 9)
  return `cwc-${Date.now().toString(36)}-${random}`
}

export function createMessageId() {
  const random = Math.random().toString(36).slice(2, 9)
  return `msg-${Date.now().toString(36)}-${random}`
}

export function sanitizeSupportText(value: unknown, fallback = '') {
  if (typeof value !== 'string') return fallback
  return value.trim().slice(0, 2000)
}

export function getSupportThread(conversationId: string) {
  return getStore().get(conversationId)
}

export function getSupportThreadMessages(conversationId: string) {
  return getSupportThread(conversationId)?.messages ?? []
}

export function recordSupportMessage(
  conversationId: string,
  message: Omit<SupportMessage, 'id' | 'createdAt'> & Partial<Pick<SupportMessage, 'id' | 'createdAt'>>
) {
  const store = getStore()
  const now = getNow()
  const existing = store.get(conversationId)
  const supportMessage: SupportMessage = {
    id: message.id || createMessageId(),
    role: message.role,
    body: message.body,
    authorName: message.authorName,
    createdAt: message.createdAt || now,
  }

  const nextThread: SupportThread = {
    id: conversationId,
    messages: existing ? [...existing.messages, supportMessage] : [supportMessage],
    updatedAt: now,
  }

  store.set(conversationId, nextThread)

  return supportMessage
}

export function isLikelyEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isLikelyPhone(value: string) {
  return value.replace(/[^\d]/g, '').length >= 7
}

export function isValidSupportContact(value: string) {
  return isLikelyEmail(value) || isLikelyPhone(value)
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function buildSupportEmailHtml(rows: Array<[string, string]>) {
  const rowMarkup = rows
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => {
      return `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #EDE5D5; color: #6B6560; font-size: 13px; text-transform: uppercase; letter-spacing: .06em;">${escapeHtml(label)}</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #EDE5D5; color: #4A2C2A; font-size: 15px;">${escapeHtml(value).replace(/\n/g, '<br />')}</td>
        </tr>
      `
    })
    .join('')

  return `
    <div style="font-family: Inter, Arial, sans-serif; background: #F7EFE3; padding: 28px; color: #4A2C2A;">
      <div style="max-width: 640px; margin: 0 auto; background: #F7EFE3; border: 1px solid #EFE3C2; border-radius: 18px; overflow: hidden;">
        <div style="background: #4A2C2A; color: #F7EFE3; padding: 24px 28px;">
          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: .14em; color: #D4B96A;">Custom Wedding Co.</p>
          <h1 style="margin: 8px 0 0; font-family: Georgia, serif; font-size: 28px; font-weight: 500;">Concierge Request</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${rowMarkup}
        </table>
        <div style="padding: 18px 28px; color: #6B6560; font-size: 13px;">
          Reply handling: keep the conversation ID in the subject so the chat reply webhook can attach responses to the visitor's chat screen.
        </div>
      </div>
    </div>
  `
}

export async function sendSupportEmail(payload: SupportEmailPayload): Promise<SupportEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.SUPPORT_FROM_EMAIL || 'Custom Wedding Co. <onboarding@resend.dev>'
  const to = process.env.SUPPORT_TO_EMAIL || SUPPORT_EMAIL

  if (!apiKey) {
    console.warn('[support-chat] RESEND_API_KEY is not set. Support email was not sent.')
    return {
      delivered: false,
      error: 'missing_resend_api_key',
    }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
        reply_to: payload.replyTo,
      }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error('[support-chat] Resend failed:', data)
      return {
        delivered: false,
        error: data?.message || `resend_${response.status}`,
      }
    }

    return {
      delivered: true,
      providerId: data?.id,
    }
  } catch (error) {
    console.error('[support-chat] Error sending support email:', error)
    return {
      delivered: false,
      error: 'send_exception',
    }
  }
}
