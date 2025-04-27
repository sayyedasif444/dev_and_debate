'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    title: "The Art of Clean Code",
    category: "Dev Insight",
    image: "/images/hs-image-1.webp",
    excerpt: "Exploring the principles that make code not just work, but work beautifully.",
    emoji: "✨"
  },
  {
    title: "Cinema & Code: Parallel Stories",
    category: "Cinema Talk",
    image: "/images/hs-image-1.webp",
    excerpt: "How storytelling in film mirrors the narrative of software development.",
    emoji: "🎬"
  },
  {
    title: "Gaming & Development",
    category: "Game Note",
    image: "/images/hs-image-1.webp",
    excerpt: "The intersection of game design and software architecture.",
    emoji: "🎮"
  }
];

export default function MoreThanCode() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isDragging]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x * velocity.x;
    
    if (Math.abs(swipe) > 5000) {
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
  };

  const getCardStyle = (index: number) => {
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

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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

          {/* Right Side - Deck of Cards Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[350px] mx-auto flex items-center justify-center pt-12"
          >
            <div 
              className="relative w-full h-[500px] cursor-grab active:cursor-grabbing"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={getCardStyle(index)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1.2
                  }}
                  className="absolute w-full perspective-1000"
                  drag="x"
                  dragConstraints={{ left: -100, right: 100 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                  whileHover={index === currentIndex ? {
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  <div className="relative bg-gradient-to-br  from-black via-black/95 to-black/90 rounded-xl overflow-hidden border border-white/10 hover:border-primary/20 transition-all duration-300 shadow-2xl backdrop-blur-sm group hover:shadow-primary/5">
                    {/* Image Section */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                      <motion.div 
                        className="absolute top-4 right-4 text-4xl"
                        animate={index === currentIndex ? {
                          rotate: [0, -10, 10, -5, 5, 0],
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }
                        } : {}}
                      >
                        {post.emoji}
                      </motion.div>
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={index === currentIndex ? {
                          background: [
                            "linear-gradient(45deg, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)",
                            "linear-gradient(45deg, transparent 0%, rgba(var(--primary-rgb), 0.1) 100%)",
                            "linear-gradient(45deg, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)"
                          ]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 relative bg-white/5">
                      <motion.div 
                        className="mb-4 flex items-center gap-2"
                        animate={index === currentIndex ? {
                          x: [0, 5, 0],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 4
                          }
                        } : {}}
                      >
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full group-hover:bg-primary/30 transition-colors duration-300">
                          {post.category}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="text-xs text-white/60">5 min read</span>
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-3 h-12 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed h-20 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Link 
                          href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group/link"
                        >
                          <span className="text-sm font-medium relative">
                            Read More
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover/link:w-full transition-all duration-300" />
                          </span>
                          <motion.span
                            className="ml-2"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </Link>
                        <div className="flex items-center gap-2">
                          <motion.span 
                            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <span className="text-xs">❤️</span>
                          </motion.span>
                          <motion.span 
                            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <span className="text-xs">💬</span>
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 