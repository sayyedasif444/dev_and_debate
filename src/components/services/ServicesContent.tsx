'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hero, 
  DevelopmentServices, 
  DesignDigitalPresence, 
  LearnAndGrow, 
  FunSide, 
  FinalCTA 
} from '@/components/services';

export default function ServicesContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Disable smooth scrolling temporarily
      const html = document.documentElement;
      const originalStyle = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Re-enable smooth scrolling
      requestAnimationFrame(() => {
        html.style.scrollBehavior = originalStyle;
        setIsLoaded(true);
      });
    }
  }, []);

  // Stagger animation for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <AnimatePresence>
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-b from-black via-black/95 to-dark/95 relative min-h-screen"
        >
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-[30rem] h-[30rem] bg-primary/3 rounded-full blur-[8rem] opacity-70" />
            <div className="absolute bottom-10 right-10 w-[25rem] h-[25rem] bg-blue-500/3 rounded-full blur-[6rem] opacity-60" />
            <div className="absolute top-1/3 right-1/4 w-[20rem] h-[20rem] bg-blue-500/3 rounded-full blur-[5rem] opacity-50" />
          </div>

          <div className="relative z-10">
            <motion.div variants={sectionVariants}>
              <Hero />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <DevelopmentServices />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <DesignDigitalPresence />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <LearnAndGrow />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <FunSide />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
              <FinalCTA />
            </motion.div>
          </div>
        </motion.main>
    </AnimatePresence>
  );
} 