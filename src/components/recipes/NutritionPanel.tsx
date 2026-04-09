'use client';

import { motion } from 'framer-motion';
import { Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { NutritionInfo } from '@/lib/types/recipe';

interface NutritionPanelProps {
    nutrition: NutritionInfo;
    className?: string;
}

export default function NutritionPanel({ nutrition, className }: NutritionPanelProps) {
    const { language } = useLanguage();

    const nutrients = [
        {
            label: language === 'de' ? 'Kalorien' : 'Calories',
            value: nutrition.calories,
            unit: 'kcal',
            icon: Flame,
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/10',
        },
        {
            label: language === 'de' ? 'Protein' : 'Protein',
            value: nutrition.proteinG,
            unit: 'g',
            icon: Beef,
            color: 'text-red-400',
            bgColor: 'bg-red-500/10',
        },
        {
            label: language === 'de' ? 'Kohlenhydrate' : 'Carbs',
            value: nutrition.carbsG,
            unit: 'g',
            icon: Wheat,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10',
        },
        {
            label: language === 'de' ? 'Fett' : 'Fat',
            value: nutrition.fatG,
            unit: 'g',
            icon: Droplets,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
        },
    ];

    // Check if we have any nutrition data
    const hasData = nutrients.some(n => n.value !== undefined && n.value !== null);

    if (!hasData) {
        return null;
    }

    return (
        <div className={cn('space-y-4', className)}>
            <h3 className="text-lg font-semibold text-white">
                {language === 'de' ? 'Nährwerte pro Portion' : 'Nutrition per serving'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {nutrients.map((nutrient, index) => (
                    nutrient.value !== undefined && nutrient.value !== null && (
                        <motion.div
                            key={nutrient.label}
                            className={cn(
                                'p-4 rounded-xl text-center',
                                'bg-white/[0.03] border border-white/[0.05]'
                            )}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className={cn(
                                'w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center',
                                nutrient.bgColor
                            )}>
                                <nutrient.icon className={cn('w-5 h-5', nutrient.color)} />
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {typeof nutrient.value === 'number'
                                    ? Math.round(nutrient.value)
                                    : nutrient.value}
                            </div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wide">
                                {nutrient.unit}
                            </div>
                            <div className="text-sm text-zinc-400 mt-1">
                                {nutrient.label}
                            </div>
                        </motion.div>
                    )
                ))}
            </div>

            {/* Additional nutrients */}
            {(nutrition.fiberG || nutrition.sugarG) && (
                <div className="flex flex-wrap gap-4 pt-2 border-t border-white/[0.05]">
                    {nutrition.fiberG && (
                        <div className="text-sm">
                            <span className="text-zinc-500">{language === 'de' ? 'Ballaststoffe' : 'Fiber'}:</span>
                            <span className="text-zinc-300 ml-2">{nutrition.fiberG}g</span>
                        </div>
                    )}
                    {nutrition.sugarG && (
                        <div className="text-sm">
                            <span className="text-zinc-500">{language === 'de' ? 'Zucker' : 'Sugar'}:</span>
                            <span className="text-zinc-300 ml-2">{nutrition.sugarG}g</span>
                        </div>
                    )}
                    {nutrition.sodiumMg && (
                        <div className="text-sm">
                            <span className="text-zinc-500">{language === 'de' ? 'Natrium' : 'Sodium'}:</span>
                            <span className="text-zinc-300 ml-2">{nutrition.sodiumMg}mg</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
