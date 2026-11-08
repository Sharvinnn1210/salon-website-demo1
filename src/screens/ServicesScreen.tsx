import React, { useState } from 'react';
import { ScreenId, ServiceItem } from '../types';
import { SERVICES, ADDONS } from '../data/studioData';
import { getWhatsAppUrl } from '../config/salonConfig';
import {
  Clock,
  Sparkles,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  SlidersHorizontal,
  MessageCircle,
} from 'lucide-react';

interface ServicesScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  // Diagnostic Quiz State
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizFocus, setQuizFocus] = useState<string>('skin');
  const [quizTime, setQuizTime] = useState<string>('60-90');
  const [quizGoal, setQuizGoal] = useState<string>('glow');
  const [quizResult, setQuizResult] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'facial', label: 'Facial Aesthetics' },
    { id: 'hair', label: 'Couture Hair' },
    { id: 'brows-lashes', label: 'Brows & Lashes' },
    { id: 'nails', label: 'Nails & Hands' },
    { id: 'bridal', label: 'Bridal & Private' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory =
      selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keyBotanicals.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const runDiagnosticQuiz = () => {
    let match: ServiceItem | undefined;
    if (quizFocus === 'hair') {
      match = SERVICES.find((s) => s.id === 'couture-balayage');
    } else if (quizFocus === 'brows') {
      match = SERVICES.find((s) => s.id === 'keratin-brow-architecture');
    } else if (quizFocus === 'bridal') {
      match = SERVICES.find((s) => s.id === 'bridal-couture-preview');
    } else {
      if (quizTime === 'quick') {
        match = SERVICES.find((s) => s.id === 'lumiere-glow-express');
      } else {
        match = SERVICES.find((s) => s.id === 'grand-cru-facial');
      }
    }
    setQuizResult(match || SERVICES[0]);
  };

  return (
    <div className="space-y-20 pb-24">
      {/* 1. HEADER */}
      <section className="px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            The Treatment Menu
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.1] text-balance">
            Bespoke Rituals For Skin, Hair & Form
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Every appointment begins with a private diagnostic consultation. All protocols utilize certified biodynamic botanicals and hospital-grade sterilization.
          </p>
        </div>
      </section>

      {/* 2. DIAGNOSTIC RECOMENDER ACCORDION / TOOL */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 block">
                Bespoke Diagnostic
              </span>
              <h3 className="font-serif text-2xl text-white">
                Uncertain Which Treatment Suits Your Current Need?
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Answer 3 quick preferences to receive our master esthetician’s recommendation.
              </p>
            </div>
            <button
              onClick={() => setQuizOpen(!quizOpen)}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-100 hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
            >
              {quizOpen ? 'Close Diagnostic' : 'Start Diagnostic Tool'}
            </button>
          </div>

          {quizOpen && (
            <div className="mt-8 pt-6 border-t border-stone-800 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Question 1 */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
                    1. Primary Focus
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'skin', label: 'Cellular Skin Radiance' },
                      { id: 'hair', label: 'Couture Hair & Color' },
                      { id: 'brows', label: 'Brows & Lash Sculpt' },
                      { id: 'bridal', label: 'Bridal / Event Glow' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setQuizFocus(opt.id)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                          quizFocus === opt.id
                            ? 'bg-white text-stone-900 border-white font-medium'
                            : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
                    2. Available Window
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'quick', label: '60 Min (Targeted Express)' },
                      { id: '60-90', label: '90 Min (Standard Full Ritual)' },
                      { id: 'long', label: '120–180 Min (Deep Immersion)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setQuizTime(opt.id)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                          quizTime === opt.id
                            ? 'bg-white text-stone-900 border-white font-medium'
                            : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
                    3. Desired Outcome
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'glow', label: 'Instant Glass-Skin Glow' },
                      { id: 'sculpt', label: 'Firming & Facial Sculpt' },
                      { id: 'reset', label: 'Detox & Deep Barrier Repair' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setQuizGoal(opt.id)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                          quizGoal === opt.id
                            ? 'bg-white text-stone-900 border-white font-medium'
                            : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-800">
                <button
                  onClick={runDiagnosticQuiz}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-amber-300 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                >
                  Calculate My Ideal Treatment
                </button>

                {quizResult && (
                  <div className="bg-stone-800/90 border border-stone-700 p-4 rounded-xl flex items-center justify-between gap-4 w-full sm:w-auto flex-1">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-amber-300 block">
                        Recommended For You:
                      </span>
                      <strong className="font-serif text-sm text-white">
                        {quizResult.name}
                      </strong>
                      <span className="text-xs text-stone-400 block tabular-nums">
                        ${quizResult.price} · {quizResult.durationMinutes} min
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                      <a
                        href={getWhatsAppUrl(quizResult.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 hover:text-emerald-100 bg-emerald-950/60 border border-emerald-700/60 rounded-lg transition-colors cursor-pointer"
                        title={`Enquire on WhatsApp about ${quizResult.name}`}
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        onClick={() => onOpenBooking(quizResult.id)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors shrink-0 cursor-pointer"
                      >
                        Request Ritual
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CONTROLS: CATEGORY TABS & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Segmented Category Filter Tabs (Single-line, unboxed tags ban respected) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((c) => {
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-stone-200/60 border border-stone-200'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments or botanicals..."
              className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-4 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-800"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* 4. SERVICES GRID */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
            <p className="font-serif text-xl text-stone-800">No matching rituals found</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search criteria or category filter to discover our full menu.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => {
              const isExpanded = expandedDetailsId === service.id;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
                    <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto bg-stone-100 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      {service.popular && (
                        <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-white text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded tracking-wider">
                          Atelier Signature
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span className="uppercase tracking-wider font-semibold text-[10px] text-amber-900">
                            {service.category.replace('-', ' & ').toUpperCase()}
                          </span>
                          <span className="flex items-center gap-1 tabular-nums font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {service.durationMinutes} min
                          </span>
                        </div>

                        <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug">
                          {service.name}
                        </h3>

                        <p className="text-xs text-stone-600 leading-relaxed">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] text-stone-500 block">Investment</span>
                          <span className="text-lg font-bold text-stone-900 tabular-nums">
                            ${service.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
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
                            className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow"
                          >
                            Request Ritual
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Protocol & Botanical Details */}
                  <div className="border-t border-stone-100 bg-stone-50/70 px-6 py-3">
                    <button
                      onClick={() =>
                        setExpandedDetailsId(isExpanded ? null : service.id)
                      }
                      className="w-full flex items-center justify-between text-xs font-medium text-stone-700 hover:text-stone-950 cursor-pointer"
                    >
                      <span>Detailed Protocol & Bio-Actives</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="pt-3 pb-2 space-y-3 text-xs text-stone-600 animate-in fade-in duration-150">
                        <p className="leading-relaxed">{service.fullDesc}</p>
                        <div>
                          <span className="font-semibold text-stone-900 block text-[11px] mb-1">
                            Signature Active Botanicals:
                          </span>
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-700">
                            {service.keyBotanicals.map((botanical, i) => (
                              <span
                                key={i}
                                className="bg-white px-2 py-0.5 rounded border border-stone-200"
                              >
                                {botanical}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. ADD-ON SENSORY ENHANCEMENTS SHOWCASE */}
      <section className="bg-white border-y border-stone-200 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
              Ritual Elevators
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
              Sensory Enhancements & Clinical Boosters
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Seamlessly append any of these targeted therapies to your core appointment during online booking or upon arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADDONS.map((addon) => (
              <div
                key={addon.id}
                className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200/80 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-serif text-base font-semibold text-stone-900">
                      {addon.name}
                    </h4>
                    <span className="text-xs font-bold text-stone-900 tabular-nums shrink-0">
                      +${addon.price}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="tabular-nums">+{addon.durationMinutes} min</span>
                  <button
                    onClick={() => onOpenBooking()}
                    className="font-medium text-stone-900 hover:underline cursor-pointer"
                  >
                    Include in Visit →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONCIERGE BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-stone-100 rounded-2xl p-8 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl text-stone-900">
              Require a Custom Bridal Suite or Private Studio Buyout?
            </h3>
            <p className="text-xs text-stone-600">
              Our bespoke event coordinator designs custom menus for wedding parties, editorial photoshoots, and private celebrations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Inquire for Private Events
          </button>
        </div>
      </section>
    </div>
  );
};
