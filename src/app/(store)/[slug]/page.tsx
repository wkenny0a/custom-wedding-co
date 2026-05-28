import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type InfoPage = {
  title: string
  description: string
  eyebrow: string
  intro: string
  sections: {
    title: string
    body: string
  }[]
}

const pages: Record<string, InfoPage> = {
  about: {
    eyebrow: 'Custom Wedding Co.',
    title: 'About Custom Wedding Co.',
    description: 'Personalized wedding details, gift boxes, barware, favors, and keepsakes crafted for modern celebrations.',
    intro:
      'We create personalized wedding details that feel thoughtful, useful, and beautifully made, from bridal party gifts to reception favors and welcome boxes.',
    sections: [
      {
        title: 'What We Make',
        body: 'Our collection focuses on custom wedding gifts, guest-experience details, favor displays, barware, signage, keepsakes, and curated boxes for the people who make your day feel complete.',
      },
      {
        title: 'How We Work',
        body: 'Most personalized products include a digital proof before production, so couples can review names, dates, monograms, artwork, and wording before the final piece is crafted.',
      },
    ],
  },
  'our-story': {
    eyebrow: 'Our Story',
    title: 'Personal Details for the Moments People Remember',
    description: 'Learn the story behind Custom Wedding Co. and our personalized wedding keepsakes.',
    intro:
      'Custom Wedding Co. was built around a simple idea: wedding details should feel as personal as the people receiving them.',
    sections: [
      {
        title: 'Made for Real Celebrations',
        body: 'We design around the moments couples actually care about: the bridesmaid proposal, the guest welcome, the cocktail hour toast, the reception table, and the keepsake someone takes home.',
      },
      {
        title: 'Premium, Not Complicated',
        body: 'Our goal is to make customization feel guided and calm, with polished product options, proofing, and bulk-friendly ordering for wedding parties and events.',
      },
    ],
  },
  'how-to-order': {
    eyebrow: 'How to Order',
    title: 'A Simple Ordering Process for Personalized Wedding Details',
    description: 'How to order personalized wedding products from Custom Wedding Co.',
    intro:
      'Choose your product, add personalization, review any available options, and place your order. For personalized pieces, proofing details are handled before production where applicable.',
    sections: [
      {
        title: '1. Choose Your Detail',
        body: 'Start with the product, category, or gift box that matches your wedding moment, whether that is favors, barware, bridal party gifts, welcome boxes, or keepsakes.',
      },
      {
        title: '2. Add Personalization',
        body: 'Add names, initials, dates, artwork, lid messages, colors, or monogram details through the product options shown on the product or builder page.',
      },
      {
        title: '3. Review and Checkout',
        body: 'Confirm quantities, timing, and shipping details at checkout. If your event date is close, contact us before placing a large personalized order.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Need Help With an Order or Event Timeline?',
    description: 'Contact Custom Wedding Co. for order help, product questions, proofing, and event timelines.',
    intro:
      'Send us your product question, event date, quantity, and any personalization details so we can help quickly.',
    sections: [
      {
        title: 'Email',
        body: 'For order help, custom requests, and event timing questions, email info@customweddingco.com.',
      },
      {
        title: 'Before You Reach Out',
        body: 'Include your event date, desired quantity, product name, and any artwork or wording notes. That helps us give a more useful answer on the first reply.',
      },
    ],
  },
  'proofing-process': {
    eyebrow: 'Proofing Process',
    title: 'Digital Proofs Before Production',
    description: 'Learn how Custom Wedding Co. handles digital proofs for personalized wedding products.',
    intro:
      'For eligible personalized items, we prepare a digital proof so you can review key design details before production begins.',
    sections: [
      {
        title: 'What to Review',
        body: 'Check names, initials, dates, monograms, spelling, layout, and any artwork details carefully. Proof approval helps us move your order into production.',
      },
      {
        title: 'Timing',
        body: 'Proofing adds a quality-control step, so ordering early is best for wedding timelines, bulk favors, and bridal party gifts.',
      },
    ],
  },
  'shipping-returns': {
    eyebrow: 'Shipping & Returns',
    title: 'Shipping and Returns for Wedding Orders',
    description: 'Shipping and return guidance for Custom Wedding Co. personalized wedding products.',
    intro:
      'Because many items are personalized or event-specific, please review product timing and customization details carefully before ordering.',
    sections: [
      {
        title: 'Shipping',
        body: 'Shipping timing can vary by product type, quantity, customization, and event season. If your date is close, contact us before placing your order.',
      },
      {
        title: 'Returns',
        body: 'Personalized items are typically made for your event and may not be eligible for standard returns. If something arrives damaged or incorrect, contact us with photos and your order details.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about Custom Wedding Co. personalization, proofing, bulk orders, and timing.',
    intro:
      'Here are the most common things couples ask before ordering personalized wedding details and gift boxes.',
    sections: [
      {
        title: 'Can I personalize each item?',
        body: 'Most featured products include personalization options such as names, dates, initials, monograms, colors, artwork, or custom wording. Available options are shown on each product page.',
      },
      {
        title: 'Do you support bulk orders?',
        body: 'Yes. Many wedding favor, barware, and gift-box products are bulk-friendly. Larger orders should be placed early so production and proofing have enough time.',
      },
      {
        title: 'Will I see a proof?',
        body: 'Eligible personalized items include a digital proof before production so the design can be reviewed before your order is made.',
      },
    ],
  },
  'real-weddings': {
    eyebrow: 'Real Weddings',
    title: 'Real Wedding Details and Guest Moments',
    description: 'Real wedding inspiration from Custom Wedding Co. products and personalized event details.',
    intro:
      'This space is for guest-experience ideas, bridal party gifting moments, and personalized details from real celebrations.',
    sections: [
      {
        title: 'Get Inspired',
        body: 'Browse our shop and wedding journal for ideas you can bring into your ceremony, reception, welcome party, or bridal party gifting moment.',
      },
    ],
  },
  press: {
    eyebrow: 'Press',
    title: 'Press and Partnerships',
    description: 'Press, collaborations, and partnership inquiries for Custom Wedding Co.',
    intro:
      'For press, editorial, creator, or partnership inquiries, please include your publication, timeline, and the products or story angle you are interested in.',
    sections: [
      {
        title: 'Media Inquiries',
        body: 'Email info@customweddingco.com with the subject line Press Inquiry so the request can be reviewed by the right person.',
      },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = pages[slug]
  if (!page) {
    return {
      title: 'Custom Wedding Co.',
    }
  }

  return {
    title: `${page.title} | Custom Wedding Co.`,
    description: page.description,
  }
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug]
  if (!page) notFound()

  return (
    <main className="bg-cream text-espresso">
      <section className="border-b border-gold/20 bg-cream-dark px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">{page.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{page.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-espresso/70 sm:text-lg">{page.intro}</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-4xl gap-5">
          {page.sections.map((section) => (
            <article key={section.title} className="border border-gold/20 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-espresso">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-espresso/70 sm:text-base">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center bg-espresso px-6 font-sans text-xs font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-espresso-light"
          >
            Shop Wedding Details
          </Link>
          <a
            href="mailto:info@customweddingco.com"
            className="inline-flex h-12 items-center justify-center border border-espresso px-6 font-sans text-xs font-bold uppercase tracking-[0.16em] text-espresso transition-colors hover:border-gold hover:text-gold"
          >
            Email Us
          </a>
        </div>
      </section>
    </main>
  )
}
