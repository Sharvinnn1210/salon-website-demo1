/**
 * @file salonConfig.ts
 * @description CENTRAL EDITABLE CONFIGURATION FILE FOR LUMIÈRE BEAUTY STUDIO
 *
 * ALL business information, contact details, WhatsApp integration, addresses,
 * opening hours, services, and prices are managed exclusively in this single file.
 *
 * Items marked with [PLACEHOLDER] can be replaced with your actual salon details.
 */

import { ServiceItem } from '../types';

export const HERO_IMAGE = '/images/salon-hero.jpg';
export const FACIAL_IMAGE = '/images/facial-glow.jpg';
export const HAIR_IMAGE = '/images/hair-couture.jpg';
export const MAKEUP_IMAGE = '/images/editorial-makeup.jpg';
export const FOUNDER_IMAGE = '/images/founder-esthetician.jpg';

// Specialized public image paths
export const BROWS_IMAGE = '/images/treatment-brows.jpg';
export const BRIDAL_IMAGE = '/images/treatment-bridal.jpg';
export const MASSAGE_IMAGE = '/images/treatment-massage.jpg';
export const SPECIALIST_JULIEN_IMAGE = '/images/specialist-julien.jpg';
export const SPECIALIST_AMARA_IMAGE = '/images/specialist-amara.jpg';
export const SPECIALIST_CAMILLE_IMAGE = '/images/specialist-camille.jpg';
export const BEFORE_FACIAL_IMAGE = '/images/before-facial.jpg';
export const BEFORE_HAIR_IMAGE = '/images/before-hair.jpg';

export interface StudioLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  email: string;
  hours: string;
  transit: string;
  valet: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SalonConfiguration {
  // Brand Basics [PLACEHOLDER]
  brandName: string;
  tagline: string;
  ethosStatement: string;
  foundedYear: number;

  // WhatsApp Configuration [PLACEHOLDER - UPDATE PHONE NUMBER HERE]
  whatsapp: {
    /**
     * Clean phone number with international country code and no +, -, or spaces.
     * Example: '12125550198' for US +1 (212) 555-0198, or '447123456789' for UK.
     * [PLACEHOLDER - REPLACE WITH YOUR LIVE WHATSAPP NUMBER]
     */
    cleanNumber: string;
    /** Formatted human-readable phone number for display */
    displayNumber: string;
    /** Default greeting message when opening chat without specific service */
    defaultMessage: string;
    /** Floating concierge button label */
    buttonLabel: string;
  };

  // Primary Concierge Contact Info [PLACEHOLDER]
  primaryConcierge: {
    phone: string;
    email: string;
    pressEmail: string;
  };

  // Atelier Locations & Operating Hours [PLACEHOLDER]
  locations: StudioLocation[];

  // Treatment Menu with Durations and Prices [PLACEHOLDER - EDIT SERVICES HERE]
  services: ServiceItem[];

  // Treatment Add-ons & Boosters [PLACEHOLDER]
  addons: {
    id: string;
    name: string;
    durationMinutes: number;
    price: number;
    description: string;
  }[];

  // Studio Policies [PLACEHOLDER]
  policies: {
    cancellationWindowHours: number;
    arrivalBufferMinutes: number;
    confirmationNotice: string;
  };
}

export const SALON_CONFIG: SalonConfiguration = {
  // [PLACEHOLDER] Replace with your official business name
  brandName: 'Lumière Beauty Studio',

  // [PLACEHOLDER] Replace with your tagline
  tagline: 'The Art of Illuminated Beauty',

  // [PLACEHOLDER] Replace with your salon mission statement
  ethosStatement:
    'A private atelier sanctuary combining biocompatible cellular science, couture hair balayage, and sculptural facial massage to cultivate your skin’s innate radiant vitality.',

  foundedYear: 2012,

  // [PLACEHOLDER] WhatsApp Integration: Configure your business phone number here
  whatsapp: {
    cleanNumber: '12125550198', // <-- EDIT THIS: Country code + number without symbols
    displayNumber: '+1 (212) 555-0198',
    defaultMessage:
      'Hello Lumière Concierge, I would like to enquire about booking an appointment at your studio.',
    buttonLabel: 'Chat with Concierge',
  },

  // [PLACEHOLDER] Direct reception contact details
  primaryConcierge: {
    phone: '+1 (212) 555-0198',
    email: 'concierge.ny@lumierebeauty.com',
    pressEmail: 'press@lumierebeauty.com',
  },

  // [PLACEHOLDER] Physical Studio Addresses & Opening Hours
  locations: [
    {
      id: 'ny-flagship',
      city: 'New York Flagship',
      name: 'Madison Avenue Sanctuary',
      address: '740 Madison Avenue, 4th Floor',
      neighborhood: 'Upper East Side, New York, NY 10065',
      phone: '+1 (212) 555-0198',
      email: 'concierge.ny@lumierebeauty.com',
      hours: 'Monday – Saturday: 9:00 AM – 7:30 PM | Sunday: 10:00 AM – 5:00 PM',
      transit: '6 Train to 68th St / Hunter College (3 min walk) or 4/5/6/N/R/W to 59th St Lex',
      valet: 'Complimentary white-glove valet parking available at our private carriage entrance on 64th Street.',
      coordinates: {
        lat: 40.7675,
        lng: -73.9692,
      },
    },
    {
      id: 'paris-atelier',
      city: 'Paris Atelier',
      name: 'Place Vendôme Atelier',
      address: '18 Place Vendôme',
      neighborhood: '75001 Paris, France',
      phone: '+33 1 42 68 50 00',
      email: 'paris@lumierebeauty.com',
      hours: 'Mardi – Samedi: 10:00 – 19:30 | Lundi & Dimanche: Réservations Privées',
      transit: 'Métro Tuileries (Ligne 1) ou Opéra (Lignes 3, 7, 8)',
      valet: 'Service Voiturier privé Place Vendôme disponible sur réservation.',
      coordinates: {
        lat: 48.8675,
        lng: 2.3294,
      },
    },
  ],

  // [PLACEHOLDER] Services Menu: Edit treatment names, durations, categories, and prices here
  services: [
    {
      id: 'grand-cru-facial',
      name: 'Grand Cru Cellular Radiance Facial',
      category: 'facial',
      durationMinutes: 90,
      price: 380,
      shortDesc: 'Multi-tiered oxygenation, customized diamond micro-peel, sculptural buccal massage, and pure stem-cell botanical infusion.',
      fullDesc: 'Our signature clinical ritual begins with a skin impedance diagnostic followed by gentle ultrasonic cavitation, enzymatic grape-seed exfoliation, and a 30-minute sculpted buccal massage that stimulates collagen synthesis and relieves jaw tension. Concludes with cryogenic firming and a customized biocompatible peptide seal.',
      keyBotanicals: ['Swiss Alpine Edelweiss', 'Bio-Fermented Squalane', 'Resveratrol Liposomes', 'Hyaluronic Tri-Molecule'],
      image: FACIAL_IMAGE,
      popular: true,
    },
    {
      id: 'lumiere-glow-express',
      name: 'Illuminating Botanical Reset',
      category: 'facial',
      durationMinutes: 60,
      price: 240,
      shortDesc: 'Targeted hydration infusion, gentle lactic acid peel, and red-light phototherapy for an immediate luminous finish.',
      fullDesc: 'An express yet deeply restorative ritual engineered for busy city dwellers. Features warm rosewater steam, barrier-strengthening niacinamide mist, manual lymphatic pumping, and medical-grade red light phototherapy to energize cellular ATP.',
      keyBotanicals: ['Damask Rose Hydrosol', 'Niacinamide 5%', 'Gotu Kola Extract', 'Cold-Pressed Camellia Oil'],
      image: FACIAL_IMAGE,
    },
    {
      id: 'couture-balayage',
      name: 'Atelier French Balayage & Silk Gloss',
      category: 'hair',
      durationMinutes: 180,
      price: 460,
      shortDesc: 'Bespoke freehand painting that follows natural light reflection, followed by acidic gloss toner and silk protein treatment.',
      fullDesc: 'A couture coloring service that preserves hair integrity using ammonia-free clay lighteners infused with bond-rebuilding amino acids. Finished with a customized semi-permanent conditioning gloss that seals cuticles with brilliant diamond shine.',
      keyBotanicals: ['Organic Argan Oil', 'Vegetable Keratin', 'White Tea Polyphenols', 'Hydrolyzed Silk'],
      image: HAIR_IMAGE,
      popular: true,
    },
    {
      id: 'hair-architecture-cut',
      name: 'Architectural Cut & Scalp Detox',
      category: 'hair',
      durationMinutes: 75,
      price: 210,
      shortDesc: 'Thermal scalp exfoliation, botanical steam therapy, and precision dry-cutting designed to harmonize with your facial structure.',
      fullDesc: 'Begins with an invigorating peppermint and sea kelp scalp scrub under warm steam to clear follicular buildup. Followed by a relaxing shiatsu acupressure head massage and a dry precision haircut tailored to personal hair density and natural movement.',
      keyBotanicals: ['Atlantic Sea Kelp', 'Wild Peppermint', 'Jojoba Golden Oil', 'Rosemary Leaf Essence'],
      image: HAIR_IMAGE,
    },
    {
      id: 'keratin-brow-architecture',
      name: 'Feathered Brow Architecture & Tint',
      category: 'brows-lashes',
      durationMinutes: 60,
      price: 155,
      shortDesc: 'Golden ratio facial mapping, organic keratin lamination, gentle wax precision shaping, and custom-blended mineral tinting.',
      fullDesc: 'Elevate your natural eye geometry. We map brows according to unique cranial bone structure, groom unruly hairs with a gentle keratin conditioning balm, shape using organic pine resin wax, and apply a multidimensional mineral dye that stays vibrant for up to 6 weeks.',
      keyBotanicals: ['Plant Keratin', 'Castor Seed Oil', 'Organic Aloe Leaf', 'Mineral Pigment Infusion'],
      image: BROWS_IMAGE,
      popular: true,
    },
    {
      id: 'cashmere-lash-elevation',
      name: 'Cashmere Lash Lift & Keratin Glaze',
      category: 'brows-lashes',
      durationMinutes: 60,
      price: 170,
      shortDesc: 'Gentle silicone curling shield, nourishing biotin glaze, and deep midnight-black gloss for natural flutter.',
      fullDesc: 'A formaldehyde-free curling ritual that lifts lashes straight from the root without pinching. Enriched with strengthening biotin and marine collagen to fortify hair fibers, followed by an inky gloss treatment for mascara-like definition.',
      keyBotanicals: ['Biotin Fortifier', 'Marine Collagen', 'Chamomile Extract', 'Panthenol Provitamin B5'],
      image: MAKEUP_IMAGE,
    },
    {
      id: 'botanical-manicure-pedicure',
      name: 'Kintsugi Botanical Manicure & Pedicure',
      category: 'nails',
      durationMinutes: 90,
      price: 185,
      shortDesc: 'Warm almond milk soak, sugar exfoliation, warm paraffin hydration, cuticles groomed, and breathable 10-free polish.',
      fullDesc: 'Indulge tired hands and feet in a soothing warm sweet almond milk bath with dried calendula flowers. Includes organic raw cane sugar scrub, deep tension massage, nourishing warm beeswax wrap, and non-toxic high-shine breathable lacquer.',
      keyBotanicals: ['Sweet Almond Milk', 'Calendula Petals', 'Raw Shea Butter', 'Bergamot Essential Oil'],
      image: MASSAGE_IMAGE,
    },
    {
      id: 'bridal-couture-preview',
      name: 'Bridal Haute Artistry Consultation & Trial',
      category: 'bridal',
      durationMinutes: 150,
      price: 520,
      shortDesc: 'Comprehensive skin analysis, custom veil and gown harmony study, bespoke trial makeup, and hair sculpture test.',
      fullDesc: 'Our dedicated bridal director curates a private atelier suite session to design an enduring wedding-day look. Includes a customized hydration veil preparation, high-definition camera testing under both natural daylight and reception evening candlelight, and a tailored timeline for pre-wedding rituals.',
      keyBotanicals: ['White Truffle Extract', 'Neroli Blossom Water', 'Centella Asiatica', 'Pearl Micro-Reflectors'],
      image: BRIDAL_IMAGE,
      popular: true,
    },
  ],

  // [PLACEHOLDER] Add-ons & Enhancements
  addons: [
    {
      id: 'addon-led',
      name: 'Medical-Grade LED Phototherapy',
      durationMinutes: 20,
      price: 65,
      description: 'Targeted blue and red photon wavelengths to stimulate cellular ATP, reduce inflammation, and accelerate recovery.',
    },
    {
      id: 'addon-24k-gold',
      name: '24K Pure Gold Leaf Infusion',
      durationMinutes: 15,
      price: 95,
      description: 'Hand-pressed edible cosmetic gold sheets paired with hyaluronic serum to provide instant luminous micro-reflection.',
    },
    {
      id: 'addon-lymphatic-eye',
      name: 'Lymphatic Cryo-Sculpt Eye Contour',
      durationMinutes: 15,
      price: 50,
      description: 'Surgical stainless steel cold globes with caffeine and green tea peptide extract to banish dark circles and under-eye puffiness.',
    },
    {
      id: 'addon-scalp-ritual',
      name: 'Shiatsu Botanical Scalp Massage',
      durationMinutes: 20,
      price: 60,
      description: 'Warm cedarwood and rosemary oils worked through cranial meridian points to dissolve tension and nourish hair follicles.',
    },
  ],

  // [PLACEHOLDER] Atelier Service Policies
  policies: {
    cancellationWindowHours: 24,
    arrivalBufferMinutes: 15,
    confirmationNotice:
      'Online submissions are appointment enquiries. Our studio concierge will contact you to verify schedule availability and confirm your booking.',
  },
};

/**
 * Helper to generate a contextual WhatsApp conversation link with pre-filled service details.
 * @param serviceName Optional treatment name to pre-fill
 * @param preferredDateTime Optional preferred date/time string
 */
export function getWhatsAppUrl(serviceName?: string, preferredDateTime?: string): string {
  let message = SALON_CONFIG.whatsapp.defaultMessage;
  if (serviceName && preferredDateTime) {
    message = `Hello ${SALON_CONFIG.brandName}, I would like to enquire about availability for "${serviceName}" on ${preferredDateTime}.`;
  } else if (serviceName) {
    message = `Hello ${SALON_CONFIG.brandName}, I would like to enquire about booking the "${serviceName}" treatment. Could you share current availability?`;
  }
  return `https://wa.me/${SALON_CONFIG.whatsapp.cleanNumber}?text=${encodeURIComponent(message)}`;
}
