import { Quote } from 'lucide-react';
import { useFeaturedReviews } from '../../lib/hooks';
import { SectionHeader } from '../SectionHeader';
import { Reveal } from '../Reveal';
import { Stars } from '../Stars';

type FeaturedReview = {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  created_at: string;
  product: { name: string } | null;
};

export function CustomerReviews() {
  const { reviews, loading } = useFeaturedReviews(6) as { reviews: FeaturedReview[]; loading: boolean };
  if (!loading && reviews.length === 0) return null;
  return (
    <section className="py-24 md:py-32 bg-ink-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Voices Of Elegance"
          title="Customer Reviews"
          subtitle="What our discerning clients say about their signature scents."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-ink-800 border border-white/5 p-7 h-44 animate-pulse" />
              ))
            : reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 80}>
                  <div className="bg-ink-800 border border-white/5 p-7 h-full flex flex-col hover:border-gold-500/30 transition-colors duration-500">
                    <Quote size={22} className="text-gold-500/40 mb-4" />
                    <p className="text-cream-200/80 text-sm leading-relaxed flex-1 italic">
                      "{r.comment}"
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-cream-50 font-medium text-sm">{r.author_name}</p>
                        {r.product && (
                          <p className="text-gold-300/60 text-xs mt-0.5">{r.product.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
