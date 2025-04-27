'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Categories from './Categories';
import SearchBar from './SearchBar';

type BlogLayoutProps = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real application, you would likely fetch filtered posts here
    // or pass the search query to a parent component
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // In a real application, you would likely fetch filtered posts here
    // or pass the category to a parent component
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-8">
          <SearchBar 
            onSearch={handleSearch} 
            className="mb-8"
          />
          
          <Categories 
            onCategoryChange={handleCategoryChange}
          />
        </aside>
        
        {/* Main content */}
        <main className="lg:col-span-9">
          {children}
        </main>
      </motion.div>
    </div>
  );
} 