'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function PricingContent() {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      {/* Free Plan */}
      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-white">{t.pricing.free.name}</span>
          <span className="text-zinc-500">{t.pricing.free.period}</span>
        </div>
        <p className="text-zinc-400 mb-6">{t.pricing.free.description}</p>
        <ul className="space-y-3 text-zinc-300">
          {t.pricing.free.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-xs">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Premium Plan */}
      <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0d1a2d] to-[#091322] border border-blue-500/30">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-4">
          {t.pricing.premium.badge}
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-white">{t.pricing.premium.name}</span>
          <span className="text-zinc-500">{t.pricing.premium.period}</span>
        </div>
        <p className="text-zinc-400 mb-6">{t.pricing.premium.description}</p>
        <ul className="space-y-3 text-zinc-300">
          {t.pricing.premium.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-xs text-blue-400">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-zinc-500 text-center">
        {t.pricing.note}
      </p>
    </div>
  );
}
