'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HireMeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const bannerClosed = localStorage.getItem('hireMeBannerClosed');
    if (!bannerClosed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hireMeBannerClosed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-4xl bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Gradient header */}
              <div className="h-1 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/50 via-blue-500/50 to-cyan-500/50"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Hire Me Today</h2>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-4xl">💼</span>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">On Demand: Frontend & Backend Quick Support</h3>
                  </div>
                  <p className="text-xl text-gray-300 mb-8">
                    Landing pages, bug fixes, Figma-to-code, delivered in 24 hours.
                  </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">⚡</span>
                      <h3 className="text-lg font-semibold text-white">React/Next.js Pages</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Responsive landing pages built with modern React/Next.js</p>
                    <div className="text-primary font-bold text-lg">₹3,000 / $40</div>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🔧</span>
                      <h3 className="text-lg font-semibold text-white">Bug Fixes</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Fix UI bugs and responsiveness issues quickly</p>
                    <div className="text-primary font-bold text-lg">₹1,500 / $20</div>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🎨</span>
                      <h3 className="text-lg font-semibold text-white">Figma to Code</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Convert your Figma designs to live, responsive code</p>
                    <div className="text-primary font-bold text-lg">₹3,750 / $50</div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                  <Link
                    href="/contact?service=quick-support#contact-form"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25 text-lg"
                  >
                    <span>Hire Me Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 