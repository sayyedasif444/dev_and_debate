'use client';

import { useEffect } from 'react';
import Preloader from '@/components/layout/Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // This will be handled by the Preloader component itself
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);
  
  return (
    <>
      <Preloader />
      {children}
    </>
  );
} 