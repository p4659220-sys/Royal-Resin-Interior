import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Tag, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare,
  Phone,
  Maximize2,
  ArrowLeftRight,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DesignItem } from '../../types';

export const DesignDetailModal: React.FC = () => {
  const { 
    selectedDesignForModal, 
    setSelectedDesignForModal, 
    setIsBookVisitModalOpen, 
    setPreselectedDesignCode,
    companyInfo,
    comparisonDesignIds,
    toggleComparisonDesign,
    setIsCompareModalOpen,
    openFullscreenImage
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedDesignForModal) return null;

  const design = selectedDesignForModal;
  const allImages = [design.mainImage, ...(design.galleryImages || [])];
  const isCompared = comparisonDesignIds.includes(design.id);

  const handleOpenFullscreen = () => {
    openFullscreenImage({
      url: allImages[activeImageIndex],
      title: design.name,
      subtitle: design.description,
      code: design.code,
      category: design.category,
      minRate: design.minRate,
      maxRate: design.maxRate,
      unit: design.unit,
      designItem: design,
      allImages: allImages,
      currentIndex: activeImageIndex
    });
  };

  const handleBookThis = () => {
    setPreselectedDesignCode(design.code);
    setSelectedDesignForModal(null);
    setIsBookVisitModalOpen(true);
  };

  const handleOpenComparison = () => {
    if (!isCompared) {
      toggleComparisonDesign(design.id);
    }
    setSelectedDesignForModal(null);
    setIsCompareModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d131f] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDesignForModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-8">
          {/* Left Column: Image Viewer */}
          <div className="space-y-3">
            <div 
              className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-amber-500/20 bg-slate-950 shadow-inner group cursor-pointer"
              onClick={handleOpenFullscreen}
              title="Click for Full Page / Fullscreen View"
            >
              <img
                src={allImages[activeImageIndex]}
                alt={design.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-black font-bold text-xs shadow-md">
                {design.code}
              </div>
              {design.subType && (
                <div className="absolute top-3 right-12 px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-300 text-[11px] font-semibold border border-amber-500/30 backdrop-blur-sm">
                  {design.subType}
                </div>
              )}

              {/* Fullscreen hover badge */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-xl">
                  <Maximize2 className="w-3.5 h-3.5" /> Full Page HD View
                </span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx ? 'border-amber-400 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Estimated Rate Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Estimated Rate Range
              </div>
              <div className="text-2xl font-serif-royal font-bold text-amber-200">
                ₹{design.minRate} – ₹{design.maxRate} <span className="text-sm font-sans font-normal text-slate-400">/ {design.unit}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                *Final cost calculated after on-site laser measurement and surface condition review.
              </p>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  {design.category.replace('-', ' ')}
                </span>
                <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white mt-1">
                  {design.name}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {design.description}
              </p>

              {/* Suitable Spaces */}
              <div>
                <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Ideal For Spaces
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {design.suitableLocations.map((loc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-amber-200"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Key Features & Specs
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {design.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <button
                onClick={handleBookThis}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Site Visit for {design.code}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Compare toggle & Open compare modal */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleComparisonDesign(design.id)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                    isCompared 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  {isCompared ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isCompared ? 'In Compare Tray' : '+ Add to Compare'}</span>
                </button>

                <button
                  onClick={handleOpenComparison}
                  className="py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>View Compare Matrix</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Royal%20Resin%2C%20I%20am%20interested%20in%20design%20${design.code}%20(${design.name}).%20Please%20share%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Ask on WhatsApp
                </a>
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> Direct Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
