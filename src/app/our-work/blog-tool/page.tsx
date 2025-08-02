'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogToolCaseStudy() {
  const heroRef = React.useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });

  React.useEffect(() => {
    // Add custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        transition: background 0.3s ease;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full">
              <span className="text-sm font-medium text-purple-400">AI-Powered Tool</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Blog Content Generator
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionary AI-powered blog content generation tool that transforms ideas into engaging, 
              SEO-optimized articles. Built with cutting-edge AI technology to help creators and marketers 
              produce high-quality content at scale.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
              <span className="px-3 py-1 bg-white/5 rounded-full">Next.js</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">React</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">OpenAI GPT</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Claude</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Firebase</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">AI/ML</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Content Generation</span>
            </div>

            {/* Platform Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                             <a 
                 href="https://blog-tool.devanddebate.com/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
               >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                 </svg>
                 <span>Try the Tool</span>
               </a>
              <Link 
                href="/contact"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span>Custom Solution</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Blog Content Generator Overview</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our AI-powered blog content generator revolutionizes content creation by combining advanced 
              language models with intelligent SEO optimization. Built for creators, marketers, and businesses 
              who need high-quality, engaging content at scale.
            </p>
          </motion.div>

          {/* Tool Features Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Core Features */}
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-800/50 to-pink-800/50 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm h-[500px] flex flex-col">
                  {/* Features Header */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-6 py-3 rounded-full border border-white/20">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                        <span className="text-white font-semibold">Core Features</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto custom-scrollbar">
                    {[
                      { name: "AI Content Generation", icon: "🤖", description: "Advanced AI models generate high-quality, engaging blog content from simple prompts" },
                      { name: "SEO Optimization", icon: "📈", description: "Built-in SEO tools ensure your content ranks well in search engines" },
                      { name: "Multiple AI Models", icon: "🧠", description: "Choose from OpenAI GPT, Claude, and other leading AI models" },
                      { name: "Content Templates", icon: "📝", description: "Pre-built templates for different content types and industries" },
                      { name: "Real-time Editing", icon: "✏️", description: "Live editing capabilities with instant AI suggestions and improvements" },
                      { name: "Export Options", icon: "📤", description: "Export content in multiple formats including HTML, PDF, and Markdown" },
                      { name: "Collaboration Tools", icon: "👥", description: "Team collaboration features for content review and approval" },
                      { name: "Analytics Dashboard", icon: "📊", description: "Track content performance and engagement metrics" }
                    ].map((feature, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{feature.icon}</div>
                          <div>
                            <h4 className="text-white text-sm font-medium mb-1">{feature.name}</h4>
                            <p className="text-gray-300 text-xs">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-2 rounded-full border border-white/20 mb-3">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    <h3 className="text-lg font-bold text-white">Powerful Features</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">Comprehensive AI-powered content creation capabilities</p>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-800/50 to-pink-800/50 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm h-[500px] flex flex-col">
                  {/* Tech Stack Header */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 px-6 py-3 rounded-full border border-white/20">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        </svg>
                        <span className="text-white font-semibold">Technology Stack</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tech Stack Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto custom-scrollbar">
                    {[
                      { name: "Frontend", icon: "⚛️", tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
                      { name: "AI/ML", icon: "🤖", tech: ["OpenAI GPT", "Claude", "Custom Models", "NLP"] },
                      { name: "Backend", icon: "🔧", tech: ["Node.js", "Express", "API Routes", "Serverless"] },
                      { name: "Database", icon: "🗄️", tech: ["Firebase", "Firestore", "Real-time", "Offline"] },
                      { name: "Deployment", icon: "🚀", tech: ["Vercel", "Edge Functions", "CDN", "Global"] },
                      { name: "Analytics", icon: "📊", tech: ["Google Analytics", "Custom Events", "Performance", "SEO"] },
                      { name: "Security", icon: "🔒", tech: ["Authentication", "Rate Limiting", "API Keys", "CORS"] },
                      { name: "Testing", icon: "🧪", tech: ["Jest", "Cypress", "Unit Tests", "E2E"] }
                    ].map((category, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="text-center">
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <h4 className="text-white text-sm font-medium mb-2">{category.name}</h4>
                          <div className="space-y-1">
                            {category.tech.map((tech, techIndex) => (
                              <div key={techIndex} className="text-gray-300 text-xs bg-white/5 px-2 py-1 rounded">
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600/20 to-purple-600/20 px-4 py-2 rounded-full border border-white/20 mb-3">
                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                    <h3 className="text-lg font-bold text-white">Modern Tech Stack</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">Built with cutting-edge technologies for optimal performance</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Why We Built This Tool</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Content creation is a time-consuming process that requires creativity, research, and 
                  optimization. Traditional methods often result in inconsistent quality and slow turnaround times. 
                  We built this tool to democratize high-quality content creation.
                </p>
                <p>
                  Our AI-powered blog generator combines the best of human creativity with machine efficiency, 
                  enabling creators to produce engaging, SEO-optimized content in minutes instead of hours. 
                  The tool learns from your preferences and improves over time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 rounded-2xl border border-white/10"
            >
              <h4 className="text-xl font-semibold text-white mb-4">Key Benefits</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>10x faster content creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Consistent quality and tone</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>SEO-optimized content structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Multiple content formats</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Cost-effective content production</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Scalable for teams and businesses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Continuous AI model improvements</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Perfect For</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Whether you're a solo creator, marketing team, or business owner, our blog content generator 
              adapts to your needs and helps you create compelling content consistently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Content Creators",
                description: "Bloggers, writers, and influencers who need to maintain consistent publishing schedules.",
                icon: "✍️"
              },
              {
                title: "Marketing Teams",
                description: "Marketing professionals who need to create SEO-optimized content for campaigns.",
                icon: "📢"
              },
              {
                title: "Small Businesses",
                description: "Business owners who want to establish thought leadership through content marketing.",
                icon: "🏢"
              },
              {
                title: "Agencies",
                description: "Digital agencies that need to scale content creation for multiple clients.",
                icon: "🎯"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-xl border border-white/10 text-center"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-300">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Development Journey</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Technical Approach</h3>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">AI Integration</h4>
                  <p className="text-gray-300">
                    Seamlessly integrated multiple AI models including OpenAI GPT and Claude for diverse 
                    content generation capabilities and improved quality.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">Real-time Processing</h4>
                  <p className="text-gray-300">
                    Built with serverless functions and edge computing for lightning-fast content generation 
                    and real-time user feedback.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">User Experience</h4>
                  <p className="text-gray-300">
                    Designed an intuitive interface that makes AI content generation accessible to users 
                    of all technical levels.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Development Phases</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Research & Planning</h4>
                    <p className="text-gray-300">Analyzed content creation pain points and designed the optimal user experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">AI Model Integration</h4>
                    <p className="text-gray-300">Integrated and tested multiple AI models for content generation and optimization.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">UI/UX Development</h4>
                    <p className="text-gray-300">Built an intuitive, responsive interface with real-time editing capabilities.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Testing & Launch</h4>
                    <p className="text-gray-300">Comprehensive testing and optimization before public launch.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Impact</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">User Benefits</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Time Savings</h4>
                  <p className="text-gray-300">Users report 80% reduction in content creation time while maintaining quality</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Content Quality</h4>
                  <p className="text-gray-300">AI-generated content consistently ranks well in search engines and engages readers</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Scalability</h4>
                  <p className="text-gray-300">Teams can now produce 10x more content without proportional resource increases</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Technical Achievements</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Real-time AI content generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Multi-model AI integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>SEO optimization automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Responsive, intuitive UI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Scalable cloud architecture</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Real-time collaboration features</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Comprehensive analytics</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience the power of AI-driven content generation and create engaging, 
              SEO-optimized blog posts in minutes instead of hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <a
                 href="https://blog-tool.devanddebate.com/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
               >
                 Try the Tool
               </a>
              <Link
                href="/our-work"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl border border-white/20 transition-all duration-300"
              >
                View More Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 