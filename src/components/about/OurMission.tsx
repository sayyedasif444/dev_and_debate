'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function OurMission() {
  return (
    <Section className="py-24 bg-gradient-to-br from-dark via-black to-dark/80 relative overflow-hidden">
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
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg shadow-primary/10">
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.span>
                Our Mission
                <motion.span
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.span>
              </span>
            </div>
            
            <SectionTitle>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-400">
                Build, Learn, Grow
              </span> — Together
            </SectionTitle>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Mission Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <span className="text-xl">💡</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Our Foundation</h3>
                </div>
                
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Dev & Debate was founded on a belief: <span className="text-primary font-medium">Great things happen when creative minds and strong execution come together.</span>
                </p>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  Whether you&apos;re launching a digital product, shaping a brand, or refining a new idea — we&apos;re here to help you turn possibilities into lasting success.
                </p>
              </motion.div>
              
              {/* Mission pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20"
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-semibold text-white mb-1">Build</h4>
                  <p className="text-sm text-gray-400">Create with purpose</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20"
                >
                  <div className="text-2xl mb-2">📚</div>
                  <h4 className="font-semibold text-white mb-1">Learn</h4>
                  <p className="text-sm text-gray-400">Grow continuously</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/20"
                >
                  <div className="text-2xl mb-2">🌱</div>
                  <h4 className="font-semibold text-white mb-1">Grow</h4>
                  <p className="text-sm text-gray-400">Scale together</p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-blue-500/5 to-cyan-500/10 border border-white/10">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"
                    animate={{ 
                      scale: [1.5, 1, 1.5],
                      opacity: [0.4, 0.2, 0.4]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
                
                {/* Mission statement cards */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                  <motion.div
                    className="mb-6 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm">🎯</span>
                      </div>
                      <h4 className="font-semibold text-white">Vision</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      To be the catalyst for innovative digital solutions that empower businesses and individuals to achieve their full potential.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm">💪</span>
                      </div>
                      <h4 className="font-semibold text-white">Commitment</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      We commit to delivering excellence, fostering innovation, and building lasting partnerships that drive mutual success.
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-60"
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
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-60"
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
      </div>
    </Section>
  );
} 