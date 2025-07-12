import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Check if we're in the browser and if Firebase config is available
const isClient = typeof window !== 'undefined';
const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;


const firebaseConfig = hasFirebaseConfig ? {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} : null;


// Initialize Firebase only if config is available and we're on the client
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isClient && hasFirebaseConfig && firebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    auth = getAuth(app);
    
    db = getFirestore(app);
    
    storage = getStorage(app);
    
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
} else {
}

// Newsletter subscription function with duplicate prevention
export const addNewsletterSubscriber = async (email: string) => {
  if (!db) {
    console.error('❌ Firestore not available for newsletter subscription');
    throw new Error('Firebase is not initialized. Please check your environment variables.');
  }
  
  try {
    // Check if email already exists
    const emailQuery = query(
      collection(db, 'newsletter_subscribers'), 
      where('email', '==', email.toLowerCase().trim())
    );
    const existingSubscribers = await getDocs(emailQuery);
    
    if (!existingSubscribers.empty) {
      // Email already exists
      const existingDoc = existingSubscribers.docs[0];
      const existingData = existingDoc.data();
      
      if (existingData.status === 'active') {
        throw new Error('This email is already subscribed to the newsletter.');
      } else {
        // Reactivate inactive subscription
        throw new Error('This email was previously subscribed. Please contact us to reactivate your subscription.');
      }
    }
    
    // Add new subscriber
    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
      email: email.toLowerCase().trim(),
      subscribedAt: serverTimestamp(),
      status: 'active'
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error adding newsletter subscriber:', error);
    throw error;
  }
};

export { app, auth, db, storage }; 