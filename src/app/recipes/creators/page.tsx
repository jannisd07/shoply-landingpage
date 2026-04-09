'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Star, ChefHat, Eye, Users, Crown, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase/client';

interface Creator {
    id: string;
    displayName: string;
    avatarUrl?: string;
    recipeCount: number;
    totalViews: number;
    averageRating: number;
    followerCount: number;
}

const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1:
            return <Crown className="w-6 h-6 text-amber-400" />;
        case 2:
            return <Medal className="w-6 h-6 text-zinc-300" />;
        case 3:
            return <Award className="w-6 h-6 text-amber-600" />;
        default:
            return <span className="w-6 h-6 flex items-center justify-center text-zinc-500 font-bold">{rank}</span>;
    }
};

const getRankBackground = (rank: number) => {
    switch (rank) {
        case 1:
            return 'bg-gradient-to-br from-amber-500/20 via-amber-400/10 to-yellow-500/20 border-amber-500/30';
        case 2:
            return 'bg-gradient-to-br from-zinc-400/20 via-zinc-300/10 to-zinc-400/20 border-zinc-400/30';
        case 3:
            return 'bg-gradient-to-br from-amber-700/20 via-amber-600/10 to-orange-700/20 border-amber-600/30';
        default:
            return 'bg-white/[0.03] border-white/[0.05]';
    }
};

export default function TopCreatorsPage() {
    const { language } = useLanguage();
    const [followedIds, setFollowedIds] = useState<Set<string>>(new Set());
    const [topCreators, setTopCreators] = useState<Creator[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Helper to get display name (never show email)
    const getDisplayName = (authorName: string | null | undefined, authorId?: string): string => {
        if (!authorName) {
            const randomNum = authorId 
                ? parseInt(authorId.replace(/[^0-9]/g, '').slice(0, 4)) || Math.floor(Math.random() * 9000) + 1000
                : Math.floor(Math.random() * 9000) + 1000;
            return `User${randomNum}`;
        }
        if (authorName.includes('@')) {
            const hash = authorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const num = (hash % 9000) + 1000;
            return `User${num}`;
        }
        return authorName;
    };

    // Fetch top creators from database
    useEffect(() => {
        async function fetchTopCreators() {
            setIsLoading(true);
            try {
                // Get recipes grouped by author - only select columns that exist
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data, error } = await (supabase.from('recipes') as any).select('author_id, author_name, author_avatar_url, view_count');

                if (error) throw error;

                // Aggregate by author
                const authorMap = new Map<string, Creator>();
                
                type RecipeData = { author_id: string; author_name: string | null; author_avatar_url: string | null; view_count: number | null };

                for (const recipe of (data as RecipeData[]) || []) {
                    const existing = authorMap.get(recipe.author_id);
                    if (existing) {
                        existing.recipeCount++;
                        existing.totalViews += recipe.view_count || 0;
                    } else {
                        authorMap.set(recipe.author_id, {
                            id: recipe.author_id,
                            displayName: getDisplayName(recipe.author_name, recipe.author_id),
                            avatarUrl: recipe.author_avatar_url || undefined,
                            recipeCount: 1,
                            totalViews: recipe.view_count || 0,
                            averageRating: 0,
                            followerCount: 0,
                        });
                    }
                }

                // Sort by total views and take top 20
                const creators = Array.from(authorMap.values())
                    .sort((a, b) => b.totalViews - a.totalViews)
                    .slice(0, 20);

                setTopCreators(creators);
            } catch (error) {
                console.error('Error fetching creators:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTopCreators();
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const toggleFollow = (id: string) => {
        setFollowedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="min-h-screen pb-16">
            <section className="px-4 sm:px-6 lg:px-8 pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/recipes"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {language === 'de' ? 'Zurück' : 'Back'}
                        </Link>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Trophy className="w-8 h-8 text-amber-400" />
                            {language === 'de' ? 'Top Köche' : 'Top Creators'}
                        </h1>
                        <p className="text-zinc-400 mt-2">
                            {language === 'de'
                                ? 'Die beliebtesten Rezeptersteller unserer Community'
                                : 'The most popular recipe creators in our community'}
                        </p>
                    </div>

                    {/* Leaderboard */}
                    <div className="space-y-4">
                        {isLoading ? (
                            // Loading skeletons
                            Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/[0.03] border-white/[0.05] animate-pulse"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/10" />
                                    <div className="w-14 h-14 rounded-xl bg-white/10" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 w-32 bg-white/10 rounded" />
                                        <div className="h-4 w-48 bg-white/10 rounded" />
                                    </div>
                                    <div className="h-10 w-24 bg-white/10 rounded-xl" />
                                </div>
                            ))
                        ) : topCreators.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-zinc-400">
                                    {language === 'de' ? 'Keine Köche gefunden.' : 'No creators found.'}
                                </p>
                            </div>
                        ) : topCreators.map((creator, index) => (
                            <motion.div
                                key={creator.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    'flex items-center gap-4 p-4 rounded-2xl border',
                                    getRankBackground(index + 1)
                                )}
                            >
                                {/* Rank */}
                                <div className="flex-shrink-0 w-10 flex justify-center">
                                    {getRankIcon(index + 1)}
                                </div>

                                {/* Avatar */}
                                <Link href={`/recipes/author/${creator.id}`} className="flex-shrink-0">
                                    {creator.avatarUrl ? (
                                        <Image
                                            src={creator.avatarUrl}
                                            alt={creator.displayName}
                                            width={56}
                                            height={56}
                                            className={cn(
                                                'rounded-xl',
                                                index < 3 && 'ring-2',
                                                index === 0 && 'ring-amber-400',
                                                index === 1 && 'ring-zinc-300',
                                                index === 2 && 'ring-amber-600',
                                            )}
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30
                      flex items-center justify-center">
                                            <span className="text-blue-400 text-xl font-bold">
                                                {creator.displayName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </Link>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <Link
                                        href={`/recipes/author/${creator.id}`}
                                        className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
                                    >
                                        {creator.displayName}
                                    </Link>
                                    <div className="flex flex-wrap items-center gap-4 mt-1">
                                        <div className="flex items-center gap-1 text-sm text-zinc-400">
                                            <ChefHat className="w-4 h-4 text-blue-400" />
                                            <span>{creator.recipeCount}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-zinc-400">
                                            <Eye className="w-4 h-4 text-blue-400" />
                                            <span>{formatNumber(creator.totalViews)}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-zinc-400">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span>{creator.averageRating.toFixed(1)}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-zinc-400">
                                            <Users className="w-4 h-4 text-purple-400" />
                                            <span>{formatNumber(creator.followerCount)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Follow button */}
                                <motion.button
                                    onClick={() => toggleFollow(creator.id)}
                                    className={cn(
                                        'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                                        followedIds.has(creator.id)
                                            ? 'bg-white/10 text-white border border-white/20'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    )}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {followedIds.has(creator.id)
                                        ? (language === 'de' ? 'Folgst du' : 'Following')
                                        : (language === 'de' ? 'Folgen' : 'Follow')
                                    }
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
