'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 text-zinc-400">
      <p className="text-sm text-zinc-500">{t.privacy.lastUpdated}</p>

      {t.privacy.sections.map((section, index) => (
        <section key={index}>
          <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
          {section.content && <p className="mb-4">{section.content}</p>}
          {section.items && (
            <ul className="list-disc pl-6 space-y-2">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {section.title === '6. Contact Us' || section.title === '6. Kontakt' ? (
            <a href="mailto:privacy@shoply.app" className="text-blue-400 hover:underline">
              privacy@shoply.app
            </a>
          ) : null}
        </section>
      ))}
    </div>
  );
}
