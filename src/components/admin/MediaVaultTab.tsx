import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Search, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  HardDrive, 
  ShieldCheck, 
  Image as ImageIcon, 
  Sparkles,
  ExternalLink,
  RefreshCw,
  FolderOpen,
  AlertTriangle,
  X
} from 'lucide-react';
import { MediaVaultItem } from '../../types';
import { getMediaVaultItems, uploadImageToVault, deleteMediaVaultItem } from '../../utils/mediaVaultService';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { useStore } from '../../context/StoreContext';

interface MediaVaultTabProps {
  onSelectForUse?: (url: string) => void;
}

export const MediaVaultTab: React.FC<MediaVaultTabProps> = ({ onSelectForUse }) => {
  const { addToast } = useStore();
  const [items, setItems] = useState<MediaVaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<MediaVaultItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MediaVaultItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await getMediaVaultItems();
      setItems(data);
    } catch (e) {
      console.error('Error fetching vault items:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const optimized = await optimizeImageFile(file);
        if (optimized) {
          const res = await uploadImageToVault(optimized, file.name, 'Media Vault');
          setItems(prev => [res.mediaItem, ...prev.filter(x => x.url !== res.url)]);
        }
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (item: MediaVaultItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (item: MediaVaultItem) => {
    setItemToDelete(item);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteMediaVaultItem(itemToDelete.id, itemToDelete.url);
      setItems(prev => prev.filter(x => x.id !== itemToDelete.id && x.url !== itemToDelete.url));
      addToast('info', 'Image Deleted', `"${itemToDelete.name}" সেন্ট্রাল ভল্ট থেকে সফলভাবে ডিলিট করা হয়েছে।`);
      if (previewImage && (previewImage.id === itemToDelete.id || previewImage.url === itemToDelete.url)) {
        setPreviewImage(null);
      }
      setItemToDelete(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('error', 'Delete Failed', 'ছবিটি মুছতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredItems = items.filter(it => {
    const matchesSearch = it.name.toLowerCase().includes(search.toLowerCase()) || 
      (it.category && it.category.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || it.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const formatBytes = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Overview */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/40 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif-royal text-xl sm:text-2xl font-bold text-white">
                  Central Media Vault (সেন্ট্রাল পার্মানেন্ট ইমেজ ভল্ট)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Permanent Storage
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                আপনার আপলোড করা প্রতিটি ছবি এখানে এক জায়গায় স্থায়ীভাবে জমা থাকে। সার্ভার ডিস্ক এবং ব্রাউজার মেমরিতে ডুয়াল স্টোরেজ থাকায় কোনো ছবি নিজে থেকে কখনোই ডিলিট বা রিমুভ হবে না।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={loadMedia}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>

            <label className="cursor-pointer px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition">
              <Upload className="w-4 h-4" />
              {isUploading ? 'Securing Photos...' : '+ Upload Photos to Vault'}
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={isUploading}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Total Photos in Vault</div>
            <div className="text-lg font-bold text-amber-300">{items.length} Images</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Storage Engine</div>
            <div className="text-lg font-bold text-emerald-400">Server + IndexedDB</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Auto-Delete Protection</div>
            <div className="text-lg font-bold text-white">Disabled (Permanent)</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Availability</div>
            <div className="text-lg font-bold text-amber-300">24/7 Guaranteed</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by photo name or tag..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500"
          />
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="text-amber-300 font-bold">{filteredItems.length}</span> of {items.length} images
        </div>
      </div>

      {/* Main Gallery Grid */}
      {loading ? (
        <div className="h-64 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-sm">
          Loading Media Vault records...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900 border border-dashed border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-800 text-slate-500 flex items-center justify-center">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Your Media Vault is Ready</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Any photo you upload to services, designs, or upload directly will be permanently preserved right here.
            </p>
          </div>
          <label className="inline-flex cursor-pointer px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold gap-2 items-center transition">
            <Upload className="w-4 h-4" /> Upload First Photos
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 bg-slate-950 transition duration-200 flex flex-col shadow-lg"
            >
              {/* Image Preview Box */}
              <div 
                className="relative aspect-video w-full overflow-hidden cursor-pointer bg-slate-900"
                onClick={() => setPreviewImage(item)}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-semibold flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Preview
                  </span>
                </div>
              </div>

              {/* Info & Action Bar */}
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <div className="font-semibold text-white truncate text-[11px]" title={item.name}>
                    {item.name}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>{formatBytes(item.sizeBytes)}</span>
                    <span>{item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : 'Stored'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleCopyUrl(item)}
                    title="Copy Image URL to Clipboard"
                    className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-medium flex items-center justify-center gap-1 border border-slate-700/60 transition"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  {onSelectForUse && (
                    <button
                      onClick={() => onSelectForUse(item.url)}
                      title="Use this image"
                      className="py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-semibold border border-amber-500/40 transition"
                    >
                      Use
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item)}
                    title="Delete permanently"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950/60 text-slate-500 hover:text-red-400 border border-slate-800 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#0b101b] border border-amber-500/40 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="truncate pr-4">
                <h3 className="font-bold text-white text-sm truncate">{previewImage.name}</h3>
                <p className="text-[11px] text-slate-400">{previewImage.url}</p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[65vh] overflow-hidden rounded-2xl border border-slate-800 bg-black flex items-center justify-center">
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Size: {formatBytes(previewImage.sizeBytes)} • Stored permanently on server & device
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleDelete(previewImage);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Photo
                </button>
                <button
                  onClick={() => handleCopyUrl(previewImage)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Link
                </button>
                <a
                  href={previewImage.url}
                  download={previewImage.name}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download File
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (100% Reliable In-App Dialog) */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative max-w-md w-full bg-[#0d131f] border border-red-500/50 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-royal font-bold text-white text-base">
                    Delete from Media Vault?
                  </h3>
                  <p className="text-xs text-red-400">
                    ছবিটি ভল্ট থেকে মুছে ফেলতে চান?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => !isDeleting && setItemToDelete(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-black/60 border border-slate-800 flex items-center gap-3">
              <div className="w-16 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-700">
                <img src={itemToDelete.url} alt={itemToDelete.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white text-xs truncate" title={itemToDelete.name}>
                  {itemToDelete.name}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                  <span>{formatBytes(itemToDelete.sizeBytes)}</span>
                  <span>•</span>
                  <span className="text-amber-400/90">{itemToDelete.category || 'Media Vault'}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              এই ছবিটি সেন্ট্রাল সার্ভার ডিস্ক এবং লোকাল স্টোরেজ থেকে চিরতরে মুছে ফেলা হবে।
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Cancel (বাতিল)
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" /> Delete Permanently (মুছে ফেলুন)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
