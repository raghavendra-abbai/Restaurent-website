import { ArrowDown, Clock, MapPin, Phone } from 'lucide-react';
import { getTodayStatus } from '../data/holidays';

export function Hero() {
  const todayStatus = getTodayStatus();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(251 191 36) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8">
          <div className={`w-2 h-2 rounded-full ${todayStatus.isCurrentlyOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-amber-300 text-sm font-medium">{todayStatus.message}</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight">
          The Golden
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
            Stein
          </span>
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 font-light">
          Tandoori · Craft Cocktails · Premium Indian Wines 🇮🇳
        </p>
        <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto mb-10">
          Where authentic Indian flavours meet world-class drinks. From Butter Chicken to Biryani, Old Monk to Sula wines — the finest dining experience near Kuppum. 🍻
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#menu"
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 text-lg shadow-lg shadow-amber-500/25"
          >
            🍛 Order Now
          </a>
          <a
            href="#hours"
            className="px-8 py-4 border border-zinc-700 hover:border-amber-500/50 text-white hover:text-amber-400 rounded-xl transition-all text-lg"
          >
            🕐 Opening Hours
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Open Now</p>
              <p className="text-zinc-400 text-xs">{todayStatus.nextOpenTime} — {todayStatus.nextCloseTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Location</p>
              <p className="text-zinc-400 text-xs">Rajpet Road, Kuppum, Karnataka — 563121</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
            <Phone className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Reservations</p>
              <p className="text-zinc-400 text-xs">+91 XXXXXXXX72</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-amber-400/50" />
      </div>
    </section>
  );
}
