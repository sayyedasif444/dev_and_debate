'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function CallToAction() {
  return (
    <Section className="bg-gradient-to-b from-black/50 to-black">
      <div className="max-w-5xl mx-auto text-center">
        <SectionTitle>
          Ready to Build, Learn, and <span className="text-primary">Grow</span> With Us?
        </SectionTitle>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
        >
          <Link
            href="/contact"
            className="px-8 py-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span className="text-xl">✨</span>
            <span className="text-lg font-medium">Start Your Project</span>
            <svg 
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <Link
            href="/community"
            className="px-8 py-4 rounded-lg border border-primary/20 text-white hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span className="text-xl">✨</span>
            <span className="text-lg font-medium">Learn More About Our Services</span>
            <svg 
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
} 