import React, { useState } from 'react';
import { 
  Sparkles, 
  Filter, 
  Eye, 
  Calendar, 
  Tag, 
  Search,
  CheckCircle2,
  Maximize2,
  ArrowLeftRight,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DesignItem } from '../../types';

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { 
    designs, 
    setSelectedDesignForModal, 
    setIsBookVisitModalOpen, 
    setPreselectedDesignCode,
    comparisonDesignIds,
    toggleComparisonDesign,
    setIsCompareModalOpen,
    openFullscreenImage
  } = useStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [subTypeFilter, setSubTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryOptions = [
    { id: 'all', label: 'All Designs' },
    { id: 'metallic-marble', label: 'Marble & Metallic' },
    { id: '2d-flooring', label: '2D Flooring' },
    { id: '3d-flooring', label: '3D Flooring' },
    { id: 'wall-art', label: 'Wall Art' },
    { id: 'staircase', label: 'Staircase' },
    { id: 'ceiling', label: 'Ceiling' },
    { id: 'commercial-industrial', label: 'Commercial' },
  ];

  const subTypeOptions = [
    { id: 'all', label: 'All Types' },
    { id: '2D', label: '2D Patterns' },
    { id: '3D', label: '3D Depth' },
    { id: 'Metallic', label: 'Metallic Swirl' },
    { id: 'Custom', label: 'Custom & Geode' },
  ];

  const filteredDesigns = designs.filter(d => {
    if (!d.isPublished) return false;
    
    // Category check
    if (categoryFilter !== 'all' && d.category !== categoryFilter) {
      return false;
    }

    // Sub-type check
    if (subTypeFilter !== 'all' && d.subType !== subTypeFilter) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesCode = d.code.toLowerCase().includes(q);
      const matchesName = d.name.toLowerCase().includes(q);
      const matchesDesc = d.description.toLowerCase().includes(q);
      const matchesLoc = d.suitableLocations.some(l => l.toLowerCase().includes(q));
      if (!matchesCode && !matchesName && !matchesDesc && !matchesLoc) {
        return false;
      }
    }

    return true;
  });

  const handleOpenDesign = (item: DesignItem) => {
    setSelectedDesignForModal(item);
  };

  const handleOpenFullscreen = (item: DesignItem) => {
    const allImgs = [item.mainImage, ...(item.galleryImages || [])];
    openFullscreenImage({
      url: item.mainImage,
      title: item.name,
      subtitle: item.description,
      code: item.code,
      category: item.category,
      minRate: item.minRate,
      maxRate: item.maxRate,
      unit: item.unit,
      designItem: item,
      allImages: allImgs,
      currentIndex: 0
    });
  };

  const handleBook = (code: string) => {
    setPreselectedDesignCode(code);
    setIsBookVisitModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> High-Resolution Master Visuals & Rates
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl font-extrabold text-white">
          Design Catalogue
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Explore our complete catalogue of 3D Floors, 2D Epoxy, Liquid Italian Marble, Geode Wall Art, and Illuminated Ceilings. 
          <span className="text-amber-300 font-medium block mt-1">💡 Click any design image to open in Full-Page HD View with zoom & details.</span>
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/20 space-y-5 shadow-xl">
        {/* Search bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by code (e.g. ME-01, 3D-FL-01), room, or name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Primary Category Filters */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider text-center sm:text-left">
            Filter by Category:
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            {categoryOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCategoryFilter(opt.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  categoryFilter === opt.id
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/40'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-type Filters & Compare Launcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider text-center sm:text-left">
              Filter by Style & Depth:
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              {subTypeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSubTypeFilter(opt.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    subTypeFilter === opt.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Compare Launcher Button */}
          {comparisonDesignIds.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition self-center sm:self-end"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Compare Selected ({comparisonDesignIds.length}/4)</span>
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 mb-6">
          <span>Showing <strong>{filteredDesigns.length}</strong> master designs</span>
          <div className="flex items-center gap-3">
            <span className="text-amber-400/80 font-medium">Tip: Click "Compare" on any design to evaluate side-by-side</span>
          </div>
        </div>

        {filteredDesigns.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
            <p className="text-slate-400 text-sm">No designs matched your filter criteria.</p>
            <button
              onClick={() => { setCategoryFilter('all'); setSubTypeFilter('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDesigns.map((item) => {
              const isCompared = comparisonDesignIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`group bg-[#0f172a] rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl flex flex-col justify-between ${
                    isCompared 
                      ? 'border-amber-400 ring-2 ring-amber-500/40 bg-amber-950/10' 
                      : 'border-amber-500/20 hover:border-amber-400/70'
                  }`}
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-slate-950"
                    onClick={() => handleOpenFullscreen(item)}
                    title="Click for Full Page / Fullscreen View"
                  >
                    <img
                      src={item.mainImage || undefined}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-amber-500 text-black font-extrabold text-xs shadow-md">
                      {item.code}
                    </div>

                    {item.subType && (
                      <div className="absolute top-3 right-12 px-2 py-0.5 rounded bg-slate-900/80 text-amber-300 text-[10px] font-semibold border border-amber-500/30 backdrop-blur-sm">
                        {item.subType}
                      </div>
                    )}

                    {/* Quick Compare Checkbox on Card Image */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComparisonDesign(item.id);
                      }}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg text-xs font-bold transition shadow-lg backdrop-blur-sm flex items-center justify-center ${
                        isCompared 
                          ? 'bg-amber-500 text-black shadow-amber-500/30 ring-2 ring-black' 
                          : 'bg-black/70 hover:bg-black/90 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                      title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                      aria-label="Toggle compare"
                    >
                      {isCompared ? <Check className="w-3.5 h-3.5" /> : <ArrowLeftRight className="w-3.5 h-3.5" />}
                    </button>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3.5 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5" /> Full Page HD View
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">
                          {item.category.replace('-', ' ')}
                        </span>
                        {isCompared && (
                          <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40">
                            In Compare Tray
                          </span>
                        )}
                      </div>
                      <h3 
                        onClick={() => handleOpenDesign(item)}
                        className="font-serif-royal font-bold text-xl text-white hover:text-amber-300 transition-colors cursor-pointer mt-0.5"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Est. Rate:</span>
                        <span className="text-sm font-serif-royal font-bold text-amber-300">
                          ₹{item.minRate} – ₹{item.maxRate} / {item.unit}
                        </span>
                      </div>

                      {/* Action buttons: Compare toggle + Details + Book */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleOpenDesign(item)}
                            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition"
                          >
                            <Eye className="w-3.5 h-3.5" /> Details
                          </button>
                          <button
                            onClick={() => handleBook(item.code)}
                            className="py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-xs font-bold flex items-center justify-center gap-1 transition shadow-md hover:opacity-95"
                          >
                            <Calendar className="w-3.5 h-3.5" /> Book Visit
                          </button>
                        </div>

                        {/* Compare toggle button on card footer */}
                        <button
                          onClick={() => toggleComparisonDesign(item.id)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                            isCompared 
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/40' 
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-amber-500/30'
                          }`}
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isCompared ? 'Remove from Comparison' : '+ Compare this Design'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
