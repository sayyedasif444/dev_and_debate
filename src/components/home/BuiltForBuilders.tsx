'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface WorkCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  delay: number;
  isComingSoon?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({ title, icon, description, features, ctaText, ctaLink, delay, isComingSoon = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 bg-white/5 p-6 flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300 mb-4">{title}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1 shrink-0">▹</span>
                <span className="text-gray-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/5">
        {isComingSoon ? (
          <div className="w-full bg-gray-800/50 text-gray-400 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2">
            <span>{ctaText}</span>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⏳
            </motion.span>
          </div>
        ) : (
          <Link href={ctaLink}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/25"
            >
              <span>{ctaText}</span>
              <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default function BuiltForBuilders() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  return (
    <section className="py-20 bg-black/40 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">Our Work & Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Builders</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A showcase of both our creative client work and the tools we craft for the community. From collaborative digital platforms to developer utilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <WorkCard
            title="Our Projects"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            }
            description="Showcase of client work and personal projects that demonstrate our approach to building digital experiences."
            features={[
              "Platform Commons - Collaborative digital platform for communities",
              "QuickLaunch - Portfolio starter pack",
              "DevMetrics - Developer analytics dashboard",
              "CreatorSpace - Community platform"
            ]}
            ctaText="View All Projects"
            ctaLink="/our-work"
            delay={0.1}
          />
          
          <WorkCard
            title="Developer Tools"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            }
            description="Free tools and utilities we're building to help developers and creators work more efficiently."
            features={[
              "Code snippets manager",
              "Project management templates",
              "SEO audit helper",
              "Content idea generator"
            ]}
            ctaText="Coming Soon"
            ctaLink="#"
            delay={0.2}
            isComingSoon={true}
          />
        </div>
      </div>
    </section>
  );
} 