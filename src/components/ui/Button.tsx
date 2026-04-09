'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-semibold rounded-full
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-[blue-500]/50 focus:ring-offset-2 focus:ring-offset-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
      overflow-hidden
    `;

    const variants = {
      primary: `
        bg-zinc-900
        text-zinc-50
        border border-zinc-700
        hover:border-zinc-600
        hover:bg-zinc-800
      `,
      secondary: `
        bg-zinc-800/50
        text-zinc-300
        border border-zinc-700/50
        hover:border-zinc-600
        hover:bg-zinc-800
        hover:text-zinc-50
      `,
      ghost: `
        bg-transparent
        text-zinc-400
        border border-zinc-700
        hover:text-zinc-50 
        hover:bg-zinc-800/50 
        hover:border-zinc-600
      `,
      accent: `
        bg-[blue-500]
        text-[#0d0d0d]
        border border-transparent
        hover:shadow-[0_0_30px_rgba(212,245,66,0.4)]
      `,
    };

    const sizes = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-7 py-3.5 text-base',
      lg: 'px-9 py-4.5 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
