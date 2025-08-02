'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ITCCConnectCaseStudy() {
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
               <span className="text-sm font-medium text-blue-400">Full-Stack Digital Solution</span>
             </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              ITCC Connect
            </h1>
            
                         <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
               A comprehensive digital ecosystem for the India Thai Chamber of Commerce, including mobile app, web application, 
               and website. Revolutionizing membership management and business networking between Thai and Indian business communities.
             </p>

                         <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
               <span className="px-3 py-1 bg-white/5 rounded-full">Flutter</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">Node.js</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">React</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">Mobile App</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">Web Application</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">Website</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">Membership Management</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">Event Management</span>
               <span className="px-3 py-1 bg-white/5 rounded-full">Business Networking</span>
             </div>

                         {/* Platform Links */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
               <Link 
                 href="https://play.google.com/store/apps/details?id=com.skybertech.itcc&hl=en"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
               >
                 <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                 </svg>
                 <div className="text-left">
                   <div className="text-xs text-gray-400">GET IT ON</div>
                   <div className="text-white font-semibold">Google Play</div>
                 </div>
               </Link>
               
               <Link 
                 href="https://itccthailand.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
               >
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path>
                 </svg>
                 <div className="text-left">
                   <div className="text-xs text-gray-400">VISIT</div>
                   <div className="text-white font-semibold">Website</div>
                 </div>
               </Link>
               
                               <Link 
                  href="https://apps.apple.com/in/app/itcc-connect-app/id1598274013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-white font-semibold">App Store</div>
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
                ITCC Connect is a comprehensive digital ecosystem designed to streamline membership management 
                and enhance business networking for the India Thai Chamber of Commerce. This complete solution 
                includes a mobile app, web application, and website, serving as a digital bridge between Thai 
                and Indian business communities, facilitating seamless communication and business opportunities.
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
                          <span className="text-white/90 text-sm font-medium">itccthailand.com</span>
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
                          src="/images/projects/itcc.png"
                          alt="ITCC Website"
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
                    <p className="text-gray-300 text-sm leading-relaxed">Modern, responsive website with comprehensive business information and seamless user experience</p>
                  </div>
                </div>

                {/* Mobile App Screenshots */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm h-[500px] flex flex-col">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-3 rounded-full border border-white/20">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-white font-semibold">Mobile App Screenshots</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Scrollable Mobile Gallery */}
                    <div className="relative flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar items-center">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="flex-shrink-0 group">
                          <div className="bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-2xl border border-white/20 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                            {/* Phone Frame */}
                            <div className="relative">
                              <div className="w-36 h-64 relative overflow-hidden rounded-2xl border-4 border-gray-800 shadow-2xl">
                                <Image
                                  src={`/images/projects/itccm${num}.webp`}
                                  alt={`ITCC Mobile App Screenshot ${num}`}
                                  width={144}
                                  height={256}
                                  className="w-full h-full object-cover"
                                />
                                {/* Screen Glare Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
                              </div>
                              
                              {/* Screenshot Number Badge */}
                              <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                                {num}
                              </div>
                            </div>
                            
                            {/* Screenshot Label */}
                            <div className="text-center mt-3">
                              <span className="text-white/80 text-xs font-medium">Screen {num}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Scroll Indicator */}
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                        <span className="text-white/70 text-xs font-medium">Swipe</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 px-4 py-2 rounded-full border border-white/20 mb-3">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      <h3 className="text-lg font-bold text-white">Mobile App</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">Cross-platform Flutter app with intuitive user interface and seamless navigation</p>
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
                  The India Thai Chamber of Commerce (ITCC) is a not-for-profit organization established in 1974, 
                  recognized by both Thai and Indian governments. It serves as a crucial platform for fostering 
                  business relationships between the two countries.
                </p>
                <p>
                  With over 8 business sectors and hundreds of members, ITCC needed a modern digital solution 
                  to manage their growing community and enhance member engagement.
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
                             <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
               <ul className="space-y-3 text-gray-300">
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Cross-platform mobile app (iOS & Android)</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Web application for desktop access</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Member registration and profile management</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Event creation and RSVP system</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Business networking and member directory</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>Certificate of Origin management</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-blue-400 mt-1">▹</span>
                   <span>News and updates platform</span>
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
               ITCC needed a comprehensive digital ecosystem to manage their diverse membership base and enhance 
               business networking capabilities across different sectors and geographies, requiring solutions 
               for mobile, web, and desktop platforms.
             </p>
          </motion.div>

                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                         {[
               {
                 title: "Multi-Platform Development",
                 description: "Building a cohesive ecosystem across mobile app, web application, and website with consistent functionality."
               },
               {
                 title: "Complex Membership Management",
                 description: "Managing hundreds of members across 8 different business sectors with varying needs and requirements."
               },
               {
                 title: "Cross-Platform Compatibility",
                 description: "Ensuring seamless experience across iOS, Android, and web platforms for a diverse user base."
               },
               {
                 title: "Real-time Communication",
                 description: "Facilitating instant communication and updates between members and the chamber across all platforms."
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
                    <h4 className="text-lg font-semibold text-white mb-3">Multi-Platform Strategy</h4>
                    <p className="text-gray-300">
                      Developed a comprehensive ecosystem using Flutter for mobile apps, Node.js and React 
                      for web applications and website, ensuring consistent functionality across all platforms.
                    </p>
                  </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">User-Centric Design</h4>
                  <p className="text-gray-300">
                    Designed intuitive interfaces that cater to both tech-savvy and traditional 
                    business users, ensuring easy adoption across all member demographics.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">Scalable Architecture</h4>
                  <p className="text-gray-300">
                    Built a robust backend system that can handle growing membership and 
                    expanding feature requirements while maintaining performance.
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
                    <p className="text-gray-300">Analyzed ITCC's existing processes and member needs to design the optimal solution.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Design & Prototyping</h4>
                    <p className="text-gray-300">Created user-friendly interfaces and workflows for seamless member experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Development & Testing</h4>
                    <p className="text-gray-300">Built the app with rigorous testing to ensure reliability and performance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Deployment & Support</h4>
                    <p className="text-gray-300">Successfully launched on app stores and provided ongoing support and updates.</p>
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
                   <p className="text-gray-300">Successfully deployed mobile app on Google Play Store, web application, and main website</p>
                 </div>
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Enhanced Member Engagement</h4>
                  <p className="text-gray-300">Improved communication and networking between Thai and Indian business communities</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Streamlined Operations</h4>
                  <p className="text-gray-300">Automated membership management and event coordination processes</p>
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
                    <span>Cross-platform Flutter mobile app with native performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">▹</span>
                    <span>Node.js backend with robust API architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">▹</span>
                    <span>React-based web application and responsive website</span>
                  </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Real-time communication and notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Secure member data management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Scalable backend architecture</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Intuitive user interface design</span>
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