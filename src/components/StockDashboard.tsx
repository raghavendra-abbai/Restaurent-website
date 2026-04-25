import { menuItems } from '../data/menu';
import { TrendingUp, TrendingDown, AlertTriangle, Package, CheckCircle } from 'lucide-react';

function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function StockDashboard() {
  const categories = ['starters', 'mains', 'desserts', 'cocktails', 'beer', 'wine', 'spirits'];
  const categoryEmojis: Record<string, string> = {
    starters: '🍽️', mains: '🍛', desserts: '🍮', cocktails: '🍸', beer: '🍺', wine: '🍷', spirits: '🥃',
  };

  const totalItems = menuItems.length;
  const inStockCount = menuItems.filter(i => i.inStock).length;
  const outOfStockCount = totalItems - inStockCount;
  const lowStockCount = menuItems.filter(i => i.inStock && i.stockCount <= 10).length;
  const totalStockUnits = menuItems.reduce((sum, i) => sum + i.stockCount, 0);
  const totalStockValue = menuItems.reduce((sum, i) => sum + (i.price * i.stockCount), 0);

  const lowStockItems = menuItems.filter(i => i.inStock && i.stockCount <= 10).sort((a, b) => a.stockCount - b.stockCount);
  const outOfStockItems = menuItems.filter(i => !i.inStock);

  return (
    <section id="stock" className="py-20 sm:py-28 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Live Inventory</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
            Stock Dashboard
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Real-time stock status — what's available and what needs restocking.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">{totalItems}</p>
            <p className="text-zinc-400 text-sm">Total Menu Items</p>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-green-400">{inStockCount}</p>
            <p className="text-zinc-400 text-sm">In Stock</p>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-orange-400">{lowStockCount}</p>
            <p className="text-zinc-400 text-sm">Low Stock</p>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-red-400">{outOfStockCount}</p>
            <p className="text-zinc-400 text-sm">Out of Stock</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              Stock by Category
            </h3>
            <div className="space-y-4">
              {categories.map(cat => {
                const catItems = menuItems.filter(i => i.category === cat);
                const totalStock = catItems.reduce((sum, i) => sum + i.stockCount, 0);
                const maxStock = Math.max(...catItems.map(i => i.stockCount), 1);
                const catStockPercent = Math.min((totalStock / (maxStock * catItems.length)) * 100, 100);

                return (
                  <div key={cat} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{categoryEmojis[cat]}</span>
                        <span className="text-white font-semibold capitalize">{cat}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-zinc-400 text-sm">
                          {catItems.filter(i => i.inStock).length}/{catItems.length} items
                        </span>
                        <span className="text-amber-400 font-bold text-sm">{totalStock} units</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          catStockPercent > 60 ? 'bg-green-500' :
                          catStockPercent > 30 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${catStockPercent}%` }}
                      />
                    </div>
                    <div className="mt-3 space-y-2">
                      {catItems.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <span className="text-zinc-500 text-xs w-36 truncate">{item.name}</span>
                          <div className="flex-1 bg-zinc-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                !item.inStock ? 'bg-red-500' :
                                item.stockCount <= 5 ? 'bg-orange-500' :
                                item.stockCount <= 15 ? 'bg-amber-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((item.stockCount / maxStock) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-zinc-400 text-xs w-16 text-right">{formatPrice(item.price)}</span>
                          <span className={`text-xs font-bold w-8 text-right ${
                            !item.inStock ? 'text-red-400' :
                            item.stockCount <= 5 ? 'text-orange-400' :
                            item.stockCount <= 15 ? 'text-amber-400' :
                            'text-green-400'
                          }`}>
                            {item.inStock ? item.stockCount : '0'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {outOfStockItems.length > 0 && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Out of Stock
                </h3>
                <div className="space-y-3">
                  {outOfStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-red-500/10 rounded-lg p-3">
                      <div>
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-red-400/70 text-xs capitalize">{item.category}</p>
                      </div>
                      <span className="text-red-400 text-xs font-bold px-2 py-1 bg-red-500/20 rounded-full">RESTOCK</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lowStockItems.length > 0 && (
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5">
                <h3 className="text-orange-400 font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Low Stock Alert
                </h3>
                <div className="space-y-3">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-orange-500/10 rounded-lg p-3">
                      <div>
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-orange-400/70 text-xs capitalize">{item.category}</p>
                      </div>
                      <span className="text-orange-400 text-xs font-bold px-2 py-1 bg-orange-500/20 rounded-full">
                        {item.stockCount} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5">
              <h3 className="text-white font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Total Stock Units</span>
                  <span className="text-white font-bold">{totalStockUnits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Stock Value</span>
                  <span className="text-amber-400 font-bold">{formatPrice(totalStockValue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Menu Availability</span>
                  <span className="text-green-400 font-bold">{Math.round((inStockCount / totalItems) * 100)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Categories</span>
                  <span className="text-white font-bold">{categories.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
