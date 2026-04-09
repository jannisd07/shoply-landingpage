import { Metadata } from 'next';
import RecipeNavigation from '@/components/recipes/RecipeNavigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: {
        default: 'Recipes - Avo',
        template: '%s | Avo Recipes',
    },
    description: 'Discover delicious recipes from the Avo community. Browse thousands of recipes, filter by diet, cuisine, and cooking time.',
    keywords: ['recipes', 'cooking', 'food', 'meals', 'healthy recipes', 'quick recipes', 'dinner ideas', 'Avo'],
    authors: [{ name: 'Avo' }],
    creator: 'Avo',
    publisher: 'Avo',
    openGraph: {
        title: 'Recipes - Avo',
        description: 'Discover delicious recipes from the Avo community',
        url: 'https://avo.app/recipes',
        siteName: 'Avo',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/og-recipes.png',
                width: 1200,
                height: 630,
                alt: 'Avo Recipes',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Recipes - Avo',
        description: 'Discover delicious recipes from the Avo community',
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
        canonical: 'https://avo.app/recipes',
        languages: {
            'en-US': 'https://avo.app/recipes',
            'de-DE': 'https://avo.app/de/recipes',
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
