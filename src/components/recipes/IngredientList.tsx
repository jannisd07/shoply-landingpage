'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Ingredient } from '@/lib/types/recipe';

interface IngredientListProps {
    ingredients: Ingredient[];
    defaultServings: number;
    className?: string;
}

export default function IngredientList({
    ingredients,
    defaultServings,
    className,
}: IngredientListProps) {
    const { language } = useLanguage();
    const [servings, setServings] = useState(defaultServings);

    const adjustAmount = (amount: number) => {
        const multiplier = servings / defaultServings;
        const adjusted = amount * multiplier;

        // Format nicely
        if (adjusted === Math.floor(adjusted)) {
            return adjusted.toString();
        }
        // Handle common fractions
        if (Math.abs(adjusted - 0.25) < 0.01) return '¼';
        if (Math.abs(adjusted - 0.33) < 0.02) return '⅓';
        if (Math.abs(adjusted - 0.5) < 0.01) return '½';
        if (Math.abs(adjusted - 0.67) < 0.02) return '⅔';
        if (Math.abs(adjusted - 0.75) < 0.01) return '¾';

        return adjusted.toFixed(1).replace(/\.0$/, '');
    };

    const incrementServings = () => setServings(s => Math.min(s + 1, 20));
    const decrementServings = () => setServings(s => Math.max(s - 1, 1));

    return (
        <div className={cn('space-y-4', className)}>
            {/* Header with serving adjuster */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                    {language === 'de' ? 'Zutaten' : 'Ingredients'}
                </h3>

                {/* Serving adjuster */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-400">
                        {language === 'de' ? 'Portionen' : 'Servings'}
                    </span>
                    <div className="flex items-center gap-2 bg-white/[0.05] rounded-lg p-1">
                        <motion.button
                            onClick={decrementServings}
                            disabled={servings <= 1}
                            className={cn(
                                'w-8 h-8 rounded-md flex items-center justify-center',
                                'transition-colors',
                                servings <= 1
                                    ? 'text-zinc-600 cursor-not-allowed'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.1]'
                            )}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Minus className="w-4 h-4" />
                        </motion.button>

                        <span className="w-8 text-center text-white font-semibold">
                            {servings}
                        </span>

                        <motion.button
                            onClick={incrementServings}
                            disabled={servings >= 20}
                            className={cn(
                                'w-8 h-8 rounded-md flex items-center justify-center',
                                'transition-colors',
                                servings >= 20
                                    ? 'text-zinc-600 cursor-not-allowed'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.1]'
                            )}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Plus className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Ingredient list - simple display, no checkboxes */}
            <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                    >
                        {/* Amount and unit */}
                        <div className="flex items-baseline gap-1.5 min-w-[80px]">
                            <span className="font-medium text-white">
                                {adjustAmount(ingredient.amount)}
                            </span>
                            <span className="text-zinc-500 text-sm">{ingredient.unit}</span>
                        </div>

                        {/* Name */}
                        <span className="flex-1 text-zinc-300">
                            {ingredient.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
