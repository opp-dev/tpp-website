import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function Impressum() {
  return (
    <main className="py-8">
      <h1 className="typography-h3 mb-8">Impressum</h1>
      <div className="prose prose-lg max-w-none">

        <h2 className="typography-h4 mb-4">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
        <p className="mb-4">
          Suryanshu Rai<br />
          Max-Brauer-Allee 22<br />
          22765 Hamburg<br />
          Deutschland
        </p>

        <h2 className="typography-h4 mb-4 mt-8">Kontakt</h2>
        <p className="mb-4">
          E-Mail: <a href="mailto:suryanshu.rai@orbitlabs.de" className="text-blue-600 hover:underline">suryanshu.rai@orbitlabs.de</a>
        </p>

        <h2 className="typography-h4 mb-4 mt-8">Verantwortlich für den redaktionellen Inhalt (gemäß § 18 Abs. 2 MStV)</h2>
        <p className="mb-4">
          Suryanshu Rai<br />
          Max-Brauer-Allee 22<br />
          22765 Hamburg
        </p>

        <hr className="my-8 border-gray-200" />

        <h2 className="typography-h4 mb-4">EU-Streitschlichtung</h2>
        <p className="mb-4">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <hr className="my-8 border-gray-200" />

        <h2 className="typography-h4 mb-4">Haftungsausschluss</h2>
        <p className="mb-4">
          <strong>Haftung für Inhalte</strong><br />
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach § 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
      </div>
    </main>
  );
}