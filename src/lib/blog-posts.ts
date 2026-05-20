export type BlogPostSummary = {
    title: string
    excerpt: string
    category: string
    image: string
    heroImage: string
    slug: string
    date: string
    readTime: string
}

export const blogPosts: BlogPostSummary[] = [
    {
        title: 'The Complete Guide to Wedding Invitation Etiquette',
        excerpt: 'From wording to timing, everything you need to know about your invitation suite, decoded for modern couples.',
        category: 'Paper Goods',
        image: '/images/blog_invitations.png',
        heroImage: '/images/blog_hero_invitations.png',
        slug: '/blog/wedding-invitation-etiquette',
        date: 'March 8, 2026',
        readTime: '8 min read',
    },
    {
        title: 'Styling Your Wedding Day: Tips From Our Creative Team',
        excerpt: 'How to create a cohesive aesthetic from ceremony to reception, using personalized details that tell your story.',
        category: 'Planning',
        image: '/images/blog_planning.png',
        heroImage: '/images/blog_hero_styling.png',
        slug: '/blog/styling-your-wedding-day',
        date: 'February 22, 2026',
        readTime: '10 min read',
    },
    {
        title: "10 Thoughtful Bridesmaids' Gift Ideas They'll Actually Love",
        excerpt: 'Move beyond the generic and discover personalized keepsakes that celebrate each member of your bridal party.',
        category: 'Gifts',
        image: '/images/blog_dresses.png',
        heroImage: '/images/blog_hero_gifts.png',
        slug: '/blog/bridesmaid-gift-ideas',
        date: 'January 15, 2026',
        readTime: '7 min read',
    },
]
