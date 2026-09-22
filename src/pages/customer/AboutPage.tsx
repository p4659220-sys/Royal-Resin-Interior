import React from 'react';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Clock,
  Compass
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ClientTestimonials } from '../../components/common/ClientTestimonials';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { serviceAreas, setIsBookVisitModalOpen } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Artisan Master Engineers
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          About Royal Resin Interior
        </h1>
        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          Pioneering seamless luxury epoxy flooring, custom resin marble, 3D depth installations, and handcrafted architectural wall cladding across Eastern India.
        </p>
      </div>

      {/* Our Story & What We Do */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Our Story & Heritage
          </div>
          <h2 className="font-serif-royal text-3xl font-bold text-white">
            Redefining Flooring as Bespoke Art
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Royal Resin Interior was founded with a singular vision: to liberate modern homes, penthouses, and commercial luxury spaces from the geometric constraints and maintenance headaches of standard tiled floors.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Traditional marble slabs suffer from porous stains, grout grime, and heavy demolition costs. Our proprietary multi-layer liquid resin systems bond permanently to your existing substrate, delivering a monolithic, mirror-like finish that is 100% waterproof, chemical-resistant, and aesthetically unmatched.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/20">
              <div className="text-2xl font-serif-royal font-bold text-amber-300">500+</div>
              <div className="text-xs text-slate-400">Completed Projects</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/20">
              <div className="text-2xl font-serif-royal font-bold text-amber-300">100%</div>
              <div className="text-xs text-slate-400">German UV-Stable Polymers</div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Royal Resin Artisan Pouring"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-xs text-slate-200">
            <span className="text-amber-400 font-bold">Craftsmanship:</span> Every vein, gold swirl, and mineral river is individually poured and hand-manipulated by master resin artists.
          </div>
        </div>
      </div>

      {/* Our Approach / Process */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Scientific Methodology
          </div>
          <h2 className="font-serif-royal text-3xl font-bold text-white">
            Our 5-Stage Precision Approach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-amber-400 font-bold font-serif-royal text-xl">01. Substrate Diagnostics</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We test concrete and tile moisture, level uneven subfloors with diamond-cup grinding, and apply specialized moisture-barrier epoxy primers.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-amber-400 font-bold font-serif-royal text-xl">02. Artisan Pigment Pour</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying 100% solid, solvent-free resins infused with imported metallic mica, liquid marble pigments, or high-definition 3D canvas embeddings.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-amber-400 font-bold font-serif-royal text-xl">03. Armor Shield Curing</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sealed with aliphatic polyaspartic topcoats providing diamond-grade scratch protection, UV resistance, and optional anti-skid micro textures.
            </p>
          </div>
        </div>
      </div>

      {/* Quality & Finishing / Why Customers Choose Us */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Uncompromising Standards
          </div>
          <h2 className="font-serif-royal text-3xl font-bold text-white">
            Why Discerning Clients Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">No Demolition Required:</strong>
              Apply directly over existing mosaic, concrete, or ceramic tiles without dust or debris.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">100% Grout-Free Hygiene:</strong>
              No dark crevices for mildew, bacteria, or dirt to accumulate.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Heat & Chemical Resistant:</strong>
              Unaffected by turmeric, oil, wine, sanitizers, or household cleaners.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Anti-Skid Safety:</strong>
              Certified clear-grip texture available for bathrooms, stairs, and balconies.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Fast 3-5 Days Execution:</strong>
              Minimal downtime compared to months of traditional marble polishing.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Free Physical Sample Visit:</strong>
              We bring real touch-and-feel resin slabs directly to your home.
            </div>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Coverage Network
          </div>
          <h2 className="font-serif-royal text-3xl font-bold text-white">
            Our Primary Service Areas
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Serving residential villas, luxury apartments, and commercial projects across:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceAreas.map((area) => (
            <div
              key={area.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold font-serif-royal text-lg">
                <MapPin className="w-4 h-4" />
                <span>{area.city}</span>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {area.district}, {area.state}
              </div>
              <div className="text-[11px] text-slate-400">
                Key Hubs: {area.nearbyAreas.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Testimonials Section (Fetched from Firestore) */}
      <ClientTestimonials
        title="Client Reviews & Trust Testimonials"
        subtitle="Read real stories from residential homeowners and commercial clients who trusted Royal Resin Interior for their architectural spaces."
        showWriteReviewButton={true}
        maxInitialDisplay={6}
      />

      {/* CTA Box */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-black space-y-4 shadow-xl">
        <h3 className="font-serif-royal text-2xl sm:text-4xl font-extrabold">
          Ready to Experience Physical Resin Samples?
        </h3>
        <p className="text-slate-900 text-sm max-w-xl mx-auto font-medium">
          Schedule our senior technical consultant to visit your space with real luxury resin slabs and laser measurement tools.
        </p>
        <button
          onClick={() => setIsBookVisitModalOpen(true)}
          className="px-8 py-3.5 rounded-xl bg-black hover:bg-slate-900 text-amber-400 font-extrabold text-sm shadow-xl inline-flex items-center gap-2 transition"
        >
          <Calendar className="w-4 h-4" />
          <span>Book a Free Site Visit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
