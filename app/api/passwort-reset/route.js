import { NextResponse } from "next/server";
import { sendeMail, mailKonfiguriert, absender } from "@/lib/mailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { clientIp, rateLimitErreicht } from "@/lib/spamSchutz";

/* Passwort-Zurücksetzen fürs Partner-Portal.

   Warum eine eigene Route statt supabase.auth.resetPasswordForEmail()?
   Supabase verschickt die Recovery-Mail über den im Auth-Dashboard hinterlegten
   SMTP-Server. Lehnt der die Anmeldung ab (z. B. weil das Postfach-Passwort
   gewechselt wurde), antwortet /auth/v1/recover mit HTTP 500, es geht keine Mail
   raus und der Recovery-Token wird wieder zurückgerollt – für Unternehmen sieht
   das aus, als sei das Portal kaputt.

   Diese Route ist davon unabhängig: sie erzeugt den Link über die Admin-API
   (generateLink verschickt selbst keine Mail) und mailt ihn über denselben Weg
   wie Kontakt-, Buchungs- und Erinnerungs-Mails (lib/mailer: Resend, sonst SMTP).

   POST { email } -> { ok: true }
   Ob es die Adresse gibt, verrät die Antwort bewusst nicht (keine Konto-Abfrage
   von außen möglich). Echte Konfigurations-/Versandfehler kommen dagegen als
   Fehlerstatus zurück, damit im Portal nicht fälschlich "Mail unterwegs" steht. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IST_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Zielseite nach dem Klick auf den Link. Bevorzugt die fest konfigurierte
   Domain (NEXT_PUBLIC_SITE_URL), sonst der Host der aktuellen Anfrage – damit
   Preview-Deployments und die lokale Entwicklung ohne Extra-Konfiguration gehen.
   Wichtig: Das Ziel muss in Supabase unter Authentication -> URL Configuration
   als Redirect-URL erlaubt sein, sonst landet der Link auf der Site-URL. */
function portalUrl(req) {
  const konfiguriert = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  if (konfiguriert) return konfiguriert.replace(/\/+$/, "") + "/partner-portal";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  return host ? `${proto}://${host}/partner-portal` : undefined;
}

function mailText(link) {
  return [
    "Hallo,",
    "",
    "für deinen Zugang zum NEST-Partner-Portal wurde ein neues Passwort angefordert.",
    "Über diesen Link kannst du es direkt setzen:",
    "",
    link,
    "",
    "Der Link ist aus Sicherheitsgründen nur kurze Zeit gültig (in der Regel eine Stunde)",
    "und funktioniert nur einmal. Ist er abgelaufen, fordere im Portal einfach einen",
    "neuen an.",
    "",
    "Du hast das nicht angefordert? Dann ignoriere diese E-Mail – dein Passwort",
    "bleibt unverändert.",
    "",
    "Dein NEST-Team",
  ].join("\n");
}

function mailHtml(link) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1c2a4a;line-height:1.6">
  <p>Hallo,</p>
  <p>für deinen Zugang zum <strong>NEST-Partner-Portal</strong> wurde ein neues Passwort angefordert.
  Über diesen Link kannst du es direkt setzen:</p>
  <p style="margin:24px 0">
    <a href="${link}" style="background:#f0a500;color:#1c2a4a;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:999px;display:inline-block">Neues Passwort festlegen</a>
  </p>
  <p style="font-size:13px;color:#5b6780">Falls der Button nicht funktioniert, kopiere diese Adresse in deinen Browser:<br>
    <a href="${link}" style="color:#b07800;word-break:break-all">${link}</a></p>
  <p style="font-size:13px;color:#5b6780">Der Link ist aus Sicherheitsgründen nur kurze Zeit gültig (in der Regel eine Stunde)
    und funktioniert nur einmal. Ist er abgelaufen, fordere im Portal einfach einen neuen an.</p>
  <p style="font-size:13px;color:#5b6780">Du hast das nicht angefordert? Dann ignoriere diese E-Mail – dein Passwort bleibt unverändert.</p>
  <p>Dein NEST-Team</p>
</div>`;
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 }); }

  const email = String(body.email || "").trim().slice(0, 160);
  if (!IST_EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 400 });
  }

  // Rate-Limit: verhindert, dass jemand über die Route fremde Postfächer flutet.
  if (rateLimitErreicht("passwort-reset", clientIp(req), 5)) {
    return NextResponse.json({ ok: false, error: "Zu viele Versuche. Bitte in ein paar Minuten noch einmal probieren." }, { status: 429 });
  }

  const sb = supabaseAdmin();
  if (!sb) {
    console.error("Passwort-Reset: SUPABASE_SERVICE_ROLE_KEY fehlt");
    return NextResponse.json({ ok: false, error: "Passwort-Zurücksetzen ist gerade nicht möglich." }, { status: 503 });
  }

  if (!mailKonfiguriert()) {
    console.error("Passwort-Reset: Mailversand nicht konfiguriert");
    return NextResponse.json({ ok: false, error: "Passwort-Zurücksetzen ist gerade nicht möglich." }, { status: 503 });
  }

  // 1) Recovery-Link erzeugen (Admin-API verschickt dabei selbst keine Mail)
  const { data, error } = await sb.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: portalUrl(req) },
  });

  if (error) {
    // Unbekannte Adresse: nach außen wie ein Erfolg behandeln, damit sich über
    // das Formular nicht herausfinden lässt, wer einen Zugang hat. Bewusst eng
    // geprüft – ein echter Konfigurationsfehler soll nicht als Erfolg durchgehen.
    const unbekannt = error.code === "user_not_found" || /user.*not found/i.test(error.message || "");
    if (unbekannt) return NextResponse.json({ ok: true });
    console.error("Passwort-Reset: Link konnte nicht erzeugt werden –", error.message);
    return NextResponse.json({ ok: false, error: "Passwort-Zurücksetzen ist gerade nicht möglich." }, { status: 502 });
  }

  const link = data?.properties?.action_link;
  if (!link) {
    console.error("Passwort-Reset: Antwort ohne action_link");
    return NextResponse.json({ ok: false, error: "Passwort-Zurücksetzen ist gerade nicht möglich." }, { status: 502 });
  }

  // 2) Link über den eigenen Mailversand verschicken
  try {
    await sendeMail({
      from: absender("NEST BildungsBar"),
      to: email,
      subject: "Neues Passwort fürs NEST-Partner-Portal",
      text: mailText(link),
      html: mailHtml(link),
    });
  } catch (e) {
    console.error("Passwort-Reset: Mailversand fehlgeschlagen –", e?.message);
    return NextResponse.json({ ok: false, error: "Die E-Mail konnte nicht verschickt werden." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
