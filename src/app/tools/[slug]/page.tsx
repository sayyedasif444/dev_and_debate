'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Tool data - in a real app, this would come from a database or API
const toolsData = {
  'code-snippets': {
    name: 'Code Snippets Manager',
    subtitle: 'Store, Organize, and Reuse Your Best Code',
    description: 'The Code Snippets Manager allows developers to save and organize code snippets for quick reuse. Stop reinventing the wheel or searching for that piece of code you wrote months ago.',
    image: '/images/tools/code-snippets.jpg',
    features: [
      'One-click saving from any IDE or browser',
      'Intelligent tagging and categorization',
      'Search by language, tag, or content',
      'Syntax highlighting for over 40 languages',
      'Share snippets with team members',
      'Cloud sync across all your devices'
    ],
    useCases: [
      'Save commonly used functions for quick reuse',
      'Build a personal library of coding solutions',
      'Share useful code with team members',
      'Track your coding patterns over time'
    ],
    callToAction: 'Start Saving Snippets',
    ctaLink: '/tools/code-snippets/app'
  },
  'pm-templates': {
    name: 'Project Management Templates',
    subtitle: 'Ready-Made Templates to Streamline Your Workflow',
    description: 'Our Project Management Templates provide pre-built frameworks for Agile, Scrum, and other methodologies. Get your projects up and running in minutes instead of days.',
    image: '/images/tools/pm-templates.jpg',
    features: [
      'Templates for Agile, Scrum, Kanban, and more',
      'Customizable boards and workflows',
      'Pre-populated tasks and milestones',
      'Integration with popular PM tools',
      'Collaboration features for teams',
      'Export to various formats'
    ],
    useCases: [
      'Quickly set up new project frameworks',
      'Standardize processes across multiple projects',
      'Onboard new team members faster',
      'Adapt established methodologies to your needs'
    ],
    callToAction: 'Browse Templates',
    ctaLink: '/tools/pm-templates/gallery'
  },
  'seo-audit': {
    name: 'SEO Audit Helper',
    subtitle: 'Identify and Fix SEO Issues in Minutes',
    description: 'Our SEO Audit tool scans your website and identifies potential SEO issues and opportunities. Get actionable insights and recommendations to improve your search rankings.',
    image: '/images/tools/seo-audit.jpg',
    features: [
      'Comprehensive site scan and analysis',
      'Keyword optimization suggestions',
      'Meta tag and content evaluation',
      'Backlink analysis',
      'Mobile-friendliness check',
      'Page speed performance insights'
    ],
    useCases: [
      'Regular SEO health checks for your website',
      'Identify areas for improvement before a launch',
      'Track progress after implementing changes',
      'Competitive analysis against other sites'
    ],
    callToAction: 'Start Free Scan',
    ctaLink: '/tools/seo-audit/scan'
  },
  'content-ideas': {
    name: 'Content Idea Generator',
    subtitle: 'Never Run Out of Content Ideas Again',
    description: 'The Content Idea Generator uses AI to help you brainstorm engaging topics for blog posts, social media, videos, and more. Break through creative blocks and keep your content fresh.',
    image: '/images/tools/content-ideas.jpg',
    features: [
      'AI-powered topic suggestion engine',
      'Industry-specific content recommendations',
      'Trending topic identification',
      'Title variations and optimization',
      'Content calendar integration',
      'Audience engagement predictions'
    ],
    useCases: [
      'Plan your content calendar for months ahead',
      'Find fresh angles on popular topics',
      'Discover untapped content opportunities in your niche',
      'Generate ideas tailored to different platforms'
    ],
    callToAction: 'Generate Ideas Now',
    ctaLink: '/tools/content-ideas/generator'
  },
  'portfolio-builder': {
    name: 'Portfolio Builder Mini-App',
    subtitle: 'Create a Stunning Portfolio Without Coding',
    description: 'Our Portfolio Builder lets you create a professional portfolio website without writing a single line of code. Choose from beautiful templates, customize to your liking, and publish in minutes.',
    image: '/images/tools/portfolio-builder.jpg',
    features: [
      'Drag-and-drop interface',
      'Professional templates for different industries',
      'Customizable colors, fonts, and layouts',
      'Mobile-responsive design',
      'Built-in SEO optimization',
      'One-click deployment'
    ],
    useCases: [
      'Create a professional online presence',
      'Showcase your work to potential clients',
      'Build a digital resume for job applications',
      'Launch a personal brand online'
    ],
    callToAction: 'Start Building',
    ctaLink: '/tools/portfolio-builder/app'
  },
  'code-review': {
    name: 'Code Review Assistant',
    subtitle: 'Improve Your Code Quality Automatically',
    description: 'The Code Review Assistant analyzes your code to find potential bugs, security issues, and adherence to best practices. Get suggestions for improvements before you commit.',
    image: '/images/tools/code-review.jpg',
    features: [
      'Static code analysis for multiple languages',
      'Security vulnerability detection',
      'Style guide enforcement',
      'Performance optimization suggestions',
      'Integration with GitHub, GitLab, and Bitbucket',
      'CI/CD pipeline compatibility'
    ],
    useCases: [
      'Pre-commit code quality checks',
      'Team-wide code standard enforcement',
      'Learning best practices through suggestions',
      'Identifying security risks before deployment'
    ],
    callToAction: 'Analyze Your Code',
    ctaLink: '/tools/code-review/analyzer'
  }
};

export default function ToolPage() {
  const pathname = usePathname();
  const slug = pathname?.split('/').pop() || '';
  const [toolData, setToolData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate data loading - in a real app, this would be an API call
    const fetchData = () => {
      setLoading(true);
      // Get the tool data based on the slug
      const data = toolsData[slug as keyof typeof toolsData];
      
      // Simulate network delay
      setTimeout(() => {
        setToolData(data);
        setLoading(false);
      }, 300);
    };
    
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!toolData) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Tool Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">Sorry, we couldn't find the tool you're looking for.</p>
          <Link
            href="/our-work"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Our Tools
          </Link>
        </div>
      </div>
    );
  }

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
          href="/our-work"
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