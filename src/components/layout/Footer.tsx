'use client';

import { Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    product: [
      { label: t.footer.links.features, href: '#features' },
      { label: t.footer.links.howItWorks, href: '#experience' },
      { label: t.footer.links.pricing, href: '/pricing' },
      { label: t.footer.links.faq, href: '/faq' },
    ],
    company: [
      { label: t.footer.links.about, href: '/about' },
    ],
    legal: [
      { label: t.footer.links.privacy, href: '/privacy' },
      { label: t.footer.links.terms, href: '/terms' },
    ],
  };

  return (
    <footer className="relative pt-20 bg-[#0a0a0a] border-t border-zinc-800/50">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-[#0d0d0d] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Shoply
              </span>
              <span className="w-2 h-2 rounded-full bg-[blue-500]" />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm">
              {t.footer.description}
            </p>
            {/* Accent badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[blue-500]/10 border border-[blue-500]/20">
              <Sparkles className="w-3.5 h-3.5 text-[blue-500]" />
              <span className="text-xs text-[blue-500] font-medium">AI-Powered</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-zinc-50 font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.product}</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="text-zinc-400 text-sm hover:text-[blue-500] transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-zinc-400 text-sm hover:text-[blue-500] transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-zinc-50 font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.company}</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-zinc-400 text-sm hover:text-[blue-500] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-zinc-50 font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.legal}</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-zinc-400 text-sm hover:text-[blue-500] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="text-zinc-500 text-sm flex items-center gap-1.5">
            {t.footer.builtWith} <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> {t.footer.inGermany}
          </p>
        </div>
      </div>
    </footer>
  );
}
