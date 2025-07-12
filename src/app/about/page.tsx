'use client';

import Hero from '@/components/about/Hero';
import OurMission from '@/components/about/OurMission';
import CoreValues from '@/components/about/CoreValues';
import Services from '@/components/about/Services';
import InnovationTools from '@/components/about/InnovationTools';
import Community from '@/components/about/Community';
import CallToAction from '@/components/about/CallToAction';

export default function AboutPage() {
  return (
    <main>
      <Hero />
      <OurMission />
      <CoreValues />
      <Services />
      <InnovationTools />
      <Community />
      <CallToAction />
    </main>
  );
} 