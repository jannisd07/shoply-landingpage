'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function RecipesError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Recipes Error:', error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-lg"
            >
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-3">
                    Oops! Something went wrong
                </h1>

                <p className="text-zinc-400 mb-8">
                    We encountered an error while loading the recipes. This might be a temporary issue.
                    Please try again or return to the recipes homepage.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <motion.button
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white
              border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </motion.button>

                    <Link
                        href="/recipes"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white
              hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center"
                    >
                        <Home className="w-5 h-5" />
                        Back to Recipes
                    </Link>
                </div>

                {process.env.NODE_ENV === 'development' && error.message && (
                    <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left">
                        <p className="text-red-400 text-sm font-mono break-all">
                            {error.message}
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
