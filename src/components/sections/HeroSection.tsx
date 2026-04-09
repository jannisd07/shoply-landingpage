'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Check, ShoppingBasket, Heart } from 'lucide-react';
import { useEmailPopup } from '@/contexts/EmailPopupContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import IPhoneMockup from '@/components/ui/IPhoneMockup';

export default function HeroSection() {
  const { openPopup } = useEmailPopup();
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax bound to the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: call useTransform at the top level to keep hook order stable.
  const pd = (d: number) => (prefersReducedMotion ? 0 : d);
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, pd(120)]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, pd(60)]);
  const chipY1 = useTransform(scrollYProgress, [0, 1], [0, pd(-60)]);
  const chipY2 = useTransform(scrollYProgress, [0, 1], [0, pd(90)]);
  const chipY3 = useTransform(scrollYProgress, [0, 1], [0, pd(-120)]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, pd(220)]);

  const handleScrollToFeatures = () => {
    const element = document.querySelector('#problem');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex items-start lg:items-center justify-center overflow-hidden bg-gradient-to-b from-[#f6f7f0] via-[#fafaf7] to-[#fafaf7] pt-24 lg:pt-28 pb-16 lg:pb-24"
    >
      {/* ── Ambient light layer ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft green glow bottom-right */}
        <motion.div
          style={{ y: glowY }}
          className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] blob bg-gradient-to-br from-[#c3e4ce]/80 via-[#d8ecdf]/30 to-transparent blur-[100px]"
        />
        {/* Second warmer glow top-left */}
        <motion.div
          style={{ y: chipY3 }}
          className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] blob bg-gradient-to-br from-[#eef3d6]/70 via-[#f3f4de]/20 to-transparent blur-[120px]"
          transition={{ delay: 0.5 }}
        />
        {/* Dotted pattern overlay on desktop */}
        <div className="absolute inset-0 dotted-bg opacity-40 hidden lg:block" />
      </div>

      {/* ── Main hero grid ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ── Left column: text content ─────────────────────────── */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 text-center lg:text-left relative"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#3e8e5a]/15 shadow-[0_4px_20px_-8px_rgba(62,142,90,0.2)] mb-7"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e8e5a] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e8e5a]" />
              </span>
              <Sparkles className="w-4 h-4 text-[#3e8e5a]" />
              <span className="text-sm font-medium text-[#2d6f45]">{t.hero.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold leading-[0.95] tracking-tight mb-6 text-[#0b1a0f]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block">{t.hero.headline1}</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-br from-[#3e8e5a] via-[#2d6f45] to-[#1f5433] bg-clip-text text-transparent">
                  {t.hero.headline2}
                </span>
                {/* Animated underline swoosh */}
                <motion.svg
                  className="absolute -bottom-3 left-0 w-full h-4 text-[#3e8e5a]/40"
                  viewBox="0 0 300 12"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 1.1, ease: 'easeOut' }}
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 8 Q 80 2, 150 6 T 298 4"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-xl text-[#4a5a4f] max-w-2xl mx-auto lg:mx-0 mb-9 leading-relaxed"
            >
              {t.hero.subheadline}{' '}
              <span className="text-[#0b1a0f] font-medium">{t.hero.subheadline2}</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-14"
            >
              <motion.button
                onClick={openPopup}
                className="group flex items-center gap-3 px-7 py-4 text-base font-semibold bg-[#0b1a0f] text-white rounded-full hover:bg-[#1c2e21] shadow-[0_10px_30px_-10px_rgba(11,26,15,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(62,142,90,0.45)] transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={handleScrollToFeatures}
                className="group flex items-center gap-2 px-7 py-4 text-base font-semibold text-[#0b1a0f] bg-white border border-[#0b1a0f]/10 rounded-full hover:border-[#3e8e5a]/40 hover:bg-[#f0f7f1] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-6"
            >
              {[
                { value: '15', label: t.hero.stats.users },
                { value: '10K+', label: t.hero.stats.recipes },
                { value: '5.0', label: t.hero.stats.rating },
              ].map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-8 md:gap-10">
                  <div className="text-center lg:text-left">
                    <div
                      className="text-3xl md:text-4xl font-bold text-[#0b1a0f] tabular-nums"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[#7a8a7f] mt-1">
                      {stat.label}
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block w-px h-10 bg-[#0b1a0f]/10" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column: iPhone + hand + floating chips ───────── */}
          <motion.div
            style={{ y: deviceY }}
            className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center min-h-[540px] lg:min-h-[680px]"
          >
            {/* Ambient green halo behind device */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] avo-glow pointer-events-none" />

            {/* Soft ring */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-[#3e8e5a]/15"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-[#3e8e5a]/10"
            />

            {/* ── iPhone mockup ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 80, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
              style={{
                transformOrigin: 'center center',
              }}
            >
              <div className="hidden lg:block">
                <IPhoneMockup
                  src="/images/screenshots/screenshot-1.webp"
                  alt="Avo app — smart grocery list"
                  width={340}
                  priority
                />
              </div>
              <div className="lg:hidden">
                <IPhoneMockup
                  src="/images/screenshots/screenshot-1.webp"
                  alt="Avo app — smart grocery list"
                  width={280}
                  priority
                />
              </div>
            </motion.div>

            {/* ── Floating UI chips ──────────────────────────────── */}
            {/* Chip 1: top-left, notification-style */}
            <motion.div
              style={{ y: chipY1 }}
              initial={{ opacity: 0, x: -40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="floating-chip absolute top-[8%] left-[-4%] lg:left-[-14%] animate-float"
            >
              <div className="w-9 h-9 rounded-xl bg-[#e7f4ec] flex items-center justify-center">
                <Check className="w-5 h-5 text-[#3e8e5a]" strokeWidth={3} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-[#7a8a7f] uppercase tracking-wider">
                  {t.hero.chips.chip1Label}
                </span>
                <span className="text-sm font-semibold text-[#0b1a0f]">{t.hero.chips.chip1Value}</span>
              </div>
            </motion.div>

            {/* Chip 2: bottom-right, recipe-style */}
            <motion.div
              style={{ y: chipY2 }}
              initial={{ opacity: 0, x: 40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="floating-chip absolute bottom-[14%] right-[-6%] lg:right-[-20%] animate-float"
            >
              <div className="w-9 h-9 rounded-xl bg-[#fef3e7] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#d79a2a] fill-[#d79a2a]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-[#7a8a7f] uppercase tracking-wider">
                  {t.hero.chips.chip2Label}
                </span>
                <span className="text-sm font-semibold text-[#0b1a0f]">{t.hero.chips.chip2Value}</span>
              </div>
            </motion.div>

            {/* Chip 3: mid-left, basket icon */}
            <motion.div
              style={{ y: chipY3 }}
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="floating-chip absolute top-[54%] left-[-8%] lg:left-[-18%] hidden sm:flex"
            >
              <div className="w-9 h-9 rounded-xl bg-[#ecf4fc] flex items-center justify-center">
                <ShoppingBasket className="w-5 h-5 text-[#3b6fa8]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-[#7a8a7f] uppercase tracking-wider">
                  {t.hero.chips.chip3Label}
                </span>
                <span className="text-sm font-semibold text-[#0b1a0f]">{t.hero.chips.chip3Value}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <button
          onClick={handleScrollToFeatures}
          className="flex flex-col items-center gap-2 text-[#7a8a7f] hover:text-[#0b1a0f] transition-colors animate-bounce"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
            {t.hero.scrollToExplore}
          </span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
