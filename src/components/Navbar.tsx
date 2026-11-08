import React, { useState } from 'react';
import { ScreenId } from '../types';
import { SALON_CONFIG } from '../config/salonConfig';
import { Menu, X, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenBooking,
  onOpenMyAppointments,
  bookingCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-serif text-2xl tracking-[0.08em] font-medium text-stone-900 group-hover:text-amber-900 transition-colors uppercase">
            {SALON_CONFIG.brandName}
          </span>
        </button>

        {/* Zone 2: 5 Nav Links (Single-line text) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + My Bookings Quick Access */}
        <div className="flex items-center gap-3 shrink-0">
          {bookingCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="View your appointment enquiries"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-stone-800" />
              <span>My Enquiries ({bookingCount})</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Appointment
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF8F5] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 px-3 text-base font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-stone-200/60 text-stone-900 font-semibold'
                      : 'text-stone-600 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {bookingCount > 0 && (
              <button
                onClick={() => {
                  onOpenMyAppointments();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left py-2 px-3 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md mt-2 border-t border-stone-200 pt-3"
              >
                <CalendarCheck className="w-4 h-4 text-stone-800" />
                <span>My Enquiries ({bookingCount})</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
