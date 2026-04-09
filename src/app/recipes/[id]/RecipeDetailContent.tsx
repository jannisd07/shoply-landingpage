'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { isRecipeSaved, saveRecipeToLocal, unsaveRecipeFromLocal, hasCookieConsent } from '@/lib/cookies';
import { supabase } from '@/lib/supabase/client';
import {
    Clock,
    Users,
    Share2,
    Bookmark,
    BookmarkCheck,
    ArrowLeft,
    Printer,
    ChefHat,
    Edit,
    Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Recipe } from '@/lib/types/recipe';
import IngredientList from '@/components/recipes/IngredientList';
import InstructionList from '@/components/recipes/InstructionList';
import NutritionPanel from '@/components/recipes/NutritionPanel';
import StarRating from '@/components/recipes/StarRating';
import AuthorCard from '@/components/recipes/AuthorCard';
import { CookingMode } from '@/components/recipes/CookingMode';

interface RecipeDetailContentProps {
    recipe: Recipe;
}

export default function RecipeDetailContent({ recipe }: RecipeDetailContentProps) {
    const { language } = useLanguage();
    const [isSaved, setIsSaved] = useState(false);
    const [userRating, setUserRating] = useState<number>(0);
    const [showCookingMode, setShowCookingMode] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Check if this is the user's own recipe
    const isOwnRecipe = currentUserId && currentUserId === recipe.authorId;

    // Check if recipe is saved on mount and auth status
    useEffect(() => {
        setCanSave(hasCookieConsent());
        setIsSaved(isRecipeSaved(recipe.id));
        
        // Check auth status
        supabase.auth.getUser().then(({ data: { user } }) => {
            setIsLoggedIn(!!user);
            setCurrentUserId(user?.id || null);
        });
    }, [recipe.id]);


    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

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

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: recipe.name,
                    text: recipe.description,
                    url: window.location.href,
                });
            } catch (err) {
                // User cancelled or error
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            // Could show a toast here
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSave = async () => {
        if (isSaved) {
            // Unsave
            if (isLoggedIn && currentUserId) {
                // Remove from database for logged in users
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await (supabase.from('saved_recipes') as any).delete().eq('user_id', currentUserId).eq('recipe_id', recipe.id);
                } catch (e) {
                    // Table might not exist, continue with localStorage
                }
            }
            unsaveRecipeFromLocal(recipe.id);
            setIsSaved(false);
        } else {
            // Save
            if (isLoggedIn && currentUserId) {
                // Save to database for logged in users
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await (supabase.from('saved_recipes') as any).insert({ user_id: currentUserId, recipe_id: recipe.id });
                } catch (e) {
                    // Table might not exist, continue with localStorage
                }
            }
            saveRecipeToLocal(recipe.id);
            setIsSaved(true);
        }
    };

    const handleRate = (rating: number) => {
        setUserRating(rating);
        // TODO: API call to submit rating
    };

    const handleEdit = () => {
        window.location.href = `/recipes/create?edit=${recipe.id}`;
    };

    const handleDelete = async () => {
        if (!confirm(language === 'de' 
            ? 'Möchtest du dieses Rezept wirklich löschen?' 
            : 'Are you sure you want to delete this recipe?')) {
            return;
        }
        
        setIsDeleting(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase.from('recipes') as any).delete().eq('id', recipe.id);
            
            if (error) throw error;
            
            window.location.href = '/recipes';
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert(language === 'de' ? 'Fehler beim Löschen' : 'Error deleting recipe');
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen pb-16">
            {/* Hero Section */}
            <section className="relative">
                {/* Background image */}
                <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
                    <Image
                        src={recipe.imageUrl || '/images/recipe-placeholder.jpg'}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient overlay - stronger for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                </div>

                {/* Back button (absolute positioned) */}
                <Link
                    href="/recipes"
                    className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 
            rounded-xl bg-black/50 backdrop-blur-sm text-white
            hover:bg-black/70 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">
                        {language === 'de' ? 'Zurück' : 'Back'}
                    </span>
                </Link>

                {/* Action buttons (absolute positioned) */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    {/* Delete button - only for own recipes */}
                    {isOwnRecipe && (
                        <motion.button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="p-3 rounded-xl bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    )}
                    
                    {/* Edit button - only for own recipes */}
                    {isOwnRecipe && (
                        <motion.button
                            onClick={handleEdit}
                            className="p-3 rounded-xl bg-blue-500/80 backdrop-blur-sm text-white hover:bg-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Edit className="w-5 h-5" />
                        </motion.button>
                    )}
                    
                    {/* Save button - only for other users' recipes */}
                    {!isOwnRecipe && (
                        <motion.button
                            onClick={handleSave}
                            className={cn(
                                'p-3 rounded-xl backdrop-blur-sm transition-colors',
                                isSaved
                                    ? 'bg-white text-black'
                                    : 'bg-black/50 text-white hover:bg-black/70'
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSaved ? (
                                <BookmarkCheck className="w-5 h-5" />
                            ) : (
                                <Bookmark className="w-5 h-5" />
                            )}
                        </motion.button>
                    )}
                    
                    {/* Share button - always visible */}
                    <motion.button
                        onClick={handleShare}
                        className="p-3 rounded-xl bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Share2 className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Labels */}
                        {recipe.labels.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {recipe.labels.map((label) => (
                                    <span
                                        key={label}
                                        className="px-3 py-1 rounded-full text-xs font-medium
                      bg-white/10 backdrop-blur-sm text-white border border-white/20"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <motion.h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {recipe.name}
                        </motion.h1>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-medium">{formatTime(totalTime)}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-medium">{recipe.defaultServings} {language === 'de' ? 'Portionen' : 'servings'}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                                <StarRating
                                    rating={recipe.averageRating || 0}
                                    showCount
                                    ratingCount={recipe.ratingCount || 0}
                                    size="sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cooking Mode Button - Prominent */}
            <section className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    <motion.button
                        onClick={() => setShowCookingMode(true)}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 
                            text-white font-semibold text-lg flex items-center justify-center gap-3
                            hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ChefHat className="w-6 h-6" />
                        {language === 'de' ? 'Kochmodus starten' : 'Start Cooking Mode'}
                    </motion.button>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Description */}
                    {recipe.description && (
                        <div className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                            <p className="text-lg text-zinc-300 leading-relaxed">
                                {recipe.description}
                            </p>
                        </div>
                    )}

                    {/* Time breakdown */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                            <p className="text-xs text-zinc-500 mb-1">
                                {language === 'de' ? 'Vorbereitung' : 'Prep'}
                            </p>
                            <p className="text-lg font-semibold text-white">
                                {formatTime(recipe.prepTimeMinutes)}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                            <p className="text-xs text-zinc-500 mb-1">
                                {language === 'de' ? 'Kochen' : 'Cook'}
                            </p>
                            <p className="text-lg font-semibold text-white">
                                {formatTime(recipe.cookTimeMinutes)}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                            <p className="text-xs text-blue-400 mb-1">
                                {language === 'de' ? 'Gesamt' : 'Total'}
                            </p>
                            <p className="text-lg font-semibold text-blue-400">
                                {formatTime(totalTime)}
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left column - Ingredients */}
                        <div className="lg:col-span-1">
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] sticky top-4">
                                <IngredientList
                                    ingredients={recipe.ingredients}
                                    defaultServings={recipe.defaultServings}
                                />
                            </div>
                        </div>

                        {/* Right column - Instructions */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Instructions */}
                            <InstructionList instructions={recipe.instructions} />

                            {/* Rate this recipe - only for logged in users */}
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    {language === 'de' ? 'Bewerte dieses Rezept' : 'Rate this Recipe'}
                                </h3>
                                {isLoggedIn ? (
                                    <div className="flex items-center gap-4">
                                        <StarRating
                                            rating={userRating}
                                            size="lg"
                                            interactive
                                            onRate={handleRate}
                                        />
                                        {userRating > 0 && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-blue-400 text-sm"
                                            >
                                                {language === 'de' ? 'Danke für deine Bewertung!' : 'Thanks for rating!'}
                                            </motion.span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-2">
                                        <p className="text-zinc-400 text-sm mb-3">
                                            {language === 'de' 
                                                ? 'Melde dich an, um dieses Rezept zu bewerten.' 
                                                : 'Sign in to rate this recipe.'}
                                        </p>
                                        <StarRating rating={recipe.averageRating} size="lg" />
                                    </div>
                                )}
                            </div>

                            {/* Nutrition */}
                            {recipe.nutrition && (
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                                    <NutritionPanel nutrition={recipe.nutrition} />
                                </div>
                            )}

                            {/* Author */}
                            <AuthorCard
                                authorId={recipe.authorId}
                                authorName={recipe.authorName}
                                authorAvatarUrl={recipe.authorAvatarUrl}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cooking Mode Overlay */}
            <AnimatePresence>
                {showCookingMode && (
                    <CookingMode
                        recipeName={recipe.name}
                        ingredients={recipe.ingredients}
                        instructions={recipe.instructions.map((text, idx) => ({
                            stepNumber: idx + 1,
                            text: text,
                        }))}
                        onClose={() => setShowCookingMode(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
