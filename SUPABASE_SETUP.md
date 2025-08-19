# Supabase Datenbank Setup

## Konfiguration

Die Supabase-Integration ist vollständig konfiguriert mit:

- **Project ID**: djugesqtewzuidskqlul
- **URL**: https://djugesqtewzuidskqlul.supabase.co
- **Anon Key**: Konfiguriert in .env.local
- **Service Role Key**: Konfiguriert in .env.local

## Datenbankstruktur

### Tabellen:

1. **contact_submissions** - Kontaktformular-Einreichungen
   - id, name, email, message, status, created_at, updated_at

2. **time_slots** - Verfügbare Terminslots
   - id, date, time, available, created_at, updated_at

3. **bookings** - Gebuchte Termine
   - id, date, time, name, email, phone, message, status, created_at, updated_at

4. **admin_users** - Admin-Benutzer
   - id, email, password_hash, created_at, updated_at

## Setup-Schritte

### 1. Datenbank-Schema erstellen

1. Gehe zu [Supabase Dashboard](https://app.supabase.com/project/djugesqtewzuidskqlul/sql)
2. Öffne den SQL Editor
3. Kopiere den gesamten Inhalt von `supabase-schema.sql`
4. Führe das SQL aus

### 2. Aktivierung

Die Supabase-Integration ist bereits aktiviert durch:
```env
NEXT_PUBLIC_USE_SUPABASE=true
```

Um zurück zu lokalem Storage zu wechseln:
```env
NEXT_PUBLIC_USE_SUPABASE=false
```

## Features

- ✅ **Echtzeit-Synchronisation**: Alle Daten werden sofort in der Cloud gespeichert
- ✅ **Row Level Security**: Sicherheit auf Datenbankebene
- ✅ **Automatische Backups**: Supabase erstellt automatische Backups
- ✅ **Skalierbar**: Kann mit wachsenden Anforderungen mithalten
- ✅ **Migration Helper**: Einfacher Wechsel zwischen local und Supabase

## Admin-Zugang

Standard Admin-Credentials (nach Schema-Ausführung):
- Email: admin@businesspsychologie.de
- Passwort: admin123

## Wichtige Dateien

- `/lib/supabase.ts` - Supabase Client Konfiguration
- `/lib/supabase-store.ts` - Alle Datenbankfunktionen
- `/lib/store-migration.ts` - Migration Helper
- `/supabase-schema.sql` - Datenbank-Schema
- `/.env.local` - Umgebungsvariablen

## Troubleshooting

### Fehler: "relation does not exist"
→ Das Schema wurde noch nicht in Supabase ausgeführt. Führe `supabase-schema.sql` aus.

### Fehler: "permission denied"
→ Row Level Security Policies prüfen im Supabase Dashboard

### Daten werden nicht gespeichert
→ Prüfe ob `NEXT_PUBLIC_USE_SUPABASE=true` gesetzt ist

## Nächste Schritte

1. SQL Schema in Supabase ausführen
2. Server neu starten (`npm run dev`)
3. Testen mit Kontaktformular und Admin-Bereich
4. Monitoring im Supabase Dashboard einrichten