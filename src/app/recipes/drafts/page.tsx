'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, FileText, Edit, Trash2, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase/client';

interface Draft {
    id: string;
    name: string;
    description: string;
    updatedAt: string;
}

export default function DraftsPage() {
    const { language } = useLanguage();
    const router = useRouter();
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        async function checkAuthAndLoadDrafts() {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.push('/auth/login?redirect=/recipes/drafts');
                return;
            }
            
            // Fetch user's drafts from localStorage (drafts are stored locally)
            const savedDrafts = localStorage.getItem(`recipe_drafts_${user.id}`);
            if (savedDrafts) {
                try {
                    const parsed = JSON.parse(savedDrafts);
                    setDrafts(parsed);
                } catch (e) {
                    console.error('Error parsing drafts:', e);
                }
            }
            
            setIsLoading(false);
        }
        
        checkAuthAndLoadDrafts();
    }, [router]);

    const handleDelete = (draftId: string) => {
        if (!confirm(language === 'de' 
            ? 'Möchtest du diesen Entwurf wirklich löschen?' 
            : 'Are you sure you want to delete this draft?')) {
            return;
        }
        
        setDeletingId(draftId);
        
        // Get current user and update localStorage
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                const updatedDrafts = drafts.filter(d => d.id !== draftId);
                localStorage.setItem(`recipe_drafts_${user.id}`, JSON.stringify(updatedDrafts));
                setDrafts(updatedDrafts);
            }
            setDeletingId(null);
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16">
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            href="/recipes"
                            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white">
                            {language === 'de' ? 'Meine Entwürfe' : 'My Drafts'}
                        </h1>
                        <div className="flex-1" />
                        <Link
                            href="/recipes/create"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">{language === 'de' ? 'Neues Rezept' : 'New Recipe'}</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Drafts List */}
            <section className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {drafts.length === 0 ? (
                        <div className="text-center py-16">
                            <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {language === 'de' ? 'Keine Entwürfe' : 'No drafts'}
                            </h2>
                            <p className="text-zinc-400 mb-6">
                                {language === 'de' 
                                    ? 'Wenn du ein Rezept erstellst und speicherst, erscheint es hier.'
                                    : 'When you save a recipe as draft, it will appear here.'}
                            </p>
                            <Link
                                href="/recipes/create"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                {language === 'de' ? 'Rezept erstellen' : 'Create Recipe'}
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {drafts.map((draft) => (
                                <motion.div
                                    key={draft.id}
                                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors"
                                    whileHover={{ x: 4 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-6 h-6 text-blue-400" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white truncate">
                                            {draft.name || (language === 'de' ? 'Unbenannter Entwurf' : 'Untitled Draft')}
                                        </h3>
                                        <p className="text-sm text-zinc-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(draft.updatedAt)}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/recipes/create?draft=${draft.id}`}
                                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(draft.id)}
                                            disabled={deletingId === draft.id}
                                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
