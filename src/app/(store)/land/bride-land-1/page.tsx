import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Heart, Sparkles, Star, Camera, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'The Proposal Moment She Will Remember Forever | Custom Wedding Co.',
  description:
    'For the bride who wants real emotion. Build a personalized bridesmaid proposal box filled with curated keepsakes she will open, photograph, and keep forever.',
  openGraph: {
    title: 'The Bridesmaid Proposal Box That Makes Them Cry Happy Tears | Custom Wedding Co.',
    description: 'Ditch generic favors. Discover the unboxing trend detail-obsessed brides are saving on Pinterest.',
    images: ['/images/ugc/bridesmaid-review-1.jpeg'],
  },
};

export const dynamic = 'force-dynamic';

const targetProductUrl = '/gifts/prebuilt-bridesmaid-boxs-test-2';

const ugcReviews = [
  {
    image: '/images/ugc/bridesmaid-review-1.jpeg',
    author: 'Clara M. · Boston, MA',
    text: '“When my Maid of Honor opened her box and saw her name embossed in gold, she immediately burst into tears. It wasn’t just a gift—it was a capsule of our 12 years of friendship. The photos we took in the bridal suite with the robes are my favorites from the whole wedding morning.”',
  },
  {
    image: '/images/ugc/bridesmaid-review-2.jpeg',
    author: 'Sarah T. · Seattle, WA',
    text: '“I spent months curating my Pinterest board for the perfect proposal aesthetic, but I dreaded the DIY stress. Building these online took 5 minutes, and they arrived absolutely flawless. The velvet jewelry boxes feel incredibly premium. Best decision I made.”',
  },
  {
    image: '/images/ugc/bridesmaid-review-3.jpeg',
    author: 'Vanessa K. · Austin, TX',
    text: '“Every single girl said yes immediately! Seeing the personalized gold lettering inside the box lid made it feel so luxurious. My girls still use their compact mirrors and robes every single day. If you want a real emotional moment, this is it.”',
  },
];

const checklistPoints = [
  'Select a premium, heavy-weight linen-textured box in your wedding tone',
  'Customize the outside with her name in custom cursive gold script',
  'Add a heartfelt ask inside the lid (e.g., "Will you stand by me, Sarah?")',
  'Fill it with curated keepsakes (Satin Robe, Velvet Case, Compact Mirror, Sleep Mask)',
  'Arrives fully assembled and gift-ready (zero DIY or wrapping stress)',
  'Receive a digital design proof within 24 hours to approve first',
];

const values = [
  {
    icon: <Heart className="w-6 h-6 text-gold" />,
    title: 'Pure Emotion',
    text: "This isn't a throwaway gift. It's an emotional 'thank you' designed to show her how much her presence on your altar means to you.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-gold" />,
    title: 'Pinterest Aesthetic',
    text: 'From the gold-foil lid details to the coordinated dust-rose stuffing, every square inch is styled to look flawless in photos.',
  },
  {
    icon: <Camera className="w-6 h-6 text-gold" />,
    title: 'Wedding Morning Ready',
    text: 'Coordinated satin robes and sleep masks create the perfect behind-the-scenes aesthetic for your getting-ready photos.',
  },
];

export default function BrideLandingPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream text-espresso">
      
      {/* ─── HERO SECTION: EMOTIONAL HOOK ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-espresso py-20 px-4 md:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/bridesmaid_box_lifestyle.png"
            alt="Emotional bridesmaid proposal box unboxing moment"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/50 to-espresso/90" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 rounded-full px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-gold-light font-semibold animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" /> A Pinterest Bride Exclusive
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream tracking-normal leading-[1.05] drop-shadow-xl max-w-4xl mx-auto">
            The Box That Makes Her Cry <br className="hidden md:block" />
            <span className="italic text-gold-pale font-serif">Happy Tears.</span>
          </h1>
          
          <p className="font-serif text-lg md:text-2xl text-cream-dark/90 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
            You’ve been best friends through every chapter of life. When you ask her to stand by you at the altar, make it a moment she’ll hold onto forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full sm:w-auto">
            <Button size="lg" href={targetProductUrl} className="w-full sm:w-auto shadow-2xl hover:scale-105 transition-transform duration-300">
              Build Her Custom Proposal Box
            </Button>
            <Link 
              href="#the-emotion" 
              className="text-cream/80 hover:text-cream font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors py-3"
            >
              See the Unboxing Moments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-10 flex flex-wrap gap-x-8 gap-y-3 justify-center text-xs font-semibold uppercase tracking-[0.16em] text-cream/70">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-gold-light" /> Free Personalization</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-gold-light" /> Digital Proof in 24 Hours</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-gold-light" /> Ships Assembled & Ready</span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: THE PSYCHOLOGY OF THE ASK ────────────────────────── */}
      <section id="the-emotion" className="py-24 px-6 md:px-12 bg-white text-center border-b border-gold/15">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">The Unboxing Moment</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso leading-tight">
            Because a generic card in an empty envelope just isn’t her.
          </h2>
          <p className="font-sans text-base md:text-lg text-espresso/70 leading-relaxed font-light max-w-2xl mx-auto">
            Your bridesmaids are the girls who held your hair back in college, stayed up with you during late-night heart-to-hearts, and celebrated the moment you got engaged. They aren’t just helper hands for the wedding day—they are the keepers of your story. 
          </p>
          <p className="font-sans text-base md:text-lg text-espresso/70 leading-relaxed font-light max-w-2xl mx-auto">
            When they open a Custom Wedding Co. proposal box, they don't just see beautiful gifts. They see their name in gold script, a heartfelt message spelling out your appreciation, and custom self-care pieces designed to spoil them.
          </p>
        </div>
      </section>

      {/* ─── SECTION 2: UGC EMOTIONAL SLIDES ──────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-cream-dark border-b border-gold/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">Real Reactions</span>
            <h2 className="font-serif text-3xl md:text-5xl text-espresso">"She Immediately Said Yes!"</h2>
            <p className="text-espresso/70 font-sans text-sm md:text-base max-w-lg mx-auto">
              See what real-world Pinterest brides created using our interactive proposal box builder.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ugcReviews.map((review, idx) => (
              <article key={idx} className="bg-white border border-gold-pale/40 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(74,44,42,0.06)] flex flex-col h-full transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[4/5] bg-cream-dark w-full">
                  <Image
                    src={review.image}
                    alt={`Real bridesmaid proposal box unboxing review ${idx + 1}`}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-espresso text-cream px-3 py-1 text-[0.6rem] uppercase tracking-widest font-bold rounded-full flex items-center gap-1.5">
                    <Camera className="w-3 h-3 text-gold-light" /> Bride Photo Review
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6">
                  <div className="flex gap-1 text-gold" aria-label="Five Stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="font-serif text-lg leading-relaxed text-espresso/90 flex-1">
                    {review.text}
                  </blockquote>
                  <div className="border-t border-gold-pale/30 pt-4 flex items-center justify-between text-xs font-sans tracking-wide">
                    <span className="font-bold text-espresso">{review.author}</span>
                    <span className="text-gold uppercase font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Verified Order
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT MAKES IT EMOTIONAL (BENEFITS) ───────────────── */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gold/15">
            <Image
              src="/images/meta-ads/meta_ad_1.png"
              alt="Close-up of personalized items in the bridesmaid box"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="space-y-10">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold block mb-3">Designed for Connection</span>
              <h2 className="font-serif text-3xl md:text-5xl text-espresso leading-tight">
                Designed to pamper, built to last.
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-espresso/70 font-light">
                Every detail is chosen specifically to make the unboxing moment breathtaking. No cheap fillers, no throwaway plastic trinkets. Just premium keepsakes she will use and love for years.
              </p>
            </div>

            <div className="space-y-6">
              {values.map((val, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-gold-pale/30 bg-cream/30 hover:bg-cream/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center flex-shrink-0">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-espresso font-semibold">{val.title}</h4>
                    <p className="mt-2 font-sans text-sm text-espresso/70 leading-relaxed font-light">{val.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: THE CHECKLIST (CRO FORMULA) ──────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-cream border-t border-b border-gold/15">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-bold">The Easiest Path</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso">The Zero-Stress Process</h2>
            <p className="font-sans text-sm md:text-base text-espresso/70 max-w-lg mx-auto">
              How we take the pain out of creating a stunning, personalized bridesmaid proposal box.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl md:text-3xl text-espresso">Build it in minutes. We do the rest.</h3>
              <ul className="space-y-4">
                {checklistPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base leading-relaxed text-espresso/80">
                    <span className="w-6 h-6 rounded-full bg-espresso text-cream font-serif text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button size="lg" href={targetProductUrl} className="w-full sm:w-auto">
                  Start Building My Box
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
                  <Image src="/images/ugc/welcome-review-1.jpeg" alt="Proposal box details" fill className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                  <Image src="/images/ugc/bridesmaid-review-3.jpeg" alt="Happy bridesmaid" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                  <Image src="/images/home/bridesmaid_box_lifestyle.png" alt="Finished bridesmaid box" fill className="object-cover" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
                  <Image src="/images/ugc/bridesmaid-review-2.jpeg" alt="Personalized eye mask and robe" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: FINAL HIGH-CRO CALL TO ACTION ────────────────────── */}
      <section className="py-32 px-6 bg-espresso text-center text-cream relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="/images/home/bridesmaid_box_lifestyle.png"
            alt="Gifts inside proposal box background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto border border-gold/30">
            <Gift className="w-8 h-8" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight">
            Ready to Make Her Cry <br className="hidden md:block" />
            <span className="italic text-gold-pale font-serif">Happy Tears?</span>
          </h2>
          
          <p className="font-serif text-lg md:text-xl text-cream-dark/95 leading-relaxed max-w-2xl mx-auto font-light">
            Ditch the generic cardboard packages. Build an elegant, custom bridesmaid proposal box that spells out exactly how much her friendship is cherished.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button size="lg" href={targetProductUrl} className="w-full bg-cream text-espresso hover:bg-gold hover:text-white transition-all shadow-xl">
              Build Your Box Now
            </Button>
            <Link 
              href="/shop" 
              className="w-full sm:w-auto px-6 py-3.5 border border-cream/30 text-cream uppercase text-xs tracking-widest font-bold hover:bg-cream hover:text-espresso transition-colors text-center"
            >
              Explore Other Gifts
            </Link>
          </div>

          <div className="pt-10 flex flex-wrap gap-x-8 gap-y-3 justify-center text-xs font-semibold uppercase tracking-[0.14em] text-cream/60">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-gold text-gold" /> 4.9/5 from 4,200+ Brides</span>
            <span>·</span>
            <span>Digital Proof Sent in 24 Hours</span>
            <span>·</span>
            <span>Bulk Party Savings Included</span>
          </div>
        </div>
      </section>
      
      {/* Mobile Sticky CRO bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-cream/95 border-t border-gold/20 p-3 shadow-2xl backdrop-blur-md flex items-center justify-between lg:hidden">
        <div className="flex flex-col text-left">
          <span className="text-[0.6rem] uppercase tracking-wider text-gold font-bold">Proposal Box</span>
          <span className="text-xs font-semibold text-espresso font-sans">Arrives Gift-Ready</span>
        </div>
        <Button href={targetProductUrl} size="sm" className="px-5 py-2.5 text-xs">
          Build Box
        </Button>
      </div>

    </main>
  );
}
