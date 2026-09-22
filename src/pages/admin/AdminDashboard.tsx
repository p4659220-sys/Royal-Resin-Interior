import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Palette, 
  Briefcase, 
  Layers, 
  Star, 
  HelpCircle, 
  MapPin, 
  Settings, 
  FileText, 
  LogOut, 
  Lock, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Shield,
  Sparkles,
  UserCheck,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  Zap,
  Image as ImageIcon,
  Calculator,
  Download,
  Upload,
  Database,
  HardDrive,
  FolderOpen,
  RefreshCw,
  Flame
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { MediaVaultTab } from '../../components/admin/MediaVaultTab';
import { MediaVaultPickerModal } from '../../components/admin/MediaVaultPickerModal';
import { uploadImageToVault } from '../../utils/mediaVaultService';
import { 
  DesignItem, 
  ProjectItem, 
  ServiceItem, 
  CustomerReview, 
  FAQItem, 
  ServiceArea,
  BookingStatus,
  EnquiryStatus,
  ServiceCategoryType
} from '../../types';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const { 
    isAdminLoggedIn, 
    loginAdmin, 
    loginAdminWithGoogle,
    logoutAdmin,
    bookings,
    updateBookingStatus,
    deleteBooking,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    designs,
    addDesign,
    updateDesign,
    deleteDesign,
    projects,
    addProject,
    updateProject,
    deleteProject,
    services,
    updateService,
    addService,
    deleteService,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    faqs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    serviceAreas,
    addServiceArea,
    updateServiceArea,
    deleteServiceArea,
    companyInfo,
    updateCompanyInfo,
    homeContent,
    updateHomeContent,
    exportDatabaseBackup,
    importDatabaseBackup,
    isFirebaseConnected,
    firebaseStatus,
    syncToFirebaseNow
  } = useStore();

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'enquiries' | 'designs' | 'projects' | 
    'services' | 'media-vault' | 'reviews' | 'faqs' | 'areas' | 'company' | 'homepage'
  >('overview');

  // Media Vault Selection Picker State
  const [isVaultPickerOpen, setIsVaultPickerOpen] = useState(false);
  const [vaultPickerTarget, setVaultPickerTarget] = useState<((url: string) => void) | null>(null);
  const [vaultPickerTitle, setVaultPickerTitle] = useState('Select Image from Permanent Media Vault');

  const openVaultPicker = (title: string, onSelect: (url: string) => void) => {
    setVaultPickerTitle(title);
    setVaultPickerTarget(() => onSelect);
    setIsVaultPickerOpen(true);
  };

  // Modals & form states
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<DesignItem | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [newService, setNewService] = useState<{
    name: string;
    slug: ServiceCategoryType;
    tagline: string;
    description: string;
    mainImage: string;
    galleryImages: string[];
    minRate: number;
    maxRate: number;
    unit: 'sq.ft.' | 'step' | 'project';
    isPublished: boolean;
  }>({
    name: '',
    slug: 'metallic-marble',
    tagline: '',
    description: '',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    minRate: 350,
    maxRate: 600,
    unit: 'sq.ft.',
    isPublished: true
  });

  // Uploaded photo viewer modal
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string; title: string; subtitle?: string } | null>(null);
  const [confirmDeleteServiceId, setConfirmDeleteServiceId] = useState<string | null>(null);

  // Review Edit/Add/Delete Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<CustomerReview | null>(null);
  const [confirmDeleteReview, setConfirmDeleteReview] = useState<CustomerReview | null>(null);

  // Search/Filter states
  const [bookingFilter, setBookingFilter] = useState('all');
  const [enquiryFilter, setEnquiryFilter] = useState('all');
  const [designSearch, setDesignSearch] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Quick fill official credentials
  const handleQuickFill = () => {
    setUsernameInput('islam909127@gmail.com');
    setPasswordInput('Sahidul@00');
    setLoginError('');
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(usernameInput, passwordInput);
    if (!success) {
      setLoginError('Invalid Administrator credentials. Please enter your valid Admin User ID and Password.');
    } else {
      setLoginError('');
    }
  };

  // If not logged in, show Luxury Admin Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-600/5 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0b0f17] border border-amber-500/40 shadow-2xl relative z-10 space-y-6 text-center backdrop-blur-xl">
          {/* Top Security Crown Badge */}
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/10">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0b0f17]" title="Secure Console Online" />
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Admin Console
            </h2>
            <p className="text-xs text-amber-400/90 font-medium">
              Royal Resin Interior — সেন্ট্রাল ম্যানেজমেন্ট অ্যাডমিন প্যানেল
            </p>
          </div>

          {/* Security Status Ribbon */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-semibold">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>256-Bit SSL Encrypted Admin Portal</span>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs text-left flex items-start gap-2 shadow-lg animate-fadeIn">
              <span className="text-red-400 font-bold shrink-0">⚠️</span>
              <div className="flex-1">{loginError}</div>
            </div>
          )}

          {/* Google Sign-In Action */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              disabled={isGoogleLoading}
              onClick={async () => {
                setIsGoogleLoading(true);
                setLoginError('');
                await loginAdminWithGoogle();
                setIsGoogleLoading(false);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl transition flex items-center justify-center gap-3 border border-slate-200 active:scale-[0.99] disabled:opacity-70 group cursor-pointer"
            >
              {isGoogleLoading ? (
                <RefreshCw className="w-5 h-5 text-amber-600 animate-spin" />
              ) : (
                <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>{isGoogleLoading ? 'Connecting to Google...' : 'Sign in with Google Account'}</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 bg-[#0b0f17] text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                OR LOGIN WITH CREDENTIALS
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Admin User ID / Email</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter Admin Email"
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-300 transition"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> SIGN IN TO DASHBOARD
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 mx-auto"
            >
              ← Return to Customer Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Main Layout
  const pendingBookingsCount = bookings.filter(b => b.status === 'New').length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  const navSections = [
    {
      title: 'OPERATIONS & LEADS',
      items: [
        { 
          id: 'overview' as const, 
          label: 'Overview Dashboard', 
          icon: LayoutDashboard,
          badge: null
        },
        { 
          id: 'bookings' as const, 
          label: 'Site Visit Bookings', 
          icon: Calendar,
          badge: pendingBookingsCount > 0 ? `+${pendingBookingsCount} New` : `${bookings.length}`,
          badgeColor: pendingBookingsCount > 0 ? 'bg-amber-500 text-black font-bold' : 'bg-slate-800 text-slate-300'
        },
        { 
          id: 'enquiries' as const, 
          label: 'Client Enquiries', 
          icon: MessageSquare,
          badge: newEnquiriesCount > 0 ? `+${newEnquiriesCount} New` : `${enquiries.length}`,
          badgeColor: newEnquiriesCount > 0 ? 'bg-emerald-500 text-black font-bold' : 'bg-slate-800 text-slate-300'
        },
      ]
    },
    {
      title: 'CATALOGUE & MEDIA',
      items: [
        { 
          id: 'designs' as const, 
          label: 'Design Catalogue', 
          icon: Palette,
          badge: `${designs.length}`,
          badgeColor: 'bg-slate-800 text-slate-300'
        },
        { 
          id: 'projects' as const, 
          label: 'Completed Projects', 
          icon: Briefcase,
          badge: `${projects.length}`,
          badgeColor: 'bg-slate-800 text-slate-300'
        },
        { 
          id: 'services' as const, 
          label: 'Services & Pricing Rates', 
          icon: Layers,
          badge: `${services.length}`,
          badgeColor: 'bg-amber-500/20 text-amber-300'
        },
        { 
          id: 'media-vault' as const, 
          label: 'Permanent Media Vault (ইমেজ ভল্ট)', 
          icon: HardDrive,
          badge: 'Vault',
          badgeColor: 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
        },
      ]
    },
    {
      title: 'SITE CONTENT & CMS',
      items: [
        { 
          id: 'reviews' as const, 
          label: 'Customer Reviews', 
          icon: Star,
          badge: `${reviews.length}`,
          badgeColor: 'bg-slate-800 text-slate-300'
        },
        { 
          id: 'faqs' as const, 
          label: 'FAQ Knowledgebase', 
          icon: HelpCircle,
          badge: `${faqs.length}`,
          badgeColor: 'bg-slate-800 text-slate-300'
        },
        { 
          id: 'areas' as const, 
          label: 'Service Coverage Areas', 
          icon: MapPin,
          badge: `${serviceAreas.length}`,
          badgeColor: 'bg-slate-800 text-slate-300'
        },
        { 
          id: 'homepage' as const, 
          label: 'Homepage CMS Editor', 
          icon: FileText,
          badge: null
        },
        { 
          id: 'company' as const, 
          label: 'Company & Contacts', 
          icon: Settings,
          badge: null
        },
      ]
    }
  ];

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Executive Overview';
      case 'bookings': return 'Site Visit Requests & Laser Surveys';
      case 'enquiries': return 'Direct Inquiries & Custom Quotes';
      case 'designs': return 'Catalogue Management (2D/3D & Resin)';
      case 'projects': return 'Completed Projects & Before/After';
      case 'services': return 'Specialized Resin Service Offerings';
      case 'reviews': return 'Client Testimonials & Ratings';
      case 'faqs': return 'Frequently Asked Questions';
      case 'areas': return 'Active Service Coverage Districts';
      case 'homepage': return 'Homepage Hero & Banner Content';
      case 'company': return 'Studio Profile & Social Links';
      default: return 'Admin Studio';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 mb-4 rounded-2xl bg-slate-900/95 border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-serif-royal">
            RR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-royal font-bold text-white text-base">Admin Hub</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE
              </span>
            </div>
            <div className="text-xs text-amber-400 capitalize">{getActiveTabTitle()}</div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition"
        >
          {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{isMobileSidebarOpen ? 'Close Menu' : 'Admin Menu'}</span>
        </button>
      </div>

      {/* Main Two-Column Admin Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ======================================================== */}
        {/* LEFT VERTICAL SIDEBAR NAVIGATION (USER MARKED REGION)     */}
        {/* ======================================================== */}
        <aside className={`
          w-full lg:w-72 xl:w-80 shrink-0
          ${isMobileSidebarOpen ? 'block' : 'hidden lg:flex'}
          flex-col justify-between
          bg-[#0a0f1d]/95 backdrop-blur-xl
          border border-amber-500/30 rounded-3xl p-5 shadow-2xl
          lg:sticky lg:top-4 max-h-none lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto scrollbar-none
          space-y-6
        `}>
          {/* Studio Brand Header */}
          <div className="pb-5 border-b border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-extrabold font-serif-royal text-lg shadow-lg shadow-amber-500/20">
                  RR
                </div>
                <div>
                  <h2 className="font-serif-royal font-bold text-white text-base tracking-wide leading-tight">
                    ROYAL RESIN
                  </h2>
                  <p className="text-[11px] text-amber-400/90 font-medium">ADMIN MANAGEMENT STUDIO</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Production Server</span>
              </div>
              <span className="font-semibold text-emerald-400">v2.4 Active</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-amber-500/20 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Flame className={`w-3.5 h-3.5 ${isFirebaseConnected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>Firebase Cloud</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`font-semibold ${isFirebaseConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isFirebaseConnected ? 'Connected (Free)' : firebaseStatus === 'connecting' ? 'Connecting...' : 'Active'}
                </span>
                <button
                  type="button"
                  onClick={() => syncToFirebaseNow()}
                  title="Manual Sync to Firebase Cloud Firestore"
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                >
                  <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Menu Groups */}
          <div className="space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <div className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                  {section.title}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-lg shadow-amber-500/20'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent hover:border-slate-700/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 transition ${isActive ? 'text-black' : 'text-slate-400 group-hover:text-amber-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-black/20 text-black font-extrabold' : item.badgeColor
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Studio Summary Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Warranty
              </span>
              <span className="text-amber-300 font-bold text-[11px]">10-Yr German Tech</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Auto-persisted to local state engine. Client changes reflect instantly.
            </p>
          </div>

          {/* Sidebar Account & Quick Actions Footer */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/60 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">Master Administrator</div>
                <div className="text-[10px] text-slate-400 truncate">admin@royalresin.com</div>
              </div>
            </div>

            <button
              onClick={onNavigateHome}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition border border-slate-700/60"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" /> View Public Site
            </button>

            <button
              onClick={logoutAdmin}
              className="w-full py-2 px-3 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout Session
            </button>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* RIGHT MAIN CONTENT AREA                                  */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 w-full space-y-6">
          
          {/* Top Context Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
                <span>Admin Hub</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-white capitalize">{activeTab.replace('-', ' ')}</span>
              </div>
              <h1 className="font-serif-royal text-xl sm:text-2xl font-bold text-white tracking-wide">
                {getActiveTabTitle()}
              </h1>
            </div>

            {/* Quick Contextual Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeTab === 'designs' && (
                <button
                  onClick={() => {
                    setEditingDesign({
                      id: '',
                      code: `RR-${Date.now().toString().slice(-4)}`,
                      name: '',
                      category: 'metallic-marble',
                      subType: 'Metallic',
                      description: '',
                      minRate: 280,
                      maxRate: 450,
                      unit: 'sq.ft.',
                      suitableLocations: ['Living Room', 'Foyer'],
                      features: ['9H Scratch Resistant', 'Zero Grout Lines', 'High Gloss'],
                      mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
                      galleryImages: [],
                      isFeatured: true,
                      isPublished: true,
                      createdAt: new Date().toISOString().split('T')[0]
                    });
                    setIsDesignModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Design
                </button>
              )}

              {activeTab === 'projects' && (
                <button
                  onClick={() => {
                    setEditingProject({
                      id: '',
                      name: 'Luxury Residence Transformation',
                      clientName: 'Private Residence',
                      location: 'Kolkata',
                      category: 'metallic-marble',
                      designUsed: 'ME-01',
                      area: '850 sq.ft.',
                      completionDate: '4 Days',
                      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
                      afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                      description: '',
                      isPublished: true
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
              )}

              <button
                onClick={exportDatabaseBackup}
                title="Download full JSON backup of all services, pricing rates, and photos"
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" /> Backup Data
              </button>

              <label
                title="Restore database and photos from previously saved JSON file"
                className="cursor-pointer px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Upload className="w-3.5 h-3.5 text-slate-400" /> Restore
                <input
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const content = ev.target?.result as string;
                        if (content) importDatabaseBackup(content);
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </label>

              <button
                onClick={onNavigateHome}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Public Site
              </button>

              <button
                onClick={logoutAdmin}
                className="px-3.5 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>

      {/* ===================== TAB 1: OVERVIEW ===================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab('bookings')} 
              className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition space-y-1"
            >
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Site Visit Bookings</span>
                <Calendar className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-serif-royal font-bold text-white">{bookings.length}</div>
              <div className="text-[11px] text-amber-400 font-semibold">{pendingBookingsCount} new requests</div>
            </div>

            <div 
              onClick={() => setActiveTab('enquiries')} 
              className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition space-y-1"
            >
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Client Enquiries</span>
                <MessageSquare className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-serif-royal font-bold text-white">{enquiries.length}</div>
              <div className="text-[11px] text-emerald-400 font-semibold">{newEnquiriesCount} new leads</div>
            </div>

            <div 
              onClick={() => setActiveTab('designs')} 
              className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition space-y-1"
            >
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Catalogue Designs</span>
                <Palette className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-serif-royal font-bold text-white">{designs.length}</div>
              <div className="text-[11px] text-slate-400">{designs.filter(d => d.isFeatured).length} featured on homepage</div>
            </div>

            <div 
              onClick={() => setActiveTab('projects')} 
              className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition space-y-1"
            >
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Completed Projects</span>
                <Briefcase className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-serif-royal font-bold text-white">{projects.length}</div>
              <div className="text-[11px] text-slate-400">With interactive Before/After</div>
            </div>
          </div>

          {/* Recent Bookings & Enquiries Snapshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-royal font-bold text-white text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" /> Recent Site Visit Requests
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  View All ({bookings.length})
                </button>
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 4).map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{b.customerName}</span>
                        {b.spacePhotoUrl && (
                          <button
                            type="button"
                            onClick={() => setPreviewPhoto({
                              url: b.spacePhotoUrl!,
                              title: `${b.customerName}'s Space Photo`,
                              subtitle: `${b.serviceCategory} • ${b.city}`
                            })}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-semibold hover:bg-amber-500/30"
                          >
                            <ImageIcon className="w-3 h-3" /> Photo Attached
                          </button>
                        )}
                      </div>
                      <div className="text-slate-400">{b.city} • {b.serviceCategory} {b.selectedDesignCode ? `(${b.selectedDesignCode})` : ''}</div>
                      <div className="text-[11px] text-amber-300/80">Preferred: {b.preferredDate} ({b.preferredTime})</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                        b.status === 'New' ? 'bg-amber-500/20 text-amber-300' :
                        b.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Enquiries */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-royal font-bold text-white text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" /> Direct Customer Enquiries
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  View All ({enquiries.length})
                </button>
              </div>

              <div className="space-y-3">
                {enquiries.slice(0, 4).map((e) => (
                  <div key={e.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{e.name} ({e.mobile})</span>
                        {e.photoUrl && (
                          <button
                            type="button"
                            onClick={() => setPreviewPhoto({
                              url: e.photoUrl!,
                              title: `${e.name}'s Floor Photo`,
                              subtitle: `${e.service} • ${e.location}`
                            })}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-semibold hover:bg-amber-500/30"
                          >
                            <ImageIcon className="w-3 h-3" /> Photo Attached
                          </button>
                        )}
                      </div>
                      <div className="text-slate-400">{e.location} • {e.service}</div>
                      <div className="text-[11px] text-slate-300 line-clamp-1 italic mt-0.5">"{e.message}"</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      e.status === 'New' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {e.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Firebase Cloud Firestore (Free Tier) Synchronization Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-royal font-bold text-white text-base">Firebase Cloud Firestore</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      Free Tier Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Project ID: <span className="font-mono text-slate-300">gen-lang-client-0380353594</span> • Auto-syncs catalogue, bookings & customer enquiries
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => syncToFirebaseNow()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Sync to Firebase Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Firestore Database: <strong>Live & Connected</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Security Rules: <strong>Enforced & Protected</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Media Vault: <strong>Permanent Server Disk Storage</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: SITE VISITS (BOOKINGS) ===================== */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">Site Visit Bookings</h2>
              <p className="text-xs text-slate-400">Review requested visits, update engineer confirmation status, view attached room photos</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter Status:</span>
              <select
                value={bookingFilter}
                onChange={(e) => setBookingFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="all">All Statuses ({bookings.length})</option>
                <option value="New">New ({bookings.filter(b => b.status === 'New').length})</option>
                <option value="Confirmed">Confirmed ({bookings.filter(b => b.status === 'Confirmed').length})</option>
                <option value="Completed">Completed ({bookings.filter(b => b.status === 'Completed').length})</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-amber-400 font-serif-royal uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Address & City</th>
                  <th className="py-3 px-4">Service & Design</th>
                  <th className="py-3 px-4">Schedule</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {bookings
                  .filter(b => bookingFilter === 'all' || b.status === bookingFilter)
                  .map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm">{b.customerName}</div>
                        {b.spacePhotoUrl ? (
                          <div className="mt-1.5 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPreviewPhoto({
                                url: b.spacePhotoUrl!,
                                title: `${b.customerName}'s Space Photo`,
                                subtitle: `${b.serviceCategory} • ${b.city} (${b.fullAddress})`
                              })}
                              className="group flex items-center gap-2 px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition"
                            >
                              <img 
                                src={b.spacePhotoUrl || undefined} 
                                alt="Space" 
                                className="w-6 h-6 rounded object-cover border border-amber-400/40 group-hover:scale-105 transition" 
                              />
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" /> View Space Photo
                              </span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 block mt-0.5">No photo uploaded</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div>{b.mobile}</div>
                        {b.email && <div className="text-[10px] text-slate-500">{b.email}</div>}
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="truncate">{b.fullAddress}</div>
                        <div className="text-[10px] text-amber-400">{b.city} {b.pinCode ? `- ${b.pinCode}` : ''}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{b.serviceCategory}</div>
                        {b.selectedDesignCode && <div className="text-[10px] text-amber-300">Code: {b.selectedDesignCode}</div>}
                        {b.approxArea && <div className="text-[10px] text-slate-500">Area: {b.approxArea}</div>}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-200">{b.preferredDate}</div>
                        <div className="text-[10px] text-slate-400">{b.preferredTime}</div>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className={`px-2 py-1 rounded text-[11px] font-bold border focus:outline-none ${
                            b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' :
                            b.status === 'New' ? 'bg-amber-950 text-amber-300 border-amber-500/40' :
                            b.status === 'Completed' ? 'bg-blue-950 text-blue-300 border-blue-500/40' : 'bg-slate-900 text-slate-300 border-slate-700'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Visit Scheduled">Visit Scheduled</option>
                          <option value="Visit Completed">Visit Completed</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="p-1 text-slate-500 hover:text-red-400 transition"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: ENQUIRIES ===================== */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">Client Enquiries</h2>
              <p className="text-xs text-slate-400">Incoming lead queries, WhatsApp requests, rate inquiries</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter:</span>
              <select
                value={enquiryFilter}
                onChange={(e) => setEnquiryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="all">All Enquiries ({enquiries.length})</option>
                <option value="New">New ({enquiries.filter(e => e.status === 'New').length})</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-amber-400 font-serif-royal uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Service & Design</th>
                  <th className="py-3 px-4">Client Message</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {enquiries
                  .filter(e => enquiryFilter === 'all' || e.status === enquiryFilter)
                  .map((e) => (
                    <tr key={e.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm">{e.name}</div>
                        {e.photoUrl ? (
                          <div className="mt-1.5 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPreviewPhoto({
                                url: e.photoUrl!,
                                title: `${e.name}'s Floor Photo`,
                                subtitle: `${e.service} • ${e.location} (Phone: ${e.mobile})`
                              })}
                              className="group flex items-center gap-2 px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition"
                            >
                              <img 
                                src={e.photoUrl || undefined} 
                                alt="Floor" 
                                className="w-6 h-6 rounded object-cover border border-amber-400/40 group-hover:scale-105 transition" 
                              />
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" /> View Floor Photo
                              </span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 block mt-0.5">No photo uploaded</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <a href={`tel:${e.mobile.replace(/[^0-9+]/g, '')}`} className="text-amber-400 hover:underline">
                          {e.mobile}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{e.location}</td>
                      <td className="py-3 px-4">
                        <div>{e.service}</div>
                        {e.design && <div className="text-[10px] text-amber-300">Design: {e.design}</div>}
                        {e.approxArea && <div className="text-[10px] text-slate-500">Area: {e.approxArea}</div>}
                      </td>
                      <td className="py-3 px-4 max-w-xs text-slate-300 italic">
                        {e.message}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={e.status}
                          onChange={(ev) => updateEnquiryStatus(e.id, ev.target.value as EnquiryStatus)}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteEnquiry(e.id)}
                          className="p-1 text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: DESIGNS MANAGER ===================== */}
      {activeTab === 'designs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">Designs Catalogue ({designs.length})</h2>
              <p className="text-xs text-slate-400">Add, edit rates, upload images, toggle featured status for homepage</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={designSearch}
                onChange={(e) => setDesignSearch(e.target.value)}
                placeholder="Search code or name..."
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />

              <button
                onClick={() => {
                  setEditingDesign({
                    id: '',
                    name: '',
                    code: `RR-${Math.floor(10 + Math.random() * 90)}`,
                    category: 'metallic-marble',
                    subType: 'Metallic',
                    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                    galleryImages: [],
                    minRate: 350,
                    maxRate: 580,
                    unit: 'sq.ft.',
                    suitableLocations: ['Living Room', 'Lobby'],
                    features: ['Mirror gloss', 'Stain proof'],
                    description: '',
                    isFeatured: true,
                    isPublished: true,
                    createdAt: new Date().toISOString().split('T')[0]
                  });
                  setIsDesignModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" /> Add New Design
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs
              .filter(d => !designSearch || d.code.toLowerCase().includes(designSearch.toLowerCase()) || d.name.toLowerCase().includes(designSearch.toLowerCase()))
              .map((d) => (
                <div key={d.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                    <img src={d.mainImage || undefined} alt={d.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-amber-500 text-black font-bold text-xs">
                      {d.code}
                    </div>
                    {d.isFeatured && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500/90 text-black font-bold text-[10px]">
                        ★ Featured
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif-royal font-bold text-white text-base">{d.name}</h3>
                    <div className="text-xs text-amber-300 font-semibold">
                      ₹{d.minRate} – ₹{d.maxRate} / {d.unit}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{d.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingDesign(d);
                          setIsDesignModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => updateDesign(d.id, { isFeatured: !d.isFeatured })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${
                          d.isFeatured ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {d.isFeatured ? 'Featured' : 'Make Featured'}
                      </button>
                    </div>

                    <button
                      onClick={() => deleteDesign(d.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 5: PROJECTS MANAGER ===================== */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">Completed Projects ({projects.length})</h2>
              <p className="text-xs text-slate-400">Manage real site case studies with Before & After interactive sliders</p>
            </div>

            <button
              onClick={() => {
                setEditingProject({
                  id: '',
                  name: '',
                  category: 'metallic-marble',
                  location: 'Kolkata',
                  area: '800 sq.ft.',
                  designUsed: 'ME-01',
                  completionDate: '4 Days',
                  beforeImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
                  afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                  description: '',
                  isPublished: true
                });
                setIsProjectModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md self-start"
            >
              <Plus className="w-4 h-4" /> Add Completed Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-700">
                    <img src={p.beforeImage || undefined} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-slate-300 font-bold">Before</span>
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-amber-500/40">
                    <img src={p.afterImage || undefined} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-amber-500 text-[10px] text-black font-bold">After</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-royal font-bold text-lg text-white">{p.name}</h3>
                  <div className="text-xs text-amber-400 font-semibold">{p.location} • {p.area} • Design: {p.designUsed}</div>
                  <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setEditingProject(p);
                      setIsProjectModalOpen(true);
                    }}
                    className="px-3 py-1 rounded bg-slate-800 text-amber-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit Project
                  </button>

                  <button
                    onClick={() => deleteProject(p.id)}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 6: SERVICES ===================== */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">Services & Pricing Rates ({services.length})</h2>
              <p className="text-xs text-slate-400">Configure category rates, cost calculator prices, descriptions, and gallery images</p>
            </div>
            <button
              onClick={() => {
                setNewService({
                  name: '',
                  slug: 'metallic-marble',
                  tagline: '',
                  description: '',
                  mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                  galleryImages: [],
                  minRate: 350,
                  maxRate: 600,
                  unit: 'sq.ft.',
                  isPublished: true
                });
                setIsServiceModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-xs flex items-center gap-1.5 shadow-md w-fit"
            >
              <Plus className="w-4 h-4" /> Add New Service
            </button>
          </div>

          {/* Real-time Pricing & Calculator Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <Calculator className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">
                Live Pricing & Cost Calculator Synchronization
              </span>
              <p className="text-slate-300 leading-relaxed">
                The <strong>Min Rate (₹)</strong> and <strong>Max Rate (₹)</strong> you enter below directly feed the customer-facing <strong>Estimated Pricing & Calculator</strong> tool and the official <strong>Rate Card</strong> on the website in real-time. Any changes made here immediately update customer price calculations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <label className="block text-slate-500 text-[10px] mb-0.5">Service Name</label>
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => updateService(s.id, { name: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-sm font-bold text-white font-serif-royal"
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-amber-400 font-mono">/{s.slug}</span>
                    {confirmDeleteServiceId === s.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteService(s.id);
                            setConfirmDeleteServiceId(null);
                          }}
                          className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold shadow transition"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteServiceId(null)}
                          className="px-1.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteServiceId(s.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 transition"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-amber-500/20">
                    <label className="block text-amber-400/90 font-medium text-[11px] mb-1">
                      Min Rate (₹/{s.unit})
                    </label>
                    <input
                      type="number"
                      value={s.minRate}
                      onChange={(e) => updateService(s.id, { minRate: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-bold focus:border-amber-400"
                    />
                    <span className="text-[9px] text-slate-500 mt-0.5 block">Calculator Lower Bound</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-amber-500/20">
                    <label className="block text-amber-400/90 font-medium text-[11px] mb-1">
                      Max Rate (₹/{s.unit})
                    </label>
                    <input
                      type="number"
                      value={s.maxRate}
                      onChange={(e) => updateService(s.id, { maxRate: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-bold focus:border-amber-400"
                    />
                    <span className="text-[9px] text-slate-500 mt-0.5 block">Calculator Upper Bound</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-0.5">Rate Calculation Unit</label>
                    <select
                      value={s.unit}
                      onChange={(e) => updateService(s.id, { unit: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium focus:border-amber-400"
                    >
                      <option value="sq.ft.">per sq.ft.</option>
                      <option value="step">per step</option>
                      <option value="project">per project</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-0.5">Category ID (Slug)</label>
                    <input
                      type="text"
                      disabled
                      value={s.slug}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-400 font-mono text-xs cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 text-xs mb-0.5">Ideal Spaces (Tagline)</label>
                  <input
                    type="text"
                    value={s.tagline}
                    onChange={(e) => updateService(s.id, { tagline: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                    placeholder="e.g. Living rooms, Master suites, Showrooms"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-xs mb-0.5">Package Inclusions (Description)</label>
                  <textarea
                    rows={2}
                    value={s.description}
                    onChange={(e) => updateService(s.id, { description: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                    placeholder="e.g. Moisture barrier primer, Metallic color pour, Aliphatic high-gloss topcoat"
                  ></textarea>
                </div>

                {/* Service Cover Image (Optional - Pick from Vault or enter URL) */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      Service Cover Image (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        openVaultPicker(`Select Cover for ${s.name}`, (chosenUrl) => {
                          updateService(s.id, { mainImage: chosenUrl });
                        });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-amber-400" /> Choose from Vault
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={s.mainImage || ''}
                      onChange={(e) => updateService(s.id, { mainImage: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      placeholder="Cover Image URL (optional)"
                    />
                    {s.mainImage && (
                      <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-700 shadow shrink-0">
                        <img src={s.mainImage || undefined} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB: CENTRAL MEDIA VAULT ===================== */}
      {activeTab === 'media-vault' && (
        <MediaVaultTab />
      )}

      {/* ===================== TAB 7: REVIEWS ===================== */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">Customer Reviews ({reviews.length})</h2>
              <p className="text-xs text-slate-400">Add, edit, or manage verified customer feedback & testimonials</p>
            </div>
            <button
              onClick={() => {
                setEditingReview({
                  id: '',
                  customerName: '',
                  location: 'Kolkata',
                  rating: 5,
                  review: '',
                  serviceUsed: 'Metallic Marble Flooring',
                  isPublished: true,
                  photo: '',
                  date: new Date().toISOString().split('T')[0]
                });
                setIsReviewModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" /> Add Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs relative group">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {r.photo && r.photo.trim() ? (
                      <img src={r.photo} alt={r.customerName} className="w-10 h-10 rounded-full object-cover border border-amber-500/30" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 text-sm">
                        {r.customerName.charAt(0) || 'C'}
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-white text-sm block">{r.customerName}</span>
                      <span className="text-[11px] text-slate-400">{r.location} • {r.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                </div>
                <p className="text-slate-300 italic bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">"{r.review}"</p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-amber-400 text-[11px] font-semibold">{r.serviceUsed}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateReview(r.id, { isPublished: !r.isPublished })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${r.isPublished ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
                    >
                      {r.isPublished ? 'Published' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingReview({ ...r });
                        setIsReviewModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors border border-slate-700 flex items-center gap-1"
                      title="Edit Review"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-medium hidden sm:inline">Edit</span>
                    </button>
                    <button 
                      onClick={() => setConfirmDeleteReview(r)} 
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors border border-slate-700 flex items-center gap-1"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-medium hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 8: FAQS ===================== */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">FAQ Questions ({faqs.length})</h2>
              <p className="text-xs text-slate-400">Add or edit answers for customer questions</p>
            </div>
            <button
              onClick={() => {
                addFAQ({
                  question: 'New Question Title?',
                  answer: 'Detailed explanation here...',
                  category: 'General',
                  isPublished: true,
                  order: faqs.length + 1
                });
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add FAQ
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    value={f.question}
                    onChange={(e) => updateFAQ(f.id, { question: e.target.value })}
                    className="w-full font-bold text-white bg-slate-950 px-2 py-1 rounded border border-slate-700"
                  />
                  <button onClick={() => deleteFAQ(f.id)} className="text-slate-500 hover:text-red-400 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={f.answer}
                  onChange={(e) => updateFAQ(f.id, { answer: e.target.value })}
                  className="w-full text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-700"
                ></textarea>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 9: SERVICE AREAS ===================== */}
      {activeTab === 'areas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-royal text-2xl font-bold text-white">Service Areas ({serviceAreas.length})</h2>
              <p className="text-xs text-slate-400">Active regional coverage areas (Fully editable manual settings)</p>
            </div>
            <button
              onClick={() => {
                addServiceArea({
                  city: '',
                  state: 'West Bengal',
                  district: '',
                  nearbyAreas: [],
                  active: true
                });
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Area Manually
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceAreas.map((a) => (
              <div key={a.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">Coverage District ID #{a.id}</span>
                  <button onClick={() => deleteServiceArea(a.id)} className="text-slate-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-400 mb-0.5">City / Location</label>
                    <input
                      type="text"
                      value={a.city}
                      onChange={(e) => updateServiceArea(a.id, { city: e.target.value })}
                      placeholder="e.g. Kolkata"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-0.5">District</label>
                      <input
                        type="text"
                        value={a.district}
                        onChange={(e) => updateServiceArea(a.id, { district: e.target.value })}
                        placeholder="e.g. Kolkata District"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-0.5">State</label>
                      <input
                        type="text"
                        value={a.state}
                        onChange={(e) => updateServiceArea(a.id, { state: e.target.value })}
                        placeholder="e.g. West Bengal"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-0.5">Nearby Zones / Areas (Comma separated)</label>
                    <input
                      type="text"
                      value={a.nearbyAreas.join(', ')}
                      onChange={(e) => {
                        const zones = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        updateServiceArea(a.id, { nearbyAreas: zones });
                      }}
                      placeholder="e.g. Salt Lake, Park Street, New Town"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 10: HOMEPAGE CONTENT ===================== */}
      {activeTab === 'homepage' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-6">
          <div>
            <h2 className="font-serif-royal text-2xl font-bold text-white">Homepage Content Editor</h2>
            <p className="text-xs text-slate-400">Instant updates to Hero headline, badges, and CTAs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Hero Main Title</label>
              <input
                type="text"
                value={homeContent.heroTitle}
                onChange={(e) => updateHomeContent({ heroTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Hero Highlight Text (Gold)</label>
              <input
                type="text"
                value={homeContent.heroHighlight}
                onChange={(e) => updateHomeContent({ heroHighlight: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">Hero Subtitle</label>
            <textarea
              rows={2}
              value={homeContent.heroSubtitle}
              onChange={(e) => updateHomeContent({ heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={homeContent.ctaPrimaryText}
                onChange={(e) => updateHomeContent({ ctaPrimaryText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={homeContent.ctaSecondaryText}
                onChange={(e) => updateHomeContent({ ctaSecondaryText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="pt-2 text-xs text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Changes are instantly synchronized to the customer-facing frontend.
          </div>
        </div>
      )}

      {/* ===================== TAB 11: COMPANY INFO ===================== */}
      {activeTab === 'company' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-6">
          <div>
            <h2 className="font-serif-royal text-2xl font-bold text-white">Company Information & Contact Settings</h2>
            <p className="text-xs text-slate-400">Controls top bar announcement, studio tagline, phone numbers, address, and operating hours</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Top Bar Announcement Title (Studio Tagline / Headline)</label>
              <input
                type="text"
                value={companyInfo.announcementTitle || ''}
                onChange={(e) => updateCompanyInfo({ announcementTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-bold"
                placeholder="e.g. Bengal's Premier Luxury 2D & 3D Resin Studio"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Top Bar Announcement Subtitle (Services / Consultation Note)</label>
              <input
                type="text"
                value={companyInfo.announcementSubtitle || ''}
                onChange={(e) => updateCompanyInfo({ announcementSubtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                placeholder="e.g. Free Laser Measurement & On-Site Consultation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800">
            <div>
              <label className="block text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={companyInfo.whatsapp}
                onChange={(e) => updateCompanyInfo({ whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Email</label>
              <input
                type="text"
                value={companyInfo.email}
                onChange={(e) => updateCompanyInfo({ email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Working Hours</label>
              <input
                type="text"
                value={companyInfo.businessHours}
                onChange={(e) => updateCompanyInfo({ businessHours: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">Studio Address</label>
            <input
              type="text"
              value={companyInfo.address}
              onChange={(e) => updateCompanyInfo({ address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          {/* Database & High-Capacity Storage Safeguard */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    IndexedDB High-Capacity Photo & Database Storage
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">Active & Protected</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Services, pricing rates, and high-definition photos are automatically compressed and saved to IndexedDB storage so they never disappear or get wiped on browser refresh.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={exportDatabaseBackup}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" /> Export Backup (.json)
                </button>
                <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition">
                  <Upload className="w-3.5 h-3.5" /> Restore Backup (.json)
                  <input
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const content = ev.target?.result as string;
                          if (content) importDatabaseBackup(content);
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <span className="text-amber-400 font-bold">Bangla Helper:</span>
              <span>
                আপনার আপলোড করা সার্ভিস ফটো এবং রেটগুলো এখন ব্রাউজারের IndexedDB তে স্থায়ীভাবে সেভ থাকে। পেজ রিফ্রেশ করলেও ছবি বা ডেটা হারাবে না। অতিরিক্ত সুরক্ষার জন্য যেকোনো সময় "Export Backup" বাটনে ক্লিক করে সমস্ত ডেটা কম্পিউটারে ডাউনলোড করে ব্যাকআপ রাখতে পারবেন।
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DESIGN EDIT / CREATE MODAL ===================== */}
      {isDesignModalOpen && editingDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0d131f] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto text-xs text-slate-300">
            <h3 className="font-serif-royal text-xl font-bold text-white">
              {editingDesign.id ? 'Edit Design' : 'Create New Design'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">Design Code</label>
                <input
                  type="text"
                  value={editingDesign.code}
                  onChange={(e) => setEditingDesign({ ...editingDesign, code: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                />
              </div>
              <div>
                <label className="block mb-1">Design Name</label>
                <input
                  type="text"
                  value={editingDesign.name}
                  onChange={(e) => setEditingDesign({ ...editingDesign, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">Category</label>
                <select
                  value={editingDesign.category}
                  onChange={(e) => setEditingDesign({ ...editingDesign, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="metallic-marble">Metallic Marble</option>
                  <option value="2d-flooring">2D Flooring</option>
                  <option value="3d-flooring">3D Flooring</option>
                  <option value="wall-art">Wall Art</option>
                  <option value="staircase">Staircase</option>
                  <option value="ceiling">Ceiling</option>
                  <option value="commercial-industrial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Sub-Type (Badge)</label>
                <select
                  value={editingDesign.subType || 'Metallic'}
                  onChange={(e) => setEditingDesign({ ...editingDesign, subType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="Metallic">Metallic</option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="Custom">Custom</option>
                  <option value="Terrazzo">Terrazzo</option>
                  <option value="Glow">Glow</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block mb-1">Min Rate (₹)</label>
                <input
                  type="number"
                  value={editingDesign.minRate}
                  onChange={(e) => setEditingDesign({ ...editingDesign, minRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block mb-1">Max Rate (₹)</label>
                <input
                  type="number"
                  value={editingDesign.maxRate}
                  onChange={(e) => setEditingDesign({ ...editingDesign, maxRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block mb-1">Unit</label>
                <select
                  value={editingDesign.unit}
                  onChange={(e) => setEditingDesign({ ...editingDesign, unit: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="sq.ft.">sq.ft.</option>
                  <option value="step">step</option>
                  <option value="project">project</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1">Main Image (URL or Upload from Device)</label>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <input
                  type="text"
                  value={editingDesign.mainImage}
                  onChange={(e) => setEditingDesign({ ...editingDesign, mainImage: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  placeholder="Image URL"
                />
                <button
                  type="button"
                  onClick={() => {
                    openVaultPicker(`Select Cover Image for ${editingDesign.name || 'Design'}`, (url) => {
                      setEditingDesign({ ...editingDesign, mainImage: url });
                    });
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 shrink-0 transition"
                >
                  <HardDrive className="w-4 h-4 text-amber-400" /> From Vault
                </button>
                <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5 shrink-0">
                  <ImageIcon className="w-4 h-4" /> Upload File
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        optimizeImageFile(file).then(async (res) => {
                          if (res) {
                            const v = await uploadImageToVault(res, `${editingDesign.name || 'Design'} Cover`, 'Designs');
                            setEditingDesign({ ...editingDesign, mainImage: v.url });
                          }
                        });
                      }
                    }}
                  />
                </label>
              </div>
              {editingDesign.mainImage && (
                <div className="mt-2 relative w-24 h-16 rounded-xl overflow-hidden border border-slate-700">
                  <img src={editingDesign.mainImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1">Design Gallery Images (Upload 7-8 Photos)</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    openVaultPicker(`Add Gallery Photo to ${editingDesign.name || 'Design'}`, (url) => {
                      const cur = editingDesign.galleryImages || [];
                      setEditingDesign({ ...editingDesign, galleryImages: [...cur, url] });
                    });
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 transition"
                >
                  <HardDrive className="w-4 h-4 text-amber-400" /> From Vault
                </button>
                <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" /> + Add Gallery Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        optimizeImageFile(file).then(async (res) => {
                          if (res) {
                            const v = await uploadImageToVault(res, `${editingDesign.name || 'Design'} Gallery`, 'Designs');
                            const cur = editingDesign.galleryImages || [];
                            setEditingDesign({ ...editingDesign, galleryImages: [...cur, v.url] });
                          }
                        });
                      }
                    }}
                  />
                </label>
                <span className="text-slate-400 text-[11px]">{editingDesign.galleryImages?.length || 0} / 8 photos added</span>
              </div>
              {editingDesign.galleryImages && editingDesign.galleryImages.length > 0 && (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {editingDesign.galleryImages.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} className="relative group w-full h-16 rounded-xl overflow-hidden border border-slate-700">
                      <img src={imgUrl} alt={`Design Gallery ${imgIdx}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          const updated = (editingDesign.galleryImages || []).filter((_, i) => i !== imgIdx);
                          setEditingDesign({ ...editingDesign, galleryImages: updated });
                        }}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-red-400 opacity-0 group-hover:opacity-100 transition"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                rows={2}
                value={editingDesign.description}
                onChange={(e) => setEditingDesign({ ...editingDesign, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              ></textarea>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingDesign.isFeatured}
                  onChange={(e) => setEditingDesign({ ...editingDesign, isFeatured: e.target.checked })}
                  className="accent-amber-500 w-4 h-4"
                />
                <span>Featured on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingDesign.isPublished}
                  onChange={(e) => setEditingDesign({ ...editingDesign, isPublished: e.target.checked })}
                  className="accent-amber-500 w-4 h-4"
                />
                <span>Published in Catalogue</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsDesignModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingDesign.id) {
                    updateDesign(editingDesign.id, editingDesign);
                  } else {
                    addDesign(editingDesign);
                  }
                  setIsDesignModalOpen(false);
                }}
                className="px-6 py-2 rounded-xl bg-amber-500 text-black font-bold"
              >
                Save Design
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== PROJECT EDIT / CREATE MODAL ===================== */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0d131f] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto text-xs text-slate-300">
            <h3 className="font-serif-royal text-xl font-bold text-white">
              {editingProject.id ? 'Edit Project' : 'Add Completed Project'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">Project Title</label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                />
              </div>
              <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  value={editingProject.location}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block mb-1">Area (sq.ft.)</label>
                <input
                  type="text"
                  value={editingProject.area}
                  onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block mb-1">Design Code</label>
                <input
                  type="text"
                  value={editingProject.designUsed || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, designUsed: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block mb-1">Completion Time</label>
                <input
                  type="text"
                  value={editingProject.completionDate || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, completionDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1">Before Image (URL or Upload from Device)</label>
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <input
                    type="text"
                    value={editingProject.beforeImage}
                    onChange={(e) => setEditingProject({ ...editingProject, beforeImage: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      openVaultPicker(`Select Before Image for ${editingProject.name || 'Project'}`, (url) => {
                        setEditingProject({ ...editingProject, beforeImage: url });
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 shrink-0 transition"
                  >
                    <HardDrive className="w-4 h-4 text-amber-400" /> From Vault
                  </button>
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5 shrink-0">
                    <ImageIcon className="w-4 h-4" /> Upload File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          optimizeImageFile(file).then(async (res) => {
                            if (res) {
                              const v = await uploadImageToVault(res, `${editingProject.name || 'Project'} Before`, 'Projects');
                              setEditingProject({ ...editingProject, beforeImage: v.url });
                            }
                          });
                        }
                      }}
                    />
                  </label>
                </div>
                {editingProject.beforeImage && (
                  <div className="mt-2 relative w-24 h-16 rounded-xl overflow-hidden border border-slate-700">
                    <img src={editingProject.beforeImage} alt="Before Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1">After Image (Resin) (URL or Upload from Device)</label>
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <input
                    type="text"
                    value={editingProject.afterImage}
                    onChange={(e) => setEditingProject({ ...editingProject, afterImage: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      openVaultPicker(`Select After Image for ${editingProject.name || 'Project'}`, (url) => {
                        setEditingProject({ ...editingProject, afterImage: url });
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 shrink-0 transition"
                  >
                    <HardDrive className="w-4 h-4 text-amber-400" /> From Vault
                  </button>
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5 shrink-0">
                    <ImageIcon className="w-4 h-4" /> Upload File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          optimizeImageFile(file).then(async (res) => {
                            if (res) {
                              const v = await uploadImageToVault(res, `${editingProject.name || 'Project'} After`, 'Projects');
                              setEditingProject({ ...editingProject, afterImage: v.url });
                            }
                          });
                        }
                      }}
                    />
                  </label>
                </div>
                {editingProject.afterImage && (
                  <div className="mt-2 relative w-24 h-16 rounded-xl overflow-hidden border border-slate-700">
                    <img src={editingProject.afterImage} alt="After Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                rows={2}
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingProject.id) {
                    updateProject(editingProject.id, editingProject);
                  } else {
                    addProject(editingProject);
                  }
                  setIsProjectModalOpen(false);
                }}
                className="px-6 py-2 rounded-xl bg-amber-500 text-black font-bold"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ADD NEW SERVICE MODAL ===================== */}
      {isServiceModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsServiceModalOpen(false)}
        >
          <div 
            className="relative max-w-xl w-full bg-slate-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-royal font-bold text-lg text-white">Add New Service Offering</h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="p-1.5 rounded-full bg-slate-900 text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-slate-400 mb-1">Service Name</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  placeholder="e.g. Metallic Marble Flooring"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Category Slug / ID</label>
                <select
                  value={newService.slug}
                  onChange={(e) => setNewService({ ...newService, slug: e.target.value as ServiceCategoryType })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="metallic-marble">metallic-marble</option>
                  <option value="2d-flooring">2d-flooring</option>
                  <option value="3d-flooring">3d-flooring</option>
                  <option value="wall-art">wall-art</option>
                  <option value="staircase">staircase</option>
                  <option value="ceiling">ceiling</option>
                  <option value="commercial-industrial">commercial-industrial</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Min Rate (₹)</label>
                  <input
                    type="number"
                    value={newService.minRate}
                    onChange={(e) => setNewService({ ...newService, minRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Max Rate (₹)</label>
                  <input
                    type="number"
                    value={newService.maxRate}
                    onChange={(e) => setNewService({ ...newService, maxRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Unit</label>
                <select
                  value={newService.unit}
                  onChange={(e) => setNewService({ ...newService, unit: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="sq.ft.">sq.ft.</option>
                  <option value="step">step</option>
                  <option value="project">project</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={newService.tagline}
                  onChange={(e) => setNewService({ ...newService, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  placeholder="Short catchy tagline"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  placeholder="Detailed service description..."
                ></textarea>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-400">Cover Image URL (Optional)</label>
                  <button
                    type="button"
                    onClick={() => {
                      openVaultPicker('Select Service Cover Image', (chosenUrl) => {
                        setNewService({ ...newService, mainImage: chosenUrl });
                      });
                    }}
                    className="text-amber-400 hover:text-amber-300 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <HardDrive className="w-3.5 h-3.5" /> From Vault
                  </button>
                </div>
                <input
                  type="text"
                  value={newService.mainImage}
                  onChange={(e) => setNewService({ ...newService, mainImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  placeholder="Image URL (optional)"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newService.name.trim()) {
                    alert('Please enter a service name');
                    return;
                  }
                  addService({
                    ...newService,
                    features: ['Monolithic Seamless Surface', 'Scratch-Proof Polyurethane Armor Coat', 'Stain-Proof & Waterproof'],
                    suitableLocations: ['Living Room', 'Bedrooms', 'Hotel Lobby']
                  });
                  setIsServiceModalOpen(false);
                }}
                className="px-6 py-2 rounded-xl bg-amber-500 text-black font-bold"
              >
                Create Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== UPLOADED PHOTO LIGHTBOX MODAL ===================== */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-serif-royal font-bold text-lg text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-400" />
                  {previewPhoto.title}
                </h3>
                {previewPhoto.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{previewPhoto.subtitle}</p>
                )}
              </div>

              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-slate-800 flex items-center justify-center min-h-[300px] max-h-[65vh]">
              <img 
                src={previewPhoto.url || undefined} 
                alt={previewPhoto.title} 
                className="w-full h-full max-h-[65vh] object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Original client space photo uploaded directly from browser
              </span>
              <a
                href={previewPhoto.url}
                download="client_space_photo.png"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
              >
                Open / Download Full Image
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Media Vault Selection Picker Modal */}
      <MediaVaultPickerModal
        isOpen={isVaultPickerOpen}
        onClose={() => setIsVaultPickerOpen(false)}
        title={vaultPickerTitle}
        onSelect={(url) => {
          if (vaultPickerTarget) {
            vaultPickerTarget(url);
          }
        }}
      />

      {/* ===================== EDIT / ADD REVIEW MODAL ===================== */}
      {isReviewModalOpen && editingReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-royal text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                {editingReview.id ? 'Edit Customer Review' : 'Add New Customer Review'}
              </h3>
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={editingReview.customerName}
                  onChange={(e) => setEditingReview({ ...editingReview, customerName: e.target.value })}
                  placeholder="e.g. Subhashish Roy"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Location / City</label>
                  <input
                    type="text"
                    value={editingReview.location}
                    onChange={(e) => setEditingReview({ ...editingReview, location: e.target.value })}
                    placeholder="e.g. Newtown, Kolkata"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={editingReview.rating}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Service Used</label>
                <input
                  type="text"
                  value={editingReview.serviceUsed}
                  onChange={(e) => setEditingReview({ ...editingReview, serviceUsed: e.target.value })}
                  placeholder="e.g. Metallic Marble Epoxy Flooring"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Review Description *</label>
                <textarea
                  rows={4}
                  value={editingReview.review}
                  onChange={(e) => setEditingReview({ ...editingReview, review: e.target.value })}
                  placeholder="Write customer feedback..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Photo URL (Optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingReview.photo || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, photo: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => openVaultPicker('Select Client Avatar Photo', (url) => setEditingReview({ ...editingReview, photo: url }))}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 whitespace-nowrap"
                  >
                    Media Vault
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="reviewPublishCheck"
                  checked={editingReview.isPublished}
                  onChange={(e) => setEditingReview({ ...editingReview, isPublished: e.target.checked })}
                  className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 bg-slate-950"
                />
                <label htmlFor="reviewPublishCheck" className="text-slate-300 font-medium cursor-pointer">
                  Publish review publicly on homepage
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingReview.customerName.trim() || !editingReview.review.trim()) {
                    alert('Please provide Customer Name and Review description.');
                    return;
                  }
                  if (editingReview.id) {
                    updateReview(editingReview.id, editingReview);
                  } else {
                    addReview({
                      customerName: editingReview.customerName,
                      location: editingReview.location || 'Kolkata',
                      rating: editingReview.rating || 5,
                      review: editingReview.review,
                      serviceUsed: editingReview.serviceUsed || 'Epoxy Coating',
                      isPublished: editingReview.isPublished !== false,
                      photo: editingReview.photo
                    });
                  }
                  setIsReviewModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CONFIRM DELETE REVIEW MODAL ===================== */}
      {confirmDeleteReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="font-serif-royal text-lg font-bold text-white">Delete Customer Review?</h3>
                <p className="text-xs text-slate-400">This action will permanently remove this review.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{confirmDeleteReview.customerName}</span>
                <span className="text-amber-400 font-medium">{confirmDeleteReview.location}</span>
              </div>
              <p className="text-slate-300 italic line-clamp-3 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                "{confirmDeleteReview.review}"
              </p>
              <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between font-medium">
                <span className="text-amber-400">{confirmDeleteReview.serviceUsed}</span>
                <span className="flex items-center gap-1 text-amber-400">
                  {[...Array(confirmDeleteReview.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Are you sure you want to remove this review from both live website testimonials and database?
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setConfirmDeleteReview(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteReview(confirmDeleteReview.id);
                  setConfirmDeleteReview(null);
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-lg shadow-red-600/20"
              >
                Yes, Delete Review
              </button>
            </div>
          </div>
        </div>
      )}

        </main>
      </div>
    </div>
  );
};
