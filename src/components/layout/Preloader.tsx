'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          setTimeout(() => {
            setAnimationComplete(true);
            document.body.style.overflow = 'visible';
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      if (isClient) {
        document.body.style.overflow = 'visible';
      }
    };
  }, [isClient]);

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  if (animationComplete) return null;

  return (
    <AnimatePresence>
      {!animationComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (!loading && isClient) {
              document.body.style.overflow = 'visible';
            }
          }}
        >
          <div className="relative w-32 h-32">
            {/* Main rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400/80"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Secondary rotating ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent border-t-white/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src="/images/logo-main.png"
                  alt="Dev & Debate"
                  width={80}
                  height={30}
                  className="w-20 h-auto"
                  priority
                />
                <span className="text-lg font-bold text-white/90">
                  Dev & Debate
                </span>
              </div>
            </motion.div>
          </div>
          
          {/* Subtle progress indicator */}
          <motion.div 
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-0.5 w-32 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-400/50 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeInOut' }}
              />
            </div>
            <p className="mt-2 text-xs font-light text-white/50">
              {progress < 100 ? 'Loading' : 'Ready'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 