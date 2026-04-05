import { Metadata } from 'next'
import { BlogPostLayout } from '@/components/blog/BlogPostLayout'

export const metadata: Metadata = {
    title: 'The Complete Guide to Wedding Invitation Etiquette | Custom Wedding Co.',
    description: 'From wording to timing — everything you need to know about your invitation suite, decoded for modern couples. Expert tips on phrasing, paper choice, and RSVP cards.',
}

const relatedArticles = [
    {
        title: 'Styling Your Wedding Day: Tips From Our Creative Team',
        excerpt: 'How to create a cohesive aesthetic from ceremony to reception, using personalized details that tell your story.',
        category: 'Planning',
        image: '/images/blog_planning.png',
        slug: '/blog/styling-your-wedding-day',
    },
    {
        title: "10 Thoughtful Bridesmaids' Gift Ideas They'll Actually Love",
        excerpt: 'Move beyond the generic — discover personalized keepsakes that celebrate each member of your bridal party.',
        category: 'Gifts',
        image: '/images/blog_dresses.png',
        slug: '/blog/bridesmaid-gift-ideas',
    },
]

export default function WeddingInvitationEtiquettePage() {
    return (
        <BlogPostLayout
            title="The Complete Guide to Wedding Invitation Etiquette"
            category="Paper Goods"
            date="March 8, 2026"
            readTime="8 min read"
            heroImage="/images/blog_hero_invitations.png"
            relatedArticles={relatedArticles}
        >
            <p>
                Your wedding invitations are the very first glimpse your guests will have of your celebration —
                setting the tone, the palette, and the personality of your Big Day long before they step through
                the venue doors. Getting the etiquette right doesn&apos;t mean being stuffy; it means being thoughtful.
                Here&apos;s everything you need to know.
            </p>

            <h2>Setting the Timeline</h2>

            <p>
                Timing is one of the most overlooked parts of invitation etiquette. Send too early and
                guests may forget; too late and they won&apos;t be able to plan. Here&apos;s the golden timeline
                most wedding planners swear by:
            </p>

            <ul>
                <li><strong>Save-the-Dates:</strong> 6–8 months before the wedding (up to 12 months for destination weddings)</li>
                <li><strong>Formal Invitations:</strong> 6–8 weeks before the ceremony</li>
                <li><strong>RSVP Deadline:</strong> 2–3 weeks before the event</li>
            </ul>

            <p>
                If you&apos;re hosting a holiday-weekend wedding, push every milestone back by an additional
                two weeks to account for busy schedules and travel planning.
            </p>

            <h2>Crafting the Perfect Wording</h2>

            <p>
                Traditional invitation wording follows a structured format, but modern couples have more
                freedom than ever. The key is consistency — match the formality of your wording to the
                formality of your event.
            </p>

            <h3>Formal Wording</h3>

            <blockquote>
                <p>
                    Mr. and Mrs. Robert James Harrison<br />
                    request the honour of your presence<br />
                    at the marriage of their daughter<br />
                    Sarah Elizabeth<br />
                    to<br />
                    Michael James Bennett
                </p>
            </blockquote>

            <h3>Modern Wording</h3>

            <blockquote>
                <p>
                    Together with their families,<br />
                    Sarah Harrison & Michael Bennett<br />
                    invite you to celebrate their marriage
                </p>
            </blockquote>

            <p>
                Notice the shift from &ldquo;honour&rdquo; (with a &ldquo;u&rdquo; — a traditional British spelling
                that signals formal events held in a house of worship) to the simpler &ldquo;celebrate.&rdquo;
                Both are perfectly correct; choose whichever aligns with your celebration&apos;s spirit.
            </p>

            <h2>The Essential Invitation Suite</h2>

            <p>
                A complete invitation suite goes beyond just the main card. Here&apos;s what a thoughtfully
                assembled suite typically includes:
            </p>

            <ol>
                <li><strong>The Main Invitation</strong> — the who, what, when, where</li>
                <li><strong>RSVP Card & Envelope</strong> — pre-stamped for guest convenience</li>
                <li><strong>Details / Enclosure Card</strong> — directions, accommodations, registry info, dress code</li>
                <li><strong>Outer Envelope</strong> — formally addressed to each household</li>
                <li><strong>Inner Envelope</strong> (optional) — lists exactly who in the household is invited</li>
            </ol>

            <p>
                For destination weddings, consider adding a travel card with flight suggestions,
                hotel room blocks, and a brief itinerary of weekend events.
            </p>

            <hr />

            <h2>Paper & Printing: Choosing the Right Medium</h2>

            <p>
                The tactile experience of an invitation matters immensely. When a guest slides that
                envelope open, the weight and texture of the paper tells a story before they read
                a single word.
            </p>

            <ul>
                <li><strong>Cotton rag paper</strong> — soft, luxurious edges with a handmade feel; ideal for letterpress and calligraphy</li>
                <li><strong>Double-thick card stock</strong> — rigid and elegant; perfect for foil stamping and flat printing</li>
                <li><strong>Vellum overlays</strong> — translucent sheets that add an ethereal, layered look</li>
                <li><strong>Handmade paper</strong> — deckled edges, organic textures; best for bohemian and garden-inspired weddings</li>
            </ul>

            <p>
                <strong>Pro tip:</strong> Always order 15–20% more invitations than your guest count to
                account for mistakes, last-minute additions, and keepsakes. You&apos;ll thank yourself later.
            </p>

            <h2>Addressing Etiquette</h2>

            <p>
                How you address the envelope is just as important as the invitation inside. Here are
                a few guidelines:
            </p>

            <ul>
                <li><strong>Married couples:</strong> Mr. and Mrs. James Wilson</li>
                <li><strong>Unmarried couple living together:</strong> Ms. Sarah Thompson and Mr. David Garcia (each on their own line)</li>
                <li><strong>Family with children under 18:</strong> The Wilson Family</li>
                <li><strong>Single guest with a plus-one:</strong> Ms. Sarah Thompson and Guest</li>
            </ul>

            <p>
                Hand-calligraphy or professional digital calligraphy for the addressing adds an
                elevated, personal touch that your guests will notice the moment it arrives in
                their mailbox.
            </p>

            <h2>Final Thoughts</h2>

            <p>
                Your invitation suite is more than paper — it&apos;s the prelude to one of the most
                meaningful days of your life. Take the time to choose materials, wording, and details
                that feel authentically yours. Whether you opt for classic formality or modern warmth,
                the best invitation is one that makes every guest feel genuinely welcomed and excited
                to celebrate with you.
            </p>

            <p>
                Ready to create your dream invitation suite? Browse our curated collection of
                personalized paper goods and let us help you set the perfect tone.
            </p>
        </BlogPostLayout>
    )
}
