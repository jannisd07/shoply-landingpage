import { Metadata } from 'next';
import Link from 'next/link';
import { ChefHat, Search, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Recipe Not Found - Shoply',
    description: 'The recipe you are looking for could not be found.',
};

export default function RecipesNotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-8">
            <div className="text-center max-w-lg">
                <div className="text-9xl mb-6">🍳</div>

                <h1 className="text-3xl font-bold text-white mb-3">
                    Recipe Not Found
                </h1>

                <p className="text-zinc-400 text-lg mb-8">
                    We couldn&apos;t find the recipe you&apos;re looking for. It might have been
                    removed or the link might be incorrect.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/recipes"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white
              font-medium hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center"
                    >
                        <ChefHat className="w-5 h-5" />
                        Browse Recipes
                    </Link>

                    <Link
                        href="/recipes/search"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white
              border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
                    >
                        <Search className="w-5 h-5" />
                        Search Recipes
                    </Link>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mt-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
}
