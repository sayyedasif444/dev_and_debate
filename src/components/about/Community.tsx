'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Community() {
  return (
    <Section className="bg-gradient-to-b from-dark to-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <SectionTitle align="left">
              Your <span className="text-primary">Launchpad</span> for Growth
            </SectionTitle>
            
            <motion.p 
              className="text-lg text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              At Dev & Debate, we&apos;re more than a service provider — we&apos;re a trusted growth partner for dreamers, builders, and doers.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-300 mt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Whether you&apos;re starting out, scaling up, or exploring your next big move — you&apos;ll find support, strategy, and creativity to help you succeed.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-xl overflow-hidden h-[400px] shadow-2xl shadow-primary/10"
          >
            <Image
              src="/images/hs-image-2.webp"
              alt="Dev & Debate Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 