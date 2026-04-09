'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Clock, Star, Edit, Trash2, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase/client';
import type { Recipe } from '@/lib/types/recipe';

export default function MyRecipesPage() {
    const { language } = useLanguage();
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        async function checkAuthAndLoadRecipes() {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.push('/auth/login?redirect=/recipes/my');
                return;
            }
            
            setUserId(user.id);
            
            // Fetch user's recipes
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase.from('recipes') as any).select('*').eq('author_id', user.id).order('created_at', { ascending: false });
            
            if (error) {
                console.error('Error fetching recipes:', error);
            } else if (data) {
                // Helper to get display name (never show email)
                const getDisplayName = (name: string | null, oderId?: string): string => {
                    if (!name) {
                        const randomNum = oderId 
                            ? parseInt(oderId.replace(/[^0-9]/g, '').slice(0, 4)) || Math.floor(Math.random() * 9000) + 1000
                            : Math.floor(Math.random() * 9000) + 1000;
                        return `User${randomNum}`;
                    }
                    if (name.includes('@')) {
                        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                        const num = (hash % 9000) + 1000;
                        return `User${num}`;
                    }
                    return name;
                };

                // Map database fields to Recipe type
                const mappedRecipes: Recipe[] = data.map((r: any) => ({
                    id: r.id,
                    name: r.name,
                    description: r.description || '',
                    imageUrl: r.image_url || '/images/recipe-placeholder.jpg',
                    prepTimeMinutes: r.prep_time_minutes || 0,
                    cookTimeMinutes: r.cook_time_minutes || 0,
                    defaultServings: r.default_servings || 4,
                    ingredients: r.ingredients || [],
                    instructions: r.instructions || [],
                    labels: r.labels || [],
                    authorId: r.author_id,
                    authorName: getDisplayName(r.author_name, r.author_id),
                    authorAvatarUrl: r.author_avatar_url,
                    averageRating: r.average_rating || 0,
                    ratingCount: r.rating_count || 0,
                    viewCount: r.view_count || 0,
                    createdAt: r.created_at,
                    updatedAt: r.updated_at,
                }));
                setRecipes(mappedRecipes);
            }
            
            setIsLoading(false);
        }
        
        checkAuthAndLoadRecipes();
    }, [router]);

    const handleDelete = async (recipeId: string) => {
        if (!confirm(language === 'de' 
            ? 'Möchtest du dieses Rezept wirklich löschen?' 
            : 'Are you sure you want to delete this recipe?')) {
            return;
        }
        
        setDeletingId(recipeId);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase.from('recipes') as any).delete().eq('id', recipeId);
            
            if (error) throw error;
            
            setRecipes(prev => prev.filter(r => r.id !== recipeId));
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert(language === 'de' ? 'Fehler beim Löschen' : 'Error deleting recipe');
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16">
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            href="/recipes"
                            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white">
                            {language === 'de' ? 'Meine Rezepte' : 'My Recipes'}
                        </h1>
                        <div className="flex-1" />
                        <Link
                            href="/recipes/create"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">{language === 'de' ? 'Neues Rezept' : 'New Recipe'}</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Recipes Grid */}
            <section className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {recipes.length === 0 ? (
                        <div className="text-center py-16">
                            <ChefHat className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {language === 'de' ? 'Noch keine Rezepte' : 'No recipes yet'}
                            </h2>
                            <p className="text-zinc-400 mb-6">
                                {language === 'de' 
                                    ? 'Erstelle dein erstes Rezept und teile es mit der Community!'
                                    : 'Create your first recipe and share it with the community!'}
                            </p>
                            <Link
                                href="/recipes/create"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                {language === 'de' ? 'Rezept erstellen' : 'Create Recipe'}
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe) => (
                                <motion.div
                                    key={recipe.id}
                                    className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.05]"
                                    whileHover={{ y: -4 }}
                                >
                                    <Link href={`/recipes/${recipe.id}`}>
                                        <div className="relative aspect-[4/3]">
                                            <Image
                                                src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                                                alt={recipe.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-white mb-2 line-clamp-1">
                                                {recipe.name}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                                                </span>
                                                {recipe.averageRating > 0 && (
                                                    <span className="flex items-center gap-1 text-amber-400">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        {recipe.averageRating.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                    
                                    {/* Action buttons */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/recipes/create?edit=${recipe.id}`}
                                            className="p-2 rounded-lg bg-blue-500/90 text-white hover:bg-blue-600 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(recipe.id);
                                            }}
                                            disabled={deletingId === recipe.id}
                                            className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
