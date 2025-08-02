'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';

interface WorkCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink?: string;
  delay: number;
  isComingSoon?: boolean;
}

interface ToolCardProps {
  title: string;
  icon: string;
  description: string;
  toolUrl: string;
  delay: number;
  isComingSoon?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon, description, toolUrl, delay, isComingSoon = false }) => {
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
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm min-h-[320px]"
    >
      <div className="p-6 flex flex-col items-center text-center h-full">
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          {isComingSoon ? (
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-md px-2 py-1">
              <span className="text-gray-400 text-xs font-medium">Coming Soon</span>
            </div>
          ) : (
            <div className="bg-green-900/80 backdrop-blur-sm border border-green-600/50 rounded-md px-2 py-1">
              <span className="text-green-400 text-xs font-medium">Live</span>
            </div>
          )}
        </div>

        {/* Tool Icon with professional styling */}
        <div className="relative mb-5">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-700/50 to-gray-600/30 rounded-xl flex items-center justify-center text-3xl group-hover:from-gray-600/50 group-hover:to-gray-500/30 transition-all duration-300 shadow-md">
            {icon}
          </div>
        </div>
        
        {/* Tool Title with clean typography */}
        <h3 className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors duration-300 mb-3">
          {title}
        </h3>
        
        {/* Tool Description */}
        <p className="text-gray-400 mb-6 leading-relaxed text-sm max-w-xs h-16 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {description}
        </p>
        
        {/* Professional CTA Button - pushed to bottom */}
        <div className="w-full mt-auto">
          {isComingSoon ? (
            <div className="w-full bg-gray-800/60 text-gray-400 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-gray-700/50">
              <span className="text-sm">Coming Soon</span>
              <span className="text-sm">⏳</span>
            </div>
          ) : (
            <a 
              href={toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm border border-blue-600/30"
            >
              <span>Try Tool</span>
              <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const WorkCard: React.FC<WorkCardProps> = ({ title, icon, description, features, ctaText, ctaLink, delay, isComingSoon = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get project image based on title
  const getProjectImage = (projectTitle: string) => {
    switch (projectTitle) {
      case "Platform Commons":
        return "/images/projects/pc1.png";
      case "ITCC Connect":
        return "/images/projects/itcc.png";
      case "Adorn Media":
        return "/images/projects/adornmedia.png";
      case "SalesGarners":
        return "/images/projects/salesgarners.png";
      case "Enterprise Solutions":
        return "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm min-h-[400px]"
    >
             {/* Project Image */}
       <div className="relative h-40 overflow-hidden">
         <Image
           src={getProjectImage(title)}
           alt={`${title} Preview`}
           fill
           className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
         
         {/* Browser frame for Platform Commons */}
         {title === "Platform Commons" && (
           <div className="absolute bottom-3 left-3 right-3">
             <div className="flex items-center gap-2 mb-1">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
               <span className="text-white/90 text-xs ml-2 font-medium">platformcommons.org</span>
             </div>
           </div>
         )}
         
         {/* Project badge */}
         <div className="absolute top-3 left-3">
           <div className="bg-blue-600/90 backdrop-blur-sm border border-blue-300/40 rounded-full px-2 py-0.5 flex items-center justify-center">
             <span className="text-white text-xs font-medium">
               {isComingSoon ? "Coming Soon" : "Live Project"}
             </span>
           </div>
         </div>
       </div>
       
                <div className="p-4 flex flex-col">
         <div className="flex items-start gap-3 mb-4">
           <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-2 rounded-lg text-primary group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-lg shadow-primary/10">
             {icon}
           </div>
           <div className="flex-1">
             <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 mb-2">{title}</h3>
              <p className="text-gray-300 mb-3 leading-relaxed h-12 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1 shrink-0 text-sm">▹</span>
                    <span className="text-white text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
           </div>
         </div>
         
         <div className="mt-auto pt-4 border-t border-white/10">
                     {isComingSoon ? (
             <div className="w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-300 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 backdrop-blur-sm border border-white/10">
               <span className="text-sm">{ctaText}</span>
               <motion.span
                 animate={{ rotate: [0, 360] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               >
                 ⏳
               </motion.span>
             </div>
           ) : (
             <Link href={ctaLink || "#"}>
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/25 border border-primary/20 text-sm"
               >
                 <span>{ctaText}</span>
                 <svg className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </motion.button>
             </Link>
           )}
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkShowcase() {
  const [activeTab, setActiveTab] = useState<'projects' | 'tools'>('projects');
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
      description: "Empowering communities with a collaborative digital platform. Built a modern, scalable website that connects nonprofits with tech solutions and facilitates social impact at scale.",
      features: [
        "Modern, inclusive website design",
        "Scalable digital infrastructure",
        "SEO-optimized performance",
        "Cross-device accessibility"
      ],
      ctaText: "View Case Study",
      ctaLink: "/our-work/platform-commons",
      delay: 0.1
    },
    {
      title: "Blog Content Generator",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
      description: "AI-powered blog content generation tool that transforms ideas into engaging, SEO-optimized articles. Built with cutting-edge AI technology for creators and marketers.",
      features: [
        "AI content generation",
        "SEO optimization",
        "Multiple AI models",
        "Real-time editing"
      ],
      ctaText: "View Case Study",
      ctaLink: "/our-work/blog-tool",
      delay: 0.15
    },
                    {
                  title: "ITCC Connect",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  ),
                  description: "Complete digital ecosystem for India Thai Chamber of Commerce. Flutter mobile app, Node.js backend, and React web application revolutionizing membership management.",
                  features: [
                    "Flutter mobile app (iOS & Android)",
                    "Node.js backend API",
                    "React web application",
                    "Membership management system"
                  ],
                        ctaText: "View Case Study",
      ctaLink: "/our-work/itcc-connect",
      delay: 0.2
    },
                {
                  title: "Adorn Media",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  ),
                  description: "Comprehensive digital transformation for B2B lead generation and demand generation company. Multiple web applications, mobile apps, and modern website.",
                  features: [
                    "React, Next.js, Node.js stack",
                    "Laravel, .NET, Web3 integration",
                    "B2B marketing platforms",
                    "Mobile applications"
                  ],
                        ctaText: "View Case Study",
      ctaLink: "/our-work/adorn-media",
      delay: 0.25
    },
                {
                  title: "SalesGarners",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                  ),
                  description: "Modern WordPress website for SalesGarners Marketing Pvt. Ltd., showcasing B2B lead generation services and X-Engage platform.",
                  features: [
                    "WordPress development",
                    "B2B lead generation focus",
                    "X-Engage platform showcase",
                    "Professional branding"
                  ],
                        ctaText: "View Case Study",
      ctaLink: "/our-work/salesgarners",
      delay: 0.3
    },
                {
                  title: "Enterprise Solutions",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  ),
                  description: "Comprehensive enterprise application development services helping organizations achieve their digital transformation goals with modern tech stacks, DevOps, and AI integration.",
                  features: [
                    "Microservices architecture",
                    "Cloud-native development",
                    "DevOps automation",
                    "AI/ML integration"
                  ],
                        ctaText: "View Case Study",
      ctaLink: "/our-work/enterprise-solutions",
      delay: 0.35
                }
  ];

  const tools = [
    {
      title: "Blog Content Generator",
      icon: "✍️",
      description: "AI-powered tool that transforms ideas into engaging, SEO-optimized blog posts in seconds.",
      toolUrl: "https://blog-tool.devanddebate.com/",
      delay: 0.1
    },
    {
      title: "Code Snippets Manager",
      icon: "💻",
      description: "Save and organize your code snippets with smart search and team sharing capabilities.",
      toolUrl: "#",
      delay: 0.2,
      isComingSoon: true
    },
    {
      title: "Project Management Templates",
      icon: "📋",
      description: "Ready-to-use Agile & Scrum boards, kanban templates, and project planning tools.",
      toolUrl: "#",
      delay: 0.3,
      isComingSoon: true
    },
    {
      title: "SEO Audit Helper",
      icon: "🔍",
      description: "Quick scan tool to identify and fix SEO issues with actionable recommendations.",
      toolUrl: "#",
      delay: 0.4,
      isComingSoon: true
    },
    {
      title: "Content Idea Generator",
      icon: "💡",
      description: "AI-powered generator for blogs, social media, and marketing content ideas.",
      toolUrl: "#",
      delay: 0.5,
      isComingSoon: true
    }
  ];

  return (
         <section id="projects-section" className="py-8 bg-transparent relative overflow-hidden">
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
                     className="text-center mb-8"
        >
          <div className="inline-block mb-4 px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">Our Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projects & Tools</h2>
                     <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
             Explore our portfolio of impactful projects and discover the tools we're building to empower developers and creators.
           </p>

                     {/* Tab Navigation */}
           <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-2.5 rounded-md font-medium transition-all duration-300 ${
                  activeTab === 'projects'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <span className="text-sm">Projects</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`px-6 py-2.5 rounded-md font-medium transition-all duration-300 ${
                  activeTab === 'tools'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-sm">Tools</span>
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
                         className={`grid gap-6 items-stretch ${
                           activeTab === 'projects' 
                             ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                             : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                         }`}
          >
            {activeTab === 'projects' 
              ? projects.map((item, index) => (
                  <WorkCard key={index} {...item} />
                ))
              : tools.map((item, index) => (
                  <ToolCard key={index} {...item} />
                ))
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 