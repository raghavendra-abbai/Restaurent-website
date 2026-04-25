import { Beer, UtensilsCrossed, Users, Star, Music, PartyPopper, Coffee } from 'lucide-react';

export function About() {
  const stats = [
    { icon: <Beer className="w-6 h-6" />, value: '50+', label: 'Craft Drinks' },
    { icon: <UtensilsCrossed className="w-6 h-6" />, value: '40+', label: 'Menu Items' },
    { icon: <Users className="w-6 h-6" />, value: '50K+', label: 'Happy Guests' },
    { icon: <Star className="w-6 h-6" />, value: '4.7', label: 'Zomato Rating' },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Our Story</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">
              More Than Just a Bar
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
              <p>
                The Golden Stein began with a simple idea — a great bar should be more than just drinks,
                it should be a <span className="text-white font-medium">community</span>.
              </p>
              <p>
                From our tandoori starters to our handcrafted cocktails, every detail is designed
                to make you feel right at home. Our kitchen sources local ingredients, our bartenders
                experiment with seasonal Indian flavours, and our doors are always open.
              </p>
              <p>
                Whether you're here for a quick pint after work or a full dinner with friends,
                we've got the perfect spot waiting for you. Come, grab a seat! 🍻
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: <Music className="w-4 h-4" />, title: 'Live Music', desc: 'Every Fri & Sat' },
                { icon: <PartyPopper className="w-4 h-4" />, title: 'DJ Nights', desc: 'Thu — Sat' },
                { icon: <Coffee className="w-4 h-4" />, title: 'Sunday Brunch', desc: '10 AM — 3 PM' },
                { icon: <Beer className="w-4 h-4" />, title: 'Happy Hour', desc: 'Daily 4 — 7 PM' },
              ].map((feature, i) => (
                <div key={i} className="bg-zinc-800/50 border border-zinc-700/30 rounded-xl p-4 hover:border-amber-500/20 transition-colors">
                  <div className="text-amber-400 mb-2">{feature.icon}</div>
                  <p className="text-white font-semibold text-sm">{feature.title}</p>
                  <p className="text-zinc-500 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-zinc-800 border border-zinc-700/50 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-colors">
                  <div className="text-amber-400 mb-3 flex justify-center">{stat.icon}</div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-zinc-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6 sm:p-8">
              <blockquote className="text-amber-200/80 text-lg italic font-serif leading-relaxed">
                "Good food, great drinks, and even better company. The Golden Stein is the heart of
                our neighbourhood — we wouldn't have it any other way."
              </blockquote>
              <p className="text-amber-400 text-sm font-semibold mt-4">— Rahul & Priya, Founders</p>
            </div>

            <div className="bg-zinc-800 border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-white font-bold text-xl mb-2">Get In Touch</h3>
              <div className="space-y-3 text-zinc-400">
                <p>📍 Rajpet Road, Kuppum, Karnataka — 563121</p>
                <p>📞 <a href="tel:+91XXXXXXXX72" className="text-amber-400 hover:underline">+91 XXXXXXXX72</a></p>
                <p>✉️ <a href="mailto:contact@goldenstein.in" className="text-amber-400 hover:underline">contact@goldenstein.in</a></p>
                <p>📸 <a href="#" className="text-amber-400 hover:underline">@thegoldenstein</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
