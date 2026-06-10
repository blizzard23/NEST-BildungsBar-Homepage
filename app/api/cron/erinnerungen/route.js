import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/* Täglicher Cron (siehe vercel.json): schickt allen, die MORGEN einen Termin
   haben, eine freundliche Erinnerung per E-Mail und (optional) WhatsApp.
   Schutz: Vercel sendet bei gesetztem CRON_SECRET den Header
   "Authorization: Bearer <CRON_SECRET>". */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function morgenISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

/* Telefonnummer grob nach E.164 (für WhatsApp Cloud API, ohne führendes +). */
function normTel(t) {
  let n = String(t || "").replace(/[^\d+]/g, "");
  if (!n) return "";
  if (n.startsWith("+")) n = n.slice(1);
  else if (n.startsWith("00")) n = n.slice(2);
  else if (n.startsWith("0")) n = "49" + n.slice(1);
  return /^\d{8,15}$/.test(n) ? n : "";
}

async function sendWhatsApp(tel, wann, name) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const template = process.env.WHATSAPP_TEMPLATE;
  const lang = process.env.WHATSAPP_LANG || "de";
  const to = normTel(tel);
  if (!token || !phoneId || !template || !to) return false;
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: lang },
          // Template-Body sollte genau eine Variable {{1}} enthalten (z. B. den Termin)
          components: [{ type: "body", parameters: [{ type: "text", text: wann }] }],
        },
      }),
    });
    return res.ok;
  } catch (e) { return false; }
}

export async function POST(req) { return handle(req); }
export async function GET(req) { return handle(req); }

async function handle(req) {
  // Zugriffsschutz
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization") || "";
    if (auth !== "Bearer " + secret) {
      return NextResponse.json({ ok: false, error: "Nicht autorisiert" }, { status: 401 });
    }
  }

  const sb = supabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "SUPABASE_SERVICE_ROLE_KEY fehlt" }, { status: 503 });

  const tag = morgenISO();
  const { data: termine, error } = await sb
    .from("buchungen").select("*")
    .eq("datum", tag).is("erinnert_am", null);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!termine || !termine.length) return NextResponse.json({ ok: true, tag, anzahl: 0 });

  // SMTP einmalig vorbereiten
  let transporter = null;
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
    transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
  }
  const von = `"NEST BildungsBar" <${process.env.MAIL_FROM || user || "info@nest-bildungsbar.de"}>`;

  let mails = 0, whatsapps = 0;
  for (const t of termine) {
    const wann = (t.datum_text || t.datum) + " um " + t.uhrzeit + " in " + t.standort;

    if (transporter && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email || "")) {
      const text = [
        "Hallo " + t.name + ",", "",
        "kleine Erinnerung: morgen ist dein Termin bei der NEST BildungsBar 🎉", "",
        "📅 " + (t.datum_text || t.datum),
        "🕔 " + t.uhrzeit,
        "📍 " + t.standort, "",
        "Wir freuen uns auf dich! Falls etwas dazwischenkommt, gib uns bitte kurz Bescheid.", "",
        "Dein NEST-Team",
      ].join("\n");
      try {
        await transporter.sendMail({ from: von, to: t.email, subject: "Erinnerung: Dein Termin morgen – " + t.standort, text });
        mails++;
      } catch (e) {}
    }

    if (await sendWhatsApp(t.telefon, wann, t.name)) whatsapps++;

    await sb.from("buchungen").update({ erinnert_am: new Date().toISOString().slice(0, 10) }).eq("id", t.id);
  }

  return NextResponse.json({ ok: true, tag, anzahl: termine.length, mails, whatsapps });
}
