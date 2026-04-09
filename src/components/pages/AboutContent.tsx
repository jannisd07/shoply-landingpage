'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">{t.about.mission.title}</h2>
        <p className="text-zinc-400 leading-relaxed">
          {t.about.mission.text}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">{t.about.building.title}</h2>
        <p className="text-zinc-400 leading-relaxed">
          {t.about.building.text}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">{t.about.values.title}</h2>
        <ul className="space-y-4">
          {t.about.values.items.map((value, index) => (
            <li key={index} className="flex gap-4">
              <span className="text-2xl">{index === 0 ? '🎯' : index === 1 ? '👨‍👩‍👧‍👦' : '🔒'}</span>
              <div>
                <h3 className="text-white font-medium">{value.title}</h3>
                <p className="text-zinc-500 text-sm">{value.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
        <h2 className="text-xl font-bold text-white mb-2">{t.about.contact.title}</h2>
        <p className="text-zinc-400">
          {t.about.contact.text}{' '}
          <a href="mailto:hello@avo.app" className="text-blue-400 hover:underline">
            hello@avo.app
          </a>
        </p>
      </section>
    </div>
  );
}
