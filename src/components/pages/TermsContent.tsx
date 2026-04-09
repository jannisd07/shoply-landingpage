'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsContent() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 text-zinc-400">
      <p className="text-sm text-zinc-500">{t.terms.lastUpdated}</p>

      {t.terms.sections.map((section, index) => (
        <section key={index}>
          <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
          {section.content && <p>{section.content}</p>}
          {section.items && (
            <ul className="list-disc pl-6 space-y-2 mt-4">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {section.title === '8. Contact' || section.title === '8. Kontakt' ? (
            <a href="mailto:legal@avo.app" className="text-blue-400 hover:underline">
              legal@avo.app
            </a>
          ) : null}
        </section>
      ))}
    </div>
  );
}
