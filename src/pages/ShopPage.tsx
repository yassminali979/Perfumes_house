import { useProducts, useCategories } from '../lib/hooks';
import { ProductCard } from '../components/ProductCard';
import { navigate } from '../lib/router';
import { useState } from 'react';

export function ShopPage() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? products.filter((p) => p.category?.slug === filter)
    : products;

  return (
    <div className="min-h-screen pt-28 pb-24 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">The Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-cream-50 tracking-wide">Shop All Fragrances</h1>
          <div className="mt-5 h-px w-16 bg-gold-500/50 mx-auto" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <FilterChip label="All" active={!filter} onClick={() => setFilter(null)} />
          {categories.map((c) => (
            <FilterChip key={c.id} label={c.name} active={filter === c.slug} onClick={() => setFilter(c.slug)} />
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse aspect-[4/5] bg-ink-700" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-cream-300/50 py-20">No fragrances found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <button onClick={() => navigate('#/')} className="btn-outline">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 text-xs tracking-widest2 uppercase font-medium border transition-all duration-300 ${
        active
          ? 'bg-gold-400 text-ink-950 border-gold-400'
          : 'border-white/10 text-cream-200 hover:border-gold-500/40 hover:text-gold-200'
      }`}
    >
      {label}
    </button>
  );
}
