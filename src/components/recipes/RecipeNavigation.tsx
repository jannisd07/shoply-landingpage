'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, BookmarkIcon, PlusCircle, User, ChefHat, LogIn } from 'lucide-react';
import { useScrollPosition } from '@/hooks';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function RecipeNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { y } = useScrollPosition();
    const { language, t } = useLanguage();
    const { user, isLoading: authLoading } = useAuth();
    const pathname = usePathname();

    const navItems = [
        {
            label: language === 'de' ? 'Entdecken' : 'Discover',
            href: '/recipes',
            icon: Home,
        },
        {
            label: language === 'de' ? 'Gespeichert' : 'Saved',
            href: '/recipes/saved',
            icon: BookmarkIcon,
        },
        {
            label: language === 'de' ? 'Erstellen' : 'Create',
            href: '/recipes/create',
            icon: PlusCircle,
        },
    ];

    useEffect(() => {
        setIsScrolled(y > 20);
    }, [y]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-dark-900/95 backdrop-blur-xl border-b border-white/[0.08]'
                        : 'bg-transparent'
                )}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/recipes" className="flex items-center gap-2">
                            <motion.div
                                className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 
                  flex items-center justify-center"
                                whileHover={{ scale: 1.05, rotate: -5 }}
                            >
                                <ChefHat className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-bold text-white">
                                Avo <span className="text-blue-400">Recipes</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/recipes' && pathname?.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
                                            'transition-all duration-200',
                                            isActive
                                                ? 'text-blue-400 bg-blue-500/10'
                                                : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                                        )}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <LanguageToggle />

                            {/* User menu / Login */}
                            {!authLoading && (
                                user ? (
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg
                                            text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <span className="text-sm font-medium text-blue-400">
                                                {(user.user_metadata?.display_name || user.email || 'U').charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="hidden sm:inline">
                                            {user.user_metadata?.display_name || user.email?.split('@')[0]}
                                        </span>
                                    </Link>
                                ) : (
                                    <Link
                                        href="/auth/login"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg
                                            bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span className="hidden sm:inline">
                                            {language === 'de' ? 'Anmelden' : 'Sign In'}
                                        </span>
                                    </Link>
                                )
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 rounded-lg text-zinc-400 
                  hover:text-white hover:bg-white/[0.05] transition-colors"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-dark-900/98 backdrop-blur-xl border-t border-white/[0.05]"
                        >
                            <div className="px-4 py-4 space-y-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium',
                                                'transition-all duration-200',
                                                isActive
                                                    ? 'text-blue-400 bg-blue-500/10'
                                                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}

                                <div className="pt-3 mt-3 border-t border-white/[0.05]">
                                    {user ? (
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl
                                                text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                                        >
                                            <User className="w-5 h-5" />
                                            {language === 'de' ? 'Mein Profil' : 'My Profile'}
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/auth/login"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl
                                                text-blue-400 hover:bg-blue-500/10 transition-colors"
                                        >
                                            <LogIn className="w-5 h-5" />
                                            {language === 'de' ? 'Anmelden' : 'Sign In'}
                                        </Link>
                                    )}
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl
                                            text-zinc-500 hover:text-zinc-300 transition-colors"
                                    >
                                        <Home className="w-5 h-5" />
                                        {language === 'de' ? 'Zurück zur Hauptseite' : 'Back to Main Site'}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Spacer for fixed header */}
            <div className="h-16" />
        </>
    );
}
