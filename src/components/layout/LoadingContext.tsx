'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Preloader from '@/components/common/Preloader';

// Create context
type LoadingContextType = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

// Hook to use the loading context
export const useLoading = () => useContext(LoadingContext);

// Provider component
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const pathname = usePathname();
  
  // Initial loading effect - only runs once when the site is loaded/reloaded
  useEffect(() => {
    // Check if this is a hard refresh or initial page load
    const pageAccessedByReload = (
      (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => (nav as any).type)
        .includes('reload')
    );
    
    // Either it's the first load or an actual reload
    if (pageAccessedByReload || sessionStorage.getItem('firstLoad') !== 'done') {
      // This is either a reload or first visit - show the loader
      setIsLoading(true);
      
      // Mark that first load has happened
      sessionStorage.setItem('firstLoad', 'done');
      
      // Auto hide the loader after 2.5 seconds
      const timer = setTimeout(() => {
        stopLoading();
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      // Not a reload - don't show loader
      setIsLoading(false);
    }
  }, []);
  
  const startLoading = () => {
    setIsLoading(true);
    document.body.style.overflow = 'hidden';
  };
  
  const stopLoading = () => {
    setIsLoading(false);
    document.body.style.overflow = 'visible';
  };
  
  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <>
        {/* Use the Preloader component */}
        <Preloader isLoading={isLoading} />
        
        {/* Always render children, they'll be covered by the loading overlay when needed */}
        {children}
      </>
    </LoadingContext.Provider>
  );
} 