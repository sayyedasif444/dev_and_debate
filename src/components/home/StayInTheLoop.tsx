'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { addNewsletterSubscriber } from '@/lib/firebase';

export default function StayInTheLoop() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || (() => {
    throw new Error('EMAILJS_SERVICE_ID not configured');
  })();
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || (() => {
    throw new Error('EMAILJS_TEMPLATE_ID not configured');
  })();
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || (() => {
    throw new Error('EMAILJS_PUBLIC_KEY not configured');
  })();

  const validateEmail = (email: string) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Add to Firebase database (with duplicate prevention)
      await addNewsletterSubscriber(email);
      
      // Send notification email using EmailJS
      const templateParams = {
        name: 'Newsletter Subscriber',
        email: email,
        phone: 'Not provided',
        subject: 'New Newsletter Subscription',
        message: `A new user has subscribed to the newsletter with email: ${email}`,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      // Handle specific error messages
      if (error instanceof Error) {
        if (error.message.includes('already subscribed')) {
          setError('This email is already subscribed to our newsletter!');
        } else if (error.message.includes('previously subscribed')) {
          setError('This email was previously subscribed. Please contact us to reactivate.');
        } else if (error.message.includes('Firebase is not initialized')) {
          setError('Service temporarily unavailable. Please try again later.');
        } else {
          setError('Failed to subscribe. Please try again or contact us directly.');
        }
      } else {
        setError('Failed to subscribe. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-10 top-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Stay in the Loop
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Get updates on the latest tech trends, tutorials, and community events 
            directly to your inbox.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Your email address"
                  required
                  className={`w-full px-6 py-4 bg-gray-900/50 border ${error ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-colors duration-300`}
                />
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    error.includes('already subscribed') 
                      ? 'bg-blue-500/10 border-blue-500/20' 
                      : 'bg-red-500/10 border-red-500/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {error.includes('already subscribed') ? (
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <p className={`text-sm font-medium ${
                      error.includes('already subscribed') ? 'text-blue-400' : 'text-red-400'
                    }`}>
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Subscribe</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </motion.button>
                <Link
                  href="/blog"
                  className="flex-1 px-6 py-4 border border-white/10 hover:border-white/20 rounded-lg text-white font-medium transition-all duration-300 text-center relative overflow-hidden group"
                >
                  <span className="relative z-10">Browse Blog</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900/50 border border-white/10 rounded-lg p-8 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thanks for subscribing!</h3>
              <p className="text-gray-400 mb-4">We'll keep you updated with the latest news and updates.</p>
              <button
                onClick={() => setIsSubmitted(false)} 
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Subscribe another email
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-gray-900/30 border border-white/5 rounded-lg p-6"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Weekly Insights</h3>
            <p className="text-gray-400">
              Get curated content about the latest in technology, development practices, and design trends.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-gray-900/30 border border-white/5 rounded-lg p-6"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community Events</h3>
            <p className="text-gray-400">
              Stay informed about upcoming webinars, workshops, and networking opportunities.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="bg-gray-900/30 border border-white/5 rounded-lg p-6"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Exclusive Tips</h3>
            <p className="text-gray-400">
              Receive expert advice and actionable tips to enhance your skills and workflow efficiency.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 