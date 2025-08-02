'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PlatformCommonsCaseStudy() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });

  // Add custom scrollbar styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-thin::-webkit-scrollbar {
        width: 8px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🌍 Platform Commons
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Empowering Communities with a Collaborative Digital Platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
              <span className="px-3 py-1 bg-white/5 rounded-full">Next.js</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">React</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">UX/UI Design</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">SEO Optimization</span>
            </div>
            
                         {/* Website Screenshot */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="relative max-w-6xl mx-auto"
             >
               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                 <div className="bg-white/10 rounded-xl p-2 mb-4">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                       <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                       <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                       <span className="text-gray-400 text-sm ml-2">platformcommons.org</span>
                     </div>
                     <Link 
                       href="https://platformcommons.org" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-300"
                     >
                       Visit Website →
                     </Link>
                   </div>
                 </div>
                 <div className="relative overflow-hidden rounded-lg bg-white">
                   <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                     <Image
                       src="/images/projects/pc1.png"
                       alt="Platform Commons Website Screenshot"
                       width={1200}
                       height={3000}
                       className="w-full h-auto"
                       priority
                     />
                   </div>
                 </div>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">📌 Overview</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Platform Commons is an initiative aimed at building shared digital infrastructure for communities and organizations. Their vision was to create a unified platform where people can connect, collaborate, and scale their impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Our Role at Dev & Debate:</h3>
            <p className="text-gray-300 leading-relaxed">
              We partnered with Platform Commons to design, develop, and deliver a scalable, user-friendly digital presence that reflects their mission and facilitates growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">🎯 The Challenge</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Build a modern and inclusive website that communicates the platform's purpose clearly.",
              "Ensure scalability and accessibility for a wide range of users across geographies.",
              "Design with a minimalist, clean approach that resonates with both grassroots communities and tech-savvy users.",
              "Optimize performance for speed, responsiveness, and SEO to reach a global audience."
            ].map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <p className="text-gray-300">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">🛠️ Our Approach</h2>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                title: "Discovery & Research",
                items: [
                  "Understood the vision of Platform Commons as a movement-driven initiative.",
                  "Studied target audience needs and aligned them with a clean digital design."
                ]
              },
              {
                title: "Design & User Experience",
                items: [
                  "Created a minimal, black-and-white inspired theme for clarity and inclusiveness.",
                  "Focused on responsive layouts and ease of navigation for all age groups."
                ]
              },
              {
                title: "Development & Integration",
                items: [
                  "Built the website using Next.js + React for speed and maintainability.",
                  "Implemented SEO-first practices from day one.",
                  "Ensured compatibility with future integrations and multilingual support."
                ]
              },
              {
                title: "Testing & Delivery",
                items: [
                  "Cross-browser and cross-device testing to ensure a smooth experience everywhere.",
                  "Delivered with optimized performance and lightweight assets for faster loading times."
                ]
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-8 rounded-2xl border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="text-primary mt-1 shrink-0">▹</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">🚀 The Outcome</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              "A modern, scalable, and purpose-driven website live at platformcommons.org",
              "Increased engagement from community members due to intuitive navigation.",
              "Performance-optimized site with fast load times across devices.",
              "A strong digital foundation for Platform Commons to expand its ecosystem."
            ].map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/10 to-blue-500/10 p-6 rounded-xl border border-primary/20"
              >
                <p className="text-gray-300">{outcome}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-6 text-primary">📊 Key Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Tech Stack</h4>
                <p className="text-gray-300">Next.js, React, Tailwind CSS</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Focus Areas</h4>
                <p className="text-gray-300">UX/UI Design, Accessibility, SEO Optimization, Performance</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Impact</h4>
                <p className="text-gray-300">Helped Platform Commons establish a strong, trustworthy online identity and reach a wider audience effectively.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learnings Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">💡 Learnings & Reflections</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-blue-500/10 p-8 rounded-2xl border border-primary/20 text-center"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              This project reaffirmed our belief in designing for inclusivity and scalability. For initiatives like Platform Commons, technology isn't just about websites — it's about enabling collaboration, amplifying voices, and building for the greater good.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's transform your ideas into powerful digital solutions that drive real business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Start Your Project
              </Link>
              <Link
                href="/our-work"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl border border-white/20 transition-all duration-300"
              >
                View More Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 