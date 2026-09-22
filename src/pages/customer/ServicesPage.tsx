import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Tag, 
  Layers,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ServiceCategoryType } from '../../types';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services, setIsBookVisitModalOpen, companyInfo } = useStore();

  const serviceSlugMap: Record<string, string> = {
    'metallic-marble': 'service-metallic-marble',
    '2d-flooring': 'service-2d-flooring',
    '3d-flooring': 'service-3d-flooring',
    'wall-art': 'service-wall-art',
    'staircase': 'service-staircase',
    'ceiling': 'service-ceiling',
    'commercial-industrial': 'service-commercial-industrial'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Full Service Master Catalog
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Our Luxury Services
        </h1>
        <p className="text-base text-slate-300 font-light leading-relaxed">
          From Italian metallic liquid marble and optical 3D perspective floors to illuminated quartz geode wall murals and live-edge timber staircases.
        </p>
      </div>

      {/* Services List in High Detail */}
      <div className="space-y-12">
        {services.map((srv, index) => {
          const targetPage = serviceSlugMap[srv.slug] || 'services';

          return (
            <div
              key={srv.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 shadow-2xl"
            >
              {/* Image side (5 cols) */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-amber-500/20 aspect-[4/3] bg-slate-950 group">
                <img
                  src={srv.mainImage || undefined}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-black font-bold text-xs shadow-md">
                  Category 0{index + 1}
                </div>
              </div>

              {/* Content side (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                    {srv.tagline}
                  </div>
                  <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white mt-1">
                    {srv.name}
                  </h2>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {srv.description}
                </p>

                {/* Features & Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  {srv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Rate & Actions */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-slate-400">Estimated Rate:</div>
                    <div className="text-xl font-serif-royal font-bold text-amber-300">
                      ₹{srv.minRate} – ₹{srv.maxRate} <span className="text-xs font-sans text-slate-400 font-normal">/ {srv.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate(targetPage)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition"
                    >
                      <span>View Category Designs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsBookVisitModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-amber-500/20"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-4">
        <h3 className="font-serif-royal text-2xl font-bold text-white">
          Have a Custom Architectural Plan?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          We work closely with interior designers, architects, and private luxury home builders for custom formulation and color matching.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Direct Chat
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-amber-500 text-black text-xs font-bold"
          >
            Contact Studio
          </button>
        </div>
      </div>
    </div>
  );
};
