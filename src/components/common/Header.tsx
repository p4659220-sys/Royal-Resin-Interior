import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  Grid, 
  Layers, 
  Flame, 
  Palette, 
  Compass, 
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onOpenAdmin }) => {
  const { companyInfo, setIsBookVisitModalOpen, notifications, bookings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const pendingBookingsCount = bookings.filter(b => b.status === 'New').length;

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: '🎨 Design Catalogue (ক্যাটালগ)' },
    { id: 'about', label: 'About Us' },
    { 
      id: 'services', 
      label: 'Our Services',
      hasDropdown: true,
      children: [
        { id: 'service-metallic-marble', label: 'Metallic / Resin Marble' },
        { id: 'service-2d-flooring', label: '2D Epoxy Flooring' },
        { id: 'service-3d-flooring', label: '3D Epoxy Flooring' },
        { id: 'service-wall-art', label: 'Wall Art & Cladding' },
        { id: 'service-staircase', label: 'Designer Staircase' },
        { id: 'service-ceiling', label: 'Resin Ceiling' },
        { id: 'service-commercial-industrial', label: 'Commercial & Industrial' },
      ]
    },
    { id: 'service-3d-flooring', label: '3D Flooring Catalogue' },
    { id: 'service-2d-flooring', label: '2D Flooring Catalogue' },
    { id: 'service-metallic-marble', label: 'Resin Marble Catalogue' },
    { id: 'service-wall-art', label: 'Wall Art Catalogue' },
    { id: 'service-staircase', label: 'Staircase Catalogue' },
    { id: 'projects', label: 'Our Projects' },
    { id: 'pricing', label: 'Pricing & Rates' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-amber-900/30">
      {/* Top micro bar for direct contact & announcements */}
      <div className="hidden lg:block bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-amber-950/40 border-b border-amber-500/15 py-1.5 px-6 text-xs text-amber-200/90">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> {companyInfo.announcementTitle || "Bengal's Premier Luxury 2D & 3D Resin Studio"}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">{companyInfo.announcementSubtitle || 'Free Laser Measurement & On-Site Consultation'}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-300">
              <span className="text-amber-400 font-semibold">Hours:</span> {companyInfo.businessHours.split('|')[0]}
            </span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800/80 hover:bg-amber-900/50 text-amber-300 hover:text-amber-200 border border-amber-500/20 transition text-[11px]"
              title="Open Admin Control Panel"
            >
              <Lock className="w-3 h-3" /> Admin Panel
              {pendingBookingsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-black font-bold text-[10px]">
                  {pendingBookingsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="font-serif-royal font-bold text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                ROYAL RESIN
              </div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.25em] text-amber-300/80 uppercase font-semibold">
                INTERIOR & ART
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition ${
                activePage === 'home' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition ${
                activePage === 'about' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
              }`}
            >
              About Us
            </button>

            {/* Services Dropdown */}
            <div className="relative" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onClick={() => handleNavClick('services')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition ${
                  activePage.startsWith('service') || activePage === 'services'
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
                }`}
              >
                Our Services <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-64 bg-[#0f172a] border border-amber-500/30 rounded-xl shadow-2xl p-2 py-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                >
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-amber-400 hover:bg-amber-500/10 flex items-center justify-between"
                  >
                    <span>All Services Overview</span>
                    <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">7 Categories</span>
                  </button>
                  <div className="h-px bg-slate-800 my-1"></div>
                  <button
                    onClick={() => handleNavClick('service-metallic-marble')}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/60"
                  >
                    Metallic / Resin Marble
                  </button>
                  <button
                    onClick={() => handleNavClick('service-2d-flooring')}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/60"
                  >
                    2D Epoxy Flooring
                  </button>
                  <button
                    onClick={() => handleNavClick('service-3d-flooring')}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/60"
                  >
                    3D Epoxy Flooring
                  </button>
                  <button
                    onClick={() => handleNavClick('service-wall-art')}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/60"
                  >
                    Wall Art & Cladding
                  </button>
                  <button
                    onClick={() => handleNavClick('service-staircase')}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/60"
                  >
                    Designer Staircase
                  </button>
                  <button
                    onClick={() => handleNavClick('service-ceiling')}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/60"
                  >
                    Resin Ceiling
                  </button>
                  <button
                    onClick={() => handleNavClick('service-commercial-industrial')}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/60"
                  >
                    Commercial & Industrial
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                activePage === 'gallery' 
                  ? 'text-amber-400 bg-amber-500/15 border border-amber-500/40 shadow-sm shadow-amber-500/10' 
                  : 'text-amber-300/90 hover:text-amber-200 hover:bg-slate-800/60 border border-amber-500/20'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Design Catalogue</span>
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition ${
                activePage === 'projects' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition ${
                activePage === 'pricing' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition ${
                activePage === 'faq' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition ${
                activePage === 'contact' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Quick Action Buttons on Desktop */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Call Now */}
            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/40 text-xs font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Now</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Royal%20Resin%20Interior%2C%20I%20want%20to%20know%20more%20about%20your%20luxury%20epoxy%20flooring.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Book Site Visit CTA */}
            <button
              onClick={() => setIsBookVisitModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-xs shadow-md shadow-amber-500/25 transition transform active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </button>
          </div>

          {/* Mobile Menu Trigger & Admin quick switch */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-slate-800/80 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1"
              title="Admin Panel"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0e17] border-b border-amber-500/20 px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs font-semibold text-emerald-300"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsBookVisitModalOpen(true);
            }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Calendar className="w-4 h-4" /> Book Site Visit
          </button>

          <div className="space-y-1 pt-2">
            <div className="text-[11px] font-bold text-amber-500 uppercase tracking-wider px-3 py-1">
              Navigation
            </div>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activePage === item.id 
                    ? 'bg-amber-500/15 text-amber-400 font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-amber-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-400 font-semibold text-xs flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" /> Admin Portal & CMS
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                Staff Only
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
