'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Category = {
  id: string;
  name: string;
  count: number;
};

const categories: Category[] = [
  { id: 'all', name: 'All Posts', count: 0 },
  { id: 'development', name: 'Development', count: 12 },
  { id: 'design', name: 'Design', count: 8 },
  { id: 'technology', name: 'Technology', count: 10 },
  { id: 'movies', name: 'Movies', count: 5 },
  { id: 'games', name: 'Board Games', count: 6 },
];

type CategoriesProps = {
  onCategoryChange?: (categoryId: string) => void;
  className?: string;
};

export default function Categories({ onCategoryChange, className = '' }: CategoriesProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <section id="categories" className={`py-24 bg-gradient-to-b from-black/90 to-black relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">Explore Topics</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find articles that match your interests from our range of topics
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-5 py-3 rounded-xl text-sm transition-all duration-300 relative ${
                activeCategory === category.id
                  ? 'text-white font-medium'
                  : 'text-white/70 hover:text-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">
                {category.name} {category.count > 0 && <span className="ml-1 opacity-70">({category.count})</span>}
              </span>
              
              {activeCategory === category.id ? (
                <motion.span
                  layoutId="activeCategoryBackground"
                  className="absolute inset-0 bg-primary hover:bg-primary/90 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <span className="absolute inset-0 bg-white/5 hover:bg-white/10 rounded-xl transition-colors duration-300" />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold mb-6 text-white">Popular Tags</h3>
          <div className="flex flex-wrap gap-3">
            {['React', 'NextJS', 'TailwindCSS', 'TypeScript', 'JavaScript', 'UX', 'CSS', 'API', 'Node'].map((tag, index) => (
              <motion.a
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="px-4 py-2 text-sm bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/20 hover:border-blue-400/30 rounded-full text-white transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                #{tag}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 