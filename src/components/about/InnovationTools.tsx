'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function InnovationTools() {
  return (
    <Section className="bg-gradient-to-b from-black to-dark">
      <div className="max-w-5xl mx-auto text-center">
        <SectionTitle>
          Beyond Services: <span className="text-primary">Tools, Reviews, and Ideas That Inspire</span>
        </SectionTitle>
        
        <motion.p
          className="text-lg text-gray-300 mt-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          While our focus is helping you build and grow, we also love creating side projects: practical tools, apps, and sharing reviews on movies, books, and ideas that spark curiosity.
        </motion.p>
        
        <motion.p
          className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          It&apos;s all part of staying inspired — and helping others discover new perspectives too.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-black/40 to-black/20 border border-white/5 p-8 rounded-xl"
          >
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl text-white font-semibold mb-3">Custom Digital Tools</h3>
            <p className="text-gray-400">
              Specialized solutions that streamline workflows and unlock creative potential.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-black/40 to-black/20 border border-white/5 p-8 rounded-xl"
          >
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl text-white font-semibold mb-3">Insightful Reviews</h3>
            <p className="text-gray-400">
              Deep dives into technologies, tools, and creative inspiration across media.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 