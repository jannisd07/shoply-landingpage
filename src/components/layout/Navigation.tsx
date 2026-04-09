'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChefHat } from 'lucide-react';
import Link from 'next/link';
import { useScrollPosition } from '@/hooks';
import { smoothScrollTo } from '@/lib/gsap-config';
import { cn } from '@/lib/utils';
import { useEmailPopup } from '@/contexts/EmailPopupContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { y } = useScrollPosition();
  const { openPopup } = useEmailPopup();
  const { t, language } = useLanguage();

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
    if (element) {
      smoothScrollTo(element, 1);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-zinc-800/50'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - Bold typography */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50" style={{ fontFamily: 'var(--font-display)' }}>
                Shoply<span className="text-blue-500">AI</span>
              </span>
            </motion.a>

            {/* Desktop Navigation - Asymmetric spacing */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}

              {/* Recipes Link */}
              <Link href="/recipes">
                <motion.span
                  className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <ChefHat className="w-4 h-4" />
                  {language === 'de' ? 'Rezepte' : 'Recipes'}
                </motion.span>
              </Link>

              {/* CTA Button - Accent color */}
              <motion.button
                onClick={openPopup}
                className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
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

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-zinc-50 hover:bg-zinc-800/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-[#0a0a0f]/98 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-8">
              <div className="space-y-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="block text-4xl font-bold text-zinc-50 hover:text-blue-500 transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Recipes Link - Mobile */}
                <Link href="/recipes" onClick={() => setIsOpen(false)}>
                  <motion.span
                    className="flex items-center gap-2 text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors py-2"
                    whileHover={{ x: 4 }}
                  >
                    <ChefHat className="w-5 h-5" />
                    {language === 'de' ? 'Rezepte' : 'Recipes'}
                  </motion.span>
                </Link>
              </div>
              
              <motion.button
                onClick={() => { setIsOpen(false); openPopup(); }}
                className="mt-12 w-full py-4 text-center text-lg font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.nav.getNotified}
              </motion.button>
              
              {/* Decorative element */}
              <div className="absolute bottom-12 left-8 right-8 flex items-center gap-4 text-zinc-600">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-xs uppercase tracking-widest">Shoply<span className="text-blue-500">AI</span></span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
