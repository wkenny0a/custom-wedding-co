import { Metadata } from 'next'
import { BlogPostLayout } from '@/components/blog/BlogPostLayout'

export const metadata: Metadata = {
    title: 'Styling Your Wedding Day: Tips From Our Creative Team | Custom Wedding Co.',
    description: 'How to create a cohesive aesthetic from ceremony to reception, using personalized details that tell your unique love story.',
}

const relatedArticles = [
    {
        title: 'The Complete Guide to Wedding Invitation Etiquette',
        excerpt: 'From wording to timing — everything you need to know about your invitation suite, decoded for modern couples.',
        category: 'Paper Goods',
        image: '/images/blog_invitations.png',
        slug: '/blog/wedding-invitation-etiquette',
    },
    {
        title: "10 Thoughtful Bridesmaids' Gift Ideas They'll Actually Love",
        excerpt: 'Move beyond the generic — discover personalized keepsakes that celebrate each member of your bridal party.',
        category: 'Gifts',
        image: '/images/blog_dresses.png',
        slug: '/blog/bridesmaid-gift-ideas',
    },
]

export default function StylingYourWeddingDayPage() {
    return (
        <BlogPostLayout
            title="Styling Your Wedding Day: Tips From Our Creative Team"
            category="Planning"
            date="February 22, 2026"
            readTime="10 min read"
            heroImage="/images/blog_hero_styling.png"
            relatedArticles={relatedArticles}
        >
            <p>
                A truly unforgettable wedding doesn&apos;t happen by accident — it&apos;s the result of
                intentional styling choices that weave a consistent visual story from the moment
                guests arrive to the final sparkler send-off. Our creative team has styled hundreds
                of celebrations, and today we&apos;re sharing the framework that ties every detail together.
            </p>

            <h2>Start With a Mood, Not a Color</h2>

            <p>
                The most common mistake couples make is choosing a color palette before considering
                the <em>feeling</em> they want their day to evoke. Instead, start by asking yourselves:
            </p>

            <ul>
                <li>Do we want the day to feel romantic or modern? Rustic or refined?</li>
                <li>What season and time of day best captures our energy as a couple?</li>
                <li>Are we drawn to maximalism (lush, layered, opulent) or minimalism (clean, sculptural, curated)?</li>
            </ul>

            <p>
                Once you&apos;ve defined the mood, the palette will follow naturally. A &ldquo;garden romance&rdquo;
                mood leads to dusty rose, sage, and antique gold. A &ldquo;modern editorial&rdquo; mood pulls
                toward monochromatic whites, architectural greenery, and matte black accents.
            </p>

            <h2>The Power of a Design Thread</h2>

            <p>
                A <strong>design thread</strong> is a single motif, pattern, or material that recurs throughout
                your wedding — subtly connecting each touchpoint. This is the secret that separates
                beautiful weddings from truly <em>cohesive</em> ones.
            </p>

            <blockquote>
                <p>
                    &ldquo;Think of your design thread like a musical refrain — guests may not consciously
                    notice it, but it creates a feeling of harmony that ties the entire experience together.&rdquo;
                </p>
            </blockquote>

            <p>Examples of design threads that work beautifully:</p>

            <ul>
                <li><strong>Botanical illustration:</strong> A hand-drawn floral from your invitation suite reappears on your welcome sign, menu cards, and cocktail napkins</li>
                <li><strong>Wax seals:</strong> Your custom monogram seal appears on invitations, escort cards, and favor bags</li>
                <li><strong>Velvet ribbon:</strong> The same dusty mauve ribbon ties your bouquet, wraps your napkins, and adorns your guest book</li>
                <li><strong>Gold leaf:</strong> Gilded details on your cake, your table numbers, and your invitation envelope liners</li>
            </ul>

            <hr />

            <h2>Ceremony Styling</h2>

            <p>
                The ceremony sets the emotional tone for everything that follows. Here are the elements
                that matter most:
            </p>

            <h3>The Altar / Backdrop</h3>

            <p>
                Whether you&apos;re framing a stunning natural vista or creating drama in a blank-slate
                venue, your backdrop should feel like an extension of your design story — not an afterthought.
                Consider asymmetric floral arches, draped fabric panels, or a simple arrangement of
                candles and greenery at varying heights.
            </p>

            <h3>The Aisle</h3>

            <p>
                Line the aisle with elements that echo your design thread. Petals, lanterns, potted
                herbs, or fabric chair ties all work — but choose <em>one</em> statement element rather than
                layering too many. The aisle should draw the eye forward, not compete with the couple.
            </p>

            <h3>Signage</h3>

            <p>
                A welcome sign at the ceremony entrance sets expectations and feels curated. Match the
                sign material to your mood — acrylic for modern, linen for organic, mirror for glamour.
                Use the same fonts and floral elements from your invitation suite for visual continuity.
            </p>

            <h2>Reception Styling</h2>

            <p>
                The reception is where your styling truly comes alive. Here&apos;s how to approach the key areas:
            </p>

            <h3>Tablescaping</h3>

            <p>
                Your table design is the single most impactful element of reception styling. Consider
                layering textures — a linen runner over a satin tablecloth, topped with ceramic chargers,
                crystal stemware, and hand-calligraphed place cards.
            </p>

            <ul>
                <li><strong>Centerpieces:</strong> Vary heights across tables to create visual rhythm. A mix of tall taper candles and low garden arrangements prevents monotony.</li>
                <li><strong>Place settings:</strong> Personalized name cards or small favors at each setting make guests feel individually considered.</li>
                <li><strong>Linen:</strong> Often underestimated, linen color and texture set the foundation for everything else on the table.</li>
            </ul>

            <h3>Lighting</h3>

            <p>
                Lighting is the unsung hero of wedding design. As the sun sets, your venue transforms —
                and the right lighting preserves the mood you&apos;ve built.
            </p>

            <ul>
                <li>Edison-bulb string lights for warm, casual elegance</li>
                <li>Up-lighting in your palette color for dramatic walls</li>
                <li>Candles at every height — votives, pillars, tapers — for intimate warmth</li>
                <li>Fairy-light canopy for a starlit, ethereal effect</li>
            </ul>

            <h3>Personal Details That Elevate</h3>

            <p>
                The finishing touches are what transform a styled wedding into <em>your</em> wedding.
                These are the personalized elements that guests remember years later:
            </p>

            <ol>
                <li><strong>Custom cocktail napkins</strong> with your monogram or wedding date</li>
                <li><strong>A signature drink</strong> named after something meaningful to your relationship</li>
                <li><strong>A guest book</strong> that doubles as a keepsake — a beautiful bound book, a vinyl record, or a Polaroid wall</li>
                <li><strong>Welcome bags</strong> for out-of-town guests, curated with local treats and a handwritten note</li>
                <li><strong>A thoughtful exit</strong> — sparklers, confetti, or dried-flower toss that photographs beautifully</li>
            </ol>

            <h2>Pulling It All Together</h2>

            <p>
                The secret to a beautifully styled wedding isn&apos;t perfection — it&apos;s <em>intentionality</em>.
                Every detail doesn&apos;t need to match, but every detail should feel like it <em>belongs</em>.
                When you lead with mood, repeat your design thread, and layer personal touches throughout,
                the result is a day that feels immersive, emotional, and unmistakably <em>yours</em>.
            </p>

            <p>
                Need help bringing your vision to life? Our team specializes in personalized wedding
                details — from signage to stationery — that tie your entire celebration together
                with effortless elegance.
            </p>
        </BlogPostLayout>
    )
}
