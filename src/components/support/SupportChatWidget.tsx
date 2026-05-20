'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Loader2,
  Mail,
  MessageCircle,
  PackageSearch,
  Phone,
  Send,
  Sparkles,
  X,
} from 'lucide-react'

type View = 'home' | 'faq' | 'track' | 'message'

type ChatMessage = {
  id: string
  role: 'visitor' | 'support' | 'system'
  body: string
  createdAt: string
  authorName?: string
}

type Question = {
  question: string
  answer: string
}

const STORAGE_KEY = 'cwc-support-chat'

const topQuestions: Question[] = [
  {
    question: 'How long do custom wedding orders take?',
    answer:
      'Most personalized orders receive a digital proof within 1-2 business days. Production begins after approval, and many orders ship within 7-14 business days depending on the item and quantity. If your wedding date is close, send us your date before ordering so we can confirm the best path.',
  },
  {
    question: 'Will I see a proof before production?',
    answer:
      'Yes. Personalized designs include a complimentary proof by email. We do not begin production until your design is approved, so you can catch spelling, date, layout, or color changes before anything is made.',
  },
  {
    question: 'Can you rush an order?',
    answer:
      'Often, yes. Rush availability depends on the product, customization, quantity, and shipping destination. Send us your wedding date, the item you want, and your delivery ZIP code so we can check timing before you place the order.',
  },
  {
    question: 'What can I customize?',
    answer:
      'Customization varies by product, but common options include names, wedding dates, monograms, wording, colors, quantities, and gift box contents. Product pages only show customization fields supported by that item.',
  },
  {
    question: 'What if my order arrives damaged?',
    answer:
      'Message us within 7 days of delivery with your order number and clear photos of the item, packaging, and shipping label. We will review it quickly and help with a replacement or next step.',
  },
]

function mergeMessages(current: ChatMessage[], incoming: ChatMessage[]) {
  const byId = new Map<string, ChatMessage>()

  for (const message of current) {
    byId.set(message.id, message)
  }

  for (const message of incoming) {
    byId.set(message.id, message)
  }

  return Array.from(byId.values()).sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
}

export function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<View>('home')
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)
  const [conversationId, setConversationId] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [contact, setContact] = useState('')
  const [name, setName] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [orderNote, setOrderNote] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const panelTitle = useMemo(() => {
    if (view === 'track') return 'Track an order'
    if (view === 'message') return 'Send us a message'
    if (view === 'faq') return 'Top question'
    return 'How can we help you today?'
  }, [view])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (!saved) return

      const parsed = JSON.parse(saved) as {
        conversationId?: string
        messages?: ChatMessage[]
        contact?: string
        name?: string
      }

      setConversationId(parsed.conversationId || '')
      setMessages(parsed.messages || [])
      setContact(parsed.contact || '')
      setName(parsed.name || '')
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally {
      setHasHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hasHydrated) return

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        conversationId,
        messages,
        contact,
        name,
      })
    )
  }, [contact, conversationId, hasHydrated, messages, name])

  useEffect(() => {
    if (!isOpen || !conversationId) return

    let isCancelled = false

    async function fetchReplies() {
      try {
        const response = await fetch(`/api/support-chat?conversationId=${encodeURIComponent(conversationId)}`)
        if (!response.ok) return

        const data = await response.json()
        if (!isCancelled && Array.isArray(data.messages)) {
          setMessages((current) => mergeMessages(current, data.messages))
        }
      } catch {
        // Reply polling should never interrupt the shopping experience.
      }
    }

    fetchReplies()
    const interval = window.setInterval(fetchReplies, 10000)

    return () => {
      isCancelled = true
      window.clearInterval(interval)
    }
  }, [conversationId, isOpen])

  function openQuestion(question: Question) {
    setActiveQuestion(question)
    setView('faq')
    setError('')
    setNotice('')
  }

  function goHome() {
    setView('home')
    setActiveQuestion(null)
    setError('')
    setNotice('')
  }

  async function submitSupportRequest(type: 'order_tracking' | 'message') {
    setIsSending(true)
    setError('')
    setNotice('')

    try {
      const response = await fetch('/api/support-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          conversationId,
          name,
          contact,
          orderNumber,
          message: type === 'order_tracking' ? orderNote : messageText,
          pageUrl: window.location.href,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong sending your message.')
      }

      setConversationId(data.conversationId || conversationId)
      if (Array.isArray(data.messages)) {
        setMessages((current) => mergeMessages(current, data.messages))
      }

      setNotice(
        type === 'order_tracking'
          ? 'Your order request was sent. We will follow up with tracking details shortly.'
          : 'Your message was sent. Keep this chat open and replies can appear here once support reply syncing is connected.'
      )

      if (type === 'order_tracking') {
        setOrderNumber('')
        setOrderNote('')
      } else {
        setMessageText('')
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Something went wrong.')
    } finally {
      setIsSending(false)
    }
  }

  function handleTrackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitSupportRequest('order_tracking')
  }

  function handleMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitSupportRequest('message')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans text-espresso sm:bottom-5 sm:right-5">
      <div
        className={`absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-[340px] origin-bottom-right overflow-hidden rounded-3xl border border-gold/25 bg-espresso shadow-2xl transition-all duration-500 ease-out sm:w-[340px] ${
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-6 scale-95 opacity-0'
        }`}
      >
        <div className="max-h-[calc(100vh-5.5rem)] overflow-y-auto sm:max-h-[610px]">
          <div className="relative overflow-hidden bg-espresso px-4 pb-5 pt-5 text-cream sm:px-5 sm:pt-6">
            <div className="absolute inset-x-0 top-0 h-20 bg-gold/10" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="font-display text-3xl leading-none tracking-normal text-cream sm:text-4xl">
                  CWC
                </div>
                <p className="mt-3 text-xl font-semibold leading-tight text-cream sm:text-2xl">
                  {panelTitle}
                </p>
              </div>
              {view === 'home' ? (
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-cream/25 p-2 text-cream transition-colors duration-500 hover:border-gold hover:text-gold"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goHome}
                  className="rounded-full border border-cream/25 p-2 text-cream transition-colors duration-500 hover:border-gold hover:text-gold"
                  aria-label="Back to support home"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3 px-3 pb-4 sm:px-4">
            {view === 'home' && (
              <>
                <div className="-mt-4 overflow-hidden rounded-2xl border border-gold/30 bg-cream shadow-lg">
                  {topQuestions.map((item, index) => (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => openQuestion(item)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors duration-500 hover:bg-gold-pale sm:text-base ${
                        index === 0 ? 'ring-2 ring-gold/80' : 'border-t border-gold-pale/60'
                      }`}
                    >
                      <span>{item.question}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-gold" />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setView('track')
                    setError('')
                    setNotice('')
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gold/20 bg-cream p-3 text-left shadow-lg transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-xl"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blush text-espresso">
                      <PackageSearch className="h-5 w-5" />
                    </span>
                    <span className="text-base font-semibold">Track and manage my order</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gold" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setView('message')
                    setError('')
                    setNotice('')
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gold/20 bg-cream p-3 text-left shadow-lg transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-xl"
                >
                  <span className="flex items-center gap-3">
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-espresso font-display text-base text-cream">
                      C
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-cream bg-gold-light" />
                    </span>
                    <span>
                      <span className="block text-base font-semibold">Welcome to Custom Wedding Co.</span>
                      <span className="block text-sm text-gray-600">Send us a message</span>
                    </span>
                  </span>
                  <Send className="h-5 w-5 shrink-0 text-gold" />
                </button>

                <div className="rounded-2xl border border-cream/15 bg-cream/10 p-3 text-xs leading-relaxed text-cream">
                  This chat may be monitored for quality and support. By continuing, you agree that we can use your message and contact details to help with your request.
                </div>
              </>
            )}

            {view === 'faq' && activeQuestion && (
              <div className="-mt-4 rounded-2xl border border-gold/30 bg-cream p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-pale text-espresso">
                    <HelpCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold leading-tight text-espresso">
                      {activeQuestion.question}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{activeQuestion.answer}</p>
                    <button
                      type="button"
                      onClick={() => setView('message')}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors duration-500 hover:bg-espresso-light"
                    >
                      Ask a follow-up
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === 'track' && (
              <form onSubmit={handleTrackSubmit} className="-mt-4 space-y-3 rounded-2xl border border-gold/30 bg-cream p-4 shadow-lg">
                <p className="text-sm leading-relaxed text-gray-600">
                  Enter the email or phone number used at checkout. We will forward your request to our team so they can confirm the latest tracking details.
                </p>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-espresso/70">
                    Email or phone
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 focus-within:border-gold">
                    <Mail className="h-5 w-5 text-gold" />
                    <input
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
                      placeholder="you@example.com or phone number"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-espresso/70">
                    Order number
                  </span>
                  <input
                    value={orderNumber}
                    onChange={(event) => setOrderNumber(event.target.value)}
                    className="w-full rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 text-base outline-none transition-colors duration-500 placeholder:text-gray-400 focus:border-gold"
                    placeholder="Optional, but helpful"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-espresso/70">
                    Note
                  </span>
                  <textarea
                    value={orderNote}
                    onChange={(event) => setOrderNote(event.target.value)}
                    className="min-h-24 w-full resize-none rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 text-base outline-none transition-colors duration-500 placeholder:text-gray-400 focus:border-gold"
                    placeholder="Tell us anything urgent, like your wedding date."
                  />
                </label>

                <StatusMessage error={error} notice={notice} />

                <button
                  type="submit"
                  disabled={isSending}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors duration-500 hover:bg-espresso-light disabled:bg-gray-400"
                >
                  {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageSearch className="h-4 w-4" />}
                  Send tracking request
                </button>
              </form>
            )}

            {view === 'message' && (
              <div className="-mt-4 rounded-2xl border border-gold/30 bg-cream p-4 shadow-lg">
                <div className="mb-4 max-h-52 space-y-3 overflow-y-auto rounded-xl bg-cream-dark p-3">
                  <ChatBubble
                    message={{
                      id: 'welcome',
                      role: 'support',
                      body: 'Hi, welcome to Custom Wedding Co. Ask us anything about customization, proofs, timing, or your order.',
                      createdAt: new Date().toISOString(),
                      authorName: 'Custom Wedding Co.',
                    }}
                  />
                  {messages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                  ))}
                </div>

                <form onSubmit={handleMessageSubmit} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-espresso/70">
                        Name
                      </span>
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 text-base outline-none transition-colors duration-500 placeholder:text-gray-400 focus:border-gold"
                        placeholder="Optional"
                        autoComplete="name"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-espresso/70">
                        Email or phone
                      </span>
                      <div className="flex items-center gap-3 rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 focus-within:border-gold">
                        <Phone className="h-5 w-5 text-gold" />
                        <input
                          value={contact}
                          onChange={(event) => setContact(event.target.value)}
                          className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
                          placeholder="For replies"
                          required
                        />
                      </div>
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-espresso/70">
                      Ask me anything
                    </span>
                    <textarea
                      value={messageText}
                      onChange={(event) => setMessageText(event.target.value)}
                      className="min-h-28 w-full resize-none rounded-xl border border-gold-pale bg-cream-dark px-4 py-3 text-base outline-none transition-colors duration-500 placeholder:text-gray-400 focus:border-gold"
                      placeholder="Type your question here..."
                      required
                    />
                  </label>

                  <StatusMessage error={error} notice={notice} />

                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors duration-500 hover:bg-espresso-light disabled:bg-gray-400"
                  >
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Send message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso text-cream shadow-2xl ring-[3px] ring-cream transition-all duration-500 hover:-translate-y-0.5 hover:bg-espresso-light sm:h-14 sm:w-14"
        aria-label={isOpen ? 'Close support chat' : 'Open support chat'}
      >
        {isOpen ? <ChevronDown className="h-6 w-6" /> : <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
      </button>
    </div>
  )
}

function StatusMessage({ error, notice }: { error: string; notice: string }) {
  if (!error && !notice) return null

  return (
    <div
      className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
        error
          ? 'border-orange/50 bg-blush text-espresso'
          : 'border-gold/40 bg-gold-pale text-espresso'
      }`}
    >
      {error ? <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
      <span>{error || notice}</span>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isVisitor = message.role === 'visitor'
  const isSystem = message.role === 'system'

  return (
    <div className={`flex ${isVisitor ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isVisitor
            ? 'bg-espresso text-cream'
            : isSystem
              ? 'border border-gold/30 bg-gold-pale text-espresso'
              : 'border border-gold/20 bg-cream text-espresso'
        }`}
      >
        {!isVisitor && (
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="h-3 w-3" />
            {message.authorName || 'Support'}
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.body}</p>
      </div>
    </div>
  )
}
