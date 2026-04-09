'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useEmailPopup } from '@/contexts/EmailPopupContext';
import { useLanguage } from '@/contexts/LanguageContext';
import dynamic from 'next/dynamic';

// Lazy load 3D scene for performance - delay loading until after LCP
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const [show3D, setShow3D] = useState(false);
  const { openPopup } = useEmailPopup();
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const allow3D = window.innerWidth >= 1024 && !prefersReducedMotion.matches;

    if (!allow3D) return;

    const enable = () => setShow3D(true);
    let cancel: (() => void) | undefined;

    if ('requestIdleCallback' in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(enable, { timeout: 1500 });
      cancel = () => (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    } else {
      const id = setTimeout(enable, 1200);
      cancel = () => clearTimeout(id);
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setShow3D(false);
        cancel?.();
      }
    };

    prefersReducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      cancel?.();
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const handleScrollToFeatures = () => {
    const element = document.querySelector('#problem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Organic background shapes - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        {/* Large organic blob - top left */}
        <div className="absolute -top-1/4 -left-1/4 w-[900px] h-[900px] blob bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent blur-3xl" />
        
        {/* Secondary blob - bottom right */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] blob bg-gradient-to-tl from-zinc-800/30 via-zinc-900/20 to-transparent blur-3xl" style={{ animationDelay: '-4s' }} />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* 3D particles */}
      {show3D && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <Scene showParticles />
        </div>
      )}

      {/* Main content - Asymmetric layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text content - takes more space */}
          <div className="lg:col-span-8 text-center lg:text-left">
            {/* Badge with accent - blue on mobile and desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">{t.hero.badge}</span>
            </motion.div>

            {/* Main Headline - Bold typography */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-zinc-50">{t.hero.headline1}</span>
              <br />
              <span className="relative">
                <span className="text-zinc-50">{t.hero.headline2}</span>
                {/* Accent underline */}
                <motion.span 
                  className="absolute -bottom-2 left-0 h-3 bg-blue-500/30 -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              {t.hero.subheadline}{' '}
              <span className="text-zinc-300">{t.hero.subheadline2}</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-16"
            >
              {/* Primary CTA - Accent color */}
              <motion.button
                onClick={handleScrollToFeatures}
                className="group flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              {/* Secondary CTA - Ghost style with blue border */}
              <motion.button
                onClick={openPopup}
                className="group flex items-center gap-2 px-8 py-4 text-lg font-medium text-zinc-300 hover:text-white border border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Stats - Horizontal with dividers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-12"
            >
              {[
                { value: '50K+', label: t.hero.stats.users },
                { value: '10K+', label: t.hero.stats.recipes },
                { value: '4.8', label: t.hero.stats.rating },
              ].map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-8 md:gap-12">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-zinc-50" style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block w-px h-12 bg-zinc-800" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - decorative element */}
          <motion.div 
            className="hidden lg:flex lg:col-span-4 items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Static accent shapes - removed infinite animations */}
              <div 
                className="absolute -top-8 -right-8 w-24 h-24 rounded-3xl bg-blue-500/20 blur-xl"
              />
              <div 
                className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-zinc-700/30 blur-xl"
              />
              
              {/* Main decorative box */}
              <div className="relative w-64 h-80 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 backdrop-blur-sm p-6 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <div className="w-3 h-3 rounded-full bg-zinc-600" />
                  <div className="w-3 h-3 rounded-full bg-zinc-600" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-zinc-700/50 rounded-full w-3/4" />
                  <div className="h-3 bg-zinc-700/50 rounded-full w-1/2" />
                  <div className="h-3 bg-blue-500/30 rounded-full w-2/3" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xs text-zinc-500">AI-Powered</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - CSS animation instead of framer-motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={handleScrollToFeatures}
          className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors animate-bounce"
        >
          <span className="text-xs uppercase tracking-widest">{t.hero.scrollToExplore}</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
