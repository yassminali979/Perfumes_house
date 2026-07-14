import { useState } from 'react';
import { Check, MessageCircle, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '../lib/cart';
import { supabase, formatEGP, DELIVERY_FEE, WHATSAPP_NUMBER } from '../lib/supabase';
import { navigate } from '../lib/router';
import type { OrderPayload, OrderItemPayload } from '../types';

export function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    customer_city: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<{ orderId: string; waUrl: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal + DELIVERY_FEE;

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-6 px-5 text-center">
        <h1 className="font-serif text-4xl text-cream-50">Your Cart is Empty</h1>
        <button onClick={() => navigate('#/shop')} className="btn-gold">Shop Fragrances</button>
      </div>
    );
  }

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const orderPayload: OrderPayload = {
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        customer_address: form.customer_address,
        customer_city: form.customer_city,
        notes: form.notes || null,
        subtotal,
        delivery_fee: DELIVERY_FEE,
        total,
        payment_method: 'COD',
        status: 'pending',
      };

      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .maybeSingle();

      if (orderErr) throw orderErr;
      if (!order) throw new Error('Failed to create order.');

      const orderItems: OrderItemPayload[] = items.map((i) => ({
        product_id: i.product_id,
        product_name: `${i.name} (${i.size})`,
        size: i.size,
        unit_price: i.unit_price,
        quantity: i.quantity,
        line_total: i.unit_price * i.quantity,
      }));

      const { error: itemsErr } = await supabase
        .from('order_items')
        .insert(
          orderItems.map((oi) => ({ ...oi, order_id: order.id })),
        );
      if (itemsErr) throw itemsErr;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center px-5">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold-400/10 border border-gold-500/30 flex items-center justify-center mb-6">
            <Check size={36} className="text-gold-300" />
          </div>
          <p className="eyebrow mb-3">Order Confirmed</p>
          <h1 className="font-serif text-4xl text-cream-50 tracking-wide">Thank You</h1>
          <p className="mt-4 text-cream-300/60">
            Your order <span className="text-gold-300">#{placed.orderId.slice(0, 8).toUpperCase()}</span> has been placed.
            A WhatsApp message with your order details has been prepared — please send it to confirm.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={placed.waUrl} target="_blank" rel="noreferrer" className="btn-gold">
              <MessageCircle size={16} /> Open WhatsApp
            </a>
            <button onClick={() => navigate('#/')} className="btn-outline">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-ink-950">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <button
          onClick={() => navigate('#/cart')}
          className="flex items-center gap-2 text-cream-300/60 hover:text-gold-300 text-xs tracking-widest2 uppercase mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Cart
        </button>

        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Final Step</p>
          <h1 className="font-serif text-4xl md:text-5xl text-cream-50 tracking-wide">Checkout</h1>
          <div className="mt-5 h-px w-16 bg-gold-500/50 mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Customer info */}
          <div>
            <h2 className="font-serif text-2xl text-cream-50 mb-6">Delivery Information</h2>
            <div className="space-y-4">
              <Field label="Full Name" required>
                <input
                  type="text"
                  required
                  value={form.customer_name}
                  onChange={(e) => update('customer_name', e.target.value)}
                  className="lux-input"
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Phone Number" required>
                <input
                  type="tel"
                  required
                  value={form.customer_phone}
                  onChange={(e) => update('customer_phone', e.target.value)}
                  className="lux-input"
                  placeholder="01XXXXXXXXX"
                />
              </Field>
              <Field label="Address" required>
                <input
                  type="text"
                  required
                  value={form.customer_address}
                  onChange={(e) => update('customer_address', e.target.value)}
                  className="lux-input"
                  placeholder="Street, building, apartment"
                />
              </Field>
              <Field label="City" required>
                <input
                  type="text"
                  required
                  value={form.customer_city}
                  onChange={(e) => update('customer_city', e.target.value)}
                  className="lux-input"
                  placeholder="Cairo, Giza, Alexandria…"
                />
              </Field>
              <Field label="Notes (optional)">
                <textarea
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  className="lux-input min-h-[90px] resize-none"
                  placeholder="Any delivery instructions…"
                />
              </Field>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <h2 className="font-serif text-2xl text-cream-50 mb-6">Order Summary</h2>
            <div className="bg-ink-800 border border-white/5 p-6">
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.product_id}-${item.size}`} className="flex gap-3">
                    <div className="w-14 h-16 bg-ink-700 overflow-hidden shrink-0">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-cream-50 text-sm truncate">{item.name}</p>
                      <p className="text-gold-300/60 text-xs">{item.size} · ×{item.quantity}</p>
                      <p className="text-cream-200 text-sm mt-0.5">{formatEGP(item.unit_price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/5 my-5" />

              <div className="space-y-2.5">
                <SummaryRow label="Subtotal" value={formatEGP(subtotal)} />
                <SummaryRow label="Delivery" value={formatEGP(DELIVERY_FEE)} />
                <div className="h-px bg-white/5 my-2" />
                <SummaryRow label="Total" value={formatEGP(total)} bold />
              </div>

              {/* Payment method */}
              <div className="mt-6 p-4 border border-gold-500/30 bg-gold-500/5">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-gold-300" />
                  <div>
                    <p className="text-cream-50 text-sm font-medium">Cash on Delivery</p>
                    <p className="text-cream-300/50 text-xs">Pay when you receive your order</p>
                  </div>
                  <Check size={16} className="text-gold-300 ml-auto" />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-red-400/80 text-sm text-center">{error}</p>
              )}

              <button type="submit" disabled={submitting} className="btn-gold w-full mt-6">
                {submitting ? 'Placing Order…' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-[10px] mb-2 block">
        {label} {required && <span className="text-gold-400">*</span>}
      </span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${bold ? 'text-cream-50 font-medium' : 'text-cream-300/60'}`}>{label}</span>
      <span className={`${bold ? 'text-gold-300 font-serif text-2xl' : 'text-cream-100 text-sm'}`}>{value}</span>
    </div>
  );
}
