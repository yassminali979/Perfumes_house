import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'shop' }
  | { name: 'category'; slug: string }
  | { name: 'product'; slug: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'about' }
  | { name: 'contact' };

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean) return { name: 'home' };
  const parts = clean.split('/');
  if (parts[0] === 'shop') return { name: 'shop' };
  if (parts[0] === 'category' && parts[1]) return { name: 'category', slug: parts[1] };
  if (parts[0] === 'product' && parts[1]) return { name: 'product', slug: parts[1] };
  if (parts[0] === 'cart') return { name: 'cart' };
  if (parts[0] === 'checkout') return { name: 'checkout' };
  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'contact') return { name: 'contact' };
  return { name: 'home' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export function navigate(path: string) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
}

export function hrefFor(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'shop':
      return '#/shop';
    case 'category':
      return `#/category/${route.slug}`;
    case 'product':
      return `#/product/${route.slug}`;
    case 'cart':
      return '#/cart';
    case 'checkout':
      return '#/checkout';
    case 'about':
      return '#/about';
    case 'contact':
      return '#/contact';
  }
}
