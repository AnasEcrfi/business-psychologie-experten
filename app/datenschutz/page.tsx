import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DatenschutzPage() {
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
          <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>

            <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
              gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h2>3. Datenerfassung auf dieser Website</h2>
            <h3>Cookies</h3>
            <p>
              Unsere Internetseiten verwenden so genannte &ldquo;Cookies&rdquo;. Cookies sind kleine 
              Textdateien und richten auf Ihrem Endgerät keinen Schaden an.
            </p>

            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben 
              aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
              zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h2>4. Plugins und Tools</h2>
            <h3>Google Fonts</h3>
            <p>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte 
              Google Fonts, die von Google bereitgestellt werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}