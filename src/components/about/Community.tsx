'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Community() {
  return (
    <Section className="py-24 bg-gradient-to-br from-dark via-black to-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.05, 0.15]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating particles */}
        <motion.div 
          className="absolute top-1/3 left-1/3 w-2 h-2 bg-primary/60 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-400/60 rounded-full"
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg shadow-primary/10">
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🌟
                </motion.span>
                Our Community
                <motion.span
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🌟
                </motion.span>
              </span>
            </div>

            <SectionTitle align="left">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-400">Launchpad</span> for Growth
            </SectionTitle>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              At Dev & Debate, we&apos;re more than a service provider — we&apos;re a trusted growth partner for dreamers, builders, and doers.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Whether you&apos;re starting out, scaling up, or exploring your next big move — you&apos;ll find support, strategy, and creativity to help you succeed.
            </motion.p>

            {/* Community features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl">🤝</span>
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Collaborative Partnership</h4>
                  <p className="text-gray-400 text-sm">We work alongside you, not just for you</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl">📈</span>
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Growth-Focused</h4>
                  <p className="text-gray-400 text-sm">Every solution drives measurable results</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl">💡</span>
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Innovation-Driven</h4>
                  <p className="text-gray-400 text-sm">Cutting-edge solutions for modern challenges</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-blue-700 to-primary rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl">🎯</span>
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Results-Oriented</h4>
                  <p className="text-gray-400 text-sm">Success measured by your achievements</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-2xl shadow-primary/20 border border-white/10">
              <Image
                src="/images/hs-image-2.webp"
                alt="Dev & Debate Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Floating elements overlay */}
              <motion.div
                className="absolute top-6 right-6 w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/30"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="text-2xl">🤝</span>
              </motion.div>
              
              <motion.div
                className="absolute bottom-6 left-6 w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-500/30"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <span className="text-xl">💪</span>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-60"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-60"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 