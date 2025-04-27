'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

interface OfferingCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

function OfferingCard({ icon, title, description, delay }: OfferingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-black/40 to-black/20 border border-white/5 p-6 rounded-xl flex items-start gap-5"
    >
      <div className="text-4xl mt-1">{icon}</div>
      <div>
        <h3 className="text-xl text-white font-semibold mb-2">
          {title}
        </h3>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <Section>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionTitle>
            How We Help You <span className="text-primary">Build and Grow</span>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OfferingCard 
            icon="📚"
            title="Mentorship & Learning Programs"
            description="Master coding, digital design, innovation, and practical skills."
            delay={0.1}
          />
          
          <OfferingCard 
            icon="🛠"
            title="Full Digital Development Services"
            description="Custom websites, mobile apps, branding, and tech solutions crafted around your goals."
            delay={0.2}
          />
          
          <OfferingCard 
            icon="🌟"
            title="Strategic Collaboration & Growth Support"
            description="Partner with us to scale new ideas, fine-tune strategies, and launch stronger."
            delay={0.3}
          />
          
          <OfferingCard 
            icon="🎬"
            title="Creative Thinking Workshops"
            description="Expand perspectives. Transform imagination into action."
            delay={0.4}
          />
        </div>
        
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/services"
              className="px-8 py-4 rounded-lg border border-primary/20 text-white hover:bg-primary/10 transition-all duration-300 inline-flex items-center gap-2 group"
            >
              <span>Explore Our Services</span>
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
      </div>
    </Section>
  );
} 