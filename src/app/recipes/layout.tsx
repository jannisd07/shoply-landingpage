import { Metadata } from 'next';
import RecipeNavigation from '@/components/recipes/RecipeNavigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: {
        default: 'Recipes - Shoply',
        template: '%s | Shoply Recipes',
    },
    description: 'Discover delicious recipes from the Shoply community. Browse thousands of recipes, filter by diet, cuisine, and cooking time.',
    keywords: ['recipes', 'cooking', 'food', 'meals', 'healthy recipes', 'quick recipes', 'dinner ideas', 'Shoply'],
    authors: [{ name: 'Shoply' }],
    creator: 'Shoply',
    publisher: 'Shoply',
    openGraph: {
        title: 'Recipes - Shoply',
        description: 'Discover delicious recipes from the Shoply community',
        url: 'https://shoplyai.app/recipes',
        siteName: 'Shoply',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/og-recipes.png',
                width: 1200,
                height: 630,
                alt: 'Shoply Recipes',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Recipes - Shoply',
        description: 'Discover delicious recipes from the Shoply community',
        images: ['/og-recipes.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://shoplyai.app/recipes',
        languages: {
            'en-US': 'https://shoplyai.app/recipes',
            'de-DE': 'https://shoplyai.app/de/recipes',
        },
    },
};

export default function RecipesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-dark-900">
            <RecipeNavigation />
            <main className="min-h-[calc(100vh-4rem)]">
                {children}
            </main>
            <Footer />
        </div>
    );
}
