# Coming Soon Page - Informationen

## Admin-Zugang

**Zugangscode: `BPE2025`**

## Funktionsweise

1. **Aktivierung/Deaktivierung:**
   - In `middleware.ts` die Variable `COMING_SOON_MODE` auf `true` (aktiv) oder `false` (deaktiviert) setzen

2. **Zugang gewähren:**
   - Geben Sie den Code `BPE2025` auf der Coming Soon Seite ein
   - Der Zugang wird für 24 Stunden in einem Cookie gespeichert
   - Danach muss der Code erneut eingegeben werden

3. **Code ändern:**
   - In `/app/coming-soon/page.tsx` die Variable `ADMIN_CODE` anpassen

## Features

- ✅ Minimalistisches, modernes Design
- ✅ Responsive für alle Geräte  
- ✅ Dark Mode Support
- ✅ Animierte Fortschrittsanzeige
- ✅ Fehlermeldung bei falschem Code
- ✅ Cookie-basierte Zugriffskontrolle
- ✅ Automatische Weiterleitung nach Login

## Design

- Glassmorphismus-Effekte passend zum CI
- Dezente Grid-Pattern im Hintergrund
- BPE Logo/Brand
- Smooth Animationen beim Unlock

## Deployment

Die Coming Soon Page ist standardmäßig **AKTIVIERT**.
Für das Live-Deployment sollte `COMING_SOON_MODE = false` gesetzt werden, wenn die Seite öffentlich sein soll.