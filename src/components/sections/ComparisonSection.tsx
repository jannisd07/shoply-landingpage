'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonItem {
  feature: string;
  oldWay: string;
  newWay: string;
}

function ComparisonRow({ comparison, index }: { comparison: ComparisonItem; index: number }) {
  return (
    <div
      className="p-5 md:p-6 border-b border-zinc-800/50 last:border-b-0 hover:bg-zinc-800/20 transition-colors"
    >
      {/* Mobile: Stacked layout */}
      <div className="md:hidden space-y-4">
        <div className="text-center">
          <span className="text-zinc-50 text-sm font-semibold">{comparison.feature}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <X className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <span className="text-zinc-500 text-xs">{comparison.oldWay}</span>
          </div>
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="text-zinc-300 text-xs text-right">{comparison.newWay}</span>
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <X className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-zinc-500 text-sm">{comparison.oldWay}</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-zinc-50 text-sm font-semibold text-center">{comparison.feature}</span>
        </div>
        <div className="flex items-center justify-end gap-4">
          <span className="text-zinc-300 text-sm text-right">{comparison.newWay}</span>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Check className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  const { t } = useLanguage();

  return (
    <section id="comparison" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[#0a0a0f]">
      {/* Background - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/3 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.comparison.badge}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-50 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            {t.comparison.headline}
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.comparison.subheadline}
          </p>
        </FadeIn>

        {/* Table Header - Mobile */}
        <div className="md:hidden flex justify-between items-center mb-4 px-4">
          <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{t.comparison.oldWay}</span>
          <span className="text-blue-500 text-xs font-medium uppercase tracking-widest">{t.comparison.shoply}</span>
        </div>

        {/* Table Header - Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-4 px-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{t.comparison.oldWay}</span>
          </div>
          <div className="text-center">
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{t.comparison.feature}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-blue-500 text-xs font-medium uppercase tracking-widest">{t.comparison.shoply}</span>
          </div>
        </div>

        {/* Comparison Table */}
        <motion.div
          className="rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {t.comparison.items.map((comparison, index) => (
            <ComparisonRow key={index} comparison={comparison} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <FadeIn className="text-center mt-16 md:mt-20">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-50 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            {t.comparison.ctaText}
          </p>
          <motion.button
            className="group px-10 py-5 bg-blue-500 text-[#0d0d0d] rounded-full text-lg font-semibold hover:shadow-[0_0_40px_rgba(212,245,66,0.4)] transition-all duration-300"
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
