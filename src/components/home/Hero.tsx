'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = (heroRef.current as HTMLElement).getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 2,
  }));

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full  to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-1/2  to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Background Image with parallax */}
      <motion.div 
        className="absolute right-0 w-[90%] h-full"
        style={{
          x: useTransform(useMotionValue(mousePosition.x), [-500, 500], [20, -20]),
          y: useTransform(useMotionValue(mousePosition.y), [-500, 500], [10, -10]),
        }}
      >
        <Image
          src="/images/bg-shape-1.svg"
          alt="Background Shape"
          fill
          className="object-cover opacity-5"
          priority
        />
      </motion.div>

      {/* Content */}
      <div ref={ref} className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="relative lg:col-span-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: inView ? "150px" : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-[1px] bg-white/20 mb-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="text-sm uppercase tracking-[0.4em] text-gray-200 mb-4 font-medium"
              >
                Dev And Debate
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-[2.5rem] !leading-[1.4] font-bold text-white mb-6"
              >
                Where Code Meets <span className="text-primary relative inline-block">
                  Creativity
                  <motion.svg 
                    className="absolute -bottom-2 left-0 w-full" 
                    viewBox="0 0 200 8" 
                    xmlns="http://www.w3.org/2000/svg" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 0.6 : 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <path d="M 0 5 C 50 0, 150 0, 200 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                  </motion.svg>
                </span>
                <br className="my-4" />
                {" "}& Conversations Spark <span className="text-primary relative inline-block">
                  Innovation!
                  <motion.svg 
                    className="absolute -bottom-2 left-0 w-full" 
                    viewBox="0 0 200 8" 
                    xmlns="http://www.w3.org/2000/svg" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 0.6 : 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <path d="M 0 5 C 50 0, 150 0, 200 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-400 mb-4 sm:mb-4 max-w-2xl leading-relaxed"
              >
                Build your ideas, grow your skills, and dive into creative conversations—whether it's tech, storytelling, or strategy, we explore and evolve together at Dev & Debate
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl leading-relaxed"
              >
                Whether you're here to sharpen your skills, build a strong digital presence, or find strategic support for your organization — we're ready to build and grow with you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl"
              >
                <motion.a 
                  href="/services" 
                  className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg transition-all duration-300 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 to-blue-700/20 transition-all duration-500" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 via-blue-700/20 to-blue-500/20 transition-all duration-500">
                    <motion.span 
                      className="absolute inset-0  via-white/5 to-transparent"
                      animate={{ 
                        x: ['0%', '100%'],
                        opacity: [0, 1, 0]
                      }} 
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  </span>
                  <span className="absolute inset-0 border border-white/20 group-hover:border-white/40 rounded-lg transition-colors duration-300" />
                  <span className="relative flex items-center">
                    <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🛠</span>
                    <span className="relative">
                      Bring Your Ideas to Life
                      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-white/80 transition-all duration-300" />
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.a>

                <div className="flex gap-4 sm:gap-6">
                  <motion.a 
                    href="/blog" 
                    className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg transition-all duration-300 flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0  transition-all duration-500" />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100  transition-all duration-500">
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/5 to-transparent"
                        animate={{ 
                          x: ['0%', '100%'],
                          opacity: [0, 1, 0]
                        }} 
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    </span>
                    <span className="absolute inset-0 border border-white/20 group-hover:border-white/40 rounded-lg transition-colors duration-300" />
                    <span className="relative flex items-center">
                      <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🎬</span>
                      <span className="relative">
                        Explore & Learn
                        <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-white/80 transition-all duration-300" />
                      </span>
                      <svg 
                        className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.a>

                  <motion.a 
                    href="/community" 
                    className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg transition-all duration-300 flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r  transition-all duration-500" />
                    <span className="absolute inset-0 opacity-0  transition-all duration-500">
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-white/5 to-transparent"
                        animate={{ 
                          x: ['0%', '100%'],
                          opacity: [0, 1, 0]
                        }} 
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    </span>
                    <span className="absolute inset-0 border border-white/20 group-hover:border-white/40 rounded-lg transition-colors duration-300" />
                    <span className="relative flex items-center">
                      <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">💡</span>
                      <span className="relative">
                        Join the Community
                        <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-white/80 transition-all duration-300" />
                      </span>
                      <svg 
                        className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:block lg:col-span-2"
            >
              <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full blur-[60px] bg-gradient-to-r from-blue-500/10 via-gray-500/10 to-blue-700/10" />
                
                {/* Main circular container */}
                <motion.div 
                  className="absolute right-0 top-0 w-[70%] aspect-square rounded-full overflow-hidden border-8 border-white/10"
                  initial={{ scale: 0.95, rotate: -2 }}
                  animate={{ 
                    scale: [0.95, 1, 0.95],
                    rotate: [-2, 2, -2],
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    x: useTransform(useMotionValue(mousePosition.x), [-500, 500], [10, -10]),
                    y: useTransform(useMotionValue(mousePosition.y), [-500, 500], [5, -5]),
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 4,
                    transition: { 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200
                    }
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hs-image-1.webp"
                      alt="Technology Circle"
                      fill
                      className="object-cover"
                      priority
                    />
                    <motion.div 
                      className="absolute inset-0"
                      animate={{
                        background: [
                          "linear-gradient(to bottom right, rgba(59, 130, 246, 0.3), rgba(75, 85, 99, 0.3), rgba(29, 78, 216, 0.3))",
                          "linear-gradient(to bottom right, rgba(29, 78, 216, 0.3), rgba(59, 130, 246, 0.3), rgba(75, 85, 99, 0.3))",
                          "linear-gradient(to bottom right, rgba(75, 85, 99, 0.3), rgba(29, 78, 216, 0.3), rgba(59, 130, 246, 0.3))"
                        ]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    {/* Inner shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
                
                {/* Secondary circle */}
                <motion.div 
                  className="absolute left-0 bottom-0 w-[50%] aspect-square rounded-full overflow-hidden border-8 border-white/10"
                  initial={{ scale: 0.95, rotate: 2 }}
                  animate={{ 
                    scale: [0.95, 1, 0.95],
                    rotate: [2, -2, 2],
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    x: useTransform(useMotionValue(mousePosition.x), [-500, 500], [-10, 10]),
                    y: useTransform(useMotionValue(mousePosition.y), [-500, 500], [-5, 5]),
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: -4,
                    transition: { 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200
                    }
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hs-image-2.webp"
                      alt="Creative Circle"
                      fill
                      className="object-cover"
                      priority
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50"
                      animate={{
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Inner shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 right-1/4">
                  <motion.svg 
                    className="w-16 h-16 sm:w-24 sm:h-24 text-white/20" 
                    viewBox="0 0 100 100" 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M50 0 C50 0, 100 25, 100 50 C100 75, 50 100, 50 100 C50 100, 0 75, 0 50 C0 25, 50 0, 50 0" strokeWidth="2" stroke="currentColor" fill="none" />
                  </motion.svg>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full border border-white/30"
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                
                <motion.div 
                  className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full border border-primary/30"
                  animate={{ 
                    y: [0, 15, 0],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, -180, -360] 
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 hover:text-white/80 transition-colors cursor-pointer bg-transparent border-none outline-none z-50"
            onClick={() => {
              const exploreSection = document.querySelector('section');
              if (exploreSection) {
                exploreSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ y: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 