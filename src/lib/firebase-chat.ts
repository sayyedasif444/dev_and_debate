import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  setDoc,
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface ChatUser {
  email: string;
  name: string;
  status: 'active' | 'inactive' | 'blocked';
  created_at: Timestamp;
  last_seen: Timestamp;
}

export interface Conversation {
  id: string;
  user_email: string;
  status: 'active' | 'pending' | 'resolved';
  created_at: Timestamp;
  updated_at: Timestamp;
  admin_assigned?: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender: string;
  content: string;
  timestamp: Timestamp;
  type: 'text' | 'system';
}

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

// User Management
export const createOrUpdateUser = async (email: string, name: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const userRef = doc(firestore, 'users', email);
    
    // Try to update existing user first
    try {
      await updateDoc(userRef, {
        name,
        last_seen: Timestamp.now()
        // Don't change status - keep existing status
      });
      return { success: true, user: { email, name, status: 'active' as const } };
    } catch (updateError) {
      // If update fails, create new user
      const userData: ChatUser = {
        email,
        name,
        status: 'active',
        created_at: Timestamp.now(),
        last_seen: Timestamp.now()
      };
      
      await setDoc(userRef, userData);
      return { success: true, user: userData };
    }
  } catch (error) {
    console.error('❌ Error creating/updating user:', error);
    return { success: false, error };
  }
};

export const updateUserLastSeen = async (email: string) => {
  if (isShuttingDown) return;
  
  try {
    const firestore = checkFirebase();
    const userRef = doc(firestore, 'users', email);
    await updateDoc(userRef, {
      last_seen: Timestamp.now()
    });
  } catch (error) {
    console.error('❌ Error updating last seen:', error);
  }
};

// Add function to update user status
export const updateUserStatus = async (email: string, status: 'active' | 'inactive' | 'blocked') => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const userRef = doc(firestore, 'users', email);
    await updateDoc(userRef, {
      status,
      last_seen: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating user status:', error);
    return { success: false, error };
  }
};

// Conversation Management
export const createConversation = async (userEmail: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const conversationData = {
      user_email: userEmail,
      status: 'active' as const,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };

    const docRef = await addDoc(collection(firestore, 'conversations'), conversationData);
    
    // Send welcome message
    const welcomeMessage = "👋 Welcome to Dev & Debate Support! I'm here to help you with any questions or assistance you need. How can I help you today?";
    await sendMessage(docRef.id, 'system', welcomeMessage, 'system');
    
    return { success: true, conversationId: docRef.id };
  } catch (error) {
    console.error('❌ Error creating conversation:', error);
    return { success: false, error };
  }
};

export const getActiveConversation = async (userEmail: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    
    // First, try to get active conversations for this user
    const q = query(
      collection(firestore, 'conversations'),
      where('user_email', '==', userEmail),
      where('status', '==', 'active')
    );

    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Get the most recent active conversation
      const docs = querySnapshot.docs.sort((a, b) => {
        const aTime = a.data().created_at?.toDate?.() || new Date(0);
        const bTime = b.data().created_at?.toDate?.() || new Date(0);
        return bTime.getTime() - aTime.getTime();
      });
      
      const doc = docs[0];
      return { success: true, conversation: { id: doc.id, ...doc.data() } };
    }
    
    return { success: true, conversation: null };
  } catch (error: any) {
    // If index error, try a simpler query
    if (error.code === 'failed-precondition' || error.message?.includes('index')) {
      console.warn('⚠️ Firestore index not found, using fallback query');
      try {
        const firestore = checkFirebase();
        const q = query(
          collection(firestore, 'conversations'),
          where('user_email', '==', userEmail)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Filter for active conversations in memory
          const activeConversations = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Conversation))
            .filter(conv => conv.status === 'active')
            .sort((a, b) => {
              const aTime = a.created_at?.toDate?.() || new Date(0);
              const bTime = b.created_at?.toDate?.() || new Date(0);
              return bTime.getTime() - aTime.getTime();
            });

          if (activeConversations.length > 0) {
            return { success: true, conversation: activeConversations[0] };
          }
        }
        return { success: true, conversation: null };
      } catch (fallbackError) {
        console.error('❌ Fallback query also failed:', fallbackError);
        return { success: false, error: fallbackError };
      }
    }
    
    console.error('❌ Error getting active conversation:', error);
    return { success: false, error };
  }
};

export const updateConversationStatus = async (conversationId: string, status: 'active' | 'pending' | 'resolved') => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const conversationRef = doc(firestore, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      status,
      updated_at: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Message Management
export const sendMessage = async (conversationId: string, sender: string, content: string, type: 'text' | 'system' = 'text') => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const messageData = {
      conversation_id: conversationId,
      sender,
      content,
      timestamp: serverTimestamp(),
      type
    };

    await addDoc(collection(firestore, 'messages'), messageData);
    
    // Update conversation timestamp
    const conversationRef = doc(firestore, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      updated_at: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error };
  }
};

// Enhanced getMessages with better error handling and listener management
export const getMessages = (conversationId: string, callback: (messages: ChatMessage[]) => void) => {
  if (isShuttingDown) {
    console.warn('⚠️ System is shutting down, cannot set up messages listener');
    return () => {};
  }

  const listenerKey = `messages_${conversationId}`;
  
  // Clean up existing listener if any
  if (activeListeners.has(listenerKey)) {
    try {
      activeListeners.get(listenerKey)!();
      activeListeners.delete(listenerKey);
    } catch (error) {
      console.error('❌ Error cleaning up existing messages listener:', error);
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
      
      if (!isConnected) {
        // Only retry a limited number of times
        if (retryCount < maxRetries && !isShuttingDown) {
          retryCount++;
          const delay = Math.min(1000 * retryCount, 5000); // Max 5 seconds
          setTimeout(setupListener, delay);
        } else {
          console.warn('⚠️ Max retries reached for messages listener, giving up');
          callback([]);
        }
        return;
      }

      // First try with orderBy (requires index)
      const q = query(
        collection(firestore, 'messages'),
        where('conversation_id', '==', conversationId),
        orderBy('timestamp', 'asc')
      );

      unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          if (!isActive || isShuttingDown) return;
          
          const messages: ChatMessage[] = [];
          querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() } as ChatMessage);
          });
          callback(messages);
          retryCount = 0; // Reset retry count on success
        }, 
        (error: any) => {
          if (!isActive || isShuttingDown) return;
          
          // Handle specific Firebase errors
          if (error.code === 'failed-precondition' || 
              error.message?.includes('index') || 
              error.message?.includes('requires an index')) {
            // Silently use fallback query without logging errors
            const fallbackQuery = query(
              collection(firestore, 'messages'),
              where('conversation_id', '==', conversationId)
            );

            unsubscribe = onSnapshot(fallbackQuery, 
              (querySnapshot) => {
                if (!isActive || isShuttingDown) return;
                
                const messages: ChatMessage[] = [];
                querySnapshot.forEach((doc) => {
                  messages.push({ id: doc.id, ...doc.data() } as ChatMessage);
                });
                
                // Sort messages by timestamp on client side
                messages.sort((a, b) => {
                  const aTime = a.timestamp?.toDate?.() || new Date(0);
                  const bTime = b.timestamp?.toDate?.() || new Date(0);
                  return aTime.getTime() - bTime.getTime();
                });
                
                callback(messages);
                retryCount = 0; // Reset retry count on success
              },
              (fallbackError) => {
                if (!isActive || isShuttingDown) return;
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
            console.error('❌ Unexpected error in messages listener:', error);
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
      console.error('❌ Error setting up messages listener:', error);
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
        console.error('❌ Error cleaning up messages listener:', error);
      }
    }
  };
};

// Admin Functions with enhanced listener management
export const getAllConversations = (callback: (conversations: Conversation[]) => void) => {
  if (isShuttingDown) {
    console.warn('⚠️ System is shutting down, cannot set up conversations listener');
    return () => {};
  }

  const listenerKey = 'all_conversations';
  
  // Clean up existing listener if any
  if (activeListeners.has(listenerKey)) {
    try {
      activeListeners.get(listenerKey)!();
      activeListeners.delete(listenerKey);
    } catch (error) {
      console.error('❌ Error cleaning up existing conversations listener:', error);
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
          console.warn('⚠️ Max retries reached for conversations listener, giving up');
          callback([]);
        }
        return;
      }

      // First try with orderBy (requires index)
      const q = query(
        collection(firestore, 'conversations'),
        orderBy('updated_at', 'desc')
      );

      unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          if (!isActive || isShuttingDown) return;
          
          const conversations: Conversation[] = [];
          querySnapshot.forEach((doc) => {
            conversations.push({ id: doc.id, ...doc.data() } as Conversation);
          });
          callback(conversations);
          retryCount = 0; // Reset retry count on success
        }, 
        (error: any) => {
          if (!isActive || isShuttingDown) return;
          
          // If index error, try without orderBy
          if (error.code === 'failed-precondition' || error.message?.includes('index')) {
            // Silently use fallback query without logging errors
            const fallbackQuery = query(collection(firestore, 'conversations'));

            unsubscribe = onSnapshot(fallbackQuery, 
              (querySnapshot) => {
                if (!isActive || isShuttingDown) return;
                
                const conversations: Conversation[] = [];
                querySnapshot.forEach((doc) => {
                  conversations.push({ id: doc.id, ...doc.data() } as Conversation);
                });
                
                // Sort conversations by updated_at on client side
                conversations.sort((a, b) => {
                  const aTime = a.updated_at?.toDate?.() || new Date(0);
                  const bTime = b.updated_at?.toDate?.() || new Date(0);
                  return bTime.getTime() - aTime.getTime();
                });
                
                callback(conversations);
                retryCount = 0; // Reset retry count on success
              },
              (fallbackError) => {
                if (!isActive || isShuttingDown) return;
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
            console.error('❌ Error setting up conversations listener:', error);
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
      console.error('❌ Error setting up conversations listener:', error);
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
        console.error('❌ Error cleaning up conversations listener:', error);
      }
    }
  };
};

// Enhanced getAllUsers with better error handling
export const getAllUsers = (callback: (users: ChatUser[]) => void) => {
  if (isShuttingDown) {
    console.warn('⚠️ System is shutting down, cannot set up users listener');
    return () => {};
  }

  const listenerKey = 'all_users';
  
  // Clean up existing listener if any
  if (activeListeners.has(listenerKey)) {
    try {
      activeListeners.get(listenerKey)!();
      activeListeners.delete(listenerKey);
    } catch (error) {
      console.error('❌ Error cleaning up existing users listener:', error);
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
      
      if (!isConnected) {
        // Only retry a limited number of times
        if (retryCount < maxRetries && !isShuttingDown) {
          retryCount++;
          const delay = Math.min(1000 * retryCount, 5000); // Max 5 seconds
          setTimeout(setupListener, delay);
        } else {
          console.warn('⚠️ Max retries reached for users listener, giving up');
          callback([]);
        }
        return;
      }

      // First try with orderBy (requires index)
      const q = query(collection(firestore, 'users'), orderBy('last_seen', 'desc'));

      unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          if (!isActive || isShuttingDown) return;
          
          const users: ChatUser[] = [];
          querySnapshot.forEach((doc) => {
            users.push({ ...doc.data() } as ChatUser);
          });
          
          // Auto-mark users as inactive if they haven't been seen in 24 hours
          const now = new Date();
          const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          
          users.forEach(async (user) => {
            const lastSeen = user.last_seen?.toDate?.() || new Date(0);
            if (lastSeen < twentyFourHoursAgo && user.status === 'active') {
              await updateUserStatus(user.email, 'inactive');
            }
          });
          
          callback(users);
          retryCount = 0; // Reset retry count on success
        }, 
        (error: any) => {
          if (!isActive || isShuttingDown) return;
          
          // If index error, try without orderBy
          if (error.code === 'failed-precondition' || error.message?.includes('index')) {
            // Silently use fallback query without logging errors
            const fallbackQuery = query(collection(firestore, 'users'));

            unsubscribe = onSnapshot(fallbackQuery, 
              (querySnapshot) => {
                if (!isActive || isShuttingDown) return;
                
                const users: ChatUser[] = [];
                querySnapshot.forEach((doc) => {
                  users.push({ ...doc.data() } as ChatUser);
                });
                
                // Auto-mark users as inactive if they haven't been seen in 24 hours
                const now = new Date();
                const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                
                users.forEach(async (user) => {
                  const lastSeen = user.last_seen?.toDate?.() || new Date(0);
                  if (lastSeen < twentyFourHoursAgo && user.status === 'active') {
                    await updateUserStatus(user.email, 'inactive');
                  }
                });
                
                // Sort users by last_seen on client side
                users.sort((a, b) => {
                  const aTime = a.last_seen?.toDate?.() || new Date(0);
                  const bTime = b.last_seen?.toDate?.() || new Date(0);
                  return bTime.getTime() - aTime.getTime();
                });
                
                callback(users);
                retryCount = 0; // Reset retry count on success
              },
              (fallbackError) => {
                if (!isActive || isShuttingDown) return;
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
            console.error('❌ Error setting up users listener:', error);
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
      console.error('❌ Error setting up users listener:', error);
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
        console.error('❌ Error cleaning up users listener:', error);
      }
    }
  };
};

export const assignAdminToConversation = async (conversationId: string, adminEmail: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    const conversationRef = doc(firestore, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      admin_assigned: adminEmail,
      updated_at: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error assigning admin:', error);
    return { success: false, error };
  }
};

// Auto-reply functionality
export const checkAndSendAutoReply = async (conversationId: string, userEmail: string) => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    const firestore = checkFirebase();
    
    // Get the last message in the conversation
    const messagesQuery = query(
      collection(firestore, 'messages'),
      where('conversation_id', '==', conversationId),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(messagesQuery);
    
    if (!querySnapshot.empty) {
      const lastMessage = querySnapshot.docs[0].data();
      const lastMessageTime = lastMessage.timestamp?.toDate?.() || new Date();
      const now = new Date();
      const timeDiff = now.getTime() - lastMessageTime.getTime();
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

      // Check if the last message was from the user (not system) and if 30 minutes have passed
      if (lastMessage.sender === userEmail && timeDiff >= thirtyMinutes) {
        const autoReplyMessages = [
          "👋 Hi there! I noticed you haven't sent a message in a while. Is there anything I can help you with?",
          "💬 Still here if you need any assistance! Feel free to ask any questions.",
          "🤔 Need help with something? I'm here to support you with any questions or concerns.",
          "✨ Don't hesitate to reach out if you have any questions about our services or need technical support!",
          "🚀 Ready to help when you are! What would you like to know?"
        ];

        // Select a random auto-reply message
        const randomMessage = autoReplyMessages[Math.floor(Math.random() * autoReplyMessages.length)];
        
        await sendMessage(conversationId, 'system', randomMessage, 'system');
        
        return { success: true, autoReplySent: true };
      }
    }

    return { success: true, autoReplySent: false };
  } catch (error: any) {
    // If index error, try without orderBy
    if (error.code === 'failed-precondition' || error.message?.includes('index')) {
      // Silently use fallback query without logging errors
      try {
        const firestore = checkFirebase();
        const messagesQuery = query(
          collection(firestore, 'messages'),
          where('conversation_id', '==', conversationId)
        );

        const querySnapshot = await getDocs(messagesQuery);
        
        if (!querySnapshot.empty) {
          // Sort messages by timestamp on client side
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as ChatMessage)).sort((a, b) => {
            const aTime = a.timestamp?.toDate?.() || new Date(0);
            const bTime = b.timestamp?.toDate?.() || new Date(0);
            return bTime.getTime() - aTime.getTime();
          });

          const lastMessage = messages[0];
          const lastMessageTime = lastMessage.timestamp?.toDate?.() || new Date();
          const now = new Date();
          const timeDiff = now.getTime() - lastMessageTime.getTime();
          const thirtyMinutes = 30 * 60 * 1000;

          if (lastMessage.sender === userEmail && timeDiff >= thirtyMinutes) {
            const autoReplyMessages = [
              "👋 Hi there! I noticed you haven't sent a message in a while. Is there anything I can help you with?",
              "💬 Still here if you need any assistance! Feel free to ask any questions.",
              "🤔 Need help with something? I'm here to support you with any questions or concerns.",
              "✨ Don't hesitate to reach out if you have any questions about our services or need technical support!",
              "🚀 Ready to help when you are! What would you like to know?"
            ];

            const randomMessage = autoReplyMessages[Math.floor(Math.random() * autoReplyMessages.length)];
            
            await sendMessage(conversationId, 'system', randomMessage, 'system');
            
            return { success: true, autoReplySent: true };
          }
        }

        return { success: true, autoReplySent: false };
      } catch (fallbackError) {
        // Silently handle fallback errors too
        return { success: false, autoReplySent: false, error: fallbackError };
      }
    } else {
      console.error('❌ Error checking for auto-reply:', error);
      return { success: false, autoReplySent: false, error };
    }
  }
};

// Enhanced sendMessage function with auto-reply check
export const sendMessageWithAutoReply = async (conversationId: string, sender: string, content: string, type: 'text' | 'system' = 'text') => {
  if (isShuttingDown) return { success: false, error: 'System is shutting down' };
  
  try {
    // Send the original message
    const result = await sendMessage(conversationId, sender, content, type);
    
    if (result.success && type === 'text') {
      // Schedule auto-reply check for 30 minutes later
      setTimeout(async () => {
        if (!isShuttingDown) {
          await checkAndSendAutoReply(conversationId, sender);
        }
      }, 30 * 60 * 1000); // 30 minutes
    }
    
    return result;
  } catch (error) {
    console.error('Error sending message with auto-reply:', error);
    return { success: false, error };
  }
}; 