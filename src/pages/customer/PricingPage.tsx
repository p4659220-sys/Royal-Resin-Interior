import React, { useState } from 'react';
import { 
  Sparkles, 
  Calculator, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { services, setIsBookVisitModalOpen } = useStore();

  // Calculator State
  const [calcCategory, setCalcCategory] = useState<string>('metallic-marble');
  const [calcArea, setCalcArea] = useState<number>(500);
  const [calcGrade, setCalcGrade] = useState<'standard' | 'premium' | 'ultra-high-gloss'>('premium');

  // Dynamic service lookup from Admin Store
  const selectedService = services.find((s) => s.slug === calcCategory) || services[0];
  const isSteps = selectedService?.unit === 'step' || calcCategory === 'staircase';

  // Dynamic calculation based on Admin-configured rates
  const getEstimatedCost = () => {
    const minRate = selectedService ? selectedService.minRate : 350;
    const maxRate = selectedService ? selectedService.maxRate : 580;

    const multiplier = calcGrade === 'standard' ? 1 : calcGrade === 'premium' ? 1.15 : 1.3;
    const estMin = Math.round(minRate * calcArea * multiplier);
    const estMax = Math.round(maxRate * calcArea * multiplier);

    return { estMin, estMax, isSteps, minRate, maxRate, unit: selectedService?.unit || 'sq.ft.' };
  };

  const { estMin, estMax, unit } = getEstimatedCost();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> 100% Transparent Price Policy
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl font-extrabold text-white">
          Estimated Pricing & Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          No hidden fees or unexpected extras. We provide detailed square-footage estimations with free laser measurement confirmation.
        </p>
      </div>

      {/* Interactive Calculator Box */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-[#0b0f17] border border-amber-500/40 shadow-2xl space-y-8">
        <div className="flex items-center gap-2 text-amber-400 font-bold font-serif-royal text-xl sm:text-2xl">
          <Calculator className="w-6 h-6" />
          <span>Interactive Square-Footage Cost Estimator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                1. Select Desired Service Category:
              </label>
              <select
                value={calcCategory}
                onChange={(e) => setCalcCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                {services.map((svc) => (
                  <option key={svc.id} value={svc.slug}>
                    {svc.name} (₹{svc.minRate} - ₹{svc.maxRate} / {svc.unit})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  2. {isSteps ? 'Number of Staircase Steps:' : 'Approximate Area (Sq.Ft.):'}
                </label>
                <span className="text-sm font-bold text-amber-300 font-serif-royal">
                  {calcArea} {isSteps ? 'Steps' : 'sq.ft.'}
                </span>
              </div>
              <input
                type="range"
                min={isSteps ? 5 : 50}
                max={isSteps ? 50 : 3000}
                step={isSteps ? 1 : 25}
                value={calcArea}
                onChange={(e) => setCalcArea(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>{isSteps ? '5 Steps' : '50 sq.ft.'}</span>
                <span>{isSteps ? '25 Steps' : '1,500 sq.ft.'}</span>
                <span>{isSteps ? '50 Steps' : '3,000+ sq.ft.'}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                3. Protective Topcoat Armor Grade:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCalcGrade('standard')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    calcGrade === 'standard' ? 'bg-amber-500 text-black border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  Standard Gloss
                </button>
                <button
                  onClick={() => setCalcGrade('premium')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    calcGrade === 'premium' ? 'bg-amber-500 text-black border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  Anti-Scratch Polyaspartic
                </button>
                <button
                  onClick={() => setCalcGrade('ultra-high-gloss')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    calcGrade === 'ultra-high-gloss' ? 'bg-amber-500 text-black border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  Diamond Ultra-Mirror
                </button>
              </div>
            </div>
          </div>

          {/* Result Output Card (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-5 text-center">
            <div className="text-xs text-amber-400 uppercase font-semibold tracking-wider">
              Estimated Total Investment
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif-royal font-extrabold text-amber-300">
                ₹{estMin.toLocaleString('en-IN')} – ₹{estMax.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-400">
                (Based on {calcArea} {isSteps ? 'steps' : 'sq.ft.'} with {calcGrade.replace('-', ' ')} finish)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 text-left space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> All chemical materials & primers included
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Substrate diamond grinding included
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 5-Year Royal Warranty included
              </div>
            </div>

            <button
              onClick={() => setIsBookVisitModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Site Visit for Exact Laser Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Master Price List Table */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Detailed Breakdown
          </div>
          <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white">
            Official Category Rate Card
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-amber-500/30 bg-slate-900/80 shadow-2xl">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-950 text-amber-400 font-serif-royal uppercase text-[11px] tracking-wider border-b border-amber-500/30">
              <tr>
                <th className="py-4 px-6">Service Category</th>
                <th className="py-4 px-6">Estimated Rate</th>
                <th className="py-4 px-6 hidden md:table-cell">Ideal Spaces</th>
                <th className="py-4 px-6 hidden lg:table-cell">Package Inclusions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-6 font-bold text-white font-serif-royal">
                    {svc.name}
                  </td>
                  <td className="py-4 px-6 font-bold text-amber-300 whitespace-nowrap">
                    ₹{svc.minRate} – ₹{svc.maxRate} / {svc.unit}
                  </td>
                  <td className="py-4 px-6 text-slate-400 hidden md:table-cell text-xs">
                    {svc.tagline || 'Living rooms, Master suites, Showrooms, Boutique lobbies'}
                  </td>
                  <td className="py-4 px-6 text-slate-300 hidden lg:table-cell text-xs">
                    {svc.description || 'Moisture barrier primer, Metallic color pour, Aliphatic high-gloss topcoat'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Influencing Factors */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-serif-royal text-xl font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-400" /> What Influences the Final Rate?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-amber-300 block">1. Total Floor Area:</strong>
            Larger continuous spaces (1,000+ sq.ft.) qualify for bulk rate reductions and higher economies of scale.
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-amber-300 block">2. Subfloor Condition:</strong>
            Existing level tiles require less primer repair than uneven or moisture-damaged raw concrete slabs.
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-amber-300 block">3. Artwork Complexity:</strong>
            Intricate hand-poured multi-color gold veins or 3D crystal geode quartz elements require specialized artisan hours.
          </div>
        </div>
      </div>
    </div>
  );
};
