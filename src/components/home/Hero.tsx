import { ArrowRight } from 'lucide-react';
import { navigate } from '../../lib/router';
import { Reveal } from '../Reveal';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          alt="Luxury perfume"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center pt-20">
        <Reveal>
          <p className="eyebrow mb-6 animate-fade-in">Perfumes House · Est. 2024</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-50 leading-[1.05] tracking-wide animate-fade-up">
            Discover Your
            <span className="block italic text-gold-300 mt-1">Signature Scent</span>
          </h1>
        </Reveal>
        <Reveal delay={350}>
          <p className="mt-7 text-cream-200/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Luxury fragrances crafted for unforgettable moments. Each composition is a
            personal signature reflecting confidence, elegance, and timeless memory.
          </p>
        </Reveal>
        <Reveal delay={550}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('#/shop')} className="btn-gold">
              Shop The Collection <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate('#/about')} className="btn-outline">
              Our Story
            </button>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-gold-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
