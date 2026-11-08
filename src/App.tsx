/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, Booking } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { Toast, ToastMessage } from './components/Toast';
import { WhatsAppButton } from './components/WhatsAppButton';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ServicesScreen } from './screens/ServicesScreen';
import { GalleryScreen } from './screens/GalleryScreen';
import { ContactScreen } from './screens/ContactScreen';

export default function App() {
  // Screen state with hash sync
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'about', 'services', 'gallery', 'contact'].includes(hash)) {
      return hash as ScreenId;
    }
    return 'home';
  });

  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();
  const [preSelectedSpecialistId, setPreSelectedSpecialistId] = useState<string | undefined>();
  const [myAppointmentsOpen, setMyAppointmentsOpen] = useState(false);

  // Bookings persistence
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('lumiere_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Notification toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Hash change listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'about', 'services', 'gallery', 'contact'].includes(hash)) {
        setCurrentScreen(hash as ScreenId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (title: string, message?: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.location.hash = screen;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string, specialistId?: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedSpecialistId(specialistId);
    setBookingModalOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('lumiere_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(
      'Reservation Confirmed',
      `Your ritual for ${newBooking.serviceName} is confirmed for ${newBooking.date} at ${newBooking.timeSlot}.`,
      'success'
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    try {
      localStorage.setItem('lumiere_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Reservation Cancelled', 'Your appointment has been released.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-950">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
        bookingCount={bookings.length}
      />

      {/* Main Screen Router */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen
            onNavigate={handleNavigate}
            onOpenBookingWithSpecialist={(specialistId) =>
              handleOpenBooking(undefined, specialistId)
            }
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentScreen === 'services' && (
          <ServicesScreen
            onNavigate={handleNavigate}
            onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
          />
        )}

        {currentScreen === 'gallery' && (
          <GalleryScreen
            onNavigate={handleNavigate}
            onOpenBookingForService={(serviceId) => handleOpenBooking(serviceId)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactScreen
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Editorial Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
        preSelectedSpecialistId={preSelectedSpecialistId}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Global Client Appointments Modal */}
      <MyAppointmentsModal
        isOpen={myAppointmentsOpen}
        onClose={() => setMyAppointmentsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onBookNew={() => {
          setMyAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Floating WhatsApp Concierge Button */}
      <WhatsAppButton />

      {/* Interactive Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
