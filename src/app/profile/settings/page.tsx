'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Lock, Trash2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase/client';

export default function SettingsPage() {
    const { language } = useLanguage();
    const router = useRouter();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        async function loadUser() {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.push('/auth/login?redirect=/profile/settings');
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: profile } = await (supabase.from('users') as any).select('display_name').eq('id', user.id).single();

            setEmail(user.email || '');
            setDisplayName(profile?.display_name || user.user_metadata?.display_name || '');
            setIsLoading(false);
        }

        loadUser();
    }, [router]);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // Update user metadata
            await supabase.auth.updateUser({
                data: { display_name: displayName }
            });

            // Update profile in database
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from('users') as any).update({ 
                display_name: displayName,
                updated_at: new Date().toISOString()
            }).eq('id', user.id);

            setMessage({ 
                type: 'success', 
                text: language === 'de' ? 'Änderungen gespeichert' : 'Changes saved' 
            });
        } catch (err: any) {
            setMessage({ 
                type: 'error', 
                text: err.message || (language === 'de' ? 'Fehler beim Speichern' : 'Failed to save') 
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = confirm(
            language === 'de' 
                ? 'Bist du sicher, dass du dein Konto löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.'
                : 'Are you sure you want to delete your account? This action cannot be undone.'
        );

        if (!confirmed) return;

        try {
            // Note: Account deletion requires server-side implementation
            alert(language === 'de' 
                ? 'Bitte kontaktiere den Support, um dein Konto zu löschen.'
                : 'Please contact support to delete your account.');
        } catch (err) {
            console.error('Error deleting account:', err);
        }
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
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            href="/profile"
                            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white">
                            {language === 'de' ? 'Einstellungen' : 'Settings'}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Message */}
            {message && (
                <section className="px-4 sm:px-6 lg:px-8 pb-4">
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl text-sm ${
                                message.type === 'success' 
                                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                            }`}
                        >
                            {message.text}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Profile Settings */}
            <section className="px-4 sm:px-6 lg:px-8 pb-6">
                <div className="max-w-2xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-white">
                                    {language === 'de' ? 'Profil' : 'Profile'}
                                </h2>
                                <p className="text-sm text-zinc-500">
                                    {language === 'de' ? 'Deine persönlichen Daten' : 'Your personal information'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    {language === 'de' ? 'Anzeigename' : 'Display Name'}
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                                        text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50
                                        transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    {language === 'de' ? 'E-Mail' : 'Email'}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05]
                                        text-zinc-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-zinc-600 mt-1">
                                    {language === 'de' ? 'E-Mail kann nicht geändert werden' : 'Email cannot be changed'}
                                </p>
                            </div>

                            <motion.button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                                    bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                {isSaving ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    language === 'de' ? 'Speichern' : 'Save Changes'
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Password */}
            <section className="px-4 sm:px-6 lg:px-8 pb-6">
                <div className="max-w-2xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-white">
                                    {language === 'de' ? 'Passwort' : 'Password'}
                                </h2>
                                <p className="text-sm text-zinc-500">
                                    {language === 'de' ? 'Passwort ändern' : 'Change your password'}
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/auth/forgot-password"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                                bg-white/[0.05] text-zinc-300 hover:bg-white/[0.08] transition-colors"
                        >
                            {language === 'de' ? 'Passwort zurücksetzen' : 'Reset Password'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-white">
                                    {language === 'de' ? 'Gefahrenzone' : 'Danger Zone'}
                                </h2>
                                <p className="text-sm text-zinc-500">
                                    {language === 'de' ? 'Konto löschen' : 'Delete your account'}
                                </p>
                            </div>
                        </div>

                        <motion.button
                            onClick={handleDeleteAccount}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                                bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <Trash2 className="w-4 h-4" />
                            {language === 'de' ? 'Konto löschen' : 'Delete Account'}
                        </motion.button>
                    </div>
                </div>
            </section>
        </div>
    );
}
