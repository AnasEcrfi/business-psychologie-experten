# E-Mail-Templates für Business Psychologie Experten

## Übersicht

Diese E-Mail-Templates wurden speziell für die Integration mit Supabase Auth entwickelt und folgen dem Corporate Design von Business Psychologie Experten.

## Features

✅ **Mobile-First Design** - Optimiert für alle Bildschirmgrößen  
✅ **E-Mail-Client Kompatibilität** - Getestet mit allen gängigen E-Mail-Clients  
✅ **Dark Mode Support** - Automatische Anpassung an Systemeinstellungen  
✅ **Barrierefreiheit** - WCAG 2.1 konform  
✅ **Corporate Identity** - Konsistentes Design mit der Website  

## Verfügbare Templates

### 1. Confirm Signup (`confirm-signup.html`)
- Bestätigung der E-Mail-Adresse nach Registrierung
- Platzhalter: `{{ .ConfirmationURL }}`

### 2. Invite User (`invite-user.html`)
- Einladung neuer Benutzer zum System
- Platzhalter: `{{ .InviteURL }}`

### 3. Magic Link (`magic-link.html`)
- Passwortloser Login via Magic Link
- Platzhalter: `{{ .MagicLinkURL }}`

### 4. Change Email (`change-email.html`)
- Bestätigung der E-Mail-Adressänderung
- Platzhalter: 
  - `{{ .OldEmail }}`
  - `{{ .NewEmail }}`
  - `{{ .ChangeEmailURL }}`

### 5. Reset Password (`reset-password.html`)
- Passwort zurücksetzen
- Platzhalter: `{{ .ResetPasswordURL }}`

### 6. Reauthentication (`reauthentication.html`)
- Erneute Authentifizierung bei sensiblen Aktionen
- Platzhalter:
  - `{{ .ReauthenticationURL }}`
  - `{{ .LastActivity }}`
  - `{{ .IPAddress }}`
  - `{{ .Browser }}`

## Integration in Supabase

### Schritt 1: Supabase Dashboard öffnen
1. Navigieren Sie zu Ihrem Supabase-Projekt
2. Gehen Sie zu **Authentication** → **Email Templates**

### Schritt 2: Templates hochladen
1. Wählen Sie den Template-Typ aus dem Dropdown
2. Kopieren Sie den HTML-Code aus der entsprechenden Datei
3. Fügen Sie den Code in das Template-Feld ein
4. Speichern Sie die Änderungen

### Schritt 3: Variablen anpassen
Supabase verwendet folgende Variablen-Syntax:
- `{{ .ConfirmationURL }}` - Link zur E-Mail-Bestätigung
- `{{ .Email }}` - E-Mail-Adresse des Benutzers
- `{{ .Token }}` - Authentifizierungs-Token
- `{{ .TokenHash }}` - Gehashter Token
- `{{ .SiteURL }}` - Ihre Website-URL

## Anpassungen

### Farben ändern
Die Hauptfarben sind im Inline-CSS definiert:
- Primärfarbe: `#1a1a1a` (Dunkelgrau)
- Sekundärfarbe: `#2d2d2d` (Mittelgrau)
- Akzentfarben: Verschiedene Pastelltöne

### Logo anpassen
Das Logo ist als Text im Header implementiert. Für ein Bild-Logo:
```html
<img src="https://ihre-domain.de/logo.png" alt="Business Psychologie Experten" style="height: 40px;">
```

### Texte anpassen
Alle Texte sind in deutscher Sprache. Für Mehrsprachigkeit können Sie Variablen verwenden:
```html
{{ if eq .Language "de" }}
  Deutscher Text
{{ else }}
  English Text
{{ end }}
```

## Testing

### E-Mail-Testing-Tools
- [Litmus](https://litmus.com/) - Umfassende E-Mail-Client-Tests
- [Email on Acid](https://www.emailonacid.com/) - Rendering-Tests
- [Mail Tester](https://www.mail-tester.com/) - Spam-Score-Analyse

### Lokales Testing
1. Öffnen Sie die HTML-Datei im Browser
2. Nutzen Sie die Browser-Entwicklertools für Mobile-Ansicht
3. Testen Sie mit verschiedenen E-Mail-Clients

## Best Practices

### ✅ DO's
- Verwenden Sie Inline-CSS für maximale Kompatibilität
- Testen Sie mit verschiedenen E-Mail-Clients
- Halten Sie die Dateigrößen klein (< 100 KB)
- Verwenden Sie Alt-Texte für Bilder
- Bieten Sie eine Plain-Text-Alternative

### ❌ DON'Ts
- Keine JavaScript-Verwendung
- Keine externen CSS-Dateien
- Keine Videos oder animierte GIFs
- Keine zu breiten Layouts (max. 600px)
- Keine komplexen CSS-Selektoren

## Support

Bei Fragen oder Problemen:
- E-Mail: support@businesspsychologie.de
- Website: https://businesspsychologie.de

## Lizenz

© 2025 Business Psychologie Experten. Alle Rechte vorbehalten.