import { useState } from 'react';
import { Minus, Plus, ArrowLeft, Check, Truck, ShieldCheck } from 'lucide-react';
import { useProduct, useReviews } from '../lib/hooks';
import { formatEGP, priceForSize, stockForSize } from '../lib/supabase';
import { useCart } from '../lib/cart';
import { navigate } from '../lib/router';
import { Stars } from '../components/Stars';
import { Reveal } from '../components/Reveal';
import type { SizeKey } from '../types';

const SIZES: SizeKey[] = ['30ml', '50ml', '100ml'];

export function ProductPage({ slug }: { slug: string }) {
  const { product, loading } = useProduct(slug);
  const { reviews } = useReviews(product?.id ?? null);
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<SizeKey>('50ml');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="animate-pulse text-cream-300/40 font-serif text-2xl">Loading…</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-4">
        <p className="text-cream-300/50">Product not found.</p>
        <button onClick={() => navigate('#/shop')} className="btn-outline">Back to Shop</button>
      </div>
    );
  }

  const images = product.product_images?.length
    ? product.product_images
    : [];
  const currentImg = images[activeImg]?.image_url ?? null;
  const price = priceForSize(product, size);
  const stock = stockForSize(product, size);
  const inStock = stock > 0;

  const handleAdd = () => {
    addItem(
      {
        product_id: product.id,
        name: product.name,
        slug: product.slug,
        size,
        unit_price: price,
        image_url: currentImg,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <button
          onClick={() => navigate('#/shop')}
          className="flex items-center gap-2 text-cream-300/60 hover:text-gold-300 text-xs tracking-widest2 uppercase mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <Reveal>
              <div className="relative aspect-[4/5] bg-ink-800 border border-white/5 overflow-hidden">
                {currentImg ? (
                  <img
                    src={currentImg}
                    alt={product.name}
                    className="h-full w-full object-cover transition-opacity duration-700"
                    key={activeImg}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-cream-300/20 font-serif text-7xl">
                    {product.name.charAt(0)}
                  </div>
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.is_new && <Badge label="New" />}
                  {product.is_best_seller && <Badge label="Best Seller" />}
                </div>
              </div>
            </Reveal>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-24 overflow-hidden border transition-all duration-300 ${
                      activeImg === i ? 'border-gold-500' : 'border-white/5 hover:border-gold-500/40'
                    }`}
                  >
                    <img src={img.image_url} alt={img.alt ?? product.name} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:pt-4">
            <Reveal>
              <p className="eyebrow mb-3">{product.category?.name ?? 'Fragrance'}</p>
              <h1 className="font-serif text-4xl md:text-5xl text-cream-50 tracking-wide">{product.name}</h1>
              <p className="mt-6 text-cream-200/70 leading-relaxed">{product.description}</p>
            </Reveal>

            {/* Fragrance notes */}
            <Reveal delay={120}>
              <div className="mt-8 space-y-4">
                <NoteRow label="Top Notes" notes={product.top_notes} />
                <NoteRow label="Heart Notes" notes={product.heart_notes} />
                <NoteRow label="Base Notes" notes={product.base_notes} />
              </div>
            </Reveal>

            {/* Size */}
            <Reveal delay={200}>
              <div className="mt-8">
                <p className="eyebrow mb-3">Size</p>
                <div className="flex gap-3">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-6 py-3 border text-sm tracking-wide transition-all duration-300 ${
                        size === s
                          ? 'bg-gold-400 text-ink-950 border-gold-400'
                          : 'border-white/10 text-cream-200 hover:border-gold-500/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Price + Quantity */}
            <Reveal delay={280}>
              <div className="mt-8 flex items-center gap-6">
                <span className="font-serif text-3xl text-gold-300">{formatEGP(price)}</span>
                <div className="flex items-center border border-white/10">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2.5 text-cream-300 hover:text-gold-300 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-cream-100 min-w-[2.5rem] text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2.5 text-cream-300 hover:text-gold-300 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              {!inStock && <p className="mt-2 text-red-400/80 text-sm">Out of stock for this size.</p>}
            </Reveal>

            {/* CTA */}
            <Reveal delay={340}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={handleAdd} disabled={!inStock} className="btn-gold flex-1">
                  {added ? (
                    <><Check size={16} /> Added to Cart</>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                <button onClick={() => navigate('#/checkout')} className="btn-outline">
                  Buy Now
                </button>
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal delay={400}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Trust icon={<Truck size={18} />} title="Delivery 100 EGP" subtitle="Cash on delivery" />
                <Trust icon={<ShieldCheck size={18} />} title="Authentic" subtitle="100% original" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="eyebrow mb-3">Customer Voices</p>
              <h2 className="section-title">Reviews</h2>
              <div className="mt-5 h-px w-16 bg-gold-500/50 mx-auto" />
            </div>
            <div className="space-y-5">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 80}>
                  <div className="bg-ink-800 border border-white/5 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-cream-50 font-medium">{r.author_name}</span>
                      <Stars rating={r.rating} />
                    </div>
                    <p className="text-cream-200/70 text-sm leading-relaxed italic">"{r.comment}"</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NoteRow({ label, notes }: { label: string; notes: string[] }) {
  if (!notes || notes.length === 0) return null;
  return (
    <div className="flex gap-4">
      <span className="text-gold-300/70 text-xs tracking-widest2 uppercase w-28 shrink-0 pt-1">{label}</span>
      <div className="flex flex-wrap gap-2">
        {notes.map((n) => (
          <span key={n} className="border border-gold-500/20 text-cream-200/80 text-xs px-3 py-1.5 tracking-wide">
            {n}
          </span>
        ))}
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

function Trust({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 border border-white/5 p-4">
      <span className="text-gold-300">{icon}</span>
      <div>
        <p className="text-cream-50 text-sm font-medium">{title}</p>
        <p className="text-cream-300/50 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}
