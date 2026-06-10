import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseServer } from "@/lib/supabaseServer";

/* Terminbuchung: speichert die Anfrage in Supabase (Tabelle "buchungen")
   UND verschickt eine E-Mail über SMTP (lima-city).
   Gibt ok:true zurück, sobald mindestens eines davon geklappt hat. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(v, max) { return String(v == null ? "" : v).slice(0, max || 300); }

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 }); }

  const buchung = {
    standort: clean(b.standort, 60),
    datum: /^\d{4}-\d{2}-\d{2}$/.test(b.datum || "") ? b.datum : null,
    datum_text: clean(b.datumText, 80),
    uhrzeit: clean(b.uhrzeit, 40),
    name: clean(b.name, 120),
    email: clean(b.email, 160),
    telefon: clean(b.telefon, 60),
    schule: clean(b.schule, 160),
    nachricht: clean(b.nachricht, 2000),
  };
  if (!buchung.name || !buchung.standort || !buchung.uhrzeit) {
    return NextResponse.json({ ok: false, error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  let stored = false, mailed = false;

  const KAPAZITAET = { Wuppertal: 4, Essen: 2 };
  const cap = KAPAZITAET[buchung.standort] || 0;
  const sb = supabaseServer();

  // 0) Kapazität prüfen (max. 4 in Wuppertal, 2 in Essen pro Tag)
  if (sb && cap && buchung.datum) {
    const { data, error } = await sb.rpc("termin_belegung", { p_standort: buchung.standort });
    if (!error && Array.isArray(data)) {
      const row = data.find((r) => r.datum === buchung.datum);
      const anzahl = row ? Number(row.anzahl) || 0 : 0;
      if (anzahl >= cap) {
        return NextResponse.json({ ok: false, error: "ausgebucht" }, { status: 409 });
      }
    }
  }

  // 1) In Supabase speichern (RLS erlaubt öffentliches INSERT)
  if (sb) {
    const { error } = await sb.from("buchungen").insert(buchung);
    stored = !error;
  }

  // 2) E-Mail verschicken (optional, wenn SMTP konfiguriert)
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    try {
      const port = Number(process.env.SMTP_PORT || 465);
      const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
      const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
      const text = [
        "Neue Terminbuchung über die Website:", "",
        "Standort: " + buchung.standort + (b.adresse ? " (" + clean(b.adresse, 120) + ")" : ""),
        "Datum: " + (buchung.datum_text || buchung.datum || "—"),
        "Uhrzeit: " + buchung.uhrzeit, "",
        "Name: " + buchung.name,
        "E-Mail: " + (buchung.email || "—"),
        "Telefon: " + (buchung.telefon || "—"),
        "Schule/Klasse: " + (buchung.schule || "—"), "",
        "Nachricht: " + (buchung.nachricht || "—"),
      ].join("\n");
      const von = `"NEST BildungsBar" <${process.env.MAIL_FROM || user}>`;
      const wann = (buchung.datum_text || buchung.datum) + " um " + buchung.uhrzeit;

      // a) Benachrichtigung ans NEST-Team
      await transporter.sendMail({
        from: von,
        to: process.env.MAIL_TO || "info@nest-bildungsbar.de",
        replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buchung.email) ? buchung.email : undefined,
        subject: "Terminbuchung – " + buchung.standort + " · " + wann,
        text,
      });

      // b) Bestätigung an die buchende Person
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buchung.email)) {
        const bestaetigung = [
          "Hallo " + buchung.name + ",", "",
          "dein Termin bei der NEST BildungsBar ist gebucht:", "",
          "📍 Standort: " + buchung.standort + (b.adresse ? " (" + clean(b.adresse, 120) + ")" : ""),
          "📅 Datum: " + (buchung.datum_text || buchung.datum),
          "🕔 Uhrzeit: " + buchung.uhrzeit, "",
          "Am Tag vor deinem Termin schicken wir dir eine kurze Erinnerung.",
          "Falls dir doch etwas dazwischenkommt, antworte einfach auf diese E-Mail.", "",
          "Wir freuen uns auf dich!",
          "Dein NEST-Team",
        ].join("\n");
        await transporter.sendMail({
          from: von,
          to: buchung.email,
          subject: "Dein Termin ist gebucht – " + buchung.standort + " · " + wann,
          text: bestaetigung,
        });
      }
      mailed = true;
    } catch (e) { mailed = false; }
  }

  if (!stored && !mailed) {
    return NextResponse.json({ ok: false, error: "Weder Speichern noch Mailversand möglich" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, stored, mailed });
}
