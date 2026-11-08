import React from 'react';
import { Booking } from '../types';
import { SALON_CONFIG, getWhatsAppUrl } from '../config/salonConfig';
import { X, Calendar, Clock, MapPin, Trash2, Download, MessageCircle, ExternalLink } from 'lucide-react';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onBookNew,
}) => {
  if (!isOpen) return null;

  const handleDownloadIcs = (booking: Booking) => {
    const dateFormatted = booking.date.replace(/-/g, '');
    const locationStr = `${SALON_CONFIG.brandName}, ${SALON_CONFIG.locations[0].address}, ${SALON_CONFIG.locations[0].neighborhood}`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lumiere Beauty Studio//Appointment Enquiry//EN',
      'BEGIN:VEVENT',
      `UID:${booking.id}@lumierebeauty.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${dateFormatted}T140000Z`,
      `DTEND:${dateFormatted}T160000Z`,
      `SUMMARY:${SALON_CONFIG.brandName}: ${booking.serviceName} (Request)`,
      `DESCRIPTION:Appointment enquiry ${booking.id} with ${booking.specialistName}. Status: Awaiting confirmation. Concierge: ${SALON_CONFIG.primaryConcierge.phone}`,
      `LOCATION:${locationStr}`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Lumiere-Enquiry-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="visits-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-500 block">
              Client Portal
            </span>
            <h2 id="visits-modal-title" className="font-serif text-xl font-normal text-stone-900 tracking-tight">
              My Appointment Enquiries ({bookings.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-200/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            aria-label="Close portal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-12 h-12 text-stone-300 mx-auto stroke-[1.5]" />
              <div className="space-y-1">
                <p className="font-serif text-lg text-stone-800">No Pending Enquiries</p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  You have not submitted any appointment requests yet. Explore our treatment menu to submit an enquiry.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                Explore Treatment Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => {
                const waFollowupUrl = `https://wa.me/${SALON_CONFIG.whatsapp.cleanNumber}?text=${encodeURIComponent(
                  `Hello ${SALON_CONFIG.brandName}, I would like to check the status of my appointment enquiry #${b.id} for ${b.serviceName} on ${b.date}.`
                )}`;

                return (
                  <div
                    key={b.id}
                    className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold tracking-wider uppercase text-stone-500 font-mono">
                            Ref #{b.id}
                          </span>
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                            {b.status || 'Enquiry Received'}
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-semibold text-stone-900 mt-1">
                          {b.serviceName}
                        </h3>
                        <p className="text-xs text-stone-600 mt-0.5">
                          With {b.specialistName}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-stone-900 tabular-nums">
                        ${b.totalPrice}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span className="tabular-nums">{b.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span className="tabular-nums">{b.timeSlot}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5 text-stone-500 pt-1 border-t border-stone-200/60">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">
                          {SALON_CONFIG.locations[0].address}, {SALON_CONFIG.locations[0].neighborhood}
                        </span>
                      </div>
                    </div>

                    {b.addons.length > 0 && (
                      <div className="text-[11px] text-stone-500">
                        <strong>Requested Add-ons:</strong> {b.addons.join(', ')}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-3">
                        <a
                          href={waFollowupUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-emerald-800 hover:text-emerald-950 font-medium"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Follow up on WhatsApp</span>
                        </a>
                        <button
                          onClick={() => handleDownloadIcs(b)}
                          className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Save .ics</span>
                        </button>
                      </div>
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                        title="Withdraw this enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Withdraw Request</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookings.length > 0 && (
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-xs text-stone-500 text-center sm:text-left">
              Our concierge team will confirm your time slot by phone or WhatsApp.
            </span>
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              New Treatment Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
