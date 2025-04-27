'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlogPost } from './data/blogData';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, posts.length));
  };

  return (
    <section id="latest-articles" className="py-12 bg-gradient-to-b from-black to-black/90 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">Latest Articles</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Discover Our Latest Insights</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Dive into our collection of articles covering development, design, technology and more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, visiblePosts).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard post={post} index={index} />
            </motion.div>
          ))}
        </div>
        
        {visiblePosts < posts.length && (
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <button
              onClick={loadMorePosts}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <span>Load More Articles</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

