'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Commented out existing featured items
/*
const featuredItems = [
  {
    name: "ConceptX",
    description: "A dynamic web platform for image & video annotation used in AI training pipelines.",
    icon: "🎯",
    type: "project",
    tags: ["Web App", "Real-Time", "Client Work"],
    link: "/projects/conceptx",
    image: "/images/hs-image-1.webp"
  },
  {
    name: "QuickForm",
    description: "Create shareable HTML forms in seconds. No backend? No problem.",
    icon: "📝",
    type: "tool",
    tags: ["Dev Tool", "Open Source", "Forms"],
    link: "/tools/quickform",
    image: "/images/hs-image-1.webp"
  },
  {
    name: "MomentText.ai",
    description: "Designed and developed the frontend for a speech-to-text SaaS platform, integrating AI-driven workflows.",
    icon: "🎙️",
    type: "project",
    tags: ["SaaS", "React", "Frontend"],
    link: "/projects/momenttext",
    image: "/images/hs-image-1.webp"
  }
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'project', label: 'Projects' },
  { id: 'tool', label: 'Tools' }
];
*/

export default function BuiltForBuilders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // const [activeFilter, setActiveFilter] = useState('all');

  // const filteredItems = featuredItems.filter(item => 
  //   activeFilter === 'all' ? true : item.type === activeFilter
  // );

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-blue-500/8 to-purple-500/5 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/8 to-primary/5 rounded-full blur-[80px]"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.1, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Enhanced badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20, scale: isInView ? 1 : 0.8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg shadow-primary/10"
            >
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🚧
                </motion.span>
                Coming Soon
                <motion.span
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  🚧
                </motion.span>
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Work & Tools
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              We're currently building something amazing. Our portfolio and tools are being crafted with care and will be ready soon.
            </motion.p>
          </motion.div>

          {/* Coming Soon Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {/* Logo and Branding */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center gap-4 mb-12"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-main.png"
                  alt="Dev & Debate"
                  width={100}
                  height={35}
                  className="h-8 w-auto"
                  priority
                />
                <span className="text-xl font-bold text-white">
                  Dev & Debate
                </span>
              </div>
              <p className="text-gray-400 text-center max-w-md">
                Building amazing things takes time. Our portfolio and tools are being crafted with care.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Projects Coming Soon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-center">
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
                    <span className="text-2xl">🎯</span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Our Projects
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    Showcase of client work and personal projects that demonstrate our approach to building digital experiences.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <span className="text-sm font-medium">Coming Soon</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-lg">🚧</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Tools Coming Soon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <span className="text-2xl">🛠</span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Our Tools
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    Free tools and utilities we're building to help developers and creators work more efficiently.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <span className="text-sm font-medium">Coming Soon</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                      <span className="text-lg">🚧</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-primary/10 border border-primary/20 text-primary font-medium rounded-xl">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  ⏳
                </motion.span>
                <span>Stay Tuned for Updates</span>
                <motion.span
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  ⏳
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Commented out all the original content */}
        {/*
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Built for Builders – Our Work & Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            A showcase of both our creative client work and the tools we craft for the community.
          </motion.p>
        </div>

        <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <ItemCard key={item.name} item={item} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1"
          >
            <Link
              href="/our-work"
              className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all duration-300 group h-[180px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                  View All Projects
                </h3>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-gray-400 mb-4">
                Explore our complete portfolio of client work and personal projects.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Browse Projects</span>
                <svg 
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1"
          >
            <Link
              href="/tools"
              className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all duration-300 group h-[180px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                  Explore Our Tools
                </h3>
                <span className="text-2xl">🛠</span>
              </div>
              <p className="text-gray-400 mb-4">
                Discover all the tools and utilities we've built for the community.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Browse Tools</span>
                <svg 
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
        */}
      </div>
    </section>
  );
}

// Commented out all the original components
/*
function Filters({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-center gap-4 mb-12"
    >
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </motion.div>
  );
}

function ItemCard({ item, index }: { item: any; index: number }) {
  const [ref, inView] = useInView({ once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={item.link}
        className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all duration-300 h-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
            {item.name}
          </h3>
          <span className="text-2xl">{item.icon}</span>
        </div>
        
        <p className="text-gray-400 mb-4">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag: string, tagIndex: number) => (
            <span
              key={tagIndex}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-primary">
          <span className="text-sm font-medium">
            {item.type === 'project' ? 'View Project' : 'Try Tool'}
          </span>
          <svg 
            className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
*/ 