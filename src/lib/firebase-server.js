import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Server-side Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase for server-side operations
let app = null;
let db = null;

try {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  db = getFirestore(app);
  console.log('✅ Server-side Firebase initialized successfully');
} catch (error) {
  console.error('❌ Server-side Firebase initialization error:', error);
  throw new Error('Failed to initialize Firebase for server-side operations');
}

export { app, db }; 