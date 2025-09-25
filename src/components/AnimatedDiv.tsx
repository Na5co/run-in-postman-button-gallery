'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedDiv = ({ children, className, delay = 0 }: AnimatedDivProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};
