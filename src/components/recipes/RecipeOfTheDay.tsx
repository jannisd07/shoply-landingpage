'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, ChefHat, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Recipe } from '@/lib/types/recipe';

interface RecipeOfTheDayProps {
    recipe: Recipe;
    className?: string;
}

export default function RecipeOfTheDay({ recipe, className }: RecipeOfTheDayProps) {
    const { language } = useLanguage();
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    const formatTime = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} ${language === 'de' ? 'Min' : 'min'}`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (mins === 0) {
            return `${hours} ${language === 'de' ? 'Std' : 'h'}`;
        }
        return `${hours}${language === 'de' ? ' Std' : 'h'} ${mins}`;
    };

    return (
        <Link href={`/recipes/${recipe.id}`}>
            <motion.section
                className={cn(
                    'relative overflow-hidden rounded-3xl',
                    'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
                    'border border-white/[0.08]',
                    'group cursor-pointer',
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
            >
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] overflow-hidden">
                        <Image
                            src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                            alt={recipe.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-900/80 
              hidden md:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent 
              md:hidden" />

                        {/* Badge */}
                        <div className="absolute top-4 left-4 md:top-6 md:left-6">
                            <motion.div
                                className="flex items-center gap-2 px-4 py-2 rounded-full
                  bg-blue-500 text-white font-semibold text-sm shadow-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <ChefHat className="w-4 h-4" />
                                {language === 'de' ? 'Rezept des Tages' : 'Recipe of the Day'}
                            </motion.div>
                        </div>

                        {/* Labels */}
                        {recipe.labels.length > 0 && (
                            <div className="absolute bottom-4 left-4 md:hidden flex flex-wrap gap-2">
                                {recipe.labels.slice(0, 3).map((label) => (
                                    <span
                                        key={label}
                                        className="px-3 py-1 rounded-full text-xs font-medium 
                      bg-black/60 backdrop-blur-sm text-white border border-white/10"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="relative p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                        {/* Desktop labels */}
                        {recipe.labels.length > 0 && (
                            <div className="hidden md:flex flex-wrap gap-2 mb-4">
                                {recipe.labels.slice(0, 4).map((label) => (
                                    <span
                                        key={label}
                                        className="px-3 py-1 rounded-full text-xs font-medium 
                      bg-white/[0.05] text-zinc-300 border border-white/[0.1]"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3
              group-hover:text-blue-400 transition-colors line-clamp-2">
                            {recipe.name}
                        </h2>

                        {/* Description */}
                        <p className="text-zinc-400 text-base md:text-lg line-clamp-2 md:line-clamp-3 mb-6">
                            {recipe.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
                            <div className="flex items-center gap-2 text-zinc-300">
                                <Clock className="w-5 h-5 text-blue-400" />
                                <span>{formatTime(totalTime)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-300">
                                <Users className="w-5 h-5 text-blue-400" />
                                <span>{recipe.defaultServings} {language === 'de' ? 'Portionen' : 'servings'}</span>
                            </div>
                            {recipe.averageRating > 0 && (
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="font-semibold">{recipe.averageRating.toFixed(1)}</span>
                                    <span className="text-zinc-500">({recipe.ratingCount})</span>
                                </div>
                            )}
                        </div>

                        {/* Author & CTA */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {recipe.authorAvatarUrl ? (
                                    <Image
                                        src={recipe.authorAvatarUrl}
                                        alt={recipe.authorName}
                                        width={40}
                                        height={40}
                                        className="rounded-full ring-2 ring-white/10"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 
                    flex items-center justify-center ring-2 ring-white/10">
                                        <span className="text-blue-400 font-semibold">
                                            {recipe.authorName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-zinc-500">
                                        {language === 'de' ? 'von' : 'by'}
                                    </p>
                                    <p className="text-white font-medium">{recipe.authorName}</p>
                                </div>
                            </div>

                            <motion.div
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-blue-500/10 text-blue-400 font-medium
                  group-hover:bg-blue-500/20 transition-colors"
                                whileHover={{ x: 4 }}
                            >
                                {language === 'de' ? 'Rezept ansehen' : 'View Recipe'}
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </Link>
    );
}
