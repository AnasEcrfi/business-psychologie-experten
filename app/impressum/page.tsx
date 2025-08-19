"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ImpressumPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        </Link>

        <div className="glass-card rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            {language === 'de' ? 'Impressum' : 'Legal Notice'}
          </h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {language === 'de' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}
              </h2>
              <div className="space-y-2">
                <p>Vignoblenoir Consulting GmbH</p>
                <p>Huttentalstraße 2</p>
                <p>63628 Bad Soden-Salmünster</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {language === 'de' ? 'Handelsregister' : 'Commercial Register'}
              </h2>
              <div className="space-y-2">
                <p>Handelsregister: HRB 98347</p>
                <p>Registergericht: Amtsgericht Hanau</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {language === 'de' ? 'Umsatzsteuer' : 'VAT'}
              </h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE297212791</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {language === 'de' ? 'Vertreten durch' : 'Represented by'}
              </h2>
              <div className="space-y-2">
                <p>{language === 'de' ? 'Geschäftsführerin:' : 'Managing Director:'}</p>
                <p>Alexandra Lea Weinberg</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {language === 'de' ? 'Kontakt' : 'Contact'}
              </h2>
              <div className="space-y-2">
                <p>{language === 'de' ? 'Telefon:' : 'Phone:'} +49 172 6602057</p>
                <p>E-Mail: info@vignoblenoirconsulting.de</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {language === 'de' ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Responsible for content according to § 55 Abs. 2 RStV'}
              </h2>
              <div className="space-y-2">
                <p>Alexandra Lea Weinberg</p>
                <p>Vignoblenoir Consulting GmbH</p>
                <p>Huttentalstraße 2</p>
                <p>63628 Bad Soden-Salmünster</p>
              </div>
            </section>

            <section className="pt-8 border-t border-gray-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === 'de' ? 'Haftungsausschluss (Disclaimer)' : 'Disclaimer'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {language === 'de' ? 'Haftung für Inhalte' : 'Liability for Content'}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {language === 'de' 
                      ? 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
                      : 'As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Para.1 TMG. According to §§ 8 to 10 TMG, however, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information in accordance with general laws remain unaffected. However, liability in this regard is only possible from the point in time at which knowledge of a specific legal violation is obtained. If we become aware of such legal violations, we will remove this content immediately.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {language === 'de' ? 'Haftung für Links' : 'Liability for Links'}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {language === 'de'
                      ? 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
                      : 'Our offer contains links to external third-party websites, over whose content we have no influence. Therefore, we cannot assume any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {language === 'de' ? 'Urheberrecht' : 'Copyright'}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {language === 'de'
                      ? 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
                      : 'The content and works created by the site operators on these pages are subject to German copyright law. Third-party contributions are marked as such. The reproduction, editing, distribution and any kind of use outside the limits of copyright law require the written consent of the respective author or creator.'}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}