import React, { useState } from 'react';
import { ScreenId } from '../types';
import { SALON_CONFIG, getWhatsAppUrl } from '../config/salonConfig';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Train,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  MessageCircle,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

interface ContactScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBooking: () => void;
  onShowToast: (title: string, message?: string) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  onNavigate,
  onOpenBooking,
  onShowToast,
}) => {
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLocation, setFormLocation] = useState(SALON_CONFIG.locations[0].city);
  const [formService, setFormService] = useState('Facial Aesthetics');
  const [formTimeOfDay, setFormTimeOfDay] = useState('Morning (09:00 - 12:00)');
  const [formNotes, setFormNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeLocation = SALON_CONFIG.locations[activeLocationIndex];
  const waUrl = getWhatsAppUrl('Hello Lumière Concierge, I would like to inquire about booking a consultation.');

  const validateForm = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!formName.trim() || formName.trim().length < 2) {
      errs.name = 'Please provide your full name (minimum 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formEmail.trim() || !emailRegex.test(formEmail.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    const phoneDigits = formPhone.replace(/\D/g, '');
    if (!formPhone.trim() || phoneDigits.length < 8) {
      errs.phone = 'Please provide a valid contact number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const ref = 'INQ-' + Math.floor(1000 + Math.random() * 9000);
    setSubmittedInquiryId(ref);
    onShowToast(
      'Inquiry Dispatched',
      `Concierge reference #${ref} created. Our team will contact you within 4 business hours.`
    );
  };

  const faqs = [
    {
      q: 'What is your appointment cancellation and rescheduling policy?',
      a: 'We kindly request a minimum of 24 hours notice for individual appointments, and 72 hours for private bridal suites. Cancellations within this window are subject to a 50% reservation hold.',
    },
    {
      q: 'How should I prepare my skin before a Grand Cru facial?',
      a: 'We recommend pausing active prescription retinoids, high-percentage AHA/BHA chemical exfoliants, or intense sun exposure for 48 hours prior to your session. We begin with a gentle barrier reset and thorough diagnostic analysis.',
    },
    {
      q: 'Are your formulations suitable for sensitive or rosacea-prone skin?',
      a: 'Yes. All Lumière formulations are clean, fragrance-free, hypoallergenic, and certified cruelty-free. During your opening consultation, we tailor botanical extracts specifically to calm vascular erythema and fortify sensitive barriers.',
    },
    {
      q: 'Do you offer private studio buyouts for weddings and VIP events?',
      a: 'Yes. Our 4th floor Madison Avenue suite features two secluded private treatment rooms with private powder rooms and dedicated sommelier service for bridal and editorial parties.',
    },
    {
      q: 'Is valet parking provided at the New York atelier?',
      a: 'Yes. Complimentary white-glove valet is situated at our private carriage entrance on East 64th Street just off Madison Avenue. Simply mention Lumière upon arrival.',
    },
  ];

  return (
    <div className="space-y-20 pb-24">
      {/* 1. EDITORIAL HEADER */}
      <section className="px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            Concierge & Inquiries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.1] text-balance">
            Connect With Our Atelier Team
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Whether booking a bespoke seasonal facial, reserving private bridal suites, or seeking skincare guidance, our concierge is at your service.
          </p>
        </div>
      </section>

      {/* 2. SANCTUARY SELECTOR & LOCATION DETAILS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          {/* Location Selector Tabs */}
          <div className="flex border-b border-stone-200 bg-stone-50">
            {SALON_CONFIG.locations.map((loc, idx) => (
              <button
                key={loc.city}
                onClick={() => setActiveLocationIndex(idx)}
                className={`flex-1 py-4 px-6 text-sm font-serif font-medium text-center transition-colors cursor-pointer ${
                  activeLocationIndex === idx
                    ? 'bg-white text-stone-900 border-b-2 border-stone-900 font-semibold'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                {loc.city}
              </button>
            ))}
          </div>

          <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-900 block mb-1">
                  Atelier Address
                </span>
                <h3 className="font-serif text-2xl text-stone-900">
                  {activeLocation.address}
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  {activeLocation.neighborhood}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-stone-900 text-xs font-semibold uppercase tracking-wider">
                    <Phone className="w-4 h-4 text-amber-800" />
                    <span>Direct Concierge</span>
                  </div>
                  <p className="text-xs font-mono tabular-nums text-stone-800">
                    {activeLocation.phone}
                  </p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-stone-900 text-xs font-semibold uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-amber-800" />
                    <span>Email Inquiries</span>
                  </div>
                  <p className="text-xs text-stone-800 font-medium truncate">
                    {activeLocation.email}
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-emerald-50/70 hover:bg-emerald-50 rounded-xl border border-emerald-200/80 space-y-1 group transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-emerald-950 text-xs font-semibold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700/20" />
                      <span>WhatsApp</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-emerald-900 font-medium truncate">
                    {SALON_CONFIG.whatsapp.displayNumber}
                  </p>
                </a>
              </div>

              <div className="space-y-3 pt-2 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Atelier Hours:</strong>
                    <span>{activeLocation.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Train className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Nearby Transit:</strong>
                    <span>{activeLocation.transit}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Valet & Parking:</strong>
                    <span>{activeLocation.valet}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Stylized Map Card */}
            <div className="lg:col-span-6 bg-stone-100 rounded-xl border border-stone-200 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                    Architectural Locator
                  </span>
                  <span className="text-xs bg-white text-stone-900 px-2.5 py-1 rounded font-medium shadow-sm">
                    Open Today
                  </span>
                </div>
                <h4 className="font-serif text-xl text-stone-900">
                  {activeLocation.city}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
                  Private elevator access located through our discreet travertine gallery entrance. Concierge team stationed at reception.
                </p>
              </div>

              {/* Decorative Architectural Schematic Mockup */}
              <div className="my-6 p-6 bg-white rounded-lg border border-stone-200/90 shadow-sm relative">
                <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-100">
                  <span className="font-mono">LAT: 40.7675° N</span>
                  <span className="font-mono">LONG: 73.9692° W</span>
                </div>
                <div className="py-6 flex items-center justify-center gap-3 text-stone-800">
                  <MapPin className="w-6 h-6 text-amber-900 animate-bounce" />
                  <span className="font-serif text-base font-semibold">
                    {activeLocation.address}
                  </span>
                </div>
                <div className="text-[11px] text-center text-stone-500">
                  Private Suite Floor 4 · Ring Concierge on Arrival
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 relative z-10">
                <span>Elevator & Wheelchair Accessible</span>
                <button
                  onClick={onOpenBooking}
                  className="font-medium text-stone-900 hover:underline cursor-pointer"
                >
                  Direct Booking Portal →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CONCIERGE INQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-900 block">
              Direct Inquiry
            </span>
            <h2 className="font-serif text-3xl text-stone-900">
              Send a Message to the Atelier Concierge
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              For custom bridal party bookings, skin consultation questions, or specific treatment inquiries, complete the card below.
            </p>
          </div>

          {submittedInquiryId ? (
            <div className="p-8 bg-stone-50 border border-stone-200 rounded-xl text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-stone-900 text-amber-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  Inquiry Reference #{submittedInquiryId}
                </span>
                <h3 className="font-serif text-2xl text-stone-900">
                  Thank You, {formName}
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Our head concierge has received your request for the {formLocation}. We will reach out to <strong>{formEmail}</strong> or via phone within 4 business hours.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmittedInquiryId(null);
                  setFormNotes('');
                }}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white border border-stone-300 rounded-lg hover:border-stone-900 transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (errors.name) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.name;
                          return copy;
                        });
                      }
                    }}
                    placeholder="e.g. Adrienne Vance"
                    className={`w-full bg-[#FAF8F5] border rounded-lg px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:bg-white transition-colors ${
                      errors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-300 focus:border-stone-900'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => {
                      setFormEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.email;
                          return copy;
                        });
                      }
                    }}
                    placeholder="e.g. adrienne@example.com"
                    className={`w-full bg-[#FAF8F5] border rounded-lg px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:bg-white transition-colors ${
                      errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-300 focus:border-stone-900'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => {
                      setFormPhone(e.target.value);
                      if (errors.phone) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.phone;
                          return copy;
                        });
                      }
                    }}
                    placeholder="+1 (212) 555-0198"
                    className={`w-full bg-[#FAF8F5] border rounded-lg px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:bg-white transition-colors ${
                      errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-300 focus:border-stone-900'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Target Atelier
                  </label>
                  <select
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-4 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
                  >
                    {SALON_CONFIG.locations.map((loc) => (
                      <option key={loc.id} value={loc.city}>
                        {loc.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Service of Interest
                  </label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-4 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
                  >
                    <option value="Facial Aesthetics">Facial Aesthetics</option>
                    <option value="Couture Hair Balayage">Couture Hair Balayage</option>
                    <option value="Brow & Lash Architecture">Brow & Lash Architecture</option>
                    <option value="Bridal Suite & Private Buyout">Bridal Suite & Private Buyout</option>
                    <option value="General Concierge Question">General Concierge Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Preferred Contact Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Morning (09:00 - 12:00)',
                    'Afternoon (12:00 - 17:00)',
                    'Evening (17:00 - 19:30)',
                  ].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormTimeOfDay(time)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        formTimeOfDay === time
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-[#FAF8F5] text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Your Message or Special Inquiries
                </label>
                <textarea
                  rows={4}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Share details regarding target dates, specific skin conditions, or guest count for private suites..."
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg p-4 text-xs text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors leading-relaxed"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-stone-500">
                  All consultations strictly confidential.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. CONCIERGE FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Frequently Inquired
          </span>
          <h2 className="font-serif text-3xl text-stone-900">
            Atelier Policies & Etiquette
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/70 transition-colors"
                >
                  <span className="font-serif text-base font-semibold text-stone-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
