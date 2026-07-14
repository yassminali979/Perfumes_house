import { useProducts } from '../../lib/hooks';
import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';
import { Reveal } from '../Reveal';
import { navigate } from '../../lib/router';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  const { products, loading } = useProducts({ featured: true });
  return (
    <section className="py-24 md:py-32 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Curated Selection"
          title="Featured Perfumes"
          subtitle="Handcrafted compositions representing the pinnacle of our perfumery."
        />
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <Reveal className="text-center mt-12">
          <button onClick={() => navigate('#/shop')} className="btn-outline">
            View All Fragrances <ArrowRight size={15} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export function NewArrivals() {
  const { products, loading } = useProducts({ isNew: true });
  if (!loading && products.length === 0) return null;
  return (
    <section className="py-24 md:py-32 bg-ink-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow="Just Arrived" title="New Arrivals" subtitle="The latest additions to our collection, fresh from the atelier." />
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

export function BestSellers() {
  const { products, loading } = useProducts({ bestSeller: true });
  if (!loading && products.length === 0) return null;
  return (
    <section className="py-24 md:py-32 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow="Loved By Many" title="Best Sellers" subtitle="Our most coveted fragrances, adored by connoisseurs worldwide." />
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-ink-700" />
      <div className="pt-4 text-center space-y-2">
        <div className="h-3 w-16 bg-ink-600 mx-auto" />
        <div className="h-5 w-32 bg-ink-600 mx-auto" />
        <div className="h-4 w-20 bg-ink-600 mx-auto" />
      </div>
    </div>
  );
}
