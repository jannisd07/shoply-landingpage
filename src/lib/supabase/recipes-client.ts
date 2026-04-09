import { supabase } from './client';
import type { RecipeRow, RecipeCollectionRow, IngredientData, NutritionData } from './types';
import type { Recipe, RecipeCollection, RecipeListOptions, NutritionInfo, Ingredient } from '../types/recipe';

// Helper to get display name from author_name (never show email)
function getDisplayName(authorName: string | null | undefined, oderId?: string): string {
    if (!authorName) {
        // Generate User + random numbers based on oderId or random
        const randomNum = oderId 
            ? parseInt(oderId.replace(/[^0-9]/g, '').slice(0, 4)) || Math.floor(Math.random() * 9000) + 1000
            : Math.floor(Math.random() * 9000) + 1000;
        return `User${randomNum}`;
    }
    
    // If it looks like an email, generate User + numbers instead
    if (authorName.includes('@')) {
        // Use hash of email for consistent number
        const hash = authorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const num = (hash % 9000) + 1000;
        return `User${num}`;
    }
    
    return authorName;
}

// Transform database row to frontend Recipe type
function transformRecipe(row: RecipeRow): Recipe {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        prepTimeMinutes: row.prep_time_minutes,
        cookTimeMinutes: row.cook_time_minutes,
        defaultServings: row.default_servings,
        ingredients: (row.ingredients || []).map(transformIngredient),
        instructions: row.instructions || [],
        authorId: row.author_id,
        authorName: getDisplayName(row.author_name, row.author_id),
        authorAvatarUrl: row.author_avatar_url || undefined,
        createdAt: new Date(row.created_at),
        averageRating: row.average_rating || 0,
        ratingCount: row.rating_count || 0,
        viewCount: row.view_count || 0,
        labels: row.labels || [],
        language: row.language,
        nutrition: row.nutrition ? transformNutrition(row.nutrition) : undefined,
    };
}

function transformIngredient(data: IngredientData): Ingredient {
    return {
        name: data.name,
        amount: data.amount,
        unit: data.unit,
    };
}

function transformNutrition(data: NutritionData): NutritionInfo {
    return {
        calories: data.calories,
        proteinG: data.protein_g,
        carbsG: data.carbs_g,
        fatG: data.fat_g,
        fiberG: data.fiber_g,
        sugarG: data.sugar_g,
        sodiumMg: data.sodium_mg,
    };
}

function transformCollection(row: RecipeCollectionRow): RecipeCollection {
    return {
        id: row.id,
        name: row.name,
        nameDe: row.name_de || undefined,
        description: row.description || undefined,
        descriptionDe: row.description_de || undefined,
        imageUrl: row.image_url || undefined,
        icon: row.icon,
        isFeatured: row.is_featured,
        displayOrder: row.display_order,
    };
}

// ============================================
// Client-side Recipe Fetching
// ============================================

export async function getRecipesClient(options: RecipeListOptions = {}): Promise<Recipe[]> {
    const { filter, sortBy = 'newest', page = 1, limit = 20 } = options;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase.from('recipes') as any).select('*');

    // Apply filters
    if (filter?.search) {
        query = query.or(`name.ilike.%${filter.search}%,description.ilike.%${filter.search}%,author_name.ilike.%${filter.search}%`);
    }

    if (filter?.labels && filter.labels.length > 0) {
        query = query.overlaps('labels', filter.labels);
    }

    if (filter?.authorId) {
        query = query.eq('author_id', filter.authorId);
    }

    if (filter?.language) {
        query = query.eq('language', filter.language);
    }

    if (filter?.minRating) {
        query = query.gte('average_rating', filter.minRating);
    }

    if (filter?.maxTotalTime) {
        query = query.lte('prep_time_minutes', filter.maxTotalTime);
    }

    // Apply sorting with proper algorithms
    switch (sortBy) {
        case 'popular':
            // Sort by view count (popularity metric)
            query = query.order('view_count', { ascending: false });
            break;
        case 'rating':
            // Sort by average rating, with rating count as tiebreaker
            query = query.order('average_rating', { ascending: false })
                         .order('rating_count', { ascending: false });
            break;
        case 'views':
            query = query.order('view_count', { ascending: false });
            break;
        case 'newest':
        default:
            query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }

    return (data || []).map(transformRecipe);
}

export async function getRecipeByIdClient(id: string): Promise<Recipe | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('recipes') as any).select('*').eq('id', id).single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error fetching recipe:', error);
        return null;
    }

    return transformRecipe(data);
}

export async function getCollectionsClient(featuredOnly = false): Promise<RecipeCollection[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase.from('recipe_collections') as any).select('*').order('display_order', { ascending: true });

    if (featuredOnly) {
        query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching collections:', error);
        return [];
    }

    return (data || []).map(transformCollection);
}

export async function getRecipeOfTheDayClient(): Promise<Recipe | null> {
    const today = new Date().toISOString().split('T')[0];

    // Check if there's a featured recipe for today
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: featured } = await (supabase.from('recipe_of_the_day') as any).select('recipe_id').eq('date', today).single();

    if (featured?.recipe_id) {
        return getRecipeByIdClient(featured.recipe_id);
    }

    // Fall back to highest-rated recipe with sufficient ratings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: ratedRecipe } = await (supabase.from('recipes') as any).select('*').gte('rating_count', 1).order('average_rating', { ascending: false }).order('rating_count', { ascending: false }).limit(1).single();

    if (ratedRecipe) {
        return transformRecipe(ratedRecipe);
    }

    // If no rated recipes, use deterministic selection based on date
    // This ensures the same recipe is shown all day
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: allRecipes } = await (supabase.from('recipes') as any).select('*').order('view_count', { ascending: false }).limit(20);

    if (allRecipes && allRecipes.length > 0) {
        // Use date as seed for consistent daily selection
        const dateHash = today.split('-').reduce((acc, part) => acc + parseInt(part), 0);
        const index = dateHash % allRecipes.length;
        return transformRecipe(allRecipes[index]);
    }

    return null;
}

export async function getPopularRecipesClient(limit = 10): Promise<Recipe[]> {
    return getRecipesClient({ sortBy: 'popular', limit });
}

export async function getRecentRecipesClient(limit = 10): Promise<Recipe[]> {
    return getRecipesClient({ sortBy: 'newest', limit });
}

export async function getTopRatedRecipesClient(limit = 10): Promise<Recipe[]> {
    return getRecipesClient({ sortBy: 'rating', limit });
}

export async function getRecipesByAuthorClient(authorId: string, limit = 20): Promise<Recipe[]> {
    return getRecipesClient({ filter: { authorId }, sortBy: 'newest', limit });
}

export async function searchRecipesClient(query: string, limit = 20): Promise<Recipe[]> {
    return getRecipesClient({ filter: { search: query }, limit });
}

export async function getRecipesByLabelsClient(labels: string[], limit = 20): Promise<Recipe[]> {
    return getRecipesClient({ filter: { labels }, sortBy: 'popular', limit });
}

// ============================================
// Advanced Sorting & Categorization
// ============================================

// Wilson score for ranking (balances rating and number of ratings)
function wilsonScore(positive: number, total: number): number {
    if (total === 0) return 0;
    const z = 1.96; // 95% confidence
    const p = positive / total;
    const denominator = 1 + (z * z) / total;
    const numerator = p + (z * z) / (2 * total) - z * Math.sqrt((p * (1 - p) + (z * z) / (4 * total)) / total);
    return numerator / denominator;
}

// Sort recipes by Wilson score (better ranking algorithm)
export function sortByWilsonScore(recipes: Recipe[]): Recipe[] {
    return [...recipes].sort((a, b) => {
        // Convert 5-star rating to positive/total
        const aPositive = (a.averageRating / 5) * a.ratingCount;
        const bPositive = (b.averageRating / 5) * b.ratingCount;
        return wilsonScore(bPositive, b.ratingCount) - wilsonScore(aPositive, a.ratingCount);
    });
}

// Sort by trending (recent views + engagement)
export function sortByTrending(recipes: Recipe[]): Recipe[] {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    return [...recipes].sort((a, b) => {
        // Decay factor based on age (newer = higher score)
        const aAge = (now - a.createdAt.getTime()) / dayMs;
        const bAge = (now - b.createdAt.getTime()) / dayMs;
        
        // Combine views, rating, and recency
        const aScore = (a.viewCount * 0.4 + a.ratingCount * 100 * 0.3 + a.averageRating * 20 * 0.3) / Math.pow(aAge + 2, 1.5);
        const bScore = (b.viewCount * 0.4 + b.ratingCount * 100 * 0.3 + b.averageRating * 20 * 0.3) / Math.pow(bAge + 2, 1.5);
        
        return bScore - aScore;
    });
}

// Categorize recipes by labels
export function categorizeByLabels(recipes: Recipe[]): Record<string, Recipe[]> {
    const categories: Record<string, Recipe[]> = {};
    
    for (const recipe of recipes) {
        for (const label of recipe.labels) {
            if (!categories[label]) {
                categories[label] = [];
            }
            categories[label].push(recipe);
        }
    }
    
    // Sort each category by popularity
    for (const label in categories) {
        categories[label].sort((a, b) => b.viewCount - a.viewCount);
    }
    
    return categories;
}

// Get recipes for quick meals (under 30 min total time)
export function filterQuickMeals(recipes: Recipe[]): Recipe[] {
    return recipes.filter(r => (r.prepTimeMinutes + r.cookTimeMinutes) <= 30);
}

// Get healthy recipes
export function filterHealthy(recipes: Recipe[]): Recipe[] {
    const healthyLabels = ['healthy', 'vegan', 'vegetarian', 'low-carb', 'gluten-free', 'keto'];
    return recipes.filter(r => r.labels.some(l => healthyLabels.includes(l)));
}

// Get comfort food recipes
export function filterComfortFood(recipes: Recipe[]): Recipe[] {
    const comfortLabels = ['comfort-food', 'hearty', 'cozy', 'warming'];
    return recipes.filter(r => r.labels.some(l => comfortLabels.includes(l)));
}

// Get recipes by cuisine
export function filterByCuisine(recipes: Recipe[], cuisine: string): Recipe[] {
    const cuisineLabels: Record<string, string[]> = {
        'italian': ['italian', 'pasta', 'pizza', 'mediterranean'],
        'asian': ['asian', 'chinese', 'japanese', 'thai', 'korean', 'vietnamese', 'indian'],
        'mexican': ['mexican', 'latin', 'tex-mex'],
        'american': ['american', 'bbq', 'southern'],
    };
    
    const labels = cuisineLabels[cuisine.toLowerCase()] || [cuisine.toLowerCase()];
    return recipes.filter(r => r.labels.some(l => labels.includes(l.toLowerCase())));
}
