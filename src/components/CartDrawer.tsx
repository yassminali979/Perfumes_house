import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/cart';
import { formatEGP, DELIVERY_FEE } from '../lib/supabase';
import { navigate } from '../lib/router';

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-ink-950/70 backdrop-blur-sm z-[60] transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-ink-900 border-l border-gold-500/20 z-[70] flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h3 className="font-serif text-2xl text-cream-50 tracking-wide">Your Cart</h3>
          <button onClick={() => setOpen(false)} className="text-cream-300 hover:text-gold-300 transition-colors">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={40} strokeWidth={1} className="text-cream-300/20" />
            <p className="text-cream-300/50 text-sm">Your cart is empty.</p>
            <button
              onClick={() => {
                setOpen(false);
                navigate('#/shop');
              }}
              className="btn-outline mt-2"
            >
              Discover Fragrances
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div key={`${item.product_id}-${item.size}`} className="flex gap-4">
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate(`#/product/${item.slug}`);
                    }}
                    className="shrink-0"
                  >
                    <div className="w-20 h-24 bg-ink-700 border border-white/5 overflow-hidden">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg text-cream-50 truncate">{item.name}</h4>
                    <p className="text-gold-300 text-xs tracking-widest2 uppercase mt-0.5">{item.size}</p>
                    <p className="text-cream-200 text-sm mt-1">{formatEGP(item.unit_price)}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                          className="px-2 py-1.5 text-cream-300 hover:text-gold-300 transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-sm text-cream-100 min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                          className="px-2 py-1.5 text-cream-300 hover:text-gold-300 transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product_id, item.size)}
                        className="text-cream-300/40 hover:text-gold-300 text-xs tracking-widest2 uppercase transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-white/5 space-y-3">
              <Row label="Subtotal" value={formatEGP(subtotal)} />
              <Row label="Delivery" value={formatEGP(DELIVERY_FEE)} />
              <Row label="Total" value={formatEGP(subtotal + DELIVERY_FEE)} bold />
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('#/checkout');
                }}
                className="btn-gold w-full mt-3"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${bold ? 'text-cream-50 font-medium' : 'text-cream-300/60'}`}>{label}</span>
      <span className={`${bold ? 'text-gold-300 font-medium text-lg' : 'text-cream-100 text-sm'}`}>{value}</span>
    </div>
  );
}
