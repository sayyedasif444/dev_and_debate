'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ActionButton from './common/ActionButton';

export default function CTAButton() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <ActionButton 
        href="/contact"
        text="Ready to start? Let's talk"
        variant="primary"
        icon="🚀"
      />
    </motion.div>
  );
} 