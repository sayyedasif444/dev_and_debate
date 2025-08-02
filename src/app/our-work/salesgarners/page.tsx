'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function SalesGarnersCaseStudy() {
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
              <span className="text-sm font-medium text-blue-400">WordPress Website</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              SalesGarners
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A modern WordPress website for SalesGarners Marketing Pvt. Ltd., a leading B2B Lead Generation company. 
              Designed to showcase their comprehensive lead generation services and X-Engage platform with a focus on 
              driving quality leads and business growth.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
              <span className="px-3 py-1 bg-white/5 rounded-full">WordPress</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">PHP</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">CSS3</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">JavaScript</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">B2B Marketing</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Lead Generation</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Content Syndication</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Digital Marketing</span>
            </div>

            {/* Platform Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="https://salesgarners.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">VISIT</div>
                  <div className="text-white font-semibold">Live Website</div>
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
              SalesGarners Marketing Pvt. Ltd. is a leading B2B Lead Generation company that helps businesses grow 
              with quality leads. We developed a comprehensive WordPress website that showcases their X-Engage platform, 
              services portfolio, and case studies while providing an intuitive user experience for potential clients.
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
                        <span className="text-white/90 text-sm font-medium">salesgarners.com</span>
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
                        src="/images/projects/salesgarners.png"
                        alt="SalesGarners Website"
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
                  <p className="text-gray-300 text-sm leading-relaxed">Modern WordPress website showcasing B2B lead generation services and X-Engage platform</p>
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
                      { name: "Sales & Business Development", icon: "💼" },
                      { name: "Demand Generation", icon: "📈" },
                      { name: "Digital Marketing", icon: "🎯" },
                      { name: "Data Services", icon: "📊" },
                      { name: "Content Syndication", icon: "📝" },
                      { name: "X-Engage Platform", icon: "🚀" },
                      { name: "Lead Qualification", icon: "✅" },
                      { name: "Market Research", icon: "🔍" },
                      { name: "B2B Lead Generation", icon: "🎯" },
                      { name: "Account-Based Marketing", icon: "👥" },
                      { name: "Email Marketing", icon: "📧" },
                      { name: "Social Media Marketing", icon: "📱" }
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
                  <p className="text-gray-300 text-sm leading-relaxed">Comprehensive B2B lead generation and marketing services with X-Engage platform</p>
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
                  SalesGarners Marketing Pvt. Ltd. is a leading B2B Lead Generation company that helps businesses 
                  grow with quality leads. They specialize in intent-driven content syndication and provide 
                  comprehensive lead generation services to fuel sales pipelines with high-quality, high-intent prospects.
                </p>
                <p>
                  Their proprietary X-Engage platform combines cutting-edge data analytics with real-time lead 
                  prioritization, helping organizations focus on high-intent prospects for faster and more impactful results.
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
              <h4 className="text-xl font-semibold text-white mb-4">Key Features Delivered</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Modern WordPress website with responsive design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>X-Engage platform showcase and features</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Comprehensive services portfolio</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Case studies and client testimonials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Lead generation forms and CTAs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>SEO-optimized content and structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Contact forms and demo request functionality</span>
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
              SalesGarners needed a professional WordPress website that could effectively showcase their B2B lead 
              generation services, highlight their X-Engage platform, and convert visitors into qualified leads.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Service Showcase",
                description: "Effectively presenting multiple B2B lead generation services in an organized and engaging way."
              },
              {
                title: "Platform Highlight",
                description: "Showcasing the X-Engage platform's capabilities and benefits to potential clients."
              },
              {
                title: "Lead Conversion",
                description: "Creating compelling CTAs and forms to capture and convert website visitors into leads."
              },
              {
                title: "Professional Branding",
                description: "Establishing a trustworthy and professional online presence for a B2B marketing company."
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
                  <h4 className="text-lg font-semibold text-white mb-3">WordPress Development</h4>
                  <p className="text-gray-300">
                    Built a custom WordPress website with modern themes and plugins to ensure scalability, 
                    security, and easy content management for the client.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">B2B-Focused Design</h4>
                  <p className="text-gray-300">
                    Designed a professional interface specifically for B2B marketing professionals and 
                    decision-makers with clear service offerings and compelling CTAs.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">Lead Generation Optimization</h4>
                  <p className="text-gray-300">
                    Implemented strategic lead capture forms, compelling CTAs, and conversion-optimized 
                    landing pages to maximize lead generation potential.
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
                    <h4 className="text-lg font-semibold text-white mb-2">Discovery & Planning</h4>
                    <p className="text-gray-300">Analyzed SalesGarners' services, target audience, and business objectives to design the optimal website structure.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">WordPress Setup</h4>
                    <p className="text-gray-300">Configured WordPress with custom themes, essential plugins, and security measures for optimal performance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Content & Design</h4>
                    <p className="text-gray-300">Created compelling content, service showcases, and case studies with professional design and user experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Launch & Optimization</h4>
                    <p className="text-gray-300">Successfully launched the website with SEO optimization and ongoing support for content updates.</p>
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
                  <h4 className="text-xl font-semibold text-white mb-2">Professional Online Presence</h4>
                  <p className="text-gray-300">Successfully established a professional and trustworthy online presence for SalesGarners' B2B lead generation services</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Service Showcase</h4>
                  <p className="text-gray-300">Effectively showcased all services including X-Engage platform, demand generation, and digital marketing</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Lead Generation Ready</h4>
                  <p className="text-gray-300">Implemented strategic lead capture forms and CTAs to convert website visitors into qualified leads</p>
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
                  <span>Modern WordPress website with responsive design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Professional B2B-focused user interface</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Comprehensive service portfolio showcase</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>X-Engage platform features and benefits</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Case studies and client testimonials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Lead generation forms and CTAs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>SEO-optimized content and structure</span>
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