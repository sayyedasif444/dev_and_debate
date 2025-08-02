'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function EnterpriseSolutionsCaseStudy() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-full">
              <span className="text-sm font-medium text-green-400">Enterprise Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Enterprise Application Development
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Comprehensive enterprise application development services helping organizations achieve their digital 
              transformation goals. We build scalable, secure, and high-performance solutions using cutting-edge 
              technologies and DevOps best practices.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
              <span className="px-3 py-1 bg-white/5 rounded-full">React</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Node.js</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Python</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Java</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Docker</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Kubernetes</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">AWS</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Azure</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">DevOps</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Microservices</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Gen AI</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">Machine Learning</span>
            </div>

            {/* Platform Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="/contact"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">START</div>
                  <div className="text-white font-semibold">Your Project</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Enterprise Solutions Overview</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We specialize in building enterprise-grade applications that drive business transformation and operational 
              efficiency. Our expertise spans across multiple industries, helping organizations modernize their 
              technology stack, integrate AI capabilities, and achieve their strategic objectives.
            </p>
          </motion.div>

          {/* Tech Stack Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Technology Stack */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm h-[500px] flex flex-col">
                  {/* Tech Stack Header */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 px-6 py-3 rounded-full border border-white/20">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        </svg>
                        <span className="text-white font-semibold">Technology Stack</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tech Stack Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto custom-scrollbar">
                    {[
                      { name: "Frontend", icon: "⚛️", tech: ["React", "Vue.js", "Angular", "Next.js"] },
                      { name: "Backend", icon: "🔧", tech: ["Node.js", "Python", "Java", "C#"] },
                      { name: "Databases", icon: "🗄️", tech: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
                      { name: "Cloud", icon: "☁️", tech: ["AWS", "Azure", "GCP", "DigitalOcean"] },
                      { name: "DevOps", icon: "🚀", tech: ["Docker", "Kubernetes", "Jenkins", "GitLab CI"] },
                      { name: "AI/ML", icon: "🤖", tech: ["OpenAI GPT", "Claude", "TensorFlow", "PyTorch"] },
                      { name: "Monitoring", icon: "📊", tech: ["Prometheus", "Grafana", "ELK Stack", "New Relic"] },
                      { name: "Security", icon: "🔒", tech: ["OAuth 2.0", "JWT", "SSL/TLS", "Penetration Testing"] },
                      { name: "Testing", icon: "🧪", tech: ["Jest", "Cypress", "Selenium", "Postman"] }
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
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 px-4 py-2 rounded-full border border-white/20 mb-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                    <h3 className="text-lg font-bold text-white">Technology Expertise</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">Comprehensive tech stack covering frontend, backend, cloud, and DevOps</p>
                </div>
              </div>

              {/* Enterprise Solutions */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm h-[500px] flex flex-col">
                  {/* Solutions Header */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-3 rounded-full border border-white/20">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <span className="text-white font-semibold">Enterprise Solutions</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Solutions Grid */}
                  <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto custom-scrollbar">
                    {[
                      { name: "Customer Relationship Management (CRM)", icon: "👥", description: "Custom CRM solutions for sales, marketing, and customer service automation" },
                      { name: "Enterprise Resource Planning (ERP)", icon: "🏢", description: "Integrated business management systems for operations, finance, and HR" },
                      { name: "Business Intelligence & Analytics", icon: "📈", description: "Data visualization and reporting platforms for informed decision-making" },
                      { name: "AI-Powered Automation", icon: "🤖", description: "Intelligent process automation and workflow optimization using Gen AI" },
                      { name: "Supply Chain Management", icon: "📦", description: "End-to-end supply chain tracking and optimization systems" },
                      { name: "Human Resource Management", icon: "👨‍💼", description: "HR automation, payroll, and employee management platforms" },
                      { name: "Financial Management Systems", icon: "💰", description: "Accounting, billing, and financial reporting applications" },
                      { name: "Project Management Tools", icon: "📋", description: "Collaborative project tracking and team management solutions" },
                      { name: "E-commerce Platforms", icon: "🛒", description: "Scalable online retail and B2B commerce solutions" }
                    ].map((solution, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{solution.icon}</div>
                          <div>
                            <h4 className="text-white text-sm font-medium mb-1">{solution.name}</h4>
                            <p className="text-gray-300 text-xs">{solution.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-2 rounded-full border border-white/20 mb-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <h3 className="text-lg font-bold text-white">Business Solutions</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">Comprehensive enterprise applications tailored to business needs</p>
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
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Development Expertise</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  We have extensive experience in building enterprise-grade applications that help organizations 
                  streamline operations, improve efficiency, and achieve their business objectives. Our solutions 
                  are designed to scale with your business growth and adapt to evolving market demands.
                </p>
                <p>
                  Our enterprise development approach combines modern technology stacks with proven DevOps practices 
                  and cutting-edge AI capabilities, ensuring robust, secure, and intelligent applications that meet 
                  enterprise standards for performance, security, and reliability.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-8 rounded-2xl border border-white/10"
            >
              <h4 className="text-xl font-semibold text-white mb-4">Key Capabilities</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Scalable microservices architecture</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Cloud-native development and deployment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>CI/CD pipeline automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Security-first development approach</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Performance optimization and monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>API-first design and integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>AI/ML integration and automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Comprehensive testing and quality assurance</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Enterprise Challenges We Solve</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Modern enterprises face complex challenges in their digital transformation journey. We help 
              organizations overcome these obstacles with innovative technology solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Legacy System Modernization",
                description: "Transforming outdated systems into modern, scalable applications while maintaining business continuity."
              },
              {
                title: "Scalability & Performance",
                description: "Building applications that can handle growing user bases and increasing data volumes efficiently."
              },
              {
                title: "Security & Compliance",
                description: "Implementing robust security measures and ensuring compliance with industry regulations."
              },
              {
                title: "Integration Complexity",
                description: "Seamlessly connecting multiple systems and data sources for unified business operations."
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Development Approach</h2>
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
                  <h4 className="text-lg font-semibold text-white mb-3">Microservices Architecture</h4>
                  <p className="text-gray-300">
                    Design scalable, maintainable applications using microservices that can be developed, 
                    deployed, and scaled independently.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">Cloud-Native Development</h4>
                  <p className="text-gray-300">
                    Leverage cloud platforms for scalability, reliability, and cost-effectiveness while 
                    implementing best practices for cloud-native applications.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">DevOps & Automation</h4>
                  <p className="text-gray-300">
                    Implement CI/CD pipelines, infrastructure as code, and automated testing to ensure 
                    rapid, reliable deployments and continuous improvement.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">AI Integration & Automation</h4>
                  <p className="text-gray-300">
                    Integrate Gen AI capabilities for intelligent automation, predictive analytics, 
                    and enhanced user experiences across enterprise applications.
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
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Discovery & Analysis</h4>
                    <p className="text-gray-300">Deep dive into business requirements, existing systems, and technical constraints to design optimal solutions.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Architecture Design</h4>
                    <p className="text-gray-300">Design scalable architecture with security, performance, and maintainability as core principles.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Agile Development</h4>
                    <p className="text-gray-300">Iterative development with regular feedback, testing, and continuous integration for quality assurance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Deployment & Support</h4>
                    <p className="text-gray-300">Seamless deployment with monitoring, maintenance, and ongoing support for long-term success.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Impact</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Business Outcomes</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Operational Efficiency</h4>
                  <p className="text-gray-300">Streamlined processes and automated workflows that reduce manual effort and improve productivity</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Cost Optimization</h4>
                  <p className="text-gray-300">Reduced infrastructure costs through cloud optimization and efficient resource utilization</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Scalability & Growth</h4>
                  <p className="text-gray-300">Applications that scale with business growth and adapt to changing market demands</p>
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
                  <span className="text-green-400 mt-1">▹</span>
                  <span>High-performance, scalable applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Secure, compliant enterprise solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Automated CI/CD pipelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Cloud-native architecture</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Comprehensive monitoring and alerting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>API-first integration approach</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Intelligent AI-powered automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">▹</span>
                  <span>Robust testing and quality assurance</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600/20 to-blue-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Enterprise?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's build powerful enterprise applications that drive your business forward with modern 
              technology, proven DevOps practices, and cutting-edge AI capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
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