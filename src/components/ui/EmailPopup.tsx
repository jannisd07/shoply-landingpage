'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailPopup({ isOpen, onClose }: EmailPopupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(t.emailPopup.success);
        setEmail('');
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || t.emailPopup.error);
      }
    } catch {
      setStatus('error');
      setMessage(t.emailPopup.connectionError);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0b1a0f]/55 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-[28px] border border-[#0b1a0f]/8 shadow-[0_40px_100px_-20px_rgba(11,26,15,0.35)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f7f6f1] border border-[#0b1a0f]/8 flex items-center justify-center text-[#4a5a4f] hover:text-[#0b1a0f] hover:bg-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Ambient green wash at top */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#e7f4ec] to-transparent pointer-events-none" />

            <div className="relative p-8">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5aa873] to-[#2d6f45] border border-[#3e8e5a]/20 shadow-[0_12px_30px_-10px_rgba(62,142,90,0.5)] flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h2
                className="text-2xl font-bold text-[#0b1a0f] text-center mb-2 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t.emailPopup.title}
              </h2>
              <p className="text-[#4a5a4f] text-center mb-6">
                {t.emailPopup.description}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPopup.placeholder}
                    className="w-full px-4 py-3.5 bg-[#fafaf7] border border-[#0b1a0f]/10 rounded-xl text-[#0b1a0f] placeholder-[#7a8a7f] focus:outline-none focus:border-[#3e8e5a]/60 focus:bg-white transition-colors"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success' || !email}
                  className="w-full px-4 py-3.5 bg-[#0b1a0f] hover:bg-[#1c2e21] rounded-xl text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(11,26,15,0.4)]"
                >
                  {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === 'success' && <CheckCircle className="w-4 h-4 text-[#9dd4ae]" />}
                  {status === 'loading'
                    ? t.emailPopup.submitting
                    : status === 'success'
                    ? t.emailPopup.subscribed
                    : t.emailPopup.button}
                </button>

                {/* Status message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 text-sm ${
                      status === 'success' ? 'text-[#2d6f45]' : 'text-[#c9583c]'
                    }`}
                  >
                    {status === 'error' && <AlertCircle className="w-4 h-4" />}
                    {message}
                  </motion.div>
                )}
              </form>

              {/* Privacy note */}
              <p className="text-xs text-[#7a8a7f] text-center mt-5">
                {t.emailPopup.privacy}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
