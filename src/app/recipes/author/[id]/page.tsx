import { Metadata } from 'next';
import AuthorProfileContent from './AuthorProfileContent';
import { getAuthorProfile, getRecipesByAuthor } from '@/lib/supabase/recipes';

// Fetch author data from database
async function getAuthor(id: string) {
    try {
        const [authorProfile, authorRecipes] = await Promise.all([
            getAuthorProfile(id),
            getRecipesByAuthor(id, 50),
        ]);

        if (!authorProfile) {
            return null;
        }

        return {
            id: authorProfile.id,
            displayName: authorProfile.displayName,
            avatarUrl: authorProfile.avatarUrl,
            bio: undefined, // Bio not in current schema
            recipeCount: authorProfile.recipeCount,
            totalViews: authorProfile.totalViews,
            averageRating: authorProfile.averageRating,
            followerCount: authorProfile.followerCount,
            joinedAt: new Date(), // Would need to add to schema
            recipes: authorRecipes,
        };
    } catch (error) {
        console.error('Error fetching author:', error);
        return null;
    }
}

interface AuthorPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
    const { id } = await params;
    const author = await getAuthor(id);

    if (!author) {
        return {
            title: 'Author Not Found - Shoply',
        };
    }

    return {
        title: `${author.displayName} - Shoply Recipes`,
        description: author.bio || `Recipes by ${author.displayName}`,
        openGraph: {
            title: `${author.displayName} - Shoply Recipes`,
            description: author.bio || `Recipes by ${author.displayName}`,
            images: author.avatarUrl ? [{ url: author.avatarUrl }] : [],
        },
    };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const { id } = await params;
    const author = await getAuthor(id);

    if (!author) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-zinc-400">Author not found</p>
            </div>
        );
    }

    return <AuthorProfileContent author={author} />;
}
