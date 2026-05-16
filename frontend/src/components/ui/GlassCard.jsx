import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

const GlassCard = ({ children, className, hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass-card p-6 rounded-2xl transition-all duration-300",
        hover && "hover:border-primary/30 hover:shadow-neon/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
