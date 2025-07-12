'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, BlogPost } from '@/lib/blog-api-simple';

// Global error handler for Firebase buffer errors
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args.join(' ');
    if (message.includes('INTERNAL ASSERTION FAILED') || 
        message.includes('Unexpected state') ||
        message.includes('ID: ca9')) {
      console.warn('⚠️ Firebase buffer error suppressed');
      return;
    }
    originalError.apply(console, args);
  };
}

export default function MoreThanCode() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from Firebase with error handling
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 2;

    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        
        // Add a small delay to prevent rapid Firebase calls
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const posts = await getAllBlogPosts();
        
        if (!isMounted) return;
        
        // Take only the first 3 published posts
        const publishedPosts = posts
          .filter((post: BlogPost) => post.status === 'published')
          .slice(0, 3);
          
        setBlogPosts(publishedPosts);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        
        console.error('Error fetching blog posts:', err);
        
        // Check if it's a Firebase buffer error
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.includes('INTERNAL ASSERTION FAILED') || 
            errorMessage.includes('Unexpected state') ||
            errorMessage.includes('buffer bounds') ||
            errorMessage.includes('ID: ca9')) {
          
          // Retry logic for Firebase errors
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(() => fetchBlogPosts(), 1000 * retryCount); // Exponential backoff
            return;
          }
          
          setError('Firebase temporarily unavailable. Please refresh the page.');
        } else {
          setError('Failed to load blog posts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (blogPosts.length === 0) return;
    
    const timer = setInterval(() => {
      if (!isDragging) {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isDragging, blogPosts.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (blogPosts.length === 0) return;
      
      if (e.key === 'ArrowLeft') {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
      } else if (e.key === 'ArrowRight') {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blogPosts.length]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    if (blogPosts.length === 0) return;
    
    const swipe = offset.x * velocity.x;
    const swipeThreshold = 100; // Reduced threshold for easier swiping
    
    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        // Swiped right - show previous card
        const newIndex = (currentIndex - 1 + blogPosts.length) % blogPosts.length;
        setCurrentIndex(newIndex);
        setDirection(-1);
      } else {
        // Swiped left - show next card
        const newIndex = (currentIndex + 1) % blogPosts.length;
        setCurrentIndex(newIndex);
        setDirection(1);
      }
    } else {
      // Not enough velocity, reset position
      setDirection(0);
    }
    
    // Reset dragging state
    setTimeout(() => setIsDragging(false), 100);
  };

  const getCardStyle = (index: number) => {
    if (blogPosts.length === 0) return {};
    
    const isCenter = index === currentIndex;
    const isLeft = index === (currentIndex - 1 + blogPosts.length) % blogPosts.length;
    const isRight = index === (currentIndex + 1) % blogPosts.length;

    if (isCenter) {
      return {
        scale: 1,
        x: 0,
        y: 0,
        zIndex: 2,
        opacity: 1,
        rotateY: 0,
        filter: 'brightness(1.1)'
      };
    } else if (isLeft) {
      return {
        scale: 0.85,
        x: '-45%',
        y: '5%',
        zIndex: 1,
        opacity: 0.5,
        rotateY: 15,
        filter: 'brightness(0.8) blur(1px)'
      };
    } else if (isRight) {
      return {
        scale: 0.85,
        x: '45%',
        y: '5%',
        zIndex: 1,
        opacity: 0.5,
        rotateY: -15,
        filter: 'brightness(0.8) blur(1px)'
      };
    } else {
      return {
        scale: 0.7,
        x: 0,
        y: 0,
        zIndex: 0,
        opacity: 0,
        rotateY: 0,
        filter: 'brightness(0.7) blur(2px)'
      };
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  We Build, We Learn, and Sometimes — We Just Talk Stories
                </h2>
                <p className="text-gray-400 text-lg">
                  At Dev & Debate, the journey doesn&apos;t end with a project launch. It&apos;s about staying curious, exploring ideas, and enjoying the creativity that surrounds us — from thoughtful blog posts on development and design to the occasional review, game insight, or a cinematic reflection.
                </p>
              </div>

              <p className="text-gray-300">
                We&apos;re a builder&apos;s hub first — here to help you learn, launch, and grow. But we also know every great coder needs a break. That&apos;s why we share insights, reviews, and perspectives on the things that inspire us — tech, games, cinema, and the occasional chess twist.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="/services" 
                  className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 w-full border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative flex items-center">
                    <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🛠️</span>
                    <span className="relative">
                      Explore Our Work
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.a>

                <div className="flex gap-4 w-full">
                  <motion.a 
                    href="/blog" 
                    className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 flex-1 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative flex items-center">
                      <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">✍️</span>
                      <span className="relative">
                        Read the Blog
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                      </span>
                      <svg 
                        className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.a>

                  <motion.a 
                    href="/contact" 
                    className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 flex-1 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative flex items-center">
                      <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🤝</span>
                      <span className="relative">
                        Let&apos;s Build Together
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                      </span>
                      <svg 
                        className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Loading State */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[350px] mx-auto flex items-center justify-center pt-12"
            >
              <div className="w-full h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading latest posts...</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || blogPosts.length === 0) {
    return (
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  We Build, We Learn, and Sometimes — We Just Talk Stories
                </h2>
                <p className="text-gray-400 text-lg">
                  At Dev & Debate, the journey doesn&apos;t end with a project launch. It&apos;s about staying curious, exploring ideas, and enjoying the creativity that surrounds us — from thoughtful blog posts on development and design to the occasional review, game insight, or a cinematic reflection.
                </p>
              </div>

              <p className="text-gray-300">
                We&apos;re a builder&apos;s hub first — here to help you learn, launch, and grow. But we also know every great coder needs a break. That&apos;s why we share insights, reviews, and perspectives on the things that inspire us — tech, games, cinema, and the occasional chess twist.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="/services" 
                  className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 w-full border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative flex items-center">
                    <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🛠️</span>
                    <span className="relative">
                      Explore Our Work
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.a>

                <div className="flex gap-4 w-full">
                  <motion.a 
                    href="/blog" 
                    className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 flex-1 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative flex items-center">
                      <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">✍️</span>
                      <span className="relative">
                        Read the Blog
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                      </span>
                      <svg 
                        className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.a>

                  <motion.a 
                    href="/contact" 
                    className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 flex-1 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative flex items-center">
                      <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🤝</span>
                      <span className="relative">
                        Let&apos;s Build Together
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                      </span>
                      <svg 
                        className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Error State */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[350px] mx-auto flex items-center justify-center pt-12"
            >
              <div className="w-full h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-gray-400 mb-4">Check out our latest posts</p>
                  <Link 
                    href="/blog"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Visit Blog
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                We Build, We Learn, and Sometimes — We Just Talk Stories
              </h2>
              <p className="text-gray-400 text-lg">
                At Dev & Debate, the journey doesn&apos;t end with a project launch. It&apos;s about staying curious, exploring ideas, and enjoying the creativity that surrounds us — from thoughtful blog posts on development and design to the occasional review, game insight, or a cinematic reflection.
              </p>
            </div>

            <p className="text-gray-300">
              We&apos;re a builder&apos;s hub first — here to help you learn, launch, and grow. But we also know every great coder needs a break. That&apos;s why we share insights, reviews, and perspectives on the things that inspire us — tech, games, cinema, and the occasional chess twist.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="/services" 
                className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 w-full border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex items-center">
                  <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🛠️</span>
                  <span className="relative">
                    Explore Our Work
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                  </span>
                  <svg 
                    className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.a>

              <div className="flex gap-4 w-full">
                <motion.a 
                  href="/blog" 
                  className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 flex-1 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative flex items-center">
                    <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">✍️</span>
                    <span className="relative">
                      Read the Blog
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.a>

                <motion.a 
                  href="/contact" 
                  className="group relative inline-flex items-center justify-center px-6 py-3 text-white text-sm sm:text-base overflow-hidden rounded-lg bg-black hover:bg-black/90 transition-all duration-300 flex-1 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative flex items-center">
                    <span className="text-2xl mr-3 transform group-hover:rotate-12 transition-transform duration-300">🤝</span>
                    <span className="relative">
                      Let&apos;s Build Together
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                    </span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Blog Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[350px] mx-auto flex items-center justify-center pt-12"
          >
            <div className="relative w-full h-[500px]">
              <AnimatePresence mode="wait">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={false}
                    animate={getCardStyle(index)}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.5
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: -200, right: 200 }}
                    dragElastic={0.3}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 1.02 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between group hover:bg-black/90 transition-all duration-300">
                        {/* Category Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                            {post.category || 'Development'}
                          </span>
                          <span className="text-2xl">
                            {post.category === 'Design' ? '🎨' : 
                             post.category === 'Creative Corner' ? '🎬' : '⚡'}
                          </span>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden rounded-xl mb-4">
                          <Image
                            src={post.coverImage || '/images/hs-image-1.webp'}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-3">
                            {post.excerpt || 'Discover insights and stories from the world of development and design.'}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Read more</span>
                            <svg 
                              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {blogPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 