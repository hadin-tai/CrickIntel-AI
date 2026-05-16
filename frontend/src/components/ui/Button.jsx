import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

const Button = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:shadow-neon hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:shadow-neon-green hover:opacity-90',
    outline: 'border border-primary/50 text-primary hover:bg-primary/10',
    ghost: 'hover:bg-accent text-muted-foreground hover:text-foreground',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
