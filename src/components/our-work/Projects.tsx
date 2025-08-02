'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, icon, description, features, ctaText, ctaLink, delay }) => {
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
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Platform Commons",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
      ),
      description: "A comprehensive tech ecosystem for social impact organizations, connecting nonprofits with tech solutions and resources.",
      features: [
        "Nonprofit tech solutions marketplace",
        "Resource sharing platform",
        "Community collaboration tools",
        "Impact measurement dashboard"
      ],
      ctaText: "View Case Study",
      ctaLink: "/projects/platform-commons",
      delay: 0.1
    },
    {
      title: "QuickLaunch Portfolio",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      ),
      description: "A ready-to-go setup for freelancers to launch their digital presence in hours instead of weeks.",
      features: [
        "Pre-built portfolio templates",
        "Customizable components",
        "SEO optimized structure",
        "Deployment ready setup"
      ],
      ctaText: "View Project",
      ctaLink: "/projects/quicklaunch",
      delay: 0.2
    },
    {
      title: "DevMetrics Dashboard",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      description: "An interactive analytics platform for developers to track performance, growth, and learning metrics.",
      features: [
        "Real-time performance tracking",
        "Learning progress visualization",
        "Goal setting and monitoring",
        "Team collaboration insights"
      ],
      ctaText: "See Case Study",
      ctaLink: "/projects/devmetrics",
      delay: 0.3
    },
    {
      title: "CreatorSpace Community",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      description: "A collaborative platform where creators can connect, share work, and get feedback from peers.",
      features: [
        "Creator networking platform",
        "Portfolio sharing system",
        "Feedback and review tools",
        "Collaboration workspaces"
      ],
      ctaText: "Explore Platform",
      ctaLink: "/projects/creatorspace",
      delay: 0.4
    }
  ];

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
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
            <span className="text-sm font-medium text-primary">Projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Projects</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A selection of client work and personal projects that showcase our approach to building digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
} 