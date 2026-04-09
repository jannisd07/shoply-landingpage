'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // seconds for full loop
  className?: string;
  repeat?: number;
}

/**
 * Pure-CSS marquee using a duplicated track and translateX animation.
 *
 * Marquee NEVER pauses — even on hover — and uses `pointer-events: none`
 * on the track so nothing can interrupt the loop or cause repaint jank
 * when the cursor passes over.
 */
export default function Marquee({
  children,
  direction = 'left',
  speed = 40,
  className,
  repeat = 2,
}: MarqueeProps) {
  const copies = Array.from({ length: repeat });

  return (
    <div
      className={cn('relative flex overflow-hidden pointer-events-none', className)}
      style={{ ['--marquee-duration' as string]: `${speed}s` }}
      aria-hidden="true"
    >
      <div
        className={cn(
          'marquee-track gap-12 pr-12 pointer-events-none',
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        )}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          animationPlayState: 'running',
        }}
      >
        {copies.map((_, copyIdx) => (
          <div key={copyIdx} className="flex gap-12 pr-12">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
