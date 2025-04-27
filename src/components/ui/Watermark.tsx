'use client';

import { motion } from 'framer-motion';

interface WatermarkProps {
  position?: 'bottom' | 'top';
  opacity?: number;
}

export default function Watermark({ 
  position = 'bottom',
  opacity = 0.2 
}: WatermarkProps) {
  
  const positionClasses = {
    'bottom': 'bottom-10',
    'top': 'top-10'
  };
  
  return (
    <motion.div 
      className={`fixed ${positionClasses[position]} left-10 opacity-${Math.round(opacity * 100)} hidden lg:block pointer-events-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5, delay: 0.5 }}
      style={{ zIndex: 10 }}
    >
      <pre className="text-xs text-blue-300 font-mono">
        {`function connect() {
  return {
    success: true,
    message: "Let's build something amazing!"
  };
}`}
      </pre>
    </motion.div>
  );
} 