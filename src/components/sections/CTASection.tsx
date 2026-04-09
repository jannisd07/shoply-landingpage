'use client';

import { motion } from 'framer-motion';
import { Star, Users, Sparkles, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useEmailPopup } from '@/contexts/EmailPopupContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTASection() {
  const { openPopup } = useEmailPopup();
  const { t } = useLanguage();
  
  return (
    <section
      id="cta"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background with dramatic glow - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-blue-500/5 blur-[150px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] blob bg-gradient-to-br from-zinc-800/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] blob bg-gradient-to-tl from-zinc-800/20 to-transparent blur-3xl" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Decorative dots - simplified, no animations, hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[12, 45, 78, 23, 89].map((left, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-500/20"
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
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500 text-sm font-medium">
              {t.cta.badge}
            </span>
          </div>
        </FadeIn>

        {/* Main Headline */}
        <FadeIn delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-zinc-50 mb-6 leading-[0.95]" style={{ fontFamily: 'var(--font-display)' }}>
            {t.cta.headline}
            <br />
            <span className="relative">
              {t.cta.headline2}
              <motion.span 
                className="absolute -bottom-2 left-0 h-3 bg-blue-500/30 -z-10"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 mb-8 leading-relaxed">
            {t.cta.subheadline} <span className="text-blue-500 font-semibold">{t.cta.subheadlineHighlight}</span> {t.cta.subheadline2}
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
                    className="w-5 h-5 text-blue-500 fill-blue-500"
                  />
                ))}
              </div>
              <span className="text-zinc-50 font-semibold">{t.cta.rating}</span>
            </div>
            <div className="w-px h-6 bg-zinc-700 hidden md:block" />
            <div className="flex items-center gap-2 text-zinc-400">
              <Users className="w-5 h-5" />
              <span>{t.cta.users}</span>
            </div>
          </div>
        </FadeIn>

        {/* App Store Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
            {/* App Store Button */}
            <motion.button
              onClick={openPopup}
              className="group relative w-full sm:w-auto"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4 px-8 py-4 bg-zinc-900 rounded-2xl border border-zinc-700 group-hover:border-blue-500/30 transition-all">
                <svg className="w-10 h-10 text-zinc-50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-zinc-500">{t.cta.appStore.label}</div>
                  <div className="text-xl font-semibold text-zinc-50">{t.cta.appStore.store}</div>
                </div>
              </div>
            </motion.button>

            {/* Google Play Button */}
            <motion.button
              onClick={openPopup}
              className="group relative w-full sm:w-auto"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4 px-8 py-4 bg-zinc-900 rounded-2xl border border-zinc-700 group-hover:border-blue-500/30 transition-all">
                <svg className="w-10 h-10 text-zinc-50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z"/>
                  <path d="M20.392 10.395l-3.816-2.2-4.784 3.805 4.784 3.806 3.816-2.2c.91-.524.91-1.687 0-2.211z"/>
                  <path d="M3.609 1.814L16.576 8.195l-2.784 3.805-10.183-10.186z"/>
                  <path d="M13.792 12l2.784 3.806L3.61 22.186 13.792 12z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-zinc-500">{t.cta.googlePlay.label}</div>
                  <div className="text-xl font-semibold text-zinc-50">{t.cta.googlePlay.store}</div>
                </div>
              </div>
            </motion.button>
          </div>
        </FadeIn>

        {/* Floating decorative elements - removed infinite animations for performance */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-16 w-16 h-16 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-3xl">🛒</span>
          </div>

          <div
            className="absolute top-1/3 right-16 w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6 text-blue-500" />
          </div>

          <div
            className="absolute bottom-1/3 left-24 w-12 h-12 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-2xl">🍎</span>
          </div>

          <div
            className="absolute bottom-1/4 right-24 w-14 h-14 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-2xl">👨‍🍳</span>
          </div>
        </div>
      </div>
    </section>
  );
}
