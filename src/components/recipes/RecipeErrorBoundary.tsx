'use client';

import { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ChefHat } from 'lucide-react';
import Link from 'next/link';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class RecipeErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Recipe Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-md"
                    >
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Something went wrong
                        </h2>
                        <p className="text-zinc-400 mb-6">
                            We couldn&apos;t load this content. Please try again or go back to recipes.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <motion.button
                                onClick={() => this.setState({ hasError: false })}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white
                  hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </motion.button>
                            <Link
                                href="/recipes"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white
                  hover:bg-blue-600 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Back to Recipes
                            </Link>
                        </div>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Empty State Components
interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    action?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
        >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                {icon || <ChefHat className="w-8 h-8 text-zinc-600" />}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-zinc-400 max-w-sm mx-auto mb-6">{description}</p>
            {action && (
                action.href ? (
                    <Link
                        href={action.href}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white
              font-medium hover:bg-blue-600 transition-colors"
                    >
                        {action.label}
                    </Link>
                ) : (
                    <motion.button
                        onClick={action.onClick}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white
              font-medium hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {action.label}
                    </motion.button>
                )
            )}
        </motion.div>
    );
}

// Loading State Component
export function RecipeLoadingState() {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                    <ChefHat className="w-5 h-5 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-zinc-400 text-sm">Loading recipes...</p>
            </div>
        </div>
    );
}

// Not Found State Component
export function RecipeNotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md"
            >
                <div className="text-8xl mb-4">🍳</div>
                <h2 className="text-2xl font-bold text-white mb-2">Recipe Not Found</h2>
                <p className="text-zinc-400 mb-6">
                    This recipe might have been removed or doesn&apos;t exist. Try browsing our collection!
                </p>
                <Link
                    href="/recipes"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white
            font-medium hover:bg-blue-600 transition-colors"
                >
                    <ChefHat className="w-5 h-5" />
                    Browse Recipes
                </Link>
            </motion.div>
        </div>
    );
}
