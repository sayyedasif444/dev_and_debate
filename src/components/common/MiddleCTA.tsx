'use client';

import Link from 'next/link';

export default function MiddleCTA() {
  return (
    <div className="py-12 border-t border-gray-800">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-xl md:text-2xl font-normal text-white mb-3">
          Ready to <span className="text-primary">Learn</span>, <span className="text-primary">Build</span>, or <span className="text-primary">Transform</span> Your Vision into Reality?
        </h2>
        
        <p className="text-gray-500 mb-6 text-sm">
          Let's make it happen — together.
        </p>
        
        <Link href="/contact" className="inline-flex items-center px-5 py-2 text-primary text-sm border-b border-primary hover:text-primary/80 transition-colors duration-200">
          Get In Touch
          <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 