import { useState } from 'react';
import { MenuItem, menuItems, categoryLabels } from '../data/menu';
import { useCart } from './CartDrawer';
import { Plus, Check } from 'lucide-react';

const categories = ['starters', 'mains', 'desserts', 'cocktails', 'beer', 'wine', 'spirits'] as const;

function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addToCart({ id: item.id, name: item.name, price: item.price, category: item.category });
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">What We Serve</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            Our Menu
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            From tandoori starters to handcrafted cocktails — authentic Indian flavours meet fine dining.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`group relative bg-zinc-900 border rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                item.inStock
                  ? 'border-zinc-800 hover:border-amber-500/30 hover:shadow-amber-500/5'
                  : 'border-zinc-800/50 opacity-60'
              }`}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags?.map(tag => (
                  <span key={tag} className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${
                    tag === 'popular' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    tag === "chef's pick" ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    tag === 'signature' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    tag === 'premium' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    tag === 'vegetarian' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    tag === 'spicy' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    tag === 'indian' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-zinc-700/50 text-zinc-400'
                  }`}>
                    {tag}
                  </span>
                ))}
                {!item.inStock && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    Out of Stock
                  </span>
                )}
                {item.inStock && item.stockCount <= 5 && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    Low Stock ({item.stockCount})
                  </span>
                )}
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <span className="text-amber-400 font-bold text-xl ml-3 shrink-0">{formatPrice(item.price)}</span>
              </div>

              <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{item.description}</p>

              <button
                onClick={() => item.inStock && handleAdd(item)}
                disabled={!item.inStock}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  item.inStock
                    ? 'bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 active:scale-95'
                    : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                } ${addedItems[item.id] ? '!bg-green-500 !text-white !border-green-500' : ''}`}
              >
                {addedItems[item.id] ? (
                  <>
                    <Check className="w-4 h-4" /> Added!
                  </>
                ) : item.inStock ? (
                  <>
                    <Plus className="w-4 h-4" /> Add to Order
                  </>
                ) : (
                  'Sold Out'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
