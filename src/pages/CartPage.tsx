import { Minus, Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../lib/cart';
import { formatEGP, DELIVERY_FEE } from '../lib/supabase';
import { navigate } from '../lib/router';

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-6 px-5 text-center">
        <h1 className="font-serif text-4xl text-cream-50">Your Cart is Empty</h1>
        <p className="text-cream-300/50 max-w-md">Discover our luxury fragrances and find your signature scent.</p>
        <button onClick={() => navigate('#/shop')} className="btn-gold mt-2">
          Shop Fragrances <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-ink-950">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Shopping Bag</p>
          <h1 className="font-serif text-4xl md:text-5xl text-cream-50 tracking-wide">Your Cart</h1>
          <div className="mt-5 h-px w-16 bg-gold-500/50 mx-auto" />
        </div>

        <div className="space-y-5">
          {items.map((item) => (
            <div
              key={`${item.product_id}-${item.size}`}
              className="flex gap-4 md:gap-6 bg-ink-800 border border-white/5 p-4 md:p-5"
            >
              <button
                onClick={() => navigate(`#/product/${item.slug}`)}
                className="shrink-0"
              >
                <div className="w-24 h-28 md:w-28 md:h-32 bg-ink-700 overflow-hidden">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-cream-50">{item.name}</h3>
                    <p className="text-gold-300 text-xs tracking-widest2 uppercase mt-1">{item.size}</p>
                    <p className="text-cream-200 text-sm mt-2">{formatEGP(item.unit_price)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product_id, item.size)}
                    className="text-cream-300/40 hover:text-gold-300 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                      className="px-3 py-2 text-cream-300 hover:text-gold-300 transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-4 text-sm text-cream-100 min-w-[2.5rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                      className="px-3 py-2 text-cream-300 hover:text-gold-300 transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="text-gold-300 font-medium">{formatEGP(item.unit_price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-10 bg-ink-800 border border-white/5 p-6 md:p-8">
          <div className="space-y-3">
            <Row label="Subtotal" value={formatEGP(subtotal)} />
            <Row label="Delivery" value={formatEGP(DELIVERY_FEE)} />
            <div className="h-px bg-white/5 my-3" />
            <Row label="Total" value={formatEGP(subtotal + DELIVERY_FEE)} bold />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('#/checkout')} className="btn-gold flex-1">
              Proceed to Checkout <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate('#/shop')} className="btn-outline">
              <ArrowLeft size={15} /> Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${bold ? 'text-cream-50 font-medium' : 'text-cream-300/60'}`}>{label}</span>
      <span className={`${bold ? 'text-gold-300 font-medium text-2xl font-serif' : 'text-cream-100 text-sm'}`}>{value}</span>
    </div>
  );
}
