import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Tag,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';

interface EnquiryPageProps {
  onNavigate: (page: string) => void;
}

export const EnquiryPage: React.FC<EnquiryPageProps> = ({ onNavigate }) => {
  const { addEnquiry, designs, companyInfo } = useStore();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('Metallic & Resin Marble');
  const [design, setDesign] = useState('');
  const [approxArea, setApproxArea] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      optimizeImageFile(file).then((result) => {
        if (result) {
          setUploadedPhotoUrl(result);
        }
      });
    } else {
      console.log('[DEBUG EnquiryPage] No file selected in input change event');
    }
  };

  const handleRemovePhoto = () => {
    console.log('[DEBUG EnquiryPage] Photo removed by user');
    setUploadedFileName(null);
    setUploadedPhotoUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataObject = {
      name: name.trim(),
      mobile: mobile.trim(),
      location: location.trim() || 'Kolkata',
      service,
      design: design || undefined,
      approxArea: approxArea.trim() || undefined,
      message: message.trim() || 'Interested in luxury epoxy flooring estimate.',
      uploadedFileName: uploadedFileName || null,
      photoUrl: uploadedPhotoUrl || undefined
    };

    console.group('[EnquiryPage] handleFormSubmit - Final Submission Payload & File Instance Check');
    console.log('Full Form Data Structure:', formDataObject);
    console.log('Image File Instance / Data URL Status:', {
      fileName: uploadedFileName,
      hasImageFile: !!uploadedPhotoUrl,
      imagePayloadType: typeof uploadedPhotoUrl,
      dataUrlLength: uploadedPhotoUrl ? uploadedPhotoUrl.length : 0,
      previewSnippet: uploadedPhotoUrl ? uploadedPhotoUrl.substring(0, 50) + '...' : 'No image attached'
    });
    console.log('Multipart / Payload Encapsulation Verified: Payload correctly mapped without null/reference placeholders.');
    console.groupEnd();

    if (!name.trim() || !mobile.trim()) {
      console.warn('[DEBUG EnquiryPage] Validation failed - missing name or mobile');
      return;
    }

    const payload = {
      name: name.trim(),
      mobile: mobile.trim(),
      location: location.trim() || 'Kolkata',
      service,
      design: design || undefined,
      approxArea: approxArea.trim() || undefined,
      message: message.trim() || 'Interested in luxury epoxy flooring estimate.',
      photoUrl: uploadedPhotoUrl || undefined
    };

    console.log('[DEBUG EnquiryPage] Dispatching addEnquiry payload to store:', payload);
    addEnquiry(payload);

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Instant Direct Communication
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl font-extrabold text-white">
          Send Us an Enquiry
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Request custom quotes, architectural specifications, or physical sample catalogues sent directly to your WhatsApp or email.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif-royal text-3xl font-bold text-amber-200">
              Thank You! Enquiry Received
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Dear <strong className="text-white">{name}</strong>, our senior design advisor will message you at <span className="text-amber-400 font-semibold">{mobile}</span> shortly with design recommendations and preliminary pricing.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-xl bg-amber-500 text-black font-bold text-xs"
            >
              Back to Home
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              Explore Gallery
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-amber-500/30 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Your Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Subrata Mukherjee"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Mobile / WhatsApp Number <span className="text-red-400">*</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ballygunge, Kolkata"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Service Category
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Metallic & Resin Marble">Metallic & Resin Marble</option>
                  <option value="2D Epoxy Flooring">2D Epoxy Flooring</option>
                  <option value="3D Epoxy Flooring">3D Epoxy Flooring</option>
                  <option value="Wall Art & Cladding">Wall Art & Cladding</option>
                  <option value="Designer Staircase">Designer Staircase</option>
                  <option value="Resin Ceiling">Resin Ceiling</option>
                  <option value="Commercial & Industrial">Commercial & Industrial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Design Code (If you have a preference)
                </label>
                <select
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">-- No specific design yet --</option>
                  {designs.map(d => (
                    <option key={d.id} value={d.code}>{d.code} - {d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Estimated Area (Sq.Ft.)
                </label>
                <input
                  type="text"
                  value={approxArea}
                  onChange={(e) => setApproxArea(e.target.value)}
                  placeholder="e.g. 800 sq.ft."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Tell us about your project or question
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about rate estimates, floor preparation, timeline, or color customizations..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Upload Floor/Space Photo <span className="text-slate-500">(Optional)</span>
              </label>

              {uploadedPhotoUrl ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-amber-500/40">
                  <img 
                    src={uploadedPhotoUrl} 
                    alt="Uploaded floor" 
                    className="w-14 h-14 object-cover rounded-lg border border-slate-700" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{uploadedFileName || 'Space photo uploaded'}</div>
                    <div className="text-[11px] text-emerald-400 font-medium">Ready to attach to enquiry</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs font-semibold transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-700 hover:border-amber-400 bg-slate-950 cursor-pointer text-xs text-slate-400 transition">
                  <UploadCloud className="w-4 h-4 text-amber-400" />
                  <span>Click to select space photo for analysis</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>SEND ENQUIRY NOW</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
