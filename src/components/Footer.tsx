import { Beer, Heart, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">G</span>
              </div>
              <span className="text-white font-serif font-bold text-xl">
                The Golden <span className="text-amber-400">Stein</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Craft cocktails, tandoori delicacies, and premium Indian wines since 2020. Kuppum's finest dining and nightlife destination.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-zinc-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors text-zinc-400 hover:text-black text-sm font-bold">
                IG
              </a>
              <a href="#" className="w-9 h-9 bg-zinc-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors text-zinc-400 hover:text-black text-sm font-bold">
                FB
              </a>
              <a href="#" className="w-9 h-9 bg-zinc-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors text-zinc-400 hover:text-black text-sm font-bold">
                YT
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Full Menu', 'Stock Status', 'Hours & Festivals', 'About Us', 'Table Booking', 'Private Events'].map(link => (
                <li key={link}>
                  <a href="#" className="text-zinc-500 hover:text-amber-400 text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex justify-between"><span>Mon — Wed</span><span>11 AM — 11:30 PM</span></li>
              <li className="flex justify-between"><span>Thursday</span><span>11 AM — 12 AM</span></li>
              <li className="flex justify-between"><span>Friday</span><span>11 AM — 1 AM</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>10 AM — 1 AM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>10 AM — 11 PM</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Rajpet Road, Kuppum, Karnataka — 563121</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+91XXXXXXXX72" className="hover:text-amber-400 transition-colors">+91 XXXXXXXX72</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:contact@goldenstein.in" className="hover:text-amber-400 transition-colors">contact@goldenstein.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm flex items-center gap-1">
            © 2026 The Golden Stein. Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Bangalore 🇮🇳
          </p>
          <div className="flex items-center gap-2 text-zinc-600 text-sm">
            <Beer className="w-4 h-4" />
            <span>Must be 21+ to order alcohol. Drink responsibly. Please do not drink and drive.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
