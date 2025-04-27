'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function GetInTouch() {
  const contactMethods = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      content: 'info@devanddebate.com',
      link: 'mailto:info@devanddebate.com',
      delay: 0.1
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      content: '+1 (234) 456-6789',
      link: 'tel:+12344566789',
      delay: 0.2
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location',
      content: 'Digital Desk, Stockholm',
      link: 'https://maps.google.com/?q=Stockholm',
      delay: 0.3
    }
  ];

  return (
    <Section id="get-in-touch" className="bg-gradient-to-b from-black/90 to-black">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <SectionTitle>Get In Touch</SectionTitle>
        <p className="text-gray-300 mt-4">
          Have a question or want to work together? Reach out through any of these channels.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => (
          <motion.a
            key={index}
            href={method.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: method.delay }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-primary/30 p-8 rounded-xl text-center group transition-all duration-300 flex flex-col items-center hover:bg-gradient-to-br hover:from-gray-900/60 hover:to-black"
          >
            <div className="w-16 h-16 mb-5 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
              {method.icon}
            </div>
            
            <h3 className="text-xl font-medium text-white mb-2">{method.title}</h3>
            <p className="text-gray-300 group-hover:text-primary/90 transition-colors duration-300">
              {method.content}
            </p>
            
            <span className="mt-4 text-sm text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
              Connect
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.a>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center mt-12"
      >
        <div className="flex items-center gap-4 bg-gradient-to-r from-primary/5 to-blue-500/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/5">
          <div className="flex h-2 items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
          </div>
          <span className="text-sm text-gray-400">We typically respond within 24 hours</span>
        </div>
      </motion.div>
    </Section>
  );
} 