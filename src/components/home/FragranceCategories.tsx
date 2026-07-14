import { useCategories } from '../../lib/hooks';
import { SectionHeader } from '../SectionHeader';
import { navigate } from '../../lib/router';
import { Reveal } from '../Reveal';

export function FragranceCategories() {
  const { categories, loading } = useCategories();
  if (!loading && categories.length === 0) return null;
  return (
    <section className="py-24 md:py-32 bg-ink-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Find Your Match"
          title="Fragrance Categories"
          subtitle="Explore our collections, each crafted for a distinct personality and occasion."
        />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-ink-700 animate-pulse" />
              ))
            : categories.map((cat, i) => (
                <Reveal key={cat.id} delay={i * 80}>
                  <button
                    onClick={() => navigate(`#/category/${cat.slug}`)}
                    className="group relative w-full aspect-[3/4] overflow-hidden bg-ink-800 border border-white/5 hover:border-gold-500/40 transition-all duration-500"
                  >
                    {cat.image_url && (
                      <img
                        src={cat.image_url}
                        alt={cat.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                      <h3 className="font-serif text-xl md:text-2xl text-cream-50 group-hover:text-gold-200 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="mt-2 inline-block text-[10px] tracking-widest2 uppercase text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore
                      </span>
                    </div>
                  </button>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
