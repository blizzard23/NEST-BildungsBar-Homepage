# NEST BildungsBar – Website (Next.js + Supabase, für Vercel)

Komplette NEST-Website im Navy/Gold-Design – alle öffentlichen Seiten plus
**echtes Backend** über Supabase: Partner-Login, Stellenanzeigen, Blog und
Veranstaltungskalender. Deploy-fertig für **Vercel**.

---

## Was ist drin?

**Öffentliche Seiten** (statisch, schnell):
`/` Start · `/ueber-uns` · `/deine-zukunft` (Berufe-Browser mit Filter, Merkliste,
Live-Stellen) · `/beruf?b=<slug>` (Detailseiten für ~150 Berufe) · `/fuer-schulen` ·
`/kooperation` · `/referenzen` · `/kontakt` · `/terminbuchung` (Schüler-Buchung) · `/blog`

**Dynamisch (Supabase):**
- `/partner-portal` – Login für Partnerunternehmen, eigene **Stellen** anlegen/löschen,
  **Veranstaltungen** sehen.
- `/api/stellen` – liefert aktive Stellen (30 Tage) an die „Aktuelle Stellen"-Leiste.
- `/blog` + `/blog/<slug>` – Blogbeiträge aus Supabase.

Das Design/Verhalten (Berufe-Browser, Terminbuchung, FAQ, Reveal-Animationen)
steckt gebündelt in `public/assets/nest-app.js` + den CSS-Dateien in `public/assets/`.

---

## 1. Lokal starten (optional)

Voraussetzung: Node.js 18+.

```bash
npm install
cp .env.local.example .env.local   # Supabase-Werte eintragen (siehe Schritt 3)
npm run dev                         # http://localhost:3000
```

Ohne Supabase-Werte läuft die Seite trotzdem – nur Login/Blog/Stellen sind dann leer.

---

## 2. Auf GitHub laden

1. Diesen Ordner (`nest-vercel`) als **ZIP** entpacken bzw. als Projektordner nehmen.
2. Neues GitHub-Repo anlegen und hochladen – entweder per Weboberfläche
   („Add file → Upload files", den Ordnerinhalt hochziehen) oder per Git:

```bash
git init
git add .
git commit -m "NEST BildungsBar – Next.js + Supabase"
git branch -M main
git remote add origin https://github.com/DEIN-USER/nest-bildungsbar.git
git push -u origin main
```

> Wichtig: `node_modules` und `.next` werden durch `.gitignore` ausgeschlossen – das ist korrekt.

---

## 3. Supabase einrichten

1. Auf [supabase.com](https://supabase.com) ein Projekt anlegen.
2. **SQL Editor** öffnen → Inhalt von `supabase/schema.sql` einfügen → **Run**.
   (Legt Tabellen `stellen`, `veranstaltungen`, `posts`, `buchungen` + Sicherheitsregeln + Beispieldaten an.)
   - Danach `supabase/storage.sql` ausführen → legt den öffentlichen Bucket **`blog`**
     für Beitragsbilder an (Upload nur für den Admin).
   - *(Falls `schema.sql` schon vorher lief: zusätzlich `supabase/admin-policies.sql` und
     `supabase/buchungen.sql` ausführen, um Admin-Rechte und die Buchungstabelle nachzurüsten.)*
   - Danach `supabase/portal-fixes.sql` ausführen → Website-Feld für Ansprechpartner,
     Standard-Ansprechpartner in der DB (bearbeitbar) und sprechende Veranstaltungs-Links (Slugs).
3. **Project Settings → API** → kopiere:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Admin- & Partner-Accounts:** Authentication → Users → **Add user** (E-Mail + Passwort).
   - **Admin:** `info@nest-bildungsbar.de` → sieht im Portal den **Admin-Bereich**
     (Veranstaltungen & Blogbeiträge anlegen/löschen, Bild-Upload).
   - **Partner:** beliebige E-Mail → kann eigene Stellen verwalten.

---

## 4. Bei Vercel deployen

1. Auf [vercel.com](https://vercel.com) → **Add New… → Project** → dein GitHub-Repo importieren.
2. Framework wird automatisch als **Next.js** erkannt (kein Build-Befehl nötig).
3. Unter **Environment Variables** eintragen:
   | Name | Wert |
   |------|------|
   | `NEXT_PUBLIC_SUPABASE_URL` | deine Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | dein anon public Key |
   | `SMTP_HOST` | `smtp.lima-city.de` |
   | `SMTP_PORT` | `465` |
   | `SMTP_SECURE` | `true` |
   | `SMTP_USER` | dein lima-city Postfach (E-Mail) |
   | `SMTP_PASS` | Postfach-Passwort |
   | `MAIL_TO` | `info@nest-bildungsbar.de` |
   | `MAIL_FROM` | dein lima-city Postfach (E-Mail) |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role-Secret (für den Erinnerungs-Cron) |
   | `CRON_SECRET` | langes Zufallsgeheimnis (schützt den Cron) |
   | `WHATSAPP_TOKEN` *(optional)* | WhatsApp Cloud API Token |
   | `WHATSAPP_PHONE_ID` *(optional)* | WhatsApp Telefonnummern-ID |
   | `WHATSAPP_TEMPLATE` *(optional)* | Name des genehmigten Templates |
   | `WHATSAPP_LANG` *(optional)* | Sprachcode, z. B. `de` |
   | `NEXT_PUBLIC_TERMIN_MAIL` *(optional)* | `info@nest-bildungsbar.de` |
   | `NEXT_PUBLIC_SITE_URL` *(empfohlen)* | `https://nest-bildungsbar.de` (Ziel der Passwort-Links) |
4. **Deploy** klicken. Fertig – Vercel gibt dir eine `…vercel.app`-URL.
   Eigene Domain unter **Settings → Domains** verbinden.

### Erinnerungen am Vortag (Cron)

`vercel.json` enthält einen **täglichen Cron** (`/api/cron/erinnerungen`, 16:00 UTC).
Er sucht alle Buchungen für **morgen** und schickt eine freundliche Erinnerung per
**E-Mail** (SMTP) und – falls konfiguriert – per **WhatsApp**. Damit nichts doppelt
verschickt wird, wird je Buchung `erinnert_am` gesetzt.

- Pflicht dafür: `SUPABASE_SERVICE_ROLE_KEY` (Cron liest ohne Login) und `CRON_SECRET`.
- **WhatsApp** läuft über die **WhatsApp Cloud API (Meta)**. Du brauchst: ein WhatsApp-
  Business-Konto, eine Telefonnummern-ID, ein dauerhaftes Token und ein **genehmigtes
  Template** mit genau einer Variablen `{{1}}` (dort wird „Datum um Uhrzeit in Ort"
  eingesetzt), z. B. Template `terminerinnerung`:
  *„Hallo! Erinnerung: Dein Termin bei der NEST BildungsBar ist morgen, {{1}}. Wir freuen uns auf dich!"*
  Ohne diese WhatsApp-Variablen wird nur die E-Mail-Erinnerung verschickt.
- Cron testen: den Endpoint manuell aufrufen mit Header `Authorization: Bearer <CRON_SECRET>`.

### Mailversand (lima-city SMTP)

Termin-, Kontakt- und Sonderanfragen werden serverseitig über die API-Route
`/api/kontakt` mit **nodemailer** verschickt – über dein lima-city-Postfach.

- **Server:** `smtp.lima-city.de` · **Port 465** (SSL, `SMTP_SECURE=true`) oder
  **Port 587** (STARTTLS, `SMTP_SECURE=false`).
- `SMTP_USER`/`SMTP_PASS` = Zugangsdaten deines lima-city-**Postfachs** (nicht der Login fürs Kundenkonto).
- `MAIL_FROM` muss zu diesem Postfach passen (sonst lehnt der Server den Versand ab).
- Sind die SMTP-Variablen **nicht** gesetzt, fallen die Formulare automatisch auf die
  bisherige **mailto-Variante** zurück (öffnen das Mailprogramm) – nichts geht verloren.

### Passwort vergessen (Partner-Portal)

„Passwort vergessen?" läuft über die eigene Route **`/api/passwort-reset`** – bewusst
**nicht** über `supabase.auth.resetPasswordForEmail()`.

**Warum?** Supabase verschickt Auth-Mails über den SMTP-Server, der im Supabase-
Dashboard hinterlegt ist. Lehnt der die Anmeldung ab (z. B. weil das Postfach-Passwort
gewechselt wurde), antwortet `/auth/v1/recover` mit **HTTP 500 und leerem Body** – im
Portal stand dann nur „Fehler: {}", der Recovery-Token wurde zurückgerollt und es ging
**gar keine Mail** raus. Genau das war im August 2026 der Fall
(`535 "5.7.8 Error: authentication failed"` in den Supabase Auth-Logs).

Die eigene Route erzeugt den Link stattdessen über die **Admin-API**
(`auth.admin.generateLink`, verschickt selbst keine Mail) und mailt ihn über **denselben
lima-city-SMTP** wie alle anderen Formulare. Damit hängt das Zurücksetzen nicht mehr an
der Supabase-SMTP-Konfiguration.

- Pflicht dafür: `SUPABASE_SERVICE_ROLE_KEY` und die `SMTP_*`-Variablen.
- `NEXT_PUBLIC_SITE_URL` bestimmt, wohin der Link führt (`…/partner-portal`). Ohne die
  Variable wird der Host der Anfrage genommen.
- Das Ziel muss in Supabase unter **Authentication → URL Configuration → Redirect URLs**
  erlaubt sein, sonst landet der Link auf der Site-URL.
- Die Antwort verrät nie, ob es zu einer Adresse einen Zugang gibt (keine Konto-Abfrage
  von außen); zusätzlich greift ein Rate-Limit von 5 Anfragen pro IP je 10 Minuten.

### Registrierung & Bestätigungsmail (Partner-Portal)

Die Registrierung läuft aus demselben Grund über die eigene Route
**`/api/registrierung`** – bewusst **nicht** über `supabase.auth.signUp()`.

**Warum?** Bei `signUp()` verschickt Supabase die Bestätigungsmail selbst, über denselben
Dashboard-SMTP. Lehnt der die Anmeldung ab, bricht der **komplette Signup** ab:
`/auth/v1/signup` antwortet mit **HTTP 500**, der eben angelegte Benutzer wird
zurückgerollt und es geht keine Mail raus. Für Unternehmen sah das so aus, als käme nur
die Bestätigungsmail nicht an – tatsächlich existierte der Zugang gar nicht, ein Login war
deshalb ebenfalls unmöglich (Supabase Auth-Log: `user_confirmation_requested` →
`535 "5.7.8 Error: authentication failed"`, September 2026).

Die eigene Route legt den Zugang über die **Admin-API** an, erzeugt den Bestätigungslink
mit `auth.admin.generateLink` (verschickt selbst keine Mail) und mailt ihn über den
**lima-city-SMTP**. Gleiche Voraussetzungen wie beim Passwort-Reset
(`SUPABASE_SERVICE_ROLE_KEY`, `SMTP_*`, `NEXT_PUBLIC_SITE_URL` als erlaubte Redirect-URL).

- Gibt es zu der Adresse **schon einen Zugang**, wird kein zweites Konto angelegt.
  Stattdessen geht eine Mail mit Link zum Passwortsetzen raus – der bestätigt beim Klick
  auch eine bisher unbestätigte Adresse. Die Antwort im Portal ist in beiden Fällen
  identisch, verrät also nicht, ob es das Konto schon gibt.
- Rate-Limit: 5 Anfragen pro IP je 10 Minuten.

> **Hinweis:** Der SMTP-Zugang unter **Authentication → Emails → SMTP Settings** im
> Supabase-Dashboard ist damit für Registrierung und Passwort-Reset nicht mehr nötig.
> Er sollte trotzdem korrigiert werden, falls später weitere Auth-Mails dazukommen
> (z. B. E-Mail-Adresse ändern, Einladungen).

Jeder weitere `git push` deployt automatisch neu.

---

## 5. Inhalte pflegen

- **Stellen:** Partner legen sie selbst im Portal an (oder du im Supabase-Table-Editor).
- **Blog:** Tabelle `posts` → Zeile anlegen, `published = true`. `inhalt` ist HTML.
- **Veranstaltungen & Blog:** im Partner-Portal → Admin-Bereich (Login als `info@nest-bildungsbar.de`).
- **Terminbuchungen:** ein fester Slot **17:00 Uhr** pro Beratungstag. Beratungstage je
  Standort: **Wuppertal & Essen Di/Do, Solingen Mo, Remscheid Mi** (jeweils 17–19 Uhr).
  Kapazität pro Tag: **Wuppertal 4 / Essen 2 / Solingen 2 / Remscheid 2**. Solingen und
  Remscheid sind bis **1. Oktober 2026** gesperrt (`buchbarAb` in `nest-app.js`,
  `BUCHBAR_AB` in `app/api/buchung/route.js`) – die Tage erscheinen im Kalender als
  „Ab Okt.". Buchungen sind **verbindlich** – der Platz ist sofort vergeben
  (kein Bestätigen nötig), volle Tage werden als „ausgebucht" gesperrt, freie Tage zeigen die
  Restplätze. Beim Buchen wird in `buchungen` gespeichert, das NEST-Team benachrichtigt **und**
  die buchende Person bekommt sofort eine **Bestätigungsmail**. Am Vortag folgt eine
  **Erinnerung** (E-Mail + optional WhatsApp) über den Cron. Im **Admin-Bereich** siehst du
  pro Tag, **wer** gebucht hat (Name + Kontaktdaten) sowie die Auslastung. Beratungstage &
  Kapazität einstellbar in `nest-app.js` (`STANDORTE`), `app/api/buchung/route.js`,
  `app/api/verfuegbarkeit/route.js` und `app/partner-portal/page.jsx` (`KAPAZITAET`/`TERMIN_TAGE`).
- **Kontakt / Sonderanfrage:** werden per SMTP (`/api/kontakt`) gemailt, mit mailto-Fallback.
- **Berufe / Texte / Bilder:** in `public/assets/` (`berufe-data` & Co. stecken im
  Bundle `nest-app.js`; Bilder unter `public/assets/img/berufe/`).

---

## Projektstruktur

```
nest-vercel/
├── app/                  # Next.js App Router (Seiten + API)
│   ├── layout.jsx        # Header/Footer, CSS, Config, Bundle-Script
│   ├── page.jsx          # Startseite
│   ├── <route>/page.jsx  # öffentliche Seiten (rendern content/<name>.js)
│   ├── beruf/page.jsx    # Beruf-Detail (clientseitig befüllt)
│   ├── blog/             # Blog-Liste + [slug]
│   ├── partner-portal/   # Login + Stellenverwaltung (Supabase)
│   └── api/stellen/      # öffentliche Stellen-API
├── components/           # Header, Footer
├── content/              # Seiteninhalte als JS-Module (aus dem Theme erzeugt)
├── lib/                  # Supabase-Clients
├── public/assets/        # CSS, gebündeltes JS, Bilder (~70 MB)
├── supabase/schema.sql   # Datenbank-Setup
└── package.json
```
