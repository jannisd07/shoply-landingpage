'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ChevronLeft, ChevronRight, Check, Clock, Play, Pause, RotateCcw,
    Volume2, VolumeX, ChefHat, ShoppingBasket
} from 'lucide-react';
import type { Ingredient } from '@/lib/types/recipe';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Instruction {
    stepNumber: number;
    text: string;
    timerMinutes?: number;
}

interface CookingModeProps {
    recipeName: string;
    ingredients?: Ingredient[];
    instructions: Instruction[];
    onClose: () => void;
}

export function CookingMode({ recipeName, ingredients = [], instructions, onClose }: CookingModeProps) {
    const { language } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
    const [timerActive, setTimerActive] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);

    const toggleIngredient = (index: number) => {
        setCheckedIngredients(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    // Total steps = 1 (ingredients) + instructions.length
    const totalSteps = instructions.length + 1;
    const isIngredientsStep = currentStep === 0;
    const currentInstruction = isIngredientsStep ? null : instructions[currentStep - 1];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds((prev) => {
                    if (prev <= 1) {
                        setTimerActive(false);
                        // Play alarm sound
                        if (!isMuted) {
                            try {
                                const audio = new Audio('/sounds/timer-complete.mp3');
                                audio.play().catch(() => { });
                            } catch { }
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, timerSeconds, isMuted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartTimer = () => {
        if (currentInstruction.timerMinutes) {
            setTimerSeconds(currentInstruction.timerMinutes * 60);
            setTimerActive(true);
        }
    };

    const handlePauseTimer = () => {
        setTimerActive(false);
    };

    const handleResetTimer = () => {
        setTimerActive(false);
        if (currentInstruction.timerMinutes) {
            setTimerSeconds(currentInstruction.timerMinutes * 60);
        }
    };

    const handlePrevStep = () => {
        if (!isFirstStep) {
            setCurrentStep((prev) => prev - 1);
            setTimerActive(false);
            setTimerSeconds(0);
        }
    };

    const handleNextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
            setTimerActive(false);
            setTimerSeconds(0);
        }
    };

    const handleMarkComplete = () => {
        setCompletedSteps((prev) => new Set([...prev, currentStep]));
        if (!isLastStep) {
            handleNextStep();
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevStep();
            if (e.key === 'ArrowRight') handleNextStep();
            if (e.key === ' ') {
                e.preventDefault();
                handleMarkComplete();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentStep]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950 flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <ChefHat className="w-6 h-6 text-blue-400" />
                    <div>
                        <p className="text-zinc-400 text-sm">
                            {language === 'de' ? 'Kochmodus' : 'Cooking Mode'}
                        </p>
                        <h2 className="text-white font-semibold">{recipeName}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Ingredients toggle button */}
                    {ingredients.length > 0 && (
                        <button
                            onClick={() => setShowIngredients(!showIngredients)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                                showIngredients 
                                    ? "bg-blue-500/20 text-blue-400" 
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <ShoppingBasket className="w-5 h-5" />
                            <span className="text-sm hidden sm:inline">
                                {checkedIngredients.size}/{ingredients.length}
                            </span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Ingredients Panel (slide in from right) */}
            <AnimatePresence>
                {showIngredients && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-zinc-900 border-l border-white/10 z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <ShoppingBasket className="w-5 h-5 text-blue-400" />
                                {language === 'de' ? 'Zutaten' : 'Ingredients'}
                            </h3>
                            <button
                                onClick={() => setShowIngredients(false)}
                                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {ingredients.map((ingredient, index) => {
                                const isChecked = checkedIngredients.has(index);
                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => toggleIngredient(index)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                                            isChecked
                                                ? "bg-blue-500/10 border border-blue-500/20"
                                                : "bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05]"
                                        )}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0",
                                            isChecked ? "bg-blue-500 border-blue-500" : "border-zinc-600"
                                        )}>
                                            {isChecked && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div className="flex items-baseline gap-1.5 min-w-[60px]">
                                            <span className={cn("font-medium", isChecked ? "text-blue-400" : "text-white")}>
                                                {ingredient.amount}
                                            </span>
                                            <span className="text-zinc-500 text-sm">{ingredient.unit}</span>
                                        </div>
                                        <span className={cn("flex-1", isChecked ? "text-zinc-500 line-through" : "text-zinc-300")}>
                                            {ingredient.name}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                        <div className="p-4 border-t border-white/10">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-zinc-400">{language === 'de' ? 'Fortschritt' : 'Progress'}</span>
                                <span className="text-white font-medium">{checkedIngredients.size}/{ingredients.length}</span>
                            </div>
                            <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-500 rounded-full"
                                    animate={{ width: `${(checkedIngredients.size / ingredients.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress bar */}
            <div className="h-1 bg-white/5">
                <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {isIngredientsStep ? (
                        /* Ingredients Step (Step 0) */
                        <motion.div
                            key="ingredients"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-6 max-w-2xl mx-auto"
                        >
                            <div className="text-center mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                                    <ShoppingBasket className="w-4 h-4" />
                                    {language === 'de' ? 'Zutaten' : 'Ingredients'}
                                </span>
                            </div>
                            
                            <p className="text-zinc-400 text-center mb-4">
                                {language === 'de' 
                                    ? 'Hake die Zutaten ab, die du bereit hast'
                                    : 'Check off ingredients as you prepare them'}
                            </p>

                            {/* Add All Button */}
                            <div className="flex justify-center mb-4">
                                <motion.button
                                    onClick={() => {
                                        const allIndices = new Set(ingredients.map((_, i) => i));
                                        setCheckedIngredients(allIndices);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Check className="w-4 h-4" />
                                    {language === 'de' ? 'Alle hinzufügen' : 'Add all'}
                                </motion.button>
                            </div>

                            <div className="space-y-2">
                                {ingredients.map((ingredient, index) => {
                                    const isChecked = checkedIngredients.has(index);
                                    return (
                                        <motion.button
                                            key={index}
                                            onClick={() => toggleIngredient(index)}
                                            className={cn(
                                                "w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all",
                                                isChecked
                                                    ? "bg-blue-500/10 border border-blue-500/20"
                                                    : "bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05]"
                                            )}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0",
                                                isChecked ? "bg-blue-500 border-blue-500" : "border-zinc-600"
                                            )}>
                                                {isChecked && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                            <div className="flex items-baseline gap-2 min-w-[80px]">
                                                <span className={cn("font-semibold text-lg", isChecked ? "text-blue-400" : "text-white")}>
                                                    {ingredient.amount}
                                                </span>
                                                <span className="text-zinc-500">{ingredient.unit}</span>
                                            </div>
                                            <span className={cn("flex-1 text-lg", isChecked ? "text-zinc-500 line-through" : "text-zinc-300")}>
                                                {ingredient.name}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Progress */}
                            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-zinc-400">{language === 'de' ? 'Fortschritt' : 'Progress'}</span>
                                    <span className="text-white font-medium">{checkedIngredients.size}/{ingredients.length}</span>
                                </div>
                                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500 rounded-full"
                                        animate={{ width: `${(checkedIngredients.size / Math.max(ingredients.length, 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* Cooking Steps (Step 1+) */
                        <motion.div
                            key={`step-${currentStep}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex items-center justify-center p-6"
                        >
                            <div className="max-w-2xl w-full">
                                {/* Step indicator */}
                                <div className="text-center mb-8">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                                        {language === 'de' ? 'Schritt' : 'Step'} {currentStep} / {instructions.length}
                                        {completedSteps.has(currentStep) && (
                                            <Check className="w-4 h-4" />
                                        )}
                                    </span>

                                    {/* Instruction text */}
                                    <p className="text-3xl md:text-4xl text-white leading-relaxed text-center">
                                        {currentInstruction?.text}
                                    </p>
                                </div>

                                {/* Timer */}
                                {currentInstruction?.timerMinutes && (
                                    <div className="text-center mb-8">
                                        <div className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Clock className="w-5 h-5" />
                                                Timer
                                            </div>
                                            <div className={cn(
                                                'text-5xl font-mono font-bold',
                                                timerSeconds === 0 ? 'text-blue-400' : 'text-white'
                                            )}>
                                                {formatTime(timerSeconds || currentInstruction.timerMinutes * 60)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {!timerActive ? (
                                                    <motion.button
                                                        onClick={handleStartTimer}
                                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Play className="w-5 h-5" />
                                                        Start
                                                    </motion.button>
                                                ) : (
                                                    <motion.button
                                                        onClick={handlePauseTimer}
                                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Pause className="w-5 h-5" />
                                                        Pause
                                                    </motion.button>
                                                )}
                                                <motion.button
                                                    onClick={handleResetTimer}
                                                    className="p-3 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <RotateCcw className="w-5 h-5" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-white/10">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <motion.button
                        onClick={handlePrevStep}
                        disabled={isFirstStep}
                        className={cn(
                            'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                            isFirstStep
                                ? 'opacity-30 cursor-not-allowed text-zinc-500'
                                : 'bg-white/5 text-white hover:bg-white/10'
                        )}
                        whileHover={!isFirstStep ? { scale: 1.02 } : {}}
                        whileTap={!isFirstStep ? { scale: 0.98 } : {}}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        {language === 'de' ? 'Zurück' : 'Previous'}
                    </motion.button>

                    <motion.button
                        onClick={isLastStep ? onClose : handleNextStep}
                        disabled={false}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLastStep ? (
                            <>
                                <Check className="w-5 h-5" />
                                {language === 'de' ? 'Fertig!' : 'Done!'}
                            </>
                        ) : (
                            <>
                                {language === 'de' ? 'Weiter' : 'Next'}
                                <ChevronRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Step dots - includes ingredients step (0) + cooking steps */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentStep(index)}
                            className={cn(
                                'w-3 h-3 rounded-full transition-all',
                                index === currentStep
                                    ? 'bg-blue-500 scale-125'
                                    : completedSteps.has(index)
                                        ? 'bg-blue-500/50'
                                        : 'bg-white/20 hover:bg-white/30'
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Keyboard hints */}
            <div className="hidden md:flex items-center justify-center gap-6 py-2 text-xs text-zinc-600">
                <span>← → {language === 'de' ? 'Navigation' : 'Navigate'}</span>
                <span>Space {language === 'de' ? 'Fertig' : 'Complete'}</span>
                <span>Esc {language === 'de' ? 'Schließen' : 'Close'}</span>
            </div>
        </motion.div>
    );
}
