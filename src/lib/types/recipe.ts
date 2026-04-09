// Recipe types for the frontend
// These mirror the Flutter app's Recipe model

export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface NutritionInfo {
    calories?: number;
    proteinG?: number;
    carbsG?: number;
    fatG?: number;
    fiberG?: number;
    sugarG?: number;
    sodiumMg?: number;
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    defaultServings: number;
    ingredients: Ingredient[];
    instructions: string[];
    authorId: string;
    authorName: string;
    authorAvatarUrl?: string;
    createdAt: Date;
    averageRating: number;
    ratingCount: number;
    userRating?: number;
    viewCount: number;
    labels: string[];
    language: string;
    nutrition?: NutritionInfo;
}

export interface RecipeComment {
    id: string;
    recipeId: string;
    userId: string;
    userName?: string;
    userAvatarUrl?: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeCollection {
    id: string;
    name: string;
    nameDe?: string;
    description?: string;
    descriptionDe?: string;
    imageUrl?: string;
    icon: string;
    isFeatured: boolean;
    displayOrder: number;
    recipes?: Recipe[];
}

export interface RecipeAuthor {
    id: string;
    displayName: string;
    avatarUrl?: string;
    recipeCount: number;
    totalViews: number;
    averageRating: number;
    followerCount: number;
    isFollowed?: boolean;
}

// Filter types
export type RecipeLabel =
    // Cuisine
    | 'italian' | 'asian' | 'mexican' | 'mediterranean'
    // Diet
    | 'vegetarian' | 'vegan' | 'gluten-free' | 'keto' | 'low-carb'
    // Meal
    | 'breakfast' | 'lunch' | 'dinner' | 'snack'
    // Time
    | 'quick' | '30min' | 'under-hour'
    // Difficulty
    | 'easy' | 'medium' | 'advanced'
    // Other
    | 'healthy' | 'comfort-food' | 'seafood' | 'soup' | 'one-pot' | 'meal-prep';

export interface RecipeFilter {
    search?: string;
    labels?: RecipeLabel[];
    maxPrepTime?: number;
    maxTotalTime?: number;
    minRating?: number;
    authorId?: string;
    language?: 'en' | 'de';
}

export interface RecipeListOptions {
    filter?: RecipeFilter;
    sortBy?: 'newest' | 'popular' | 'rating' | 'views';
    page?: number;
    limit?: number;
}

// Quick filter presets
export const QUICK_FILTERS: { id: RecipeLabel; label: string; labelDe: string; icon: string }[] = [
    // Time-based
    { id: 'quick', label: 'Under 15 min', labelDe: 'Unter 15 Min', icon: '⚡' },
    { id: '30min', label: 'Under 30 min', labelDe: 'Unter 30 Min', icon: '⏱️' },

    // Diet
    { id: 'vegetarian', label: 'Vegetarian', labelDe: 'Vegetarisch', icon: '🥬' },
    { id: 'vegan', label: 'Vegan', labelDe: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Gluten-Free', labelDe: 'Glutenfrei', icon: '🌾' },
    { id: 'healthy', label: 'Healthy', labelDe: 'Gesund', icon: '💚' },

    // Cuisine
    { id: 'italian', label: 'Italian', labelDe: 'Italienisch', icon: '🍝' },
    { id: 'asian', label: 'Asian', labelDe: 'Asiatisch', icon: '🍜' },
    { id: 'mexican', label: 'Mexican', labelDe: 'Mexikanisch', icon: '🌮' },
    { id: 'mediterranean', label: 'Mediterranean', labelDe: 'Mediterran', icon: '🫒' },

    // Meal type
    { id: 'breakfast', label: 'Breakfast', labelDe: 'Frühstück', icon: '🍳' },
    { id: 'lunch', label: 'Lunch', labelDe: 'Mittagessen', icon: '🥗' },
    { id: 'dinner', label: 'Dinner', labelDe: 'Abendessen', icon: '🍽️' },
    { id: 'snack', label: 'Snacks', labelDe: 'Snacks', icon: '🍪' },

    // Other
    { id: 'comfort-food', label: 'Comfort Food', labelDe: 'Comfort Food', icon: '🍲' },
    { id: 'seafood', label: 'Seafood', labelDe: 'Meeresfrüchte', icon: '🦐' },
    { id: 'soup', label: 'Soups', labelDe: 'Suppen', icon: '🥣' },
];

// All available recipe labels for recipe creation
export const RECIPE_LABELS: { value: RecipeLabel; label: string; labelDe: string; emoji: string }[] = [
    // Cuisine
    { value: 'italian', label: 'Italian', labelDe: 'Italienisch', emoji: '🍝' },
    { value: 'asian', label: 'Asian', labelDe: 'Asiatisch', emoji: '🍜' },
    { value: 'mexican', label: 'Mexican', labelDe: 'Mexikanisch', emoji: '🌮' },
    { value: 'mediterranean', label: 'Mediterranean', labelDe: 'Mediterran', emoji: '🫒' },

    // Diet
    { value: 'vegetarian', label: 'Vegetarian', labelDe: 'Vegetarisch', emoji: '🥬' },
    { value: 'vegan', label: 'Vegan', labelDe: 'Vegan', emoji: '🌱' },
    { value: 'gluten-free', label: 'Gluten-Free', labelDe: 'Glutenfrei', emoji: '🌾' },
    { value: 'keto', label: 'Keto', labelDe: 'Keto', emoji: '🥑' },
    { value: 'low-carb', label: 'Low Carb', labelDe: 'Low Carb', emoji: '🥩' },
    { value: 'healthy', label: 'Healthy', labelDe: 'Gesund', emoji: '💚' },

    // Meal type
    { value: 'breakfast', label: 'Breakfast', labelDe: 'Frühstück', emoji: '🍳' },
    { value: 'lunch', label: 'Lunch', labelDe: 'Mittagessen', emoji: '🥗' },
    { value: 'dinner', label: 'Dinner', labelDe: 'Abendessen', emoji: '🍽️' },
    { value: 'snack', label: 'Snacks', labelDe: 'Snacks', emoji: '🍪' },

    // Time
    { value: 'quick', label: 'Quick', labelDe: 'Schnell', emoji: '⚡' },
    { value: '30min', label: 'Under 30 min', labelDe: 'Unter 30 Min', emoji: '⏱️' },
    { value: 'under-hour', label: 'Under 1 hour', labelDe: 'Unter 1 Std', emoji: '🕐' },

    // Difficulty
    { value: 'easy', label: 'Easy', labelDe: 'Einfach', emoji: '👶' },
    { value: 'medium', label: 'Medium', labelDe: 'Mittel', emoji: '👨‍🍳' },
    { value: 'advanced', label: 'Advanced', labelDe: 'Fortgeschritten', emoji: '🎓' },

    // Other
    { value: 'comfort-food', label: 'Comfort Food', labelDe: 'Comfort Food', emoji: '🍲' },
    { value: 'seafood', label: 'Seafood', labelDe: 'Meeresfrüchte', emoji: '🦐' },
    { value: 'soup', label: 'Soups', labelDe: 'Suppen', emoji: '🥣' },
];
