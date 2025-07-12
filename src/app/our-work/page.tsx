'use client';

import { useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
import { Metadata } from 'next';
import Image from 'next/image';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Commented out all the existing components and data
/*
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Component for tool cards
const ToolCard = ({ title, description, ctaText, ctaLink }: { 
  title: string; 
  description: string; 
  ctaText: string;
  ctaLink: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-900/30"
    >
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4 h-12">{description}</p>
      <Link
        href={ctaLink}
        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
      >
        {ctaText}
        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  );
};

// Component for project cards
const ProjectCard = ({ title, description, techStack, ctaText, ctaLink }: {
  title: string;
  description: string;
  techStack: string[];
  ctaText: string;
  ctaLink: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10"
    >
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, index) => (
          <span 
            key={index} 
            className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <Link
        href={ctaLink}
        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
      >
        {ctaText}
        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  );
};
*/

export default function OurWork() {
  // const [ref, inView] = useInView({
  //   triggerOnce: true,
  //   threshold: 0.1,
  // });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Commented out all the existing data and functions
  /*
  // Smooth scroll function
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Tool data
  const tools = [
    {
      title: "Code Snippets Manager",
      description: "One-click save and reuse your most valuable code snippets.",
      ctaText: "Use Now",
      ctaLink: "/tools/code-snippets"
    },
    {
      title: "Project Management Templates",
      description: "Ready-to-use Agile & Scrum boards for your projects.",
      ctaText: "Learn More",
      ctaLink: "/tools/pm-templates"
    },
    {
      title: "SEO Audit Helper",
      description: "Quick scan tool to identify and fix SEO issues on your site.",
      ctaText: "Try It",
      ctaLink: "/tools/seo-audit"
    },
    {
      title: "Content Idea Generator",
      description: "Never run out of content ideas with our AI-powered generator.",
      ctaText: "Generate Ideas",
      ctaLink: "/tools/content-ideas"
    },
    {
      title: "Portfolio Builder Mini-App",
      description: "Build a stunning portfolio website without coding.",
      ctaText: "Start Building",
      ctaLink: "/tools/portfolio-builder"
    },
    {
      title: "Code Review Assistant",
      description: "Get automated suggestions to improve your code quality.",
      ctaText: "Check Code",
      ctaLink: "/tools/code-review"
    }
  ];

  // Project data
  const projects = [
    {
      title: "QuickLaunch – Portfolio Starter Pack",
      description: "A ready-to-go setup for freelancers to launch their digital presence in hours instead of weeks.",
      techStack: ["Next.js", "TailwindCSS", "Framer Motion", "Vercel"],
      ctaText: "View Project",
      ctaLink: "/projects/quicklaunch"
    },
    {
      title: "DevMetrics Dashboard",
      description: "An interactive analytics platform for developers to track performance, growth, and learning metrics.",
      techStack: ["React", "D3.js", "Firebase", "TypeScript"],
      ctaText: "See Case Study",
      ctaLink: "/projects/devmetrics"
    },
    {
      title: "CreatorSpace Community",
      description: "A collaborative platform where creators can connect, share work, and get feedback from peers.",
      techStack: ["Vue.js", "Node.js", "MongoDB", "AWS"],
      ctaText: "Explore Platform",
      ctaLink: "/projects/creatorspace"
    }
  ];
  */

  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Work in Progress Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Logo and Branding */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-4 mb-12"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-main.png"
                  alt="Dev & Debate"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
                <span className="text-2xl font-bold text-white">
                  Dev & Debate
                </span>
              </div>
              <p className="text-gray-400 text-center max-w-lg">
                We're currently building something amazing. Our portfolio and tools are being crafted with care.
              </p>
            </motion.div>

            <div className="inline-block mb-6 px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">Coming Soon</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Work in Progress
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              We're currently building something amazing. Our portfolio and tools are being crafted with care and will be ready soon.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <div className="px-8 py-4 bg-primary/10 border border-primary/20 text-primary font-medium rounded-xl">
              🚧 Under Construction
            </div>
            <div className="px-8 py-4 bg-gray-800/50 border border-white/10 text-gray-300 font-medium rounded-xl">
              Stay Tuned
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commented out all the original content */}
      {/*
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">Our Work</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Built for Builders
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              A showcase of both our creative client work and the tools we craft for the community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('tools')}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Our Tools</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white font-medium rounded-xl transition-all duration-300"
              >
                View Projects
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="tools" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Tools</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Free tools and utilities we've built to help developers and creators work more efficiently.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection of client work and personal projects that showcase our approach to building digital experiences.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </motion.div>
        </div>
      </section>
      */}
    </main>
  );
} 