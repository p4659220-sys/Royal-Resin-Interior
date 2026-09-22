import { MediaVaultItem } from '../types';
import { saveToIndexedDB, loadFromIndexedDB } from './indexedDbStorage';

const INDEXEDDB_MEDIA_KEY = 'royal_resin_media_vault_records';

/**
 * Upload an image permanently to Server Storage and register in Media Vault
 */
export async function uploadImageToVault(
  imageDataUrl: string, 
  name?: string, 
  category?: string
): Promise<{ url: string; mediaItem: MediaVaultItem }> {
  let serverResult: { url: string; mediaItem: MediaVaultItem } | null = null;

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageDataUrl, name, category })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url && data.media) {
        serverResult = {
          url: data.url,
          mediaItem: data.media
        };
      }
    }
  } catch (err) {
    console.warn('Server upload error, using local fallback:', err);
  }

  // If server saved it, use server's permanent URL; otherwise use dataUrl
  const finalUrl = serverResult?.url || imageDataUrl;
  const finalItem: MediaVaultItem = serverResult?.mediaItem || {
    id: `media-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    name: name || 'Uploaded Photo',
    url: finalUrl,
    category: category || 'General',
    sizeBytes: Math.round((imageDataUrl.length * 3) / 4),
    uploadedAt: new Date().toISOString()
  };

  // Also save to IndexedDB media collection
  try {
    const localStore = (await loadFromIndexedDB()) || {};
    const existingMedia: MediaVaultItem[] = localStore[INDEXEDDB_MEDIA_KEY] || [];
    const updatedMedia = [finalItem, ...existingMedia.filter(m => m.url !== finalItem.url)];
    await saveToIndexedDB({
      ...localStore,
      [INDEXEDDB_MEDIA_KEY]: updatedMedia
    });
  } catch (e) {
    console.warn('Could not cache media record in IndexedDB:', e);
  }

  return {
    url: finalUrl,
    mediaItem: finalItem
  };
}

/**
 * Get all images in the Media Vault (merged from Server and IndexedDB)
 */
export async function getMediaVaultItems(): Promise<MediaVaultItem[]> {
  let serverItems: MediaVaultItem[] = [];
  try {
    const res = await fetch('/api/media');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.media)) {
        serverItems = data.media;
      }
    }
  } catch (e) {
    console.warn('Could not fetch server media:', e);
  }

  let localItems: MediaVaultItem[] = [];
  try {
    const localStore = (await loadFromIndexedDB()) || {};
    localItems = localStore[INDEXEDDB_MEDIA_KEY] || [];
  } catch (e) {
    localItems = [];
  }

  // Merge unique items by url or id
  const map = new Map<string, MediaVaultItem>();
  for (const item of serverItems) {
    map.set(item.url, item);
  }
  for (const item of localItems) {
    if (!map.has(item.url)) {
      map.set(item.url, item);
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

/**
 * Remove an item from the Media Vault
 */
export async function deleteMediaVaultItem(id: string, url: string): Promise<boolean> {
  let serverSuccess = false;
  try {
    const res = await fetch(`/api/media/${encodeURIComponent(id)}?url=${encodeURIComponent(url)}`, { method: 'DELETE' });
    if (res.ok) {
      serverSuccess = true;
    }
  } catch (e) {
    console.warn('Server media delete failed:', e);
  }

  try {
    const localStore = (await loadFromIndexedDB()) || {};
    const existingMedia: MediaVaultItem[] = localStore[INDEXEDDB_MEDIA_KEY] || [];
    const updated = existingMedia.filter(m => m.id !== id && m.url !== url);
    await saveToIndexedDB({
      ...localStore,
      [INDEXEDDB_MEDIA_KEY]: updated
    });
  } catch (e) {
    console.warn('IndexedDB media delete failed:', e);
  }

  return serverSuccess;
}
