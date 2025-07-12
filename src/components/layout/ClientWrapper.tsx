'use client';

import Preloader from '@/components/layout/Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  // Preloader component now handles the overflow style directly
  return (
    <>
      <Preloader />
      {children}
    </>
  );
} 