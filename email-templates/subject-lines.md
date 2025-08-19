# E-Mail Betreffzeilen für Supabase Auth

## Deutsche Betreffzeilen

### 1. Confirm Signup
**Betreff:** `Bestätigen Sie Ihre Registrierung bei Business Psychologie Experten`

### 2. Invite User  
**Betreff:** `Einladung: Werden Sie Teil von Business Psychologie Experten`

### 3. Magic Link
**Betreff:** `Ihr Magic Link für Business Psychologie Experten 🪄`

### 4. Change Email Address
**Betreff:** `Bestätigen Sie Ihre neue E-Mail-Adresse`

### 5. Reset Password
**Betreff:** `Passwort zurücksetzen für Business Psychologie Experten`

### 6. Reauthentication
**Betreff:** `Sicherheitsüberprüfung erforderlich - Business Psychologie Experten`

---

## Integration in Supabase

Diese Betreffzeilen können Sie direkt im Supabase Dashboard unter **Authentication → Email Templates** in das Feld "Subject heading" eintragen.

## Alternative Betreffzeilen (kürzer)

Falls Sie kürzere Betreffzeilen bevorzugen:

1. **Confirm Signup:** `Bitte bestätigen Sie Ihre E-Mail-Adresse`
2. **Invite User:** `Sie wurden eingeladen!`
3. **Magic Link:** `Ihr Login-Link ist da 🪄`
4. **Change Email:** `E-Mail-Adresse ändern`
5. **Reset Password:** `Passwort zurücksetzen`
6. **Reauthentication:** `Sicherheitsüberprüfung nötig`

## Tipps für gute Betreffzeilen

- **Kurz und prägnant:** Max. 50 Zeichen für mobile Geräte
- **Klarheit:** Sofort erkennbar, worum es geht
- **Vertrauen:** Markenname einbeziehen
- **Keine Spam-Trigger:** Vermeiden Sie CAPS, !!!, €€€
- **Persönlich:** Bei Bedarf `{{ .Name }}` für Personalisierung

## Beispiel mit Personalisierung

```
Hallo {{ .Name }}, bestätigen Sie Ihre Registrierung
```