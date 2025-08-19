import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Psychologie Experten | Transform Your Business Mind",
  description: "Wissenschaftlich fundiertes Business Coaching für Führungskräfte und Teams. Executive Coaching, Team Development und Strategic Consulting.",
  keywords: "Business Psychologie, Executive Coaching, Führungskräfte Coaching, Team Development, München",
  authors: [{ name: "Business Psychologie Experten" }],
  openGraph: {
    title: "Business Psychologie Experten",
    description: "Transform Your Business Mind - Wissenschaftlich fundiertes Coaching",
    type: "website",
    locale: "de_DE",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}