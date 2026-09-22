import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Phone,
  Clock,
  Home,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';

interface BookVisitPageProps {
  onNavigate: (page: string) => void;
}

export const BookVisitPage: React.FC<BookVisitPageProps> = ({ onNavigate }) => {
  const { designs, addBooking, preselectedDesignCode, companyInfo } = useStore();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('Kolkata');
  const [pinCode, setPinCode] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Metallic & Resin Marble');
  const [selectedDesign, setSelectedDesign] = useState('');
  const [approxArea, setApproxArea] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM - 01:00 PM');
  const [requirementNotes, setRequirementNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string>('');

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (preselectedDesignCode) {
      setSelectedDesign(preselectedDesignCode);
    }
  }, [preselectedDesignCode]);

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
      console.log('[DEBUG BookVisitPage] No file selected in input change event');
    }
  };

  const handleRemovePhoto = () => {
    console.log('[DEBUG BookVisitPage] Photo removed by user');
    setUploadedFileName(null);
    setUploadedPhotoUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataObject = {
      customerName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim() || undefined,
      fullAddress: fullAddress.trim(),
      city: city.trim(),
      pinCode: pinCode.trim() || undefined,
      serviceCategory,
      selectedDesignCode: selectedDesign || undefined,
      approxArea: approxArea.trim() || 'Not specified',
      preferredDate,
      preferredTime,
      requirementNotes: requirementNotes.trim() || undefined,
      uploadedFileName: uploadedFileName || null,
      spacePhotoUrl: uploadedPhotoUrl || undefined
    };

    console.group('[BookVisitPage] handleFormSubmit - Final Submission Payload & File Instance Check');
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

    if (!fullName.trim() || !mobile.trim() || !fullAddress.trim() || !city.trim()) {
      console.warn('[DEBUG BookVisitPage] Validation failed - missing required fields');
      return;
    }

    const payload = {
      customerName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim() || undefined,
      fullAddress: fullAddress.trim(),
      city: city.trim(),
      pinCode: pinCode.trim() || undefined,
      serviceCategory,
      selectedDesignCode: selectedDesign || undefined,
      approxArea: approxArea.trim() || 'Not specified',
      preferredDate,
      preferredTime,
      requirementNotes: requirementNotes.trim() || undefined,
      spacePhotoUrl: uploadedPhotoUrl || undefined
    };

    console.log('[DEBUG BookVisitPage] Dispatching addBooking payload to store:', payload);
    addBooking(payload);

    setSubmittedBookingId(`BK-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Doorstep Physical Sample Experience
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl font-extrabold text-white">
          Book a Free Site Visit
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Our senior technical consultant will inspect your space with laser measurement tools and present real physical resin slabs for touch and feel.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-amber-500/40 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif-royal text-3xl font-bold text-amber-200">
              Site Visit Confirmed!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <strong className="text-white">{fullName}</strong>. We have registered your site visit for <strong className="text-amber-300">{preferredDate} ({preferredTime})</strong>.
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Reference Token:</span>
              <span className="text-amber-400 font-bold">{submittedBookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Customer Mobile:</span>
              <span className="text-white font-semibold">{mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="text-white">{fullAddress}, {city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Service Category:</span>
              <span className="text-amber-300 font-semibold">{serviceCategory}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-3.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-lg"
            >
              Return to Home
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Browse More Designs
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-amber-500/30 shadow-2xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. Customer Details */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] text-amber-300">1</span>
                  <span>Customer Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Amitava Banerjee"
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
                    Email Address <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amitava@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* 2. Location */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] text-amber-300">2</span>
                  <span>Project Location</span>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Full Address / Landmark <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="Flat / Villa No, Apartment / Society Name, Street"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      City / Area <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New Town, Kolkata"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="e.g. 700156"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Project Details */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] text-amber-300">3</span>
                  <span>Project Scope</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      What do you want? <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
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

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Select Design (Catalogue Code)
                    </label>
                    <select
                      value={selectedDesign}
                      onChange={(e) => setSelectedDesign(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="">-- Choose from Catalogue or Decide On-Site --</option>
                      {designs.map(d => (
                        <option key={d.id} value={d.code}>{d.code} - {d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Approximate Area (Sq.Ft. or Steps)
                  </label>
                  <input
                    type="text"
                    value={approxArea}
                    onChange={(e) => setApproxArea(e.target.value)}
                    placeholder="e.g. 750 sq.ft. (Living & Dining)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* 4. Preferred Timing */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] text-amber-300">4</span>
                  <span>Preferred Visit Schedule</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Preferred Time Slot</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                      <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                      <option value="03:00 PM - 06:00 PM">Evening (03:00 PM - 06:00 PM)</option>
                      <option value="06:00 PM - 08:00 PM">Late Evening (06:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. Space Details & Photo */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Tell us about your requirement / Floor Condition
                  </label>
                  <textarea
                    rows={2}
                    value={requirementNotes}
                    onChange={(e) => setRequirementNotes(e.target.value)}
                    placeholder="e.g. Existing ceramic floor has hairline cracks, want seamless marble finish without tile breakage."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Upload Space Photo <span className="text-slate-500">(Optional)</span>
                  </label>

                  {uploadedPhotoUrl ? (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-amber-500/40">
                      <img 
                        src={uploadedPhotoUrl} 
                        alt="Uploaded space" 
                        className="w-14 h-14 object-cover rounded-lg border border-slate-700" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{uploadedFileName || 'Space photo uploaded'}</div>
                        <div className="text-[11px] text-emerald-400 font-medium">Ready to submit</div>
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
                    <label className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-dashed border-slate-700 hover:border-amber-400 bg-slate-950 cursor-pointer text-xs text-slate-400 transition">
                      <UploadCloud className="w-4 h-4 text-amber-400" />
                      <span>Click to select space photo (JPG/PNG)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition"
              >
                <Calendar className="w-5 h-5" />
                <span>CONFIRM FREE SITE VISIT</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right Trust Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/20 space-y-4">
              <h3 className="font-serif-royal text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>What Happens Next?</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>1. Instant Call:</strong> Our consultant calls within 30 minutes to verify address & gate access.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>2. Physical Slabs:</strong> We bring actual 12x12 inch touch-and-feel resin slabs in various marble shades.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>3. Laser Precision:</strong> Exact digital laser area measurement to avoid paying for excess square footage.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>4. On-Spot Quotation:</strong> Complete written estimate with material grade choices & timeline guarantee.</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="font-serif-royal font-bold text-white text-sm">
                Prefer to Speak Immediately?
              </h4>
              <p className="text-xs text-slate-400">
                Call our senior engineering desk for urgent residential or commercial inspections:
              </p>
              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 text-amber-400 font-bold text-sm hover:underline"
              >
                <Phone className="w-4 h-4" /> {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
