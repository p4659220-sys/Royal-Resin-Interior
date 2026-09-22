export type ServiceCategoryType = 
  | 'metallic-marble'
  | '2d-flooring'
  | '3d-flooring'
  | 'wall-art'
  | 'staircase'
  | 'ceiling'
  | 'commercial-industrial';

export interface DesignCategory {
  id: string;
  slug: ServiceCategoryType;
  name: string;
  shortDesc: string;
  image: string;
  badge?: string;
  totalDesigns: number;
}

export interface DesignItem {
  id: string;
  code: string; // e.g. "ME-01", "3D-FL-01"
  name: string;
  category: ServiceCategoryType;
  subType?: '2D' | '3D' | 'Metallic' | 'Custom' | 'Terrazzo' | 'Glow';
  description: string;
  mainImage: string;
  galleryImages?: string[];
  suitableLocations: string[]; // e.g. ['Living Room', 'Hotel Lobby', 'Bathroom']
  features: string[];
  minRate: number; // in INR
  maxRate: number; // in INR
  unit: 'sq.ft.' | 'step' | 'project';
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  slug: ServiceCategoryType;
  name: string;
  tagline: string;
  description: string;
  mainImage: string;
  galleryImages?: string[];
  features: string[];
  suitableLocations: string[];
  minRate: number;
  maxRate: number;
  unit: 'sq.ft.' | 'step' | 'project';
  isPublished: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  location: string;
  category: ServiceCategoryType;
  designUsed: string;
  area: string; // e.g. "1,200 sq.ft."
  beforeImage: string;
  afterImage: string;
  gallery?: string[];
  description: string;
  clientName?: string;
  completionDate: string;
  isPublished: boolean;
}

export type BookingStatus = 
  | 'New'
  | 'Contacted'
  | 'Visit Scheduled'
  | 'Visit Completed'
  | 'Quotation Sent'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface BookingNote {
  id: string;
  text: string;
  date: string;
  author: string;
}

export interface SiteVisitBooking {
  id: string;
  customerName: string;
  mobile: string;
  email?: string;
  fullAddress: string;
  city: string;
  pinCode?: string;
  serviceCategory: string;
  selectedDesignCode?: string;
  approxArea: string; // e.g. "500 sq.ft."
  preferredDate: string;
  preferredTime: string;
  requirementNotes?: string;
  spacePhotoUrl?: string;
  status: BookingStatus;
  notes?: BookingNote[];
  createdAt: string;
}

export type EnquiryStatus = 
  | 'New'
  | 'Contacted'
  | 'Follow-up'
  | 'Quotation Sent'
  | 'Converted'
  | 'Closed';

export interface EnquiryItem {
  id: string;
  name: string;
  mobile: string;
  location: string;
  service: string;
  design?: string;
  approxArea?: string;
  message: string;
  photoUrl?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  location: string;
  serviceUsed: string;
  review: string;
  rating: number;
  photo?: string;
  date: string;
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  order: number;
}

export interface HomePageContent {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  whyChooseUs: {
    title: string;
    description: string;
    iconName: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  finalCtaTitle: string;
  finalCtaSubtitle: string;
}

export interface CompanyInfo {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  fullAddress: string;
  gmapUrl: string;
  businessHours: string;
  announcementTitle?: string;
  announcementSubtitle?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    pinterest?: string;
  };
  currencySymbol: string;
}

export interface ServiceArea {
  id: string;
  city: string;
  district: string;
  state: string;
  nearbyAreas: string[];
  active: boolean;
}

export interface AppNotification {
  id: string;
  type: 'booking' | 'enquiry' | 'project';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  targetId?: string;
}

export interface AdminUser {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

export interface FullscreenImageModalData {
  url: string;
  title?: string;
  subtitle?: string;
  code?: string;
  category?: string;
  minRate?: number;
  maxRate?: number;
  unit?: string;
  designItem?: DesignItem;
  allImages?: string[];
  currentIndex?: number;
}

export interface MediaVaultItem {
  id: string;
  name: string;
  url: string;
  category?: string;
  sizeBytes?: number;
  uploadedAt: string;
}
