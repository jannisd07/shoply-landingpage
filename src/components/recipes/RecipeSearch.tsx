'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface RecipeSearchProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    className?: string;
    autoFocus?: boolean;
}

export default function RecipeSearch({
    value,
    onChange,
    onSubmit,
    placeholder,
    className,
    autoFocus = false,
}: RecipeSearchProps) {
    const { language } = useLanguage();
    const [isFocused, setIsFocused] = useState(false);

    const defaultPlaceholder = language === 'de'
        ? 'Rezepte suchen...'
        : 'Search recipes...';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(value);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <form onSubmit={handleSubmit} className={cn('relative', className)}>
            <motion.div
                className={cn(
                    'relative flex items-center',
                    'rounded-xl overflow-hidden',
                    'bg-white/[0.05] border',
                    'transition-all duration-300',
                    isFocused
                        ? 'border-blue-500/50 bg-white/[0.08]'
                        : 'border-white/[0.1] hover:border-white/[0.15]'
                )}
                animate={{
                    boxShadow: isFocused
                        ? '0 0 20px rgba(59, 130, 246, 0.15)'
                        : '0 0 0px rgba(59, 130, 246, 0)',
                }}
            >
                <Search className={cn(
                    'w-5 h-5 ml-4 flex-shrink-0 transition-colors',
                    isFocused ? 'text-blue-400' : 'text-zinc-500'
                )} />

                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder || defaultPlaceholder}
                    autoFocus={autoFocus}
                    className={cn(
                        'flex-1 bg-transparent py-3 px-3 text-white',
                        'placeholder:text-zinc-500',
                        'focus:outline-none',
                        'text-base'
                    )}
                />

                {/* Clear button */}
                {value && (
                    <motion.button
                        type="button"
                        onClick={handleClear}
                        className="p-2 mr-2 rounded-lg hover:bg-white/[0.1] text-zinc-400 
              hover:text-white transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <X className="w-4 h-4" />
                    </motion.button>
                )}

                {/* Search button for mobile */}
                <button
                    type="submit"
                    className={cn(
                        'px-4 py-2 mr-1 rounded-lg font-medium text-sm',
                        'bg-blue-500/20 text-blue-400',
                        'hover:bg-blue-500/30 transition-colors',
                        'sm:hidden'
                    )}
                >
                    <Search className="w-4 h-4" />
                </button>
            </motion.div>
        </form>
    );
}
