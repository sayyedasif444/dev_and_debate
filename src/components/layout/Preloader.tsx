'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Simulate progressive loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Once progress reaches 100%, start the fade-out sequence after a short delay
          setTimeout(() => {
            setLoading(false);
            
            // After the fade-out animation completes, set animationComplete to true
            setTimeout(() => {
              setAnimationComplete(true);
            }, 800); // Match this to the fade-out animation duration
          }, 500); // Short delay after reaching 100%
          
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // If animation is complete, don't render anything
  if (animationComplete) return null;

  return (
    <AnimatePresence>
      {!animationComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Creative geometric shape animation */}
          <div className="relative w-40 h-40 mb-8">
            {/* Rotating outer circle */}
            <motion.div
              className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Counter-rotating middle circle */}
            <motion.div
              className="absolute inset-3 border-4 border-transparent border-b-cyan-400 border-l-indigo-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Pulsing inner circle with logo */}
            <motion.div
              className="absolute inset-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.7)',
                  '0 0 10px rgba(59, 130, 246, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="text-white text-2xl font-bold"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                D&D
              </motion.div>
            </motion.div>
            
            {/* Orbiting dots */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white rounded-full"
                  style={{
                    top: 'calc(50% - 6px)',
                    left: 'calc(50% - 6px)',
                    backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  }}
                  animate={{
                    x: [x * 0.6, x, x * 0.6],
                    y: [y * 0.6, y, y * 0.6],
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }}
                />
              );
            })}
          </div>
          
          {/* Progress text and percentage */}
          <motion.div
            className="text-center mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-xl font-medium text-white mb-1">
              {progress < 100 ? 'Loading...' : 'Ready!'}
            </h2>
            <p className="text-sm text-blue-400">
              {Math.round(progress)}%
            </p>
          </motion.div>
          
          {/* Progress bar */}
          <motion.div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
              style={{ width: `${progress}%` }}
              initial={{ width: '0%' }}
              // We don't need animate here since we're controlling width directly
            />
          </motion.div>
          
          {/* Loading message */}
          <motion.p
            className="text-gray-400 text-xs mt-4 max-w-xs text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Building digital presence that stands out
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 