'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Language switcher — light, creamy pill that lives in the bottom-left
 * corner. On click it reveals a white card with the two locales and a
 * green check next to the active one. Matches the Avo design system.
 */
export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dismiss on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const languages = [
    { code: 'en' as const, label: t.language.en, flag: '🇬🇧' },
    { code: 'de' as const, label: t.language.de, flag: '🇩🇪' },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 z-50"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[52px] left-0 min-w-[180px] rounded-2xl bg-white border border-[#0b1a0f]/8 shadow-[0_1px_2px_rgba(11,26,15,0.04),0_20px_50px_-20px_rgba(11,26,15,0.18)] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a8a7f]">
              {t.language.toggle}
            </div>
            {languages.map((lang) => {
              const active = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    active
                      ? 'bg-[#f0f7f1] text-[#0b1a0f]'
                      : 'text-[#4a5a4f] hover:bg-[#fafaf7] hover:text-[#0b1a0f]'
                  }`}
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span className="flex-1 text-sm font-medium">{lang.label}</span>
                  {active && (
                    <Check
                      className="w-4 h-4 text-[#3e8e5a]"
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        aria-label={t.language.toggle}
        aria-expanded={isOpen}
        className="flex items-center gap-2 h-11 pl-3 pr-4 rounded-full bg-white border border-[#0b1a0f]/8 text-[#0b1a0f] shadow-[0_1px_2px_rgba(11,26,15,0.04),0_12px_30px_-16px_rgba(11,26,15,0.25)] hover:border-[#3e8e5a]/30 hover:shadow-[0_1px_2px_rgba(11,26,15,0.04),0_20px_40px_-18px_rgba(62,142,90,0.35)] transition-all duration-300"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#e7f4ec]">
          <Globe className="w-3.5 h-3.5 text-[#2d6f45]" strokeWidth={2.5} />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider">
          {locale}
        </span>
      </motion.button>
    </div>
  );
}
