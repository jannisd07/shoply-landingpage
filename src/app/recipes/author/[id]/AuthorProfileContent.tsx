'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Eye, ChefHat, Users, Calendar, UserPlus, UserMinus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { RecipeGrid } from '@/components/recipes';
import type { Recipe } from '@/lib/types/recipe';

interface Author {
    id: string;
    displayName: string;
    avatarUrl?: string;
    bio?: string;
    recipeCount: number;
    totalViews: number;
    averageRating: number;
    followerCount: number;
    joinedAt: Date;
    recipes: Recipe[];
}

interface AuthorProfileContentProps {
    author: Author;
}

export default function AuthorProfileContent({ author }: AuthorProfileContentProps) {
    const { language } = useLanguage();
    const [isFollowing, setIsFollowing] = useState(false);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-US', {
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // TODO: API call
    };

    return (
        <div className="min-h-screen pb-16">
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-8">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/recipes"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {language === 'de' ? 'Zurück zu Rezepte' : 'Back to Recipes'}
                    </Link>

                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                        {/* Avatar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-shrink-0"
                        >
                            {author.avatarUrl ? (
                                <Image
                                    src={author.avatarUrl}
                                    alt={author.displayName}
                                    width={160}
                                    height={160}
                                    className="rounded-3xl ring-4 ring-white/10"
                                />
                            ) : (
                                <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 
                  flex items-center justify-center ring-4 ring-white/10">
                                    <span className="text-blue-400 text-6xl font-bold">
                                        {author.displayName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1">
                            <motion.h1
                                className="text-3xl md:text-4xl font-bold text-white mb-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {author.displayName}
                            </motion.h1>

                            {author.bio && (
                                <motion.p
                                    className="text-zinc-400 text-lg mb-4 max-w-2xl"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {author.bio}
                                </motion.p>
                            )}

                            {/* Stats */}
                            <motion.div
                                className="flex flex-wrap gap-6 mb-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-2">
                                    <ChefHat className="w-5 h-5 text-blue-400" />
                                    <span className="text-white font-semibold">{author.recipeCount}</span>
                                    <span className="text-zinc-500">{language === 'de' ? 'Rezepte' : 'recipes'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-blue-400" />
                                    <span className="text-white font-semibold">{formatNumber(author.totalViews)}</span>
                                    <span className="text-zinc-500">{language === 'de' ? 'Aufrufe' : 'views'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    <span className="text-white font-semibold">{author.averageRating.toFixed(1)}</span>
                                    <span className="text-zinc-500">{language === 'de' ? 'Bewertung' : 'rating'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-400" />
                                    <span className="text-white font-semibold">{formatNumber(author.followerCount)}</span>
                                    <span className="text-zinc-500">{language === 'de' ? 'Follower' : 'followers'}</span>
                                </div>
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.button
                                    onClick={handleFollow}
                                    className={cn(
                                        'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold',
                                        'transition-all duration-200',
                                        isFollowing
                                            ? 'bg-white/10 text-white border border-white/20 hover:bg-white/5'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isFollowing ? (
                                        <>
                                            <UserMinus className="w-5 h-5" />
                                            {language === 'de' ? 'Entfolgen' : 'Unfollow'}
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-5 h-5" />
                                            {language === 'de' ? 'Folgen' : 'Follow'}
                                        </>
                                    )}
                                </motion.button>

                                <div className="flex items-center gap-2 text-sm text-zinc-500">
                                    <Calendar className="w-4 h-4" />
                                    {language === 'de' ? 'Dabei seit' : 'Joined'} {formatDate(author.joinedAt)}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipes */}
            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        {language === 'de' ? 'Rezepte' : 'Recipes'}
                        <span className="text-zinc-500 font-normal ml-2">({author.recipes.length})</span>
                    </h2>

                    <RecipeGrid
                        recipes={author.recipes}
                        columns={3}
                        emptyMessage={
                            language === 'de'
                                ? 'Noch keine Rezepte veröffentlicht.'
                                : 'No recipes published yet.'
                        }
                    />
                </div>
            </section>
        </div>
    );
}
