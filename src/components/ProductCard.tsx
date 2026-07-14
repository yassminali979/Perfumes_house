import type { ProductWithRelations } from '../types';
import { formatEGP, priceForSize } from '../lib/supabase';
import { navigate } from '../lib/router';

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const img = product.product_images?.[0]?.image_url ?? null;
  const price = priceForSize(product, '50ml');

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`#/product/${product.slug}`)}
      role="button"
      tabIndex={0}
    >
      <div className="relative overflow-hidden bg-ink-700 aspect-[4/5] border border-white/5 transition-all duration-700 group-hover:border-gold-500/40">
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-cream-300/20 font-serif text-5xl">
            {product.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        {(product.is_new || product.is_best_seller || product.featured) && (
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.is_new && <Badge label="New" />}
            {product.is_best_seller && <Badge label="Best Seller" />}
            {product.featured && <Badge label="Featured" />}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="btn-gold w-full">View Product</span>
        </div>
      </div>
      <div className="pt-4 text-center">
        <p className="eyebrow text-[10px] mb-1.5">
          {product.category?.name ?? 'Fragrance'}
        </p>
        <h3 className="font-serif text-xl text-cream-50 tracking-wide group-hover:text-gold-200 transition-colors">
          {product.name}
        </h3>

        <p className="mt-2 text-gold-300 font-medium tracking-wide">{formatEGP(price)}</p>
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block bg-ink-950/80 backdrop-blur-sm border border-gold-500/40 text-gold-200 text-[9px] tracking-widest2 uppercase px-2.5 py-1">
      {label}
    </span>
  );
}
