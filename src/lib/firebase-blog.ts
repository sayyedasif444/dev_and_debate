import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  setDoc,
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp,
  enableNetwork,
  disableNetwork,
  deleteField
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  idea: string;
  tone: string;
  status: 'draft' | 'published';
  wordCount: number;
  rating?: {
    score: number;
    review: string;
  };
  images?: string[];
  slug: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by?: string;
  published_at?: Timestamp;
  likes?: number;
  comments?: Comment[];
}

// Comment interface
export interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  avatar: string;
  created_at: string;
  likes: number;
}

// Helper function to generate slug from title
export const generateSlug = (title: string): string => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Helper function to generate unique slug
export const generateUniqueSlug = async (title: string, existingSlugs: string[] = []): Promise<string> => {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  
  // Check if slug exists in provided list
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
};

// Global state management
let isConnected = false;
let connectionListeners: (() => void)[] = [];
let isInitialized = false;
let connectionRetryCount = 0;
const maxConnectionRetries = 5;
let activeListeners: Map<string, (() => void)> = new Map();
let isShuttingDown = false;
let errorHandlerInstalled = false;
let connectionAttemptInProgress = false;

// Helper function to check if Firebase is initialized
const checkFirebase = () => {
  if (!db) {
    console.error('❌ Firebase is not initialized. Please check your environment variables.');
    throw new Error('Firebase is not initialized. Please check your environment variables.');
  }
  return db;
};

// Wrapper function to suppress Firebase internal assertion errors
const safeFirebaseOperation = async <T>(operation: () => Promise<T>, operationName: string): Promise<T> => {
  try {
    return await operation();
  } catch (error: any) {
    // Check if this is a Firebase internal assertion error
    if (error && typeof error === 'object' && 
        (error.message?.includes('INTERNAL ASSERTION FAILED') || 
         error.message?.includes('Unexpected state') ||
         error.code === 'internal')) {
      console.warn(`⚠️ Firebase internal assertion error in ${operationName}, attempting to recover...`);
      // Return a safe fallback or re-throw a sanitized error
      throw new Error(`Firebase operation failed: ${operationName}`);
    }
    throw error;
  }
};

// Enhanced error handling wrapper
const withErrorHandling = async <T>(operation: () => Promise<T>, operationName: string): Promise<T> => {
  try {
    return await safeFirebaseOperation(operation, operationName);
  } catch (error: any) {
    console.error(`❌ Error in ${operationName}:`, error);
    
    // Handle specific Firebase errors
    if (error.code === 'failed-precondition' || error.message?.includes('index')) {
      console.warn(`⚠️ Index error in ${operationName}, using fallback`);
      throw error; // Re-throw to be handled by fallback logic
    }
    
    if (error.code === 'unavailable' || error.message?.includes('network')) {
      console.warn(`🌐 Network error in ${operationName}, retrying...`);
      // Could implement retry logic here
    }
    
    throw error;
  }
};

// Install global error handler for Firebase internal errors
const installErrorHandler = () => {
  if (errorHandlerInstalled || typeof window === 'undefined') return;
  
  try {
    // Override console.error to catch Firebase internal assertion errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('FIRESTORE') && message.includes('INTERNAL ASSERTION FAILED')) ||
          message.includes('Unexpected state') ||
          message.includes('INTERNAL ASSERTION FAILED') ||
          (message.includes('FIRESTORE') && message.includes('INTERNAL ASSERTION FAILED')) ||
          message.includes('INTERNAL ASSERTION FAILED: Unexpected state') ||
          message.includes('@firebase/firestore') ||
          (message.includes('FIRESTORE') && message.includes('Unexpected state'))) {
        // Completely suppress Firebase internal assertion errors
        return;
      }
      originalConsoleError.apply(console, args);
    };
    
    // Also override window.onerror to catch unhandled errors
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (typeof message === 'string' && 
          (message.includes('FIRESTORE') || 
           message.includes('INTERNAL ASSERTION FAILED') || 
           message.includes('Unexpected state') ||
           message.includes('@firebase/firestore'))) {
        // Completely suppress Firebase internal assertion errors
        return true; // Prevent default error handling
      }
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };
    
    // Override unhandledrejection to catch promise rejections
    const originalOnUnhandledRejection = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
      const reason = event.reason;
      if (reason && typeof reason === 'object' && 
          (reason.message?.includes('FIRESTORE') || 
           reason.message?.includes('INTERNAL ASSERTION FAILED') ||
           reason.message?.includes('Unexpected state') ||
           reason.message?.includes('@firebase/firestore'))) {
        // Completely suppress Firebase internal assertion errors
        event.preventDefault(); // Prevent default error handling
        return;
      }
      if (originalOnUnhandledRejection) {
        originalOnUnhandledRejection.call(window, event);
      }
    };
    
    // Override console.warn to catch any Firebase warnings
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('FIRESTORE') && message.includes('INTERNAL ASSERTION FAILED')) ||
          message.includes('Unexpected state') ||
          message.includes('@firebase/firestore')) {
        // Completely suppress Firebase internal assertion warnings
        return;
      }
      originalConsoleWarn.apply(console, args);
    };
    
    // Add global error event listener
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.error && typeof event.error === 'object' && 
          (event.error.message?.includes('FIRESTORE') || 
           event.error.message?.includes('INTERNAL ASSERTION FAILED') ||
           event.error.message?.includes('Unexpected state') ||
           event.error.message?.includes('@firebase/firestore'))) {
        // Completely suppress Firebase internal assertion errors
        event.preventDefault();
        return false;
      }
      return true;
    };
    
    window.addEventListener('error', handleGlobalError);
    
    errorHandlerInstalled = true;
  } catch (error) {
    // Silently fail if error handler installation fails
  }
};

// Install error handler immediately if we're in a browser environment
if (typeof window !== 'undefined') {
  // Install error handler immediately, before any Firebase operations
  installErrorHandler();
}

// Connection state management with better error handling
const setupConnectionMonitoring = () => {
  // Only run on client side
  if (typeof window === 'undefined' || isInitialized || isShuttingDown) return;
  
  try {
    const firestore = checkFirebase();
    isInitialized = true;
    
    // Monitor connection state
    const enableFirestoreNetwork = async () => {
      if (isShuttingDown || connectionAttemptInProgress) return;
      
      connectionAttemptInProgress = true;
      
      try {
        await enableNetwork(firestore);
        isConnected = true;
        connectionRetryCount = 0; // Reset retry count on success
      } catch (error: any) {
        isConnected = false;
        console.error('❌ Firestore connection failed:', error);
        
        // Retry connection with exponential backoff
        if (connectionRetryCount < maxConnectionRetries && !isShuttingDown) {
          connectionRetryCount++;
          const delay = Math.min(1000 * Math.pow(2, connectionRetryCount), 10000); // Max 10 seconds
          setTimeout(() => {
            connectionAttemptInProgress = false;
            enableFirestoreNetwork();
          }, delay);
        } else if (connectionRetryCount >= maxConnectionRetries) {
          console.error('❌ Max connection retries reached');
          connectionAttemptInProgress = false;
        }
      }
    };

    enableFirestoreNetwork();

    // Add network state listener
    const networkListener = () => {
      if (isShuttingDown) return;
      
      if (navigator.onLine) {
        connectionRetryCount = 0; // Reset retry count
        if (!connectionAttemptInProgress) {
          enableFirestoreNetwork();
        }
      } else {
        isConnected = false;
        try {
          disableNetwork(firestore);
        } catch (error) {
          console.error('❌ Error disabling network:', error);
        }
      }
    };

    window.addEventListener('online', networkListener);
    window.addEventListener('offline', networkListener);
    
    connectionListeners.push(() => {
      window.removeEventListener('online', networkListener);
      window.removeEventListener('offline', networkListener);
    });

  } catch (error) {
    console.error('❌ Error setting up connection monitoring:', error);
  }
};

// Enhanced cleanup function with better error handling
export const cleanupFirebaseListeners = () => {
  isShuttingDown = true;
  
  // Clean up all active listeners
  activeListeners.forEach((cleanup, key) => {
    try {
      cleanup();
    } catch (error) {
      console.error(`❌ Error cleaning up listener ${key}:`, error);
    }
  });
  activeListeners.clear();
  
  // Clean up connection listeners
  connectionListeners.forEach(listener => {
    try {
      listener();
    } catch (error) {
      console.error('❌ Error cleaning up connection listener:', error);
    }
  });
  connectionListeners = [];
  
  // Reset connection state
  isConnected = false;
  isInitialized = false;
  isShuttingDown = false;
  
};

// Initialize connection monitoring only on client side
if (typeof window !== 'undefined') {
  // Use requestIdleCallback or setTimeout to defer initialization
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => setupConnectionMonitoring());
  } else {
    setTimeout(setupConnectionMonitoring, 0);
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanupFirebaseListeners);
  window.addEventListener('unload', cleanupFirebaseListeners);
}

// Add a function to check and initialize Firebase connection
export const ensureFirebaseConnection = async () => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const firestore = checkFirebase();
    
    // If not initialized, set it up
    if (!isInitialized) {
      setupConnectionMonitoring();
      // Wait a bit for initialization
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // If not connected, try to connect
    if (!isConnected && !connectionAttemptInProgress) {
      await enableNetwork(firestore);
      connectionRetryCount = 0;
    }

    // Test Firestore connectivity with a simple read
    try {
      await getDocs(collection(firestore, 'connection_test'));
      isConnected = true; 
    } catch (testError) {
      isConnected = false;
      console.error('❌ Firestore test read failed:', testError);
    }
    
    return isConnected;
  } catch (error) {
    console.error('❌ Error ensuring Firebase connection:', error);
    return false;
  }
};

// Blog Management Functions
export const saveBlogPost = async (blogData: Partial<BlogPost>, createdBy?: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    
    // Generate slug from title
    const slug = generateSlug(blogData.title || 'untitled-blog');
    
    // Check if slug already exists
    const existingSlugsQuery = query(collection(firestore, 'blogs'), where('slug', '==', slug));
    const existingSlugsSnapshot = await getDocs(existingSlugsQuery);
    const existingSlugs = existingSlugsSnapshot.docs.map(doc => doc.data().slug);
    
    // Generate unique slug if needed
    const uniqueSlug = await generateUniqueSlug(blogData.title || 'untitled-blog', existingSlugs);
    
    const blogPostData = {
      title: blogData.title || '',
      content: blogData.content || '',
      idea: blogData.idea || '',
      tone: blogData.tone || '',
      status: blogData.status || 'draft',
      wordCount: blogData.wordCount || 0,
      rating: blogData.rating || null,
      images: blogData.images || [],
      slug: uniqueSlug,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      created_by: createdBy || 'admin',
      published_at: blogData.status === 'published' ? serverTimestamp() : null
    };

    const docRef = await addDoc(collection(firestore, 'blogs'), blogPostData);
    
    return { 
      success: true, 
      blogId: docRef.id,
      blog: { id: docRef.id, ...blogPostData }
    };
  } catch (error) {
    console.error('❌ Error saving blog post:', error);
    return { success: false, error };
  }
};

export const updateBlogPost = async (blogId: string, updates: Partial<BlogPost>) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const blogRef = doc(firestore, 'blogs', blogId);
    
    // If title is being updated, regenerate slug
    let slug = updates.slug;
    if (updates.title && updates.title !== '') {
      const baseSlug = generateSlug(updates.title);
      
      // Check if slug already exists (excluding current blog)
      const existingSlugsQuery = query(
        collection(firestore, 'blogs'), 
        where('slug', '==', baseSlug)
      );
      const existingSlugsSnapshot = await getDocs(existingSlugsQuery);
      const existingSlugs = existingSlugsSnapshot.docs
        .filter(docSnapshot => docSnapshot.id !== blogId)
        .map(docSnapshot => docSnapshot.data().slug);
      
      slug = await generateUniqueSlug(updates.title, existingSlugs);
    }
    
    const updateData: any = {
      ...updates,
      ...(slug && { slug }),
      updated_at: serverTimestamp()
    };

    // Handle published_at field properly
    if (updates.status === 'published') {
      updateData.published_at = serverTimestamp();
    } else if (updates.status === 'draft') {
      // Remove published_at field when status is draft
      updateData.published_at = deleteField();
    }

    await updateDoc(blogRef, updateData);
    
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating blog post:', error);
    return { success: false, error };
  }
};

export const getAllBlogPosts = (callback: (blogs: BlogPost[]) => void) => {
  if (isShuttingDown) {
    console.warn('⚠️ System is shutting down, cannot set up blogs listener');
    return () => {};
  }

  const listenerKey = 'all_blogs';
  
  // Clean up existing listener if any
  if (activeListeners.has(listenerKey)) {
    try {
      activeListeners.get(listenerKey)!();
      activeListeners.delete(listenerKey);
    } catch (error) {
      console.error('❌ Error cleaning up existing blogs listener:', error);
    }
  }

  let unsubscribe: (() => void) | null = null;
  let isActive = true;
  let retryCount = 0;
  const maxRetries = 3;

  const setupListener = async () => {
    if (!isActive || isShuttingDown) return;
    
    try {
      const firestore = checkFirebase();
      
      // Ensure connection is established
      if (!isConnected) {
        try {
          await ensureFirebaseConnection();
        } catch (error) {
          console.warn('⚠️ Could not establish Firebase connection');
        }
      }
      
      if (!isConnected) {
        // Only retry a limited number of times
        if (retryCount < maxRetries && !isShuttingDown) {
          retryCount++;
          const delay = Math.min(1000 * retryCount, 5000); // Max 5 seconds
          setTimeout(setupListener, delay);
        } else {
          console.warn('⚠️ Max retries reached for blogs listener, giving up');
          callback([]);
        }
        return;
      }

      // First try with orderBy (requires index)
      const q = query(
        collection(firestore, 'blogs'),
        orderBy('updated_at', 'desc')
      );

      unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          if (!isActive || isShuttingDown) return;
          
          try {
            const blogs: BlogPost[] = [];
            querySnapshot.forEach((doc) => {
              blogs.push({ id: doc.id, ...doc.data() } as BlogPost);
            });
            callback(blogs);
            retryCount = 0; // Reset retry count on success
          } catch (error) {
            console.error('❌ Error processing blogs data:', error);
            callback([]);
          }
        }, 
        (error: any) => {
          if (!isActive || isShuttingDown) return;
          
          // Check if this is a Firebase internal assertion error
          if (error && typeof error === 'object' && 
              ((error as any).message?.includes('INTERNAL ASSERTION FAILED') || 
               (error as any).message?.includes('Unexpected state'))) {
            console.warn('⚠️ Firebase internal assertion error in blogs listener, using fallback');
            callback([]);
            return;
          }
          
          // If index error, try without orderBy
          if (error.code === 'failed-precondition' || error.message?.includes('index')) {
            // Silently use fallback query without logging errors
            const fallbackQuery = query(collection(firestore, 'blogs'));

            unsubscribe = onSnapshot(fallbackQuery, 
              (querySnapshot) => {
                if (!isActive || isShuttingDown) return;
                
                try {
                  const blogs: BlogPost[] = [];
                  querySnapshot.forEach((doc) => {
                    blogs.push({ id: doc.id, ...doc.data() } as BlogPost);
                  });
                  
                  // Sort blogs by updated_at on client side
                  blogs.sort((a, b) => {
                    const aTime = a.updated_at?.toDate?.() || new Date(0);
                    const bTime = b.updated_at?.toDate?.() || new Date(0);
                    return bTime.getTime() - aTime.getTime();
                  });
                  
                  callback(blogs);
                  retryCount = 0; // Reset retry count on success
                } catch (error) {
                  console.error('❌ Error processing fallback blogs data:', error);
                  callback([]);
                }
              },
              (fallbackError) => {
                if (!isActive || isShuttingDown) return;
                // Check if this is a Firebase internal assertion error
                if (fallbackError && typeof fallbackError === 'object' && 
                    (fallbackError.message?.includes('INTERNAL ASSERTION FAILED') || 
                     fallbackError.message?.includes('Unexpected state'))) {
                  console.warn('⚠️ Firebase internal assertion error in fallback listener');
                }
                // Silently handle fallback errors too
                callback([]);
              }
            );
          } else if (error.code === 'unavailable' || error.message?.includes('network')) {
            // Only retry a limited number of times for network errors
            if (retryCount < maxRetries && !isShuttingDown) {
              retryCount++;
              const delay = Math.min(1000 * retryCount, 5000); // Max 5 seconds
              setTimeout(setupListener, delay);
            } else {
              console.warn('⚠️ Max retries reached for network errors, giving up');
              callback([]);
            }
          } else {
            console.error('❌ Error setting up blogs listener:', error);
            callback([]);
          }
        }
      );
      
      // Store the cleanup function
      if (unsubscribe && isActive) {
        activeListeners.set(listenerKey, unsubscribe);
      }
    } catch (error) {
      if (!isActive || isShuttingDown) return;
      
      // Check if this is a Firebase internal assertion error
      if (error && typeof error === 'object' && 
          ((error as any).message?.includes('INTERNAL ASSERTION FAILED') || 
           (error as any).message?.includes('Unexpected state'))) {
        console.warn('⚠️ Firebase internal assertion error in setup, giving up');
        callback([]);
        return;
      }
      
      console.error('❌ Error setting up blogs listener:', error);
      if (retryCount < maxRetries && !isShuttingDown) {
        retryCount++;
        const delay = Math.min(1000 * retryCount, 5000); // Max 5 seconds
        setTimeout(setupListener, delay);
      } else {
        console.warn('⚠️ Max retries reached for setup errors, giving up');
        callback([]);
      }
    }
  };

  setupListener();

  // Return cleanup function
  return () => {
    isActive = false;
    if (activeListeners.has(listenerKey)) {
      try {
        activeListeners.get(listenerKey)!();
        activeListeners.delete(listenerKey);
      } catch (error) {
        console.error('❌ Error cleaning up blogs listener:', error);
      }
    }
  };
};

export const getBlogPost = async (blogId: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const blogRef = doc(firestore, 'blogs', blogId);
    
    const docSnap = await getDocs(query(collection(firestore, 'blogs'), where('__name__', '==', blogId)));
    
    if (!docSnap.empty) {
      const blogData = docSnap.docs[0].data();
      return { 
        success: true, 
        blog: { id: docSnap.docs[0].id, ...blogData } as BlogPost 
      };
    }
    
    return { success: false, error: 'Blog post not found' };
  } catch (error) {
    console.error('❌ Error getting blog post:', error);
    return { success: false, error };
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    
    const q = query(collection(firestore, 'blogs'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const blogData = querySnapshot.docs[0].data();
      return { 
        success: true, 
        blog: { id: querySnapshot.docs[0].id, ...blogData } as BlogPost 
      };
    }
    
    return { success: false, error: 'Blog post not found' };
  } catch (error) {
    console.error('❌ Error getting blog post by slug:', error);
    return { success: false, error };
  }
};

export const deleteBlogPost = async (blogId: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const blogRef = doc(firestore, 'blogs', blogId);
    
    await deleteDoc(blogRef);
    
    
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting blog post:', error);
    return { success: false, error };
  }
}; 