import React from 'react';
import { ArrowLeftRight, X, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ComparisonFloatingTray: React.FC = () => {
  const { 
    designs, 
    comparisonDesignIds, 
    removeFromComparison, 
    clearComparison, 
    setIsCompareModalOpen,
    isCompareModalOpen
  } = useStore();

  if (comparisonDesignIds.length === 0 || isCompareModalOpen) {
    return null;
  }

  const selectedDesigns = comparisonDesignIds
    .map(id => designs.find(d => d.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0b101b]/95 backdrop-blur-xl border-2 border-amber-500/40 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 text-slate-100">
        {/* Left info & thumbnails */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-0.5">
          <div className="hidden sm:flex flex-col items-start pr-2 border-r border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
              <ArrowLeftRight className="w-3 h-3" /> Compare
            </span>
            <span className="text-xs font-serif-royal font-bold text-white whitespace-nowrap">
              {comparisonDesignIds.length}/4 Selected
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-1.5 shrink-0">
            {selectedDesigns.map((design) => design && (
              <div 
                key={design.id} 
                className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 shrink-0"
              >
                <img 
                  src={design.mainImage} 
                  alt={design.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors" />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-amber-300 font-bold text-center truncate px-0.5">
                  {design.code}
                </span>
                {/* Remove 'x' */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromComparison(design.id);
                  }}
                  className="absolute -top-1 -right-1 p-0.5 rounded-full bg-red-600 text-white hover:bg-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {Array.from({ length: 4 - selectedDesigns.length }).map((_, idx) => (
              <div 
                key={idx}
                onClick={() => setIsCompareModalOpen(true)}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 flex items-center justify-center text-slate-500 hover:border-amber-500/50 hover:text-amber-400 cursor-pointer transition text-xs shrink-0"
                title="Add design to compare"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="py-2.5 px-3.5 sm:px-5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition transform active:scale-95"
          >
            <span>Compare Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={clearComparison}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Clear comparison tray"
            aria-label="Clear all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
