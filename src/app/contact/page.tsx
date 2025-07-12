'use client';

import { Suspense } from 'react';
import Hero from '@/components/contact/Hero';
import GetInTouch from '@/components/contact/GetInTouch';
import ScheduleCall from '@/components/contact/ScheduleCall';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <GetInTouch />
      <ScheduleCall />
      <Suspense fallback={<div className="py-24 text-center">Loading contact form...</div>}>
        <ContactForm />
      </Suspense>
    </main>
  );
} 