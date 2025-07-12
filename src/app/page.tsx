'use client';

import { useEffect, useState } from 'react';
import HireMeBanner from '@/components/home/HireMeBanner';
import Hero from '@/components/home/Hero';
import Explore from '@/components/home/Explore';
import MiddleCta from '@/components/home/MiddleCta';
import MoreThanCode from '@/components/home/MoreThanCode';
import BuiltForBuilders from '@/components/home/BuiltForBuilders';
import Testimonials from '@/components/home/Testimonials';
import LetsBuildTogether from '@/components/home/LetsBuildTogether';
import StayInTheLoop from '@/components/home/StayInTheLoop';
import { useLoading } from '@/components/layout/LoadingContext';

export default function Home() {
  const { startLoading, stopLoading } = useLoading();
  const [demoTime, setDemoTime] = useState(3);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Disable smooth scrolling temporarily
      const html = document.documentElement;
      const originalStyle = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Re-enable smooth scrolling
      requestAnimationFrame(() => {
        html.style.scrollBehavior = originalStyle;
      });
    }
  }, []);

  const handleDemoLoader = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, demoTime * 1000);
  };

  return (
    <main>
      <HireMeBanner />
      <Hero />
      <Explore />
      <MiddleCta />
      <MoreThanCode />
      <BuiltForBuilders />
      <Testimonials />
      <LetsBuildTogether />
      <StayInTheLoop />
    </main>
  );
}
