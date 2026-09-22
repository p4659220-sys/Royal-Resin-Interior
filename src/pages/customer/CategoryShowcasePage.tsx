import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Tag, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  Shield, 
  Zap, 
  Info, 
  Layers,
  ArrowLeftRight,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ServiceCategoryType, DesignItem } from '../../types';

interface CategoryShowcasePageProps {
  categorySlug: ServiceCategoryType;
  onNavigate: (page: string) => void;
}

export const CategoryShowcasePage: React.FC<CategoryShowcasePageProps> = ({ categorySlug, onNavigate }) => {
  const { 
    services, 
    designs, 
    setSelectedDesignForModal, 
    setIsBookVisitModalOpen, 
    setPreselectedDesignCode,
    comparisonDesignIds,
    toggleComparisonDesign,
    setIsCompareModalOpen,
    openFullscreenImage
  } = useStore();

  const currentService = services.find(s => s.slug === categorySlug);
  const categoryDesigns = designs.filter(d => d.category === categorySlug && d.isPublished);

  const handleOpenDesign = (design: DesignItem) => {
    setSelectedDesignForModal(design);
  };

  const handleOpenFullscreen = (design: DesignItem) => {
    const allImgs = [design.mainImage, ...(design.galleryImages || [])];
    openFullscreenImage({
      url: design.mainImage,
      title: design.name,
      subtitle: design.description,
      code: design.code,
      category: design.category,
      minRate: design.minRate,
      maxRate: design.maxRate,
      unit: design.unit,
      designItem: design,
      allImages: allImgs,
      currentIndex: 0
    });
  };

  const handleBookDesign = (designCode: string) => {
    setPreselectedDesignCode(designCode);
    setIsBookVisitModalOpen(true);
  };

  if (!currentService) {
    return (
      <div className="text-center py-20 text-slate-400">
        Category not found. <button onClick={() => onNavigate('services')} className="text-amber-400 underline">View all services</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 p-8 sm:p-14 bg-gradient-to-r from-[#0d131f] via-slate-900 to-[#0d131f] shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Exclusive Royal Collection
          </div>
          <h1 className="font-serif-royal text-3xl sm:text-5xl font-extrabold text-white">
            {currentService.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {currentService.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-200">
              <span className="text-slate-400">Estimated Rate:</span>{' '}
              <strong className="text-amber-400 text-sm font-serif-royal">
                ₹{currentService.minRate} – ₹{currentService.maxRate} / {currentService.unit}
              </strong>
            </div>

            <button
              onClick={() => setIsBookVisitModalOpen(true)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold flex items-center gap-1.5 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Site Visit
            </button>
          </div>
        </div>

        {/* Decorative background accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden lg:block pointer-events-none">
          <img src={currentService.mainImage || undefined} alt={currentService.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Service Gallery Photos (5-6 Uploaded Photos Showcase) */}
      {currentService.galleryImages && currentService.galleryImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Real Installation Gallery
              </div>
              <h3 className="font-serif-royal text-2xl font-bold text-white">
                {currentService.name} Gallery Photos ({currentService.galleryImages.length})
              </h3>
            </div>
            <span className="text-xs text-slate-400">Click any photo for fullscreen HD view</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[currentService.mainImage, ...currentService.galleryImages].map((imgUrl, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  const allImgs = [currentService.mainImage, ...(currentService.galleryImages || [])];
                  openFullscreenImage({
                    url: imgUrl,
                    title: currentService.name,
                    subtitle: currentService.tagline,
                    allImages: allImgs,
                    currentIndex: idx
                  });
                }}
                className="group relative h-36 rounded-2xl overflow-hidden border border-amber-500/30 cursor-pointer bg-slate-900 shadow-md hover:border-amber-400 transition"
              >
                <img src={imgUrl || undefined} alt={`${currentService.name} ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Eye className="w-6 h-6 text-amber-400 drop-shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Section (Special highlight for Staircase anti-skid / Waterproofing) */}
      {categorySlug === 'staircase' && (
        <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-serif-royal text-lg">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Anti-Skid Clear Grip Safety Integration</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every staircase step treated with our certified <strong>Anti-Skid Clear Grip</strong> nano-bead matrix. This ensures 100% slip resistance for children and elders while maintaining the absolute crystal clarity and reflective depth of the wood and metallic marble below.
          </p>
        </div>
      )}

      {/* Design Catalogue Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Available Designs
            </div>
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white">
              Catalogue Designs ({categoryDesigns.length})
            </h2>
          </div>
          <div className="text-xs text-slate-400 hidden sm:block">
            *Click any design card for high-resolution gallery & custom room mockup
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categoryDesigns.map((item) => {
            const isCompared = comparisonDesignIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`group bg-[#0f172a] rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl flex flex-col justify-between ${
                  isCompared 
                    ? 'border-amber-400 ring-2 ring-amber-500/40 bg-amber-950/10' 
                    : 'border-amber-500/20 hover:border-amber-400/80'
                }`}
              >
                {/* Image & Badges */}
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
                    <div className="absolute top-3 right-12 px-2.5 py-0.5 rounded-full bg-slate-900/85 text-amber-300 text-[10px] font-semibold border border-amber-500/30 backdrop-blur-sm">
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
                      <Eye className="w-3.5 h-3.5" /> Full Page HD View
                    </span>
                  </div>
                </div>

                {/* Information */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 
                        onClick={() => handleOpenDesign(item)}
                        className="font-serif-royal font-bold text-xl text-white hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      {isCompared && (
                        <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40">
                          In Compare
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Suitable Space tags */}
                    <div className="pt-1 flex flex-wrap gap-1">
                      {item.suitableLocations.slice(0, 3).map((loc, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {loc}
                        </span>
                      ))}
                    </div>

                    {/* Feature highlights */}
                    <div className="space-y-1 pt-2 text-[11px] text-slate-300">
                      {item.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Booking */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Estimated Rate:</span>
                      <span className="text-sm font-bold text-amber-300 font-serif-royal">
                        ₹{item.minRate} – ₹{item.maxRate} <span className="text-[11px] font-sans text-slate-400 font-normal">/ {item.unit}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenDesign(item)}
                        className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Specs
                      </button>
                      <button
                        onClick={() => handleBookDesign(item.code)}
                        className="py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black text-xs font-bold flex items-center justify-center gap-1 transition shadow-md"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Book This
                      </button>
                    </div>

                    <button
                      onClick={() => toggleComparisonDesign(item.id)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                        isCompared 
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/40' 
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-amber-500/30'
                      }`}
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isCompared ? 'Remove from Comparison' : '+ Compare with Other Designs'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suitable Locations Detailed Matrix */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="font-serif-royal text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" /> Ideal Spaces for {currentService.name}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
          {currentService.suitableLocations.map((loc, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{loc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
