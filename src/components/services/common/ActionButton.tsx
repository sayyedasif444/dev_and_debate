'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary';
  icon?: string;
}

export default function ActionButton({ href, text, variant = 'primary', icon = '✨' }: ActionButtonProps) {
  return (
    <Link href={href}>
      <motion.div 
        className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 group ${
          variant === 'primary' 
            ? 'bg-primary text-white hover:bg-primary/90' 
            : 'bg-transparent border border-white/30 text-white hover:bg-white/5'
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {icon && <span className="text-xl">{icon}</span>}
        <span className="text-lg font-medium group-hover:mr-1 transition-all">{text}</span>
        <svg 
          className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </Link>
  );
} 