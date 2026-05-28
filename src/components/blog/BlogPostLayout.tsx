import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

interface RelatedArticle {
    title: string
    excerpt: string
    category: string
    image: string
    slug: string
}

interface BlogPostLayoutProps {
    title: string
    category: string
    date: string
    readTime: string
    heroImage: string
    children: React.ReactNode
    relatedArticles: RelatedArticle[]
}

export function BlogPostLayout({
    title,
    category,
    date,
    readTime,
    heroImage,
    children,
    relatedArticles,
}: BlogPostLayoutProps) {
    return (
        <article className="bg-cream">
            {/* Breadcrumb */}
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-8">
                <nav className="flex items-center gap-2 font-sans text-sm text-espresso/60">
                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/#inspiration" className="hover:text-gold transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-espresso/80 truncate max-w-[200px] sm:max-w-none">{title}</span>
                </nav>
            </div>

            {/* Hero */}
            <header className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-8 pb-12">
                <div className="flex flex-col items-center text-center mb-10">
                    <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-4">
                        {category}
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-espresso leading-tight mb-6 max-w-3xl">
                        {title}
                    </h1>
                    <div className="flex items-center gap-6 font-sans text-sm text-espresso/60">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {readTime}
                        </span>
                    </div>
                </div>

                <div className="relative aspect-[16/7] overflow-hidden rounded-sm">
                    <Image
                        src={heroImage}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 to-transparent" />
                </div>
            </header>

            {/* Article Body */}
            <div className="max-w-[780px] mx-auto px-6 lg:px-0 pb-20">
                <div className="prose prose-lg prose-espresso
                    [&_h2]:font-display [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:text-espresso [&_h2]:mt-12 [&_h2]:mb-4
                    [&_h3]:font-serif [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:text-espresso [&_h3]:mt-8 [&_h3]:mb-3
                    [&_p]:font-sans [&_p]:text-[15px] [&_p]:sm:text-base [&_p]:leading-[1.85] [&_p]:text-espresso/80 [&_p]:mb-6
                    [&_ul]:font-sans [&_ul]:text-[15px] [&_ul]:sm:text-base [&_ul]:text-espresso/80 [&_ul]:leading-[1.85] [&_ul]:mb-6 [&_ul]:pl-5
                    [&_ol]:font-sans [&_ol]:text-[15px] [&_ol]:sm:text-base [&_ol]:text-espresso/80 [&_ol]:leading-[1.85] [&_ol]:mb-6 [&_ol]:pl-5
                    [&_li]:mb-2
                    [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:font-serif [&_blockquote]:text-lg [&_blockquote]:sm:text-xl [&_blockquote]:text-espresso/70 [&_blockquote]:my-10
                    [&_strong]:text-espresso [&_strong]:font-semibold
                    [&_hr]:border-gold/20 [&_hr]:my-12
                ">
                    {children}
                </div>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 pb-16">
                <div className="h-px w-16 bg-gold/30" />
                <div className="w-2 h-2 rotate-45 border border-gold/40" />
                <div className="h-px w-16 bg-gold/30" />
            </div>

            {/* More Articles */}
            <section className="bg-cream-dark py-20">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="uppercase tracking-[0.18em] text-gold font-bold text-xs sm:text-sm mb-3">
                            Keep Reading
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl text-espresso">
                            More Inspiration & Ideas
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {relatedArticles.map((article, i) => (
                            <Link
                                href={article.slug}
                                key={i}
                                className="group bg-white border border-gold/10 overflow-hidden hover:shadow-lg transition-shadow duration-500"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="font-sans uppercase tracking-widest text-[0.65rem] font-bold text-gold mb-2 block">
                                        {article.category}
                                    </span>
                                    <h3 className="font-serif text-lg lg:text-xl text-espresso leading-snug mb-2 group-hover:text-gold transition-colors duration-300">
                                        {article.title}
                                    </h3>
                                    <p className="font-sans text-sm text-espresso/70 leading-relaxed mb-3">
                                        {article.excerpt}
                                    </p>
                                    <span className="font-sans uppercase tracking-wider text-xs font-semibold text-espresso group-hover:text-gold transition-colors duration-300">
                                        Read More →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 font-sans uppercase tracking-wider text-xs font-semibold text-espresso hover:text-gold transition-colors duration-300"
                        >
                            <ArrowLeft size={14} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    )
}
