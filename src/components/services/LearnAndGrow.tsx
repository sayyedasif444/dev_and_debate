'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ActionButton from './common/ActionButton';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, items, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 bg-white/5 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300 mb-4">{title}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1 shrink-0">▹</span>
                <span className="text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function LearnAndGrow() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Learn & Grow With Us</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Ready to learn? We mentor coders, creators, and entrepreneurs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ServiceCard
            title="1-on-1 Mentorship"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            }
            items={[
              "Personalized code mentorship",
              "Project reviews & guidance",
              "Portfolio building support"
            ]}
            delay={0.1}
          />

          <ServiceCard
            title="Workshops & Sessions"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            }
            items={[
              "Invite us to host coding sessions",
              "Tech talks, webinars, guest speaking"
            ]}
            delay={0.2}
          />
        </div>

        <div className="text-center mt-8">
          <ActionButton
            href="/contact"
            text="Schedule a Session"
            variant="primary"
            icon="📅"
          />
        </div>
      </div>
    </section>
  );
} 