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
  bgGradient: string;
  borderColor: string;
}

function ValueCard({ icon, title, description, delay, gradient, bgGradient, borderColor }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
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
      
      <div className="relative z-10">
        <motion.div 
          className={`w-20 h-20 flex items-center justify-center bg-gradient-to-br ${gradient} text-3xl rounded-2xl mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-xl text-white font-bold mb-4 text-center group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function CoreValues() {
  return (
    <Section className="py-24 bg-gradient-to-br from-black via-dark to-black relative overflow-hidden">
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

      <div className="relative z-10">
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
                ⭐
              </motion.span>
              Our Values
              <motion.span
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ⭐
              </motion.span>
            </span>
          </div>
          
          <SectionTitle>
            Core Values That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-400">Drive Us</span>
          </SectionTitle>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto"
          >
            These principles guide every decision we make and every project we undertake
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ValueCard 
            icon="🛠️"
            title="Creativity with Purpose"
            description="Ideas matter. Execution matters more. We believe in creative solutions that drive real results and meaningful impact."
            delay={0.1}
            gradient="from-primary/30 to-blue-600/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-primary/20"
          />
          
          <ValueCard 
            icon="🚀"
            title="Learning without Limits"
            description="Growth starts where curiosity leads. We embrace continuous learning and push boundaries to discover new possibilities."
            delay={0.2}
            gradient="from-blue-500/30 to-blue-700/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-blue-500/20"
          />
          
          <ValueCard 
            icon="🏗️"
            title="Building with Care"
            description="Every project deserves precision, passion, and long-term impact. We build solutions that stand the test of time."
            delay={0.3}
            gradient="from-cyan-500/30 to-blue-600/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-cyan-500/20"
          />
          
          <ValueCard 
            icon="🔍"
            title="Relentless Curiosity"
            description="Every question is an opportunity to discover new potential. We ask, explore, and innovate to find the best solutions."
            delay={0.4}
            gradient="from-blue-700/30 to-primary/20"
            bgGradient="from-black/60 to-black/40"
            borderColor="border-blue-700/20"
          />
        </div>
        
        {/* Additional value statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 via-blue-500/5 to-cyan-500/10 backdrop-blur-sm border border-primary/20 rounded-2xl">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <span className="text-2xl">💎</span>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Excellence in Everything
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              These values aren't just words on a page — they're the foundation of how we work, 
              collaborate, and deliver exceptional results for our clients and partners.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
} 