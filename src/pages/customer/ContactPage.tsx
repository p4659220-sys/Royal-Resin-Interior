import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { companyInfo, addEnquiry, setIsBookVisitModalOpen, serviceAreas } = useStore();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('New Project Enquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) return;

    addEnquiry({
      name: name.trim(),
      mobile: mobile.trim(),
      location: 'Kolkata Studio Contact',
      service: subject,
      message: message.trim() || 'General enquiry from contact page.'
    });

    setIsSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Studio & Consultation Hub
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl font-extrabold text-white">
          Contact Royal Resin Interior
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Reach our engineering team, request architectural collaboration, or book a free residential site inspection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-6 shadow-xl">
            <h2 className="font-serif-royal text-2xl font-bold text-white border-b border-slate-800 pb-4">
              Get in Touch
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Direct Telephone</div>
                  <a href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-white font-bold hover:text-amber-400 text-sm">
                    {companyInfo.phone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Direct line to senior project managers</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs">WhatsApp Business</div>
                  <a 
                    href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Royal%20Resin%2C%20I%20want%20to%20know%20more%20about%20your%20resin%20flooring.`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline text-sm"
                  >
                    {companyInfo.whatsapp}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instant design catalogs & estimated quotes</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Email Address</div>
                  <a href={`mailto:${companyInfo.email}`} className="text-white font-semibold hover:text-amber-400 text-xs sm:text-sm">
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Studio & Experience Center</div>
                  <p className="text-white font-medium">{companyInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Operating Hours</div>
                  <p className="text-white font-medium">{companyInfo.businessHours}</p>
                  <p className="text-[11px] text-slate-500">Site visits conducted 7 days a week</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsBookVisitModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book a Free Site Visit
              </button>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 shadow-xl space-y-6">
          <h2 className="font-serif-royal text-2xl font-bold text-white border-b border-slate-800 pb-4">
            Send Us a Direct Message
          </h2>

          {isSent ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-royal text-2xl font-bold text-amber-200">
                Message Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                Thank you, {name}. Our technical office will contact you on {mobile} within a few hours.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Debasish Roy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98300 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Residential Living Room / Penthouse Floor">Residential Living Room / Penthouse Floor</option>
                  <option value="Bathroom 3D Epoxy Flooring">Bathroom 3D Epoxy Flooring</option>
                  <option value="Commercial Showroom / Hotel Lobby">Commercial Showroom / Hotel Lobby</option>
                  <option value="Architect & Interior Designer Partnership">Architect & Interior Designer Partnership</option>
                  <option value="Other Custom Query">Other Custom Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your space, timeline, and location..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map Representation & Coverage */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-royal text-2xl font-bold text-white">
              Studio & Project Hub
            </h3>
            <p className="text-xs text-slate-400">
              Visiting the showroom: Please book in advance so our resin specialist can prepare bespoke color samples for your visit.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Salt+Lake+Sector+V+Kolkata"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-2 self-start"
          >
            <MapPin className="w-4 h-4" /> Open in Google Maps
          </a>
        </div>

        {/* Decorative Interactive Hub Card */}
        <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center p-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
            alt="Kolkata Salt Lake Hub"
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-[1px]"
          />
          <div className="relative z-10 space-y-2 max-w-lg">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center mx-auto shadow-xl">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-serif-royal text-xl font-bold text-white">
              Royal Resin Interior Central HQ
            </h4>
            <p className="text-xs text-slate-300">
              Sector V, Salt Lake City, Kolkata - 700091. Serving West Bengal, Odisha, Jharkhand & North East.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
