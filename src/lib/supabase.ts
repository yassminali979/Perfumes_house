import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export const DELIVERY_FEE = 100;

export const WHATSAPP_NUMBER = '201008563795'; // +20 Egypt placeholder

export const CONTACT = {
  phone: '+20 100 856 3795',
  whatsapp: '201008563795',
  instagram: 'https://www.instagram.com/perfumes_housee?igsh=MWU0Zm5wNTllYXk1Nw==',
  facebook: 'https://www.facebook.com/share/g/1LvNb1sNfT/',
  email: 'perfumeshouse786@gmail.com',
};

export const BRAND = 'Perfumes House';

export function formatEGP(amount: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount) + ' EGP';
}

export function priceForSize(p: { price_30ml: number; price_50ml: number; price_100ml: number }, size: '30ml' | '50ml' | '100ml'): number {
  if (size === '30ml') return Number(p.price_30ml);
  if (size === '50ml') return Number(p.price_50ml);
  return Number(p.price_100ml);
}

export function stockForSize(p: { stock_30ml: number; stock_50ml: number; stock_100ml: number }, size: '30ml' | '50ml' | '100ml'): number {
  if (size === '30ml') return p.stock_30ml;
  if (size === '50ml') return p.stock_50ml;
  return p.stock_100ml;
}
