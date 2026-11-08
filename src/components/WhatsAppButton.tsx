import React, { useState } from 'react';
import { SALON_CONFIG, getWhatsAppUrl } from '../config/salonConfig';
import { MessageCircle, X, ExternalLink } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const waUrl = getWhatsAppUrl();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-stone-200 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-800 block">
                Direct WhatsApp Concierge
              </span>
              <h4 className="font-serif text-base font-semibold text-stone-900">
                {SALON_CONFIG.brandName}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md"
              aria-label="Close WhatsApp card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Connect directly with our master concierge for private inquiries, custom booking arrangements, or same-day appointments.
          </p>

          <div className="bg-stone-50 rounded-lg p-2.5 text-[11px] text-stone-600 border border-stone-100 flex items-center justify-between">
            <span>Direct Number:</span>
            <span className="font-mono font-medium text-stone-900">
              {SALON_CONFIG.whatsapp.displayNumber}
            </span>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open in WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-full shadow-xl border border-stone-700 transition-all hover:scale-105 cursor-pointer"
        aria-label="Open WhatsApp Concierge"
        title="Chat with Lumière Concierge on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
        </div>
        <span className="text-xs font-medium tracking-wide pr-1 hidden sm:inline-block">
          WhatsApp Concierge
        </span>
      </button>
    </div>
  );
};
