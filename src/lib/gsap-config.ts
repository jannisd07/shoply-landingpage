'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Default GSAP settings
gsap.defaults({
  ease: 'power3.out',
  duration: 0.6,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
});

export { gsap, ScrollTrigger, ScrollToPlugin };

// Helper function to create stagger animations
export const createStaggerAnimation = (
  elements: string | Element[],
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  stagger: number = 0.1
) => {
  return gsap.fromTo(elements, fromVars, {
    ...toVars,
    stagger,
  });
};

// Helper function to create scroll-triggered animations
export const createScrollAnimation = (
  trigger: string | Element,
  animation: gsap.core.Tween | gsap.core.Timeline,
  options: ScrollTrigger.Vars = {}
) => {
  return ScrollTrigger.create({
    trigger,
    animation,
    start: 'top 80%',
    end: 'bottom 20%',
    ...options,
  });
};

// Smooth scroll to element
export const smoothScrollTo = (target: string | Element, duration: number = 1) => {
  gsap.to(window, {
    scrollTo: { y: target, autoKill: false },
    duration,
    ease: 'power2.inOut',
  });
};
