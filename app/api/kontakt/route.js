import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* Mailversand über SMTP (lima-city). Erwartet POST mit JSON:
   { subject, text, replyTo } – text ist reiner Text (Zeilenumbrüche \n).
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
