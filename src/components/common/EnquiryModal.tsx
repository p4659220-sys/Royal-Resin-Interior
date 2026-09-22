import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare, ShieldCheck, UploadCloud } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, addEnquiry, designs } = useStore();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('Metallic & Resin Marble');
  const [design, setDesign] = useState('');
  const [approxArea, setApproxArea] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  
  const [isSent, setIsSent] = useState(false);

  if (!isEnquiryModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setUploadedFileName(file.name);
      optimizeImageFile(file).then((result) => {
        if (result) {
          setUploadedPhotoUrl(result);
        }
      });
    } else {
      console.log('[DEBUG EnquiryModal] No file selected in input change event');
    }
  };

  const handleRemovePhoto = () => {
    console.log('[DEBUG EnquiryModal] Photo removed by user');
    setUploadedFile(null);
    setUploadedFileName(null);
    setUploadedPhotoUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct native FormData for multipart/form-data transmission
    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('mobile', mobile.trim());
    formData.append('location', location.trim() || 'Kolkata');
    formData.append('service', service);
    if (design) formData.append('design', design);
    if (approxArea.trim()) formData.append('approxArea', approxArea.trim());
    formData.append('message', message.trim() || 'Interested in luxury epoxy interior estimate.');

    if (uploadedFile) {
      formData.append('photo', uploadedFile, uploadedFile.name);
    }

    console.group('[EnquiryModal] handleFormSubmit - multipart/form-data Fetch Request');
    console.log('Content-Type: multipart/form-data (automatically set by browser with boundary for FormData)');
    for (let [key, val] of formData.entries()) {
      if (val instanceof File) {
        console.log(`FormData Binary File Entry [${key}]:`, {
          name: val.name,
          size: val.size,
          type: val.type,
          fileInstance: val
        });
      } else {
        console.log(`FormData Field Entry [${key}]:`, val);
      }
    }
    console.groupEnd();

    if (!name.trim() || !mobile.trim()) {
      console.warn('[DEBUG EnquiryModal] Validation failed - missing name or mobile');
      return;
    }

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        body: formData
      });
      const resJson = await response.json();
      console.log('[EnquiryModal] Server fetch response (/api/enquiries):', resJson);
    } catch (apiErr) {
      console.warn('[EnquiryModal] Server fetch error (falling back to store):', apiErr);
    }

    const payload = {
      name: name.trim(),
      mobile: mobile.trim(),
      location: location.trim() || 'Kolkata',
      service,
      design: design || undefined,
      approxArea: approxArea.trim() || undefined,
      message: message.trim() || 'Interested in luxury epoxy interior estimate.',
      photoUrl: uploadedPhotoUrl || undefined
    };

    console.log('[DEBUG EnquiryModal] Dispatching addEnquiry payload to store:', payload);
    addEnquiry(payload);

    setIsSent(true);
  };

  const handleClose = () => {
    setIsEnquiryModalOpen(false);
    setIsSent(false);
    setUploadedFileName(null);
    setUploadedPhotoUrl(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0d131f] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl text-slate-100 p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-royal text-2xl font-bold text-amber-200">
              “Thank You!”
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
              Your enquiry has been received. Our senior design team will contact you shortly with catalog samples & estimated rates.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-md"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Instant Direct Enquiry
              </div>
              <h3 className="font-serif-royal text-2xl font-bold text-white mt-1">
                Send Project Enquiry
              </h3>
              <p className="text-xs text-slate-400">
                Get custom quotes, rate sheets, and design catalogs sent to your WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Soumitra Chatterjee"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Mobile / WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98300 XXXXX"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Salt Lake, Kolkata"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
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
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Design Code (Optional)
                  </label>
                  <select
                    value={design}
                    onChange={(e) => setDesign(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Any / Undecided --</option>
                    {designs.map(d => (
                      <option key={d.id} value={d.code}>{d.code} - {d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Approx Area (sq.ft.)
                </label>
                <input
                  type="text"
                  value={approxArea}
                  onChange={(e) => setApproxArea(e.target.value)}
                  placeholder="e.g. 600 sq.ft."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your requirements or ask questions..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Photo Upload (Optional)
                </label>
                {uploadedPhotoUrl ? (
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900 border border-amber-500/40">
                    <img 
                      src={uploadedPhotoUrl} 
                      alt="Uploaded floor" 
                      className="w-12 h-12 object-cover rounded-lg border border-slate-700" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{uploadedFileName || 'Photo attached'}</div>
                      <div className="text-[11px] text-emerald-400">Ready to attach</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="px-2 py-1 rounded bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs transition"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-2 rounded-lg border border-dashed border-slate-700 hover:border-amber-500/40 bg-slate-900/50 cursor-pointer text-xs text-slate-400">
                    <UploadCloud className="w-4 h-4 text-amber-400" />
                    <span>Upload photo of current floor/space</span>
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Send className="w-4 h-4" /> Send Enquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
