'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Project data - in a real app, this would come from a database or API
const projectsData = {
  'quicklaunch': {
    name: 'QuickLaunch – Portfolio Starter Pack',
    tagline: 'Launch your digital presence in hours, not weeks',
    description: 'QuickLaunch is a ready-to-deploy portfolio system for freelancers and small businesses who need to establish their online presence quickly without sacrificing quality or customization.',
    challenge: 'Many creators and freelancers struggle to set up professional websites that accurately represent their work. Traditional website builders are too generic, while custom development is time-consuming and expensive.',
    solution: 'We created QuickLaunch as a middle-ground solution - professional-grade templates specifically designed for portfolios, with smart customization options that require zero coding knowledge.',
    image: '/images/projects/quicklaunch.jpg',
    gallery: [
      '/images/projects/quicklaunch-1.jpg',
      '/images/projects/quicklaunch-2.jpg',
      '/images/projects/quicklaunch-3.jpg'
    ],
    results: [
      '73% reduction in time to launch compared to custom builds',
      '89% of users successfully launched within 24 hours',
      '4.8/5 average user satisfaction rating',
      'Used by over 3,000 freelancers and small agencies'
    ],
    techStack: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Vercel'],
    features: [
      'Pre-built themes optimized for different industries',
      'Content management system with visual editor',
      'Contact forms with spam protection',
      'Analytics dashboard',
      'SEO optimization tools',
      'Mobile-responsive layouts'
    ],
    testimonial: {
      quote: "QuickLaunch let me create a stunning portfolio in just one evening. I had a client meeting the next day, and they were blown away by how professional my site looked.",
      author: "Sarah Chen",
      title: "Freelance UI/UX Designer"
    },
    callToAction: 'Try QuickLaunch',
    ctaLink: '/projects/quicklaunch/demo'
  },
  'devmetrics': {
    name: 'DevMetrics Dashboard',
    tagline: 'Track your growth as a developer with real metrics',
    description: 'DevMetrics is an interactive analytics platform that helps developers track their performance, growth, and learning metrics across projects and time periods.',
    challenge: 'Developers often lack clear visibility into their own progress and performance. While they track metrics for their applications, they rarely have effective systems to track their own growth and productivity.',
    solution: 'DevMetrics offers a comprehensive dashboard that integrates with GitHub, GitLab, VS Code, and other developer tools to automatically generate insights on coding patterns, skill development, and productivity trends.',
    image: '/images/projects/devmetrics.jpg',
    gallery: [
      '/images/projects/devmetrics-1.jpg',
      '/images/projects/devmetrics-2.jpg',
      '/images/projects/devmetrics-3.jpg'
    ],
    results: [
      'Over 5,000 active users in the first three months',
      '42% average increase in productivity reported by users',
      'Featured in multiple developer conferences',
      'Adopted by 3 coding bootcamps for student tracking'
    ],
    techStack: ['React', 'D3.js', 'Firebase', 'TypeScript'],
    features: [
      'GitHub and GitLab integration',
      'Code complexity analysis',
      'Language and framework usage tracking',
      'Productivity patterns',
      'Learning recommendation engine',
      'Team performance comparisons'
    ],
    testimonial: {
      quote: "DevMetrics showed me that I was spending too much time debugging and not enough time planning. After adjusting my approach based on the insights, my productivity increased significantly.",
      author: "Michael Torres",
      title: "Senior Software Engineer"
    },
    callToAction: 'Explore DevMetrics',
    ctaLink: '/projects/devmetrics/demo'
  },
  'creatorspace': {
    name: 'CreatorSpace Community',
    tagline: 'Connect, collaborate, and grow with fellow creators',
    description: 'CreatorSpace is a collaborative platform where creators can connect, share their work, receive feedback, and collaborate on projects across various creative disciplines.',
    challenge: 'Independent creators often work in isolation, missing out on valuable feedback, collaboration opportunities, and community support that could elevate their work and mental wellbeing.',
    solution: 'We built CreatorSpace as a dedicated platform for creators to showcase their work, connect with others in their field, receive structured feedback, and find collaboration opportunities - all in a supportive, growth-focused environment.',
    image: '/images/projects/creatorspace.jpg',
    gallery: [
      '/images/projects/creatorspace-1.jpg',
      '/images/projects/creatorspace-2.jpg',
      '/images/projects/creatorspace-3.jpg'
    ],
    results: [
      'Community of 12,000+ active creators',
      '350+ successful collaborations formed through the platform',
      '78% of users report improved quality of work due to community feedback',
      'Featured in Creative Bloq and other industry publications'
    ],
    techStack: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
    features: [
      'Customizable portfolio profiles',
      'Structured feedback system',
      'Collaboration matchmaking',
      'Project showcase galleries',
      'Industry events calendar',
      'Learning resources library'
    ],
    testimonial: {
      quote: "The feedback I've received on CreatorSpace has transformed my work. I've connected with collaborators I never would have met otherwise, and found a supportive community that keeps me motivated.",
      author: "Jamie Wilson",
      title: "Motion Designer & Illustrator"
    },
    callToAction: 'Join CreatorSpace',
    ctaLink: '/projects/creatorspace/join'
  }
};

export default function ProjectPage() {
  const pathname = usePathname();
  const slug = pathname?.split('/').pop() || '';
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate data loading - in a real app, this would be an API call
    const fetchData = () => {
      setLoading(true);
      // Get the project data based on the slug
      const data = projectsData[slug as keyof typeof projectsData];
      
      // Simulate network delay
      setTimeout(() => {
        setProjectData(data);
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

  if (!projectData) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Project Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">Sorry, we couldn't find the project you're looking for.</p>
          <Link
            href="/our-work"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Our Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-16">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-blue-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <p className="text-blue-400 mb-3 uppercase tracking-wider font-medium">Case Study</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{projectData.name}</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{projectData.tagline}</p>
              </div>
              
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <Image
                  src={projectData.image || '/images/projects/placeholder.jpg'}
                  alt={projectData.name}
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                  unoptimized // Remove this in production with real images
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-2/3"
            >
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {projectData.description}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                <p className="text-gray-300 leading-relaxed">
                  {projectData.challenge}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Solution</h3>
                <p className="text-gray-300 leading-relaxed">
                  {projectData.solution}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/3"
            >
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projectData.techStack.map((tech: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Key Results</h3>
                <ul className="space-y-3">
                  {projectData.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="text-green-500 mt-1 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300 text-sm">{result}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
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
            Key Features
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projectData.features.map((feature: string, index: number) => (
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

      {/* Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Gallery
          </motion.h2>
          
          <div className="mb-6">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <Image
                src={projectData.gallery[activeImage] || '/images/projects/placeholder.jpg'}
                alt={`${projectData.name} screenshot ${activeImage + 1}`}
                width={1200}
                height={600}
                className="w-full h-auto"
                unoptimized // Remove this in production with real images
              />
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            {projectData.gallery.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-20 h-12 rounded-md overflow-hidden border-2 transition-all ${
                  activeImage === index ? 'border-blue-500' : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <Image
                  src={image || '/images/projects/placeholder.jpg'}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized // Remove this in production with real images
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <svg className="w-12 h-12 mx-auto mb-6 text-blue-500 opacity-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl text-gray-200 italic mb-6">
              "{projectData.testimonial.quote}"
            </blockquote>
            <div>
              <p className="font-semibold text-white">{projectData.testimonial.author}</p>
              <p className="text-gray-400">{projectData.testimonial.title}</p>
            </div>
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
          <h3 className="text-3xl font-bold mb-4">Interested in {projectData.name}?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience this project firsthand or learn how we can build something similar for your needs.
          </p>
          <Link
            href={projectData.ctaLink}
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            {projectData.callToAction} →
          </Link>
        </motion.div>
      </section>

      {/* Back to Projects */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <Link
          href="/our-work"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all projects
        </Link>
      </div>
    </main>
  );
} 