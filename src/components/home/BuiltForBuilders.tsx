'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function BuiltForBuilders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = featuredItems.filter(item => 
    activeFilter === 'all' ? true : item.type === activeFilter
  );

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          {filters.map(filter => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary/20 text-primary border border-primary/20'
                  : 'bg-black text-white border border-white/10 hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-xl overflow-hidden border border-white/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 ${
                index % 2 === 0 ? 'bg-white/5' : 'bg-white/5'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                <motion.div 
                  className="absolute top-4 right-4 text-4xl"
                  animate={isInView ? {
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.2, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }
                  } : {}}
                >
                  {item.icon}
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
              </div>
              <div className="p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <motion.span
                    className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary"
                    animate={isInView ? {
                      scale: [1, 1.1, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }
                    } : {}}
                  >
                    {item.type === 'project' ? 'Project' : 'Tool'}
                  </motion.span>
                </div>
                <p className="text-gray-400 mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: tagIndex * 0.1 }}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.link}
                    className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                  >
                    <span className="text-sm font-medium">
                      {item.type === 'project' ? 'View Case Study' : 'Try Tool'}
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1"
          >
            <Link
              href="/projects"
              className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all duration-300 group h-[180px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                  View All Projects
                </h3>
                <span className="text-2xl">💼</span>
              </div>
              <p className="text-gray-400 mb-4">
                Explore our complete portfolio of client work and case studies.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">See Projects</span>
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
                Discover all the tools and utilities we{`'`}ve built for the community.
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
      </div>
    </section>
  );
} 