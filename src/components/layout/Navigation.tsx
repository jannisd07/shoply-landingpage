'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollPosition } from '@/hooks';
import { smoothScrollTo } from '@/lib/gsap-config';
import { cn } from '@/lib/utils';
import { useEmailPopup } from '@/contexts/EmailPopupContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

// Launch: 1 month from April 9 2026 midnight
const LAUNCH_DATE = new Date('2026-05-09T00:00:00');

function useCountdown() {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const calc = () => {
      const diff = LAUNCH_DATE.getTime() - Date.now();
      if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
      return {
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      };
    };
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Digit({ v }: { v: number }) {
  return (
    <span className="font-mono font-semibold tabular-nums text-[#0b1a0f]">
      {String(v).padStart(2, '0')}
    </span>
  );
}

function CountdownBadge() {
  const t = useCountdown();
  if (!t) return <span className="w-20 h-4 bg-[#0b1a0f]/8 rounded animate-pulse" />;
  return (
    <span className="flex items-center gap-0.5 text-xs font-mono font-medium text-[#4a5a4f]">
      <Digit v={t.d} /><span className="text-[#0b1a0f]/30 mx-0.5">T</span>
      <Digit v={t.h} /><span className="text-[#0b1a0f]/30">:</span>
      <Digit v={t.m} /><span className="text-[#0b1a0f]/30">:</span>
      <Digit v={t.s} />
    </span>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { y } = useScrollPosition();
  const { openPopup } = useEmailPopup();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.howItWorks, href: '#experience' },
  ];

  useEffect(() => {
    setIsScrolled(y > 50);
  }, [y]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) smoothScrollTo(element, 1);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Main nav */}
        <div
          className={cn(
            'transition-all duration-500',
            isScrolled
              ? 'bg-white/85 backdrop-blur-xl border-b border-[#0b1a0f]/8 shadow-[0_1px_24px_-8px_rgba(11,26,15,0.08)]'
              : 'bg-transparent'
          )}
        >
          <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <motion.a
                href="#"
                className="flex items-center gap-2.5 group"
                whileHover={{ scale: 1.02 }}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Image
                  src="/images/avo-logo.png"
                  alt="Avo"
                  width={36}
                  height={36}
                  className="object-contain rounded-xl"
                />
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight text-[#0b1a0f]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Avo
                </span>
              </motion.a>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="relative text-sm font-medium text-[#4a5a4f] hover:text-[#0b1a0f] transition-colors group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3e8e5a] group-hover:w-full transition-all duration-300" />
                  </motion.button>
                ))}

                <CountdownBadge />

                <motion.button
                  onClick={openPopup}
                  className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#0b1a0f] text-white rounded-full hover:bg-[#1c2e21] shadow-[0_6px_20px_-8px_rgba(11,26,15,0.4)] hover:shadow-[0_12px_30px_-10px_rgba(62,142,90,0.5)] transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.nav.getNotified}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </div>

              {/* Mobile: countdown + menu button */}
              <div className="md:hidden flex items-center gap-3">
                <CountdownBadge />
                <motion.button
                  className="p-2 text-[#0b1a0f] hover:bg-[#f0f7f1] rounded-lg transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.button>
              </div>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-[#fafaf7]/98 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="relative h-full flex flex-col justify-center px-8">
              <div className="space-y-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="block text-4xl font-bold text-[#0b1a0f] hover:text-[#3e8e5a] transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={() => { setIsOpen(false); openPopup(); }}
                className="mt-12 w-full py-4 text-center text-lg font-semibold bg-[#0b1a0f] text-white rounded-full hover:bg-[#1c2e21] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.nav.getNotified}
              </motion.button>
              <div className="absolute bottom-12 left-8 right-8 flex items-center gap-4 text-[#7a8a7f]">
                <div className="flex-1 h-px bg-[#0b1a0f]/8" />
                <span className="text-xs uppercase tracking-widest">Avo</span>
                <div className="flex-1 h-px bg-[#0b1a0f]/8" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
