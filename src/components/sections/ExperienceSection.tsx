'use client';

import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Users,
  BookOpen,
  Brain,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import IPhoneMockup from '@/components/ui/IPhoneMockup';

const blockIcons = [Brain, Users, BookOpen];
const blockImages = [
  '/images/screenshots/screenshot-1.webp',
  '/images/screenshots/screenshot-2.webp',
  '/images/screenshots/screenshot-3.webp',
];

interface ExperienceBlockData {
  title: string;
  description: string;
  stat: { value: string; label: string };
  icon: LucideIcon;
  image: string;
  features: string[];
}

export default function ExperienceSection() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blobY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 80, prefersReducedMotion ? 0 : -120]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [prefersReducedMotion ? 0 : 40, 0]
  );

  const experienceBlocks: ExperienceBlockData[] = t.experience.blocks.map(
    (block, index) => ({
      title: block.title,
      description: block.description,
      stat: block.stat,
      icon: blockIcons[index],
      image: blockImages[index],
      features: [...block.features],
    })
  );

  const activeBlock = experienceBlocks[activeIndex];
  // Circular layout: left is the "previous" phone, right is the "next" phone
  const leftIndex = (activeIndex + 2) % 3;
  const rightIndex = (activeIndex + 1) % 3;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-14 md:py-32 lg:py-40 overflow-hidden bg-[#f7f6f1]"
    >
      {/* Parallax background blob */}
      <motion.div
        style={{ y: blobY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-to-br from-[#e7f4ec]/60 via-[#f0f7f1]/25 to-transparent blur-[160px] pointer-events-none"
      />
      <div className="absolute inset-0 dotted-bg opacity-25 pointer-events-none" />

      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.div
        style={{ y: headingY }}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 mb-10 md:mb-20 text-center"
      >
        <FadeIn>
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e7f4ec] border border-[#3e8e5a]/20 text-[#2d6f45] text-sm font-medium mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3e8e5a]" />
            {t.experience.badge}
          </motion.span>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0b1a0f] mb-4 leading-[0.95] tracking-tight max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.experience.headline}
          </h2>
          <p className="text-base md:text-xl text-[#4a5a4f] max-w-2xl mx-auto leading-relaxed hidden sm:block">
            {t.experience.subheadline}
          </p>
        </FadeIn>
      </motion.div>

      {/* ── Main experience stage ─────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* ── Left: vertical step list ────────────────────── */}
          <div className="col-span-full lg:col-span-6 order-2 lg:order-1">
            <div className="flex flex-col gap-2 md:gap-3">
              {experienceBlocks.map((block, index) => {
                const Icon = block.icon;
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={block.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true }}
                    className={`relative text-left rounded-[20px] md:rounded-[24px] p-4 md:p-7 transition-all duration-500 border ${
                      isActive
                        ? 'bg-white border-[#3e8e5a]/25 shadow-[0_1px_2px_rgba(11,26,15,0.04),0_24px_60px_-30px_rgba(62,142,90,0.35)]'
                        : 'bg-white/40 border-[#0b1a0f]/6 hover:bg-white hover:border-[#0b1a0f]/12'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="experience-rail"
                        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#3e8e5a] to-[#2d6f45]"
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      />
                    )}

                    <div className="flex items-start gap-4 md:gap-5">
                      {/* Icon */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                        <div
                          className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? 'bg-gradient-to-br from-[#e7f4ec] to-[#c3e4ce] border border-[#3e8e5a]/25 shadow-[0_8px_20px_-8px_rgba(62,142,90,0.4)]'
                              : 'bg-[#f0f7f1] border border-[#3e8e5a]/10'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 md:w-6 md:h-6 transition-colors duration-500 ${
                              isActive ? 'text-[#2d6f45]' : 'text-[#7a8a7f]'
                            }`}
                            strokeWidth={2}
                          />
                        </div>
                        <span
                          className={`text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-500 ${
                            isActive ? 'text-[#3e8e5a]' : 'text-[#7a8a7f]'
                          }`}
                        >
                          0{index + 1}
                        </span>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-base md:text-2xl font-bold mb-1 md:mb-2 leading-snug tracking-tight transition-colors duration-500 ${
                            isActive ? 'text-[#0b1a0f]' : 'text-[#4a5a4f]'
                          }`}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {block.title}
                        </h3>

                        {!isActive && (
                          <p className="text-xs md:text-sm text-[#7a8a7f] line-clamp-1 hidden sm:block">
                            {block.description}
                          </p>
                        )}

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs md:text-base text-[#4a5a4f] leading-relaxed mb-3 md:mb-4">
                                {block.description}
                              </p>

                              <ul className="hidden sm:flex flex-wrap gap-2 mb-3 md:mb-4">
                                {block.features.map((f) => (
                                  <li
                                    key={f}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2d6f45] bg-[#f0f7f1] px-2.5 py-1 rounded-full border border-[#3e8e5a]/15"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#3e8e5a]" />
                                    {f}
                                  </li>
                                ))}
                              </ul>

                              <div className="flex items-baseline gap-2">
                                <span
                                  className="text-xl md:text-3xl font-bold text-[#2d6f45] tabular-nums"
                                  style={{ fontFamily: 'var(--font-display)' }}
                                >
                                  {block.stat.value}
                                </span>
                                <span className="text-xs text-[#7a8a7f]">
                                  {block.stat.label}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <ArrowRight
                        className={`w-4 h-4 flex-shrink-0 mt-3 transition-all duration-500 ${
                          isActive
                            ? 'text-[#3e8e5a] translate-x-0.5'
                            : 'text-[#0b1a0f]/20'
                        }`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── Right: phone stage — desktop only ──── */}
          <div className="lg:col-span-6 order-1 lg:order-2 hidden lg:block">
            <div className="relative flex items-center justify-center min-h-[340px] sm:min-h-[480px] md:min-h-[580px]">
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[#e7f4ec]/60 blur-[60px] pointer-events-none" />

              {/* LEFT background phone */}
              <motion.div
                key={`left-${leftIndex}`}
                animate={{
                  x: prefersReducedMotion ? -120 : -130,
                  y: 20,
                  rotate: prefersReducedMotion ? 0 : -12,
                  scale: 0.72,
                  opacity: 0.5,
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute hidden sm:block pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <IPhoneMockup
                  src={experienceBlocks[leftIndex].image}
                  alt={experienceBlocks[leftIndex].title}
                  width={240}
                  priority
                />
              </motion.div>

              {/* RIGHT background phone */}
              <motion.div
                key={`right-${rightIndex}`}
                animate={{
                  x: prefersReducedMotion ? 120 : 130,
                  y: 20,
                  rotate: prefersReducedMotion ? 0 : 12,
                  scale: 0.72,
                  opacity: 0.5,
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute hidden sm:block pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <IPhoneMockup
                  src={experienceBlocks[rightIndex].image}
                  alt={experienceBlocks[rightIndex].title}
                  width={240}
                  priority
                />
              </motion.div>

              {/* CENTER active phone */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`center-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                  style={{ zIndex: 10 }}
                >
                  <div className="hidden sm:block">
                    <IPhoneMockup
                      src={activeBlock.image}
                      alt={activeBlock.title}
                      width={260}
                      priority
                    />
                  </div>
                  <div className="sm:hidden">
                    <IPhoneMockup
                      src={activeBlock.image}
                      alt={activeBlock.title}
                      width={200}
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
