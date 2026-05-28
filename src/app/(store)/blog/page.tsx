import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const posts = [
  {
    title: 'The Complete Guide to Wedding Invitation Etiquette',
    excerpt: 'From wording to timing, here is how to make your invitation suite feel polished and clear.',
    category: 'Paper Goods',
    image: '/images/blog_invitations.png',
    href: '/blog/wedding-invitation-etiquette',
  },
  {
    title: 'Styling Your Wedding Day',
    excerpt: 'A practical guide to building a cohesive wedding look through personalized details and guest moments.',
    category: 'Planning',
    image: '/images/blog_planning.png',
    href: '/blog/styling-your-wedding-day',
  },
  {
    title: 'Bridesmaid Gift Ideas They Will Actually Love',
    excerpt: 'Personalized keepsakes and proposal-box details that feel thoughtful instead of generic.',
    category: 'Bridal Party Gifts',
    image: '/images/blog_dresses.png',
    href: '/blog/bridesmaid-gift-ideas',
  },
]

export const metadata: Metadata = {
  title: 'Wedding Journal | Custom Wedding Co.',
  description: 'Read wedding planning inspiration, personalization ideas, bridesmaid gift guides, and guest-experience tips from Custom Wedding Co.',
}

export default function BlogPage() {
  return (
    <main className="bg-cream text-espresso">
      <section className="border-b border-gold/20 bg-cream-dark px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold">Wedding Journal</p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Inspiration for a More Personal Wedding</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-espresso/70 sm:text-lg">
            Guides for couples planning personalized wedding details, bridal party gifting, guest favors, and celebration keepsakes.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.href} href={post.href} className="group border border-gold/20 bg-white shadow-sm transition-shadow hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold">{post.category}</p>
                <h2 className="mt-3 font-serif text-2xl leading-tight text-espresso">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-espresso/70">{post.excerpt}</p>
                <span className="mt-5 inline-block font-sans text-xs font-bold uppercase tracking-[0.16em] text-espresso group-hover:text-gold">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
