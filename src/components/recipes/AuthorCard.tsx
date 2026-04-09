'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChefHat, Eye, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthorCardProps {
    authorId: string;
    authorName: string;
    authorAvatarUrl?: string;
    recipeCount?: number;
    totalViews?: number;
    averageRating?: number;
    variant?: 'default' | 'compact';
    className?: string;
}

export default function AuthorCard({
    authorId,
    authorName,
    authorAvatarUrl,
    recipeCount,
    totalViews,
    averageRating,
    variant = 'default',
    className,
}: AuthorCardProps) {
    const { language } = useLanguage();

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    if (variant === 'compact') {
        return (
            <Link href={`/recipes/author/${authorId}`}>
                <motion.div
                    className={cn(
                        'flex items-center gap-3 p-3 rounded-xl',
                        'bg-white/[0.03] border border-white/[0.05]',
                        'hover:bg-white/[0.05] hover:border-white/[0.1]',
                        'transition-all duration-200 group',
                        className
                    )}
                    whileHover={{ x: 2 }}
                >
                    {/* Avatar */}
                    {authorAvatarUrl ? (
                        <Image
                            src={authorAvatarUrl}
                            alt={authorName}
                            width={40}
                            height={40}
                            className="rounded-full ring-2 ring-white/10"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 
              flex items-center justify-center ring-2 ring-white/10">
                            <span className="text-blue-400 font-semibold">
                                {authorName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                            {authorName}
                        </p>
                        {recipeCount && (
                            <p className="text-sm text-zinc-500">
                                {recipeCount} {language === 'de' ? 'Rezepte' : 'recipes'}
                            </p>
                        )}
                    </div>

                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 
            opacity-0 group-hover:opacity-100 transition-all" />
                </motion.div>
            </Link>
        );
    }

    return (
        <Link href={`/recipes/author/${authorId}`}>
            <motion.div
                className={cn(
                    'p-6 rounded-2xl',
                    'bg-gradient-to-br from-white/[0.05] to-white/[0.02]',
                    'border border-white/[0.08] hover:border-blue-500/30',
                    'transition-all duration-300 group',
                    className
                )}
                whileHover={{ y: -2 }}
            >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    {/* Avatar */}
                    {authorAvatarUrl ? (
                        <Image
                            src={authorAvatarUrl}
                            alt={authorName}
                            width={64}
                            height={64}
                            className="rounded-full ring-2 ring-white/10"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30 
              flex items-center justify-center ring-2 ring-white/10">
                            <span className="text-blue-400 text-2xl font-bold">
                                {authorName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}

                    <div>
                        <p className="text-sm text-zinc-500 mb-1">
                            {language === 'de' ? 'Erstellt von' : 'Created by'}
                        </p>
                        <h4 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {authorName}
                        </h4>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
                    {recipeCount !== undefined && (
                        <div className="flex items-center gap-2">
                            <ChefHat className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-zinc-400">
                                {recipeCount} {language === 'de' ? 'Rezepte' : 'recipes'}
                            </span>
                        </div>
                    )}
                    {totalViews !== undefined && (
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-zinc-400">
                                {formatNumber(totalViews)} {language === 'de' ? 'Aufrufe' : 'views'}
                            </span>
                        </div>
                    )}
                    {averageRating !== undefined && averageRating > 0 && (
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm text-zinc-400">
                                {averageRating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <motion.div
                    className="mt-4 flex items-center justify-center gap-2 py-2 rounded-lg
            bg-blue-500/10 text-blue-400 text-sm font-medium
            opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {language === 'de' ? 'Profil ansehen' : 'View Profile'}
                    <ArrowRight className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </Link>
    );
}
