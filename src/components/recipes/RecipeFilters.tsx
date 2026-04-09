'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { QUICK_FILTERS, type RecipeLabel } from '@/lib/types/recipe';

interface RecipeFiltersProps {
    selectedFilters: RecipeLabel[];
    onFilterChange: (filters: RecipeLabel[]) => void;
    className?: string;
}

export default function RecipeFilters({
    selectedFilters,
    onFilterChange,
    className,
}: RecipeFiltersProps) {
    const { language } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = 200;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    const toggleFilter = (filterId: RecipeLabel) => {
        if (selectedFilters.includes(filterId)) {
            onFilterChange(selectedFilters.filter(f => f !== filterId));
        } else {
            onFilterChange([...selectedFilters, filterId]);
        }
    };

    const clearFilters = () => {
        onFilterChange([]);
    };

    return (
        <div className={cn('relative', className)}>
            {/* Scroll arrows */}
            {showLeftArrow && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-8 h-8 rounded-full bg-dark-800/90 backdrop-blur-sm
            border border-white/10 flex items-center justify-center
            text-zinc-400 hover:text-white hover:border-white/20
            transition-all duration-200 shadow-lg"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
            )}
            {showRightArrow && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-8 h-8 rounded-full bg-dark-800/90 backdrop-blur-sm
            border border-white/10 flex items-center justify-center
            text-zinc-400 hover:text-white hover:border-white/20
            transition-all duration-200 shadow-lg"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}

            {/* Gradient masks */}
            {showLeftArrow && (
                <div className="absolute left-8 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-900 to-transparent z-[5] pointer-events-none" />
            )}
            {showRightArrow && (
                <div className="absolute right-8 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-900 to-transparent z-[5] pointer-events-none" />
            )}

            {/* Filter chips */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Clear all button (shown when filters are selected) */}
                {selectedFilters.length > 0 && (
                    <motion.button
                        onClick={clearFilters}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full
              bg-red-500/10 text-red-400 border border-red-500/20
              hover:bg-red-500/20 hover:border-red-500/30
              transition-all duration-200 text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <X className="w-3.5 h-3.5" />
                        {language === 'de' ? 'Alle' : 'Clear'}
                    </motion.button>
                )}

                {/* Filter buttons */}
                {QUICK_FILTERS.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id);
                    return (
                        <motion.button
                            key={filter.id}
                            onClick={() => toggleFilter(filter.id)}
                            className={cn(
                                'flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full',
                                'text-sm font-medium transition-all duration-200',
                                'border',
                                isSelected
                                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                                    : 'bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:bg-white/[0.06] hover:text-zinc-300 hover:border-white/[0.12]'
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-base">{filter.icon}</span>
                            <span>{language === 'de' ? filter.labelDe : filter.label}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
