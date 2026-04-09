'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
    const { language } = useLanguage();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            });

            if (error) throw error;

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || (language === 'de' ? 'Fehler beim Senden' : 'Failed to send'));
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        {language === 'de' ? 'E-Mail gesendet' : 'Email sent'}
                    </h1>
                    <p className="text-zinc-400 mb-6">
                        {language === 'de' 
                            ? `Wir haben einen Link zum Zurücksetzen des Passworts an ${email} gesendet.`
                            : `We've sent a password reset link to ${email}.`}
                    </p>
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                    >
                        {language === 'de' ? 'Zur Anmeldung' : 'Back to Login'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back button */}
                <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {language === 'de' ? 'Zurück zur Anmeldung' : 'Back to login'}
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {language === 'de' ? 'Passwort vergessen?' : 'Forgot password?'}
                    </h1>
                    <p className="text-zinc-400">
                        {language === 'de' 
                            ? 'Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen.' 
                            : "Enter your email and we'll send you a reset link."}
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            {language === 'de' ? 'E-Mail' : 'Email'}
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={language === 'de' ? 'deine@email.de' : 'your@email.com'}
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                                    text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50
                                    transition-colors"
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                            bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            language === 'de' ? 'Link senden' : 'Send Reset Link'
                        )}
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
