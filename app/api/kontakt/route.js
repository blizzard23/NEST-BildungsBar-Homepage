import { NextResponse } from "next/server";
import { clientIp, rateLimitErreicht, spamGrund } from "@/lib/spamSchutz";
import { sendeMail, mailKonfiguriert, absender, empfaengerTeam } from "@/lib/mailer";

/* Mailversand über lib/mailer (Resend, sonst SMTP). Erwartet POST mit JSON:
   { subject, text, replyTo, hp, t } – text ist reiner Text (Zeilenumbrüche \n),
   hp ist das Honeypot-Feld, t die Ausfüllzeit in ms (Spamschutz, siehe lib/spamSchutz).
   Konfiguration über Umgebungsvariablen (siehe .env.local.example):
   RESEND_API_KEY bzw. SMTP_*, dazu MAIL_TO und MAIL_FROM */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  // Ohne Mailversand antwortet die Route mit 503 – das Formular fällt dann
  // automatisch auf die mailto-Variante zurück.
  if (!mailKonfiguriert()) {
    return NextResponse.json({ ok: false, error: "Mailversand nicht konfiguriert" }, { status: 503 });
  }

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 }); }

  const subject = String(body.subject || "Anfrage über die Website").slice(0, 200);
  const text = String(body.text || "").slice(0, 8000);
  const replyTo = typeof body.replyTo === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.replyTo) ? body.replyTo : undefined;
  if (!text.trim()) return NextResponse.json({ ok: false, error: "Leerer Inhalt" }, { status: 400 });

  // Spamschutz: Spam still verwerfen (ok:true), damit Bots keine Rückmeldung bekommen
  const ip = clientIp(req);
  const grund = rateLimitErreicht("kontakt", ip, 5)
    ? "Rate-Limit überschritten"
    : spamGrund({ honeypot: body.hp, ausfuellZeitMs: body.t, kurzfelder: [subject, replyTo], text });
  if (grund) {
    console.warn("Kontakt-Spam verworfen (" + grund + ") von " + ip);
    return NextResponse.json({ ok: true });
  }

  try {
    await sendeMail({
      from: absender("NEST Website"),
      to: empfaengerTeam(),
      replyTo,
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "Versand fehlgeschlagen" }, { status: 502 });
  }
}
