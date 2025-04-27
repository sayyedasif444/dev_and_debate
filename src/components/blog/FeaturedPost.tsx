'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlogPost } from './data/blogData';

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Generate random engagement numbers for demo
  const likesCount = Math.floor(Math.random() * 150) + 50;
  const commentsCount = Math.floor(Math.random() * 40) + 5;

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
              <div className="relative overflow-hidden rounded-full border-2 border-primary/20">
                <Image 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm opacity-70">Read more</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Likes */}
              <motion.div 
                className="flex items-center text-white/70 hover:text-primary cursor-pointer transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs">{likesCount}</span>
              </motion.div>
              
              {/* Comments */}
              <motion.div 
                className="flex items-center text-white/70 hover:text-primary cursor-pointer transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs">{commentsCount}</span>
              </motion.div>
            </div>
          </div>
          <Link href={`/blog/${post.slug}`} className="text-primary font-medium mt-4 inline-block hover:underline">
            Read more &rarr;
          </Link>
        </div>
      </Link>
    </motion.div>
  );
} 