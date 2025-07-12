'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectData {
  name: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  image: string;
  gallery: string[];
  results: string[];
  techStack: string[];
  features: string[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
  callToAction: string;
  ctaLink: string;
}

interface ProjectPageClientProps {
  projectData: ProjectData;
}

export default function ProjectPageClient({ projectData }: ProjectPageClientProps) {
  return (
    <main className="min-h-screen pt-28 pb-16">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-blue-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {projectData.name}
              </h1>
              <p className="text-xl md:text-2xl text-blue-400 mb-6">
                {projectData.tagline}
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {projectData.description}
              </p>
            </motion.div>

            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Image
                src={projectData.image}
                alt={projectData.name}
                width={1200}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Challenge & Solution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">The Challenge</h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                {projectData.challenge}
              </p>
              
              <h2 className="text-2xl font-bold text-white mb-6">Our Solution</h2>
              <p className="text-gray-300 leading-relaxed">
                {projectData.solution}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Results</h2>
              <ul className="space-y-4">
                {projectData.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 bg-blue-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6">
              "{projectData.testimonial.quote}"
            </blockquote>
            <div>
              <p className="text-white font-semibold">{projectData.testimonial.author}</p>
              <p className="text-gray-400">{projectData.testimonial.title}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8">
              Experience the power of {projectData.name} for yourself.
            </p>
            <Link
              href={projectData.ctaLink}
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              {projectData.callToAction}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 