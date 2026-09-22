import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal, Maximize2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before (Aging Tiles)',
  afterLabel = 'After (Royal Resin Finish)',
  title,
  subtitle,
  className = ''
}) => {
  const { openFullscreenImage } = useStore();
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleOpenFullscreenAfter = (e: React.MouseEvent) => {
    e.stopPropagation();
    openFullscreenImage({
      url: afterImage,
      title: title ? `${title} (Finished Surface)` : 'After: Royal Resin Finish',
      subtitle: subtitle || 'Seamless mirror-gloss luxury epoxy coating',
      allImages: [afterImage, beforeImage],
      currentIndex: 0
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif-royal font-bold text-slate-100 text-base sm:text-lg">{title}</h4>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
              <MoveHorizontal className="w-3 h-3" /> Drag Slider
            </span>
            <button
              onClick={handleOpenFullscreenAfter}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] flex items-center gap-1 transition"
              title="View in Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl border border-amber-500/30 select-none cursor-ew-resize bg-slate-950 shadow-xl"
      >
        {/* After Image (Background full width) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={handleOpenFullscreenAfter}
            className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg backdrop-blur-sm flex items-center gap-1 transition"
          >
            <Maximize2 className="w-3 h-3" />
            <span>{afterLabel}</span>
          </button>
        </div>

        {/* Before Image (Clipped by slider position) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-y-0 left-0 h-full max-w-none object-cover"
            style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-slate-900/90 text-slate-200 font-semibold text-xs border border-slate-700 backdrop-blur-sm">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute inset-y-0 z-20 w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Draggable Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-white flex items-center justify-center text-black shadow-2xl cursor-grab active:cursor-grabbing">
            <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};

