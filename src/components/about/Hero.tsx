'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-[2.5rem] !leading-[1.4] font-bold text-white mb-6"
            >
              Where Ideas Find a Home and <span className="text-primary relative inline-block">
                Growth Finds a Partner
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg" opacity="0.6">
                  <path d="M 0 5 C 50 0, 150 0, 200 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                </svg>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              At Dev & Debate, we don&apos;t just build projects — we unlock possibilities. Curiosity, creativity, and collaboration drive everything we do to help you learn, create, and launch with confidence.
            </motion.p>
          </motion.div>
          
          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative rounded-xl overflow-hidden h-[400px] shadow-2xl shadow-primary/10"
          >
            <Image
              src="/images/hs-image-2.webp"
              alt="Collaboration at Dev & Debate"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 