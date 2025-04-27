'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

type SearchBarProps = {
  onSearch?: (query: string) => void;
  className?: string;
};

export default function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    onSearch?.('');
  };

  // Handle escape key to blur the input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative group ${className}`}
    >
      <motion.div 
        className={`flex items-center overflow-hidden rounded-full transition-all duration-300 ${
          isFocused 
            ? 'bg-white/10 ring-2 ring-primary/50' 
            : 'bg-white/5 hover:bg-white/8'
        }`}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className="pl-4 text-white/70">
          <FiSearch size={18} />
        </span>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search articles..."
          className="w-full py-3 px-3 bg-transparent text-white outline-none placeholder:text-white/50"
          aria-label="Search articles"
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              onClick={clearSearch}
              className="pr-4 text-white/70 hover:text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              aria-label="Clear search"
            >
              <FiX size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            className="absolute -bottom-6 left-4 text-xs text-white/50"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            Press Enter to search
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
} 