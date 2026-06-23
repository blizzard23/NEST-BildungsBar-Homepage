import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseServer } from "@/lib/supabaseServer";

/* Anmeldung eines Unternehmens zu einer Veranstaltung:
   - speichert die Anmeldung in Supabase (Tabelle "veranstaltung_anmeldungen")
   - verschickt eine Benachrichtigung ans NEST-Team
   - verschickt eine Bestätigung ans Unternehmen mit .ics-Kalenderanhang
     und einem "In Google Kalender"-Link.
   Gibt ok:true zurück, sobald das Speichern geklappt hat. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(v, max) { return String(v == null ? "" : v).slice(0, max || 300); }
const istEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || "");

// ICS-Textwerte escapen (Backslash, Komma, Semikolon, Zeilenumbruch)
function icsEsc(s) { return String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/[,;]/g, (m) => "\\" + m).replace(/\r?\n/g, "\\n"); }
// Lange ICS-Zeilen auf 75 Zeichen falten
function icsFold(line) {
  if (line.length <= 75) return line;
  let out = line.slice(0, 75); let rest = line.slice(75);
  while (rest.length > 74) { out += "\r\n " + rest.slice(0, 74); rest = rest.slice(74); }
  return out + "\r\n " + rest;
}
function pad(n) { return String(n).padStart(2, "0"); }
function stampUTC(d) { return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + "Z"; }

// Start-/Endzeit aus dem freien Uhrzeit-Text lesen (z. B. "17:00–19:00")
function parseZeiten(uhrzeit) {
  const treffer = String(uhrzeit || "").match(/(\d{1,2})[:.](\d{2})/g) || [];
  const toMin = (t) => { const [h, m] = t.replace(".", ":").split(":").map(Number); return { h, m }; };
  if (!treffer.length) return null;
  const start = toMin(treffer[0]);
  const ende = treffer[1] ? toMin(treffer[1]) : { h: (start.h + 2) % 24, m: start.m };
  return { start, ende };
}

// ICS-Datei (floating local time, passend für Europe/Berlin)
function baueIcs(ev) {
  const [j, mo, t] = String(ev.datum).split("-").map(Number);
  const zeiten = parseZeiten(ev.uhrzeit);
  const lokal = (h, m) => `${j}${pad(mo)}${pad(t)}T${pad(h)}${pad(m)}00`;
  let dtStart, dtEnd;
  if (zeiten) {
    dtStart = "DTSTART:" + lokal(zeiten.start.h, zeiten.start.m);
    dtEnd = "DTEND:" + lokal(zeiten.ende.h, zeiten.ende.m);
  } else {
    const naechster = new Date(j, mo - 1, t + 1);
    dtStart = "DTSTART;VALUE=DATE:" + `${j}${pad(mo)}${pad(t)}`;
    dtEnd = "DTEND;VALUE=DATE:" + `${naechster.getFullYear()}${pad(naechster.getMonth() + 1)}${pad(naechster.getDate())}`;
  }
  const ort = [ev.adresse, ev.ort].filter(Boolean).join(", ") || ev.ort || "";
  const zeilen = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NEST BildungsBar//Veranstaltungen//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:" + (ev.id || Date.now()) + "@nest-bildungsbar.de",
    "DTSTAMP:" + stampUTC(new Date()),
    dtStart,
    dtEnd,
    "SUMMARY:" + icsEsc(ev.titel),
    ort ? "LOCATION:" + icsEsc(ort) : null,
    ev.beschreibung ? "DESCRIPTION:" + icsEsc(ev.beschreibung) : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).map(icsFold);
  return zeilen.join("\r\n");
}

// "In Google Kalender"-Link (Zeitzone Europe/Berlin über ctz)
function googleLink(ev) {
  const [j, mo, t] = String(ev.datum).split("-").map(Number);
  const zeiten = parseZeiten(ev.uhrzeit);
  let dates;
  if (zeiten) {
    const f = (h, m) => `${j}${pad(mo)}${pad(t)}T${pad(h)}${pad(m)}00`;
    dates = f(zeiten.start.h, zeiten.start.m) + "/" + f(zeiten.ende.h, zeiten.ende.m);
  } else {
    const naechster = new Date(j, mo - 1, t + 1);
    dates = `${j}${pad(mo)}${pad(t)}/${naechster.getFullYear()}${pad(naechster.getMonth() + 1)}${pad(naechster.getDate())}`;
  }
  const ort = [ev.adresse, ev.ort].filter(Boolean).join(", ") || ev.ort || "";
  const p = new URLSearchParams({ action: "TEMPLATE", text: ev.titel || "Veranstaltung", dates, ctz: "Europe/Berlin" });
  if (ev.beschreibung) p.set("details", ev.beschreibung);
  if (ort) p.set("location", ort);
  return "https://calendar.google.com/calendar/render?" + p.toString();
}

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 }); }

  const veranstaltungId = clean(b.veranstaltung_id, 60);
  const personen = Math.min(2, Math.max(1, parseInt(b.personen, 10) || 1));
  const begleit = (Array.isArray(b.begleitpersonen) ? b.begleitpersonen : [])
    .map((n) => clean(n, 120).trim()).filter(Boolean).slice(0, personen - 1);
  const anmeldung = {
    veranstaltung_id: veranstaltungId,
    firma: clean(b.firma, 160).trim(),
    name: clean(b.name, 120).trim(),
    email: clean(b.email, 160).trim(),
    telefon: clean(b.telefon, 60).trim() || null,
    personen,
    begleitpersonen: begleit,
    nachricht: clean(b.nachricht, 2000).trim() || null,
  };
  if (!veranstaltungId || !anmeldung.firma || !anmeldung.name || !istEmail(anmeldung.email)) {
    return NextResponse.json({ ok: false, error: "Pflichtfelder fehlen" }, { status: 400 });
  }
  if (begleit.length < personen - 1) {
    return NextResponse.json({ ok: false, error: "Begleitpersonen müssen benannt werden" }, { status: 400 });
  }

  const sb = supabaseServer();
  if (!sb) return NextResponse.json({ ok: false, error: "Backend nicht verbunden" }, { status: 503 });

  // Veranstaltung laden (öffentliche Read-Policy) – maßgeblich für E-Mail/ICS
  const { data: ev, error: evErr } = await sb
    .from("veranstaltungen").select("*").eq("id", veranstaltungId).maybeSingle();
  if (evErr || !ev) return NextResponse.json({ ok: false, error: "Veranstaltung nicht gefunden" }, { status: 404 });

  // 1) Anmeldung speichern (RLS erlaubt öffentliches INSERT)
  const { error: insErr } = await sb.from("veranstaltung_anmeldungen").insert(anmeldung);
  if (insErr) return NextResponse.json({ ok: false, error: "Speichern fehlgeschlagen" }, { status: 502 });

  // 2) E-Mails verschicken (optional, wenn SMTP konfiguriert)
  let mailed = false;
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    try {
      const port = Number(process.env.SMTP_PORT || 465);
      const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
      const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
      const von = `"NEST BildungsBar" <${process.env.MAIL_FROM || user}>`;
      const ort = [ev.adresse, ev.ort].filter(Boolean).join(", ") || ev.ort || "—";
      const wann = ev.datum + (ev.uhrzeit ? " · " + ev.uhrzeit : "");
      const ics = baueIcs(ev);

      // a) Benachrichtigung ans NEST-Team
      await transporter.sendMail({
        from: von,
        to: process.env.MAIL_TO || "info@nest-bildungsbar.de",
        replyTo: anmeldung.email,
        subject: "Veranstaltungs-Anmeldung – " + ev.titel + " · " + wann,
        text: [
          "Neue Anmeldung eines Unternehmens zu einer Veranstaltung:", "",
          "Veranstaltung: " + ev.titel,
          "Datum: " + wann,
          "Ort: " + ort, "",
          "Unternehmen: " + anmeldung.firma,
          "Ansprechpartner:in: " + anmeldung.name,
          "E-Mail: " + anmeldung.email,
          "Telefon: " + (anmeldung.telefon || "—"),
          "Personen: " + anmeldung.personen,
          "Begleitung: " + (begleit.length ? begleit.join(", ") : "—"), "",
          "Nachricht: " + (anmeldung.nachricht || "—"),
        ].join("\n"),
      });

      // b) Bestätigung ans Unternehmen – mit Kalender-Anhang
      await transporter.sendMail({
        from: von,
        to: anmeldung.email,
        subject: "Anmeldung bestätigt – " + ev.titel + " · " + wann,
        text: [
          "Hallo " + anmeldung.name + ",", "",
          "vielen Dank für eure Anmeldung! Hiermit bestätigen wir die Teilnahme von " + anmeldung.firma + " an folgender Veranstaltung:", "",
          "📌 " + ev.titel,
          "📅 Datum: " + ev.datum + (ev.uhrzeit ? "\n🕔 Uhrzeit: " + ev.uhrzeit : ""),
          "📍 Ort: " + ort,
          ev.beschreibung ? "\n" + ev.beschreibung : "",
          "",
          "👥 Angemeldete Personen: " + anmeldung.personen + (begleit.length ? " (mit " + begleit.join(", ") + ")" : ""),
          "",
          "Den Termin könnt ihr direkt in euren Kalender übernehmen:",
          "• Die angehängte Datei „termin.ics“ mit einem Klick öffnen (Outlook, Apple Kalender, etc.).",
          "• Oder per Google Kalender: " + googleLink(ev),
          "",
          "Bei Fragen antwortet einfach auf diese E-Mail.", "",
          "Wir freuen uns auf euch!",
          "Euer NEST-Team",
        ].join("\n"),
        icalEvent: { method: "PUBLISH", filename: "termin.ics", content: ics },
        attachments: [{ filename: "termin.ics", content: ics, contentType: "text/calendar; charset=utf-8; method=PUBLISH" }],
      });
      mailed = true;
    } catch (e) { mailed = false; }
  }

  return NextResponse.json({ ok: true, stored: true, mailed });
}
