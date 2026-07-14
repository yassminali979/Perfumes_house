import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { navigate, useRoute } from '../lib/router';
import { useCart } from '../lib/cart';
import { Logo } from './Logo';

const NAV = [
  { label: 'Home', path: '#/' },
  { label: 'Shop', path: '#/shop' },
  { label: 'About', path: '#/about' },
  { label: 'Contact', path: '#/contact' },
];

export function Header() {
  const route = useRoute();
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '#/') return route.name === 'home';
    if (path === '#/shop') return route.name === 'shop' || route.name === 'category' || route.name === 'product';
    return window.location.hash === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-950/90 backdrop-blur-xl border-b border-gold-500/15 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <button
          className="md:hidden text-cream-100"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.slice(0, 2).map((n) => (
            <NavItem key={n.path} {...n} active={isActive(n.path)} />
          ))}
        </nav>

        <button
          onClick={() => navigate('#/')}
          className="hover:opacity-90 transition-opacity"
          aria-label="Perfumes House Home"
        >
          <Logo />
        </button>

        <div className="flex items-center gap-5">
          <nav className="hidden md:flex items-center gap-9">
            {NAV.slice(2).map((n) => (
              <NavItem key={n.path} {...n} active={isActive(n.path)} />
            ))}
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="relative text-cream-100 hover:text-gold-300 transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={21} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-400 text-ink-950 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <nav className="px-5 pt-6 pb-4 flex flex-col gap-4 bg-ink-950/95 backdrop-blur-xl border-t border-gold-500/10">
          {NAV.map((n) => (
            <button
              key={n.path}
              onClick={() => {
                navigate(n.path);
                setMenuOpen(false);
              }}
              className={`text-left text-sm tracking-widest2 uppercase font-medium transition-colors ${
                isActive(n.path) ? 'text-gold-300' : 'text-cream-200 hover:text-gold-200'
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavItem({ label, path, active }: { label: string; path: string; active: boolean }) {
  return (
    <button
      onClick={() => navigate(path)}
      className={`text-xs tracking-widest2 uppercase font-medium transition-colors relative group ${
        active ? 'text-gold-300' : 'text-cream-200 hover:text-gold-200'
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1.5 left-0 h-px bg-gold-400 transition-all duration-300 ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </button>
  );
}
