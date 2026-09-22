import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Clock, 
  CheckCheck, 
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FloatingWhatsAppButtonProps {
  currentPage?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ 
  currentPage = 'home' 
}) => {
  const { companyInfo, selectedDesignForModal } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const rawNumber = (companyInfo?.whatsapp || '+919830012345').replace(/[^0-9]/g, '');

  // Pre-configured intelligent inquiries based on current page or design
  const getContextualPrompts = () => {
    if (selectedDesignForModal) {
      return [
        `Price for ${selectedDesignForModal.code}`,
        `Site survey for ${selectedDesignForModal.name}`,
        'Ask about execution time'
      ];
    }

    switch (currentPage) {
      case 'pricing':
        return [
          'Get custom rate estimate for my sq.ft.',
          'Which package is best for living rooms?',
          'What is included in the base rate?'
        ];
      case 'gallery':
      case 'projects':
        return [
          'Send complete luxury PDF catalogue',
          'Can you customize color pigments?',
          'Do you have samples to show in Kolkata?'
        ];
      case 'services':
      case 'service-metallic-marble':
      case 'service-3d-flooring':
      case 'service-staircase':
      case 'service-wall-art':
        return [
          'Request design consultation & quote',
          'Is it durable & scratch resistant?',
          'Book free laser measurement visit'
        ];
      default:
        return [
          'Get a quick rate estimate (₹/sq.ft.)',
          'Book a free site survey in Kolkata',
          'Request latest resin catalogue PDF'
        ];
    }
  };

  const getDefaultMessage = () => {
    if (selectedDesignForModal) {
      return `Hello Royal Resin Interior, I am interested in *${selectedDesignForModal.code} - ${selectedDesignForModal.name}*. Please share pricing and real installation photos.`;
    }

    switch (currentPage) {
      case 'pricing':
        return 'Hello Royal Resin Interior, I am reviewing your package pricing and would like an estimate for my space.';
      case 'gallery':
      case 'projects':
        return 'Hello Royal Resin Interior, I am browsing your design gallery. Could you please send me your high-resolution portfolio and sample photos?';
      case 'book-visit':
        return 'Hello Royal Resin Interior, I would like to schedule a free on-site laser measurement visit for my property.';
      default:
        return 'Hello Royal Resin Interior, I would like to inquire about your luxury epoxy flooring and artisan resin services.';
    }
  };

  // Launch WhatsApp with the specified text
  const openWhatsApp = (customText?: string) => {
    const textToSend = (customText || userMessage || getDefaultMessage()).trim();
    const encoded = encodeURIComponent(textToSend);
    const url = `https://wa.me/${rawNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Show a subtle welcoming tooltip after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={popoverRef}
      className="fixed bottom-24 md:bottom-7 right-4 sm:right-6 z-40 flex flex-col items-end select-none"
    >
      {/* ===================== CHAT POPOVER WIDGET ===================== */}
      {isOpen && (
        <div 
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[360px] max-w-[380px] bg-slate-950/95 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{ boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(16, 185, 129, 0.25)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-slate-950 border-2 border-amber-400/80 flex items-center justify-center font-serif-royal font-bold text-amber-400 text-sm shadow-md">
                  RR
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full"></span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif-royal font-bold text-sm text-white leading-tight">
                    Royal Resin Interior
                  </h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Online • Typically replies in 5 mins</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-emerald-100 hover:text-white transition"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content Body */}
          <div className="p-4 space-y-4 max-h-[360px] overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/90 via-slate-950 to-black text-xs">
            {/* Timestamp */}
            <div className="flex justify-center">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> Just now
              </span>
            </div>

            {/* Inbound Agent Message Bubble */}
            <div className="flex items-start gap-2 max-w-[90%]">
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed shadow-md space-y-1.5">
                <p>
                  Namaskar! 🙏 Welcome to <strong className="text-amber-400 font-semibold">Royal Resin Interior</strong>.
                </p>
                <p className="text-slate-300">
                  How can our resin master craftsmen assist with your luxury flooring, 3D art, or staircase project today?
                </p>
                <div className="flex justify-end pt-1">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    10:00 AM <CheckCheck className="w-3 h-3 text-emerald-400" />
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-semibold text-amber-400/90 uppercase tracking-wider flex items-center gap-1 px-1">
                <Sparkles className="w-3 h-3" /> Quick Inquiries
              </div>
              <div className="flex flex-col gap-1.5">
                {getContextualPrompts().map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => openWhatsApp(`Hello Royal Resin, ${prompt}.`)}
                    className="text-left px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{prompt}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input & Direct Send Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                openWhatsApp();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95"
                title="Send on WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-lg active:scale-98"
            >
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Instant Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* ===================== FLOATING TRIGGER BUTTON ===================== */}
      <div className="flex items-center gap-2">
        {/* Helper Tooltip on desktop (Auto appears or hoverable) */}
        {!isOpen && showTooltip && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-white text-xs font-semibold shadow-2xl shadow-black cursor-pointer hover:border-emerald-400 transition-all hover:scale-105 group animate-in fade-in slide-in-from-right-3 duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Need a Quote? Chat on WhatsApp</span>
            <X 
              className="w-3.5 h-3.5 text-slate-400 hover:text-white ml-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
            />
          </div>
        )}

        {/* Main Circular Floating WhatsApp Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#20ba59] via-[#25D366] to-[#4eed87] text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
          aria-label="Open WhatsApp Chat Support"
        >
          {/* Subtle Outer Pulsing Wave */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 group-hover:opacity-75 animate-ping -z-10 duration-1000"></span>

          {/* Realtime Online Green Dot */}
          <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-300 border-2 border-slate-950 rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          </span>

          {/* Icon (Toggle between WhatsApp SVG and Close X) */}
          {isOpen ? (
            <X className="w-7 h-7 text-black stroke-[2.5]" />
          ) : (
            <svg 
              className="w-7 h-7 sm:w-8 sm:h-8 fill-black transition-transform duration-300 group-hover:rotate-6" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
