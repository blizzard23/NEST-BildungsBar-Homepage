import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { clientIp, rateLimitErreicht, spamGrund } from "@/lib/spamSchutz";

/* Mailversand über SMTP (lima-city). Erwartet POST mit JSON:
   { subject, text, replyTo, hp, t } – text ist reiner Text (Zeilenumbrüche \n),
   hp ist das Honeypot-Feld, t die Ausfüllzeit in ms (Spamschutz, siehe lib/spamSchutz).
   Konfiguration über Umgebungsvariablen (siehe .env.local.example):
   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return NextResponse.json({ ok: false, error: "SMTP nicht konfiguriert" }, { status: 503 });
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

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const mailTo = process.env.MAIL_TO || "info@nest-bildungsbar.de";
  const mailFrom = process.env.MAIL_FROM || user;

  try {
    const transporter = nodemailer.createTransport({
      host, port, secure,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"NEST Website" <${mailFrom}>`,
      to: mailTo,
      replyTo,
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "Versand fehlgeschlagen" }, { status: 502 });
  }
}
