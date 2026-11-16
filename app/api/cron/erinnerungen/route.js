import { NextResponse } from "next/server";
import { sendeMail, mailKonfiguriert, absender } from "@/lib/mailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendeWhatsAppErinnerung } from "@/lib/whatsapp";

/* Täglicher Cron (siehe vercel.json): schickt allen, die MORGEN einen Termin
   haben, eine freundliche Erinnerung per E-Mail – und zusätzlich per WhatsApp,
   wenn die Person das bei der Buchung angehakt hat (Spalte whatsapp_erinnerung,
   Opt-in) und WhatsApp konfiguriert ist (siehe lib/whatsapp.js).
   Schutz: Vercel sendet bei gesetztem CRON_SECRET den Header
   "Authorization: Bearer <CRON_SECRET>". */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function morgenISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
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

  const kannMailen = mailKonfiguriert();
  const von = absender("NEST BildungsBar");

  let mails = 0, whatsapps = 0;
  for (const t of termine) {
    const wann = (t.datum_text || t.datum) + " um " + t.uhrzeit + " in " + t.standort;

    if (kannMailen && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email || "")) {
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
        await sendeMail({ from: von, to: t.email, subject: "Erinnerung: Dein Termin morgen – " + t.standort, text });
        mails++;
      } catch (e) {}
    }

    // Nur mit ausdrücklicher Einwilligung aus dem Buchungsformular
    if (t.whatsapp_erinnerung === true && (await sendeWhatsAppErinnerung(t.telefon, wann))) whatsapps++;

    await sb.from("buchungen").update({ erinnert_am: new Date().toISOString().slice(0, 10) }).eq("id", t.id);
  }

  return NextResponse.json({ ok: true, tag, anzahl: termine.length, mails, whatsapps });
}
