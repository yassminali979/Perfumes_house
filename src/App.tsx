import { CartProvider } from './lib/cart';
import { useRoute } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const route = useRoute();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-ink-950">
        <Header />
        <main className="flex-1">
          {route.name === 'home' && <HomePage />}
          {route.name === 'shop' && <ShopPage />}
          {route.name === 'category' && <CategoryPage slug={route.slug} />}
          {route.name === 'product' && <ProductPage slug={route.slug} />}
          {route.name === 'cart' && <CartPage />}
          {route.name === 'checkout' && <CheckoutPage />}
          {route.name === 'about' && <AboutPage />}
          {route.name === 'contact' && <ContactPage />}
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
