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

export default function FunSide() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Fun Side: Reviews & Tools</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Because it&apos;s not just about work — it&apos;s about stories, creativity, and exploration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ServiceCard
            title="Movie, Series, and Game Reviews"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            }
            items={[
              "Blogs about movies, shows, and gaming culture",
              "Honest, fresh perspectives (because creators need a break too!)"
            ]}
            delay={0.1}
          />

          <ServiceCard
            title="Handy Tools We Built"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            }
            items={[
              "Tools for developers, creatives, and productivity seekers",
              "Small apps, utilities, templates (coming soon!)"
            ]}
            delay={0.2}
          />
        </div>

        <div className="text-center mt-8">
          <ActionButton
            href="/blog" 
            text="See What's New"
            variant="primary"
            icon="🎬"
          />
        </div>
      </div>
    </section>
  );
} 