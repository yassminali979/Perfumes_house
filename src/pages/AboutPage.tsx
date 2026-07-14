import { Reveal } from '../components/Reveal';
import { navigate } from '../lib/router';
import { BRAND } from '../lib/supabase';
import { Award, Leaf, FlaskConical, Globe } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 to-ink-950" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <p className="eyebrow mb-5">Our Story</p>
            <h1 className="font-serif text-5xl md:text-6xl text-cream-50 tracking-wide">
              The Art of <span className="italic text-gold-300">Fragrance</span>
            </h1>
            <div className="mt-6 h-px w-16 bg-gold-500/50 mx-auto" />
            <p className="mt-8 text-cream-200/70 text-lg leading-relaxed">
              At {BRAND}, we believe fragrance is more than a scent. It is a personal
              signature that reflects confidence, elegance, and unforgettable memories.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 bg-ink-900 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-5 md:px-8 space-y-8">
          <Reveal>
            <p className="text-cream-200/70 leading-relaxed text-lg">
              Founded with a singular vision, {BRAND} was born from the desire to create
              fragrances that transcend the ordinary. Each composition is a masterpiece,
              carefully crafted by master perfumers who treat scent as the highest form of art.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-cream-200/70 leading-relaxed text-lg">
              We source the rarest ingredients from around the world — from the oud forests
              of Southeast Asia to the rose fields of Grasse. Every drop tells a story of
              heritage, passion, and uncompromising quality.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-cream-200/70 leading-relaxed text-lg">
              Our bottles are designed as objects of desire, each one a statement of luxury
              that deserves a place on your dressing table. We do not create perfumes — we
              create signatures.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-ink-950">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="section-title">Our Values</h2>
            <div className="mt-5 h-px w-16 bg-gold-500/50 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="text-center p-6 border border-white/5 hover:border-gold-500/30 transition-colors duration-500 h-full">
                  <div className="w-14 h-14 mx-auto rounded-full border border-gold-500/30 flex items-center justify-center mb-5 text-gold-300">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-xl text-cream-50 mb-2">{v.title}</h3>
                  <p className="text-cream-300/60 text-sm leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink-900 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-cream-50 tracking-wide">
              Begin Your Fragrance Journey
            </h2>
            <p className="mt-4 text-cream-300/60">
              Explore our collection and discover the scent that tells your story.
            </p>
            <button onClick={() => navigate('#/shop')} className="btn-gold mt-8">
              Shop The Collection
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

const VALUES = [
  { icon: <Award size={22} strokeWidth={1.5} />, title: 'Craftsmanship', text: 'Each fragrance is composed by hand, with meticulous attention to every note.' },
  { icon: <Leaf size={22} strokeWidth={1.5} />, title: 'Rare Ingredients', text: 'We source the finest materials from the most renowned regions worldwide.' },
  { icon: <FlaskConical size={22} strokeWidth={1.5} />, title: 'Artisanal Process', text: 'Traditional methods meet modern precision in every bottle we create.' },
  { icon: <Globe size={22} strokeWidth={1.5} />, title: 'Global Heritage', text: 'Inspired by fragrance traditions from Grasse to the Far East.' },
];
