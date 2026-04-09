import InfoPageLayout from '@/components/layout/InfoPageLayout';

export const metadata = {
  title: 'Impressum | Avo',
  description: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG.',
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <InfoPageLayout title="Impressum">
      <div className="space-y-8 text-[#4a5a4f]">
        <section>
          <h2 className="text-xl font-semibold text-[#0b1a0f] mb-3">Angaben gemäß § 5 TMG</h2>
          <p className="leading-relaxed">
            Dominik Klossika<br />
            Birkenweg 1<br />
            89198 Westerstetten
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0b1a0f] mb-3">Kontakt</h2>
          <p className="leading-relaxed">
            E-Mail: <a href="mailto:kontakt@shoplyai.app" className="text-[#3e8e5a] hover:underline">kontakt@shoplyai.app</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0b1a0f] mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="leading-relaxed">
            Dominik Klossika<br />
            Birkenweg 1<br />
            89198 Westerstetten
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0b1a0f] mb-3">Haftungsausschluss</h2>
          <h3 className="font-medium text-[#0b1a0f] mb-2">Haftung für Inhalte</h3>
          <p className="leading-relaxed mb-4">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
          </p>
          <h3 className="font-medium text-[#0b1a0f] mb-2">Haftung für Links</h3>
          <p className="leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0b1a0f] mb-3">Urheberrecht</h2>
          <p className="leading-relaxed">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
