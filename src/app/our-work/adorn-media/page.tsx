'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AdornMediaCaseStudy() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full">
              <span className="text-sm font-medium text-blue-400">Full-Stack Digital Agency</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Adorn Media
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A comprehensive digital transformation for Adorn Media, including their main website (adorn-media.com), 
              technology website (adorn-tech.com), multiple web applications, and mobile apps for their B2B lead generation 
              and demand generation clients.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
              <span className="px-3 py-1 bg-white/5 rounded-full">React</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Next.js</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Node.js</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Express.js</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Three.js</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Laravel</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">.NET</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Web3</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">B2B Marketing</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Lead Generation</span>
            </div>

            {/* Platform Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="https://adorn-media.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">VISIT</div>
                  <div className="text-white font-semibold">Main Website</div>
                </div>
              </Link>
              
              <Link 
                href="https://adorn-tech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">VISIT</div>
                  <div className="text-white font-semibold">Tech Website</div>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Project Overview</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Adorn Media is a leading B2B Lead Generation and Demand Generation company that needed a comprehensive 
              digital presence to showcase their services and support their client projects. We delivered a complete 
              ecosystem including their main website (adorn-media.com), technology website (adorn-tech.com), multiple 
              web applications, and mobile apps for their diverse client base.
            </p>
          </motion.div>

          {/* Project Screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Website Screenshot */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm h-[500px] flex flex-col">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                      </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white/90 text-sm font-medium">adorn-media.com</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <span className="text-white/90 text-sm font-medium">adorn-tech.com</span>
                  </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Scrollable Website Container */}
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 flex-1">
                    <div className="h-full overflow-y-auto custom-scrollbar">
                      <Image
                        src="/images/projects/adornmedia.png"
                        alt="Adorn Media Website"
                        width={600}
                        height={800}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    
                    {/* Scroll Indicator */}
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                        </svg>
                        <span className="text-white/70 text-xs font-medium">Scroll</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-2 rounded-full border border-white/20 mb-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path>
                    </svg>
                    <h3 className="text-lg font-bold text-white">Main Website</h3>
                  </div>
                                     <p className="text-gray-300 text-sm leading-relaxed">Modern, responsive websites showcasing B2B lead generation, demand generation, and technology services</p>
                </div>
              </div>

              {/* Services Overview */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm h-[500px] flex flex-col">
                  {/* Services Header */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-3 rounded-full border border-white/20">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <span className="text-white font-semibold">Services Portfolio</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Services Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto custom-scrollbar">
                    {[
                      { name: "Demand Generation", icon: "📈" },
                      { name: "Lead Generation", icon: "🎯" },
                      { name: "Account Based Marketing", icon: "👥" },
                      { name: "B2B Email Marketing", icon: "📧" },
                      { name: "Event Marketing", icon: "🎪" },
                      { name: "Webinar Marketing", icon: "🎥" },
                      { name: "Market Research", icon: "🔍" },
                      { name: "B2B Intent Data", icon: "📊" },
                      { name: "Lead Nurturing", icon: "🌱" },
                      { name: "Sales Qualified Leads", icon: "💼" },
                      { name: "BANT Qualification", icon: "✅" },
                      { name: "Appointment Setting", icon: "📅" }
                    ].map((service, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="text-center">
                          <div className="text-2xl mb-2">{service.icon}</div>
                          <h4 className="text-white text-sm font-medium">{service.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 px-4 py-2 rounded-full border border-white/20 mb-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <h3 className="text-lg font-bold text-white">Service Portfolio</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">Comprehensive B2B marketing services with modern web applications and mobile solutions</p>
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
              <h3 className="text-2xl font-bold text-white mb-4">Client Background</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Adorn Media is a dynamic B2B Lead Generation and Demand Generation company that transcends industry 
                  boundaries and geographical limits. They specialize in nurturing and activating prospects across the 
                  entire sales funnel with a laser focus on generating valuable demand and intent to buy.
                </p>
                <p>
                  With expertise in account-based marketing, email marketing, event marketing, and intent data services, 
                  they needed a comprehensive digital ecosystem to showcase their capabilities and support their client projects.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-white/10"
            >
              <h4 className="text-xl font-semibold text-white mb-4">Key Services Delivered</h4>
              <ul className="space-y-3 text-gray-300">
                                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Main corporate website (adorn-media.com) with modern design</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Technology website (adorn-tech.com) for tech services</span>
                 </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Multiple web applications for client projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Mobile applications for lead generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>B2B marketing automation platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Data analytics and reporting dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Web3 integration for modern solutions</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Challenge</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Adorn Media needed a comprehensive digital ecosystem that could showcase their B2B marketing expertise, 
              support multiple client projects, and provide scalable solutions for lead generation and demand generation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Multi-Platform Development",
                description: "Building a diverse ecosystem including website, web apps, and mobile applications for various client needs."
              },
              {
                title: "Technology Diversity",
                description: "Implementing solutions using React, Next.js, Node.js, Laravel, .NET, and Web3 technologies."
              },
              {
                title: "B2B Marketing Focus",
                description: "Creating platforms specifically designed for lead generation, demand generation, and account-based marketing."
              },
              {
                title: "Scalable Architecture",
                description: "Developing systems that can handle growing client demands and expanding service offerings."
              }
            ].map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{challenge.title}</h3>
                <p className="text-gray-300">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Approach</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Technical Strategy</h3>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">Multi-Stack Development</h4>
                  <p className="text-gray-300">
                    Leveraged React, Next.js, Node.js, Express.js, Laravel, .NET, and Web3 technologies to create 
                    the most suitable solutions for each specific project requirement.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">B2B-Focused Design</h4>
                  <p className="text-gray-300">
                    Designed interfaces specifically for B2B marketing professionals, lead generation specialists, 
                    and demand generation teams with intuitive workflows and data visualization.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">Scalable Architecture</h4>
                  <p className="text-gray-300">
                    Built robust backend systems that can handle growing client demands, multiple concurrent users, 
                    and expanding service offerings while maintaining performance.
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
              <h3 className="text-2xl font-bold text-white mb-6">Development Process</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Discovery & Analysis</h4>
                    <p className="text-gray-300">Analyzed Adorn Media's service portfolio and client requirements to design optimal solutions.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Technology Selection</h4>
                    <p className="text-gray-300">Chose appropriate tech stack for each project based on requirements and scalability needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Development & Integration</h4>
                    <p className="text-gray-300">Built and integrated multiple platforms with seamless data flow and user experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Deployment & Support</h4>
                    <p className="text-gray-300">Successfully deployed all platforms and provided ongoing support and maintenance.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Outcome</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Success Metrics</h3>
              <div className="space-y-6">
                                 <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
                   <h4 className="text-xl font-semibold text-white mb-2">Complete Digital Ecosystem</h4>
                   <p className="text-gray-300">Successfully delivered main website (adorn-media.com), technology website (adorn-tech.com), multiple web applications, and mobile apps for client projects</p>
                 </div>
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Technology Diversity</h4>
                  <p className="text-gray-300">Implemented solutions using React, Next.js, Node.js, Laravel, .NET, and Web3 technologies</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Enhanced Client Services</h4>
                  <p className="text-gray-300">Enabled Adorn Media to provide better digital solutions to their B2B marketing clients</p>
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
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Modern React and Next.js frontend applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Robust Node.js and Express.js backend APIs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Laravel and .NET enterprise solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Three.js 3D visualizations and interactive elements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Web3 blockchain integration for modern solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Mobile applications for lead generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Scalable architecture supporting multiple clients</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's transform your ideas into powerful digital solutions that drive real business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Start Your Project
              </Link>
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