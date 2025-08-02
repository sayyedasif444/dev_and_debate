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
              Our Work & Tools
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
            Where <span className="text-primary relative inline-block">
              Innovation
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg" opacity="0.6">
                <path d="M 0 5 C 50 0, 150 0, 200 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
              </svg>
            </span> Meets Impact
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-8 max-w-4xl"
          >
            From groundbreaking social impact platforms that connect nonprofits with cutting-edge tech solutions, to powerful developer tools that streamline workflows and boost productivity. Every project we touch is crafted with purpose, precision, and a vision for a better digital future.
          </motion.p>

                     <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-12"
           >
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-primary rounded-full"></div>
               <span>Social Impact Solutions</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
               <span>Developer Tools</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               <span>Community Platforms</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
               <span>Analytics & Insights</span>
             </div>
           </motion.div>

           {/* Stats section */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
             className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
           >
             <div className="text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.8 }}
                 className="text-3xl sm:text-4xl font-bold text-primary mb-2"
               >
                 15+
               </motion.div>
               <div className="text-gray-400 text-sm sm:text-base">Projects Completed</div>
             </div>
             <div className="text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.9 }}
                 className="text-3xl sm:text-4xl font-bold text-primary mb-2"
               >
                 8+
               </motion.div>
               <div className="text-gray-400 text-sm sm:text-base">Tools in Development</div>
             </div>
             <div className="text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 0.5, delay: 1.0 }}
                 className="text-3xl sm:text-4xl font-bold text-primary mb-2"
               >
                 100%
               </motion.div>
               <div className="text-gray-400 text-sm sm:text-base">Client Satisfaction</div>
             </div>
             <div className="text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 0.5, delay: 1.1 }}
                 className="text-3xl sm:text-4xl font-bold text-primary mb-2"
               >
                 5+
               </motion.div>
               <div className="text-gray-400 text-sm sm:text-base">Years of Innovation</div>
             </div>
           </motion.div>

           {/* CTA button */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
             className="flex flex-col items-center justify-center"
           >
             <motion.button 
               onClick={() => {
                 const nextSection = document.querySelector('#projects-section');
                 if (nextSection) {
                   nextSection.scrollIntoView({ behavior: 'smooth' });
                 }
               }}
               className="group relative px-10 py-5 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <span className="relative z-10">Explore Our Work</span>
               <motion.svg 
                 className="w-6 h-6 relative z-10" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24"
                 animate={{ y: [0, -3, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               >
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
               </motion.svg>
               <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </motion.button>
           </motion.div>
        </div>
      </div>
    </section>
  );
} 