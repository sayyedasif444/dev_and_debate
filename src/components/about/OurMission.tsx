'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function OurMission() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle>
          Our Mission: <span className="text-primary">Build, Learn, Grow</span> — Together
        </SectionTitle>
        
        <motion.p 
          className="text-xl text-gray-300 mt-8 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Dev & Debate was founded on a belief: Great things happen when creative minds and strong execution come together.
        </motion.p>
        
        <motion.p 
          className="text-lg text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Whether you&apos;re launching a digital product, shaping a brand, or refining a new idea — we&apos;re here to help you turn possibilities into lasting success.
        </motion.p>
      </div>
    </Section>
  );
} 