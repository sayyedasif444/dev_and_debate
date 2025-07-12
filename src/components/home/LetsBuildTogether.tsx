'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function LetsBuildTogether() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Build Something Together</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Whether you're here to learn, build, or collaborate — we're ready when you are.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center">
                <span className="text-primary">01.</span>
                <span className="ml-2">Grow Your Skills</span>
              </h3>
              <p className="text-gray-400">
                Want to sharpen your skills with real-world insights? Our resources and mentorship will help you level up faster than going solo.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center">
                <span className="text-primary">02.</span>
                <span className="ml-2">Build Your Vision</span>
              </h3>
              <p className="text-gray-400">
                Have a product in mind? Need help building your portfolio? We'll translate your ideas into reality with precision and care.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center">
                <span className="text-primary">03.</span>
                <span className="ml-2">Scale Your Business</span>
              </h3>
              <p className="text-gray-400">
                Looking for a reliable team for your next digital project? We'll help you build, launch, and optimize for success.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center">
                <span className="text-primary">04.</span>
                <span className="ml-2">Exchange Ideas</span>
              </h3>
              <p className="text-gray-400">
                Or maybe you just love to talk about code, cinema, and clever ideas — Whatever it is, we'd love to explore it with you.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          <Link href="/contact" className="block">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)" }}
              className="group h-full bg-gradient-to-br from-blue-900/20 to-blue-700/10 backdrop-blur-sm border border-white/10 hover:border-primary/30 rounded-xl p-8 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 text-primary flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                  ✉️
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Say Hello</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  Drop us a message and let's start a conversation about your needs.
                </p>
                <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
                  Get in touch
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </Link>

          <Link href="/book-call" className="block">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)" }}
              className="group h-full bg-gradient-to-br from-blue-900/20 to-blue-700/10 backdrop-blur-sm border border-white/10 hover:border-primary/30 rounded-xl p-8 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 text-primary flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                  📞
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Book a Discovery Call</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  Schedule a free 30-minute call to discuss your project and explore how we can help.
                </p>
                <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
                  Schedule now
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </Link>

          <Link href="/services" className="block">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)" }}
              className="group h-full bg-gradient-to-br from-blue-900/20 to-blue-700/10 backdrop-blur-sm border border-white/10 hover:border-primary/30 rounded-xl p-8 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 text-primary flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                  🛠
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Explore Our Services</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  Browse our full range of development, design, and digital services.
                </p>
                <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
                  View services
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-6">
            Whether you're dreaming big or scaling fast, we're here to help you bring ideas to life, sharpen your skills, and strengthen your organization.
          </p>
          
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-3 text-white text-base font-medium rounded-lg bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-lg shadow-blue-500/20 transition-all duration-300"
          >
            Start Your Journey With Us
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
} 