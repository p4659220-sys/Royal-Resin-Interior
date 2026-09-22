import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Phone,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const { faqs, setIsBookVisitModalOpen, companyInfo } = useStore();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'General', label: 'General & Longevity' },
    { id: 'Durability', label: 'Durability & Scratching' },
    { id: 'Installation', label: 'Installation & Preparation' },
    { id: 'Maintenance', label: 'Cleaning & Care' },
    { id: 'Pricing', label: 'Pricing & Site Visit' },
  ];

  const filteredFaqs = faqs.filter(f => {
    if (!f.isPublished) return false;
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Clear Answers & Technical Facts
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl font-extrabold text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Everything you need to know about durability, installation over old tiles, slip-resistance, cleaning, and maintenance.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/20 space-y-4 shadow-xl">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. tiles, scratch, slippery, cost)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No matching questions found. Ask us directly on WhatsApp or call our support desk!
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-slate-900/80 border border-amber-500/20 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="font-serif-royal font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200 space-y-2">
                    <p>{faq.answer}</p>
                    <div className="pt-2 flex items-center gap-2 text-[11px] text-amber-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Certified Royal Engineering Standard
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions CTA */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-amber-500/30 text-center space-y-4">
        <h3 className="font-serif-royal text-2xl font-bold text-white">
          Still Have a Specific Question?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Our senior technical team is available to discuss your specific room dimensions, tile conditions, and custom designs.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => setIsBookVisitModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Free Consultation
          </button>
          <a
            href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
