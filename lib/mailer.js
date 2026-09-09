import nodemailer from "nodemailer";

/* Zentraler Mailversand für alle API-Routen (Kontakt, Buchung, Veranstaltungs-
   Anmeldung, Erinnerungs-Cron, Passwort-Reset, Registrierung).

   Zwei Wege, in dieser Reihenfolge:
   1) Resend (HTTPS-API) – wird genommen, sobald RESEND_API_KEY gesetzt ist.
      Auf Vercel der zuverlässigere Weg: Serverless-Funktionen und SMTP vertragen
      sich schlecht (Verbindungsaufbau je Aufruf, Timeouts, geblockte Ports), und
      Resend liefert Zustellprotokolle sowie DKIM/SPF über die eigene Domain.
   2) SMTP (lima-city) über nodemailer – der bisherige Weg, bleibt als Fallback
      erhalten. Ohne RESEND_API_KEY ändert sich also nichts.

   Ist keiner von beiden konfiguriert, meldet mailKonfiguriert() false; die
   Routen fallen dann auf ihr bisheriges Verhalten zurück (mailto-Variante bzw.
   "nur speichern, nicht mailen").

   Wichtig bei Resend: Die Absenderadresse (MAIL_FROM) muss zu einer im
   Resend-Dashboard verifizierten Domain gehören, sonst lehnt die API ab. */

const RESEND_URL = "https://api.resend.com/emails";
const STANDARD_ABSENDER = "info@nest-bildungsbar.de";
const TIMEOUT_MS = 15000;

function resendKey() {
  return (process.env.RESEND_API_KEY || "").trim() || null;
}

function smtpZugang() {
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  return { host, port, secure, auth: { user, pass } };
}

/* "resend" | "smtp" | null – vor allem für aussagekräftige Logs. */
export function mailWeg() {
  if (resendKey()) return "resend";
  if (smtpZugang()) return "smtp";
  return null;
}

export function mailKonfiguriert() {
  return mailWeg() !== null;
}

/* Absenderadresse. Bei Resend muss die Domain dort verifiziert sein; beim
   SMTP-Weg muss sie zum lima-city-Postfach passen. */
export function absenderAdresse() {
  return (process.env.MAIL_FROM || "").trim() || process.env.SMTP_USER || STANDARD_ABSENDER;
}

/* Fertiger From-Header, z. B. absender("NEST Website"). */
export function absender(anzeigename) {
  return `"${String(anzeigename).replace(/"/g, "")}" <${absenderAdresse()}>`;
}

export function empfaengerTeam() {
  return process.env.MAIL_TO || STANDARD_ABSENDER;
}

function alsListe(wert) {
  return (Array.isArray(wert) ? wert : [wert]).filter(Boolean);
}

/* nodemailer-Anhänge ({ filename, content, contentType }) auf das
   Resend-Format umbauen – dort muss der Inhalt base64-kodiert sein. */
function anhaengeFuerResend(attachments) {
  return attachments.map((a) => ({
    filename: a.filename,
    content: Buffer.from(a.content).toString("base64"),
    content_type: a.contentType,
  }));
}

function warte(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function sendeUeberResend(key, { from, to, replyTo, subject, text, html, attachments }, versuch = 1) {
  const nutzlast = {
    from,
    to: alsListe(to),
    subject,
    ...(text ? { text } : {}),
    ...(html ? { html } : {}),
    ...(replyTo ? { reply_to: replyTo } : {}),
    ...(attachments?.length ? { attachments: anhaengeFuerResend(attachments) } : {}),
  };

  let antwort;
  try {
    antwort = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify(nutzlast),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (e) {
    // Netzwerkfehler/Timeout – als Versandfehler weiterreichen.
    throw new Error("Resend nicht erreichbar: " + (e?.message || "unbekannt"));
  }

  const daten = await antwort.json().catch(() => ({}));

  // Resend erlaubt 2 Anfragen pro Sekunde. Der Erinnerungs-Cron verschickt in
  // einer Schleife, deshalb einmal kurz warten und erneut versuchen, statt die
  // Mail zu verlieren.
  if (antwort.status === 429 && versuch < 3) {
    await warte(versuch * 700);
    return sendeUeberResend(key, { from, to, replyTo, subject, text, html, attachments }, versuch + 1);
  }

  if (!antwort.ok) {
    // Häufigster Fall in der Praxis: Absender-Domain nicht verifiziert (403).
    throw new Error("Resend " + antwort.status + ": " + (daten?.message || daten?.error?.message || "Versand fehlgeschlagen"));
  }
  return daten?.id || null;
}

async function sendeUeberSmtp(zugang, mail) {
  const transporter = nodemailer.createTransport(zugang);
  const info = await transporter.sendMail(mail);
  return info?.messageId || null;
}

/* Eine E-Mail verschicken. Wirft bei Fehlschlag (die Routen fangen das ab und
   entscheiden selbst, ob das ein harter Fehler ist).
   Felder: from, to, replyTo, subject, text, html, attachments, icalEvent.
   `icalEvent` versteht nur nodemailer (erzeugt einen text/calendar-Teil, den
   Outlook als Einladung erkennt); bei Resend genügt der normale Anhang. */
export async function sendeMail(mail) {
  const key = resendKey();
  if (key) {
    const { icalEvent, ...rest } = mail; // eslint-disable-line no-unused-vars
    return sendeUeberResend(key, rest);
  }
  const zugang = smtpZugang();
  if (!zugang) throw new Error("Mailversand ist nicht konfiguriert (weder RESEND_API_KEY noch SMTP_*).");
  return sendeUeberSmtp(zugang, mail);
}
