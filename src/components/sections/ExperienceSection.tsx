'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Brain, Check, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

// Icons and images for experience blocks
const blockIcons = [Brain, Users, BookOpen];
const blockImages = [
  '/images/screenshots/screenshot-2.webp',
  '/images/screenshots/screenshot-3.webp', 
  '/images/screenshots/screenshot-1.webp',
];

interface ExperienceBlockData {
  title: string;
  description: string;
  stat: { value: string; label: string };
  icon: LucideIcon;
  image: string;
  features: string[];
}

// Desktop layout for experience blocks
function ExperienceBlockDesktop({
  block,
  index,
}: {
  block: ExperienceBlockData;
  index: number;
}) {
  const Icon = block.icon;
  const isEven = index % 2 === 0;

  return (
    <div className="hidden md:block py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className={`flex ${
            isEven ? 'flex-row' : 'flex-row-reverse'
          } items-center gap-16 lg:gap-24`}
        >
          {/* Text Content */}
          <div className="flex-1">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6">
              <Icon className="w-7 h-7 text-blue-500" />
            </div>

            <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-zinc-50 mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {block.title}
            </h3>

            <p className="text-lg text-zinc-400 mb-6 max-w-lg leading-relaxed">
              {block.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {block.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-zinc-800/50 text-zinc-300 border border-zinc-700/50"
                >
                  <Check className="w-3.5 h-3.5 text-blue-500" />
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <div className="text-4xl lg:text-5xl font-bold text-blue-500" style={{ fontFamily: 'var(--font-display)' }}>
                {block.stat.value}
              </div>
              <div className="text-sm text-zinc-500 mb-2">{block.stat.label}</div>
            </div>
          </div>

          {/* Phone image with decorative elements */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Decorative blob */}
              <div className={`absolute ${isEven ? '-right-12' : '-left-12'} top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl`} />
              
              {/* Phone frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: isEven ? 5 : -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src={block.image}
                  alt={block.title}
                  width={240}
                  height={480}
                  className="drop-shadow-2xl w-[220px] lg:w-[260px] rounded-3xl"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Mobile carousel component
function MobilePhoneCarousel({ blocks }: { blocks: ExperienceBlockData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blocks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blocks.length) % blocks.length);
  };

  const block = blocks[currentIndex];
  const Icon = block.icon;

  return (
    <div className="md:hidden py-16 overflow-hidden">
      <div className="px-6">
        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Phone image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                <Image
                  src={block.image}
                  alt={block.title}
                  width={180}
                  height={360}
                  className="relative drop-shadow-xl rounded-2xl"
                />
              </div>
            </div>

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
              <Icon className="w-6 h-6 text-blue-500" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-zinc-50 mb-3 px-4" style={{ fontFamily: 'var(--font-display)' }}>
              {block.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-400 mb-6 px-4 max-w-sm mx-auto leading-relaxed">
              {block.description}
            </p>

            {/* Stat */}
            <div className="mb-6">
              <div className="text-2xl font-bold text-blue-500" style={{ fontFamily: 'var(--font-display)' }}>{block.stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{block.stat.label}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-50 hover:border-zinc-600 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {blocks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-50 hover:border-zinc-600 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { t } = useLanguage();

  // Build experience blocks from translations
  const experienceBlocks: ExperienceBlockData[] = t.experience.blocks.map((block, index) => ({
    title: block.title,
    description: block.description,
    stat: block.stat,
    icon: blockIcons[index],
    image: blockImages[index],
    features: [...block.features],
  }));

  return (
    <section id="experience" className="relative overflow-hidden bg-[#0a0a0f]">
      {/* Background with organic shapes - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] blob bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] blob bg-gradient-to-tl from-zinc-800/20 to-transparent blur-3xl opacity-60" style={{ animationDelay: '-6s' }} />
      </div>

      {/* Section Header */}
      <div className="relative z-10 pt-24 md:pt-32 pb-8 md:pb-12 px-6">
        <FadeIn className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.experience.badge}
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-50 mb-6 leading-[0.95]" style={{ fontFamily: 'var(--font-display)' }}>
              {t.experience.headline}
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              {t.experience.subheadline}
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Mobile Carousel */}
      <div className="relative z-10">
        <MobilePhoneCarousel blocks={experienceBlocks} />
      </div>

      {/* Desktop Experience Blocks */}
      <div className="relative z-10">
        {experienceBlocks.map((block, index) => (
          <ExperienceBlockDesktop
            key={index}
            block={block}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
