'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ChefHat, ImagePlus, Plus, Minus, X, GripVertical,
    Clock, Users, Sparkles, Check, AlertCircle, Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { RECIPE_LABELS, RecipeLabel } from '@/lib/types/recipe';
import { supabase } from '@/lib/supabase/client';

type Step = 'photo' | 'details' | 'ingredients' | 'instructions';

interface IngredientInput {
    id: string;
    name: string;
    amount: string;
    unit: string;
}

interface InstructionInput {
    id: string;
    text: string;
}

export default function CreateRecipePage() {
    const { language } = useLanguage();
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams?.get('edit');
    const [currentStep, setCurrentStep] = useState<Step>('photo');
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form state - must be before any early returns
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [prepTime, setPrepTime] = useState('15');
    const [cookTime, setCookTime] = useState('30');
    const [servings, setServings] = useState('4');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<IngredientInput[]>([
        { id: '1', name: '', amount: '', unit: '' }
    ]);
    const [instructions, setInstructions] = useState<InstructionInput[]>([
        { id: '1', text: '' }
    ]);
    const [selectedLabels, setSelectedLabels] = useState<RecipeLabel[]>([]);

    // Load existing recipe data when editing
    useEffect(() => {
        async function loadRecipeForEdit() {
            if (!editId) return;
            
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data, error } = await (supabase.from('recipes') as any).select('*').eq('id', editId).single();
                
                if (error || !data) {
                    console.error('Error loading recipe:', error);
                    return;
                }
                
                // Type the data
                const recipe = data as {
                    name?: string;
                    description?: string;
                    prep_time_minutes?: number;
                    cook_time_minutes?: number;
                    default_servings?: number;
                    image_url?: string;
                    ingredients?: { name: string; amount: number | string; unit: string }[];
                    instructions?: string[];
                    labels?: string[];
                };
                
                setIsEditing(true);
                setName(recipe.name || '');
                setDescription(recipe.description || '');
                setPrepTime(String(recipe.prep_time_minutes || 15));
                setCookTime(String(recipe.cook_time_minutes || 30));
                setServings(String(recipe.default_servings || 4));
                setImageUrl(recipe.image_url || '');
                setImagePreview(recipe.image_url || null);
                
                // Load ingredients
                if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
                    setIngredients(recipe.ingredients.map((ing, idx) => ({
                        id: String(idx + 1),
                        name: ing.name || '',
                        amount: String(ing.amount || ''),
                        unit: ing.unit || '',
                    })));
                }
                
                // Load instructions
                if (recipe.instructions && Array.isArray(recipe.instructions)) {
                    setInstructions(recipe.instructions.map((text, idx) => ({
                        id: String(idx + 1),
                        text: text || '',
                    })));
                }
                
                // Load labels
                if (recipe.labels && Array.isArray(recipe.labels)) {
                    setSelectedLabels(recipe.labels as RecipeLabel[]);
                }
            } catch (err) {
                console.error('Error loading recipe for edit:', err);
            }
        }
        
        loadRecipeForEdit();
    }, [editId]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login?redirect=/recipes/create');
        }
    }, [user, authLoading, router]);

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    // Don't render if not authenticated
    if (!user) {
        return null;
    }

    const steps: { key: Step; label: string; labelDe: string }[] = [
        { key: 'photo', label: 'Photo & Name', labelDe: 'Foto & Name' },
        { key: 'details', label: 'Details', labelDe: 'Details' },
        { key: 'ingredients', label: 'Ingredients', labelDe: 'Zutaten' },
        { key: 'instructions', label: 'Steps', labelDe: 'Schritte' },
    ];

    const currentStepIndex = steps.findIndex(s => s.key === currentStep);

    const addIngredient = () => {
        setIngredients([...ingredients, { id: Date.now().toString(), name: '', amount: '', unit: '' }]);
    };

    const removeIngredient = (id: string) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter(i => i.id !== id));
        }
    };

    const updateIngredient = (id: string, field: keyof IngredientInput, value: string) => {
        setIngredients(ingredients.map(i =>
            i.id === id ? { ...i, [field]: value } : i
        ));
    };

    const addInstruction = () => {
        setInstructions([...instructions, { id: Date.now().toString(), text: '' }]);
    };

    const removeInstruction = (id: string) => {
        if (instructions.length > 1) {
            setInstructions(instructions.filter(i => i.id !== id));
        }
    };

    const updateInstruction = (id: string, text: string) => {
        setInstructions(instructions.map(i =>
            i.id === id ? { ...i, text } : i
        ));
    };

    const toggleLabel = (label: RecipeLabel) => {
        setSelectedLabels(prev =>
            prev.includes(label)
                ? prev.filter(l => l !== label)
                : [...prev, label]
        );
    };

    const saveDraft = () => {
        if (!user) return;
        
        const draft = {
            id: Date.now().toString(),
            name: name || (language === 'de' ? 'Unbenannter Entwurf' : 'Untitled Draft'),
            description,
            prepTime,
            cookTime,
            servings,
            imageUrl,
            imagePreview,
            ingredients,
            instructions,
            selectedLabels,
            updatedAt: new Date().toISOString(),
        };
        
        // Get existing drafts
        const existingDrafts = localStorage.getItem(`recipe_drafts_${user.id}`);
        let drafts: typeof draft[] = [];
        if (existingDrafts) {
            try {
                drafts = JSON.parse(existingDrafts);
            } catch (e) {
                console.error('Error parsing drafts:', e);
            }
        }
        
        // Add new draft
        drafts.unshift(draft);
        
        // Save to localStorage
        localStorage.setItem(`recipe_drafts_${user.id}`, JSON.stringify(drafts));
        
        // Show confirmation and redirect
        alert(language === 'de' ? 'Entwurf gespeichert!' : 'Draft saved!');
        router.push('/recipes/drafts');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Auto-generate tags based on ingredients and name
    const generateAutoTags = useCallback((): RecipeLabel[] => {
        const tags: RecipeLabel[] = [];
        const allText = `${name} ${ingredients.map(i => i.name).join(' ')}`.toLowerCase();
        
        // Time-based tags
        const totalTime = parseInt(prepTime) + parseInt(cookTime);
        if (totalTime <= 15) tags.push('quick');
        else if (totalTime <= 30) tags.push('30min');
        
        // Diet tags
        const meatKeywords = ['chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'shrimp', 'bacon', 'ham', 'hähnchen', 'rind', 'schwein', 'fisch', 'lachs', 'garnelen', 'speck', 'schinken'];
        const hasMeat = meatKeywords.some(k => allText.includes(k));
        if (!hasMeat) {
            const dairyKeywords = ['milk', 'cheese', 'cream', 'butter', 'egg', 'milch', 'käse', 'sahne', 'ei'];
            const hasDairy = dairyKeywords.some(k => allText.includes(k));
            if (!hasDairy) tags.push('vegan');
            else tags.push('vegetarian');
        }
        
        // Cuisine tags
        if (allText.includes('pasta') || allText.includes('pizza') || allText.includes('risotto') || allText.includes('italian')) tags.push('italian');
        if (allText.includes('soy') || allText.includes('rice') || allText.includes('noodle') || allText.includes('asian') || allText.includes('thai') || allText.includes('chinese')) tags.push('asian');
        if (allText.includes('taco') || allText.includes('burrito') || allText.includes('salsa') || allText.includes('mexican')) tags.push('mexican');
        
        // Meal type
        if (allText.includes('breakfast') || allText.includes('frühstück') || allText.includes('pancake') || allText.includes('egg')) tags.push('breakfast');
        if (allText.includes('salad') || allText.includes('salat') || allText.includes('sandwich')) tags.push('lunch');
        if (allText.includes('soup') || allText.includes('suppe') || allText.includes('stew')) tags.push('soup');
        
        // Health tags
        const healthyKeywords = ['salad', 'vegetable', 'healthy', 'light', 'low', 'salat', 'gemüse', 'gesund', 'leicht'];
        if (healthyKeywords.some(k => allText.includes(k))) tags.push('healthy');
        
        return [...new Set(tags)] as RecipeLabel[];
    }, [name, ingredients, prepTime, cookTime]);

    const canProceed = () => {
        switch (currentStep) {
            case 'photo':
                return name.trim().length >= 3; // Name is required
            case 'details':
                return parseInt(prepTime) >= 0 && parseInt(cookTime) >= 0 && parseInt(servings) >= 1;
            case 'ingredients':
                return ingredients.some(i => i.name.trim());
            case 'instructions':
                return instructions.some(i => i.text.trim());
            default:
                return false;
        }
    };

    const handleNext = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
            setCurrentStep(steps[nextIndex].key);
        }
    };

    const handleBack = () => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStep(steps[prevIndex].key);
        }
    };

    const handleSubmit = async () => {
        if (!user) return;
        
        setIsSaving(true);
        
        try {
            const recipeData = {
                name,
                description,
                prep_time_minutes: parseInt(prepTime) || 15,
                cook_time_minutes: parseInt(cookTime) || 30,
                default_servings: parseInt(servings) || 4,
                image_url: imageUrl || imagePreview || '',
                ingredients: ingredients
                    .filter(i => i.name.trim())
                    .map(i => ({
                        name: i.name,
                        amount: parseFloat(i.amount) || 0,
                        unit: i.unit,
                    })),
                instructions: instructions
                    .filter(i => i.text.trim())
                    .map(i => i.text),
                labels: selectedLabels,
                author_id: user.id,
                author_name: user.user_metadata?.display_name || user.email,
            };
            
            if (isEditing && editId) {
                // Update existing recipe
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await (supabase.from('recipes') as any).update(recipeData).eq('id', editId);
                
                if (error) throw error;
                
                router.push(`/recipes/${editId}`);
            } else {
                // Create new recipe
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data, error } = await (supabase.from('recipes') as any).insert(recipeData).select('id').single();
                
                if (error) throw error;
                
                const newRecipe = data as { id: string };
                router.push(`/recipes/${newRecipe.id}`);
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert(language === 'de' ? 'Fehler beim Speichern' : 'Error saving recipe');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen pb-16">
            <section className="px-4 sm:px-6 lg:px-8 pt-8">
                <div className="max-w-3xl mx-auto">
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
                                <ChefHat className="w-8 h-8 text-blue-400" />
                                {isEditing 
                                    ? (language === 'de' ? 'Rezept bearbeiten' : 'Edit Recipe')
                                    : (language === 'de' ? 'Rezept erstellen' : 'Create Recipe')}
                            </h1>
                        </div>

                        <motion.button
                            onClick={saveDraft}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Save className="w-4 h-4" />
                            {language === 'de' ? 'Entwurf speichern' : 'Save Draft'}
                        </motion.button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-8 overflow-x-auto">
                        {steps.map((step, index) => (
                            <div key={step.key} className="flex items-center">
                                <button
                                    onClick={() => setCurrentStep(step.key)}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                                        currentStep === step.key
                                            ? 'bg-blue-500 text-white'
                                            : index < currentStepIndex
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'bg-white/5 text-zinc-400'
                                    )}
                                >
                                    {index < currentStepIndex ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-current/20 text-xs">
                                            {index + 1}
                                        </span>
                                    )}
                                    {language === 'de' ? step.labelDe : step.label}
                                </button>
                                {index < steps.length - 1 && (
                                    <div className={cn(
                                        'w-8 h-0.5 mx-1',
                                        index < currentStepIndex ? 'bg-blue-500/50' : 'bg-white/10'
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form Steps */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
                        >
                            {/* Details Step - Times and Servings */}
                            {currentStep === 'details' && (
                                <div className="space-y-6">
                                    <div className="text-center mb-2">
                                        <h2 className="text-lg font-semibold text-white">
                                            {language === 'de' ? 'Zeit und Portionen' : 'Time and Servings'}
                                        </h2>
                                        <p className="text-zinc-400 text-sm">
                                            {language === 'de' ? 'Wie lange dauert die Zubereitung?' : 'How long does it take to prepare?'}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-400" />
                                                {language === 'de' ? 'Vorbereitung' : 'Prep'}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={prepTime}
                                                    onChange={(e) => setPrepTime(e.target.value)}
                                                    min="0"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                            text-white text-center focus:outline-none focus:border-blue-500/50"
                                                />
                                                <span className="text-zinc-500 text-sm">min</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-400" />
                                                {language === 'de' ? 'Kochen' : 'Cook'}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={cookTime}
                                                    onChange={(e) => setCookTime(e.target.value)}
                                                    min="0"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                            text-white text-center focus:outline-none focus:border-blue-500/50"
                                                />
                                                <span className="text-zinc-500 text-sm">min</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                                                <Users className="w-4 h-4 text-blue-400" />
                                                {language === 'de' ? 'Portionen' : 'Servings'}
                                            </label>
                                            <input
                                                type="number"
                                                value={servings}
                                                onChange={(e) => setServings(e.target.value)}
                                                min="1"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                          text-white text-center focus:outline-none focus:border-blue-500/50"
                                            />
                                        </div>
                                    </div>

                                    {/* Total time display */}
                                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <p className="text-blue-400 text-sm text-center">
                                            {language === 'de' ? 'Gesamtzeit:' : 'Total time:'}{' '}
                                            <span className="font-semibold">{parseInt(prepTime || '0') + parseInt(cookTime || '0')} min</span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Photo & Name Step - Combined first step */}
                            {currentStep === 'photo' && (
                                <div className="space-y-6">
                                    {/* Recipe Name - Required */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            {language === 'de' ? 'Wie heißt dein Rezept? *' : 'What\'s your recipe called? *'}
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={language === 'de' ? 'z.B. Cremige Pasta Carbonara' : 'e.g., Creamy Pasta Carbonara'}
                                            className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10
                                                text-white text-lg placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                                        />
                                        {name.length > 0 && name.length < 3 && (
                                            <p className="text-amber-400 text-xs mt-1">
                                                {language === 'de' ? 'Mindestens 3 Zeichen' : 'At least 3 characters'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Photo Upload - Optional */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            {language === 'de' ? 'Foto (optional)' : 'Photo (optional)'}
                                        </label>
                                        <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors">
                                            {imagePreview ? (
                                                <div className="relative">
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        width={400}
                                                        height={280}
                                                        className="mx-auto rounded-xl"
                                                    />
                                                    <button
                                                        onClick={() => setImagePreview(null)}
                                                        className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                                                        <ImagePlus className="w-8 h-8 text-blue-400" />
                                                    </div>
                                                    <label className="cursor-pointer inline-block">
                                                        <span className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium
                                                            hover:bg-blue-600 transition-colors inline-block text-sm">
                                                            {language === 'de' ? 'Foto auswählen' : 'Choose Photo'}
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                    <p className="text-zinc-500 text-xs mt-3">
                                                        PNG, JPG, WEBP • Max 10MB
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Ingredients Step */}
                            {currentStep === 'ingredients' && (
                                <div className="space-y-4">
                                    <p className="text-zinc-400 text-sm mb-4">
                                        {language === 'de'
                                            ? 'Füge alle Zutaten mit Mengenangaben hinzu.'
                                            : 'Add all ingredients with measurements.'}
                                    </p>

                                    {ingredients.map((ingredient, index) => (
                                        <motion.div
                                            key={ingredient.id}
                                            layout
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-3"
                                        >
                                            <GripVertical className="w-5 h-5 text-zinc-600 cursor-grab" />
                                            <input
                                                type="text"
                                                value={ingredient.amount}
                                                onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
                                                placeholder="200"
                                                className="w-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10
                          text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 text-center"
                                            />
                                            <input
                                                type="text"
                                                value={ingredient.unit}
                                                onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                                                placeholder="g"
                                                className="w-16 px-3 py-2 rounded-lg bg-white/5 border border-white/10
                          text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 text-center"
                                            />
                                            <input
                                                type="text"
                                                value={ingredient.name}
                                                onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                                                placeholder={language === 'de' ? 'Zutat' : 'Ingredient'}
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10
                          text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                                            />
                                            <button
                                                onClick={() => removeIngredient(ingredient.id)}
                                                className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}

                                    <motion.button
                                        onClick={addIngredient}
                                        className="flex items-center gap-2 w-full py-3 rounded-xl border border-dashed
                      border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Plus className="w-4 h-4" />
                                        {language === 'de' ? 'Zutat hinzufügen' : 'Add Ingredient'}
                                    </motion.button>
                                </div>
                            )}

                            {/* Instructions Step */}
                            {currentStep === 'instructions' && (
                                <div className="space-y-4">
                                    <p className="text-zinc-400 text-sm mb-4">
                                        {language === 'de'
                                            ? 'Beschreibe jeden Schritt der Zubereitung.'
                                            : 'Describe each step of the preparation.'}
                                    </p>

                                    {instructions.map((instruction, index) => (
                                        <motion.div
                                            key={instruction.id}
                                            layout
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 
                        flex items-center justify-center text-blue-400 text-sm font-medium mt-1">
                                                {index + 1}
                                            </div>
                                            <textarea
                                                value={instruction.text}
                                                onChange={(e) => updateInstruction(instruction.id, e.target.value)}
                                                placeholder={language === 'de' ? `Schritt ${index + 1} beschreiben...` : `Describe step ${index + 1}...`}
                                                rows={2}
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10
                          text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 resize-none"
                                            />
                                            <button
                                                onClick={() => removeInstruction(instruction.id)}
                                                className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}

                                    <motion.button
                                        onClick={addInstruction}
                                        className="flex items-center gap-2 w-full py-3 rounded-xl border border-dashed
                      border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Plus className="w-4 h-4" />
                                        {language === 'de' ? 'Schritt hinzufügen' : 'Add Step'}
                                    </motion.button>

                                    {/* Auto-generated Tags Preview */}
                                    <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <p className="text-sm text-blue-400 mb-3 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            {language === 'de' ? 'Tags werden automatisch generiert:' : 'Tags will be auto-generated:'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {generateAutoTags().length > 0 ? (
                                                generateAutoTags().map((tag) => {
                                                    const labelInfo = RECIPE_LABELS.find(l => l.value === tag);
                                                    return (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1.5 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                                        >
                                                            {labelInfo?.emoji} {language === 'de' ? labelInfo?.labelDe : labelInfo?.label}
                                                        </span>
                                                    );
                                                })
                                            ) : (
                                                <span className="text-zinc-500 text-sm">
                                                    {language === 'de' ? 'Tags werden basierend auf Zutaten erkannt' : 'Tags detected based on ingredients'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <motion.button
                            onClick={handleBack}
                            disabled={currentStepIndex === 0}
                            className={cn(
                                'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                                currentStepIndex === 0
                                    ? 'opacity-50 cursor-not-allowed text-zinc-500'
                                    : 'bg-white/5 text-white hover:bg-white/10'
                            )}
                            whileHover={currentStepIndex > 0 ? { scale: 1.02 } : {}}
                            whileTap={currentStepIndex > 0 ? { scale: 0.98 } : {}}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {language === 'de' ? 'Zurück' : 'Back'}
                        </motion.button>

                        {currentStepIndex < steps.length - 1 ? (
                            <motion.button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={cn(
                                    'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                                    canProceed()
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'opacity-50 cursor-not-allowed bg-blue-500/50 text-white/50'
                                )}
                                whileHover={canProceed() ? { scale: 1.02 } : {}}
                                whileTap={canProceed() ? { scale: 0.98 } : {}}
                            >
                                {language === 'de' ? 'Weiter' : 'Continue'}
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={handleSubmit}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                  bg-blue-500 text-white hover:bg-blue-600 transition-all"
                                whileHover={!isSaving ? { scale: 1.02 } : {}}
                                whileTap={!isSaving ? { scale: 0.98 } : {}}
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {language === 'de' ? 'Speichern...' : 'Saving...'}
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        {language === 'de' ? 'Rezept veröffentlichen' : 'Publish Recipe'}
                                    </>
                                )}
                            </motion.button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
