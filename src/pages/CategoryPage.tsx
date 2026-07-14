import { useProducts } from '../lib/hooks';
import { ProductCard } from '../components/ProductCard';
import { navigate } from '../lib/router';
import { Reveal } from '../components/Reveal';
import { ArrowLeft } from 'lucide-react';

export function CategoryPage({ slug }: { slug: string }) {
  const { products, loading } = useProducts({ categorySlug: slug });
  const categoryName = products[0]?.category?.name ?? slug;

  return (
    <div className="min-h-screen pt-28 pb-24 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <button onClick={() => navigate('#/shop')} className="flex items-center gap-2 text-cream-300/60 hover:text-gold-300 text-xs tracking-widest2 uppercase mb-8 transition-colors">
          <ArrowLeft size={14} /> All Fragrances
        </button>

        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-cream-50 tracking-wide capitalize">
            {categoryName.replace('-', ' ')}
          </h1>
          <div className="mt-5 h-px w-16 bg-gold-500/50 mx-auto" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse aspect-[4/5] bg-ink-700" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-cream-300/50 py-20">No fragrances found in this collection.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {products.map((p) => (
              <Reveal key={p.id}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
