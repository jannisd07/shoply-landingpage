'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  intensity?: 'low' | 'medium' | 'high';
  border?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = 'medium', border = true, glow = false, children, ...props }, ref) => {
    const intensities = {
      low: 'bg-white/5 backdrop-blur-sm',
      medium: 'bg-white/10 backdrop-blur-md',
      high: 'bg-white/15 backdrop-blur-xl',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl',
          intensities[intensity],
          border && 'border border-white/10',
          glow && 'shadow-lg shadow-blue-500/10',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

export default GlassPanel;
