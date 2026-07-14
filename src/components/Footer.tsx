import { Instagram, Facebook, Mail, Phone, MessageCircle } from 'lucide-react';
import { CONTACT } from '../lib/supabase';
import { navigate } from '../lib/router';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Logo />
            <p className="text-cream-300/60 text-sm leading-relaxed mt-4">
              Luxury fragrances crafted for unforgettable moments. Your signature scent awaits.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <FooterLink onClick={() => navigate('#/')} label="Home" />
              <FooterLink onClick={() => navigate('#/shop')} label="Shop All" />
              <FooterLink onClick={() => navigate('#/about')} label="Our Story" />
              <FooterLink onClick={() => navigate('#/contact')} label="Contact" />
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <FooterLink onClick={() => navigate('#/category/men')} label="Men's Perfumes" />
              <FooterLink onClick={() => navigate('#/category/women')} label="Women's Perfumes" />
              <FooterLink onClick={() => navigate('#/category/unisex')} label="Unisex Perfumes" />
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Connect</h4>
            <div className="flex flex-col gap-3 text-sm text-cream-300/70">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2.5 hover:text-gold-300 transition-colors">
                <Phone size={15} strokeWidth={1.5} /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 hover:text-gold-300 transition-colors">
                <Mail size={15} strokeWidth={1.5} /> {CONTACT.email}
              </a>
              <div className="flex items-center gap-4 pt-1">
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="hover:text-gold-300 transition-colors">
                  <Instagram size={17} strokeWidth={1.5} />
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="hover:text-gold-300 transition-colors">
                  <Facebook size={17} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 text-center">
          <p className="text-cream-300/40 text-xs tracking-widest2 uppercase">
            © {new Date().getFullYear()} Perfumes House. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <li>
      <button onClick={onClick} className="text-cream-300/60 hover:text-gold-300 transition-colors">
        {label}
      </button>
    </li>
  );
}
