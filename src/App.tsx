import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { StockDashboard } from './components/StockDashboard';
import { HolidaysHours } from './components/HolidaysHours';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { CartProvider, CartDrawer } from './components/CartDrawer';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="bg-zinc-950 min-h-screen text-white antialiased">
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <main>
          <Hero />
          <MenuSection />
          <StockDashboard />
          <HolidaysHours />
          <About />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
