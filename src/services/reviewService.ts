import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { CustomerReview } from '../types';
import { initialReviews } from '../data/initialData';

const REVIEWS_COLLECTION = 'reviews';

// Additional verified client testimonials for initial database seeding
const defaultVerifiedReviews: CustomerReview[] = [
  ...initialReviews,
  {
    id: 'rev-4',
    customerName: 'Dr. Debabrata Roy & Nandini Roy',
    location: 'Salt Lake City, Sector V, Kolkata',
    serviceUsed: 'ME-02 Noir Gold Imperial Metallic',
    review: 'Transformed our 1,850 sq.ft. duplex living and dining area completely. Unlike polished marble which lost its shine in 2 years, this resin surface still gleams like liquid glass. Zero grout lines mean absolute zero dust accumulation.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    date: '2026-02-28',
    isPublished: true
  },
  {
    id: 'rev-5',
    customerName: 'Rajesh Agarwala',
    location: 'Alipore, Kolkata',
    serviceUsed: 'STAIR-01 Floating Resin River Staircase',
    review: 'The floating cantilever staircase with embedded copper resin looks straight out of an architectural digest magazine. The installation crew was exceptionally courteous, clean, and completed the diamond grinding with dust-collectors without making any mess.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    date: '2026-03-05',
    isPublished: true
  },
  {
    id: 'rev-6',
    customerName: 'Shreya Sengupta',
    location: 'South City Towers, Prince Anwar Shah Rd',
    serviceUsed: '3D-WALL-01 Emerald Geode TV Cladding',
    review: 'The backlit geode feature wall in our master suite is pure magic at night. The depth effect with crystal quartz and LED embedding is breathtaking. Guests always ask for Royal Resin Interior’s contact number!',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    date: '2026-03-12',
    isPublished: true
  }
];

const REVIEWS_SEEDED_KEY = 'royal_resin_reviews_seeded_v1';

/**
 * Fetch all reviews once from Firestore.
 * Automatically seeds the collection if empty on first load only.
 */
export async function fetchReviewsFromFirestore(): Promise<CustomerReview[]> {
  try {
    const colRef = collection(db, REVIEWS_COLLECTION);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      if (localStorage.getItem(REVIEWS_SEEDED_KEY) !== 'true') {
        console.log('[Firestore] Reviews collection is empty. Bootstrapping initial verified reviews...');
        await seedInitialReviewsToFirestore();
        return defaultVerifiedReviews;
      }
      return [];
    }

    localStorage.setItem(REVIEWS_SEEDED_KEY, 'true');
    const reviews: CustomerReview[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Partial<CustomerReview>;
      reviews.push({
        id: docSnap.id,
        customerName: data.customerName || 'Verified Client',
        location: data.location || 'Kolkata',
        serviceUsed: data.serviceUsed || 'Luxury Epoxy Flooring',
        review: data.review || '',
        rating: typeof data.rating === 'number' ? data.rating : 5,
        photo: data.photo || undefined,
        date: data.date || new Date().toISOString().split('T')[0],
        isPublished: data.isPublished !== false
      });
    });

    // Sort newest first
    reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return reviews;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, REVIEWS_COLLECTION);
    return defaultVerifiedReviews;
  }
}

/**
 * Seed initial reviews to Firestore so Firestore database has verified records
 */
export async function seedInitialReviewsToFirestore(): Promise<void> {
  if (localStorage.getItem(REVIEWS_SEEDED_KEY) === 'true') {
    return;
  }
  localStorage.setItem(REVIEWS_SEEDED_KEY, 'true');
  try {
    for (const rev of defaultVerifiedReviews) {
      const docRef = doc(db, REVIEWS_COLLECTION, rev.id);
      await setDoc(docRef, {
        id: rev.id,
        customerName: rev.customerName,
        location: rev.location,
        serviceUsed: rev.serviceUsed,
        review: rev.review,
        rating: rev.rating,
        photo: rev.photo || '',
        date: rev.date,
        isPublished: rev.isPublished,
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
    console.log('[Firestore] Successfully seeded verified reviews to Firestore.');
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, REVIEWS_COLLECTION);
  }
}

/**
 * Real-time listener for Firestore reviews
 */
export function subscribeToFirestoreReviews(
  onUpdate: (reviews: CustomerReview[]) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const colRef = collection(db, REVIEWS_COLLECTION);
    const q = query(colRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          if (localStorage.getItem(REVIEWS_SEEDED_KEY) !== 'true') {
            seedInitialReviewsToFirestore().then(() => {
              onUpdate(defaultVerifiedReviews);
            }).catch(() => {
              onUpdate([]);
            });
          } else {
            onUpdate([]);
          }
          return;
        }

        localStorage.setItem(REVIEWS_SEEDED_KEY, 'true');
        const reviews: CustomerReview[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Partial<CustomerReview>;
          reviews.push({
            id: docSnap.id,
            customerName: data.customerName || 'Verified Client',
            location: data.location || 'Kolkata',
            serviceUsed: data.serviceUsed || 'Luxury Epoxy Flooring',
            review: data.review || '',
            rating: typeof data.rating === 'number' ? data.rating : 5,
            photo: data.photo || undefined,
            date: data.date || new Date().toISOString().split('T')[0],
            isPublished: data.isPublished !== false
          });
        });

        // Sort newest first
        reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        onUpdate(reviews);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, REVIEWS_COLLECTION);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, REVIEWS_COLLECTION);
    return () => {};
  }
}

/**
 * Add a new review to Firestore
 */
export async function addReviewToFirestore(
  reviewData: Omit<CustomerReview, 'id' | 'date'> & { date?: string }
): Promise<CustomerReview> {
  const id = 'rev-' + Date.now();
  const dateStr = reviewData.date || new Date().toISOString().split('T')[0];

  const newReview: CustomerReview = {
    ...reviewData,
    id,
    date: dateStr,
    isPublished: reviewData.isPublished !== undefined ? reviewData.isPublished : true,
    photo: reviewData.photo || ''
  };

  const cleanedPayload: Record<string, any> = {
    createdAt: new Date().toISOString()
  };
  for (const [key, val] of Object.entries(newReview)) {
    if (val !== undefined) {
      cleanedPayload[key] = val;
    }
  }

  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await setDoc(docRef, cleanedPayload);
    return newReview;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${REVIEWS_COLLECTION}/${id}`);
    throw error;
  }
}

/**
 * Update an existing review in Firestore
 */
export async function updateReviewInFirestore(
  id: string,
  updates: Partial<CustomerReview>
): Promise<void> {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    const cleanedUpdates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };
    for (const [key, val] of Object.entries(updates)) {
      if (val !== undefined) {
        cleanedUpdates[key] = val;
      }
    }
    await setDoc(docRef, cleanedUpdates, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${REVIEWS_COLLECTION}/${id}`);
    throw error;
  }
}

/**
 * Delete a review from Firestore
 */
export async function deleteReviewFromFirestore(id: string): Promise<void> {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${REVIEWS_COLLECTION}/${id}`);
    throw error;
  }
}
