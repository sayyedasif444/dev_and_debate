import { useState, useEffect } from 'react';
import { authenticateAdmin, checkAdminAuth, storeAdminAuth, clearAdminAuth, getAdminUserData, AdminUser } from '@/lib/firebase-auth';

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for admin session in localStorage
    const checkAdminSession = () => {
      try {
        const authCheck = checkAdminAuth();
        if (authCheck.isAuthenticated) {
          const userData = getAdminUserData();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error checking admin auth:', error);
        clearAdminAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Use the existing Firebase auth system
      const result = await authenticateAdmin(email, password);
      
      if (result.success && result.user) {
        // Store the authentication data
        storeAdminAuth(email, result.user);
        setUser(result.user);
        return result.user;
      } else {
        throw new Error(result.error || 'Authentication failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      clearAdminAuth();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signOut
  };
} 