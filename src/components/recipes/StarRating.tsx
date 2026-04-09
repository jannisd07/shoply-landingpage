'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onRate?: (rating: number) => void;
    showCount?: boolean;
    ratingCount?: number;
    className?: string;
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = 'md',
    interactive = false,
    onRate,
    showCount = false,
    ratingCount = 0,
    className,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const gaps = {
        sm: 'gap-0.5',
        md: 'gap-1',
        lg: 'gap-1.5',
    };

    const handleClick = (index: number) => {
        if (interactive && onRate) {
            onRate(index);
        }
    };

    const handleMouseEnter = (index: number) => {
        if (interactive) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (interactive) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div className={cn('flex items-center', gaps[size], className)}>
            <div
                className={cn('flex items-center', gaps[size])}
                onMouseLeave={handleMouseLeave}
            >
                {[...Array(maxRating)].map((_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= Math.floor(displayRating);
                    const isPartial = !isFilled && starValue - 0.5 <= displayRating;

                    return (
                        <motion.button
                            key={index}
                            type="button"
                            onClick={() => handleClick(starValue)}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            disabled={!interactive}
                            className={cn(
                                'relative',
                                interactive && 'cursor-pointer'
                            )}
                            whileHover={interactive ? { scale: 1.2 } : undefined}
                            whileTap={interactive ? { scale: 0.9 } : undefined}
                        >
                            {/* Background star (empty) */}
                            <Star
                                className={cn(
                                    sizes[size],
                                    'text-zinc-600'
                                )}
                            />

                            {/* Filled star overlay */}
                            {(isFilled || isPartial) && (
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ width: isPartial ? '50%' : '100%' }}
                                >
                                    <Star
                                        className={cn(
                                            sizes[size],
                                            'text-amber-400 fill-amber-400'
                                        )}
                                    />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Rating text */}
            {(rating > 0 || showCount) && (
                <div className={cn(
                    'flex items-center gap-1.5 ml-1',
                    size === 'sm' && 'text-xs',
                    size === 'md' && 'text-sm',
                    size === 'lg' && 'text-base'
                )}>
                    {rating > 0 && (
                        <span className="text-white font-semibold">
                            {rating.toFixed(1)}
                        </span>
                    )}
                    {showCount && ratingCount > 0 && (
                        <span className="text-zinc-500">
                            ({ratingCount})
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
