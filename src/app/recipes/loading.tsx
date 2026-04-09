import { ChefHat } from 'lucide-react';

export default function RecipesLoading() {
    return (
        <div className="min-h-screen">
            {/* Hero skeleton */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Title skeleton */}
                    <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse mb-4" />
                    <div className="h-6 w-96 bg-white/5 rounded-lg animate-pulse mb-8" />

                    {/* Search skeleton */}
                    <div className="h-14 w-full max-w-2xl bg-white/5 rounded-2xl animate-pulse mb-6" />

                    {/* Filters skeleton */}
                    <div className="flex gap-2 mb-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-10 w-24 bg-white/5 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Recipe of the Day skeleton */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse mb-6" />
                    <div className="h-80 bg-white/5 rounded-3xl animate-pulse" />
                </div>
            </div>

            {/* Grid skeleton */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 w-40 bg-white/5 rounded-lg animate-pulse mb-6" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05]">
                                <div className="aspect-[4/3] bg-white/5 animate-pulse" />
                                <div className="p-4 space-y-3">
                                    <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                    <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
                                    <div className="flex gap-4 pt-2">
                                        <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                                        <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Loading indicator */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-white/10">
                    <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                    </div>
                    <span className="text-sm text-zinc-400">Loading recipes...</span>
                </div>
            </div>
        </div>
    );
}
