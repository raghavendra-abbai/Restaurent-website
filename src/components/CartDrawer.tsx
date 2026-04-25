import React, { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: { id: string; name: string; price: number; category: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: { id: string; name: string; price: number; category: string }) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      onClose();
    }, 3000);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + tax;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-amber-900/30 z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {orderPlaced ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-bounce">
              <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 font-serif">Order Placed! 🎉</h2>
            <p className="text-zinc-400 text-lg">Your order has been sent to the kitchen. It will be ready shortly!</p>
            <p className="text-amber-400 mt-4 text-sm">Order #{Math.floor(Math.random() * 9000 + 1000)}</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-amber-900/30">
              <div>
                <h2 className="text-2xl font-bold text-white font-serif">Your Order</h2>
                <p className="text-zinc-400 text-sm">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-4 text-5xl">
                    🍽️
                  </div>
                  <p className="text-zinc-400 text-lg">Your cart is empty</p>
                  <p className="text-zinc-500 text-sm mt-1">Add some delicious items from the menu!</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-zinc-500 text-sm capitalize">{item.category}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-zinc-500 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors"
                        >−</button>
                        <span className="text-white font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors"
                        >+</button>
                      </div>
                      <span className="text-amber-400 font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-amber-900/30 p-6 space-y-4 bg-zinc-900/80">
                <div className="space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>GST (5%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-zinc-700">
                    <span>Grand Total</span>
                    <span className="text-amber-400">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg"
                >
                  Place Order — {formatPrice(grandTotal)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
