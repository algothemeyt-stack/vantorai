import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { CategoriesSection } from './components/home/CategoriesSection';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { MidBannerPromo } from './components/home/MidBannerPromo';
import { TrustSection } from './components/home/TrustSection';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { ShopPage } from './pages/ShopPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PRODUCTS } from './config/products';

function MainApp() {
  // Current route/path state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Category filter state on home page
  const [homeSelectedCategory, setHomeSelectedCategory] = useState<string | null>(null);

  const { isCheckoutOpen, checkoutItems, closeCheckout } = useCart();

  // Handle browser popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if currentPath matches product detail: /products/:slug
  const productMatch = currentPath.match(/^\/products\/([a-zA-Z0-9_-]+)$/);
  const activeProductSlug = productMatch ? productMatch[1] : null;
  const currentProduct = activeProductSlug
    ? PRODUCTS.find((p) => p.slug.toLowerCase() === activeProductSlug.toLowerCase())
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* 3. Main Content Router */}
      <main className="flex-1">
        {currentProduct ? (
          /* Dedicated Product Detail Page */
          <ProductDetailView
            product={currentProduct}
            onBack={() => navigateTo('/')}
            onSelectProduct={(slug) => navigateTo(`/products/${slug}`)}
          />
        ) : currentPath === '/shop' ? (
          /* Shop Page */
          <ShopPage onSelectProduct={(slug) => navigateTo(`/products/${slug}`)} />
        ) : currentPath === '/why-us' ? (
          /* Why Us Page */
          <WhyUsPage onExplorePlans={() => navigateTo('/shop')} />
        ) : currentPath === '/reviews' ? (
          /* Reviews Page */
          <ReviewsPage />
        ) : currentPath === '/faq' ? (
          /* FAQ Page */
          <FaqPage />
        ) : currentPath === '/contact' ? (
          /* Contact Page */
          <ContactPage />
        ) : (
          /* Home Page */
          <>
            {/* Hero Section */}
            <Hero
              onExplorePlans={() => {
                const el = document.getElementById('products-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo('/shop');
                }
              }}
              onViewProducts={() => navigateTo('/shop')}
              onSelectProduct={(slug) => navigateTo(`/products/${slug}`)}
            />

            {/* Categories Section */}
            <CategoriesSection
              selectedCategory={homeSelectedCategory}
              onSelectCategory={(cat) => {
                setHomeSelectedCategory(cat);
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Explore AI Products (Featured) */}
            <FeaturedProducts
              onSelectProduct={(slug) => navigateTo(`/products/${slug}`)}
              filteredCategory={homeSelectedCategory}
            />

            {/* Mid Banner Spotlight with Countdown (Google AI ₹950 flat offer) */}
            <MidBannerPromo
              onSelectProduct={(slug) => navigateTo(`/products/${slug}`)}
            />

            {/* Trust & Guarantees Section */}
            <TrustSection />
          </>
        )}
      </main>

      {/* 4. Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal onSelectProduct={(slug) => navigateTo(`/products/${slug}`)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        items={checkoutItems}
      />

      {/* 5. Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
