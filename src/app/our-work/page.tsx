'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

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

export default function OurWork() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-20 bg-black relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2] 
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/50 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-400/50 rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-4 px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full"
            >
              <span className="text-sm font-medium text-primary">Our Portfolio</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Tools and Projects — <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Built for Builders, Dreamers, and Doers
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
            >
              Explore the tools we've crafted and the projects we've powered — all designed to make your digital journey faster, smarter, and more creative.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Tools Section */}
      <section id="tools" className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            🛠 Our Tools to Make Your Life Easier
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools.map((tool, index) => (
              <ToolCard 
                key={index}
                title={tool.title}
                description={tool.description}
                ctaText={tool.ctaText}
                ctaLink={tool.ctaLink}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            🚀 Projects That Speak Louder Than Words
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                ctaText={project.ctaText}
                ctaLink={project.ctaLink}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Our Tools and Projects Matter */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8"
          >
            🔥 Why We Build — And Why It Matters
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-400"
          >
            Every tool we create, every project we take on — is born from a simple belief: great ideas deserve great execution. 
            Whether you're an individual creator or a growing team, our tools are designed to cut friction, boost creativity, 
            and move you closer to your goals.
          </motion.p>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-10 rounded-2xl border border-blue-800/30"
        >
          <h3 className="text-2xl font-bold mb-4">Got an idea? Need a tool? Or want us to build something together?</h3>
          <Link
            href="/contact"
            className="inline-block mt-4 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            👉 Let's Talk
          </Link>
        </motion.div>
      </section>
    </main>
  );
} 