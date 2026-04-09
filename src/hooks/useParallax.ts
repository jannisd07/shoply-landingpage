'use client';

import { useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { useRef, type RefObject } from 'react';

/**
 * Generates parallax motion values tied to an element entering/leaving the viewport.
 *
 * Returns a ref plus two transformed MotionValues:
 *   - `y`:       vertical translation in pixels
 *   - `opacity`: fade curve
 *
 * Respects `prefers-reduced-motion`: when reduced, returns static values.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  distance = 120
): {
  ref: RefObject<T | null>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
} {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const effectiveDistance = prefersReducedMotion ? 0 : distance;

  const y = useTransform(scrollYProgress, [0, 1], [effectiveDistance, -effectiveDistance]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );

  return { ref, y, opacity };
}
