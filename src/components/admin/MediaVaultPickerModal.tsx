import React, { useState, useEffect } from 'react';
import { X, Search, Check, Upload, Image as ImageIcon, Sparkles, HardDrive, ShieldCheck } from 'lucide-react';
import { MediaVaultItem } from '../../types';
import { getMediaVaultItems, uploadImageToVault } from '../../utils/mediaVaultService';
import { optimizeImageFile } from '../../utils/imageOptimizer';

interface MediaVaultPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  title?: string;
}

export const MediaVaultPickerModal: React.FC<MediaVaultPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Image from Permanent Media Vault'
}) => {
  const [items, setItems] = useState<MediaVaultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadItems();
    }
  }, [isOpen]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const media = await getMediaVaultItems();
      setItems(media);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadNew = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const optimized = await optimizeImageFile(file);
      if (optimized) {
        const result = await uploadImageToVault(optimized, file.name, 'Uploaded');
        setItems(prev => [result.mediaItem, ...prev]);
        setSelectedUrl(result.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const filteredItems = items.filter(it => 
    it.name.toLowerCase().includes(search.toLowerCase()) || 
    (it.category && it.category.toLowerCase().includes(search.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#0b101b] border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col max-h-[88vh] text-xs text-slate-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {title}
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                  Permanent Vault
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                All previously uploaded images are preserved here permanently. Select any image to use instantly.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 py-3 shrink-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in Media Vault..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5 transition">
            <Upload className="w-3.5 h-3.5" />
            {isUploading ? 'Uploading & Securing...' : '+ Upload New to Vault'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploading}
              onChange={handleUploadNew}
            />
          </label>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto pr-1 py-2 min-h-[280px]">
          {loading ? (
            <div className="h-48 flex items-center justify-center text-slate-400">
              Loading Central Media Vault...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-slate-400 space-y-2 border border-dashed border-slate-800 rounded-2xl">
              <ImageIcon className="w-8 h-8 text-slate-600" />
              <p>No images found in your Media Vault.</p>
              <p className="text-[11px] text-slate-500">Upload an image above to permanently store it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filteredItems.map((item) => {
                const isSelected = selectedUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedUrl(item.url)}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition aspect-video bg-slate-950 ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-500/40 shadow-lg'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center shadow">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/90 to-transparent text-[10px] text-slate-300 truncate">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vault Status: Stored on Server Disk & IndexedDB (Will never be auto-deleted)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              disabled={!selectedUrl}
              onClick={() => {
                if (selectedUrl) {
                  onSelect(selectedUrl);
                  onClose();
                }
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-black font-extrabold shadow-md flex items-center gap-1.5 transition"
            >
              <Check className="w-4 h-4" /> Apply Selected Image
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
