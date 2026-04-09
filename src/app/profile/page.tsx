'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
    User, Settings, LogOut, ChefHat, Bookmark, FileText, 
    ChevronRight, Camera, Mail, Calendar
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase/client';

interface UserProfile {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    createdAt: string;
}

export default function ProfilePage() {
    const { language } = useLanguage();
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ recipes: 0, saved: 0, drafts: 0 });

    useEffect(() => {
        async function loadProfile() {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            
            if (!authUser) {
                router.push('/auth/login?redirect=/profile');
                return;
            }

            // Get user profile from database (handle if table doesn't exist)
            let profile: { display_name?: string; avatar_url?: string } | null = null;
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data } = await (supabase.from('users') as any).select('*').eq('id', authUser.id).single();
                profile = data;
            } catch (e) {
                // Table might not exist
            }

            // Helper to get display name (never show email)
            const getDisplayName = (name: string | null | undefined, email: string | null | undefined): string => {
                if (name && !name.includes('@')) return name;
                if (email) {
                    const namePart = email.split('@')[0];
                    return namePart
                        .replace(/[._]/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ');
                }
                return 'User';
            };

            setUser({
                id: authUser.id,
                email: authUser.email || '',
                displayName: getDisplayName(
                    profile?.display_name || authUser.user_metadata?.display_name,
                    authUser.email
                ),
                avatarUrl: profile?.avatar_url || authUser.user_metadata?.avatar_url,
                createdAt: authUser.created_at,
            });

            // Get stats
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { count: recipeCount } = await (supabase.from('recipes') as any).select('*', { count: 'exact', head: true }).eq('author_id', authUser.id);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { count: savedCount } = await (supabase.from('saved_recipes') as any).select('*', { count: 'exact', head: true }).eq('user_id', authUser.id);

            // Get drafts from localStorage
            const drafts = localStorage.getItem(`recipe_drafts_${authUser.id}`);
            const draftCount = drafts ? JSON.parse(drafts).length : 0;

            setStats({
                recipes: recipeCount || 0,
                saved: savedCount || 0,
                drafts: draftCount,
            });

            setIsLoading(false);
        }

        loadProfile();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/recipes');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
            month: 'long',
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

    if (!user) return null;

    return (
        <div className="min-h-screen pb-16">
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-white">
                            {language === 'de' ? 'Profil' : 'Profile'}
                        </h1>
                        <Link
                            href="/profile/settings"
                            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Profile Card */}
            <section className="px-4 sm:px-6 lg:px-8 pb-6">
                <div className="max-w-2xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                        <div className="flex items-center gap-4 mb-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center overflow-hidden">
                                    {user.avatarUrl ? (
                                        <Image
                                            src={user.avatarUrl}
                                            alt={user.displayName}
                                            width={80}
                                            height={80}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-3xl font-bold text-blue-400">
                                            {user.displayName.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-500 text-white">
                                    <Camera className="w-3 h-3" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
                                <p className="text-zinc-400 text-sm flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {user.email}
                                </p>
                                <p className="text-zinc-500 text-xs flex items-center gap-1 mt-1">
                                    <Calendar className="w-3 h-3" />
                                    {language === 'de' ? 'Mitglied seit' : 'Member since'} {formatDate(user.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                                <p className="text-2xl font-bold text-white">{stats.recipes}</p>
                                <p className="text-xs text-zinc-500">{language === 'de' ? 'Rezepte' : 'Recipes'}</p>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                                <p className="text-2xl font-bold text-white">{stats.saved}</p>
                                <p className="text-xs text-zinc-500">{language === 'de' ? 'Gespeichert' : 'Saved'}</p>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                                <p className="text-2xl font-bold text-white">{stats.drafts}</p>
                                <p className="text-xs text-zinc-500">{language === 'de' ? 'Entwürfe' : 'Drafts'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Items */}
            <section className="px-4 sm:px-6 lg:px-8 pb-6">
                <div className="max-w-2xl mx-auto space-y-2">
                    <Link href="/recipes/my">
                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
                            whileHover={{ x: 4 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <ChefHat className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-white">{language === 'de' ? 'Meine Rezepte' : 'My Recipes'}</p>
                                <p className="text-sm text-zinc-500">{stats.recipes} {language === 'de' ? 'Rezepte' : 'recipes'}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-500" />
                        </motion.div>
                    </Link>

                    <Link href="/recipes/saved">
                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
                            whileHover={{ x: 4 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Bookmark className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-white">{language === 'de' ? 'Gespeicherte Rezepte' : 'Saved Recipes'}</p>
                                <p className="text-sm text-zinc-500">{stats.saved} {language === 'de' ? 'gespeichert' : 'saved'}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-500" />
                        </motion.div>
                    </Link>

                    <Link href="/recipes/drafts">
                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
                            whileHover={{ x: 4 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-white">{language === 'de' ? 'Meine Entwürfe' : 'My Drafts'}</p>
                                <p className="text-sm text-zinc-500">{stats.drafts} {language === 'de' ? 'Entwürfe' : 'drafts'}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-500" />
                        </motion.div>
                    </Link>

                    <Link href="/profile/settings">
                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
                            whileHover={{ x: 4 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-zinc-500/20 flex items-center justify-center">
                                <Settings className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-white">{language === 'de' ? 'Einstellungen' : 'Settings'}</p>
                                <p className="text-sm text-zinc-500">{language === 'de' ? 'Konto & Präferenzen' : 'Account & preferences'}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-500" />
                        </motion.div>
                    </Link>
                </div>
            </section>

            {/* Logout Button */}
            <section className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl
                            bg-red-500/10 border border-red-500/20 text-red-400 font-medium
                            hover:bg-red-500/20 transition-colors"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <LogOut className="w-5 h-5" />
                        {language === 'de' ? 'Abmelden' : 'Sign Out'}
                    </motion.button>
                </div>
            </section>
        </div>
    );
}
