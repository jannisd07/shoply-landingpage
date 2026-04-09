'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 left-0 bg-[#141414] rounded-xl border border-white/10 overflow-hidden shadow-xl min-w-[140px]"
          >
            <button
              onClick={() => {
                setLocale('en');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                locale === 'en' ? 'bg-white/5 text-white' : 'text-zinc-400'
              }`}
            >
              <span className="text-xs font-bold uppercase">EN</span>
              <span className="text-sm font-medium">{t.language.en}</span>
            </button>
            <button
              onClick={() => {
                setLocale('de');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                locale === 'de' ? 'bg-white/5 text-white' : 'text-zinc-400'
              }`}
            >
              <span className="text-xs font-bold uppercase">DE</span>
              <span className="text-sm font-medium">{t.language.de}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-b from-[#0d1a2d] to-[#091322] border border-blue-500/50 flex items-center justify-center text-white shadow-lg hover:border-blue-400/70 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Globe className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
