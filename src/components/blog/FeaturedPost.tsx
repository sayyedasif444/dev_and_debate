'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlogPost } from './data/blogData';

interface FeaturedPostProps {
  post: BlogPost;
  loading?: boolean;
}

export default function FeaturedPost({ post, loading = false }: FeaturedPostProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Generate deterministic engagement numbers based on post slug to avoid hydration mismatch
  const hash = post.slug.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const likesCount = Math.abs(hash % 150) + 50;
  const commentsCount = Math.abs(hash % 40) + 5;

  if (loading) {
    return (
      <div className="relative h-[450px] overflow-hidden rounded-xl bg-gradient-to-br from-black/80 to-black border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading featured post...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Link href={`/blog/${post.slug}`} className="block relative h-[450px] overflow-hidden rounded-xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/30 rounded-full">
            {post.category}
          </span>
          
          {post.featured && (
            <div className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <motion.svg 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-yellow-500 mr-1"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" fill="currentColor" />
              </motion.svg>
              <span className="text-xs text-yellow-500 font-medium">Featured</span>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="text-sm mb-2 opacity-70">{post.publishedAt}</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">{post.title}</h2>
          <p className="text-base opacity-80 mb-6 line-clamp-2 text-gray-300">{post.excerpt}</p>
          
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center">
              <div className="relative overflow-hidden rounded-full border-2 border-primary/20 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center w-10 h-10">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium text-white">Admin</p>
                <p className="text-sm opacity-70">Read more</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Likes and Comments Stats */}
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{(post as any).likes || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{(post as any).comments?.length || 0}</span>
                </div>
              </div>
              
              <div className="text-primary font-medium hover:underline">
                Read more &rarr;
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 