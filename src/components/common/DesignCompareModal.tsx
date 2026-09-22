import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowLeftRight, 
  Calendar, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Eye, 
  Maximize2, 
  Layers, 
  SlidersHorizontal,
  DollarSign,
  MapPin,
  CheckCircle2,
  Copy,
  Search,
  CheckSquare,
  Square,
  Grid,
  Table as TableIcon,
  HelpCircle,
  Clock,
  Droplets,
  Flame,
  Award
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DesignItem, ServiceCategoryType } from '../../types';

export const DesignCompareModal: React.FC = () => {
  const { 
    designs,
    comparisonDesignIds, 
    removeFromComparison, 
    addToComparison,
    toggleComparisonDesign,
    clearComparison,
    isCompareModalOpen, 
    setIsCompareModalOpen,
    setSelectedDesignForModal,
    setIsBookVisitModalOpen,
    setPreselectedDesignCode,
    companyInfo,
    addToast
  } = useStore();

  const [compareArea, setCompareArea] = useState<number>(500);
  const [highlightDiffs, setHighlightDiffs] = useState<boolean>(false);
  const [selectedSpaceFilter, setSelectedSpaceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'matrix' | 'table'>('matrix');
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filtered designs for multi-selection drawer/picker
  const pickerDesigns = useMemo(() => {
    return designs.filter(d => {
      if (!d.isPublished) return false;
      const matchCat = categoryFilter === 'all' || d.category === categoryFilter;
      const matchSearch = searchQuery.trim() === '' || 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.suitableLocations.some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (d.subType && d.subType.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [designs, categoryFilter, searchQuery]);

  const comparedDesigns = useMemo(() => {
    return comparisonDesignIds
      .map(id => designs.find(d => d.id === id))
      .filter((d): d is DesignItem => d !== undefined);
  }, [comparisonDesignIds, designs]);

  // Difference detection helpers
  const hasRateDiff = useMemo(() => {
    if (comparedDesigns.length < 2) return false;
    const first = `${comparedDesigns[0].minRate}-${comparedDesigns[0].maxRate}`;
    return comparedDesigns.some(d => `${d.minRate}-${d.maxRate}` !== first);
  }, [comparedDesigns]);

  const hasCategoryDiff = useMemo(() => {
    if (comparedDesigns.length < 2) return false;
    const first = comparedDesigns[0].category;
    return comparedDesigns.some(d => d.category !== first);
  }, [comparedDesigns]);

  const hasSubTypeDiff = useMemo(() => {
    if (comparedDesigns.length < 2) return false;
    const first = comparedDesigns[0].subType;
    return comparedDesigns.some(d => d.subType !== first);
  }, [comparedDesigns]);

  if (!isCompareModalOpen) return null;

  const spacesList = [
    { id: 'all', label: 'All Spaces' },
    { id: 'Living Room', label: 'Living Room' },
    { id: 'Bedroom', label: 'Bedroom' },
    { id: 'Hotel Lobby', label: 'Hotel Lobby & Reception' },
    { id: 'Bathroom', label: 'Bathroom / Wet Area' },
    { id: 'Kitchen', label: 'Kitchen & Dining' },
    { id: 'Staircase', label: 'Staircase' },
    { id: 'Commercial', label: 'Commercial Showroom' },
    { id: 'Ceiling', label: 'Ceiling / Feature Wall' },
  ];

  const categoriesList: { id: string; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'metallic-marble', label: 'Metallic Marble' },
    { id: '3d-flooring', label: '3D Flooring' },
    { id: '2d-flooring', label: '2D Flooring' },
    { id: 'wall-art', label: 'Wall Art' },
    { id: 'staircase', label: 'Staircase' },
    { id: 'ceiling', label: 'Ceiling' },
    { id: 'commercial-industrial', label: 'Commercial' },
  ];

  const handleBookDesign = (code: string) => {
    setPreselectedDesignCode(code);
    setIsCompareModalOpen(false);
    setIsBookVisitModalOpen(true);
  };

  const handleViewSpecs = (design: DesignItem) => {
    setSelectedDesignForModal(design);
  };

  const copyComparisonSummary = () => {
    if (comparedDesigns.length === 0) return;
    const text = `*Royal Resin Interior - Design Comparison Report*\n\n` +
      comparedDesigns.map(d => 
        `✨ *${d.code} - ${d.name}*\n` +
        `• Category: ${d.category} (${d.subType || 'Resin'})\n` +
        `• Estimated Rate: ₹${d.minRate} - ₹${d.maxRate} / ${d.unit}\n` +
        `• Estimated Cost for ${compareArea} ${d.unit}: ₹${(d.minRate * compareArea).toLocaleString('en-IN')} - ₹${(d.maxRate * compareArea).toLocaleString('en-IN')}\n` +
        `• Ideal Spaces: ${d.suitableLocations.join(', ')}\n` +
        `• Top Features: ${d.features.slice(0, 3).join('; ')}\n`
      ).join('\n---\n\n') +
      `\n📞 Contact Royal Resin: ${companyInfo.phone} | WhatsApp: ${companyInfo.whatsapp}\n🌐 www.royalresininterior.com`;

    navigator.clipboard.writeText(text);
    addToast('success', 'Comparison Copied!', 'Comparison breakdown copied to clipboard. You can paste and share it anywhere.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0b101b] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-amber-500/20 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-royal text-xl sm:text-2xl font-bold text-white">
                  Side-by-Side Design Comparison
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  {comparedDesigns.length}/4 Selected
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Compare features, estimated pricing brackets, and suitability for specific room spaces
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 self-end sm:self-auto">
            {/* Multi-Selection Drawer Toggle */}
            <button
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
                isPickerOpen
                  ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/25'
                  : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/40 hover:border-amber-400'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isPickerOpen ? 'Close Design Selector' : '+ Select / Swap Designs'}</span>
            </button>

            {comparedDesigns.length > 0 && (
              <>
                <button
                  onClick={copyComparisonSummary}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                  title="Copy comparison summary to clipboard"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Share Report</span>
                </button>

                <button
                  onClick={clearComparison}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-500/40 text-xs font-semibold transition"
                >
                  Clear All
                </button>
              </>
            )}

            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-Design Selection Panel (Collapsible Drawer) */}
        {isPickerOpen && (
          <div className="p-4 bg-[#0d1527] border-b border-amber-500/30 animate-in slide-in-from-top-3 duration-200 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <CheckSquare className="w-4 h-4" /> Select up to 4 Designs:
                </span>
                <span className="text-xs text-slate-400">
                  (Click any card or checkbox to add/remove)
                </span>
              </div>

              {/* Search & Category Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, code, space..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-44 sm:w-56"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 focus:outline-none focus:border-amber-400"
                >
                  {categoriesList.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Design Quick Grid Picker */}
            <div className="max-h-56 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {pickerDesigns.map((d) => {
                const isSelected = comparisonDesignIds.includes(d.id);
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      if (isSelected) {
                        removeFromComparison(d.id);
                      } else {
                        if (comparisonDesignIds.length >= 4) {
                          addToast('warning', 'Limit Reached', 'You can compare a maximum of 4 designs simultaneously. Remove one first.');
                          return;
                        }
                        addToComparison(d.id);
                      }
                    }}
                    className={`p-2 rounded-xl border cursor-pointer transition flex flex-col justify-between relative group ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-500/40'
                        : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 mb-1.5">
                      <img src={d.mainImage} alt={d.name} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-500 text-black font-extrabold text-[9px]">
                        {d.code}
                      </div>
                      <div className="absolute top-1 right-1">
                        {isSelected ? (
                          <div className="w-4 h-4 rounded bg-amber-500 text-black flex items-center justify-center font-bold text-[10px]">
                            <Check className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded bg-black/60 border border-slate-600 group-hover:border-amber-400" />
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-[11px] text-white truncate group-hover:text-amber-300">
                        {d.name}
                      </h5>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 mt-0.5">
                        <span className="truncate">{d.category.replace('-', ' ')}</span>
                        <span className="text-amber-300 font-bold">₹{d.minRate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Controls Bar: Area Estimator, Space Suitability Filter & View Mode */}
        <div className="p-3 sm:p-4 bg-[#0d1424] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs shrink-0">
          {/* Estimated Room Area Slider / Input */}
          <div className="flex items-center gap-2.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Room Area:</span>
            </span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="50"
                max="10000"
                step="50"
                value={compareArea}
                onChange={(e) => setCompareArea(Math.max(10, Number(e.target.value) || 0))}
                className="w-16 px-1.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 font-bold text-center focus:outline-none focus:border-amber-400 text-xs"
              />
              <span className="text-slate-400">sq.ft.</span>
            </div>
            {/* Quick area chips */}
            <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-slate-800">
              {[200, 500, 800, 1200, 2000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCompareArea(preset)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                    compareArea === preset
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Space Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Room:</span>
            </span>
            <select
              value={selectedSpaceFilter}
              onChange={(e) => setSelectedSpaceFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {spacesList.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode & Difference Highlighting Toggle */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'matrix' 
                    ? 'bg-amber-500 text-black font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Matrix Card View"
              >
                <Grid className="w-3 h-3" />
                <span>Visual Matrix</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'table' 
                    ? 'bg-amber-500 text-black font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Dense Spec Table View"
              >
                <TableIcon className="w-3 h-3" />
                <span>Dense Table</span>
              </button>
            </div>

            {comparedDesigns.length > 1 && (
              <button
                onClick={() => setHighlightDiffs(!highlightDiffs)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                  highlightDiffs 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Highlight Diff</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6 space-y-6">
          {comparedDesigns.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 px-4 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                <ArrowLeftRight className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="font-serif-royal text-2xl font-bold text-white">
                No Designs in Comparison Tray
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click <strong>"+ Select / Swap Designs"</strong> above or browse our gallery to pick up to 4 designs to compare features, prices, and space suitability side-by-side.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsPickerOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  Open Design Selector (+4 Available)
                </button>
              </div>
            </div>
          ) : viewMode === 'table' ? (
            /* DENSE STRUCTURED TABLE VIEW */
            <div className="min-w-[750px] bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-amber-500/20">
                    <th className="p-4 w-48 font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                      Comparison Factor
                    </th>
                    {comparedDesigns.map((d) => (
                      <th key={d.id} className="p-4 font-serif-royal text-white border-l border-slate-800 min-w-[200px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold truncate">{d.name}</span>
                          <button
                            onClick={() => removeFromComparison(d.id)}
                            className="p-1 rounded-full text-slate-400 hover:text-red-400 hover:bg-slate-800"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-amber-400 font-sans font-bold">
                          Code: {d.code} • {d.category.replace('-', ' ')}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {/* Preview Image Row */}
                  <tr className="bg-slate-950/40">
                    <td className="p-4 font-semibold text-slate-300">Design Visual</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800">
                        <div 
                          onClick={() => handleViewSpecs(d)}
                          className="w-28 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 cursor-pointer group relative"
                        >
                          <img src={d.mainImage} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-4 h-4 text-amber-300" />
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Base Rate */}
                  <tr className={highlightDiffs && hasRateDiff ? 'bg-amber-500/10' : ''}>
                    <td className="p-4 font-semibold text-slate-300">
                      <div>Base Rate Range</div>
                      <div className="text-[10px] text-slate-500 font-normal">Per {comparedDesigns[0]?.unit}</div>
                    </td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800 font-serif-royal font-bold text-base text-amber-300">
                        ₹{d.minRate} – ₹{d.maxRate} <span className="font-sans text-[10px] font-normal text-slate-400">/{d.unit}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Calculated Project Total */}
                  <tr className="bg-amber-950/20">
                    <td className="p-4 font-semibold text-amber-400">
                      <div>Estimated Cost</div>
                      <div className="text-[10px] text-slate-400 font-normal">For {compareArea} sq.ft.</div>
                    </td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800 font-serif-royal font-extrabold text-base text-amber-200">
                        ₹{(d.minRate * compareArea).toLocaleString('en-IN')} – ₹{(d.maxRate * compareArea).toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>

                  {/* Style & Visual Finish */}
                  <tr className={highlightDiffs && hasSubTypeDiff ? 'bg-amber-500/10' : ''}>
                    <td className="p-4 font-semibold text-slate-300">Finish & Aesthetics</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-bold text-[11px]">
                          {d.subType || 'Metallic'} Finish
                        </span>
                        <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                          {d.description}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Suitability for Specific Space Filter */}
                  {selectedSpaceFilter !== 'all' && (
                    <tr className="bg-emerald-950/30">
                      <td className="p-4 font-semibold text-emerald-300">
                        Suitability: {selectedSpaceFilter}
                      </td>
                      {comparedDesigns.map((d) => {
                        const isMatch = d.suitableLocations.some(l => l.toLowerCase().includes(selectedSpaceFilter.toLowerCase()));
                        return (
                          <td key={d.id} className="p-4 border-l border-slate-800">
                            {isMatch ? (
                              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Highly Recommended</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                                <AlertCircle className="w-4 h-4 text-amber-400" />
                                <span>Compatible with Sealant</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  )}

                  {/* Recommended Space Locations */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-300">Suitable Locations</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800">
                        <div className="flex flex-wrap gap-1">
                          {d.suitableLocations.map((loc, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-[10px] text-slate-300">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Key Features */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-300">Key Features</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800 space-y-1">
                        {d.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-1 text-[11px] text-slate-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Technical Standards */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-300">Durability & Scratch Coat</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800 text-slate-200">
                        <div className="font-semibold text-white">9H Diamond Topcoat</div>
                        <div className="text-[10px] text-slate-400">Heavy Foot Traffic & Impact Resistant</div>
                      </td>
                    ))}
                  </tr>

                  {/* Waterproof & Joints */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-300">Seamless Joints & Moisture</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800 text-slate-200">
                        <div className="text-emerald-300 font-semibold">100% Waterproof (0 Joints)</div>
                        <div className="text-[10px] text-slate-400">Zero mold or bacteria harboring</div>
                      </td>
                    ))}
                  </tr>

                  {/* Warranty & Timeline */}
                  <tr>
                    <td className="p-4 font-semibold text-slate-300">Warranty & Curing</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800 text-slate-200">
                        <div className="text-amber-400 font-bold">10-Year Studio Warranty</div>
                        <div className="text-[10px] text-slate-400">3–5 Days Turnaround</div>
                      </td>
                    ))}
                  </tr>

                  {/* Action Buttons Row */}
                  <tr className="bg-slate-950">
                    <td className="p-4 font-semibold text-slate-300">Instant Booking</td>
                    {comparedDesigns.map((d) => (
                      <td key={d.id} className="p-4 border-l border-slate-800 space-y-2">
                        <button
                          onClick={() => handleBookDesign(d.code)}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book {d.code}</span>
                        </button>
                        <a
                          href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Royal%20Resin%2C%20I%20am%20comparing%20design%20${d.code}%20(${d.name})%20for%20a%20${compareArea}%20sq.ft.%20area.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 px-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center justify-center gap-1 transition"
                        >
                          <MessageSquare className="w-3 h-3" /> WhatsApp
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            /* SIDE-BY-SIDE MATRIX CARDS VIEW */
            <div className="min-w-[700px] space-y-4">
              {/* Columns Header */}
              <div className={`grid gap-4 ${
                comparedDesigns.length === 1 ? 'grid-cols-2' :
                comparedDesigns.length === 2 ? 'grid-cols-2' :
                comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
                {comparedDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between space-y-3 relative group shadow-xl"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromComparison(design.id)}
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/70 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-700 transition"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Image Preview */}
                    <div 
                      onClick={() => handleViewSpecs(design)}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer group-hover:border-amber-400/60 transition-colors"
                    >
                      <img 
                        src={design.mainImage} 
                        alt={design.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-amber-500 text-black font-extrabold text-xs shadow-md">
                        {design.code}
                      </div>
                      {design.subType && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 text-[10px] font-semibold border border-amber-500/30 backdrop-blur-sm">
                          {design.subType}
                        </div>
                      )}
                    </div>

                    {/* Title & Category */}
                    <div>
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block">
                        {design.category.replace('-', ' ')}
                      </span>
                      <h4 
                        onClick={() => handleViewSpecs(design)}
                        className="font-serif-royal font-bold text-base text-white hover:text-amber-300 transition cursor-pointer truncate"
                        title={design.name}
                      >
                        {design.name}
                      </h4>
                    </div>

                    {/* Quick booking CTA in header */}
                    <button
                      onClick={() => handleBookDesign(design.code)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Book {design.code}
                    </button>
                  </div>
                ))}

                {/* Add slot placeholder if fewer than 4 designs are selected */}
                {comparedDesigns.length < 4 && (
                  <div 
                    onClick={() => setIsPickerOpen(true)}
                    className="p-4 rounded-2xl bg-slate-950/60 border-2 border-dashed border-slate-800 hover:border-amber-500/40 cursor-pointer transition flex flex-col items-center justify-center text-center p-6 space-y-3 min-h-[220px] group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-serif-royal font-bold text-sm text-white group-hover:text-amber-300">
                        Add Another Design
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Compare up to 4 designs side-by-side
                      </p>
                    </div>
                    <span className="text-[10px] px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                      Click to Browse Studio
                    </span>
                  </div>
                )}
              </div>

              {/* SECTION: PRICING MATRIX */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400 font-serif-royal font-bold text-sm uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" />
                  <span>Estimated Pricing & Investment Bracket</span>
                </div>

                {/* Base Rate Row */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Base Rate per {comparedDesigns[0]?.unit || 'sq.ft.'}
                  </div>
                  <div className={`grid gap-4 ${
                    comparedDesigns.length === 1 ? 'grid-cols-2' :
                    comparedDesigns.length === 2 ? 'grid-cols-2' :
                    comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                  }`}>
                    {comparedDesigns.map((d) => (
                      <div 
                        key={d.id} 
                        className={`p-3 rounded-xl border ${
                          highlightDiffs && hasRateDiff
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      >
                        <div className="text-lg font-serif-royal font-bold text-amber-300">
                          ₹{d.minRate} – ₹{d.maxRate}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">
                          per {d.unit} (incl. surface prep & multi-coat resin)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calculated Total for Chosen Room Area */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Est. Total for {compareArea} sq.ft. Space:</span>
                    <span className="text-[10px] text-slate-400 font-normal">Based on user area input above</span>
                  </div>
                  <div className={`grid gap-4 ${
                    comparedDesigns.length === 1 ? 'grid-cols-2' :
                    comparedDesigns.length === 2 ? 'grid-cols-2' :
                    comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                  }`}>
                    {comparedDesigns.map((d) => {
                      const minTotal = d.minRate * compareArea;
                      const maxTotal = d.maxRate * compareArea;
                      return (
                        <div 
                          key={d.id} 
                          className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-500/40 shadow-inner space-y-1"
                        >
                          <div className="text-xl font-serif-royal font-extrabold text-amber-200">
                            ₹{minTotal.toLocaleString('en-IN')} – ₹{maxTotal.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-emerald-300 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Includes 10-Yr Warranty
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION: SPACE SUITABILITY MATRIX */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-serif-royal font-bold text-sm uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>Space & Room Suitability Matrix</span>
                  </div>
                  {selectedSpaceFilter !== 'all' && (
                    <span className="text-xs text-amber-300 font-semibold">
                      Evaluating suitability for: <span className="underline">{selectedSpaceFilter}</span>
                    </span>
                  )}
                </div>

                {/* Specific Space Target Evaluation */}
                {selectedSpaceFilter !== 'all' && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Suitability for {selectedSpaceFilter}:
                    </div>
                    <div className={`grid gap-4 ${
                      comparedDesigns.length === 1 ? 'grid-cols-2' :
                      comparedDesigns.length === 2 ? 'grid-cols-2' :
                      comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                    }`}>
                      {comparedDesigns.map((d) => {
                        const isDirectMatch = d.suitableLocations.some(l => 
                          l.toLowerCase().includes(selectedSpaceFilter.toLowerCase())
                        );

                        return (
                          <div 
                            key={d.id} 
                            className={`p-3 rounded-xl border flex items-start gap-2 ${
                              isDirectMatch 
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                                : 'bg-slate-950 border-slate-800 text-slate-300'
                            }`}
                          >
                            {isDirectMatch ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            )}
                            <div className="text-xs">
                              <div className="font-bold">
                                {isDirectMatch ? 'Highly Recommended' : 'Compatible with Sealant'}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {isDirectMatch 
                                  ? `Engineered for optimal performance & visual impact in ${selectedSpaceFilter}.` 
                                  : `Can be adapted for ${selectedSpaceFilter} with custom anti-scratch or matte topcoats.`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Complete Suitable Rooms List */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Recommended Application Zones:
                  </div>
                  <div className={`grid gap-4 ${
                    comparedDesigns.length === 1 ? 'grid-cols-2' :
                    comparedDesigns.length === 2 ? 'grid-cols-2' :
                    comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                  }`}>
                    {comparedDesigns.map((d) => (
                      <div key={d.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {d.suitableLocations.map((loc, idx) => {
                            const isFiltered = selectedSpaceFilter !== 'all' && loc.toLowerCase().includes(selectedSpaceFilter.toLowerCase());
                            return (
                              <span 
                                key={idx} 
                                className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                  isFiltered 
                                    ? 'bg-amber-500 text-black font-bold' 
                                    : 'bg-slate-900 border border-slate-700 text-amber-200'
                                }`}
                              >
                                {loc}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION: TECHNICAL SPECIFICATIONS & COMPARISON */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400 font-serif-royal font-bold text-sm uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Technical Specifications & Durability Ratings</span>
                </div>

                {/* Key Features List */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Features & Aesthetic Characteristics
                  </div>
                  <div className={`grid gap-4 ${
                    comparedDesigns.length === 1 ? 'grid-cols-2' :
                    comparedDesigns.length === 2 ? 'grid-cols-2' :
                    comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                  }`}>
                    {comparedDesigns.map((d) => (
                      <div key={d.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        {d.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Surface Reflection & Depth Type */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Visual Depth & Finish Type
                  </div>
                  <div className={`grid gap-4 ${
                    comparedDesigns.length === 1 ? 'grid-cols-2' :
                    comparedDesigns.length === 2 ? 'grid-cols-2' :
                    comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                  }`}>
                    {comparedDesigns.map((d) => (
                      <div 
                        key={d.id} 
                        className={`p-3 rounded-xl border text-xs ${
                          highlightDiffs && hasSubTypeDiff
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-white">
                          {d.subType || 'High-Gloss Metallic'} Finish
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {d.category === '3d-flooring' ? 'Hyper-realistic optical depth with high optical clarity topcoat' :
                           d.category === 'metallic-marble' ? 'Liquid metallic swirls mimicking Italian statuario & portoro marble' :
                           d.category === 'wall-art' ? 'Multi-layered crystal geode & gold leaf illumination' :
                           'Seamless monolithic glass reflection'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standard Specs Matrix (Scratch, Water, Turnaround, Warranty) */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Performance Standards:
                  </div>
                  <div className={`grid gap-4 ${
                    comparedDesigns.length === 1 ? 'grid-cols-2' :
                    comparedDesigns.length === 2 ? 'grid-cols-2' :
                    comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                  }`}>
                    {comparedDesigns.map((d) => (
                      <div key={d.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between border-b border-slate-800/80 pb-1">
                          <span className="text-slate-400">Scratch Resistance:</span>
                          <span className="font-semibold text-white">9H Diamond Coat</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/80 pb-1">
                          <span className="text-slate-400">Waterproof Rating:</span>
                          <span className="font-semibold text-emerald-300">100% Non-Porous</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/80 pb-1">
                          <span className="text-slate-400">Grout Lines:</span>
                          <span className="font-semibold text-amber-300">0 (Zero Joints)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/80 pb-1">
                          <span className="text-slate-400">Execution Time:</span>
                          <span className="font-semibold text-white">3 – 5 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Studio Warranty:</span>
                          <span className="font-semibold text-amber-400">10 Years</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className={`grid gap-4 pt-4 border-t border-slate-800 ${
                comparedDesigns.length === 1 ? 'grid-cols-2' :
                comparedDesigns.length === 2 ? 'grid-cols-2' :
                comparedDesigns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
                {comparedDesigns.map((d) => (
                  <div key={d.id} className="space-y-2">
                    <button
                      onClick={() => handleBookDesign(d.code)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition transform active:scale-95"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Site Visit for {d.code}</span>
                    </button>

                    <a
                      href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Royal%20Resin%2C%20I%20am%20comparing%20design%20${d.code}%20(${d.name})%20for%20a%20${compareArea}%20sq.ft.%20area.%20Please%20guide%20me.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Query
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Need personalized guidance? Our senior resin artisan conducts free on-site laser surveys.</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="text-amber-400 font-semibold hover:underline"
            >
              Direct Studio Line: {companyInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
