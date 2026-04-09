import type { Recipe } from '@/lib/types/recipe';

interface RecipeJsonLdProps {
    recipe: Recipe;
    url: string;
}

export function generateRecipeJsonLd({ recipe, url }: RecipeJsonLdProps) {
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: recipe.name,
        description: recipe.description,
        image: recipe.imageUrl ? [recipe.imageUrl] : [],
        author: {
            '@type': 'Person',
            name: recipe.authorName,
        },
        datePublished: recipe.createdAt.toISOString(),
        prepTime: `PT${recipe.prepTimeMinutes}M`,
        cookTime: `PT${recipe.cookTimeMinutes}M`,
        totalTime: `PT${totalTime}M`,
        recipeYield: `${recipe.defaultServings} servings`,
        recipeCategory: recipe.labels[0] || 'Main Course',
        recipeCuisine: recipe.labels.find(l =>
            ['italian', 'asian', 'mexican', 'american', 'french', 'indian'].includes(l)
        ) || 'International',
        keywords: recipe.labels.join(', '),
        recipeIngredient: recipe.ingredients.map(ing =>
            `${ing.amount} ${ing.unit} ${ing.name}`
        ),
        recipeInstructions: recipe.instructions.map((inst, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            text: inst.text,
        })),
        aggregateRating: recipe.ratingCount > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: recipe.averageRating,
            ratingCount: recipe.ratingCount,
            bestRating: 5,
            worstRating: 1,
        } : undefined,
        nutrition: recipe.nutrition ? {
            '@type': 'NutritionInformation',
            calories: `${recipe.nutrition.calories} calories`,
            proteinContent: `${recipe.nutrition.protein}g`,
            carbohydrateContent: `${recipe.nutrition.carbs}g`,
            fatContent: `${recipe.nutrition.fat}g`,
            fiberContent: recipe.nutrition.fiber ? `${recipe.nutrition.fiber}g` : undefined,
            sugarContent: recipe.nutrition.sugar ? `${recipe.nutrition.sugar}g` : undefined,
            sodiumContent: recipe.nutrition.sodium ? `${recipe.nutrition.sodium}mg` : undefined,
        } : undefined,
        url,
    };

    return JSON.stringify(jsonLd);
}

interface BreadcrumbJsonLdProps {
    items: Array<{ name: string; url: string }>;
}

export function generateBreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return JSON.stringify(jsonLd);
}

interface AuthorJsonLdProps {
    author: {
        displayName: string;
        bio?: string;
        avatarUrl?: string;
        recipeCount: number;
    };
    url: string;
}

export function generateAuthorJsonLd({ author, url }: AuthorJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.displayName,
        description: author.bio,
        image: author.avatarUrl,
        url,
        interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/WriteAction',
            userInteractionCount: author.recipeCount,
        },
    };

    return JSON.stringify(jsonLd);
}

interface WebsiteJsonLdProps {
    name: string;
    url: string;
    description: string;
}

export function generateWebsiteJsonLd({ name, url, description }: WebsiteJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        description,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${url}/recipes/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return JSON.stringify(jsonLd);
}
