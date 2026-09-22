import React from 'react';
import { Phone, MessageSquare, Calendar, Image as ImageIcon, Sparkles, ArrowLeftRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface MobileStickyBarProps {
  currentPage?: string;
  onNavigate: (page: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ currentPage = 'home', onNavigate }) => {
  const { 
    companyInfo, 
    setIsBookVisitModalOpen, 
    selectedDesignForModal, 
    preselectedDesignCode, 
    comparisonDesignIds, 
    designs,
    services,
    isCompareModalOpen
  } = useStore();

  // Determine active context & build prefilled WhatsApp message
  const getWhatsAppDetails = () => {
    const rawNumber = companyInfo.whatsapp.replace(/[^0-9]/g, '');

    // 1. Highest Priority: Currently opened design in modal
    if (selectedDesignForModal) {
      const d = selectedDesignForModal;
      const text = `Hello Royal Resin Interior, I am viewing *${d.code} - ${d.name}* (${d.category.replace('-', ' ')}). Est. rate: ₹${d.minRate} - ₹${d.maxRate} / ${d.unit}.\n\nCould you please share real site photos, samples, and estimated cost for my space?`;
      return {
        url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
        badge: d.code,
        label: `Chat: ${d.code}`,
        isContextual: true
      };
    }

    // 2. Comparison Tray or Comparison Modal Active
    if ((isCompareModalOpen || comparisonDesignIds.length > 0) && comparisonDesignIds.length > 0) {
      const comparedItems = comparisonDesignIds
        .map(id => designs.find(d => d.id === id))
        .filter(Boolean);
      const codes = comparedItems.map(d => d?.code).join(', ');
      const text = `Hello Royal Resin Interior, I am comparing these designs on your website: *${codes}*.\n\nCould you please recommend the best option for my interior space and provide a quotation?`;
      return {
        url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
        badge: `${comparisonDesignIds.length} Designs`,
        label: 'Compare Chat',
        isContextual: true
      };
    }

    // 3. Preselected Design Code (e.g. from a recent booking intent)
    if (preselectedDesignCode) {
      const d = designs.find(item => item.code === preselectedDesignCode || item.id === preselectedDesignCode);
      const name = d ? ` - ${d.name}` : '';
      const text = `Hello Royal Resin Interior, I am interested in design *${preselectedDesignCode}${name}*.\n\nPlease share execution timeline, pricing, and site survey availability.`;
      return {
        url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
        badge: preselectedDesignCode,
        label: `Chat: ${preselectedDesignCode}`,
        isContextual: true
      };
    }

    // 4. Service Category Showcase Pages
    if (currentPage.startsWith('service-')) {
      const slug = currentPage.replace('service-', '');
      const service = services.find(s => s.slug === slug);
      const serviceName = service ? service.name : slug.replace('-', ' ');
      const text = `Hello Royal Resin Interior, I am currently exploring your *${serviceName}* solutions on your website.\n\nI would like to consult with a resin specialist and arrange a site evaluation.`;
      return {
        url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
        badge: serviceName.split(' ')[0],
        label: `${serviceName.split(' ')[0]} Chat`,
        isContextual: true
      };
    }

    // 5. Specific Page Contexts
    switch (currentPage) {
      case 'pricing': {
        const text = `Hello Royal Resin Interior, I am reviewing your package pricing and rates on the website. I would like a custom estimate for my room area.`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: 'Pricing',
          label: 'Price Query',
          isContextual: true
        };
      }
      case 'gallery': {
        const text = `Hello Royal Resin Interior, I am browsing your design gallery catalogue. Could you share your complete luxury catalogue PDF and discuss custom designs?`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: 'Gallery',
          label: 'Gallery Chat',
          isContextual: true
        };
      }
      case 'projects': {
        const text = `Hello Royal Resin Interior, I saw your portfolio of completed luxury resin flooring & wall art projects. I would like to discuss a similar installation for my property.`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: 'Projects',
          label: 'Project Query',
          isContextual: true
        };
      }
      case 'book-visit': {
        const text = `Hello Royal Resin Interior, I want to book a free on-site survey and laser area measurement for my upcoming project.`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: 'Site Visit',
          label: 'Survey Booking',
          isContextual: true
        };
      }
      case 'enquiry': {
        const text = `Hello Royal Resin Interior, I would like to make a technical inquiry regarding epoxy resin flooring durability, warranty, and surface preparation.`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: 'Enquiry',
          label: 'Direct Inquiry',
          isContextual: true
        };
      }
      case 'contact': {
        const text = `Hello Royal Resin Interior, I would like to get in touch with your senior flooring consultant for a project consultation.`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: 'Contact',
          label: 'Direct Contact',
          isContextual: true
        };
      }
      case 'faq': {
        const text = `Hello Royal Resin Interior, I was reading your FAQs and have a question about epoxy resin flooring maintenance and turnaround times.`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: 'FAQ',
          label: 'Ask Expert',
          isContextual: true
        };
      }
      default: {
        const text = `Hello Royal Resin Interior, I am interested in your luxury 2D/3D Epoxy Flooring, Metallic Marble & Resin Wall Art finishes. Please guide me with catalogue & pricing.`;
        return {
          url: `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`,
          badge: null,
          label: 'WhatsApp',
          isContextual: false
        };
      }
    }
  };

  const waDetails = getWhatsAppDetails();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0e17]/95 backdrop-blur-xl border-t border-amber-500/30 px-2 sm:px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
        {/* 1. Call Now */}
        <a
          href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 active:bg-slate-800 text-slate-200 transition"
          title="Direct Phone Call"
        >
          <Phone className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Call Now</span>
        </a>

        {/* 2. Context-Aware Direct WhatsApp */}
        <a
          href={waDetails.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-col items-center justify-center p-1.5 rounded-xl bg-gradient-to-b from-emerald-950/80 to-emerald-900/90 border border-emerald-500/60 active:scale-95 text-emerald-200 shadow-md shadow-emerald-950/50 transition group"
          title="Direct WhatsApp with context pre-filled"
        >
          {/* Dynamic Context Tag Badge */}
          {waDetails.badge && (
            <span className="absolute -top-1.5 right-1 px-1 py-0.2 rounded bg-emerald-500 text-black text-[8px] font-extrabold uppercase tracking-tighter shadow-sm animate-pulse">
              {waDetails.badge}
            </span>
          )}
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-bold text-emerald-300 truncate max-w-full px-0.5">
            {waDetails.isContextual ? waDetails.label : 'WhatsApp'}
          </span>
        </a>

        {/* 3. Book Site Visit */}
        <button
          onClick={() => setIsBookVisitModalOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 active:scale-95 text-black font-extrabold shadow-md shadow-amber-500/25 transition"
        >
          <Calendar className="w-4 h-4 text-black mb-0.5" />
          <span className="text-[10px] tracking-tight">Book Visit</span>
        </button>

        {/* 4. Catalogue / All Designs */}
        <button
          onClick={() => {
            onNavigate('gallery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl border active:bg-slate-800 transition ${
            currentPage === 'gallery'
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
              : 'bg-slate-900/90 border-slate-700/80 text-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Catalogue</span>
        </button>
      </div>
    </div>
  );
};

