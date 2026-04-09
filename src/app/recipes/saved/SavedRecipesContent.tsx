'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RecipeGrid } from '@/components/recipes';
import type { Recipe } from '@/lib/types/recipe';
import { supabase } from '@/lib/supabase/client';
import { getRecipeByIdClient } from '@/lib/supabase/recipes-client';
import { getSavedRecipeIds, hasCookieConsent } from '@/lib/cookies';

export default function SavedRecipesContent() {
    const { language } = useLanguage();
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch saved recipes from cookies/localStorage or database
    useEffect(() => {
        async function fetchSavedRecipes() {
            setIsLoading(true);
            try {
                // Check if user is authenticated
                const { data: { user } } = await supabase.auth.getUser();
                
                if (user) {
                    // Fetch from database for authenticated users
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const { data: savedIds } = await (supabase.from('saved_recipes') as any).select('recipe_id').eq('user_id', user.id);
                    
                    if (savedIds && savedIds.length > 0) {
                        const recipes = await Promise.all(
                            savedIds.map((s: { recipe_id: string }) => getRecipeByIdClient(s.recipe_id))
                        );
                        setSavedRecipes(recipes.filter((r): r is Recipe => r !== null));
                    }
                } else if (hasCookieConsent()) {
                    // Use cookie-based localStorage for non-authenticated users
                    const savedIds = getSavedRecipeIds();
                    if (savedIds.length > 0) {
                        const recipes = await Promise.all(
                            savedIds.map(id => getRecipeByIdClient(id))
                        );
                        setSavedRecipes(recipes.filter((r): r is Recipe => r !== null));
                    }
                }
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSavedRecipes();
    }, []);

    const handleUnsave = (recipeId: string) => {
        setSavedRecipes(recipes => recipes.filter(r => r.id !== recipeId));
        // TODO: API call
    };

    return (
        <div className="min-h-screen pb-16">
            <section className="px-4 sm:px-6 lg:px-8 pt-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Link
                                href="/recipes"
                                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                {language === 'de' ? 'Zurück' : 'Back'}
                            </Link>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Bookmark className="w-8 h-8 text-blue-400" />
                                {language === 'de' ? 'Gespeicherte Rezepte' : 'Saved Recipes'}
                            </h1>
                            <p className="text-zinc-400 mt-2">
                                {savedRecipes.length} {language === 'de' ? 'Rezepte gespeichert' : 'recipes saved'}
                            </p>
                        </div>
                    </div>

                    {/* Info banner for logged out users */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
                    >
                        <p className="text-blue-300 text-sm">
                            💡 {language === 'de'
                                ? 'Melde dich an, um deine gespeicherten Rezepte auf allen Geräten zu synchronisieren.'
                                : 'Sign in to sync your saved recipes across all your devices.'}
                        </p>
                    </motion.div>

                    {/* Recipe Grid */}
                    <RecipeGrid
                        recipes={savedRecipes}
                        columns={3}
                        isLoading={isLoading}
                        emptyMessage={
                            language === 'de'
                                ? 'Du hast noch keine Rezepte gespeichert. Durchstöbere Rezepte und speichere deine Favoriten!'
                                : 'You haven\'t saved any recipes yet. Browse recipes and save your favorites!'
                        }
                    />
                </div>
            </section>
        </div>
    );
}
