import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>§ 1 Geltungsbereich</h2>
            <p>
              Für alle Geschäftsbeziehungen zwischen Business Psychologie Experten und unseren 
              Kunden gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen 
              in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.
            </p>

            <h2>§ 2 Vertragsschluss</h2>
            <p>
              Die Darstellung unserer Leistungen stellt kein rechtlich bindendes Angebot, 
              sondern eine Aufforderung zur Abgabe eines Angebots dar. Durch die Buchung 
              einer Beratung geben Sie ein verbindliches Angebot ab.
            </p>

            <h2>§ 3 Leistungsbeschreibung</h2>
            <p>
              Wir bieten psychologische Beratung für Unternehmen und Führungskräfte an. 
              Der genaue Umfang der Leistungen ergibt sich aus der jeweiligen 
              Leistungsbeschreibung.
            </p>

            <h2>§ 4 Preise und Zahlung</h2>
            <p>
              Es gelten die zum Zeitpunkt der Buchung angegebenen Preise. Die Zahlung 
              erfolgt per Rechnung innerhalb von 14 Tagen nach Rechnungserhalt.
            </p>

            <h2>§ 5 Terminabsagen</h2>
            <p>
              Termine können bis zu 48 Stunden vor dem vereinbarten Termin kostenfrei 
              storniert werden. Bei späteren Absagen wird die volle Gebühr berechnet.
            </p>

            <h2>§ 6 Vertraulichkeit</h2>
            <p>
              Alle im Rahmen der Beratung besprochenen Inhalte werden streng vertraulich 
              behandelt und unterliegen der Schweigepflicht.
            </p>

            <h2>§ 7 Haftung</h2>
            <p>
              Unsere Haftung für vertragliche Pflichtverletzungen sowie aus Delikt ist 
              auf Vorsatz und grobe Fahrlässigkeit beschränkt.
            </p>

            <h2>§ 8 Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist der 
              Sitz unseres Unternehmens.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}