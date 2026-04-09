import { createServerClient, supabase } from './client';
import type { RecipeRow, RecipeCommentRow, RecipeCollectionRow, IngredientData, NutritionData } from './types';
import type { Recipe, RecipeComment, RecipeCollection, RecipeAuthor, RecipeListOptions, NutritionInfo, Ingredient } from '../types/recipe';

// Helper to get display name (never show email) - for transformRecipe
function getDisplayNameForTransform(authorName: string | null | undefined, authorId?: string): string {
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
        ingredients: row.ingredients.map(transformIngredient),
        instructions: row.instructions,
        authorId: row.author_id,
        authorName: getDisplayNameForTransform(row.author_name, row.author_id),
        authorAvatarUrl: row.author_avatar_url || undefined,
        createdAt: new Date(row.created_at),
        averageRating: row.average_rating,
        ratingCount: row.rating_count,
        viewCount: row.view_count,
        labels: row.labels,
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
// Recipe Fetching
// ============================================

export async function getRecipes(options: RecipeListOptions = {}): Promise<Recipe[]> {
    const { filter, sortBy = 'newest', page = 1, limit = 20 } = options;
    const client = createServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (client.from('recipes') as any).select('*');

    // Apply filters
    if (filter?.search) {
        // Full-text search on name, description
        query = query.or(`name.ilike.%${filter.search}%,description.ilike.%${filter.search}%,author_name.ilike.%${filter.search}%`);
    }

    if (filter?.labels && filter.labels.length > 0) {
        // Filter by labels - recipe must have at least one of the labels
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
        // This is an approximation - ideally would use a computed column
        query = query.lte('prep_time_minutes', filter.maxTotalTime);
    }

    // Apply sorting
    switch (sortBy) {
        case 'popular':
            query = query.order('view_count', { ascending: false });
            break;
        case 'rating':
            query = query.order('average_rating', { ascending: false });
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
        throw new Error('Failed to fetch recipes');
    }

    return (data || []).map(transformRecipe);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
    const client = createServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (client.from('recipes') as any).select('*').eq('id', id).single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Not found
        }
        console.error('Error fetching recipe:', error);
        throw new Error('Failed to fetch recipe');
    }

    return transformRecipe(data);
}

export async function getPopularRecipes(limit = 10): Promise<Recipe[]> {
    return getRecipes({ sortBy: 'popular', limit });
}

export async function getRecentRecipes(limit = 10): Promise<Recipe[]> {
    return getRecipes({ sortBy: 'newest', limit });
}

export async function getRecipesByAuthor(authorId: string, limit = 20): Promise<Recipe[]> {
    return getRecipes({ filter: { authorId }, sortBy: 'newest', limit });
}

export async function searchRecipes(query: string, limit = 20): Promise<Recipe[]> {
    return getRecipes({ filter: { search: query }, limit });
}

// ============================================
// Recipe Collections
// ============================================

export async function getCollections(featuredOnly = false): Promise<RecipeCollection[]> {
    const client = createServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (client.from('recipe_collections') as any).select('*').order('display_order', { ascending: true });

    if (featuredOnly) {
        query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching collections:', error);
        throw new Error('Failed to fetch collections');
    }

    return (data || []).map(transformCollection);
}

export async function getCollectionWithRecipes(collectionId: string): Promise<RecipeCollection | null> {
    const client = createServerClient();

    // Get collection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: collection, error: collectionError } = await (client.from('recipe_collections') as any).select('*').eq('id', collectionId).single();

    if (collectionError) {
        if (collectionError.code === 'PGRST116') {
            return null;
        }
        throw new Error('Failed to fetch collection');
    }

    // Get recipe IDs in collection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: collectionRecipes, error: recipesError } = await (client.from('collection_recipes') as any).select('recipe_id').eq('collection_id', collectionId).order('display_order', { ascending: true });

    if (recipesError) {
        throw new Error('Failed to fetch collection recipes');
    }

    // Fetch recipes
    const recipeIds = (collectionRecipes || []).map(cr => cr.recipe_id);

    if (recipeIds.length === 0) {
        return { ...transformCollection(collection), recipes: [] };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: recipes, error: fetchError } = await (client.from('recipes') as any).select('*').in('id', recipeIds);

    if (fetchError) {
        throw new Error('Failed to fetch recipes');
    }

    return {
        ...transformCollection(collection),
        recipes: (recipes || []).map(transformRecipe),
    };
}

// ============================================
// Recipe Comments
// ============================================

export async function getRecipeComments(recipeId: string): Promise<RecipeComment[]> {
    const client = createServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (client.from('recipe_comments') as any).select(`id, recipe_id, user_id, comment, created_at, updated_at, users:user_id (display_name, avatar_url)`).eq('recipe_id', recipeId).order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Failed to fetch comments');
    }

    return (data || []).map((row: RecipeCommentRow & { users?: { display_name: string | null; avatar_url: string | null } }) => ({
        id: row.id,
        recipeId: row.recipe_id,
        userId: row.user_id,
        userName: row.users?.display_name || 'Anonymous',
        userAvatarUrl: row.users?.avatar_url || undefined,
        comment: row.comment,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    }));
}

// ============================================
// Recipe Authors
// ============================================

export async function getTopAuthors(limit = 10): Promise<RecipeAuthor[]> {
    const client = createServerClient();

    // Get recipes grouped by author
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (client.from('recipes') as any).select('author_id, author_name, author_avatar_url, average_rating, view_count').order('view_count', { ascending: false });

    if (error) {
        console.error('Error fetching authors:', error);
        throw new Error('Failed to fetch authors');
    }

    // Aggregate by author
    const authorMap = new Map<string, {
        id: string;
        displayName: string;
        avatarUrl?: string;
        recipeCount: number;
        totalViews: number;
        totalRating: number;
        ratedRecipes: number;
    }>();

    for (const recipe of data || []) {
        const existing = authorMap.get(recipe.author_id);
        if (existing) {
            existing.recipeCount++;
            existing.totalViews += recipe.view_count;
            if (recipe.average_rating > 0) {
                existing.totalRating += recipe.average_rating;
                existing.ratedRecipes++;
            }
        } else {
            authorMap.set(recipe.author_id, {
                id: recipe.author_id,
                displayName: recipe.author_name,
                avatarUrl: recipe.author_avatar_url || undefined,
                recipeCount: 1,
                totalViews: recipe.view_count,
                totalRating: recipe.average_rating > 0 ? recipe.average_rating : 0,
                ratedRecipes: recipe.average_rating > 0 ? 1 : 0,
            });
        }
    }

    // Sort by total views and take top N
    const authors = Array.from(authorMap.values())
        .sort((a, b) => b.totalViews - a.totalViews)
        .slice(0, limit)
        .map(author => ({
            id: author.id,
            displayName: author.displayName,
            avatarUrl: author.avatarUrl,
            recipeCount: author.recipeCount,
            totalViews: author.totalViews,
            averageRating: author.ratedRecipes > 0
                ? author.totalRating / author.ratedRecipes
                : 0,
            followerCount: 0, // Would need separate query
        }));

    return authors;
}

// Helper to get display name (never show email)
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

export async function getAuthorProfile(authorId: string): Promise<RecipeAuthor | null> {
    const client = createServerClient();

    // Get author's recipes - only select columns that exist in the database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: recipes, error } = await (client.from('recipes') as any).select('author_id, author_name, author_avatar_url, view_count').eq('author_id', authorId);

    if (error) {
        console.error('Error fetching author recipes:', error);
        // Return basic profile instead of null to avoid "Author not found"
        return {
            id: authorId,
            displayName: getDisplayName(null, authorId),
            avatarUrl: undefined,
            recipeCount: 0,
            totalViews: 0,
            averageRating: 0,
            followerCount: 0,
        };
    }
    
    if (!recipes || recipes.length === 0) {
        // No recipes found - return a basic profile
        return {
            id: authorId,
            displayName: getDisplayName(null, authorId),
            avatarUrl: undefined,
            recipeCount: 0,
            totalViews: 0,
            averageRating: 0,
            followerCount: 0,
        };
    }

    const firstRecipe = recipes[0];
    const totalViews = recipes.reduce((sum, r) => sum + (r.view_count || 0), 0);

    // Get follower count (handle if table doesn't exist)
    let followerCount = 0;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { count } = await (client.from('creator_follows') as any).select('*', { count: 'exact', head: true }).eq('creator_id', authorId);
        followerCount = count || 0;
    } catch (e) {
        // Table might not exist
    }

    return {
        id: authorId,
        displayName: getDisplayName(firstRecipe.author_name, authorId),
        avatarUrl: firstRecipe.author_avatar_url || undefined,
        recipeCount: recipes.length,
        totalViews,
        averageRating: 0, // Column doesn't exist in database
        followerCount,
    };
}

// ============================================
// Recipe of the Day
// ============================================

export async function getRecipeOfTheDay(): Promise<Recipe | null> {
    const client = createServerClient();
    const today = new Date().toISOString().split('T')[0];

    // Check if there's a featured recipe for today
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: featured } = await (client.from('recipe_of_the_day') as any).select('recipe_id').eq('date', today).single();

    if (featured?.recipe_id) {
        return getRecipeById(featured.recipe_id);
    }

    // Fall back to highest-rated recipe
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (client.from('recipes') as any).select('*').gte('rating_count', 3).order('average_rating', { ascending: false }).limit(1).single();

    return data ? transformRecipe(data) : null;
}

// ============================================
// Client-side mutations (require auth)
// ============================================

export async function incrementViewCount(recipeId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_view_count', { recipe_id: recipeId });
    if (error) {
        console.error('Error incrementing view count:', error);
    }
}

export async function saveRecipe(recipeId: string, userId: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('saved_recipes') as any).insert({ user_id: userId, recipe_id: recipeId });

    if (error && error.code !== '23505') { // Ignore duplicate
        throw new Error('Failed to save recipe');
    }
}

export async function unsaveRecipe(recipeId: string, userId: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('saved_recipes') as any).delete().eq('user_id', userId).eq('recipe_id', recipeId);

    if (error) {
        throw new Error('Failed to unsave recipe');
    }
}

export async function getSavedRecipeIds(userId: string): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('saved_recipes') as any).select('recipe_id').eq('user_id', userId);

    if (error) {
        console.error('Error fetching saved recipes:', error);
        return [];
    }

    return (data || []).map(r => r.recipe_id);
}

export async function rateRecipe(recipeId: string, userId: string, rating: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('recipe_ratings') as any).upsert({ recipe_id: recipeId, user_id: userId, rating }, { onConflict: 'recipe_id,user_id' });

    if (error) {
        throw new Error('Failed to rate recipe');
    }
}

export async function addComment(recipeId: string, userId: string, comment: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('recipe_comments') as any).insert({ recipe_id: recipeId, user_id: userId, comment });

    if (error) {
        throw new Error('Failed to add comment');
    }
}

export async function deleteComment(commentId: string, userId: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('recipe_comments') as any).delete().eq('id', commentId).eq('user_id', userId);

    if (error) {
        throw new Error('Failed to delete comment');
    }
}
