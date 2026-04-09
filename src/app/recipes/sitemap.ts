import { MetadataRoute } from 'next';
import { createServerClient } from '@/lib/supabase/client';

async function getRecipeIds(): Promise<string[]> {
    const supabase = createServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from('recipes') as any).select('id').limit(100);
    return data?.map((r: any) => r.id) || [];
}

async function getAuthorIds(): Promise<string[]> {
    const supabase = createServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from('recipes') as any).select('author_id').limit(100);
    const uniqueIds = [...new Set(data?.map((r: any) => r.author_id) || [])];
    return uniqueIds;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://avo.app';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/recipes`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
                {
            url: `${baseUrl}/recipes/saved`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/recipes/create`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/recipes/creators`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic recipe pages
    const recipeIds = await getRecipeIds();
    const recipePages: MetadataRoute.Sitemap = recipeIds.map((id) => ({
        url: `${baseUrl}/recipes/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Dynamic author pages
    const authorIds = await getAuthorIds();
    const authorPages: MetadataRoute.Sitemap = authorIds.map((id) => ({
        url: `${baseUrl}/recipes/author/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...recipePages, ...authorPages];
}
