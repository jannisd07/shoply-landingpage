'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQContent() {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-zinc-400 mb-8">
        {t.faq.subtitle}
      </p>
      <div className="space-y-6">
        {t.faq.items.map((faq, index) => (
          <div key={index} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
            <p className="text-zinc-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}
