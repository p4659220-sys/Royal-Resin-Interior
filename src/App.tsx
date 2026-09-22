import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileStickyBar } from './components/common/MobileStickyBar';
import { DesignDetailModal } from './components/common/DesignDetailModal';
import { BookVisitModal } from './components/common/BookVisitModal';
import { EnquiryModal } from './components/common/EnquiryModal';
import { DesignCompareModal } from './components/common/DesignCompareModal';
import { FullscreenImageModal } from './components/common/FullscreenImageModal';
import { ComparisonFloatingTray } from './components/common/ComparisonFloatingTray';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';
import { ToastContainer } from './components/common/ToastContainer';
import { MetaTagManager } from './components/common/MetaTagManager';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { AboutPage } from './pages/customer/AboutPage';
import { ServicesPage } from './pages/customer/ServicesPage';
import { CategoryShowcasePage } from './pages/customer/CategoryShowcasePage';
import { GalleryPage } from './pages/customer/GalleryPage';
import { ProjectsPage } from './pages/customer/ProjectsPage';
import { PricingPage } from './pages/customer/PricingPage';
import { BookVisitPage } from './pages/customer/BookVisitPage';
import { EnquiryPage } from './pages/customer/EnquiryPage';
import { FAQPage } from './pages/customer/FAQPage';
import { ContactPage } from './pages/customer/ContactPage';

// Admin Page
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} />;
      case 'service-metallic-marble':
        return <CategoryShowcasePage categorySlug="metallic-marble" onNavigate={navigateTo} />;
      case 'service-2d-flooring':
        return <CategoryShowcasePage categorySlug="2d-flooring" onNavigate={navigateTo} />;
      case 'service-3d-flooring':
        return <CategoryShowcasePage categorySlug="3d-flooring" onNavigate={navigateTo} />;
      case 'service-wall-art':
        return <CategoryShowcasePage categorySlug="wall-art" onNavigate={navigateTo} />;
      case 'service-staircase':
        return <CategoryShowcasePage categorySlug="staircase" onNavigate={navigateTo} />;
      case 'service-ceiling':
        return <CategoryShowcasePage categorySlug="ceiling" onNavigate={navigateTo} />;
      case 'service-commercial-industrial':
        return <CategoryShowcasePage categorySlug="commercial-industrial" onNavigate={navigateTo} />;
      case 'gallery':
        return <GalleryPage onNavigate={navigateTo} />;
      case 'projects':
        return <ProjectsPage onNavigate={navigateTo} />;
      case 'pricing':
        return <PricingPage onNavigate={navigateTo} />;
      case 'book-visit':
        return <BookVisitPage onNavigate={navigateTo} />;
      case 'enquiry':
        return <EnquiryPage onNavigate={navigateTo} />;
      case 'faq':
        return <FAQPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'admin':
        return <AdminDashboard onNavigateHome={() => navigateTo('home')} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  const isAdminView = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#070a10] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Dynamic SEO Meta Tags & Schema Manager */}
      <MetaTagManager currentPage={currentPage} />

      {/* Top Customer Header */}
      {!isAdminView && (
        <Header 
          activePage={currentPage} 
          setActivePage={navigateTo} 
          onOpenAdmin={() => navigateTo('admin')} 
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 ${isAdminView ? 'pt-4' : 'pt-24'} pb-24 md:pb-12`}>
        {renderPage()}
      </main>

      {/* Customer Footer */}
      {!isAdminView && (
        <Footer 
          onNavigate={navigateTo} 
          onOpenAdmin={() => navigateTo('admin')} 
        />
      )}

      {/* Mobile Sticky Action Bar */}
      {!isAdminView && (
        <MobileStickyBar currentPage={currentPage} onNavigate={navigateTo} />
      )}

      {/* Floating Comparison Tray */}
      {!isAdminView && (
        <ComparisonFloatingTray />
      )}

      {/* Floating WhatsApp Instant Chat Button */}
      {!isAdminView && (
        <FloatingWhatsAppButton currentPage={currentPage} />
      )}

      {/* Global Interactive Modals */}
      <DesignDetailModal />
      <DesignCompareModal />
      <FullscreenImageModal />
      <BookVisitModal />
      <EnquiryModal />

      {/* Notification Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
