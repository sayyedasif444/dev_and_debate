'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2] 
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/50 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-400/50 rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full"
          >
            <span className="text-sm font-medium text-primary">Let's Connect</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Let's Build Something <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Extraordinary Together
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Whether you're ready to start a project, looking for a partner, or just curious — we're here to turn your vision into reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#contact-form" 
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              <span>Start a Conversation</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a 
              href="#schedule-call" 
              className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white font-medium rounded-xl transition-all duration-300"
            >
              Schedule a Call
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 