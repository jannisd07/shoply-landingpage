'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const allLinks = [
    { label: t.footer.links.features, href: '#features' },
    { label: t.footer.links.howItWorks, href: '#experience' },
    { label: t.footer.links.pricing, href: '/pricing' },
    { label: t.footer.links.faq, href: '/faq' },
    { label: t.footer.links.about, href: '/about' },
    { label: t.footer.links.privacy, href: '/privacy' },
    { label: t.footer.links.terms, href: '/terms' },
    { label: t.footer.links.impressum, href: '/impressum' },
  ];

  return (
    <footer className="relative bg-[#f7f6f1] border-t border-[#0b1a0f]/8">
      {/* Mobile footer — ultra compact */}
      <div className="md:hidden px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image src="/images/avo-logo.png" alt="Avo" width={28} height={28} className="object-contain rounded-lg" />
            <span className="text-base font-bold text-[#0b1a0f]" style={{ fontFamily: 'var(--font-display)' }}>Avo</span>
          </div>
          <p className="text-[#7a8a7f] text-xs flex items-center gap-1">
            {t.footer.builtWith} <Heart className="w-3 h-3 text-[#c9583c] fill-[#c9583c]" /> {t.footer.inGermany}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          {allLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link key={link.label} href={link.href} className="text-[#7a8a7f] text-xs hover:text-[#3e8e5a] transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="text-[#7a8a7f] text-xs hover:text-[#3e8e5a] transition-colors">
                {link.label}
              </a>
            )
          )}
        </div>
        <p className="text-[#7a8a7f] text-xs">© {new Date().getFullYear()} {t.footer.copyright}</p>
      </div>

      {/* Desktop footer */}
      <div className="hidden md:block relative max-w-7xl mx-auto px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/images/avo-logo.png" alt="Avo" width={40} height={40} className="object-contain rounded-xl" />
              <span className="text-2xl font-bold text-[#0b1a0f] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Avo
              </span>
            </div>
            <p className="text-[#4a5a4f] text-sm leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[#0b1a0f] font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.product}</h3>
            <ul className="space-y-3">
              {[
                { label: t.footer.links.features, href: '#features' },
                { label: t.footer.links.howItWorks, href: '#experience' },
                { label: t.footer.links.pricing, href: '/pricing' },
                { label: t.footer.links.faq, href: '/faq' },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="text-[#4a5a4f] text-sm hover:text-[#3e8e5a] transition-colors">{link.label}</Link>
                  ) : (
                    <a href={link.href} className="text-[#4a5a4f] text-sm hover:text-[#3e8e5a] transition-colors">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#0b1a0f] font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.company}</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[#4a5a4f] text-sm hover:text-[#3e8e5a] transition-colors">{t.footer.links.about}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#0b1a0f] font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.legal}</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-[#4a5a4f] text-sm hover:text-[#3e8e5a] transition-colors">{t.footer.links.privacy}</Link></li>
              <li><Link href="/terms" className="text-[#4a5a4f] text-sm hover:text-[#3e8e5a] transition-colors">{t.footer.links.terms}</Link></li>
              <li><Link href="/impressum" className="text-[#4a5a4f] text-sm hover:text-[#3e8e5a] transition-colors">{t.footer.links.impressum}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#0b1a0f]/8 flex items-center justify-between gap-4">
          <p className="text-[#7a8a7f] text-sm">© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="text-[#7a8a7f] text-sm flex items-center gap-1.5">
            {t.footer.builtWith} <Heart className="w-4 h-4 text-[#c9583c] fill-[#c9583c]" /> {t.footer.inGermany}
          </p>
        </div>
      </div>
    </footer>
  );
}
