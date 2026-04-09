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
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e8e5a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white
      disabled:opacity-50 disabled:cursor-not-allowed
      overflow-hidden
    `;

    const variants = {
      primary: `
        bg-[#0b1a0f]
        text-white
        border border-[#0b1a0f]
        hover:bg-[#1c2e21]
        shadow-[0_8px_24px_-10px_rgba(11,26,15,0.4)]
        hover:shadow-[0_14px_36px_-10px_rgba(62,142,90,0.45)]
      `,
      secondary: `
        bg-white
        text-[#0b1a0f]
        border border-[#0b1a0f]/10
        hover:border-[#3e8e5a]/40
        hover:bg-[#f0f7f1]
      `,
      ghost: `
        bg-transparent
        text-[#4a5a4f]
        border border-transparent
        hover:text-[#0b1a0f]
        hover:bg-[#f0f7f1]
      `,
      accent: `
        bg-[#3e8e5a]
        text-white
        border border-transparent
        shadow-[0_8px_24px_-8px_rgba(62,142,90,0.5)]
        hover:bg-[#2d6f45]
        hover:shadow-[0_14px_36px_-8px_rgba(62,142,90,0.6)]
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
