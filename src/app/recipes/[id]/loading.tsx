export default function RecipeDetailLoading() {
    return (
        <div className="min-h-screen">
            {/* Hero skeleton */}
            <div className="relative h-[40vh] md:h-[50vh] bg-white/5 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />

                {/* Back button skeleton */}
                <div className="absolute top-4 left-4 w-24 h-10 bg-white/10 rounded-xl animate-pulse" />

                {/* Action buttons skeleton */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
                    <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
                </div>

                {/* Title area skeleton */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <div className="flex gap-2">
                            <div className="w-16 h-6 bg-white/10 rounded-full animate-pulse" />
                            <div className="w-20 h-6 bg-white/10 rounded-full animate-pulse" />
                        </div>
                        <div className="h-12 w-3/4 bg-white/10 rounded-xl animate-pulse" />
                        <div className="flex gap-6">
                            <div className="w-24 h-6 bg-white/10 rounded animate-pulse" />
                            <div className="w-24 h-6 bg-white/10 rounded animate-pulse" />
                            <div className="w-32 h-6 bg-white/10 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content skeleton */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
                            </div>

                            {/* Time cards */}
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                        <div className="h-4 w-20 bg-white/5 rounded animate-pulse mb-2 mx-auto" />
                                        <div className="h-6 w-16 bg-white/5 rounded animate-pulse mx-auto" />
                                    </div>
                                ))}
                            </div>

                            {/* Instructions */}
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-4">
                                <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-8 h-8 bg-white/5 rounded-full animate-pulse flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                            <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Ingredients */}
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-4">
                                <div className="h-6 w-28 bg-white/5 rounded animate-pulse" />
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-5 h-5 bg-white/5 rounded animate-pulse" />
                                        <div className="h-4 flex-1 bg-white/5 rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>

                            {/* Nutrition */}
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-4">
                                <div className="h-6 w-24 bg-white/5 rounded animate-pulse" />
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="text-center">
                                            <div className="h-8 w-12 bg-white/5 rounded animate-pulse mx-auto mb-1" />
                                            <div className="h-3 w-16 bg-white/5 rounded animate-pulse mx-auto" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Author */}
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/5 rounded-full animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-5 w-24 bg-white/5 rounded animate-pulse" />
                                        <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="h-14 w-full bg-blue-500/20 rounded-xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
