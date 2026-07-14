import { Reveal } from '../Reveal';
import { navigate } from '../../lib/router';
import { BRAND } from '../../lib/supabase';

export function BrandStory() {
  return (
    <section className="py-24 md:py-36 bg-ink-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto px-5 md:px-8 text-center relative z-10">
        <Reveal>
          <p className="eyebrow mb-6">Our Heritage</p>
        </Reveal>
        <Reveal delay={120}>
          <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl text-cream-50 leading-[1.3] tracking-wide italic">
            "At {BRAND}, we believe fragrance is more than a scent. It is a personal
            signature that reflects confidence, elegance, and unforgettable memories."
          </blockquote>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 h-px w-16 bg-gold-500/50 mx-auto" />
          <p className="mt-8 text-cream-300/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Each fragrance is composed with the rarest ingredients, sourced from Grasse
            and beyond, and crafted by master perfumers who treat scent as an art form.
            From the first note to the lingering base, every moment is designed to be
            unforgettable.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <button onClick={() => navigate('#/about')} className="btn-outline mt-10">
            Discover Our Story
          </button>
        </Reveal>
      </div>
    </section>
  );
}
