import React, { useState, useEffect } from 'react';
import { ServiceItem, Specialist, Booking } from '../types';
import { SERVICES, SPECIALISTS, ADDONS } from '../data/studioData';
import { SALON_CONFIG, getWhatsAppUrl } from '../config/salonConfig';
import {
  X,
  Check,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  ChevronRight,
  Download,
  AlertCircle,
  MessageCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedSpecialistId?: string;
  onBookingConfirmed: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedSpecialistId,
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedServiceId || SERVICES[0].id
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>(
    preSelectedSpecialistId || 'any'
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Booking | null>(null);

  // Synchronize when preselected props change
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (preSelectedSpecialistId) {
      setSelectedSpecialistId(preSelectedSpecialistId);
    }
  }, [preSelectedSpecialistId]);

  // Set default date to tomorrow if not set
  useEffect(() => {
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [selectedDate]);

  if (!isOpen) return null;

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const currentSpecialist = SPECIALISTS.find((sp) => sp.id === selectedSpecialistId);
  const selectedAddons = ADDONS.filter((a) => selectedAddonIds.includes(a.id));

  const totalDuration =
    currentService.durationMinutes +
    selectedAddons.reduce((sum, a) => sum + a.durationMinutes, 0);

  const totalPrice =
    currentService.price +
    selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const toggleAddon = (addonId: string) => {
    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter((id) => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '06:45 PM',
  ];

  const validateStep4 = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!selectedDate) {
      errors.date = 'Please select a preferred date.';
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (selectedDate < today) {
        errors.date = 'Appointment date cannot be in the past.';
      }
    }

    if (!selectedTimeSlot) {
      errors.timeSlot = 'Please select your preferred appointment time window.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep5 = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!clientName.trim() || clientName.trim().length < 2) {
      errors.name = 'Full legal name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientEmail.trim() || !emailRegex.test(clientEmail.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    const phoneDigits = clientPhone.replace(/\D/g, '');
    if (!clientPhone.trim() || phoneDigits.length < 8) {
      errors.phone = 'Please provide a valid phone number with area code.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep5()) return;

    setIsSubmitting(true);

    // Simulate authentic asynchronous network submission
    setTimeout(() => {
      const enquiryRef = 'ENQ-' + Math.floor(10000 + Math.random() * 90000);
      const newBooking: Booking = {
        id: enquiryRef,
        serviceId: currentService.id,
        serviceName: currentService.name,
        servicePrice: currentService.price,
        specialistId: selectedSpecialistId,
        specialistName: currentSpecialist ? currentSpecialist.name : 'First Available Master Artist',
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        addons: selectedAddons.map((a) => a.name),
        totalPrice,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        notes: clientNotes.trim(),
        status: 'Enquiry Received',
        createdAt: new Date().toISOString(),
      };

      setSubmittedEnquiry(newBooking);
      onBookingConfirmed(newBooking);
      setIsSubmitting(false);
      setStep(6);
    }, 600);
  };

  const handleDownloadIcs = () => {
    if (!submittedEnquiry) return;
    const dateFormatted = submittedEnquiry.date.replace(/-/g, '');
    const locationStr = `${SALON_CONFIG.brandName}, ${SALON_CONFIG.locations[0].address}`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lumiere Beauty Studio//Appointment Enquiry//EN',
      'BEGIN:VEVENT',
      `UID:${submittedEnquiry.id}@lumierebeauty.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${dateFormatted}T140000Z`,
      `DTEND:${dateFormatted}T160000Z`,
      `SUMMARY:${SALON_CONFIG.brandName}: ${submittedEnquiry.serviceName} (Request)`,
      `DESCRIPTION:Appointment enquiry reference ${submittedEnquiry.id} with ${submittedEnquiry.specialistName}. Awaiting concierge confirmation call/message.`,
      `LOCATION:${locationStr}`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Lumiere-Enquiry-${submittedEnquiry.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmittedEnquiry(null);
    setIsSubmitting(false);
    setValidationErrors({});
    onClose();
  };

  // Contextual WhatsApp link for the current service & date
  const waEnquiryUrl = submittedEnquiry
    ? getWhatsAppUrl(
        submittedEnquiry.serviceName,
        `${submittedEnquiry.date} at ${submittedEnquiry.timeSlot}`
      )
    : getWhatsAppUrl(currentService.name);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-500 block">
              Atelier Appointment Enquiry
            </span>
            <h2 id="enquiry-modal-title" className="font-serif text-xl sm:text-2xl font-normal text-stone-900 tracking-tight">
              {step === 6 ? 'Enquiry Received' : 'Request Your Bespoke Experience'}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-200/60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (Steps 1-5) */}
        {step < 6 && (
          <div className="px-6 pt-3 pb-2 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium text-stone-800">
              Step {step} of 5: {
                step === 1 ? 'Select Service' :
                step === 2 ? 'Sensory Add-Ons' :
                step === 3 ? 'Artisan Specialist' :
                step === 4 ? 'Preferred Date & Time' : 'Contact Details'
              }
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-6 bg-stone-900'
                      : s < step
                      ? 'w-3 bg-stone-400'
                      : 'w-3 bg-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-600">
                  Select a ritual from our menu (prices and durations listed):
                </p>
                <a
                  href={getWhatsAppUrl(currentService.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>

              <div className="space-y-3" role="radiogroup" aria-label="Select Treatment">
                {SERVICES.map((s) => {
                  const isSelected = selectedServiceId === s.id;
                  return (
                    <div
                      key={s.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => setSelectedServiceId(s.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedServiceId(s.id);
                        }
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                        isSelected
                          ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900'
                          : 'border-stone-200 bg-white/70 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-stone-900 font-serif">
                              {s.name}
                            </h3>
                            {s.popular && (
                              <span className="text-[10px] tracking-wider uppercase text-amber-900 font-semibold">
                                Signature
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {s.shortDesc}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-stone-900 tabular-nums">
                            ${s.price}
                          </span>
                          <span className="block text-[11px] text-stone-500 tabular-nums">
                            {s.durationMinutes} min
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: ENHANCEMENTS / ADD-ONS */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-stone-100 rounded-lg text-xs text-stone-700 flex justify-between items-center">
                <span>Selected Treatment: <strong>{currentService.name}</strong></span>
                <span className="font-semibold tabular-nums">${currentService.price}</span>
              </div>
              <p className="text-xs text-stone-600">
                Enhance your session with targeted clinical infusions (optional):
              </p>
              <div className="space-y-3">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                          : 'border-stone-200 bg-white/70 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-stone-900">{addon.name}</h3>
                          <p className="text-xs text-stone-500 mt-0.5">{addon.description}</p>
                          <span className="text-[11px] text-stone-400 mt-1 block tabular-nums">
                            +{addon.durationMinutes} min
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-stone-900 tabular-nums shrink-0">
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SPECIALIST */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600">
                Select your preferred artisan specialist or request the first available master:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedSpecialistId('any')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedSpecialistId === 'any'
                      ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                      : 'border-stone-200 bg-white/70 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                      <Sparkles className="w-5 h-5 text-stone-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-900">First Available Master</h3>
                      <p className="text-xs text-stone-500">Most flexible schedule</p>
                    </div>
                  </div>
                </div>

                {SPECIALISTS.map((sp) => {
                  const isSelected = selectedSpecialistId === sp.id;
                  return (
                    <div
                      key={sp.id}
                      onClick={() => setSelectedSpecialistId(sp.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                          : 'border-stone-200 bg-white/70 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={sp.image}
                          alt={sp.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-stone-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-stone-900 truncate font-serif">
                            {sp.name}
                          </h3>
                          <p className="text-xs text-stone-500 truncate">{sp.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: PREFERRED DATE & TIME */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (validationErrors.date) {
                      setValidationErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.date;
                        return copy;
                      });
                    }
                  }}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-stone-800 focus:outline-none cursor-pointer ${
                    validationErrors.date
                      ? 'border-red-400 ring-1 ring-red-400'
                      : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {validationErrors.date && (
                  <p className="text-xs text-red-600 flex items-center gap-1.5 mt-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationErrors.date}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Preferred Time Slot *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          setSelectedTimeSlot(slot);
                          setValidationErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.timeSlot;
                            return copy;
                          });
                        }}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer tabular-nums ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {validationErrors.timeSlot && (
                  <p className="text-xs text-red-600 flex items-center gap-1.5 mt-2 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationErrors.timeSlot}</span>
                  </p>
                )}
              </div>

              <div className="p-3 bg-stone-100 rounded-lg text-xs text-stone-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>
                  Estimated duration: <strong>{totalDuration} minutes</strong> including diagnostic consultation.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: GUEST DETAILS & SUBMISSION */}
          {step === 5 && (
            <form id="enquiry-form" onSubmit={handleSubmitEnquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (validationErrors.name) {
                        setValidationErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.name;
                          return copy;
                        });
                      }
                    }}
                    placeholder="e.g. Camille Laurent"
                    className={`w-full bg-white border rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none ${
                      validationErrors.name
                        ? 'border-red-400 ring-1 ring-red-400'
                        : 'border-stone-300 focus:border-stone-900'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{validationErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      if (validationErrors.email) {
                        setValidationErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.email;
                          return copy;
                        });
                      }
                    }}
                    placeholder="e.g. camille@example.com"
                    className={`w-full bg-white border rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none ${
                      validationErrors.email
                        ? 'border-red-400 ring-1 ring-red-400'
                        : 'border-stone-300 focus:border-stone-900'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{validationErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Mobile Phone * (For Confirmation Call / WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => {
                    setClientPhone(e.target.value);
                    if (validationErrors.phone) {
                      setValidationErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.phone;
                        return copy;
                      });
                    }
                  }}
                  placeholder="+1 (212) 555-0198"
                  className={`w-full bg-white border rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none ${
                    validationErrors.phone
                      ? 'border-red-400 ring-1 ring-red-400'
                      : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {validationErrors.phone && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{validationErrors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Special Notes or Sensitivities (Optional)
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Share details regarding skin sensitivities, allergies, or questions for the artist..."
                  className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Order Summary & Notice Strip */}
              <div className="p-4 bg-stone-100 rounded-xl space-y-2 text-xs border border-stone-200">
                <div className="flex justify-between text-stone-700">
                  <span>{currentService.name}</span>
                  <span className="tabular-nums font-semibold">${currentService.price}</span>
                </div>
                {selectedAddons.map((a) => (
                  <div key={a.id} className="flex justify-between text-stone-500">
                    <span>+ {a.name}</span>
                    <span className="tabular-nums">+${a.price}</span>
                  </div>
                ))}
                <div className="border-t border-stone-200 pt-2 flex justify-between font-semibold text-stone-900 text-sm">
                  <span>Estimated Total (Paid in Atelier)</span>
                  <span className="tabular-nums">${totalPrice}</span>
                </div>
                <p className="text-[11px] text-amber-900 pt-1 leading-relaxed border-t border-stone-200">
                  <strong>Notice:</strong> This is an appointment enquiry request. Our salon team will contact you to verify schedule availability and confirm your booking.
                </p>
              </div>
            </form>
          )}

          {/* STEP 6: CLEAR SUCCESS STATE - HONEST ENQUIRY RECEIPT */}
          {step === 6 && submittedEnquiry && (
            <div className="text-center py-6 space-y-6 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-stone-900 text-amber-200 mx-auto flex items-center justify-center shadow-lg">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  Enquiry Reference #{submittedEnquiry.id}
                </span>
                <h3 className="font-serif text-2xl text-stone-900">
                  Appointment Request Received
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{submittedEnquiry.clientName}</strong>. Your appointment enquiry has been submitted. Our concierge team will review availability and contact you via phone or WhatsApp at <strong>{submittedEnquiry.clientPhone}</strong> within 2–4 hours to finalize and confirm your slot.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto shadow-sm">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Requested Treatment:</span>
                  <span className="font-semibold text-stone-900">{submittedEnquiry.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Requested Specialist:</span>
                  <span className="font-semibold text-stone-900">{submittedEnquiry.specialistName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Preferred Date & Time:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {submittedEnquiry.date} at {submittedEnquiry.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Status:</span>
                  <span className="font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                    Awaiting Salon Confirmation
                  </span>
                </div>
                <div className="flex justify-between pt-1 font-semibold text-stone-900">
                  <span>Estimated Total:</span>
                  <span className="tabular-nums">${submittedEnquiry.totalPrice}</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Followup + Calendar + Done */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={waEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send via WhatsApp Now</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800 border border-stone-300 hover:border-stone-900 bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Save Tentative .ics</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1-5) */}
        {step < 6 && (
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-900"
              >
                Back
              </button>
            ) : (
              <a
                href={getWhatsAppUrl(currentService.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-medium"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Book via WhatsApp</span>
              </a>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 4) {
                    if (!validateStep4()) return;
                  }
                  setStep((s) => (s + 1) as any);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="enquiry-form"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-600 rounded-lg transition-colors cursor-pointer shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <span>Submit Appointment Enquiry (${totalPrice})</span>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
