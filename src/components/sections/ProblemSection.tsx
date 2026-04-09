'use client';

import { motion } from 'framer-motion';
import { FileQuestion, Shuffle, UsersRound, BookX, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const problemIcons = [FileQuestion, Shuffle, UsersRound, BookX, Trash2];

interface ProblemCardData {
  title: string;
  subtitle: string;
  icon: typeof FileQuestion;
}

function ProblemCard({ card, index }: { card: ProblemCardData; index: number }) {
  const Icon = card.icon;

  return (
    <motion.div
      className="chaos-card flex flex-col justify-center gap-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/60 px-8 py-12 shadow-[0_10px_60px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Large number indicator */}
        <motion.div
          className="text-[120px] sm:text-[160px] md:text-[200px] font-bold text-zinc-900/50 leading-none mb-[-40px] sm:mb-[-60px] md:mb-[-80px] select-none"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          0{index + 1}
        </motion.div>

        {/* Icon */}
        <motion.div
          className="relative z-10 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 border border-rose-500/30 mb-6"
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4 px-4"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {card.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-zinc-400 px-4 max-w-xl mx-auto leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {card.subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const { t } = useLanguage();

  // Build problem cards from translations
  const problemCards: ProblemCardData[] = t.problem.cards.map((card, index) => ({
    title: card.title,
    subtitle: card.subtitle,
    icon: problemIcons[index],
  }));

  return (
    <section id="problem" className="relative bg-[#0a0a0f]">
      {/* Section header */}
      <div className="py-16 md:py-24 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-6"
        >
          {t.problem.badge}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-50"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t.problem.headline}
        </motion.h2>
      </div>

      {/* Simple stacked cards to avoid heavy scroll pinning */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 md:pb-24 grid gap-10 md:gap-14">
        {problemCards.map((card, index) => (
          <ProblemCard key={index} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
