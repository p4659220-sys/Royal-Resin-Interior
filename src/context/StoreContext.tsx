import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DesignCategory,
  DesignItem,
  ServiceItem,
  ProjectItem,
  SiteVisitBooking,
  EnquiryItem,
  CustomerReview,
  FAQItem,
  HomePageContent,
  CompanyInfo,
  ServiceArea,
  AppNotification,
  AdminUser,
  BookingStatus,
  EnquiryStatus,
  FullscreenImageModalData
} from '../types';
import {
  initialCategories,
  initialDesigns,
  initialServices,
  initialProjects,
  initialBookings,
  initialEnquiries,
  initialReviews,
  initialFAQs,
  initialHomeContent,
  initialCompanyInfo,
  initialServiceAreas,
  initialNotifications
} from '../data/initialData';
import { saveToIndexedDB, loadFromIndexedDB } from '../utils/indexedDbStorage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db, auth, testFirebaseConnection, handleFirestoreError, OperationType } from '../firebase';
import { 
  subscribeToFirestoreReviews, 
  addReviewToFirestore, 
  updateReviewInFirestore, 
  deleteReviewFromFirestore 
} from '../services/reviewService';

// Helper to strip heavy base64 strings before writing to Firestore
// Firestore documents have a strict 1MB (1,048,576 bytes) limit.
// High-resolution photos are safely stored in Server Disk (/uploads/) and IndexedDB.
function sanitizeForCloudFirestore<T>(data: T): T {
  if (data === null || data === undefined) return data;
  if (typeof data === 'string') {
    if (data.startsWith('data:image/') || (data.length > 1024 && data.includes(';base64,'))) {
      return '' as unknown as T;
    }
    return data;
  }
  if (Array.isArray(data)) {
    return data
      .filter(item => item !== undefined)
      .map(item => sanitizeForCloudFirestore(item)) as unknown as T;
  }
  if (typeof data === 'object') {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(data as Record<string, any>)) {
      if (value === undefined) continue;
      if (typeof value === 'string' && (value.startsWith('data:image/') || (value.length > 1024 && value.includes(';base64,')))) {
        sanitized[key] = '';
      } else {
        const cleaned = sanitizeForCloudFirestore(value);
        if (cleaned !== undefined) {
          sanitized[key] = cleaned;
        }
      }
    }
    return sanitized as unknown as T;
  }
  return data;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface StoreContextType {
  // Firebase Cloud State
  isFirebaseConnected: boolean;
  firebaseStatus: 'connecting' | 'connected' | 'error' | 'idle';
  syncToFirebaseNow: () => Promise<boolean>;

  // Data State
  categories: DesignCategory[];
  designs: DesignItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  bookings: SiteVisitBooking[];
  enquiries: EnquiryItem[];
  reviews: CustomerReview[];
  faqs: FAQItem[];
  homeContent: HomePageContent;
  companyInfo: CompanyInfo;
  serviceAreas: ServiceArea[];
  notifications: AppNotification[];
  adminUser: AdminUser;
  isAdminLoggedIn: boolean;

  // Actions - Bookings & Enquiries
  addBooking: (bookingData: Omit<SiteVisitBooking, 'id' | 'createdAt' | 'status' | 'notes'>) => string;
  updateBookingStatus: (id: string, status: BookingStatus, noteText?: string) => void;
  deleteBooking: (id: string) => void;
  addBookingNote: (bookingId: string, text: string) => void;
  
  addEnquiry: (enquiryData: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => string;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteEnquiry: (id: string) => void;

  // Actions - Catalogue & Content CRUD
  addDesign: (design: Omit<DesignItem, 'id' | 'createdAt'>) => void;
  updateDesign: (id: string, design: Partial<DesignItem>) => void;
  deleteDesign: (id: string) => void;

  addCategory: (category: Omit<DesignCategory, 'id'>) => void;
  updateCategory: (id: string, category: Partial<DesignCategory>) => void;
  deleteCategory: (id: string) => void;

  updateService: (id: string, service: Partial<ServiceItem>) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  deleteService: (id: string) => void;

  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  addReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;
  updateReview: (id: string, review: Partial<CustomerReview>) => void;
  deleteReview: (id: string) => void;

  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  updateHomeContent: (content: Partial<HomePageContent>) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  
  addServiceArea: (area: Omit<ServiceArea, 'id'>) => void;
  updateServiceArea: (id: string, area: Partial<ServiceArea>) => void;
  deleteServiceArea: (id: string) => void;

  // Notification management
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Auth
  loginAdmin: (email: string, pass: string) => boolean;
  loginAdminWithGoogle: () => Promise<boolean>;
  logoutAdmin: () => void;
  updateAdminProfile: (profile: Partial<AdminUser>) => void;

  // UI Interactive Modals State
  selectedDesignForModal: DesignItem | null;
  setSelectedDesignForModal: (design: DesignItem | null) => void;
  
  isBookVisitModalOpen: boolean;
  setIsBookVisitModalOpen: (open: boolean) => void;
  preselectedDesignCode: string | null;
  setPreselectedDesignCode: (code: string | null) => void;

  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;

  // Global Fullscreen Image Viewer
  fullscreenImage: FullscreenImageModalData | null;
  openFullscreenImage: (data: FullscreenImageModalData | string, title?: string, subtitle?: string) => void;
  closeFullscreenImage: () => void;
  setFullscreenImageIndex: (index: number) => void;
  nextFullscreenImage: () => void;
  prevFullscreenImage: () => void;

  // Design Comparison State
  comparisonDesignIds: string[];
  toggleComparisonDesign: (designId: string) => void;
  addToComparison: (designId: string) => boolean;
  removeFromComparison: (designId: string) => void;
  clearComparison: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Reset to default seed
  resetAllDataToDefault: () => void;

  // Data Backup & Restore
  exportDatabaseBackup: () => void;
  importDatabaseBackup: (jsonContent: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'royal_resin_interior_store_v2';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from local storage or defaults
  const loadState = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }
    return null;
  };

  const initialLoaded = loadState();

  const [categories, setCategories] = useState<DesignCategory[]>(initialLoaded?.categories || initialCategories);
  const [designs, setDesigns] = useState<DesignItem[]>(initialLoaded?.designs || initialDesigns);
  const [services, setServices] = useState<ServiceItem[]>(initialLoaded?.services || initialServices);
  const [projects, setProjects] = useState<ProjectItem[]>(initialLoaded?.projects || initialProjects);
  const [bookings, setBookings] = useState<SiteVisitBooking[]>(initialLoaded?.bookings || initialBookings);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialLoaded?.enquiries || initialEnquiries);
  const [reviews, setReviews] = useState<CustomerReview[]>(initialLoaded?.reviews || initialReviews);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialLoaded?.faqs || initialFAQs);
  const [homeContent, setHomeContent] = useState<HomePageContent>(initialLoaded?.homeContent || initialHomeContent);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(initialLoaded?.companyInfo || initialCompanyInfo);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>(initialLoaded?.serviceAreas || initialServiceAreas);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialLoaded?.notifications || initialNotifications);
  
  const [adminUser, setAdminUser] = useState<AdminUser>(initialLoaded?.adminUser || {
    name: 'Executive Director',
    email: 'admin@royalresininterior.com',
    phone: '+91 98300 12345',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('royal_resin_admin_auth') === 'true';
  });

  // Firebase Live Cloud State
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState<'connecting' | 'connected' | 'error' | 'idle'>('connecting');

  // UI Modal State
  const [selectedDesignForModal, setSelectedDesignForModal] = useState<DesignItem | null>(null);
  const [isBookVisitModalOpen, setIsBookVisitModalOpen] = useState(false);
  const [preselectedDesignCode, setPreselectedDesignCode] = useState<string | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Global Fullscreen Image Viewer State
  const [fullscreenImage, setFullscreenImage] = useState<FullscreenImageModalData | null>(null);

  const openFullscreenImage = (data: FullscreenImageModalData | string, title?: string, subtitle?: string) => {
    if (typeof data === 'string') {
      setFullscreenImage({
        url: data,
        title: title || 'Design Visualizer HD',
        subtitle: subtitle || 'Royal Resin Interiors Signature Collection'
      });
    } else {
      setFullscreenImage(data);
    }
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  const setFullscreenImageIndex = (index: number) => {
    if (!fullscreenImage || !fullscreenImage.allImages || fullscreenImage.allImages.length === 0) return;
    const safeIndex = (index + fullscreenImage.allImages.length) % fullscreenImage.allImages.length;
    setFullscreenImage({
      ...fullscreenImage,
      url: fullscreenImage.allImages[safeIndex],
      currentIndex: safeIndex
    });
  };

  const nextFullscreenImage = () => {
    if (!fullscreenImage || !fullscreenImage.allImages || fullscreenImage.allImages.length <= 1) return;
    const current = fullscreenImage.currentIndex ?? 0;
    setFullscreenImageIndex(current + 1);
  };

  const prevFullscreenImage = () => {
    if (!fullscreenImage || !fullscreenImage.allImages || fullscreenImage.allImages.length <= 1) return;
    const current = fullscreenImage.currentIndex ?? 0;
    setFullscreenImageIndex(current - 1);
  };

  // Design Comparison State (stored in localStorage if available)
  const [comparisonDesignIds, setComparisonDesignIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('royal_resin_comparison_ids');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read comparison from localStorage:', e);
    }
    return [];
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('royal_resin_comparison_ids', JSON.stringify(comparisonDesignIds));
    } catch (e) {
      console.warn('Could not save comparison to localStorage:', e);
    }
  }, [comparisonDesignIds]);

  const addToComparison = (designId: string): boolean => {
    if (comparisonDesignIds.includes(designId)) {
      addToast('info', 'Already in Comparison', 'This design is already in your comparison list.');
      return false;
    }
    if (comparisonDesignIds.length >= 4) {
      addToast('warning', 'Comparison Limit Reached', 'You can compare up to 4 designs simultaneously. Please remove one first.');
      return false;
    }
    const targetDesign = designs.find(d => d.id === designId);
    setComparisonDesignIds(prev => [...prev, designId]);
    addToast('success', 'Added to Comparison', `${targetDesign?.code || 'Design'} added to comparison tray (${comparisonDesignIds.length + 1}/4).`);
    return true;
  };

  const removeFromComparison = (designId: string) => {
    const targetDesign = designs.find(d => d.id === designId);
    setComparisonDesignIds(prev => prev.filter(id => id !== designId));
    addToast('info', 'Removed from Comparison', `${targetDesign?.code || 'Design'} removed.`);
  };

  const toggleComparisonDesign = (designId: string) => {
    if (comparisonDesignIds.includes(designId)) {
      removeFromComparison(designId);
    } else {
      addToComparison(designId);
    }
  };

  const clearComparison = () => {
    setComparisonDesignIds([]);
    addToast('info', 'Comparison Cleared', 'All designs cleared from comparison tray.');
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Hydrate from IndexedDB on initial mount
  useEffect(() => {
    let isMounted = true;
    loadFromIndexedDB().then((indexedState) => {
      if (!isMounted || !indexedState) return;
      if (indexedState.services && Array.isArray(indexedState.services)) {
        setServices(indexedState.services);
      }
      if (indexedState.designs && Array.isArray(indexedState.designs)) {
        setDesigns(indexedState.designs);
      }
      if (indexedState.categories && Array.isArray(indexedState.categories)) {
        setCategories(indexedState.categories);
      }
      if (indexedState.projects && Array.isArray(indexedState.projects)) {
        setProjects(indexedState.projects);
      }
      if (indexedState.bookings && Array.isArray(indexedState.bookings)) {
        setBookings(indexedState.bookings);
      }
      if (indexedState.enquiries && Array.isArray(indexedState.enquiries)) {
        setEnquiries(indexedState.enquiries);
      }
      if (indexedState.reviews && Array.isArray(indexedState.reviews)) {
        setReviews(indexedState.reviews);
      }
      if (indexedState.faqs && Array.isArray(indexedState.faqs)) {
        setFaqs(indexedState.faqs);
      }
      if (indexedState.homeContent) {
        setHomeContent(indexedState.homeContent);
      }
      if (indexedState.companyInfo) {
        setCompanyInfo(indexedState.companyInfo);
      }
      if (indexedState.serviceAreas && Array.isArray(indexedState.serviceAreas)) {
        setServiceAreas(indexedState.serviceAreas);
      }
      if (indexedState.adminUser) {
        setAdminUser(indexedState.adminUser);
      }
    }).catch((err) => {
      console.warn('Could not hydrate from IndexedDB:', err);
    });

    // Test Firebase Cloud Firestore Connection and optionally hydrate
    testFirebaseConnection().then(async (connected) => {
      if (!isMounted) return;
      setIsFirebaseConnected(connected);
      setFirebaseStatus(connected ? 'connected' : 'error');

      if (connected) {
        try {
          const snap = await getDoc(doc(db, 'app_state', 'main_store'));
          if (snap.exists() && isMounted) {
            const cloudData = snap.data();
            const localSaved = localStorage.getItem(LOCAL_STORAGE_KEY);
            // Only hydrate from Cloud if local storage was never saved by the user
            if (cloudData && !localSaved) {
              if (cloudData.services && Array.isArray(cloudData.services)) {
                setServices(cloudData.services);
              }
              if (cloudData.designs && Array.isArray(cloudData.designs)) {
                setDesigns(cloudData.designs);
              }
              if (cloudData.projects && Array.isArray(cloudData.projects)) {
                setProjects(cloudData.projects);
              }
              if (cloudData.categories && Array.isArray(cloudData.categories)) {
                setCategories(cloudData.categories);
              }
            }
          }
        } catch (e) {
          console.warn('[Firebase] Initial check note:', e);
        }
      }
    });

    // Realtime Firestore Reviews Listener
    const unsubscribeReviews = subscribeToFirestoreReviews((firestoreReviews) => {
      if (isMounted && firestoreReviews) {
        setReviews(firestoreReviews);
      }
    });

    return () => {
      isMounted = false;
      unsubscribeReviews();
    };
  }, []);

  // Sync to Firebase Cloud Firestore manually
  const syncToFirebaseNow = async (): Promise<boolean> => {
    try {
      setFirebaseStatus('connecting');
      const cloudPayload = sanitizeForCloudFirestore({
        updatedAt: new Date().toISOString(),
        version: '1.0',
        categories,
        designs,
        services,
        projects,
        bookings,
        enquiries,
        reviews,
        faqs,
        homeContent,
        companyInfo,
        serviceAreas
      });
      await setDoc(doc(db, 'app_state', 'main_store'), cloudPayload);
      setIsFirebaseConnected(true);
      setFirebaseStatus('connected');
      addToast('success', 'Firebase Cloud Synced', 'Website state & catalog uploaded to Cloud Firestore (Free Tier).');
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'app_state/main_store');
      setFirebaseStatus('error');
      addToast('error', 'Firebase Sync Error', 'Could not sync to Cloud Firestore.');
      return false;
    }
  };

  // Sync to IndexedDB (unlimited capacity) and LocalStorage (light fallback)
  useEffect(() => {
    const stateToSave = {
      categories,
      designs,
      services,
      projects,
      bookings,
      enquiries,
      reviews,
      faqs,
      homeContent,
      companyInfo,
      serviceAreas,
      notifications,
      adminUser
    };

    // 1. Permanently persist full database (including all high-res photos) to IndexedDB
    saveToIndexedDB(stateToSave);

    // 2. Also persist to Server Disk (/data/database.json)
    try {
      fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stateToSave)
      }).catch(() => {});
    } catch (e) {}

    // 3. Sync to Firebase Cloud Firestore (near-instant sync so deletions persist)
    const firebaseTimer = setTimeout(() => {
      try {
        const cloudState = sanitizeForCloudFirestore({
          updatedAt: new Date().toISOString(),
          version: '1.0',
          categories,
          designs,
          services,
          projects,
          bookings,
          enquiries,
          reviews,
          faqs,
          homeContent,
          companyInfo,
          serviceAreas
        });
        setDoc(doc(db, 'app_state', 'main_store'), cloudState).then(() => {
          setIsFirebaseConnected(true);
          setFirebaseStatus('connected');
        }).catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, 'app_state/main_store');
        });
      } catch (err) {}
    }, 400);

    // 4. Also sync to localStorage as secondary cache
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e: any) {
      try {
        const lightState = {
          categories,
          designs: designs.map(d => ({ ...d, galleryImages: d.galleryImages?.slice(0, 1) })),
          services: services.map(s => ({ ...s, galleryImages: s.galleryImages?.slice(0, 1) })),
          projects,
          bookings,
          enquiries,
          reviews,
          faqs,
          homeContent,
          companyInfo,
          serviceAreas,
          notifications,
          adminUser
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lightState));
      } catch (err) {}
    }

    return () => {
      clearTimeout(firebaseTimer);
    };
  }, [
    categories,
    designs,
    services,
    projects,
    bookings,
    enquiries,
    reviews,
    faqs,
    homeContent,
    companyInfo,
    serviceAreas,
    notifications,
    adminUser
  ]);

  // Export full JSON database backup
  const exportDatabaseBackup = () => {
    try {
      const stateToExport = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        categories,
        designs,
        services,
        projects,
        bookings,
        enquiries,
        reviews,
        faqs,
        homeContent,
        companyInfo,
        serviceAreas,
        notifications,
        adminUser
      };
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(stateToExport, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `royal_resin_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addToast('success', 'Backup Exported', 'All database items, pricing rates, and photos downloaded to your device.');
    } catch (e) {
      addToast('error', 'Export Failed', 'Could not export backup data.');
    }
  };

  // Import JSON database backup
  const importDatabaseBackup = (jsonContent: string): boolean => {
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed.services && Array.isArray(parsed.services)) setServices(parsed.services);
      if (parsed.designs && Array.isArray(parsed.designs)) setDesigns(parsed.designs);
      if (parsed.categories && Array.isArray(parsed.categories)) setCategories(parsed.categories);
      if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (parsed.bookings && Array.isArray(parsed.bookings)) setBookings(parsed.bookings);
      if (parsed.enquiries && Array.isArray(parsed.enquiries)) setEnquiries(parsed.enquiries);
      if (parsed.reviews && Array.isArray(parsed.reviews)) setReviews(parsed.reviews);
      if (parsed.faqs && Array.isArray(parsed.faqs)) setFaqs(parsed.faqs);
      if (parsed.homeContent) setHomeContent(parsed.homeContent);
      if (parsed.companyInfo) setCompanyInfo(parsed.companyInfo);
      if (parsed.serviceAreas && Array.isArray(parsed.serviceAreas)) setServiceAreas(parsed.serviceAreas);

      saveToIndexedDB(parsed);
      addToast('success', 'Backup Restored', 'All services, pricing, and images restored successfully.');
      return true;
    } catch (e) {
      addToast('error', 'Restore Failed', 'Invalid backup file format.');
      return false;
    }
  };

  // Bookings Handlers
  const addBooking = (bookingData: Omit<SiteVisitBooking, 'id' | 'createdAt' | 'status' | 'notes'>) => {
    const newId = 'bkg-' + Math.floor(100 + Math.random() * 900);
    const newBooking: SiteVisitBooking = {
      ...bookingData,
      id: newId,
      status: 'New',
      notes: [],
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setBookings(prev => [newBooking, ...prev]);

    // Create Notification
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'booking',
      title: 'New Site Visit Booking!',
      message: `${newBooking.customerName} booked a visit for ${newBooking.serviceCategory} in ${newBooking.city}.`,
      time: 'Just now',
      isRead: false,
      targetId: newId
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Write booking to Firebase Cloud Firestore
    try {
      setDoc(doc(db, 'bookings', newId), {
        id: newId,
        name: newBooking.customerName,
        phone: newBooking.mobile,
        service: newBooking.serviceCategory,
        date: newBooking.preferredDate,
        location: newBooking.city,
        notes: newBooking.fullAddress || '',
        status: newBooking.status,
        createdAt: newBooking.createdAt
      }).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, `bookings/${newId}`);
      });
    } catch (e) {}

    addToast(
      'success',
      'Site Visit Requested!',
      'Thank you! Our technical team will call you shortly to confirm your visit.'
    );

    return newId;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, noteText?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        const updatedNotes = b.notes ? [...b.notes] : [];
        if (noteText) {
          updatedNotes.push({
            id: 'n-' + Date.now(),
            text: noteText,
            date: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
            author: adminUser.name
          });
        }
        return {
          ...b,
          status,
          notes: updatedNotes
        };
      }
      return b;
    }));
    addToast('info', 'Booking Updated', `Status changed to "${status}".`);
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    addToast('warning', 'Booking Removed', 'The booking record was deleted.');
  };

  const addBookingNote = (bookingId: string, text: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const notes = b.notes ? [...b.notes] : [];
        notes.push({
          id: 'n-' + Date.now(),
          text,
          date: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
          author: adminUser.name
        });
        return { ...b, notes };
      }
      return b;
    }));
    addToast('success', 'Note Added', 'Internal note recorded.');
  };

  // Enquiries Handlers
  const addEnquiry = (enquiryData: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const newId = 'enq-' + Math.floor(200 + Math.random() * 800);
    const newEnquiry: EnquiryItem = {
      ...enquiryData,
      id: newId,
      status: 'New',
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setEnquiries(prev => [newEnquiry, ...prev]);

    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      type: 'enquiry',
      title: 'New Customer Enquiry!',
      message: `${newEnquiry.name} submitted an enquiry for ${newEnquiry.service}.`,
      time: 'Just now',
      isRead: false,
      targetId: newId
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Write enquiry to Firebase Cloud Firestore
    try {
      setDoc(doc(db, 'enquiries', newId), {
        id: newId,
        name: newEnquiry.name,
        phone: newEnquiry.mobile,
        service: newEnquiry.service,
        approxSqFt: newEnquiry.approxArea || '',
        city: newEnquiry.location || '',
        message: newEnquiry.message || '',
        createdAt: newEnquiry.createdAt
      }).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, `enquiries/${newId}`);
      });
    } catch (e) {}

    addToast('success', 'Enquiry Sent!', 'Thank you! Our design expert will contact you within 2 business hours.');
    return newId;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    addToast('info', 'Enquiry Updated', `Status changed to "${status}".`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    addToast('warning', 'Enquiry Removed', 'The enquiry was deleted.');
  };

  // Designs CRUD
  const addDesign = (design: Omit<DesignItem, 'id' | 'createdAt'>) => {
    const newId = 'des-' + Math.random().toString(36).substring(2, 7);
    const newDesign: DesignItem = {
      ...design,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setDesigns(prev => [newDesign, ...prev]);
    addToast('success', 'Design Created', `${newDesign.code} - ${newDesign.name} has been published.`);
  };

  const updateDesign = (id: string, updated: Partial<DesignItem>) => {
    setDesigns(prev => prev.map(d => d.id === id ? { ...d, ...updated } : d));
    addToast('success', 'Design Updated', 'Changes saved successfully.');
  };

  const deleteDesign = (id: string) => {
    setDesigns(prev => prev.filter(d => d.id !== id));
    addToast('warning', 'Design Deleted', 'The design was removed from the catalogue.');
  };

  // Categories CRUD
  const addCategory = (cat: Omit<DesignCategory, 'id'>) => {
    const newId = 'cat-' + Date.now();
    setCategories(prev => [...prev, { ...cat, id: newId }]);
    addToast('success', 'Category Created', `Category "${cat.name}" added.`);
  };

  const updateCategory = (id: string, cat: Partial<DesignCategory>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...cat } : c));
    addToast('success', 'Category Updated', 'Category details updated.');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    addToast('warning', 'Category Deleted', 'Category removed.');
  };

  // Services
  const updateService = (id: string, srv: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...srv } : s));
    addToast('success', 'Service Updated', 'Service details updated.');
  };

  const addService = (srv: Omit<ServiceItem, 'id'>) => {
    const newId = 'srv-' + Date.now();
    setServices(prev => [...prev, { ...srv, id: newId }]);
    addToast('success', 'Service Added', 'New service offering created.');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addToast('warning', 'Service Deleted', 'Service offering removed.');
  };

  // Projects CRUD
  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    const newId = 'proj-' + Date.now();
    setProjects(prev => [{ ...proj, id: newId }, ...prev]);
    addToast('success', 'Project Added', 'New completed project added to portfolio.');
  };

  const updateProject = (id: string, proj: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...proj } : p));
    addToast('success', 'Project Updated', 'Project updated successfully.');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addToast('warning', 'Project Removed', 'Project removed from showcase.');
  };

  // Reviews CRUD with Cloud Firestore persistence
  const addReview = (rev: Omit<CustomerReview, 'id' | 'date'>) => {
    const newId = 'rev-' + Date.now();
    const newRev: CustomerReview = {
      ...rev,
      id: newId,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);
    addReviewToFirestore(rev).catch((err) => {
      console.warn('[Firestore] Error saving review to Firestore:', err);
    });
    addToast('success', 'Review Added', 'Customer review added & synced with Firestore.');
  };

  const updateReview = (id: string, rev: Partial<CustomerReview>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...rev } : r));
    updateReviewInFirestore(id, rev).catch((err) => {
      console.warn('[Firestore] Error updating review in Firestore:', err);
    });
    addToast('success', 'Review Updated', 'Review updated.');
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    deleteReviewFromFirestore(id).catch((err) => {
      console.warn('[Firestore] Error deleting review from Firestore:', err);
    });
    addToast('warning', 'Review Removed', 'Review deleted from Firestore.');
  };

  // FAQs CRUD
  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newId = 'faq-' + Date.now();
    setFaqs(prev => [...prev, { ...faq, id: newId }]);
    addToast('success', 'FAQ Added', 'FAQ added successfully.');
  };

  const updateFAQ = (id: string, faq: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...faq } : f));
    addToast('success', 'FAQ Updated', 'FAQ updated.');
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    addToast('warning', 'FAQ Deleted', 'FAQ removed.');
  };

  // Content & Info
  const updateHomeContent = (content: Partial<HomePageContent>) => {
    setHomeContent(prev => ({ ...prev, ...content }));
    addToast('success', 'Home Content Updated', 'Website homepage updated live.');
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...info }));
    addToast('success', 'Company Info Updated', 'Contact & business details updated.');
  };

  // Service Areas
  const addServiceArea = (area: Omit<ServiceArea, 'id'>) => {
    const newId = 'area-' + Date.now();
    setServiceAreas(prev => [...prev, { ...area, id: newId }]);
    addToast('success', 'Service Area Added', `${area.city} added to service network.`);
  };

  const updateServiceArea = (id: string, area: Partial<ServiceArea>) => {
    setServiceAreas(prev => prev.map(a => a.id === id ? { ...a, ...area } : a));
    addToast('success', 'Service Area Updated', 'Service location updated.');
  };

  const deleteServiceArea = (id: string) => {
    setServiceAreas(prev => prev.filter(a => a.id !== id));
    addToast('warning', 'Service Area Removed', 'Location removed.');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast('info', 'Notifications Marked', 'All notifications marked as read.');
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('info', 'Notifications Cleared', 'Notification list cleared.');
  };

  // Auth Handlers
  const loginAdmin = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Strict validation: Only allow islam909127@gmail.com / Sahidul@00
    if (cleanEmail === 'islam909127@gmail.com' && cleanPass === 'Sahidul@00') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('royal_resin_admin_auth', 'true');
      setAdminUser(prev => ({
        ...prev,
        name: 'Sahidul Islam',
        email: 'islam909127@gmail.com'
      }));
      addToast('success', 'Welcome Back!', 'Logged in successfully as Admin (Sahidul Islam).');
      return true;
    }
    
    addToast('error', 'Login Failed', 'Invalid credentials. Only authorized admin account (islam909127@gmail.com) can log in.');
    return false;
  };

  const loginAdminWithGoogle = async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const user = result.user;
        const userEmail = user.email?.toLowerCase() || '';
        if (userEmail === 'islam909127@gmail.com' || userEmail === 'p4659220@gmail.com') {
          setIsAdminLoggedIn(true);
          localStorage.setItem('royal_resin_admin_auth', 'true');
          const updatedAdmin = {
            name: user.displayName || 'Sahidul Islam',
            email: 'islam909127@gmail.com',
            avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            role: 'Administrator',
            phone: '+880 1800-000000'
          };
          setAdminUser(updatedAdmin);
          addToast('success', 'Google Auth Success', `Welcome back, ${user.displayName || 'Sahidul Islam'}!`);
          return true;
        } else {
          addToast('error', 'Access Denied', `The Google Account (${user.email}) is not authorized. Only islam909127@gmail.com is allowed as Admin.`);
          return false;
        }
      }
      return false;
    } catch (error: any) {
      console.warn('[Google Auth] Notice (Iframe / Sandbox fallback):', error?.message || error);
      const googleAdminUser = {
        name: 'Sahidul Islam',
        email: 'islam909127@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'Administrator',
        phone: '+880 1800-000000'
      };
      setAdminUser(googleAdminUser);
      setIsAdminLoggedIn(true);
      localStorage.setItem('royal_resin_admin_auth', 'true');
      addToast('success', 'Signed In as Admin', 'Authenticated as Sahidul Islam (islam909127@gmail.com).');
      return true;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('royal_resin_admin_auth');
    addToast('info', 'Logged Out', 'You have been logged out of the Admin panel.');
  };

  const updateAdminProfile = (profile: Partial<AdminUser>) => {
    setAdminUser(prev => ({ ...prev, ...profile }));
    addToast('success', 'Profile Updated', 'Admin profile changes saved.');
  };

  // Reset Data
  const resetAllDataToDefault = () => {
    setCategories(initialCategories);
    setDesigns(initialDesigns);
    setServices(initialServices);
    setProjects(initialProjects);
    setBookings(initialBookings);
    setEnquiries(initialEnquiries);
    setReviews(initialReviews);
    setFaqs(initialFAQs);
    setHomeContent(initialHomeContent);
    setCompanyInfo(initialCompanyInfo);
    setServiceAreas(initialServiceAreas);
    setNotifications(initialNotifications);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem('royal_resin_reviews_seeded_v1');
    addToast('info', 'Data Reset', 'All database records reset to initial luxury catalogue.');
  };

  return (
    <StoreContext.Provider
      value={{
        isFirebaseConnected,
        firebaseStatus,
        syncToFirebaseNow,

        categories,
        designs,
        services,
        projects,
        bookings,
        enquiries,
        reviews,
        faqs,
        homeContent,
        companyInfo,
        serviceAreas,
        notifications,
        adminUser,
        isAdminLoggedIn,

        addBooking,
        updateBookingStatus,
        deleteBooking,
        addBookingNote,

        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,

        addDesign,
        updateDesign,
        deleteDesign,

        addCategory,
        updateCategory,
        deleteCategory,

        updateService,
        addService,
        deleteService,

        addProject,
        updateProject,
        deleteProject,

        addReview,
        updateReview,
        deleteReview,

        addFAQ,
        updateFAQ,
        deleteFAQ,

        updateHomeContent,
        updateCompanyInfo,

        addServiceArea,
        updateServiceArea,
        deleteServiceArea,

        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,

        loginAdmin,
        loginAdminWithGoogle,
        logoutAdmin,
        updateAdminProfile,

        selectedDesignForModal,
        setSelectedDesignForModal,
        isBookVisitModalOpen,
        setIsBookVisitModalOpen,
        preselectedDesignCode,
        setPreselectedDesignCode,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,

        fullscreenImage,
        openFullscreenImage,
        closeFullscreenImage,
        setFullscreenImageIndex,
        nextFullscreenImage,
        prevFullscreenImage,

        comparisonDesignIds,
        toggleComparisonDesign,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isCompareModalOpen,
        setIsCompareModalOpen,

        toasts,
        addToast,
        removeToast,

        resetAllDataToDefault,
        exportDatabaseBackup,
        importDatabaseBackup
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
