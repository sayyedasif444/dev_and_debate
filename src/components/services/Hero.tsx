'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-8 h-8"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full border-2 border-primary/30 rounded-md" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-4 h-12"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-primary/20 rounded-full" />
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Enhanced badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg shadow-primary/10"
          >
            <span className="text-sm font-medium text-primary flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
              Our Services & Solutions
              <motion.span
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
            </span>
          </motion.div>

          <motion.div
            className="w-20 h-1 bg-primary/50 mb-10"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] !leading-[1.2] font-bold text-white mb-8"
          >
            What We Can <span className="text-primary relative inline-block">
              Build Together
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg" opacity="0.6">
                <path d="M 0 5 C 50 0, 150 0, 200 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl"
          >
            Whether you&apos;re launching a product, leveling up your digital presence, or learning to code — we&apos;re here to help you build with heart and vision.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            {/* Service tags */}
            {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing', 'Mentorship', 'Creative Insights'].map((tag, index) => (
              <div 
                key={tag}
                className="px-4 py-2 bg-blue-500/30 rounded-full border border-blue-400/40 text-white text-sm font-medium"
              >
                {tag}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-full h-24 max-w-3xl relative overflow-hidden">
            <div className="absolute left-0 top-0 right-0 h-24 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-xl flex items-center justify-center">
              <div className="relative overflow-hidden w-full">
                <div className="flex">
                  {/* Double content for seamless loop */}
                  <motion.div
                    animate={{ x: "-50%" }}
                    transition={{ 
                      duration: 30, 
                      repeat: Infinity, 
                      ease: "linear",
                      repeatType: "loop"
                    }}
                    className="flex whitespace-nowrap text-white opacity-50 text-lg"
                  >
                    <span className="px-4">Web Development</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Mobile Apps</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Brand Design</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Digital Marketing</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Mentorship</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Code Reviews</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Digital Presence</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Software Solutions</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Movie Talks</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Board Fun</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Creative Insights</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Growth Strategies</span>
                    <span className="px-4">•</span>
                    
                    {/* Repeat the content for seamless loop */}
                    <span className="px-4">Web Development</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Mobile Apps</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Brand Design</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Digital Marketing</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Mentorship</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Code Reviews</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Digital Presence</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Software Solutions</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Movie Talks</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Board Fun</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Creative Insights</span>
                    <span className="px-4">•</span>
                    <span className="px-4">Growth Strategies</span>
                    <span className="px-4">•</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 