export type ScreenId = 'home' | 'about' | 'services' | 'gallery' | 'contact';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'facial' | 'hair' | 'brows-lashes' | 'nails' | 'bridal';
  durationMinutes: number;
  price: number;
  shortDesc: string;
  fullDesc: string;
  keyBotanicals: string[];
  image: string;
  popular?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  bio: string;
  specialties: string[];
  image: string;
  availableDays: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'skin' | 'hair' | 'brows-lashes' | 'bridal' | 'sanctuary';
  image: string;
  beforeImage?: string;
  description: string;
  specialistId: string;
  specialistName: string;
  serviceId: string;
  serviceName: string;
  productsUsed: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  specialistId: string;
  specialistName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  addons: string[];
  totalPrice: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  status: 'Enquiry Received' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface AddonItem {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
}
