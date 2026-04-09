'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Brain,
  Users,
  ChefHat,
  Mic,
  Tag,
  Shield,
  Check,
  Sparkles,
  ArrowRight,
  X,
  LucideIcon,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';

const mainFeatureIcons = [Brain, Users, ChefHat];
const additionalFeatureIcons = [Mic, Tag, Shield];

interface FeatureData {
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
}

interface AdditionalFeatureData extends FeatureData {
  fullDescription: string;
}

/**
 * Main features — each rendered as a wide horizontal "slab" with the
 * icon floating on the left in a soft green bubble, text center, and
 * a giant number on the right. Alternates layout direction every row.
 */
function MainFeatureSlab({
  feature,
  index,
}: {
  feature: FeatureData;
  index: number;
}) {
  const Icon = feature.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: '-100px' }}
      className="group relative"
    >
      <div className="relative rounded-[32px] bg-white border border-[#0b1a0f]/8 shadow-[0_1px_2px_rgba(11,26,15,0.04),0_24px_60px_-30px_rgba(11,26,15,0.18)] group-hover:shadow-[0_30px_80px_-30px_rgba(62,142,90,0.28)] transition-all duration-500 overflow-hidden">
        {/* Green hover wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f0f7f1]/0 via-transparent to-[#e7f4ec]/0 group-hover:from-[#f0f7f1]/80 group-hover:to-[#e7f4ec]/40 transition-all duration-700" />

        {/* Giant ghost number */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[200px] md:text-[280px] lg:text-[340px] font-bold leading-none text-[#0b1a0f]/[0.03] select-none ${
            isEven ? 'right-4 md:right-10' : 'left-4 md:left-10'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          0{index + 1}
        </span>

        <div
          className={`relative z-10 flex flex-row ${
            isEven ? 'md:flex-row' : 'md:flex-row-reverse'
          } items-center gap-5 md:gap-12 p-5 md:p-12 lg:p-16`}
        >
          {/* Icon bubble */}
          <div className="relative flex-shrink-0">
            <div className="relative w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-[24px] bg-white border border-[#0b1a0f]/8 flex items-center justify-center shadow-[0_8px_24px_-12px_rgba(11,26,15,0.12)]">
              <Icon
                className="w-7 h-7 md:w-11 md:h-11 text-[#0b1a0f]/70"
                strokeWidth={1.5}
              />
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border border-[#3e8e5a]/20 flex items-center justify-center shadow-sm">
              <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#3e8e5a]" />
            </div>
          </div>

          {/* Text + benefit chips */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl md:text-4xl lg:text-5xl font-bold text-[#0b1a0f] mb-1 md:mb-4 leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {feature.title}
            </h3>

            {/* Benefit chips — hidden on mobile to save space */}
            <ul className="hidden md:flex flex-wrap gap-2">
              {feature.benefits.map((benefit, bi) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + bi * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f7f1] border border-[#3e8e5a]/20 text-[#2d6f45] text-sm font-medium"
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  {benefit}
                </motion.li>
              ))}
            </ul>
            {/* Mobile: compact chip row (first 2 only) */}
            <ul className="md:hidden flex flex-wrap gap-1.5">
              {feature.benefits.slice(0, 2).map((benefit) => (
                <li
                  key={benefit}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#f0f7f1] border border-[#3e8e5a]/15 text-[#2d6f45] text-xs font-medium"
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Additional feature card — smaller, icon-top tile. Used in the 3-col
 * row at the bottom.
 */
function AdditionalFeatureCard({
  feature,
  index,
}: {
  feature: AdditionalFeatureData;
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative h-full hidden md:block"
    >
      <div className="h-full p-7 rounded-[24px] bg-[#fdfdfb] border border-[#0b1a0f]/8 hover:border-[#3e8e5a]/25 hover:bg-white hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(62,142,90,0.25)] transition-all duration-500 flex flex-col">
        {/* Small icon + title on one line */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-white border border-[#0b1a0f]/8 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#0b1a0f]/60" strokeWidth={1.75} />
          </div>
          <h3
            className="text-lg font-bold text-[#0b1a0f] tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {feature.title}
          </h3>
        </div>

        <p className="text-sm text-[#4a5a4f] mb-5 leading-relaxed flex-1">
          {feature.fullDescription}
        </p>

        {/* Inline dot-separated benefits */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#7a8a7f] font-medium">
          {feature.benefits.map((b, i) => (
            <span key={b} className="inline-flex items-center gap-1.5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-[#0b1a0f]/20" />}
              {b}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Mobile row — compact, clickable
function AdditionalFeatureRow({
  feature,
  onClick,
}: {
  feature: AdditionalFeatureData;
  onClick: () => void;
}) {
  const Icon = feature.icon;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="md:hidden group flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#0b1a0f]/6 active:bg-[#f7f6f1] active:border-[#3e8e5a]/30 transition-all duration-300 cursor-pointer text-left w-full"
    >
      <div className="w-12 h-12 rounded-xl bg-white border border-[#0b1a0f]/8 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#0b1a0f]/60" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[#0b1a0f] font-semibold">{feature.title}</h4>
        <p className="text-sm text-[#7a8a7f] truncate">{feature.description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-[#7a8a7f] flex-shrink-0" />
    </button>
  );
}

// Feature popup — renders in portal
function FeaturePopup({
  feature,
  onClose,
}: {
  feature: AdditionalFeatureData;
  onClose: () => void;
}) {
  const Icon = feature.icon;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0b1a0f]/55 backdrop-blur-sm"
      onClick={onClose}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-white rounded-[28px] border border-[#0b1a0f]/6 shadow-[0_40px_80px_-20px_rgba(11,26,15,0.3)] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#f7f6f1] border border-[#0b1a0f]/8 flex items-center justify-center text-[#4a5a4f] hover:text-[#0b1a0f] hover:bg-white z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#0b1a0f]/8 flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-[#0b1a0f]/60" />
          </div>

          <h3
            className="text-2xl font-bold text-[#0b1a0f] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {feature.title}
          </h3>

          <p className="text-[#4a5a4f] mb-8 leading-relaxed">
            {feature.fullDescription}
          </p>

          <ul className="space-y-4">
            {feature.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[#e7f4ec] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#3e8e5a]" strokeWidth={3} />
                </div>
                <span className="text-[#0b1a0f]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default function FeatureSection() {
  const [selectedFeature, setSelectedFeature] =
    useState<AdditionalFeatureData | null>(null);
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blobY1 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -140]
  );
  const blobY2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 120]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [prefersReducedMotion ? 0 : 40, 0]
  );

  const mainFeatures: FeatureData[] = t.features.mainFeatures.map(
    (feature, index) => ({
      title: feature.title,
      description: feature.description,
      benefits: [...feature.benefits],
      icon: mainFeatureIcons[index],
    })
  );

  const additionalFeatures: AdditionalFeatureData[] =
    t.features.additionalFeatures.map((feature, index) => ({
      title: feature.title,
      description: feature.description,
      fullDescription: feature.fullDescription,
      benefits: [...feature.benefits],
      icon: additionalFeatureIcons[index],
    }));

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-12 md:py-32 lg:py-40 overflow-hidden bg-[#fafaf7]"
    >
      {/* Parallax background blobs */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <motion.div
          style={{ y: blobY1 }}
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#e7f4ec]/60 via-[#f0f7f1]/25 to-transparent blur-[140px]"
        />
        <motion.div
          style={{ y: blobY2 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#f4f7e8]/50 via-[#fefdf6]/20 to-transparent blur-[140px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header — centered with decorative underline */}
        <motion.div
          style={{ y: headingY }}
          className="mb-8 md:mb-24 text-center"
        >
          <FadeIn>
            <div className="mb-6">
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e7f4ec] border border-[#3e8e5a]/20 text-[#2d6f45] text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3e8e5a]" />
                {t.features.badge}
              </motion.span>
            </div>
            <h2
              className="relative inline-block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0b1a0f] mb-4 md:mb-6 leading-[0.95] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.features.headline}
              {/* underline swoop */}
              <motion.svg
                className="absolute -bottom-3 left-0 w-full h-4 text-[#3e8e5a]/40"
                viewBox="0 0 300 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1.1, ease: 'easeOut' }}
              >
                <motion.path
                  d="M2 8 Q 80 2, 150 6 T 298 4"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.svg>
            </h2>
            <p className="text-lg md:text-xl text-[#4a5a4f] max-w-2xl mx-auto leading-relaxed">
              {t.features.subheadline}
            </p>
          </FadeIn>
        </motion.div>

        {/* Main Features - stacked slabs (alternating) */}
        <div className="flex flex-col gap-3 md:gap-8 mb-10 md:mb-28">
          {mainFeatures.map((feature, index) => (
            <MainFeatureSlab key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Divider */}
        <FadeIn className="mb-10">
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-12 bg-[#0b1a0f]/12" />
            <h3 className="text-sm font-medium text-[#7a8a7f] uppercase tracking-[0.2em]">
              {t.features.plusMore}
            </h3>
            <div className="h-px w-12 bg-[#0b1a0f]/12" />
          </div>
        </FadeIn>

        {/* Additional Features - Desktop Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 items-stretch">
          {additionalFeatures.map((feature, index) => (
            <AdditionalFeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Additional Features - Mobile Rows */}
        <div className="md:hidden flex flex-col gap-3">
          {additionalFeatures.map((feature, index) => (
            <AdditionalFeatureRow
              key={index}
              feature={feature}
              onClick={() => setSelectedFeature(feature)}
            />
          ))}
        </div>
      </div>

      {selectedFeature && (
        <FeaturePopup
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </section>
  );
}
