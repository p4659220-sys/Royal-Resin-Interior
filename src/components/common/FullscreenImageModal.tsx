import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MessageSquare, 
  Download, 
  Maximize, 
  Minimize, 
  Sparkles, 
  Tag, 
  ArrowLeftRight,
  Check,
  Share2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const FullscreenImageModal: React.FC = () => {
  const { 
    fullscreenImage, 
    closeFullscreenImage, 
    setFullscreenImageIndex,
    nextFullscreenImage,
    prevFullscreenImage,
    setIsBookVisitModalOpen,
    setPreselectedDesignCode,
    setSelectedDesignForModal,
    comparisonDesignIds,
    toggleComparisonDesign,
    companyInfo,
    addToast
  } = useStore();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  // Reset zoom on image change
  useEffect(() => {
    setZoomLevel(1);
  }, [fullscreenImage?.url]);

  // Keyboard navigation & shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!fullscreenImage) return;

    if (e.key === 'Escape') {
      closeFullscreenImage();
    } else if (e.key === 'ArrowRight') {
      nextFullscreenImage();
    } else if (e.key === 'ArrowLeft') {
      prevFullscreenImage();
    } else if (e.key === '+' || e.key === '=') {
      setZoomLevel(z => Math.min(3, z + 0.25));
    } else if (e.key === '-') {
      setZoomLevel(z => Math.max(0.75, z - 0.25));
    } else if (e.key === '0') {
      setZoomLevel(1);
    }
  }, [fullscreenImage, closeFullscreenImage, nextFullscreenImage, prevFullscreenImage]);

  useEffect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenImage, handleKeyDown]);

  if (!fullscreenImage) return null;

  const { 
    url, 
    title, 
    subtitle, 
    code, 
    category, 
    minRate, 
    maxRate, 
    unit = 'sq.ft.', 
    designItem, 
    allImages = [], 
    currentIndex = 0 
  } = fullscreenImage;

  const hasMultipleImages = allImages.length > 1;
  const isCompared = designItem ? comparisonDesignIds.includes(designItem.id) : false;

  const handleZoomIn = () => setZoomLevel(z => Math.min(3, Number((z + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoomLevel(z => Math.max(0.75, Number((z - 0.25).toFixed(2))));
  const handleResetZoom = () => setZoomLevel(1);

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsBrowserFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsBrowserFullscreen(false)).catch(() => {});
    }
  };

  const handleBookVisit = () => {
    if (code) {
      setPreselectedDesignCode(code);
    }
    closeFullscreenImage();
    setIsBookVisitModalOpen(true);
  };

  const handleOpenFullDetails = () => {
    if (designItem) {
      closeFullscreenImage();
      setSelectedDesignForModal(designItem);
    }
  };

  const handleWhatsAppInquiry = () => {
    const rawNumber = (companyInfo.whatsapp || companyInfo.phone || '919876543210').replace(/[^0-9]/g, '');
    const textMsg = encodeURIComponent(
      `Hello Royal Resin Interiors! I am interested in design: ${code ? `[${code}] ` : ''}${title || 'Epoxy Design'}. Could you please provide estimate and site visit details?`
    );
    window.open(`https://wa.me/${rawNumber}?text=${textMsg}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Royal Resin Design',
          text: `Check out this luxury epoxy design by Royal Resin Interiors: ${title}`,
          url: window.location.href
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('success', 'Link Copied', 'Page link copied to clipboard.');
    }
  };

  return (
    <div 
      id="fullscreen-image-viewer"
      className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-2xl text-slate-100 select-none animate-in fade-in duration-200"
      onClick={() => closeFullscreenImage()}
    >
      {/* Top Controls Header Bar */}
      <div 
        className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-black/90 via-black/70 to-transparent border-b border-amber-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Design Info */}
        <div className="flex items-center gap-3 min-w-0">
          {code && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500 text-black font-extrabold text-xs shadow-md shrink-0">
              {code}
            </span>
          )}
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white truncate flex items-center gap-2">
              <span>{title || 'High-Resolution Visual'}</span>
              {category && (
                <span className="hidden sm:inline-block text-[11px] font-medium text-amber-400/90 uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                  {category.replace('-', ' ')}
                </span>
              )}
            </h2>
            {subtitle && (
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Zoom & Action Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-900/90 border border-slate-700/80 rounded-xl p-1 gap-1 text-slate-300">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.75}
              className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 transition"
              title="Zoom Out (-)"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1.5 text-amber-400 font-bold min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 transition"
              title="Zoom In (+)"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-amber-400 transition"
                title="Reset Zoom (0)"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Fullscreen browser toggle */}
          <button
            onClick={toggleBrowserFullscreen}
            className="hidden sm:flex p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition"
            title="Toggle Browser Fullscreen"
            aria-label="Toggle fullscreen"
          >
            {isBrowserFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition"
            title="Share Image"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Download Original */}
          <a
            href={url}
            download={`${code || 'royal-resin'}-hd-design.jpg`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition"
            title="Open / Download HD Image"
            aria-label="Download HD image"
          >
            <Download className="w-4 h-4" />
          </a>

          {/* Close Button */}
          <button
            onClick={closeFullscreenImage}
            className="p-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/40 transition ml-1"
            title="Close (Esc)"
            aria-label="Close fullscreen view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeFullscreenImage();
          }
        }}
      >
        {/* Navigation Arrows for Multi-image Galleries */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevFullscreenImage();
              }}
              className="absolute left-3 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white border border-white/20 shadow-2xl transition-all duration-200 group"
              title="Previous Image (Left Arrow)"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextFullscreenImage();
              }}
              className="absolute right-3 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white border border-white/20 shadow-2xl transition-all duration-200 group"
              title="Next Image (Right Arrow)"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </>
        )}

        {/* Central Display Image */}
        <div 
          className="relative max-w-full max-h-full flex items-center justify-center overflow-auto transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={url || undefined}
            alt={title || 'Royal Resin Floor Full View'}
            className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-amber-500/20"
            draggable={false}
          />
        </div>

        {/* Counter Badge if multiple images */}
        {hasMultipleImages && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold backdrop-blur-md shadow-lg pointer-events-none">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Bottom Floating Bar: Thumbnails & Quick Actions */}
      <div 
        className="relative z-20 px-4 sm:px-8 py-3 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnails Tray */}
        {hasMultipleImages ? (
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full sm:max-w-md">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setFullscreenImageIndex(idx)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  currentIndex === idx 
                    ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30' 
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img || undefined} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Ultra HD 4K Quality Architecture Finish</span>
            {minRate && maxRate && (
              <span className="text-amber-300 font-semibold ml-2">
                Rate: ₹{minRate} – ₹{maxRate} / {unit}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {designItem && (
            <button
              onClick={() => toggleComparisonDesign(designItem.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                isCompared 
                  ? 'bg-amber-500 text-black border-amber-400' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              {isCompared ? <Check className="w-3.5 h-3.5" /> : <ArrowLeftRight className="w-3.5 h-3.5" />}
              <span>{isCompared ? 'In Compare' : 'Compare'}</span>
            </button>
          )}

          {designItem && (
            <button
              onClick={handleOpenFullDetails}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition hidden sm:inline-flex items-center gap-1.5"
            >
              Full Specs
            </button>
          )}

          <button
            onClick={handleWhatsAppInquiry}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleBookVisit}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Site Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
