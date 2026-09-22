import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Palette, 
  Shield, 
  Award, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  Eye, 
  Calculator, 
  PhoneCall, 
  MessageSquare,
  Building,
  Home,
  Bath,
  Utensils,
  Briefcase,
  Hotel,
  Car,
  ArrowLeftRight,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';
import { ClientTestimonials } from '../../components/common/ClientTestimonials';
import { DesignItem, ServiceCategoryType } from '../../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { 
    homeContent, 
    categories, 
    designs, 
    projects, 
    reviews, 
    services,
    companyInfo, 
    setIsBookVisitModalOpen, 
    setIsEnquiryModalOpen,
    setSelectedDesignForModal,
    setPreselectedDesignCode,
    comparisonDesignIds,
    toggleComparisonDesign,
    setIsCompareModalOpen,
    openFullscreenImage
  } = useStore();

  const [selectedSpace, setSelectedSpace] = useState<string>('Living Room');

  const spacesList = [
    { name: 'Living Room', icon: Home, query: 'Living Room' },
    { name: 'Bedroom', icon: Building, query: 'Bedroom' },
    { name: 'Bathroom', icon: Bath, query: 'Bathroom' },
    { name: 'Kitchen', icon: Utensils, query: 'Kitchen' },
    { name: 'Lobby', icon: Hotel, query: 'Lobby' },
    { name: 'Showroom', icon: Eye, query: 'Showroom' },
    { name: 'Office', icon: Briefcase, query: 'Office' },
    { name: 'Hotel', icon: Hotel, query: 'Hotel' },
    { name: 'Garage', icon: Car, query: 'Garage' },
    { name: 'Industrial', icon: Shield, query: 'Industrial' },
  ];

  const featuredDesigns = designs.filter(d => d.isFeatured && d.isPublished);

  // Filter designs by current space selection
  const designsForSpace = designs.filter(d => 
    d.suitableLocations.some(loc => loc.toLowerCase().includes(selectedSpace.toLowerCase()))
  ).slice(0, 4);

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

  const sampleProject = projects[0] || {
    beforeImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    name: 'Salt Lake Penthouse Transformation',
    area: '1,850 sq.ft.',
    location: 'Salt Lake Sector V, Kolkata'
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* SECTION 1 — HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-6 sm:pt-10">
        {/* Background ambient lighting and luxury image backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={homeContent.heroImage || undefined}
            alt="Royal Resin Interior Masterpiece"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/85 to-[#0b0f17]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.25),rgba(255,255,255,0))]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{homeContent.heroBadge}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="font-serif-royal text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight sm:leading-none drop-shadow-2xl">
              {homeContent.heroTitle}
            </h1>
            <div className="font-serif-royal text-2xl sm:text-4xl md:text-5xl font-bold metallic-text-gradient">
              {homeContent.heroHighlight}
            </div>
          </div>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed">
            {homeContent.heroSubtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('gallery')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              <Eye className="w-5 h-5" />
              <span>{homeContent.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsBookVisitModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-500/40 text-sm sm:text-base font-bold shadow-lg backdrop-blur-sm flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>{homeContent.ctaSecondaryText}</span>
            </button>
          </div>

          {/* Micro trust highlights */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg font-serif-royal">100%</div>
              <div className="text-xs text-slate-300">Seamless Monolithic Glass Surface</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg font-serif-royal">0 Tile Joints</div>
              <div className="text-xs text-slate-300">No Grout Lines, 100% Stain-Proof</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg font-serif-royal">Diamond Tough</div>
              <div className="text-xs text-slate-300">High Footfall & Anti-Scratch Finish</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg font-serif-royal">Free Visit</div>
              <div className="text-xs text-slate-300">Touch & Feel Real Samples On-Site</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT WE CREATE (6 Large Visual Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Bespoke Surface Masterpieces
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What We Create
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            From seamless Italian liquid marble to hyper-realistic 3D optical floors and illuminated geode walls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.slice(0, 6).map((cat) => {
            const serviceSlugMap: Record<string, string> = {
              'metallic-marble': 'service-metallic-marble',
              '2d-flooring': 'service-2d-flooring',
              '3d-flooring': 'service-3d-flooring',
              'wall-art': 'service-wall-art',
              'staircase': 'service-staircase',
              'ceiling': 'service-ceiling',
              'commercial-industrial': 'service-commercial-industrial'
            };

            const targetPage = serviceSlugMap[cat.slug] || 'services';

            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(targetPage)}
                className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-400/80 transition-all duration-500 cursor-pointer shadow-xl bg-slate-950 flex flex-col justify-end p-6"
              >
                <img
                  src={cat.image || undefined}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/40 transition-colors" />

                {cat.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/90 text-black font-bold text-xs shadow-md">
                    {cat.badge}
                  </div>
                )}

                <div className="relative z-10 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif-royal text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {cat.shortDesc}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-400">
                    <span>Explore Catalogue & Rates</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 — FEATURED DESIGNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Signature Collection
            </div>
            <h2 className="font-serif-royal text-3xl sm:text-4xl font-bold text-white mt-1">
              Featured Designs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Our most celebrated liquid marble, optical illusion, and crystal geode designs.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-semibold self-start sm:self-auto transition"
          >
            <span>View Full Design Catalogue ({designs.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesigns.slice(0, 4).map((item) => {
            const isCompared = comparisonDesignIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`group bg-[#0f172a] rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl flex flex-col justify-between ${
                  isCompared 
                    ? 'border-amber-400 ring-2 ring-amber-500/40 bg-amber-950/10' 
                    : 'border-amber-500/20 hover:border-amber-400'
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
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-500 text-black font-extrabold text-xs shadow-md">
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
                    <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-xl">
                      <Eye className="w-3.5 h-3.5" /> Full Page HD View
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => handleOpenDesign(item)}
                      className="font-serif-royal font-bold text-lg text-white hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Estimated Rate:</span>
                      <span className="text-xs font-bold text-amber-300">
                        ₹{item.minRate}–₹{item.maxRate} / {item.unit}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenDesign(item)}
                        className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleBookDesign(item.code)}
                        className="py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-xs font-bold text-center transition hover:opacity-90"
                      >
                        Book Visit
                      </button>
                    </div>

                    <button
                      onClick={() => toggleComparisonDesign(item.id)}
                      className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition border ${
                        isCompared 
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/40' 
                          : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                      }`}
                    >
                      <ArrowLeftRight className="w-3 h-3 text-amber-400" />
                      <span>{isCompared ? 'In Compare Tray' : '+ Compare'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — WHY ROYAL RESIN INTERIOR */}
      <section className="relative py-16 bg-gradient-to-b from-[#090d15] to-[#0d131f] border-y border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Engineered for Perfection
            </div>
            <h2 className="font-serif-royal text-3xl sm:text-4xl font-bold text-white">
              Why Royal Resin Interior
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              We combine artisan craftsmanship with certified European industrial polymers to deliver flawless surfaces that outlast conventional marble and tiles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeContent.whyChooseUs.map((feat, idx) => {
              const iconMap: Record<string, any> = {
                Sparkles: Sparkles,
                Palette: Palette,
                ShieldCheck: ShieldCheck,
                Shield: Shield,
                Award: Award,
                Clock: Clock
              };
              const IconComponent = iconMap[feat.iconName] || Sparkles;

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-royal text-lg font-bold text-slate-100">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — DESIGN BY SPACE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Tailored Applications
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl font-bold text-white">
            Design by Space
          </h2>
          <p className="text-sm text-slate-400">
            Select your room or commercial space to view ideal recommended finishes.
          </p>
        </div>

        {/* Space Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 justify-start lg:justify-center scrollbar-none">
          {spacesList.map((space) => {
            const Icon = space.icon;
            const isSelected = selectedSpace === space.name;
            return (
              <button
                key={space.name}
                onClick={() => setSelectedSpace(space.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/30 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{space.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filtered Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designsForSpace.map((item) => (
            <div
              key={item.id}
              className="bg-[#0f172a] rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-400 transition-all p-4 space-y-3 flex flex-col justify-between"
            >
              <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => handleOpenFullscreen(item)}
                title="Click for Full Page / Fullscreen View"
              >
                <img src={item.mainImage || undefined} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-black font-bold text-[11px]">
                  {item.code}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-black font-bold text-[11px] flex items-center gap-1 shadow-lg">
                    <Eye className="w-3 h-3" /> Full View
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-serif-royal font-bold text-white text-base">
                  {item.name}
                </h4>
                <div className="text-[11px] text-amber-300 mt-1 font-semibold">
                  ₹{item.minRate}–₹{item.maxRate} / {item.unit}
                </div>
              </div>

              <button
                onClick={() => handleBookDesign(item.code)}
                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-xs font-semibold text-slate-200 transition"
              >
                Book for {selectedSpace}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — BEFORE / AFTER REAL TRANSFORMATION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Real Site Results
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl font-bold text-white">
            Before & After Transformation
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            See how our dust-free resin process converts damaged ceramic floors into mirror-gloss Italian marble without breaking a single tile.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/60 border border-amber-500/30 backdrop-blur-md space-y-4 shadow-2xl">
          <BeforeAfterSlider
            beforeImage={sampleProject.beforeImage}
            afterImage={sampleProject.afterImage}
            title={sampleProject.name}
            subtitle={`${sampleProject.area} • ${sampleProject.location}`}
          />

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> No demolition dust
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Direct tile bonding
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> 4 Days execution
              </span>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Explore More Completed Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — HOW IT WORKS (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Transparent Execution
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl font-bold text-white">
            How It Works
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            A seamless 5-step journey from design selection to flawless mirror finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 relative">
          {homeContent.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 hover:border-amber-400/60 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="font-serif-royal text-3xl font-extrabold text-amber-400/40">
                  {step.step}
                </div>
                <h3 className="font-serif-royal font-bold text-base text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < homeContent.processSteps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-amber-500/60">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8 — ESTIMATED PRICING PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-[#0b0f17] border border-amber-500/40 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Transparent Rate Guide
              </div>
              <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white mt-1">
                Estimated Pricing Snapshot
              </h2>
            </div>

            <button
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs sm:text-sm shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Full Cost Calculator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0, 3).map((svc) => (
              <div key={svc.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">{svc.name}</div>
                <div className="text-2xl font-serif-royal font-bold text-amber-300">
                  ₹{svc.minRate} – ₹{svc.maxRate} <span className="text-xs font-sans text-slate-400 font-normal">/ {svc.unit}</span>
                </div>
                <p className="text-[11px] text-slate-400">{svc.tagline || 'Premium high-gloss finish'}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/20 text-xs text-slate-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Important Note:</strong> Final cost depends on total square footage, substrate moisture condition, selected artwork complexity, and topcoat specifications. Free measurement during site visit.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 9 — CLIENT TESTIMONIALS (FETCHED FROM CLOUD FIRESTORE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientTestimonials 
          title="What Our Clients Say"
          subtitle="Honest reviews & verified experiences from villa owners, luxury apartment dwellers, and commercial spaces across Kolkata & Bengal."
          showWriteReviewButton={true}
          maxInitialDisplay={6}
        />
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 p-8 sm:p-14 text-center text-black space-y-6 shadow-2xl">
          <div className="relative z-10 space-y-3">
            <h2 className="font-serif-royal text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              {homeContent.finalCtaTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-900 font-medium max-w-2xl mx-auto">
              {homeContent.finalCtaSubtitle}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsBookVisitModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black hover:bg-slate-900 text-amber-400 font-extrabold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Site Visit</span>
            </button>

            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/90 hover:bg-white text-black font-extrabold text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Enquiry</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
