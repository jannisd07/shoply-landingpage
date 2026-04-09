'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Recipe } from '@/lib/types/recipe';
import { useLanguage } from '@/contexts/LanguageContext';

interface RecipeCardProps {
    recipe: Recipe;
    variant?: 'default' | 'compact' | 'featured';
    className?: string;
    priority?: boolean;
}

export default function RecipeCard({
    recipe,
    variant = 'default',
    className,
    priority = false,
}: RecipeCardProps) {
    const { language } = useLanguage();
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    // Format time display
    const formatTime = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} ${language === 'de' ? 'Min' : 'min'}`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (mins === 0) {
            return `${hours} ${language === 'de' ? 'Std' : 'h'}`;
        }
        return `${hours}${language === 'de' ? ' Std' : 'h'} ${mins}${language === 'de' ? ' Min' : 'm'}`;
    };

    // Format rating
    const formatRating = (rating: number) => rating.toFixed(1);

    // Format view count
    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    if (variant === 'featured') {
        return (
            <Link href={`/recipes/${recipe.id}`}>
                <motion.article
                    className={cn(
                        'group relative overflow-hidden rounded-3xl',
                        'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
                        'border border-white/[0.08] hover:border-blue-500/30',
                        'transition-all duration-500',
                        className
                    )}
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                            src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                            alt={recipe.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={priority}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Labels */}
                        {recipe.labels.length > 0 && (
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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

                        {/* Featured badge */}
                        <div className="absolute top-4 right-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold
                bg-blue-500/90 text-white">
                                {language === 'de' ? 'Rezept des Tages' : 'Recipe of the Day'}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 
              group-hover:text-blue-400 transition-colors">
                            {recipe.name}
                        </h3>
                        <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                            {recipe.description}
                        </p>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5 text-zinc-400">
                                <Clock className="w-4 h-4" />
                                <span>{formatTime(totalTime)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-400">
                                <Users className="w-4 h-4" />
                                <span>{recipe.defaultServings} {language === 'de' ? 'Portionen' : 'servings'}</span>
                            </div>
                            {recipe.averageRating > 0 && (
                                <div className="flex items-center gap-1.5 text-amber-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{formatRating(recipe.averageRating)}</span>
                                    <span className="text-zinc-500">({recipe.ratingCount})</span>
                                </div>
                            )}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/[0.05]">
                            {recipe.authorAvatarUrl ? (
                                <Image
                                    src={recipe.authorAvatarUrl}
                                    alt={recipe.authorName}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <span className="text-blue-400 text-sm font-medium">
                                        {recipe.authorName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <span className="text-sm text-zinc-400">{recipe.authorName}</span>
                        </div>
                    </div>
                </motion.article>
            </Link>
        );
    }

    if (variant === 'compact') {
        return (
            <Link href={`/recipes/${recipe.id}`}>
                <motion.article
                    className={cn(
                        'group flex gap-4 p-3 rounded-xl',
                        'bg-white/[0.02] hover:bg-white/[0.05]',
                        'border border-white/[0.05] hover:border-white/[0.1]',
                        'transition-all duration-300',
                        className
                    )}
                    whileHover={{ x: 4 }}
                >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                            src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                            alt={recipe.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm line-clamp-1 
              group-hover:text-blue-400 transition-colors">
                            {recipe.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTime(totalTime)}
                            </span>
                            {recipe.averageRating > 0 && (
                                <span className="flex items-center gap-1 text-amber-400">
                                    <Star className="w-3 h-3 fill-current" />
                                    {formatRating(recipe.averageRating)}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.article>
            </Link>
        );
    }

    // Default card variant
    return (
        <Link href={`/recipes/${recipe.id}`}>
            <motion.article
                className={cn(
                    'group relative overflow-hidden rounded-2xl',
                    'bg-gradient-to-br from-white/[0.05] to-white/[0.02]',
                    'border border-white/[0.05] hover:border-blue-500/20',
                    'transition-all duration-300',
                    className
                )}
                whileHover={{ y: -4, scale: 1.01 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                        alt={recipe.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={priority}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick info on hover */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between
            opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
            transition-all duration-300">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full 
              bg-black/60 backdrop-blur-sm text-white text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            {formatTime(totalTime)}
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full 
              bg-black/60 backdrop-blur-sm text-white text-xs">
                            <Eye className="w-3.5 h-3.5" />
                            {formatViews(recipe.viewCount)}
                        </span>
                    </div>

                    {/* Labels (top left) */}
                    {recipe.labels.length > 0 && (
                        <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium
                bg-blue-500/80 backdrop-blur-sm text-white">
                                {recipe.labels[0]}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-white line-clamp-2 mb-2 
            group-hover:text-blue-400 transition-colors text-base">
                        {recipe.name}
                    </h3>

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-sm">
                        {/* Rating */}
                        {recipe.averageRating > 0 ? (
                            <div className="flex items-center gap-1.5">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={cn(
                                                'w-3.5 h-3.5',
                                                star <= Math.round(recipe.averageRating)
                                                    ? 'text-amber-400 fill-amber-400'
                                                    : 'text-zinc-600'
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="text-zinc-500 text-xs">({recipe.ratingCount})</span>
                            </div>
                        ) : (
                            <span className="text-zinc-500 text-xs">
                                {language === 'de' ? 'Noch keine Bewertung' : 'No ratings yet'}
                            </span>
                        )}

                        {/* Author initial */}
                        <div className="flex items-center gap-2">
                            {recipe.authorAvatarUrl ? (
                                <Image
                                    src={recipe.authorAvatarUrl}
                                    alt={recipe.authorName}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                    <span className="text-zinc-400 text-xs font-medium">
                                        {recipe.authorName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
