'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star, Users, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useEmailPopup } from '@/contexts/EmailPopupContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTASection() {
  const { openPopup } = useEmailPopup();
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="cta"
      className="relative py-14 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-[#fafaf7] via-[#f7f6f1] to-[#fafaf7]"
    >
      {/* Background — soft glows */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#e7f4ec]/50 blur-[160px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] blob bg-gradient-to-br from-[#f4f7e8]/60 to-transparent blur-[100px]" />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] blob bg-gradient-to-tl from-[#e7f4ec]/60 to-transparent blur-[100px]"
          style={{ animationDelay: '-4s' }}
        />
      </div>

      {/* Decorative soft dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[12, 45, 78, 23, 89].map((left, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#3e8e5a]/30"
            style={{
              left: `${left}%`,
              top: `${[67, 23, 89, 12, 45][i]}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Badge */}
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#3e8e5a]/15 shadow-[0_4px_20px_-8px_rgba(62,142,90,0.2)] mb-8">
            <Sparkles className="w-4 h-4 text-[#3e8e5a]" />
            <span className="text-[#2d6f45] text-sm font-medium">
              {t.cta.badge}
            </span>
          </div>
        </FadeIn>

        {/* Main Headline */}
        <FadeIn delay={0.1}>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0b1a0f] mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.cta.headline}
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-br from-[#3e8e5a] via-[#2d6f45] to-[#1f5433] bg-clip-text text-transparent">
                {t.cta.headline2}
              </span>
              {/* SVG swoop underline — same style as FeatureSection */}
              <motion.svg
                className="absolute -bottom-3 left-0 w-full h-5 text-[#3e8e5a]/40"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.5,
                  duration: prefersReducedMotion ? 0 : 1.1,
                  ease: 'easeOut',
                }}
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
          </h2>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl lg:text-2xl text-[#4a5a4f] mb-8 leading-relaxed">
            {t.cta.subheadline}{' '}
            <span className="text-[#2d6f45] font-semibold">
              {t.cta.subheadlineHighlight}
            </span>{' '}
            {t.cta.subheadline2}
          </p>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#d79a2a] fill-[#d79a2a]"
                  />
                ))}
              </div>
              <span className="text-[#0b1a0f] font-semibold">{t.cta.rating}</span>
            </div>
            <div className="w-px h-6 bg-[#0b1a0f]/12 hidden md:block" />
            <div className="flex items-center gap-2 text-[#4a5a4f]">
              <Users className="w-5 h-5" />
              <span>{t.cta.users}</span>
            </div>
          </div>
        </FadeIn>

        {/* App Store Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            {/* App Store */}
            <motion.button
              onClick={openPopup}
              className="group flex items-center gap-3 pl-5 pr-7 py-3.5 bg-[#0b1a0f] text-white rounded-full hover:bg-[#1c2e21] shadow-[0_6px_20px_-8px_rgba(11,26,15,0.4)] hover:shadow-[0_12px_30px_-10px_rgba(62,142,90,0.4)] transition-all duration-300 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/50 leading-none mb-0.5">{t.cta.appStore.label}</div>
                <div className="text-sm font-semibold leading-none">{t.cta.appStore.store}</div>
              </div>
            </motion.button>

            {/* Google Play */}
            <motion.button
              onClick={openPopup}
              className="group flex items-center gap-3 pl-5 pr-7 py-3.5 bg-white text-[#0b1a0f] rounded-full border border-[#0b1a0f]/10 hover:border-[#3e8e5a]/30 hover:bg-[#f0f7f1] shadow-[0_4px_16px_-8px_rgba(11,26,15,0.12)] hover:shadow-[0_8px_24px_-10px_rgba(62,142,90,0.2)] transition-all duration-300 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4"/>
                <path d="M20.392 10.395l-3.816-2.2-4.784 3.805 4.784 3.806 3.816-2.2c.91-.524.91-1.687 0-2.211z" fill="#FBBC04"/>
                <path d="M3.609 1.814L16.576 8.195l-2.784 3.805-10.183-10.186z" fill="#34A853"/>
                <path d="M13.792 12l2.784 3.806L3.61 22.186 13.792 12z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-[0.15em] text-[#7a8a7f] leading-none mb-0.5">{t.cta.googlePlay.label}</div>
                <div className="text-sm font-semibold leading-none">{t.cta.googlePlay.store}</div>
              </div>
            </motion.button>
          </div>
        </FadeIn>

        {/* Floating decorative elements */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-16 w-16 h-16 rounded-2xl bg-white border border-[#0b1a0f]/8 shadow-[0_10px_30px_-10px_rgba(11,26,15,0.15)] flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🛒</span>
          </div>

          <div className="absolute top-1/3 right-16 w-14 h-14 rounded-2xl bg-[#e7f4ec] border border-[#3e8e5a]/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#3e8e5a]" />
          </div>

          <div className="absolute bottom-1/3 left-24 w-12 h-12 rounded-2xl bg-white border border-[#0b1a0f]/8 shadow-[0_10px_30px_-10px_rgba(11,26,15,0.15)] flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">🥑</span>
          </div>

          <div className="absolute bottom-1/4 right-24 w-14 h-14 rounded-2xl bg-white border border-[#0b1a0f]/8 shadow-[0_10px_30px_-10px_rgba(11,26,15,0.15)] flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">👨‍🍳</span>
          </div>
        </div>
      </div>
    </section>
  );
}
