'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

export default function DesignDigitalPresence() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Design & Digital Presence</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Design isn&apos;t just what it looks like — it&apos;s how it works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ServiceCard
            title="Branding & UI/UX Design"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </svg>
            }
            items={[
              "Logo design, visual identity",
              "Website & app design",
              "Wireframes and interactive prototypes"
            ]}
            delay={0.1}
          />

          <ServiceCard
            title="Digital Marketing"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            }
            items={[
              "SEO Optimization",
              "Content marketing strategy",
              "Social media setup and consulting"
            ]}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
} 