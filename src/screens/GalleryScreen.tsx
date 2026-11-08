import React, { useState, useEffect } from 'react';
import { ScreenId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/studioData';
import {
  X,
  Heart,
  Sparkles,
  ArrowRight,
  User,
  Sliders,
  Check,
  Eye,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/salonConfig';

interface GalleryScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBookingForService: (serviceId: string) => void;
  onShowToast: (title: string, message?: string) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({
  onNavigate,
  onOpenBookingForService,
  onShowToast,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [showBefore, setShowBefore] = useState<boolean>(false);
  const [savedLookIds, setSavedLookIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('lumiere_saved_looks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('lumiere_saved_looks', JSON.stringify(savedLookIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedLookIds]);

  const toggleSaveLook = (id: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedLookIds.includes(id)) {
      setSavedLookIds(savedLookIds.filter((item) => item !== id));
      onShowToast('Look Removed', `"${title}" removed from your inspiration lookbook.`);
    } else {
      setSavedLookIds([...savedLookIds, id]);
      onShowToast('Look Saved', `"${title}" saved to your private consultation lookbook.`);
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Works' },
    { id: 'skin', label: 'Skin Radiance' },
    { id: 'hair', label: 'Hair Architecture' },
    { id: 'brows-lashes', label: 'Brows & Lashes' },
    { id: 'bridal', label: 'Bridal Elegance' },
    { id: 'sanctuary', label: 'Atelier Sanctuary' },
  ];

  const displayedItems = GALLERY_ITEMS.filter((item) => {
    if (showSavedOnly) {
      return savedLookIds.includes(item.id);
    }
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="space-y-16 pb-24">
      {/* 1. EDITORIAL HEADER */}
      <section className="px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            The Atelier Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.1] text-balance">
            Visual Proof of Living Radiance
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Explore unretouched skin transformations, dimensional French balayage, and architectural brow artistry crafted by our master collective.
          </p>
        </div>
      </section>

      {/* 2. FILTER CONTROLS & LOOKBOOK SWITCH */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const isSelected = !showSavedOnly && selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setShowSavedOnly(false);
                    setSelectedFilter(tab.id);
                  }}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-stone-200/60 border border-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Inspiration Lookbook Toggle */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto ${
              showSavedOnly
                ? 'bg-amber-100 text-amber-950 border-amber-300 font-semibold'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                showSavedOnly ? 'fill-amber-800 text-amber-800' : 'text-stone-400'
              }`}
            />
            <span>My Saved Looks ({savedLookIds.length})</span>
          </button>
        </div>
      </section>

      {/* 3. GALLERY MASONRY / GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        {displayedItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-4">
            <Heart className="w-10 h-10 text-stone-300 mx-auto stroke-[1.5]" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl text-stone-800">Your Inspiration Board is Empty</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Tap the heart on any transformation look to curate your personal moodboard for your upcoming atelier consultation.
              </p>
            </div>
            <button
              onClick={() => {
                setShowSavedOnly(false);
                setSelectedFilter('all');
              }}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Browse All Transformations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedItems.map((item) => {
              const isSaved = savedLookIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item);
                    setShowBefore(false);
                  }}
                  className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-md text-stone-900 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 shadow">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Look</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleSaveLook(item.id, item.title, e)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-red-600 transition-colors shadow-sm"
                      aria-label="Save look"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-red-600 text-red-600' : 'text-stone-600'
                        }`}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded tracking-wider">
                      {item.category.replace('-', ' & ')}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-amber-950 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                      <span>Artisan: {item.specialistName}</span>
                      <span className="font-medium text-stone-900 group-hover:underline">
                        Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX DETAIL MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 block">
                  Editorial Portfolio Look
                </span>
                <h3 className="font-serif text-xl text-stone-900 font-normal">
                  {activeItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-200/50 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              {/* Image Viewport with optional Before/After toggle */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shadow-inner">
                <img
                  src={showBefore && activeItem.beforeImage ? activeItem.beforeImage : activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {activeItem.beforeImage && (
                  <div className="absolute top-4 left-4 flex gap-1 bg-stone-900/80 backdrop-blur-md p-1 rounded-lg border border-stone-700">
                    <button
                      onClick={() => setShowBefore(false)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        !showBefore ? 'bg-white text-stone-900 shadow' : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      After (Result)
                    </button>
                    <button
                      onClick={() => setShowBefore(true)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        showBefore ? 'bg-white text-stone-900 shadow' : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      Before
                    </button>
                  </div>
                )}
              </div>

              {/* Story & Technical Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                    Case Narrative & Protocol
                  </span>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-xs font-semibold text-stone-900 block">
                      Bio-Actives & Formulations Applied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.productsUsed.map((prod, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white border border-stone-200 text-stone-700 px-2.5 py-1 rounded"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                      Master Artisan
                    </span>
                    <strong className="font-serif text-base text-stone-900 block">
                      {activeItem.specialistName}
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                      Ritual Performed
                    </span>
                    <span className="text-xs font-medium text-stone-800 block">
                      {activeItem.serviceName}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        const serviceId = activeItem.serviceId;
                        setActiveItem(null);
                        onOpenBookingForService(serviceId);
                      }}
                      className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer text-center shadow"
                    >
                      Request This Look (Enquiry)
                    </button>
                    <a
                      href={getWhatsAppUrl(activeItem.serviceName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => toggleSaveLook(activeItem.id, activeItem.title)}
                      className="w-full py-2 text-xs font-medium text-stone-700 hover:text-stone-950 border border-stone-200 rounded-lg transition-colors cursor-pointer text-center inline-flex items-center justify-center gap-1.5"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          savedLookIds.includes(activeItem.id)
                            ? 'fill-red-600 text-red-600'
                            : 'text-stone-500'
                        }`}
                      />
                      <span>
                        {savedLookIds.includes(activeItem.id)
                          ? 'Saved to Inspiration'
                          : 'Save to Lookbook'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. EDITORIAL BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-stone-100 rounded-2xl p-8 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl text-stone-900">
              Have a Specific Reference Look in Mind?
            </h3>
            <p className="text-xs text-stone-600">
              Bring your photos or inspiration board directly to your 15-minute diagnostic opening before any service begins.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={getWhatsAppUrl('Gallery Portfolio Consultation')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200/80 border border-emerald-300 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp Atelier Concierge</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              Consult With An Artist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
