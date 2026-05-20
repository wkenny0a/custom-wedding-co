import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata = {
    title: 'Wedding Blog | Custom Wedding Co.',
    description: 'Read wedding planning guides, gift ideas, invitation etiquette, and styling tips from Custom Wedding Co.',
}

export default function BlogIndexPage() {
    const [featuredPost, ...morePosts] = blogPosts

    return (
        <main className="bg-cream text-espresso">
            <section className="bg-cream-dark border-b border-gold/20 px-6 py-16 lg:px-12 lg:py-24">
                <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                    <div>
                        <span className="mb-5 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
                            <BookOpen className="h-4 w-4" />
                            Wedding Journal
                        </span>
                        <h1 className="font-display text-4xl leading-tight text-espresso sm:text-5xl lg:text-6xl">
                            Planning Notes, Gift Ideas, and Wedding Detail Guides
                        </h1>
                        <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-espresso/75 sm:text-lg">
                            Browse every Custom Wedding Co. article in one place, from invitation etiquette to bridal party gift ideas and polished day-of styling tips.
                        </p>
                    </div>

                    <Link
                        href={featuredPost.slug}
                        className="group grid overflow-hidden border border-gold/20 bg-cream shadow-[0_18px_48px_rgba(74,44,42,0.10)] transition-transform duration-500 hover:-translate-y-1 md:grid-cols-[0.9fr_1fr]"
                    >
                        <div className="relative min-h-[280px] overflow-hidden bg-cream-dark md:min-h-[360px]">
                            <Image
                                src={featuredPost.heroImage}
                                alt={featuredPost.title}
                                fill
                                priority
                                sizes="(min-width: 1024px) 42vw, 100vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-between p-7 sm:p-9">
                            <div>
                                <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold">
                                    Featured Article
                                </span>
                                <h2 className="mt-4 font-serif text-2xl leading-snug text-espresso transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                                    {featuredPost.title}
                                </h2>
                                <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/70 sm:text-base">
                                    {featuredPost.excerpt}
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-xs text-espresso/60">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {featuredPost.date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {featuredPost.readTime}
                                </span>
                                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-espresso transition-colors duration-300 group-hover:text-gold">
                                    Read article
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="px-6 py-16 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-[1280px]">
                    <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">
                                All Articles
                            </span>
                            <h2 className="mt-3 font-display text-3xl text-espresso sm:text-4xl">
                                Read the Latest
                            </h2>
                        </div>
                        <p className="max-w-lg font-sans text-sm leading-relaxed text-espresso/65">
                            Practical planning guidance for couples choosing meaningful, personalized wedding details.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {morePosts.map((post) => (
                            <Link
                                href={post.slug}
                                key={post.slug}
                                className="group overflow-hidden border border-gold/15 bg-white transition-shadow duration-500 hover:shadow-[0_16px_42px_rgba(74,44,42,0.10)]"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-7">
                                    <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold">
                                        {post.category}
                                    </span>
                                    <h3 className="mt-3 font-serif text-xl leading-snug text-espresso transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 font-sans text-sm leading-relaxed text-espresso/70">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs text-espresso/60">
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
