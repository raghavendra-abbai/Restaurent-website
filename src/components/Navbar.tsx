import { useState } from 'react';
import { useCart } from './CartDrawer';
import { Menu, X, ShoppingCart } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#stock', label: 'Stock' },
  { href: '#hours', label: 'Hours' },
  { href: '#about', label: 'About' },
];

export function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.onscroll = () => setScrolled(window.scrollY > 50);
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
      scrolled ? 'bg-zinc-950/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-amber-900/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <span className="text-black font-bold text-sm sm:text-lg">G</span>
            </div>
            <span className="text-white font-serif font-bold text-lg sm:text-xl tracking-wide">
              The Golden <span className="text-amber-400">Stein</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-300 hover:text-amber-400 transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onCartOpen}
              className="relative p-2 text-zinc-300 hover:text-amber-400 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onCartOpen}
              className="relative p-2 text-zinc-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-zinc-300"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-zinc-950/98 backdrop-blur-lg border-t border-amber-900/20 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 rounded-lg transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
