'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ToolData {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  useCases: string[];
  callToAction: string;
  ctaLink: string;
}

interface ToolPageClientProps {
  toolData: ToolData;
}

export default function ToolPageClient({ toolData }: ToolPageClientProps) {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-16">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-1 rounded-xl">
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <Image
                      src={toolData.image || '/images/tools/placeholder.jpg'}
                      alt={toolData.name}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      unoptimized // Remove this in production with real images
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl font-bold">{toolData.name}</h1>
                <p className="text-xl text-blue-400">{toolData.subtitle}</p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {toolData.description}
                </p>
                <Link
                  href={toolData.ctaLink}
                  className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  {toolData.callToAction}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            ✨ Key Features
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {toolData.features.map((feature: string, index: number) => (
              <div 
                key={index}
                className="bg-gray-900/70 p-6 rounded-xl border border-gray-800"
              >
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            🚀 Perfect For
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {toolData.useCases.map((useCase: string, index: number) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-blue-900/10 to-transparent p-6 rounded-xl border-l-2 border-blue-500"
              >
                <p className="text-gray-300 text-lg">{useCase}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-12 rounded-2xl border border-blue-800/30"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to try {toolData.name}?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers, creators, and professionals who are already using our tools to improve their workflow.
          </p>
          <Link
            href={toolData.ctaLink}
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            {toolData.callToAction} →
          </Link>
          <p className="mt-4 text-gray-500 text-sm">No credit card required • Free to start</p>
        </motion.div>
      </section>

      {/* Back to Tools */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all tools
        </Link>
      </div>
    </main>
  );
} 