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
  gradient: string;
  bgGradient: string;
  borderColor: string;
}

function OfferingCard({ icon, title, description, delay, gradient, bgGradient, borderColor }: OfferingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 } 
      }}
      className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm border ${borderColor} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
    >
      {/* Animated background overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0, 0.05, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <div className="relative z-10 flex items-start gap-6">
        <motion.div 
          className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${gradient} text-3xl rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0`}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <div>
          <h3 className="text-xl text-white font-bold mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <Section className="py-24 bg-gradient-to-br from-dark via-black to-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.05, 0.15]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating particles */}
        <motion.div 
          className="absolute top-1/3 left-1/3 w-2 h-2 bg-primary/60 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-400/60 rounded-full"
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg shadow-primary/10">
            <span className="text-sm font-medium text-primary flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.span>
              Our Services
              <motion.span
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.span>
            </span>
          </div>
          
          <SectionTitle>
            How We Help You <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-400">Build and Grow</span>
          </SectionTitle>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto"
          >
            Comprehensive solutions designed to accelerate your growth and bring your vision to life
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <OfferingCard 
            icon="📚"
            title="Mentorship & Learning Programs"
            description="Master coding, digital design, innovation, and practical skills with personalized guidance and structured learning paths."
            delay={0.1}
            gradient="from-primary/30 to-blue-600/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-primary/20"
          />
          
          <OfferingCard 
            icon="🛠️"
            title="Full Digital Development Services"
            description="Custom websites, mobile apps, branding, and tech solutions crafted around your goals with cutting-edge technology."
            delay={0.2}
            gradient="from-blue-500/30 to-blue-700/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-blue-500/20"
          />
          
          <OfferingCard 
            icon="🌟"
            title="Strategic Collaboration & Growth Support"
            description="Partner with us to scale new ideas, fine-tune strategies, and launch stronger with data-driven insights."
            delay={0.3}
            gradient="from-cyan-500/30 to-blue-600/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-cyan-500/20"
          />
          
          <OfferingCard 
            icon="🎬"
            title="Creative Thinking Workshops"
            description="Expand perspectives and transform imagination into action through interactive sessions and collaborative exercises."
            delay={0.4}
            gradient="from-blue-700/30 to-primary/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-blue-700/20"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/services"
            className="group relative px-10 py-5 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold rounded-2xl transition-all duration-300 inline-flex items-center gap-3 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
          >
            <span className="relative z-10">Explore Our Services</span>
            <motion.svg 
              className="w-6 h-6 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
} 