'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Users,
  ChefHat,
  Mic,
  Tag,
  Shield,
  Check,
  ArrowRight,
  X,
  LucideIcon,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { useLanguage } from '@/contexts/LanguageContext';

// Icons for features
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

function MainFeatureCard({ feature, index }: { feature: FeatureData; index: number }) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-full"
    >
      <div className="h-full p-8 sm:p-10 rounded-3xl transition-all duration-500 bg-zinc-900/50 border border-white/20 hover:border-white/40 hover:bg-zinc-900/70 flex flex-col">
        
        {/* Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 bg-zinc-800 border border-zinc-700 flex-shrink-0">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-300" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-3 flex-shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-400 mb-6 leading-relaxed flex-shrink-0">
          {feature.description}
        </p>

        {/* Benefits list - grows to fill remaining space */}
        <ul className="space-y-3 mt-auto">
          {feature.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-zinc-800">
                <Check className="w-3 h-3 text-zinc-500" />
              </div>
              <span className="text-sm text-zinc-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function AdditionalFeatureCard({ feature, index }: { feature: AdditionalFeatureData; index: number }) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-full hidden md:block"
    >
      <div className="h-full p-8 sm:p-10 rounded-3xl transition-all duration-500 bg-zinc-900/50 border border-white/20 hover:border-blue-500/40 hover:bg-zinc-900/70 flex flex-col">
        
        {/* Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-3 flex-shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-400 mb-6 leading-relaxed flex-shrink-0">
          {feature.fullDescription}
        </p>

        {/* Benefits list - grows to fill remaining space */}
        <ul className="space-y-3 mt-auto">
          {feature.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-500/20">
                <Check className="w-3 h-3 text-blue-400" />
              </div>
              <span className="text-sm text-zinc-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Mobile row component - small, clickable
function AdditionalFeatureRow({ feature, index, onClick }: { feature: AdditionalFeatureData; index: number; onClick: () => void }) {
  const Icon = feature.icon;
  
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="md:hidden group flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 active:bg-zinc-800/50 active:border-blue-500/20 transition-all duration-300 cursor-pointer text-left w-full"
    >
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-zinc-50 font-semibold">{feature.title}</h4>
        <p className="text-sm text-zinc-500 truncate">{feature.description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
    </div>
  );
}

// Feature popup component - renders in portal to escape overflow:hidden
function FeaturePopup({ feature, onClose }: { feature: AdditionalFeatureData; onClose: () => void }) {
  const Icon = feature.icon;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90"
      onClick={onClose}
      style={{ touchAction: 'none' }}
    >
      <div
        className="relative w-full max-w-md bg-zinc-900 rounded-3xl border border-zinc-700 shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-blue-400" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 mb-8 leading-relaxed">
            {feature.fullDescription}
          </p>

          {/* Benefits list */}
          <ul className="space-y-4">
            {feature.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-zinc-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function FeatureSection() {
  const [selectedFeature, setSelectedFeature] = useState<AdditionalFeatureData | null>(null);
  const { t } = useLanguage();

  // Build features from translations
  const mainFeatures: FeatureData[] = t.features.mainFeatures.map((feature, index) => ({
    title: feature.title,
    description: feature.description,
    benefits: [...feature.benefits],
    icon: mainFeatureIcons[index],
  }));

  const additionalFeatures: AdditionalFeatureData[] = t.features.additionalFeatures.map((feature, index) => ({
    title: feature.title,
    description: feature.description,
    fullDescription: feature.fullDescription,
    benefits: [...feature.benefits],
    icon: additionalFeatureIcons[index],
  }));

  return (
    <section id="features" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[#0a0a0f]">
      {/* Background with organic shapes - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] blob bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] blob bg-gradient-to-tl from-zinc-800/20 to-transparent blur-3xl opacity-50" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header - Asymmetric */}
        <FadeIn className="mb-16 md:mb-20 lg:mb-24">
          <div className="max-w-3xl">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.features.badge}
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-50 mb-6 leading-[0.95]" style={{ fontFamily: 'var(--font-display)' }}>
              {t.features.headline}
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              {t.features.subheadline}
            </p>
          </div>
        </FadeIn>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20 items-stretch">
          {mainFeatures.map((feature, index) => (
            <MainFeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Additional Features */}
        <FadeIn className="mb-8">
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-12 bg-zinc-800" />
            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{t.features.plusMore}</h3>
            <div className="h-px w-12 bg-zinc-800" />
          </div>
        </FadeIn>
        
        {/* Additional Features - Desktop: Cards, Mobile: Rows */}
        {/* Desktop Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {additionalFeatures.map((feature, index) => (
            <AdditionalFeatureCard 
              key={index} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>
        
        {/* Mobile Rows */}
        <div className="md:hidden flex flex-col gap-3">
          {additionalFeatures.map((feature, index) => (
            <AdditionalFeatureRow 
              key={index} 
              feature={feature} 
              index={index}
              onClick={() => setSelectedFeature(feature)}
            />
          ))}
        </div>
      </div>

      {/* Feature Popup */}
      {selectedFeature && (
        <FeaturePopup 
          feature={selectedFeature} 
          onClose={() => setSelectedFeature(null)} 
        />
      )}
    </section>
  );
}
