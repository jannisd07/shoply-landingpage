'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface InfoPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoPageLayout({ title, children }: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0b1a0f]">
      {/* Header */}
      <header className="border-b border-black/5 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[#4a5a4f] hover:text-[#0b1a0f] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0b1a0f] mb-8" style={{ fontFamily: 'var(--font-display)' }}>{title}</h1>
          <div className="prose prose-zinc max-w-none text-[#4a5a4f]">
            {children}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#7a8a7f] text-sm">© {new Date().getFullYear()} Avo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
