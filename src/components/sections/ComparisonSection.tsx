'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Check,
  X,
  Zap,
  Users,
  ChefHat,
  Mic,
  Tag,
  Shield,
  Cloud,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';

// Feature icons, one per comparison row
const rowIcons: LucideIcon[] = [
  Cloud,         // sync
  Zap,           // AI categorization
  ChefHat,       // recipe ingredients
  Users,         // shared lists
  Mic,           // voice
  Tag,           // deals
  Shield,        // allergies
  ShoppingCart,  // offline
];

/**
 * Comparison — redesigned as a side-by-side VS card battle. Left column
 * shows "The old way" (cream, washed out). Right column shows "Avo"
 * (bright white, elevated, green accents). A central animated "VS"
 * badge bridges the two. Each feature row has an icon on the left and
 * then mirrors the state (✗ / ✓) on each side.
 */
export default function ComparisonSection() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [prefersReducedMotion ? 0 : 40, 0]
  );
  const leftCardY = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    [prefersReducedMotion ? 0 : 40, prefersReducedMotion ? 0 : -40]
  );
  const rightCardY = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    [prefersReducedMotion ? 0 : -40, prefersReducedMotion ? 0 : 40]
  );

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="relative py-12 md:py-32 lg:py-40 overflow-hidden bg-[#fafaf7]"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-[#e7f4ec]/40 blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#fef2ef]/40 blur-[120px]" />
      </div>
      <div className="absolute inset-0 dotted-bg opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div style={{ y: headingY }} className="text-center mb-8 md:mb-20">
          <FadeIn>
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e7f4ec] border border-[#3e8e5a]/20 text-[#2d6f45] text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3e8e5a]" />
              {t.comparison.badge}
            </motion.span>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0b1a0f] mb-3 md:mb-6 tracking-tight leading-[0.95]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.comparison.headline}
            </h2>
            <p className="hidden sm:block text-lg md:text-xl text-[#4a5a4f] max-w-2xl mx-auto leading-relaxed">
              {t.comparison.subheadline}
            </p>
          </FadeIn>
        </motion.div>

        {/* ── VS Battle ─────────────────────────────────────── */}
        <div className="relative">
          {/* Center VS badge — floats between cards on desktop */}
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 14,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full bg-white border-4 border-[#fafaf7] shadow-[0_10px_40px_-10px_rgba(11,26,15,0.25)] items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0b1a0f] to-[#1c2e21] flex items-center justify-center">
              <span
                className="text-white text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                VS
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-0">
            {/* ── LEFT: Old way ─────────────────────────────── */}
            <motion.div
              style={{ y: leftCardY }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative md:mr-[-10px]"
            >
              <div className="relative h-full rounded-[24px] md:rounded-r-none bg-[#f4f2ec] border border-[#0b1a0f]/8 p-5 md:p-10 overflow-hidden">
                {/* Washed out diagonal lines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(-45deg, #0b1a0f 0 1px, transparent 1px 12px)',
                  }}
                />

                {/* Header */}
                <div className="relative flex items-center justify-between mb-8">
                  <h3
                    className="text-2xl md:text-3xl font-bold text-[#4a5a4f]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Other apps
                  </h3>
                  <div className="w-14 h-14 rounded-2xl bg-[#f0efea] border border-[#0b1a0f]/8 flex items-center justify-center">
                    <X className="w-7 h-7 text-[#7a8a7f]" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Rows */}
                <ul className="relative space-y-2.5 md:space-y-4">
                  {t.comparison.items.map((item, index) => {
                    const Icon = rowIcons[index] ?? Cloud;
                    return (
                      <motion.li
                        key={`old-${index}`}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/50 border border-[#0b1a0f]/6 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#7a8a7f]" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="hidden md:block text-xs font-semibold text-[#7a8a7f] uppercase tracking-wider mb-0.5">
                            {item.feature}
                          </div>
                          <div className="text-xs md:text-sm text-[#7a8a7f] line-through">
                            {item.oldWay}
                          </div>
                        </div>
                        <X
                          className="w-4 h-4 text-[#c9583c]/70 flex-shrink-0"
                          strokeWidth={3}
                        />
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

            {/* ── RIGHT: Avo ────────────────────────────────── */}
            <motion.div
              style={{ y: rightCardY }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative md:ml-[-10px]"
            >
              <div className="relative h-full rounded-[24px] md:rounded-l-none bg-[#f0f7f1] border border-[#3e8e5a]/20 p-5 md:p-10 overflow-hidden">
                {/* Subtle green gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e7f4ec]/40 via-transparent to-[#f0f7f1]/20 pointer-events-none" />

                {/* Recommended tag */}
                <div className="absolute top-5 right-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b1a0f] text-white text-[10px] font-bold uppercase tracking-[0.15em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5aa873] animate-pulse" />
                    Recommended
                  </span>
                </div>

                {/* Header */}
                <div className="relative flex items-center justify-between mb-8">
                  <h3
                    className="text-2xl md:text-3xl font-bold text-[#0b1a0f]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Avo
                  </h3>
                </div>

                {/* Rows */}
                <ul className="relative space-y-2.5 md:space-y-4">
                  {t.comparison.items.map((item, index) => {
                    const Icon = rowIcons[index] ?? Cloud;
                    return (
                      <motion.li
                        key={`new-${index}`}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05 + 0.2,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#e7f4ec] border border-[#3e8e5a]/20 flex items-center justify-center">
                          <Icon
                            className="w-4 h-4 text-[#2d6f45]"
                            strokeWidth={2.25}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="hidden md:block text-xs font-semibold text-[#2d6f45] uppercase tracking-wider mb-0.5">
                            {item.feature}
                          </div>
                          <div className="text-xs md:text-sm text-[#0b1a0f] font-medium">
                            {item.newWay}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3e8e5a] flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={4}
                          />
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <FadeIn className="text-center mt-16 md:mt-24">
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0b1a0f] mb-8 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.comparison.ctaText}
          </p>
          <motion.button
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#0b1a0f] text-white rounded-full text-lg font-semibold shadow-[0_10px_30px_-10px_rgba(11,26,15,0.4)] hover:bg-[#1c2e21] hover:shadow-[0_20px_50px_-10px_rgba(62,142,90,0.45)] transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const element = document.querySelector('#cta');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.comparison.ctaButton}
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}
