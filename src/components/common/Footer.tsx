import React from 'react';
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  Lock, 
  ArrowUpRight,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { companyInfo, serviceAreas, categories } = useStore();

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a10] border-t border-amber-900/40 text-slate-400 pt-16 pb-24 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="font-serif-royal font-bold text-xl tracking-wider text-amber-200">
                  ROYAL RESIN INTERIOR
                </div>
                <div className="text-[10px] tracking-[0.2em] text-amber-400/80 uppercase font-semibold">
                  Luxury Floors & Wall Murals
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              We turn ordinary floors and vertical spaces into bespoke living art. Specializing in high-gloss Italian metallic marble resin, optical 3D flooring, crystal geode wall murals, and live-edge river staircase designs across Bengal and Eastern India.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Certified German Polymers
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" /> Zero Dust Surface Prep
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif-royal text-sm font-bold text-slate-100 uppercase tracking-wider text-amber-400">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-amber-400 transition flex items-center gap-1 text-amber-300/90 font-medium">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> 🎨 Design Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Before & After Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Pricing & Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Contact & Site Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="space-y-3">
            <h3 className="font-serif-royal text-sm font-bold text-slate-100 uppercase tracking-wider text-amber-400">
              Our Specialties
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('service-metallic-marble')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Metallic & Resin Marble
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-2d-flooring')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> 2D Moroccan & Inlay
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-3d-flooring')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> 3D Optical Illusion Floor
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-wall-art')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Crystal Geode Wall Murals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-staircase')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> River Wood & Glow Stairs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-ceiling')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Backlit Onyx Ceiling
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-commercial-industrial')} className="hover:text-amber-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500/50" /> Commercial & ESD Epoxy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="font-serif-royal text-sm font-bold text-slate-100 uppercase tracking-wider text-amber-400">
              Contact & Studio
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{companyInfo.businessHours}</span>
              </div>
            </div>

            {/* Service Coverage badges */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-300 mb-1">Serving Regions:</div>
              <div className="text-[10px] text-slate-400 leading-relaxed">
                {serviceAreas.map(a => a.city).join(' • ')} & all major districts.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Admin toggle */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500">
            © {new Date().getFullYear()} <span className="text-slate-300 font-medium">ROYAL RESIN INTERIOR</span>. All rights reserved. Handcrafted luxury surface engineering.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('contact')}
              className="text-slate-400 hover:text-amber-400 transition"
            >
              Book Consultation
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 hover:bg-amber-950/60 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition text-xs font-semibold"
            >
              <Lock className="w-3.5 h-3.5" /> Admin CMS Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
