'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function InnovationTools() {
  return (
    <Section className="py-24 bg-gradient-to-br from-black via-dark to-black relative overflow-hidden">
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                🛠️
              </motion.span>
              Innovation Hub
              <motion.span
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                🛠️
              </motion.span>
            </span>
          </div>
          
          <SectionTitle>
            Beyond Services: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-400">Tools, Reviews, and Ideas That Inspire</span>
          </SectionTitle>
          
          <motion.p
            className="text-xl text-gray-300 mt-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            While our focus is helping you build and grow, we also love creating side projects: practical tools, apps, and sharing reviews on movies, books, and ideas that spark curiosity.
          </motion.p>
          
          <motion.p
            className="text-lg text-gray-400 mt-6 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            It&apos;s all part of staying inspired — and helping others discover new perspectives too.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { duration: 0.3 } 
            }}
            className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
          >
            {/* Animated background overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0, 0.05, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-primary to-blue-600 text-4xl rounded-2xl mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.3 }}
              >
                🔧
              </motion.div>
              
              <h3 className="text-2xl text-white font-bold mb-4 text-center group-hover:text-primary transition-colors duration-300">
                Custom Digital Tools
              </h3>
              
              <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Specialized solutions that streamline workflows and unlock creative potential. From productivity enhancers to creative catalysts.
              </p>
              
              {/* Feature list */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Workflow automation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Creative productivity tools</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>Custom integrations</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { duration: 0.3 } 
            }}
            className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
          >
            {/* Animated background overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0, 0.05, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-600 text-4xl rounded-2xl mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.3 }}
              >
                📝
              </motion.div>
              
              <h3 className="text-2xl text-white font-bold mb-4 text-center group-hover:text-blue-400 transition-colors duration-300">
                Insightful Reviews
              </h3>
              
              <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Deep dives into technologies, tools, and creative inspiration across media. Discover hidden gems and fresh perspectives.
              </p>
              
              {/* Feature list */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Tech & tool reviews</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>Creative inspiration</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Industry insights</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Additional innovation statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 via-blue-500/5 to-cyan-500/10 backdrop-blur-sm border border-primary/20 rounded-2xl">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <span className="text-2xl">💡</span>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Innovation Never Stops
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              We believe that continuous innovation and exploration fuel creativity. 
              Our side projects and reviews are part of our commitment to staying inspired and helping others discover new possibilities.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
} 