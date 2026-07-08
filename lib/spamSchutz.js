/* Mehrstufiger Spamschutz für die öffentlichen Formular-APIs (Buchung, Kontakt).
   Stufen:
   1) Honeypot – unsichtbares Feld "website"; Menschen lassen es leer, Bots füllen es aus.
   2) Ausfüllzeit – das Formular schickt mit, wie viele ms seit Seitenaufruf vergangen
      sind. Unter 3 Sekunden schafft kein Mensch; direkte API-POSTs haben gar keinen Wert.
   3) Inhaltsprüfung – Links im Namensfeld, Link-Flut, HTML/BBCode, typische
      Spam-Begriffe und überwiegend kyrillischer Text (deutschsprachige Zielgruppe).
   4) Rate-Limit – max. Anfragen pro IP in 10 Minuten (in-memory, pro Server-Instanz;
      auf Vercel best-effort, fängt aber Bot-Bursts auf derselben warmen Instanz ab).
   Spam wird von den Routen still verworfen (Antwort ok:true), damit Bots keine
   Rückmeldung bekommen, woran sie gescheitert sind. */

const FENSTER_MS = 10 * 60 * 1000;
const MIN_AUSFUELLZEIT_MS = 3000;
const anfragenProSchluessel = new Map(); // "endpunkt:IP" -> [Zeitstempel]

export function clientIp(req) {
  const weitergeleitet = req.headers.get("x-forwarded-for") || "";
  return weitergeleitet.split(",")[0].trim() || req.headers.get("x-real-ip") || "unbekannt";
}

/* true, wenn die IP ihr Kontingent im Zeitfenster überschritten hat.
   Zählt den aktuellen Aufruf mit. endpunkt trennt die Zähler (z. B. "kontakt",
   "buchung"), damit sich die Formulare nicht gegenseitig das Limit wegnehmen. */
export function rateLimitErreicht(endpunkt, ip, max) {
  const schluessel = endpunkt + ":" + ip;
  const jetzt = Date.now();
  const liste = (anfragenProSchluessel.get(schluessel) || []).filter((t) => jetzt - t < FENSTER_MS);
  liste.push(jetzt);
  anfragenProSchluessel.set(schluessel, liste);
  if (anfragenProSchluessel.size > 500) {
    for (const [k, v] of anfragenProSchluessel) {
      if (!v.some((t) => jetzt - t < FENSTER_MS)) anfragenProSchluessel.delete(k);
    }
  }
  return liste.length > max;
}

const SPAM_MUSTER = [
  /\bviagra\b/i, /\bcialis\b/i, /\bcasino\b/i, /\bjackpot\b/i,
  /\bporn\w*\b/i, /\bsex ?cam/i, /\bescort/i,
  /\bbitcoin\b/i, /\bcrypto(currency)?\b/i, /\bforex\b/i, /\bbinary options\b/i,
  /\bbacklinks?\b/i, /\bseo (service|ranking|agentur|agency|optimi)/i, /\bgoogle ranking\b/i,
  /\bmake money\b/i, /\bearn (money|cash)\b/i, /\bwork from home\b/i, /\bpassive income\b/i,
  /\bguaranteed (profit|income)\b/i, /\bloan (offer|approval)\b/i, /\bkredit ohne schufa\b/i,
  /\blottery\b/i, /\byou (have )?won\b/i, /\bmillion (dollar|euro)/i,
  /\[url=/i, /<a\s+href/i,
];

const URL_MUSTER = /https?:\/\/|www\./i;

/* Prüft eine Formular-Einsendung. Gibt einen kurzen Grund (String) zurück,
   wenn sie als Spam gilt, sonst null.
   - honeypot: Wert des unsichtbaren Felds
   - ausfuellZeitMs: ms zwischen Seitenaufruf und Absenden (vom Frontend mitgeschickt)
   - kurzfelder: Werte, in denen nie ein Link stehen darf (Name, Telefon, Schule …)
   - text: freier Nachrichtentext */
export function spamGrund({ honeypot, ausfuellZeitMs, kurzfelder = [], text = "" }) {
  if (String(honeypot || "").trim()) return "Honeypot ausgefüllt";

  const zeit = Number(ausfuellZeitMs);
  if (!Number.isFinite(zeit)) return "kein Zeitstempel (direkter API-Aufruf)";
  if (zeit >= 0 && zeit < MIN_AUSFUELLZEIT_MS) return "zu schnell abgeschickt";

  for (const feld of kurzfelder) {
    if (URL_MUSTER.test(String(feld || ""))) return "Link in Kurzfeld";
  }

  const inhalt = String(text || "");
  const links = inhalt.match(/https?:\/\/|www\./gi) || [];
  if (links.length >= 3) return "zu viele Links";

  const alles = kurzfelder.join(" ") + " " + inhalt;
  for (const muster of SPAM_MUSTER) {
    if (muster.test(alles)) return "Spam-Begriff (" + muster.source + ")";
  }

  const buchstaben = alles.match(/[A-Za-zÄÖÜäöüßЀ-ӿ]/g) || [];
  const kyrillisch = alles.match(/[Ѐ-ӿ]/g) || [];
  if (buchstaben.length > 20 && kyrillisch.length > buchstaben.length * 0.3) {
    return "überwiegend kyrillischer Text";
  }

  return null;
}
