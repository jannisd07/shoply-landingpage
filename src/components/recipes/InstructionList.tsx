'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface InstructionListProps {
    instructions: string[];
    className?: string;
}

export default function InstructionList({
    instructions,
    className,
}: InstructionListProps) {
    const { language } = useLanguage();
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const toggleStep = (index: number) => {
        const newCompleted = new Set(completedSteps);
        if (newCompleted.has(index)) {
            newCompleted.delete(index);
        } else {
            newCompleted.add(index);
        }
        setCompletedSteps(newCompleted);
    };

    return (
        <div className={cn('space-y-4', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                    {language === 'de' ? 'Zubereitung' : 'Instructions'}
                </h3>
                <span className="text-sm text-zinc-500">
                    {completedSteps.size}/{instructions.length} {language === 'de' ? 'Schritte' : 'steps'}
                </span>
            </div>

            {/* Steps */}
            <ol className="space-y-4">
                {instructions.map((instruction, index) => {
                    const isCompleted = completedSteps.has(index);
                    return (
                        <motion.li
                            key={index}
                            className={cn(
                                'flex gap-4 p-4 rounded-xl cursor-pointer',
                                'transition-all duration-200',
                                isCompleted
                                    ? 'bg-blue-500/10 border border-blue-500/20'
                                    : 'bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05]'
                            )}
                            onClick={() => toggleStep(index)}
                            whileTap={{ scale: 0.99 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {/* Step number / check */}
                            <div
                                className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                                    'font-semibold text-sm transition-all duration-200',
                                    isCompleted
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/[0.1] text-zinc-400'
                                )}
                            >
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <Check className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    index + 1
                                )}
                            </div>

                            {/* Instruction text */}
                            <p className={cn(
                                'flex-1 leading-relaxed pt-1',
                                isCompleted ? 'text-zinc-500' : 'text-zinc-300'
                            )}>
                                {instruction}
                            </p>
                        </motion.li>
                    );
                })}
            </ol>

            {/* Completion message */}
            {completedSteps.size === instructions.length && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl 
            bg-blue-500/10 border border-blue-500/20 text-blue-400"
                >
                    <span className="text-2xl">🎉</span>
                    <span className="font-medium">
                        {language === 'de' ? 'Fertig! Guten Appetit!' : 'Done! Enjoy your meal!'}
                    </span>
                </motion.div>
            )}
        </div>
    );
}
