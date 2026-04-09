import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecipeDetailContent from './RecipeDetailContent';
import { generateRecipeJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/jsonld';
import { getRecipeById } from '@/lib/supabase/recipes';

// Fetch recipe from database
async function getRecipe(id: string) {
    try {
        const recipe = await getRecipeById(id);
        return recipe;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return null;
    }
}

interface RecipePageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
    const { id } = await params;
    const recipe = await getRecipe(id);

    if (!recipe) {
        return {
            title: 'Recipe Not Found - Avo',
        };
    }

    return {
        title: `${recipe.name} - Avo Recipes`,
        description: recipe.description,
        openGraph: {
            title: `${recipe.name} - Avo Recipes`,
            description: recipe.description,
            url: `https://avo.app/recipes/${id}`,
            siteName: 'Avo',
            images: recipe.imageUrl ? [{ url: recipe.imageUrl }] : [],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: recipe.name,
            description: recipe.description,
            images: recipe.imageUrl ? [recipe.imageUrl] : [],
        },
    };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
    const { id } = await params;
    const recipe = await getRecipe(id);

    if (!recipe) {
        notFound();
    }

    // Transform nutrition for JSON-LD
    const recipeForJsonLd = {
        ...recipe,
        instructions: recipe.instructions.map((text, index) => ({
            stepNumber: index + 1,
            text,
        })),
        nutrition: recipe.nutrition ? {
            calories: recipe.nutrition.calories,
            protein: recipe.nutrition.proteinG,
            carbs: recipe.nutrition.carbsG,
            fat: recipe.nutrition.fatG,
            fiber: recipe.nutrition.fiberG,
            sugar: recipe.nutrition.sugarG,
        } : undefined,
    };

    const recipeUrl = `https://avo.app/recipes/${id}`;

    const breadcrumbs = [
        { name: 'Home', url: 'https://avo.app' },
        { name: 'Recipes', url: 'https://avo.app/recipes' },
        { name: recipe.name, url: recipeUrl },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: generateRecipeJsonLd({ recipe: recipeForJsonLd as any, url: recipeUrl }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: generateBreadcrumbJsonLd({ items: breadcrumbs }),
                }}
            />
            <RecipeDetailContent recipe={recipe} />
        </>
    );
}
