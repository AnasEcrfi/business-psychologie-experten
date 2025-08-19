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
  manifest: "/manifest.json",
  openGraph: {
    title: "Business Psychologie Experten",
    description: "Transform Your Business Mind - Wissenschaftlich fundiertes Coaching",
    type: "website",
    locale: "de_DE",
    url: "https://businesspsychologie-experten.de",
    siteName: "Business Psychologie Experten",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Business Psychologie Experten",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Psychologie Experten",
    description: "Transform Your Business Mind - Wissenschaftlich fundiertes Coaching",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://businesspsychologie-experten.de" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        {/* Skip to main content for accessibility */}
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg z-50">
          Skip to main content
        </a>
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