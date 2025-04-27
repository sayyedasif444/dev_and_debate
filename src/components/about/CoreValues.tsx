'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
  gradient: string;
}

function ValueCard({ icon, title, description, delay, gradient }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-xl"
    >
      <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${gradient} text-3xl rounded-full mb-6 mx-auto`}>
        {icon}
      </div>
      <h3 className="text-xl text-white font-semibold mb-4 text-center">
        {title}
      </h3>
      <p className="text-gray-400 text-center">
        {description}
      </p>
    </motion.div>
  );
}

export default function CoreValues() {
  return (
    <Section className="bg-gradient-to-b from-black to-dark">
      <div className="text-center mb-16">
        <SectionTitle>Core Values That Drive Us</SectionTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <ValueCard 
          icon="🛠️"
          title="Creativity with Purpose"
          description="Ideas matter. Execution matters more."
          delay={0.1}
          gradient="from-primary/20 to-blue-700/10"
        />
        
        <ValueCard 
          icon="🚀"
          title="Learning without Limits"
          description="Growth starts where curiosity leads."
          delay={0.2}
          gradient="from-blue-500/20 to-blue-700/10"
        />
        
        <ValueCard 
          icon="🏗️"
          title="Building with Care"
          description="Every project deserves precision, passion, and long-term impact."
          delay={0.3}
          gradient="from-blue-500/20 to-blue-700/10"
        />
        
        <ValueCard 
          icon="🔍"
          title="Relentless Curiosity"
          description="Every question is an opportunity to discover new potential."
          delay={0.4}
          gradient="from-blue-700/20 to-blue-500/10"
        />
      </div>
    </Section>
  );
} 