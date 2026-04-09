'use client';

import Image, { type StaticImageData } from 'next/image';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface IPhoneMockupProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Phone screenshot renderer.
 *
 * NOTE: our /public/images/screenshots/*.webp assets already include a
 * rendered iPhone frame baked into the image. We deliberately do NOT add
 * any CSS frame, notch, or side buttons here — that would stack two
 * devices on top of each other. This is a transparent image wrapper
 * with a soft drop shadow for lift.
 */
const IPhoneMockup = forwardRef<HTMLDivElement, IPhoneMockupProps>(
  function IPhoneMockup(
    { src, alt, width = 320, className, priority = false },
    ref
  ) {
    // Approximate iPhone screenshot aspect ratio from the baked-in frame.
    const height = Math.round(width * (812 / 395));
    return (
      <div
        ref={ref}
        className={cn('relative select-none', className)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          filter:
            'drop-shadow(0 24px 50px rgba(11, 26, 15, 0.22)) drop-shadow(0 50px 100px rgba(11, 26, 15, 0.12))',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${width}px`}
          className="object-contain pointer-events-none"
          priority={priority}
          draggable={false}
        />
      </div>
    );
  }
);

export default IPhoneMockup;
