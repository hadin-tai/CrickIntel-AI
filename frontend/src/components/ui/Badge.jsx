import React from 'react';
import { cn } from '../../utils';

const Badge = ({ children, className, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    outline: 'border-muted-foreground/30 text-muted-foreground',
    ai: 'bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border-white/10 shadow-neon/10',
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
