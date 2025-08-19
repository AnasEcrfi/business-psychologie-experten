# Business Psychologie Experten (BPE)

Eine moderne, professionelle Website für Business-Psychologie-Beratung mit iOS-inspiriertem Glassmorphismus-Design, Mehrsprachigkeit und integriertem Admin-System.

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Features

### Design & UX
- **iOS-inspiriertes Glassmorphismus-Design** - Moderne, transparente UI-Elemente mit Blur-Effekten
- **Dark/Light Mode** - Automatische Anpassung an Systemeinstellungen
- **Fully Responsive** - Optimiert für alle Bildschirmgrößen
- **Video-Hintergründe** - Immersive visuelle Erfahrung mit optimierter Performance
- **Smooth Animations** - Flüssige Übergänge und Interaktionen

### Funktionalität
- **Mehrsprachigkeit** (DE/EN) - Vollständige Übersetzung aller Inhalte
- **Online-Terminbuchung** - Integriertes Kalendersystem für Beratungstermine
- **Kontaktformular** - Mit Validierung und Erfolgsmeldungen
- **Admin-Dashboard** - Verwaltung von Nachrichten und Terminen
- **IPPD-Methode** - Darstellung der wissenschaftlichen Beratungsmethodik

### Technisch
- **Next.js 15** mit App Router
- **TypeScript** für Type-Safety
- **Tailwind CSS** für modernes Styling
- **Optimierte SEO** - Meta-Tags und strukturierte Daten
- **iOS Video-Kompatibilität** - Spezielle Implementierung für Safari

## 🚀 Quick Start

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn
- Git

### Installation

1. **Repository klonen**
```bash
git clone https://github.com/yourusername/businesspsychologie-experten.git
cd businesspsychologie-experten
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Entwicklungsserver starten**
```bash
npm run dev
```

Die Anwendung läuft nun unter [http://localhost:3000](http://localhost:3000)

### Produktions-Build

```bash
npm run build
npm start
```

## 📁 Projektstruktur

```
businesspsychologie-experten/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin-Dashboard
│   │   ├── calendar/      # Terminverwaltung
│   │   ├── dashboard/     # Übersicht
│   │   ├── login/         # Admin-Login
│   │   └── messages/      # Nachrichtenverwaltung
│   ├── impressum/         # Impressum-Seite
│   ├── layout.tsx         # Root-Layout
│   ├── page.tsx           # Hauptseite
│   └── globals.css        # Globale Styles
├── components/            # React-Komponenten
│   ├── booking-modal-simple.tsx  # Terminbuchungs-Modal
│   ├── contact-section.tsx       # Kontaktbereich
│   ├── footer.tsx               # Footer
│   ├── hero-section.tsx         # Hero-Bereich
│   ├── navigation.tsx           # Hauptnavigation
│   ├── services-section.tsx     # Leistungen
│   └── ...                      # Weitere Komponenten
├── contexts/              # React Contexts
│   └── language-context.tsx     # Sprachverwaltung
├── lib/                   # Utilities & Konfiguration
│   ├── auth.ts           # Authentifizierung
│   ├── store.ts          # Datenverwaltung
│   ├── translations.ts   # Übersetzungen
│   └── utils.ts          # Hilfsfunktionen
├── public/               # Statische Assets
│   └── assets/           # Bilder und Videos
└── package.json          # Projekt-Dependencies
```

## 🔧 Konfiguration

### Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei:

```env
# Optional: Für erweiterte Features
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Admin-Zugang

Standard-Anmeldedaten für das Admin-Dashboard:
- **E-Mail:** admin@businesspsychologie.de
- **Passwort:** admin123

⚠️ **Wichtig:** Ändern Sie diese Zugangsdaten in der Produktion!

## 🎨 Anpassungen

### Farben und Theme

Die Farbpalette kann in `app/globals.css` angepasst werden:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 20%;
    /* Weitere Variablen... */
  }
}
```

### Übersetzungen

Neue Übersetzungen können in `lib/translations.ts` hinzugefügt werden:

```typescript
export const translations = {
  de: {
    // Deutsche Übersetzungen
  },
  en: {
    // Englische Übersetzungen
  }
}
```

### Kontaktdaten

Aktualisieren Sie die Kontaktinformationen in:
- `lib/translations.ts` - E-Mail und Telefonnummer
- `app/impressum/page.tsx` - Vollständige Firmendaten

## 📱 Mobile Optimierung

### Video-Autoplay auf iOS

Die Website verwendet eine spezielle Implementierung für Video-Autoplay auf iOS-Geräten:

```typescript
// components/ios-video-background.tsx
const videoHtml = `
  <video 
    autoplay 
    muted 
    loop 
    playsinline
    preload="metadata"
  >
`
```

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Sicherheit

### Best Practices
- Keine sensiblen Daten im Frontend-Code
- Validierung aller Formulareingaben
- HTTPS in Produktion verwenden
- Regelmäßige Dependency-Updates

### Content Security Policy

Fügen Sie in der Produktion CSP-Header hinzu:

```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
}
```

## 🚀 Deployment

### Vercel (Empfohlen)

1. Push zu GitHub
2. Import in Vercel
3. Deploy mit einem Klick

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Andere Plattformen

Das Projekt kann auf jeder Plattform deployed werden, die Node.js unterstützt:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Heroku

## 📊 Performance

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Optimierungen
- Lazy Loading für Bilder
- Code Splitting
- Optimierte Fonts
- Komprimierte Videos

## 🤝 Mitwirkende

Entwickelt und designed von [MP-Agency](https://www.mpagency.ae)

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE](LICENSE) für Details.

## 📞 Support

Bei Fragen oder Problemen:
- **E-Mail:** info@vignoblenoirconsulting.de
- **Telefon:** +49 172 6602057
- **GitHub Issues:** [Issues erstellen](https://github.com/yourusername/businesspsychologie-experten/issues)

## 🔄 Updates

### Version 1.0.0 (2025-01-19)
- Initial Release
- Vollständige Website mit allen Features
- Admin-Dashboard
- Mehrsprachigkeit (DE/EN)
- Online-Terminbuchung

---

© 2025 Vignoblenoir Consulting GmbH. Alle Rechte vorbehalten.