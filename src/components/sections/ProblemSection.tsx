'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  FileQuestion,
  Shuffle,
  UsersRound,
  BookX,
  Trash2,
  Quote,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const problemIcons: LucideIcon[] = [
  FileQuestion,
  Shuffle,
  UsersRound,
  BookX,
  Trash2,
];

interface ProblemCardData {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

/**
 * Problem section — redesigned as an asymmetric "bento" grid of chat-
 * message style cards. Each card tilts slightly on hover. A big faux
 * text-message bubble anchors the top-left. Background features a
 * circular parallax crumpled-paper vibe.
 */
export default function ProblemSection() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [prefersReducedMotion ? 0 : 60, 0]
  );

  const blobAY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 80, prefersReducedMotion ? 0 : -80]
  );

  const blobBY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : -60, prefersReducedMotion ? 0 : 100]
  );

  // Defensive card construction
  const problemCards: ProblemCardData[] = (t.problem.cards ?? [])
    .slice(0, problemIcons.length)
    .map((card, index) => ({
      title: card.title,
      subtitle: card.subtitle,
      icon: problemIcons[index],
    }));

  // Asymmetric bento positioning — each card gets its own grid placement
  // and a slight rotation to feel hand-scattered.
  const bentoLayouts = [
    { span: 'md:col-span-7 md:row-span-2', rotate: -1.6 },
    { span: 'md:col-span-5 md:row-span-1', rotate: 1.4 },
    { span: 'md:col-span-5 md:row-span-1', rotate: -0.8 },
    { span: 'md:col-span-6 md:row-span-1', rotate: 1.1 },
    { span: 'md:col-span-6 md:row-span-1', rotate: -1.3 },
  ];

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative bg-[#f7f6f1] py-12 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* ── Ambient parallax layers ───────────────────────────── */}
      <motion.div
        style={{ y: blobAY }}
        className="absolute top-10 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#fff1eb]/80 via-[#fef7f2]/40 to-transparent blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: blobBY }}
        className="absolute bottom-0 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-[#eef4e1]/70 via-[#f4f7e8]/30 to-transparent blur-[140px] pointer-events-none"
      />

      {/* Dotted background texture */}
      <div className="absolute inset-0 dotted-bg opacity-30 pointer-events-none" />

      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.div
        style={{ y: headerY }}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 mb-14 md:mb-20"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fef2ef] border border-[#f4ccc2] text-[#a14331] text-sm font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9583c]" />
          {t.problem.badge}
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0b1a0f] leading-[0.95] tracking-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.problem.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-[#4a5a4f] max-w-sm leading-relaxed"
          >
            Every trip to the store comes with the same mess. Paper lists,
            forgotten items, duplicate purchases. We&apos;ve all been there.
          </motion.p>
        </div>
      </motion.div>

      {/* ── Bento asymmetric grid ──────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 auto-rows-auto md:auto-rows-[220px]">
          {problemCards.map((card, index) => {
            const Icon = card.icon;
            const layout = bentoLayouts[index] ?? { span: 'md:col-span-6', rotate: 0 };
            const isFeatured = index === 0;

            return (
              <motion.article
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 60,
                  rotate: prefersReducedMotion ? 0 : layout.rotate + (index % 2 === 0 ? -2 : 2),
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: prefersReducedMotion ? 0 : layout.rotate,
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { rotate: 0, y: -6, transition: { duration: 0.35 } }
                }
                transition={{
                  delay: index * 0.08,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: '-80px' }}
                className={`${layout.span} group relative`}
              >
                <div
                  className={`relative h-full w-full rounded-[28px] bg-white border border-[#0b1a0f]/8 shadow-[0_1px_2px_rgba(11,26,15,0.04),0_24px_60px_-30px_rgba(11,26,15,0.2)] group-hover:shadow-[0_30px_80px_-30px_rgba(201,88,60,0.25)] transition-shadow duration-500 overflow-hidden p-7 sm:p-9 flex flex-col ${
                    isFeatured ? 'md:p-12' : ''
                  }`}
                >
                  {/* Featured card: big "chat bubble" quote + tail */}
                  {isFeatured && (
                    <>
                      <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#fef2ef] to-[#fce4dc] blur-xl opacity-60" />
                      <div className="absolute top-8 right-8 text-[#c9583c]/15">
                        <Quote className="w-20 h-20 md:w-28 md:h-28" strokeWidth={1.5} />
                      </div>
                    </>
                  )}

                  {/* Icon badge */}
                  <div className="relative z-10 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-[#fef2ef] border border-[#f4ccc2] mb-5 flex-shrink-0">
                    <Icon
                      className="w-5 h-5 md:w-5.5 md:h-5.5 text-[#c9583c]"
                      strokeWidth={2.25}
                    />
                  </div>

                  {/* Number tag */}
                  <div className="absolute top-6 right-6 text-[11px] font-semibold text-[#7a8a7f] tracking-[0.2em] uppercase">
                    0{index + 1}
                  </div>

                  {/* Title */}
                  <h3
                    className={`relative z-10 font-bold text-[#0b1a0f] leading-[1.1] mb-2 ${
                      isFeatured
                        ? 'text-2xl md:text-4xl lg:text-5xl'
                        : 'text-xl md:text-2xl'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {card.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className={`relative z-10 text-[#4a5a4f] leading-relaxed mt-auto ${
                      isFeatured ? 'text-base md:text-lg max-w-md' : 'text-sm'
                    }`}
                  >
                    {card.subtitle}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── Decorative bottom tag — "... and that's just Monday" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-3 text-[#7a8a7f]"
        >
          <div className="h-px w-12 bg-[#0b1a0f]/10" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium">
            There&apos;s a better way
          </span>
          <div className="h-px w-12 bg-[#0b1a0f]/10" />
        </motion.div>
      </div>
    </section>
  );
}
