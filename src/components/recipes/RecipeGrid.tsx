'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import RecipeCard from './RecipeCard';
import type { Recipe } from '@/lib/types/recipe';

interface RecipeGridProps {
    recipes: Recipe[];
    columns?: 2 | 3 | 4;
    className?: string;
    emptyMessage?: string;
    showLoadMore?: boolean;
    onLoadMore?: () => void;
    isLoading?: boolean;
}

export default function RecipeGrid({
    recipes,
    columns = 3,
    className,
    emptyMessage = 'No recipes found',
    showLoadMore = false,
    onLoadMore,
    isLoading = false,
}: RecipeGridProps) {
    const columnClasses = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    // Show loading skeletons while loading
    if (isLoading) {
        return (
            <div className={cn('space-y-8', className)}>
                <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
                    {[...Array(6)].map((_, i) => (
                        <RecipeCardSkeleton key={`skeleton-${i}`} />
                    ))}
                </div>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-white/[0.05] flex items-center justify-center mb-4">
                    <span className="text-4xl">🍳</span>
                </div>
                <p className="text-zinc-400 text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className={cn('space-y-8', className)}>
            <motion.div
                className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.05,
                        },
                    },
                }}
            >
                {recipes.map((recipe, index) => (
                    <motion.div
                        key={recipe.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <RecipeCard
                            recipe={recipe}
                            priority={index < 6}
                        />
                    </motion.div>
                ))}

                {/* Loading skeletons */}
                {isLoading && (
                    <>
                        {[...Array(6)].map((_, i) => (
                            <RecipeCardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </>
                )}
            </motion.div>

            {/* Load more button */}
            {showLoadMore && onLoadMore && (
                <div className="flex justify-center pt-4">
                    <motion.button
                        onClick={onLoadMore}
                        className={cn(
                            'px-8 py-3 rounded-xl font-medium',
                            'bg-white/[0.05] hover:bg-white/[0.08]',
                            'border border-white/[0.1] hover:border-blue-500/30',
                            'text-white transition-all duration-300',
                            isLoading && 'opacity-50 cursor-not-allowed'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </motion.button>
                </div>
            )}
        </div>
    );
}

// Skeleton component for loading state
function RecipeCardSkeleton() {
    return (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.05] overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-[4/3] bg-white/[0.05]" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                <div className="h-5 bg-white/[0.05] rounded-lg w-3/4" />
                <div className="h-4 bg-white/[0.05] rounded-lg w-1/2" />
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-white/[0.05] rounded-lg w-24" />
                    <div className="w-6 h-6 rounded-full bg-white/[0.05]" />
                </div>
            </div>
        </div>
    );
}

export { RecipeCardSkeleton };
