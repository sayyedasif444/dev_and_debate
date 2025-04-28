'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.4,
      },
    }),
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const letterArray = "Dev & Debate".split("");

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
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <motion.path
                  d="M32 2 L62 32 L32 62 L2 32 Z"
                  fill="none"
                  stroke="#0070F3"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 64 64" className="w-2/3 h-2/3">
                  <motion.path
                    d="M20 20 L44 20 L44 44 L20 44 Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      rotate: 180,
                      transition: { 
                        pathLength: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
                        rotate: { duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
                      }
                    }}
                  />
                </svg>
              </div>
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

          {/* Animated text */}
          <div className="flex overflow-hidden">
            {letterArray.map((letter, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-2xl font-bold text-white"
              >
                {letter === " " ? <span className="mr-2"></span> : letter}
              </motion.div>
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