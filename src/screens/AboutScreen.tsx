import React from 'react';
import { ScreenId } from '../types';
import {
  FOUNDER_IMAGE,
  HERO_IMAGE,
  SPECIALISTS,
} from '../data/studioData';
import { ArrowRight, Award, Leaf, Shield, Heart, Sparkles, CheckCircle, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/salonConfig';

interface AboutScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBookingWithSpecialist: (specialistId: string) => void;
  onOpenBooking: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onNavigate,
  onOpenBookingWithSpecialist,
  onOpenBooking,
}) => {
  return (
    <div className="space-y-24 pb-24">
      {/* 1. EDITORIAL HEADER */}
      <section className="px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            Atelier Heritage & Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.1] text-balance">
            Where Parisian Craft Meets Cellular Skin Science
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Founded on the conviction that radiant beauty is cultivated from within, Lumière reimagines modern salon aesthetics as an unhurried, restorative art form.
          </p>
        </div>
      </section>

      {/* 2. FOUNDER'S JOURNEY SPLIT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-900 block">
              The Founder’s Note
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight leading-snug">
              “I spent fifteen years watching traditional spas choose between luxury pampering and clinical results. We decided to bridge both.”
            </h2>
            <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
              <p>
                After training under leading dermatologists and cellular biologists at the Université de Paris, Hélène Laurent established Lumière Beauty Studio in 2012 to escape the industrialized, rushed pace of conventional aesthetics clinics.
              </p>
              <p>
                Her patented circadian treatment protocols treat the skin not as a problem to be aggressively scrubbed or wounded, but as an intelligent organ with its own rhythm of daytime protection and night-time mitochondrial repair.
              </p>
              <p>
                Today, our ateliers in Manhattan and Paris welcome discerning clients who seek uncompromising refinement, non-toxic formulations, and transformative results that feel utterly natural.
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200">
              <p className="font-serif text-lg text-stone-900 font-medium">Hélène Laurent</p>
              <p className="text-xs text-stone-500">Founder & Master Esthetician</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-2xl aspect-[4/3] bg-stone-100">
              <img
                src={FOUNDER_IMAGE}
                alt="Hélène Laurent formulating botanical treatments in the studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-serif italic">
                Hélène at our Manhattan Apothecary Bench
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE FOUR FOUNDATIONAL PILLARS */}
      <section className="bg-white border-y border-stone-200 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
              The Four Pillars of Lumière
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Biodynamic Botanicals',
                desc: 'Every oil, hydrosol, and peptide serum is cold-pressed and cold-compounded without parabens, phthalates, synthetic perfumes, or harsh sulfates.',
              },
              {
                icon: Sparkles,
                title: 'Circadian Dermal Sync',
                desc: 'Our customized treatments work with your biological chronotype to maximize active ingredient absorption and speed epidermal rejuvenation.',
              },
              {
                icon: Shield,
                title: 'Medical-Grade Purity',
                desc: 'All non-porous instruments undergo hospital-grade steam autoclaving. Each client suite features continuous HEPA-14 viral filtration and pristine acoustic isolation.',
              },
              {
                icon: Heart,
                title: 'Master Artisanship',
                desc: 'Every facialist, colorist, and brow artist holds a minimum of eight years of European master training, ensuring unmatched technique and touch.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] p-6 rounded-xl border border-stone-200/80 flex flex-col space-y-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-amber-200" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MEET THE MASTER ARTISANS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
              The Collective
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Meet Our Master Specialists
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            Trained across Paris, Milan, and New York. Book directly with your preferred artisan or consult our front concierge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPECIALISTS.map((specialist) => (
            <div
              key={specialist.id}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                    {specialist.experienceYears} Years Practice
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-stone-900">
                      {specialist.name}
                    </h3>
                    <p className="text-xs font-medium text-amber-900 mt-0.5">
                      {specialist.role}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {specialist.bio}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 block">
                      Key Specialties:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-stone-600">
                      {specialist.specialties.map((s, i) => (
                        <span key={i} className="after:content-['·'] after:ml-1 last:after:content-none">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => onOpenBookingWithSpecialist(specialist.id)}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-white bg-stone-100 hover:bg-stone-900 border border-stone-200 hover:border-stone-900 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Request with {specialist.name.split(' ')[0]}
                </button>
                <a
                  href={getWhatsAppUrl(`Specialist Inquiry with ${specialist.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-700" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HERITAGE & TIMELINE */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              The Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
              A Decade of Refinement
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-300">
            {[
              {
                year: '2012',
                title: 'The Marais Atelier, Paris',
                desc: 'Hélène opens an intimate 3-chair consultation suite in Paris, pioneering manual buccal sculpting and cold-pressed botanical extractions.',
              },
              {
                year: '2016',
                title: 'The Circadian Lab Launch',
                desc: 'Partnering with Swiss bio-chemists, Lumière develops its proprietary bio-identical lipid complex, recognized by the European Dermal Society.',
              },
              {
                year: '2021',
                title: 'Madison Avenue Flagship, New York',
                desc: 'Lumière expands to Manhattan, designing a multi-story architectural sanctuary with dedicated couture hair, aesthetics, and bridal suites.',
              },
              {
                year: '2024',
                title: 'Prix de la Beauté Durable',
                desc: 'Honored with the international sustainability excellence award for zero single-use plastics and complete circular ingredient sourcing.',
              },
            ].map((milestone, idx) => (
              <div key={idx} className="relative flex items-start gap-6 pl-2">
                <div className="w-4 h-4 rounded-full bg-stone-900 border-4 border-stone-100 shrink-0 mt-1 relative z-10" />
                <div className="bg-white p-5 rounded-xl border border-stone-200 flex-1 space-y-1 shadow-sm">
                  <span className="font-serif text-base font-bold text-amber-900 tabular-nums">
                    {milestone.year}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SANCTUARY CALLOUT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 block">
              Experience The Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Reserve your quiet moment of renewal
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Our front concierge is available to guide your treatment selection, discuss bespoke bookings, and verify calendar openings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors cursor-pointer text-center"
            >
              Request Appointment
            </button>
            <a
              href={getWhatsAppUrl('Atelier Experience Enquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 hover:text-emerald-200 border border-emerald-700/80 hover:border-emerald-500 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Enquire on WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigate('services')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-200 hover:text-white border border-stone-700 hover:border-stone-500 rounded-lg transition-colors cursor-pointer text-center"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
