'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ToolCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  ctaText: string;
  delay: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon, description, features, ctaText, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
        <div className="w-full bg-gray-800/50 text-gray-400 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2">
          <span>{ctaText}</span>
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ⏳
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Tools() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tools = [
    {
      title: "Code Snippets Manager",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
      description: "One-click save and reuse your most valuable code snippets with smart organization and search.",
      features: [
        "Smart snippet organization",
        "Quick search and filters",
        "Syntax highlighting",
        "Team sharing capabilities"
      ],
      ctaText: "Coming Soon",
      delay: 0.1
    },
    {
      title: "Project Management Templates",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      ),
      description: "Ready-to-use Agile & Scrum boards, kanban templates, and project planning tools.",
      features: [
        "Agile & Scrum templates",
        "Kanban board layouts",
        "Project planning tools",
        "Team collaboration features"
      ],
      ctaText: "Coming Soon",
      delay: 0.2
    },
    {
      title: "SEO Audit Helper",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      description: "Quick scan tool to identify and fix SEO issues on your website with actionable recommendations.",
      features: [
        "Automated SEO scanning",
        "Issue identification",
        "Actionable recommendations",
        "Performance tracking"
      ],
      ctaText: "Coming Soon",
      delay: 0.3
    },
    {
      title: "Content Idea Generator",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
      description: "Never run out of content ideas with our AI-powered generator for blogs, social media, and marketing.",
      features: [
        "AI-powered idea generation",
        "Multiple content types",
        "Trend analysis",
        "Content calendar planning"
      ],
      ctaText: "Coming Soon",
      delay: 0.4
    }
  ];

  return (
    <section className="py-20 bg-gray-900/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
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
            <span className="text-sm font-medium text-primary">Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Tools</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Free tools and utilities we're building to help developers and creators work more efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
} 