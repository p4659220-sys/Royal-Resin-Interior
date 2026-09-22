import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight,
  Phone,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';

interface BookVisitModalProps {
  onSuccess?: () => void;
}

export const BookVisitModal: React.FC<BookVisitModalProps> = ({ onSuccess }) => {
  const { 
    isBookVisitModalOpen, 
    setIsBookVisitModalOpen, 
    preselectedDesignCode, 
    setPreselectedDesignCode,
    designs,
    addBooking
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('Kolkata');
  const [pinCode, setPinCode] = useState('');
  const [serviceCategory, setServiceCategory] = useState('2D Flooring');
  const [selectedDesign, setSelectedDesign] = useState('');
  const [approxArea, setApproxArea] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM - 01:00 PM');
  const [requirementNotes, setRequirementNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Set default preferred date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Update selected design if preselected
  useEffect(() => {
    if (preselectedDesignCode) {
      setSelectedDesign(preselectedDesignCode);
      const found = designs.find(d => d.code === preselectedDesignCode);
      if (found) {
        if (found.category === 'metallic-marble') setServiceCategory('Resin Marble');
        else if (found.category === '2d-flooring') setServiceCategory('2D Flooring');
        else if (found.category === '3d-flooring') setServiceCategory('3D Flooring');
        else if (found.category === 'wall-art') setServiceCategory('Wall Art');
        else if (found.category === 'staircase') setServiceCategory('Staircase');
        else if (found.category === 'ceiling') setServiceCategory('Ceiling');
        else if (found.category === 'commercial-industrial') setServiceCategory('Commercial Flooring');
      }
    }
  }, [preselectedDesignCode, designs]);

  if (!isBookVisitModalOpen) return null;

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
      console.log('[DEBUG BookVisitModal] No file selected in input change event');
    }
  };

  const handleRemovePhoto = () => {
    console.log('[DEBUG BookVisitModal] Photo removed by user');
    setUploadedFile(null);
    setUploadedFileName(null);
    setUploadedPhotoUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct native FormData for multipart/form-data transmission
    const formData = new FormData();
    formData.append('customerName', fullName.trim());
    formData.append('mobile', mobile.trim());
    if (email.trim()) formData.append('email', email.trim());
    formData.append('fullAddress', fullAddress.trim());
    formData.append('city', city.trim());
    if (pinCode.trim()) formData.append('pinCode', pinCode.trim());
    formData.append('serviceCategory', serviceCategory);
    if (selectedDesign) formData.append('selectedDesignCode', selectedDesign);
    formData.append('approxArea', approxArea.trim() || 'Not specified');
    formData.append('preferredDate', preferredDate);
    formData.append('preferredTime', preferredTime);
    if (requirementNotes.trim()) formData.append('requirementNotes', requirementNotes.trim());
    
    if (uploadedFile) {
      formData.append('spacePhoto', uploadedFile, uploadedFile.name);
    }

    console.group('[BookVisitModal] handleFormSubmit - multipart/form-data Fetch Request');
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

    if (!fullName.trim() || !mobile.trim() || !fullAddress.trim() || !city.trim()) {
      console.warn('[DEBUG BookVisitModal] Validation failed - missing required fields');
      setErrorMsg('Please fill in all required fields (Name, Mobile, Address, City).');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        body: formData
      });
      const resJson = await response.json();
      console.log('[BookVisitModal] Server fetch response (/api/bookings):', resJson);
    } catch (apiErr) {
      console.warn('[BookVisitModal] Server fetch error (falling back to store):', apiErr);
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

    console.log('[DEBUG BookVisitModal] Dispatching addBooking payload to store:', payload);
    addBooking(payload);

    setIsSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const handleClose = () => {
    setIsBookVisitModalOpen(false);
    setPreselectedDesignCode(null);
    setIsSubmitted(false);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d131f] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl text-slate-100 p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-amber-200">
                Site Visit Request Received!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{fullName}</strong>. Our senior technical consultant will call you at <span className="text-amber-400 font-semibold">{mobile}</span> to confirm your site visit time for <span className="text-amber-300">{preferredDate}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1 max-w-md mx-auto text-left">
              <div className="flex justify-between">
                <span>Service Category:</span>
                <span className="text-slate-200 font-semibold">{serviceCategory}</span>
              </div>
              {selectedDesign && (
                <div className="flex justify-between">
                  <span>Selected Design:</span>
                  <span className="text-amber-400 font-semibold">{selectedDesign}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-slate-200">{city}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-sm shadow-lg shadow-amber-500/20"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Free Laser Measurement & Consultation
              </div>
              <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white mt-1">
                Book a Site Visit
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Our expert engineers will bring real physical touch-and-feel resin samples right to your door.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Details */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  1. Customer Details
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
                      placeholder="e.g. Rajesh Ghosh"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
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
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
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
                    placeholder="e.g. rajesh@example.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  2. Project Location
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
                    placeholder="Flat No, Building Name, Street"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
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
                      placeholder="e.g. Kolkata, Salt Lake"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
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
                      placeholder="e.g. 700091"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  3. Project Details
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      What do you want? <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white focus:outline-none"
                    >
                      <option value="2D Flooring">2D Flooring</option>
                      <option value="3D Flooring">3D Flooring</option>
                      <option value="Resin Marble">Resin Marble</option>
                      <option value="Wall Art">Wall Art</option>
                      <option value="Staircase">Staircase</option>
                      <option value="Ceiling">Ceiling</option>
                      <option value="Commercial Flooring">Commercial Flooring</option>
                      <option value="Other">Other Custom Requirement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Select Design (Catalogue Code)
                    </label>
                    <select
                      value={selectedDesign}
                      onChange={(e) => setSelectedDesign(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white focus:outline-none"
                    >
                      <option value="">-- Choose from Catalogue (or specify during visit) --</option>
                      {designs.map(d => (
                        <option key={d.id} value={d.code}>
                          {d.code} - {d.name} (₹{d.minRate}–₹{d.maxRate})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Approximate Area
                  </label>
                  <input
                    type="text"
                    value={approxArea}
                    onChange={(e) => setApproxArea(e.target.value)}
                    placeholder="e.g. 500 sq.ft. or 18 steps"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  4. Preferred Visit Timing
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white focus:outline-none"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                      <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                      <option value="03:00 PM - 06:00 PM">Evening (03:00 PM - 06:00 PM)</option>
                      <option value="06:00 PM - 08:00 PM">Late Evening (06:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Details & Photo Upload */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Tell us about your requirement / current floor condition
                  </label>
                  <textarea
                    rows={2}
                    value={requirementNotes}
                    onChange={(e) => setRequirementNotes(e.target.value)}
                    placeholder="e.g. We have existing ceramic tiles in the living room and want Italian marble look without breaking."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 text-sm text-white placeholder-slate-500 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Upload Space Photo <span className="text-slate-500">(Optional but helpful)</span>
                  </label>
                  
                  {uploadedPhotoUrl ? (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-amber-500/40">
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
                        className="px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs font-semibold transition"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-amber-500/40 hover:border-amber-400 bg-slate-900/50 cursor-pointer text-xs text-slate-400 transition">
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

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK SITE VISIT NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center text-[11px] text-slate-400 mt-2">
                  🔒 100% Free Consultation. No Obligation. Instant Confirmation.
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
