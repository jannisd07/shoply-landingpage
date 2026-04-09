'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import RecipeCard from './RecipeCard';
import type { RecipeCollection, Recipe } from '@/lib/types/recipe';

interface RecipeCollectionsSectionProps {
    collections: RecipeCollection[];
    collectionRecipes?: Record<string, Recipe[]>;
    className?: string;
}

export default function RecipeCollectionsSection({
    collections,
    collectionRecipes = {},
    className,
}: RecipeCollectionsSectionProps) {
    const { language } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = 320;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    if (collections.length === 0) return null;

    return (
        <section className={cn('py-8', className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                    {language === 'de' ? 'Sammlungen' : 'Collections'}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] 
              border border-white/[0.08] text-zinc-400 hover:text-white
              transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] 
              border border-white/[0.08] text-zinc-400 hover:text-white
              transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Collections scroll */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {collections.map((collection, index) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                        recipes={collectionRecipes[collection.id] || []}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}

interface CollectionCardProps {
    collection: RecipeCollection;
    recipes: Recipe[];
    index: number;
}

function CollectionCard({ collection, recipes, index }: CollectionCardProps) {
    const { language } = useLanguage();
    const name = language === 'de' && collection.nameDe ? collection.nameDe : collection.name;
    const description = language === 'de' && collection.descriptionDe
        ? collection.descriptionDe
        : collection.description;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Link href={`/recipes/collection/${collection.id}`}>
                <motion.div
                    className={cn(
                        'group w-72 flex-shrink-0 rounded-2xl overflow-hidden',
                        'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
                        'border border-white/[0.08] hover:border-blue-500/30',
                        'transition-all duration-300 cursor-pointer'
                    )}
                    whileHover={{ y: -4, scale: 1.02 }}
                >
                    {/* Header */}
                    <div className="p-4 pb-3 border-b border-white/[0.05]">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{collection.icon}</span>
                            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                {name}
                            </h3>
                        </div>
                        {description && (
                            <p className="text-sm text-zinc-500 line-clamp-1">{description}</p>
                        )}
                    </div>

                    {/* Preview recipes (mini grid) */}
                    <div className="p-3">
                        {recipes.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {recipes.slice(0, 4).map((recipe) => (
                                    <div
                                        key={recipe.id}
                                        className="aspect-square rounded-lg overflow-hidden bg-white/[0.05]"
                                    >
                                        {recipe.imageUrl && (
                                            <img
                                                src={recipe.imageUrl}
                                                alt={recipe.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="aspect-video rounded-lg bg-white/[0.03] 
                flex items-center justify-center">
                                <span className="text-4xl">{collection.icon}</span>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 pb-4 pt-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-500">
                                {recipes.length} {language === 'de' ? 'Rezepte' : 'recipes'}
                            </span>
                            <motion.span
                                className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ x: 4 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
