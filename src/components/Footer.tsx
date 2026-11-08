import React, { useState } from 'react';
import { ScreenId } from '../types';
import { SALON_CONFIG, getWhatsAppUrl } from '../config/salonConfig';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const handleNav = (screen: ScreenId) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waUrl = getWhatsAppUrl();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-serif text-2xl tracking-[0.08em] font-medium text-stone-100 uppercase block">
              {SALON_CONFIG.brandName}
            </span>
            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              {SALON_CONFIG.ethosStatement}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-900 bg-stone-100 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                Reserve Treatment
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 rounded-lg transition-colors cursor-pointer"
              >
                Atelier Concierge
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-emerald-300 hover:text-emerald-200 border border-emerald-800/80 hover:border-emerald-600 bg-emerald-950/40 rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Philosophy & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Treatment Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Editorial Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Ateliers - dynamically populated from SALON_CONFIG */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Sanctuaries
            </p>
            <div className="space-y-4 text-xs text-stone-400">
              {SALON_CONFIG.locations.map((loc) => (
                <div key={loc.id}>
                  <strong className="text-stone-200 block text-sm font-serif">{loc.city}</strong>
                  <p>{loc.address}</p>
                  <p>{loc.neighborhood}</p>
                  <p className="mt-1 text-stone-300 font-mono tabular-nums">{loc.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter / The Lumière Gazette */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Private Gazette
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curated seasonal skin formulations, master artisan availability, and private salon salon invitations.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-stone-800/80 border border-stone-700 text-stone-200 placeholder:text-stone-500 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-stone-400 w-full"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to gazette"
                  className="p-2.5 bg-stone-100 hover:bg-white text-stone-900 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-700" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 animate-in fade-in duration-150">
                  Bienvenue. You have been added to our private register.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright & Standards */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Lumière Beauty Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Clean Formulations</span>
            <span aria-hidden="true">·</span>
            <span>Leaping Bunny Certified</span>
            <span aria-hidden="true">·</span>
            <span>HEPA Air Filtration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
