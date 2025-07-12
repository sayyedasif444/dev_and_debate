import { 
  doc, 
  getDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface AdminUser {
  email: string;
  password?: string;
  role?: string;
  created_at?: any;
}

// Admin authentication function
export const authenticateAdmin = async (email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> => {
  try {
    const firestore = db;
    if (!firestore) {
      return { success: false, error: 'Firebase not initialized' };
    }

    // Query the auth collection for the provided email
    const authQuery = query(
      collection(firestore, 'auth'),
      where('email', '==', email.toLowerCase())
    );

    const querySnapshot = await getDocs(authQuery);
    
    if (querySnapshot.empty) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Get the first matching document
    const authDoc = querySnapshot.docs[0];
    const authData = authDoc.data() as AdminUser;

    // Check if password matches
    if (authData.password !== password) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Return success with user data (excluding password for security)
    const userData: AdminUser = {
      email: authData.email,
      role: authData.role || 'admin',
      created_at: authData.created_at
    };

    return { success: true, user: userData };
  } catch (error: any) {
    console.error('❌ Error authenticating admin:', error);
    return { 
      success: false, 
      error: error.message || 'Authentication failed' 
    };
  }
};

// Check if admin is authenticated (from localStorage)
export const checkAdminAuth = (): { isAuthenticated: boolean; email?: string } => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false };
  }

  try {
    const adminData = localStorage.getItem('admin_data');
    if (!adminData) {
      return { isAuthenticated: false };
    }

    const parsedData = JSON.parse(adminData);
    if (!parsedData.email || !parsedData.authenticated) {
      return { isAuthenticated: false };
    }

    return { 
      isAuthenticated: true, 
      email: parsedData.email 
    };
  } catch (error) {
    console.error('❌ Error checking admin auth:', error);
    return { isAuthenticated: false };
  }
};

// Store admin authentication data
export const storeAdminAuth = (email: string, userData: AdminUser) => {
  if (typeof window === 'undefined') return;

  try {
    const authData = {
      email: email.toLowerCase(),
      authenticated: true,
      userData: {
        email: userData.email,
        role: userData.role,
        created_at: userData.created_at
      },
      authenticatedAt: new Date().toISOString()
    };

    localStorage.setItem('admin_data', JSON.stringify(authData));
  } catch (error) {
    console.error('❌ Error storing admin auth:', error);
  }
};

// Clear admin authentication data
export const clearAdminAuth = () => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('admin_data');
    localStorage.removeItem('admin_email'); // Remove old format if exists
  } catch (error) {
    console.error('❌ Error clearing admin auth:', error);
  }
};

// Get admin user data
export const getAdminUserData = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;

  try {
    const adminData = localStorage.getItem('admin_data');
    if (!adminData) return null;

    const parsedData = JSON.parse(adminData);
    return parsedData.userData || null;
  } catch (error) {
    console.error('❌ Error getting admin user data:', error);
    return null;
  }
}; 