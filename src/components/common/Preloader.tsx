'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  isLoading: boolean;
  className?: string;
}

const Preloader = ({ isLoading, className }: PreloaderProps) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  const circleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    }),
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        when: 'afterChildren',
        staggerChildren: 0.1,
        staggerDirection: -1,
      }
    }
  };

  const logoVariants = {
    initial: { y: -50, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      }
    },
    exit: { 
      y: -50, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md",
            className
          )}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Logo animation */}
          <motion.div
            className="relative mb-8"
            variants={logoVariants}
          >
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/images/logo-main.png"
                alt="Dev & Debate"
                width={120}
                height={45}
                className="w-30 h-auto"
                priority
              />
              <span className="text-xl font-bold text-white">
                Dev & Debate
              </span>
            </div>
          </motion.div>

          {/* Animated circles */}
          <div className="flex gap-2 mb-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={circleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`w-3 h-3 rounded-full ${
                  i % 2 === 0 ? 'bg-white' : 'bg-blue-500'
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <motion.div 
            className="w-48 h-1 mt-6 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ 
                width: "100%",
                transition: { 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 