'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function MiddleCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-gradient-to-b from-black to-dark relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="bg-black/50 backdrop-blur-sm p-10 md:p-12 border border-white/5 rounded-xl relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center relative z-10">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "120px" } : { width: 0 }}
              transition={{ duration: 1 }}
              className="h-[2px] bg-gradient-to-r from-primary/0 via-primary via-primary/0 mx-auto mb-8"
            />
            
            <motion.h2
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              Ready to <span className="relative inline-block">
                <span className="text-primary">Learn</span>, <span className="text-primary">Build</span>, 
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg" opacity="0.7">
                  <path d="M 0 5 C 50 0, 150 0, 200 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                </svg>
              </span> or 
              <span className="relative inline-block ml-2">
                <span className="text-primary">Transform</span>
                <motion.div
                  className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
              <br className="hidden md:block" /> Your Vision into Reality?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Let's make it happen <span className="text-white font-medium">— together.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link
                href="/contact"
                className="relative px-8 py-3 rounded-md text-white bg-primary/80 hover:bg-primary transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <span className="text-base font-medium">Get In Touch</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 