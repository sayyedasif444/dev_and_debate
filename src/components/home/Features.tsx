import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: "🎬",
    title: "Tech & Movies",
    description: "Breaking down complex tech & coding concepts while analyzing how movies connect with technology"
  },
  {
    icon: "💡",
    title: "Community Learning",
    description: "Experiment, build, and grow together through our vibrant learning community"
  },
  {
    icon: "🚀",
    title: "Expert Guidance",
    description: "Get professional guidance to turn your innovative ideas into reality"
  },
  {
    icon: "🌟",
    title: "Creative Debates",
    description: "Engage in meaningful discussions about technology, movies, and digital creativity"
  }
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 bg-dark-soft border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A Hub for <span className="text-primary border-b-2 border-primary">Curious Minds</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore Tech, Movies & Creativity in one place. Join our community of innovators, creators, and learners.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="bg-dark p-6 border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 