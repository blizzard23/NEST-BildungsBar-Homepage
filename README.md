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
   (Legt Tabellen `stellen`, `veranstaltungen`, `posts` + Sicherheitsregeln + Beispieldaten an.)
3. **Project Settings → API** → kopiere:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Partner-Accounts:** Authentication → Users → **Add user** (E-Mail + Passwort).
   Damit loggen sich Partner unter `/partner-portal` ein.

---

## 4. Bei Vercel deployen

1. Auf [vercel.com](https://vercel.com) → **Add New… → Project** → dein GitHub-Repo importieren.
2. Framework wird automatisch als **Next.js** erkannt (kein Build-Befehl nötig).
3. Unter **Environment Variables** eintragen:
   | Name | Wert |
   |------|------|
   | `NEXT_PUBLIC_SUPABASE_URL` | deine Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | dein anon public Key |
   | `NEXT_PUBLIC_TERMIN_MAIL` *(optional)* | info@nest-bildungsbar.de |
4. **Deploy** klicken. Fertig – Vercel gibt dir eine `…vercel.app`-URL.
   Eigene Domain unter **Settings → Domains** verbinden.

Jeder weitere `git push` deployt automatisch neu.

---

## 5. Inhalte pflegen

- **Stellen:** Partner legen sie selbst im Portal an (oder du im Supabase-Table-Editor).
- **Blog:** Tabelle `posts` → Zeile anlegen, `published = true`. `inhalt` ist HTML.
- **Veranstaltungen:** Tabelle `veranstaltungen`.
- **Berufe / Texte / Bilder:** in `public/assets/` (`berufe-data` & Co. stecken im
  Bundle `nest-app.js`; Bilder unter `public/assets/img/berufe/`).
- **Terminanfragen / Kontakt:** erzeugen eine vorausgefüllte E-Mail an `NEXT_PUBLIC_TERMIN_MAIL`.
  Für serverseitigen Versand könnte man später eine API-Route + Mailservice (z. B. Resend) ergänzen.

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
