'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MoreVertical, Edit2, Trash2, Flag, Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl?: string;
    text: string;
    createdAt: Date;
    likesCount: number;
    isLiked?: boolean;
    replies?: Comment[];
}

interface CommentsSectionProps {
    recipeId: string;
    comments: Comment[];
    totalCount: number;
    currentUserId?: string;
}

export function CommentsSection({ recipeId, comments: initialComments, totalCount, currentUserId }: CommentsSectionProps) {
    const { language } = useLanguage();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const comment: Comment = {
            id: Date.now().toString(),
            userId: currentUserId || 'guest',
            userName: 'You',
            text: newComment,
            createdAt: new Date(),
            likesCount: 0,
            isLiked: false,
        };

        setComments([comment, ...comments]);
        setNewComment('');
        setIsSubmitting(false);
    };

    const handleEdit = (comment: Comment) => {
        setEditingId(comment.id);
        setEditText(comment.text);
        setActiveMenu(null);
    };

    const handleSaveEdit = async (commentId: string) => {
        if (!editText.trim()) return;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        setComments(comments.map(c =>
            c.id === commentId ? { ...c, text: editText } : c
        ));
        setEditingId(null);
        setEditText('');
    };

    const handleDelete = async (commentId: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        setComments(comments.filter(c => c.id !== commentId));
        setActiveMenu(null);
    };

    const handleLike = async (commentId: string) => {
        setComments(comments.map(c =>
            c.id === commentId
                ? { ...c, isLiked: !c.isLiked, likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1 }
                : c
        ));
        // TODO: API call
    };

    const formatDate = (date: Date) => {
        return formatDistanceToNow(date, {
            addSuffix: true,
            locale: language === 'de' ? de : enUS,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    {language === 'de' ? 'Kommentare' : 'Comments'}
                    <span className="text-zinc-500 font-normal">({totalCount})</span>
                </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30
          flex items-center justify-center text-blue-400 font-semibold">
                    {currentUserId ? 'Y' : '?'}
                </div>
                <div className="flex-1 relative">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={language === 'de' ? 'Schreibe einen Kommentar...' : 'Write a comment...'}
                        rows={2}
                        className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10
              text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                    <motion.button
                        type="submit"
                        disabled={!newComment.trim() || isSubmitting}
                        className={cn(
                            'absolute right-3 bottom-3 p-2 rounded-lg transition-colors',
                            newComment.trim() && !isSubmitting
                                ? 'text-blue-400 hover:bg-blue-500/20'
                                : 'text-zinc-600 cursor-not-allowed'
                        )}
                        whileHover={newComment.trim() ? { scale: 1.1 } : {}}
                        whileTap={newComment.trim() ? { scale: 0.9 } : {}}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {comments.map((comment) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex gap-3"
                        >
                            {/* Avatar */}
                            <Link href={`/recipes/author/${comment.userId}`} className="flex-shrink-0">
                                {comment.userAvatarUrl ? (
                                    <Image
                                        src={comment.userAvatarUrl}
                                        alt={comment.userName}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700
                    flex items-center justify-center text-zinc-400 font-medium">
                                        {comment.userName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Link
                                        href={`/recipes/author/${comment.userId}`}
                                        className="font-medium text-white hover:text-blue-400 transition-colors"
                                    >
                                        {comment.userName}
                                    </Link>
                                    <span className="text-zinc-500 text-sm">
                                        {formatDate(comment.createdAt)}
                                    </span>
                                </div>

                                {editingId === comment.id ? (
                                    <div className="space-y-2">
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10
                        text-white focus:outline-none focus:border-blue-500/50 resize-none"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSaveEdit(comment.id)}
                                                className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm font-medium
                          hover:bg-blue-600 transition-colors"
                                            >
                                                {language === 'de' ? 'Speichern' : 'Save'}
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="px-3 py-1 rounded-lg bg-white/5 text-zinc-400 text-sm
                          hover:bg-white/10 transition-colors"
                                            >
                                                {language === 'de' ? 'Abbrechen' : 'Cancel'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-zinc-300">{comment.text}</p>
                                )}

                                {/* Actions */}
                                {editingId !== comment.id && (
                                    <div className="flex items-center gap-4 mt-2">
                                        <button
                                            onClick={() => handleLike(comment.id)}
                                            className={cn(
                                                'flex items-center gap-1 text-sm transition-colors',
                                                comment.isLiked ? 'text-rose-400' : 'text-zinc-500 hover:text-zinc-300'
                                            )}
                                        >
                                            <Heart className={cn('w-4 h-4', comment.isLiked && 'fill-current')} />
                                            {comment.likesCount > 0 && comment.likesCount}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setActiveMenu(activeMenu === comment.id ? null : comment.id)}
                                    className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>

                                <AnimatePresence>
                                    {activeMenu === comment.id && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute right-0 top-full mt-1 py-2 w-40 rounded-xl
                        bg-zinc-900 border border-white/10 shadow-xl z-10"
                                        >
                                            {comment.userId === currentUserId ? (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(comment)}
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-300
                              hover:bg-white/5 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                        {language === 'de' ? 'Bearbeiten' : 'Edit'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(comment.id)}
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400
                              hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        {language === 'de' ? 'Löschen' : 'Delete'}
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setActiveMenu(null)}
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-300
                            hover:bg-white/5 transition-colors"
                                                >
                                                    <Flag className="w-4 h-4" />
                                                    {language === 'de' ? 'Melden' : 'Report'}
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {comments.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                >
                    <MessageCircle className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                    <p className="text-zinc-500">
                        {language === 'de'
                            ? 'Noch keine Kommentare. Sei der Erste!'
                            : 'No comments yet. Be the first!'}
                    </p>
                </motion.div>
            )}

            {/* Load More */}
            {comments.length < totalCount && (
                <motion.button
                    className="w-full py-3 rounded-xl bg-white/5 text-zinc-400 
            hover:bg-white/10 hover:text-white transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    {language === 'de' ? 'Mehr Kommentare laden' : 'Load more comments'}
                </motion.button>
            )}
        </div>
    );
}
