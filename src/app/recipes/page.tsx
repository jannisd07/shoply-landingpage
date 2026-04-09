'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Plus, ChefHat, Bookmark, FileText, Users, Clock, Star, ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Recipe } from '@/lib/types/recipe';
import { 
    getRecipesClient, 
    getRecipeOfTheDayClient,
    sortByTrending,
} from '@/lib/supabase/recipes-client';
import { supabase } from '@/lib/supabase/client';
import { getSavedRecipeIds } from '@/lib/cookies';

// Category definitions matching the app exactly
const CATEGORIES = [
    { id: 'italian', label: 'Italian', labelDe: 'Italienisch', emoji: '🍝' },
    { id: 'asian', label: 'Asian', labelDe: 'Asiatisch', emoji: '🍜' },
    { id: 'vegetarian', label: 'Vegetarian', labelDe: 'Vegetarisch', emoji: '🥗' },
    { id: 'dessert', label: 'Desserts', labelDe: 'Desserts', emoji: '🍰' },
    { id: 'breakfast', label: 'Breakfast', labelDe: 'Frühstück', emoji: '🍳' },
    { id: 'quick', label: 'Quick & Easy', labelDe: 'Schnell & Einfach', emoji: '⚡' },
    { id: 'healthy', label: 'Healthy', labelDe: 'Gesund', emoji: '💚' },
    { id: 'comfort', label: 'Comfort Food', labelDe: 'Hausmannskost', emoji: '🍲' },
    { id: 'mexican', label: 'Mexican', labelDe: 'Mexikanisch', emoji: '🌮' },
    { id: 'mediterranean', label: 'Mediterranean', labelDe: 'Mediterran', emoji: '🫒' },
    { id: 'seafood', label: 'Seafood', labelDe: 'Meeresfrüchte', emoji: '🐟' },
    { id: 'soup', label: 'Soups', labelDe: 'Suppen', emoji: '🍜' },
];

export default function RecipesPage() {
    const { language } = useLanguage();
    const searchParams = useSearchParams();
    const categoryParam = searchParams?.get('category') || null;
    const [searchQuery, setSearchQuery] = useState('');
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [recipeOfTheDay, setRecipeOfTheDay] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ recipes: 0, creators: 0, saved: 0 });
    const [topCreators, setTopCreators] = useState<{ id: string; name: string; avatar?: string; count: number }[]>([]);
    
    // Get selected category info
    const selectedCategory = categoryParam ? CATEGORIES.find(c => c.id === categoryParam) : null;

    // Fetch recipes and stats from database
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const [recipesData, rotdData] = await Promise.all([
                    getRecipesClient({ sortBy: 'popular', limit: 100 }),
                    getRecipeOfTheDayClient(),
                ]);
                setAllRecipes(recipesData);
                setRecipeOfTheDay(rotdData);

                // Calculate stats
                const uniqueAuthors = new Set(recipesData.map(r => r.authorId));
                const savedIds = getSavedRecipeIds();
                setStats({
                    recipes: recipesData.length,
                    creators: uniqueAuthors.size,
                    saved: savedIds.length,
                });

                // Get top creators (authorName is already cleaned by getDisplayName in recipes-client)
                const authorMap = new Map<string, { id: string; name: string; avatar?: string; count: number }>();
                for (const recipe of recipesData) {
                    const existing = authorMap.get(recipe.authorId);
                    if (existing) {
                        existing.count++;
                    } else {
                        // Use the already-cleaned authorName from the recipe
                        authorMap.set(recipe.authorId, {
                            id: recipe.authorId,
                            name: recipe.authorName,
                            avatar: recipe.authorAvatarUrl,
                            count: 1,
                        });
                    }
                }
                setTopCreators(
                    Array.from(authorMap.values())
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 8)
                );
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    // Split recipes between sections - ensure both have content
    const sortedByViews = [...allRecipes].sort((a, b) => b.viewCount - a.viewCount);
    const sortedByRating = [...allRecipes].sort((a, b) => {
        const scoreA = (a.averageRating * 3) + (a.ratingCount * 0.5);
        const scoreB = (b.averageRating * 3) + (b.ratingCount * 0.5);
        return scoreB - scoreA;
    });

    // Take top 6 by views for "Popular this week"
    const popularThisWeek = sortedByViews.slice(0, Math.min(6, Math.ceil(allRecipes.length / 2)));
    const popularIds = new Set(popularThisWeek.map(r => r.id));

    // Take top recipes by rating that aren't in popular for "Recommended"
    // If not enough unique ones, just show different order
    let recommendedRecipes = sortedByRating
        .filter(r => !popularIds.has(r.id))
        .slice(0, 6);
    
    // If we don't have enough recommended, use remaining recipes
    if (recommendedRecipes.length < 3 && allRecipes.length > 3) {
        recommendedRecipes = sortedByRating.slice(0, 6);
    }

    // Count recipes per category
    const getCategoryCount = (categoryId: string) => {
        return allRecipes.filter(r => 
            r.labels.some(l => l.toLowerCase().includes(categoryId))
        ).length;
    };

    // Filter recipes by category if selected
    const filteredRecipes = selectedCategory
        ? allRecipes.filter(r => r.labels.some(l => l.toLowerCase().includes(selectedCategory.id)))
        : allRecipes;

    return (
        <div className="pb-16">
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">
                        {language === 'de' ? 'Rezepte' : 'Recipes'}
                    </h1>
                    <Link
                        href="/recipes/create"
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </Link>
                </div>
            </section>

            {/* Category Filter Banner */}
            {selectedCategory && (
                <section className="px-4 sm:px-6 lg:px-8 pb-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{selectedCategory.emoji}</span>
                                <div>
                                    <h2 className="font-semibold text-white">
                                        {language === 'de' ? selectedCategory.labelDe : selectedCategory.label}
                                    </h2>
                                    <p className="text-sm text-zinc-400">
                                        {filteredRecipes.length} {language === 'de' ? 'Rezepte' : 'recipes'}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/recipes"
                                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Search Bar */}
            <section className="px-4 sm:px-6 lg:px-8 pb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={language === 'de' ? 'Rezepte und Benutzer suchen' : 'Search recipes and users'}
                            className="w-full pl-14 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                                text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50
                                transition-colors"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="px-4 sm:px-6 lg:px-8 pb-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-around p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
                                <ChefHat className="w-4 h-4" />
                                <span className="font-bold">{stats.recipes}</span>
                            </div>
                            <p className="text-xs text-zinc-500">{language === 'de' ? 'Rezepte' : 'Recipes'}</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
                                <Users className="w-4 h-4" />
                                <span className="font-bold">{stats.creators}</span>
                            </div>
                            <p className="text-xs text-zinc-500">{language === 'de' ? 'Ersteller' : 'Creators'}</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
                                <Bookmark className="w-4 h-4" />
                                <span className="font-bold">{stats.saved}</span>
                            </div>
                            <p className="text-xs text-zinc-500">{language === 'de' ? 'Gespeicherte Rezepte' : 'Saved Recipes'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipe of the Day - Always visible at top */}
            {!searchQuery && (
                <section className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span>✨</span>
                            {language === 'de' ? 'Rezept des Tages' : 'Recipe of the Day'}
                        </h2>
                        {recipeOfTheDay ? (
                            <Link href={`/recipes/${recipeOfTheDay.id}`}>
                                <motion.div
                                    className="relative rounded-2xl overflow-hidden group cursor-pointer"
                                    whileHover={{ scale: 1.005 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="relative aspect-[21/9] sm:aspect-[3/1]">
                                        <Image
                                            src={recipeOfTheDay.imageUrl || '/images/recipe-placeholder.jpg'}
                                            alt={recipeOfTheDay.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                        {/* Featured badge */}
                                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                                            <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2 shadow-lg">
                                                <span>✨</span> {language === 'de' ? 'Empfohlen' : 'Featured'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                            {recipeOfTheDay.name}
                                        </h3>
                                        <p className="text-zinc-300 text-sm mb-3">
                                            {language === 'de' ? 'von' : 'by'} {recipeOfTheDay.authorName}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full text-white">
                                                <Clock className="w-4 h-4" />
                                                {recipeOfTheDay.prepTimeMinutes + recipeOfTheDay.cookTimeMinutes} min
                                            </span>
                                            {recipeOfTheDay.averageRating > 0 && (
                                                <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full text-amber-400">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    {recipeOfTheDay.averageRating.toFixed(1)}
                                                </span>
                                            )}
                                            <span className="hidden sm:flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full text-white">
                                                <Users className="w-4 h-4" />
                                                {recipeOfTheDay.defaultServings} {language === 'de' ? 'Portionen' : 'servings'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ) : isLoading ? (
                            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] animate-pulse">
                                <div className="aspect-[21/9] sm:aspect-[3/1]" />
                            </div>
                        ) : (
                            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] p-8 text-center">
                                <p className="text-zinc-500">{language === 'de' ? 'Kein Rezept des Tages verfügbar' : 'No recipe of the day available'}</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Quick Actions - Always 4 in a row */}
            {!searchQuery && (
                <section className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-4 gap-2 sm:gap-4">
                            <Link href="/recipes/my" className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-blue-500/30 transition-all group">
                                <div className="flex flex-col items-center gap-2">
                                    <ChefHat className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs sm:text-sm font-medium text-white text-center leading-tight">{language === 'de' ? 'Meine Rezepte' : 'My Recipes'}</span>
                                </div>
                            </Link>
                            <Link href="/recipes/saved" className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-blue-500/30 transition-all group">
                                <div className="flex flex-col items-center gap-2">
                                    <Bookmark className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs sm:text-sm font-medium text-white text-center leading-tight">{language === 'de' ? 'Gespeichert' : 'Saved'}</span>
                                </div>
                            </Link>
                            <Link href="/recipes/drafts" className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-blue-500/30 transition-all group">
                                <div className="flex flex-col items-center gap-2">
                                    <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs sm:text-sm font-medium text-white text-center leading-tight">{language === 'de' ? 'Entwürfe' : 'Drafts'}</span>
                                </div>
                            </Link>
                            <Link href="/recipes/creators" className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-blue-500/30 transition-all group">
                                <div className="flex flex-col items-center gap-2">
                                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs sm:text-sm font-medium text-white text-center leading-tight">{language === 'de' ? 'Ersteller' : 'Creators'}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Category Results - Show when category is selected */}
            {!searchQuery && selectedCategory && filteredRecipes.length > 0 && (
                <section className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredRecipes.map((recipe) => (
                                <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
                                    <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.05]">
                                        <div className="aspect-[4/3]">
                                            <Image
                                                src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                                                alt={recipe.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">{recipe.name}</h3>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-[10px] font-medium text-blue-300">{recipe.authorName.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <span className="text-xs text-zinc-300 line-clamp-1">{recipe.authorName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="flex items-center gap-1 text-zinc-300">
                                                    <Clock className="w-3 h-3" />
                                                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                                                </span>
                                                {recipe.averageRating > 0 && (
                                                    <span className="flex items-center gap-1 text-amber-400">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        {recipe.averageRating.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* No results for category */}
            {!searchQuery && selectedCategory && filteredRecipes.length === 0 && (
                <section className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto text-center py-12">
                        <p className="text-zinc-400">{language === 'de' ? 'Keine Rezepte in dieser Kategorie gefunden' : 'No recipes found in this category'}</p>
                    </div>
                </section>
            )}

            {/* Recommended for you - Horizontal scroll */}
            {!searchQuery && !selectedCategory && recommendedRecipes.length > 0 && (
                <section className="pb-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 px-4 sm:px-6 lg:px-8">
                            <span>❤️</span>
                            {language === 'de' ? 'Empfohlen für dich' : 'Recommended for you'}
                        </h2>
                        <div className="flex gap-4 overflow-x-auto pb-2 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                            {recommendedRecipes.slice(0, 10).map((recipe) => (
                                <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group flex-shrink-0 w-[calc(33.333%-11px)] snap-start">
                                    <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.05]">
                                        <div className="aspect-[4/3]">
                                            <Image
                                                src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                                                alt={recipe.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">{recipe.name}</h3>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-[10px] font-medium text-blue-300">{recipe.authorName.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <span className="text-xs text-zinc-300 line-clamp-1">{recipe.authorName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="flex items-center gap-1 text-zinc-300">
                                                    <Clock className="w-3 h-3" />
                                                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                                                </span>
                                                {recipe.averageRating > 0 && (
                                                    <span className="flex items-center gap-1 text-amber-400">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        {recipe.averageRating.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Popular this week - Horizontal scroll */}
            {!searchQuery && !selectedCategory && popularThisWeek.length > 0 && (
                <section className="pb-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 px-4 sm:px-6 lg:px-8">
                            <span>🔥</span>
                            {language === 'de' ? 'Beliebt diese Woche' : 'Popular this week'}
                        </h2>
                        <div className="flex gap-4 overflow-x-auto pb-2 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                            {popularThisWeek.slice(0, 10).map((recipe) => (
                                <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group flex-shrink-0 w-[calc(33.333%-11px)] snap-start">
                                    <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.05]">
                                        <div className="aspect-[4/3]">
                                            <Image
                                                src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                                                alt={recipe.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">{recipe.name}</h3>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-[10px] font-medium text-blue-300">{recipe.authorName.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <span className="text-xs text-zinc-300 line-clamp-1">{recipe.authorName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="flex items-center gap-1 text-zinc-300">
                                                    <Clock className="w-3 h-3" />
                                                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                                                </span>
                                                {recipe.averageRating > 0 && (
                                                    <span className="flex items-center gap-1 text-amber-400">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        {recipe.averageRating.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Browse by Category */}
            {!searchQuery && (
                <section className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span>🏷️</span>
                            {language === 'de' ? 'Kategorien' : 'Categories'}
                        </h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                            {CATEGORIES.map((cat) => {
                                const count = getCategoryCount(cat.id);
                                return (
                                    <Link
                                        key={cat.id}
                                        href={`/recipes/category/${cat.id}`}
                                        className="flex flex-col items-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-blue-500/30 transition-all group"
                                    >
                                        <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                                        <span className="text-sm text-zinc-300 text-center font-medium">
                                            {language === 'de' ? cat.labelDe : cat.label}
                                        </span>
                                        {count > 0 && (
                                            <span className="text-xs text-zinc-500 mt-1">{count} {language === 'de' ? 'Rezepte' : 'recipes'}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Top Creators */}
            {!searchQuery && topCreators.length > 0 && (
                <section className="pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-4 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span>⭐</span>
                                {language === 'de' ? 'Top Ersteller' : 'Top Creators'}
                            </h2>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-2 px-4 sm:px-6 lg:px-8" style={{ scrollbarWidth: 'none' }}>
                            {topCreators.map((creator) => (
                                <Link key={creator.id} href={`/recipes/author/${creator.id}`} className="text-center group">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/10 group-hover:border-blue-500/50 flex items-center justify-center mb-2 transition-all">
                                        {creator.avatar ? (
                                            <Image
                                                src={creator.avatar}
                                                alt={creator.name}
                                                width={64}
                                                height={64}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <span className="text-xl font-bold text-blue-400">
                                                {creator.name.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-white font-medium line-clamp-1 group-hover:text-blue-400 transition-colors">{creator.name}</p>
                                    <p className="text-xs text-zinc-500">{creator.count} {language === 'de' ? 'Rezepte' : 'recipes'}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Search Results */}
            {searchQuery && (
                <section className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl font-bold text-white mb-4">
                            {language === 'de' ? `Ergebnisse für "${searchQuery}"` : `Results for "${searchQuery}"`}
                        </h2>
                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="rounded-2xl bg-white/[0.03] overflow-hidden animate-pulse">
                                        <div className="aspect-[4/3] bg-white/[0.05]" />
                                        <div className="p-3 space-y-2">
                                            <div className="h-4 bg-white/[0.05] rounded w-3/4" />
                                            <div className="h-3 bg-white/[0.05] rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {allRecipes
                                    .filter(r => {
                                        const q = searchQuery.toLowerCase();
                                        return r.name.toLowerCase().includes(q) || 
                                               r.authorName.toLowerCase().includes(q);
                                    })
                                    .map((recipe) => (
                                        <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
                                            <div className="relative rounded-2xl overflow-hidden mb-3 bg-white/[0.03]">
                                                <div className="aspect-[4/3]">
                                                    <Image
                                                        src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                                                        alt={recipe.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <div className="flex items-center gap-2 text-xs text-white/90">
                                                        <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full">
                                                            <Clock className="w-3 h-3" />
                                                            {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                                                        </span>
                                                        {recipe.averageRating > 0 && (
                                                            <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full text-amber-400">
                                                                <Star className="w-3 h-3 fill-current" />
                                                                {recipe.averageRating.toFixed(1)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">{recipe.name}</h3>
                                            <p className="text-sm text-zinc-500 line-clamp-1">{recipe.authorName}</p>
                                        </Link>
                                    ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
