'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const testimonials = [
  {
    quote: "Dev & Debate transformed our platform's user experience completely. Their attention to detail and innovative approach helped us create something truly exceptional. The team's expertise in both development and design thinking made all the difference.",
    author: "Satyam",
    role: "Founder, Platform Commons",
    type: "client",
    image: "/images/hs-image-1.webp",
    rating: 5
  },
  {
    quote: "Working with Dev & Debate was a game-changer for our tech infrastructure. They didn't just build what we asked for - they understood our vision and enhanced it with their technical expertise. The results exceeded our expectations.",
    author: "Sanam",
    role: "CTO, KrungTech",
    type: "client",
    image: "/images/hs-image-1.webp",
    rating: 5
  },
  {
    quote: "The team at Dev & Debate brought our sales platform to life with incredible precision. Their understanding of business logic combined with technical excellence created a solution that perfectly fits our needs. Highly recommended!",
    author: "Niel Kazi",
    role: "CEO, SalesGarners",
    type: "client",
    image: "/images/hs-image-1.webp",
    rating: 5
  },
  {
    quote: "Dev & Debate delivered exceptional results for our digital transformation project. Their collaborative approach, technical depth, and commitment to quality made the entire process smooth and successful. They're true professionals.",
    author: "Shafin Shaikh",
    role: "Marketing Head, Afsa InfoTech",
    type: "client",
    image: "/images/hs-image-1.webp",
    rating: 5
  },
  {
    quote: "The creative solutions and technical expertise from Dev & Debate helped us build a stunning digital presence. Their innovative approach to design and development set us apart in the market. Outstanding partnership!",
    author: "Shoaib Shaikh",
    role: "Founder, Adorn Media",
    type: "client",
    image: "/images/hs-image-1.webp",
    rating: 5
  },
  {
    quote: "Dev & Debate's mentorship program completely changed my approach to web development. Their practical insights and hands-on guidance helped me build better, more scalable solutions. The learning experience was invaluable.",
    author: "Huzefa",
    role: "Lead Developer, Darbar Webs",
    type: "mentee",
    image: "/images/hs-image-1.webp",
    rating: 5
  }
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(testimonials.length / 3);
  const currentTestimonials = testimonials.slice(currentIndex * 3, (currentIndex + 1) * 3);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden bg-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            They Built With Us — And Here&apos;s What They Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Real stories from our clients, mentees, and collaborators
          </motion.p>
        </div>

        {/* Navigation Arrows */}
        <div className="relative">
          <motion.button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary/20 hover:border-primary/20 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ backgroundColor: 'rgba(var(--color-primary), 0.2)' }}
            whileTap={{ backgroundColor: 'rgba(var(--color-primary), 0.3)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary/20 hover:border-primary/20 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ backgroundColor: 'rgba(var(--color-primary), 0.2)' }}
            whileTap={{ backgroundColor: 'rgba(var(--color-primary), 0.3)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence mode="wait">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative rounded-xl overflow-hidden border border-white/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 bg-black/90`}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-8">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg text-gray-300 italic relative mb-8">
                      <span className="absolute -left-2 -top-2 text-2xl text-primary/20">{`"`}</span>
                      {testimonial.quote}
                      <span className="absolute -right-2 -bottom-2 text-2xl text-primary/20">{`"`}</span>
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                          {testimonial.author}
                        </h3>
                        <p className="text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold text-white mb-4">
            💬 Ready to share your story with us?
          </p>
          <p className="text-gray-400 mb-8">
            Let&apos;s collaborate and build something meaningful.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors duration-300"
            >
              Get in Touch
            </Link>
            <Link
              href="/book-call"
              className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors duration-300"
            >
              Book a Discovery Call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 