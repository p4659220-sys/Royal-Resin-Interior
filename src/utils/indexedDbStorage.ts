/**
 * Native IndexedDB storage wrapper for durable, unlimited state persistence.
 * Solves the browser localStorage 5MB quota limit that drops base64 user images on reload.
 */

const DB_NAME = 'RoyalResinDB';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const STATE_KEY = 'root_state';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveToIndexedDB(state: any): Promise<boolean> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(state, STATE_KEY);

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.warn('Error saving state to IndexedDB:', req.error);
        resolve(false);
      };
    });
  } catch (err) {
    console.warn('IndexedDB write error:', err);
    return false;
  }
}

export async function loadFromIndexedDB(): Promise<any | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STATE_KEY);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => {
        console.warn('Error reading from IndexedDB:', req.error);
        resolve(null);
      };
    });
  } catch (err) {
    console.warn('IndexedDB read error:', err);
    return null;
  }
}
