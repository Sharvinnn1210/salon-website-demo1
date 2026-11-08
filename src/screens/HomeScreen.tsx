import React from 'react';
import { ScreenId, ServiceItem } from '../types';
import {
  HERO_IMAGE,
  FOUNDER_IMAGE,
  SERVICES,
  ATELIER_STANDARDS,
} from '../data/studioData';
import { SALON_CONFIG, getWhatsAppUrl } from '../config/salonConfig';
import {
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenBooking }) => {
  const signatureServices = SERVICES.filter((s) => s.popular);
  const generalWaUrl = getWhatsAppUrl();

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-6 space-y-6 lg:pr-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-stone-500 font-medium">
                <span>{SALON_CONFIG.locations[0].neighborhood.split(',')[0]}</span>
                <span aria-hidden="true">·</span>
                <span>{SALON_CONFIG.locations[1].neighborhood.split(',')[0]}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.08] tracking-tight text-balance">
                {SALON_CONFIG.tagline}
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
                {SALON_CONFIG.ethosStatement}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-md hover:shadow-lg text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  Request an Appointment
                </button>
                <a
                  href={generalWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-emerald-700" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-stone-950 border border-stone-300 hover:border-stone-900 bg-white/80 rounded-lg transition-all cursor-pointer"
                >
                  <span>Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span>100% Clean Bio-Formulations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-stone-700 shrink-0" />
                  <span>Master Esthetician Care</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Studio Sanctuary Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 aspect-[16/10] bg-stone-100">
                <img
                  src={HERO_IMAGE}
                  alt={`${SALON_CONFIG.brandName} interior sanctuary`}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between text-xs">
                  <span className="font-serif tracking-wider text-stone-200">
                    {SALON_CONFIG.locations[0].name} · {SALON_CONFIG.locations[0].address}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded text-[11px] font-medium tracking-wide">
                    Private Suites
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. RIGOROUS ATELIER PILLARS STRIP */}
      <section className="border-y border-stone-200 bg-white/80 py-10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div className="pt-4 md:pt-0">
              <span className="block font-serif text-3xl sm:text-4xl font-normal text-stone-900 tabular-nums">
                100%
              </span>
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1 block">
                Cruelty-Free Botanicals
              </span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block font-serif text-3xl sm:text-4xl font-normal text-stone-900 tabular-nums">
                15 Min
              </span>
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1 block">
                Diagnostic Opening
              </span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block font-serif text-3xl sm:text-4xl font-normal text-stone-900 tabular-nums">
                0%
              </span>
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1 block">
                Synthetic Silicones
              </span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block font-serif text-3xl sm:text-4xl font-normal text-stone-900 tabular-nums">
                2–4 Hrs
              </span>
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1 block">
                Concierge Response
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE RITUALS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
              Atelier Signatures
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Curated Master Treatments
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-700 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All Treatments & Prices</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded tabular-nums">
                    ${service.price}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-[10px] text-amber-900">
                      {service.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Clock className="w-3.5 h-3.5" />
                      {service.durationMinutes} min
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 font-semibold group-hover:text-amber-950 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <a
                    href={getWhatsAppUrl(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/80 cursor-pointer"
                    title={`Enquire on WhatsApp about ${service.name}`}
                    aria-label={`Enquire on WhatsApp about ${service.name}`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="flex-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-white bg-stone-100 hover:bg-stone-900 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Request Ritual
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ATELIER PHILOSOPHY & FOUNDER SPLIT */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl aspect-[4/3] bg-stone-200">
                <img
                  src={FOUNDER_IMAGE}
                  alt="Founder and Master Esthetician of Lumière Beauty Studio"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 lg:pl-6 order-1 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block">
                The Lumière Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
                “Beauty is not an imposed mask, but a state of harmonious cellular vitality.”
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Founded by master esthetician Hélène Laurent after two decades studying dermal physiology in Paris and Zurich, Lumière approaches aesthetics through the lens of circadian biology. We never compromise the delicate skin lipid barrier with aggressive trauma; instead, we train tissues to regenerate through rhythmic sculptural massage and bio-compatible alpine botanical infusions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-lg border border-stone-200/80">
                  <h4 className="font-serif text-base font-semibold text-stone-900">
                    Circadian Dermal Sync
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Formulations formulated to match your body’s morning defense and nighttime repair cycles.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-stone-200/80">
                  <h4 className="font-serif text-base font-semibold text-stone-900">
                    Sub-Zero & Buccal Sculpt
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Patented manual lymphatic drainage paired with medical cryotherapy for genuine contour without needles.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  <span>Read Our Full Story & Atelier Ethos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. VERIFIED ATELIER STANDARDS (No fabricated reviews) */}
      <section className="border-t border-stone-200 bg-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block">
              Quality Assurance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
              Our Studio Guarantees
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Transparent standards practiced daily across our Manhattan and Parisian treatment rooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ATELIER_STANDARDS.map((standard, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-200/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{standard.badge}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-stone-900">
                    {standard.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {standard.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-8 sm:p-12 lg:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 block">
            Begin Your Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight max-w-2xl mx-auto text-balance">
            Allow us to illuminate your natural beauty
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
            Submit an appointment enquiry online or speak directly with our concierge team on WhatsApp for real-time schedule assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-100 hover:bg-white rounded-lg transition-colors cursor-pointer shadow"
            >
              Request Appointment Online
            </button>
            <a
              href={generalWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 hover:text-emerald-100 border border-emerald-700/80 bg-emerald-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
