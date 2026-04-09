'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase/client';
import type { Recipe } from '@/lib/types/recipe';

// Category definitions
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

// Helper to get display name (never show email)
function getDisplayName(authorName: string | null | undefined, authorId?: string): string {
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
}

interface SimpleRecipe {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    authorName: string;
    averageRating: number;
}

export default function CategoryPage() {
    const { language } = useLanguage();
    const params = useParams();
    const categoryId = params?.id as string || '';
    const [recipes, setRecipes] = useState<SimpleRecipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const category = CATEGORIES.find(c => c.id === categoryId);

    useEffect(() => {
        async function fetchRecipes() {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('recipes')
                    .select('id, name, description, image_url, prep_time_minutes, cook_time_minutes, author_name, author_id, labels, view_count')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                type RecipeData = {
                    id: string;
                    name: string;
                    description: string | null;
                    image_url: string | null;
                    prep_time_minutes: number | null;
                    cook_time_minutes: number | null;
                    author_name: string | null;
                    author_id: string;
                    labels: string[] | null;
                    view_count: number | null;
                };

                // Filter recipes that have this category in their labels
                const filtered = ((data as RecipeData[]) || []).filter(recipe => 
                    recipe.labels?.some((label: string) => 
                        label.toLowerCase().includes(categoryId.toLowerCase())
                    )
                );

                // Transform to SimpleRecipe type
                const transformedRecipes: SimpleRecipe[] = filtered.map((r) => ({
                    id: r.id,
                    name: r.name,
                    description: r.description || '',
                    imageUrl: r.image_url || '/images/recipe-placeholder.jpg',
                    prepTimeMinutes: r.prep_time_minutes || 0,
                    cookTimeMinutes: r.cook_time_minutes || 0,
                    authorName: getDisplayName(r.author_name, r.author_id),
                    averageRating: 0,
                }));

                setRecipes(transformedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (categoryId) {
            fetchRecipes();
        }
    }, [categoryId]);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-zinc-400 mb-4">
                        {language === 'de' ? 'Kategorie nicht gefunden' : 'Category not found'}
                    </p>
                    <Link href="/recipes" className="text-blue-400 hover:text-blue-300">
                        {language === 'de' ? 'Zurück zu Rezepten' : 'Back to recipes'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16">
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/recipes"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {language === 'de' ? 'Zurück' : 'Back'}
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-5xl">{category.emoji}</span>
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                {language === 'de' ? category.labelDe : category.label}
                            </h1>
                            <p className="text-zinc-400">
                                {recipes.length} {language === 'de' ? 'Rezepte' : 'recipes'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipes Grid */}
            <section className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="rounded-2xl bg-white/[0.03] overflow-hidden animate-pulse">
                                    <div className="aspect-[4/3] bg-white/[0.05]" />
                                </div>
                            ))}
                        </div>
                    ) : recipes.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-zinc-400 mb-4">
                                {language === 'de' 
                                    ? 'Keine Rezepte in dieser Kategorie gefunden' 
                                    : 'No recipes found in this category'}
                            </p>
                            <Link
                                href="/recipes"
                                className="text-blue-400 hover:text-blue-300"
                            >
                                {language === 'de' ? 'Alle Rezepte anzeigen' : 'View all recipes'}
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {recipes.map((recipe, index) => (
                                <motion.div
                                    key={recipe.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`/recipes/${recipe.id}`} className="group block">
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
                                                <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">
                                                    {recipe.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-[10px] font-medium text-blue-300">
                                                            {recipe.authorName.charAt(0).toUpperCase()}
                                                        </span>
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
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
