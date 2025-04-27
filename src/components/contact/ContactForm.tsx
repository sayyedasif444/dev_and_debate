'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <Section className="py-24 bg-gradient-to-br from-dark via-black to-dark/80">
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionTitle>Get in Touch</SectionTitle>
            <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
              Have a project in mind or questions about our services? We'd love to hear from you.
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl">
                <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-primary/60"></div>
                
                <form onSubmit={handleSubmit} className="p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2 font-medium">Your Name <span className="text-primary">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-black/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all`}
                          placeholder="Full name"
                        />
                        <div className="absolute left-3 top-3.5 text-primary/70">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white mb-2 font-medium">Email Address <span className="text-primary">*</span></label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-black/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all`}
                          placeholder="your@email.com"
                        />
                        <div className="absolute left-3 top-3.5 text-primary/70">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="phone" className="block text-white mb-2 font-medium">Phone Number <span className="text-gray-400 text-sm font-normal">(Optional)</span></label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                          placeholder="+1 234 567 8900"
                        />
                        <div className="absolute left-3 top-3.5 text-primary/70">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-white mb-2 font-medium">Subject <span className="text-gray-400 text-sm font-normal">(Optional)</span></label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all appearance-none"
                        >
                          <option value="" className="bg-gray-900">Select a subject</option>
                          <option value="Project Inquiry" className="bg-gray-900">Project Inquiry</option>
                          <option value="Partnership" className="bg-gray-900">Partnership</option>
                          <option value="General Question" className="bg-gray-900">General Question</option>
                          <option value="Support" className="bg-gray-900">Support</option>
                        </select>
                        <div className="absolute left-3 top-3.5 text-primary/70">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div className="absolute right-3 top-3.5 text-white/30 pointer-events-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="message" className="block text-white mb-2 font-medium">Your Message <span className="text-primary">*</span></label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full bg-black/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all`}
                        placeholder="Tell us about your project or question..."
                      ></textarea>
                      <div className="absolute left-3 top-3.5 text-primary/70">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 relative overflow-hidden shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl text-center p-10"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
              <p className="text-gray-300 mb-8">
                Thank you for reaching out. We've received your message and will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center px-6 py-3 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Send Another Message
              </button>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl opacity-60" />
      </div>
    </Section>
  );
} 