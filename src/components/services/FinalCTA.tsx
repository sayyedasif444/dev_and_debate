'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ActionButton from './common/ActionButton';

export default function FinalCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-black to-dark relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us what you&apos;re building — or what you dream to build. We&apos;ll help you bring it to life. 🚀
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton 
              href="/contact"
              text="Schedule a Call"
              variant="primary"
              icon="📞"
            />
            <ActionButton 
              href="/contact"
              text="Contact Us"
              variant="secondary"
              icon="✉️"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 