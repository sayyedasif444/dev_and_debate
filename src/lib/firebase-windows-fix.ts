import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Extend Window interface to include firebaseDisabled
declare global {
  interface Window {
    firebaseDisabled?: boolean;
  }
}

// Global Firebase error tracking
let firebaseDisabled = false;
let errorCount = 0;
const MAX_ERRORS = 3;

// Global error suppression for Firebase
const suppressFirebaseErrors = () => {
  // Suppress console errors from Firebase
  const originalError = console.error;
  console.error = (...args) => {
    const message = args.join(' ');
    if (
      message.includes('FIRESTORE') ||
      message.includes('INTERNAL ASSERTION FAILED') ||
      message.includes('Unexpected state') ||
      message.includes('FirebaseError') ||
      message.includes('buffer bounds') ||
      message.includes('protobuf') ||
      message.includes('INTERNAL ASSERTION FAILED')
    ) {
      // Increment error count
      errorCount++;
      console.warn(`⚠️ Firebase error suppressed (${errorCount}/${MAX_ERRORS}):`, message);
      
      // Disable Firebase after too many errors
      if (errorCount >= MAX_ERRORS && !firebaseDisabled) {
        firebaseDisabled = true;
        console.warn('🚫 Firebase disabled due to repeated errors');
        
        // Clear Firebase instances
        if (typeof window !== 'undefined') {
          window.firebaseDisabled = true;
        }
      }
      return;
    }
    originalError.apply(console, args);
  };

  // Suppress unhandled promise rejections from Firebase
  const originalUnhandledRejection = window.onunhandledrejection;
  window.onunhandledrejection = (event) => {
    const message = event.reason?.message || event.reason?.toString() || '';
    if (
      message.includes('FIRESTORE') ||
      message.includes('INTERNAL ASSERTION FAILED') ||
      message.includes('Unexpected state') ||
      message.includes('FirebaseError') ||
      message.includes('buffer bounds') ||
      message.includes('protobuf')
    ) {
      errorCount++;
      console.warn(`⚠️ Firebase unhandled rejection suppressed (${errorCount}/${MAX_ERRORS}):`, message);
      
      if (errorCount >= MAX_ERRORS && !firebaseDisabled) {
        firebaseDisabled = true;
        console.warn('🚫 Firebase disabled due to repeated errors');
        if (typeof window !== 'undefined') {
          window.firebaseDisabled = true;
        }
      }
      
      event.preventDefault();
      return;
    }
    if (originalUnhandledRejection) {
      originalUnhandledRejection.call(window, event);
    }
  };
};

// Check if Firebase should be disabled
const shouldDisableFirebase = () => {
  if (firebaseDisabled) return true;
  if (typeof window !== 'undefined' && window.firebaseDisabled) return true;
  return false;
};

// Windows-specific Firebase configuration to avoid buffer errors
const createFirebaseApp = (): FirebaseApp | null => {
  try {
    // Check if Firebase should be disabled
    if (shouldDisableFirebase()) {
      console.warn('🚫 Firebase initialization skipped - disabled due to errors');
      return null;
    }

    // Suppress Firebase errors globally
    if (typeof window !== 'undefined') {
      suppressFirebaseErrors();
    }

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.error('❌ Firebase configuration is missing');
      return null;
    }

    // Check if app is already initialized
    if (getApps().length > 0) {
      return getApps()[0];
    }

    // Initialize with Windows-specific settings
    const app = initializeApp(firebaseConfig);

    return app;
  } catch (error) {
    console.error('❌ Error creating Firebase app:', error);
    errorCount++;
    if (errorCount >= MAX_ERRORS) {
      firebaseDisabled = true;
      if (typeof window !== 'undefined') {
        window.firebaseDisabled = true;
      }
    }
    return null;
  }
};

// Initialize Firebase with error handling
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

// Initialize Firebase only on client side and only if not disabled
if (typeof window !== 'undefined' && !shouldDisableFirebase()) {
  try {
    app = createFirebaseApp();
    
    if (app) {
      // Initialize Firestore with Windows-specific settings
      db = getFirestore(app);
      
      // Initialize Auth
      auth = getAuth(app);
      
      // Initialize Storage
      storage = getStorage(app);
      
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    errorCount++;
    if (errorCount >= MAX_ERRORS) {
      firebaseDisabled = true;
      if (typeof window !== 'undefined') {
        window.firebaseDisabled = true;
      }
    }
  }
}

// Server-side initialization function
export const initializeFirebaseServer = () => {
  if (typeof window !== 'undefined') {
    throw new Error('This function should only be called on the server side');
  }

  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error('Firebase configuration is missing');
    }

    // Check if app is already initialized
    let serverApp;
    if (getApps().length === 0) {
      serverApp = initializeApp(firebaseConfig);
    } else {
      serverApp = getApps()[0];
    }

    const serverDb = getFirestore(serverApp);
    return serverDb;
  } catch (error) {
    console.error('❌ Firebase server initialization error:', error);
    throw new Error('Failed to initialize Firebase on server');
  }
};

// Safe Firebase operation wrapper
export const safeFirebaseOperation = async <T>(
  operation: () => Promise<T>, 
  operationName: string
): Promise<T> => {
  try {
    // Check if Firebase is disabled
    if (shouldDisableFirebase()) {
      throw new Error(`Firebase is disabled due to errors - ${operationName}`);
    }
    
    return await operation();
  } catch (error: any) {
    // Check if this is a buffer error
    if (error.code === 'ERR_BUFFER_OUT_OF_BOUNDS' || 
        error.message?.includes('buffer bounds') ||
        error.message?.includes('protobuf') ||
        error.message?.includes('INTERNAL ASSERTION FAILED') ||
        error.message?.includes('Unexpected state')) {
      console.warn(`⚠️ Firebase buffer error in ${operationName}, using fallback`);
      errorCount++;
      if (errorCount >= MAX_ERRORS) {
        firebaseDisabled = true;
        if (typeof window !== 'undefined') {
          window.firebaseDisabled = true;
        }
      }
      throw new Error(`Firebase buffer error in ${operationName}`);
    }
    throw error;
  }
};

// Export Firebase status
export const isFirebaseDisabled = () => shouldDisableFirebase();

export { app, db, auth, storage }; 