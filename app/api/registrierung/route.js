import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { clientIp, rateLimitErreicht } from "@/lib/spamSchutz";

/* Registrierung fürs Partner-Portal (Bestätigungsmail).

   Warum eine eigene Route statt supabase.auth.signUp()?
   Bei signUp() verschickt Supabase die Bestätigungsmail selbst – über den im
   Auth-Dashboard hinterlegten SMTP-Server. Lehnt der die Anmeldung ab, bricht
   der komplette Signup ab: /auth/v1/signup antwortet mit HTTP 500
   ("535 5.7.8 Error: authentication failed"), der angelegte Benutzer wird
   zurückgerollt und es geht keine Mail raus. Für Unternehmen sieht das aus, als
   sei die Registrierung kaputt – anmelden können sie sich danach auch nicht,
   weil das Konto gar nicht existiert.

   Diese Route ist davon unabhängig: sie legt den Zugang über die Admin-API an
   und erzeugt den Bestätigungslink mit generateLink (verschickt selbst keine
   Mail). Verschickt wird über denselben SMTP-Zugang wie Kontakt-, Buchungs-,
   Erinnerungs- und Passwort-Reset-Mails. Gleiches Vorgehen wie in
   /api/passwort-reset.

   POST { email, password, firma, nestplayRef } -> { ok: true }
   Ob es die Adresse schon gibt, verrät die Antwort bewusst nicht. Existiert
   bereits ein Zugang, geht stattdessen eine Mail mit Link zum Passwortsetzen
   raus – so kommt die richtige Person trotzdem ans Ziel, ohne dass sich über
   das Formular fremde Konten aufspüren lassen. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IST_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORT = 8;

/* Zielseite nach dem Klick auf den Link – identisch zu /api/passwort-reset.
   Bevorzugt die fest konfigurierte Domain (NEXT_PUBLIC_SITE_URL), sonst der
   Host der aktuellen Anfrage. Das Ziel muss in Supabase unter
   Authentication -> URL Configuration als Redirect-URL erlaubt sein. */
function portalUrl(req) {
  const konfiguriert = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  if (konfiguriert) return konfiguriert.replace(/\/+$/, "") + "/partner-portal";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  return host ? `${proto}://${host}/partner-portal` : undefined;
}

function huelle(inhalt) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1c2a4a;line-height:1.6">${inhalt}</div>`;
}

function knopf(link, text) {
  return `<p style="margin:24px 0">
    <a href="${link}" style="background:#f0a500;color:#1c2a4a;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:999px;display:inline-block">${text}</a>
  </p>
  <p style="font-size:13px;color:#5b6780">Falls der Button nicht funktioniert, kopiere diese Adresse in deinen Browser:<br>
    <a href="${link}" style="color:#b07800;word-break:break-all">${link}</a></p>`;
}

function bestaetigungText(link, firma) {
  return [
    "Hallo,",
    "",
    `schön, dass ${firma} im NEST-Partner-Portal dabei ist!`,
    "Bitte bestätige noch kurz deine E-Mail-Adresse – danach kannst du dich anmelden:",
    "",
    link,
    "",
    "Der Link ist aus Sicherheitsgründen nur kurze Zeit gültig und funktioniert nur",
    "einmal. Ist er abgelaufen, registriere dich im Portal einfach noch einmal mit",
    "derselben Adresse – dann kommt ein neuer Link.",
    "",
    "Du hast dich nicht registriert? Dann ignoriere diese E-Mail einfach.",
    "",
    "Dein NEST-Team",
  ].join("\n");
}

function bestaetigungHtml(link, firma) {
  return huelle(`<p>Hallo,</p>
  <p>schön, dass <strong>${firma}</strong> im <strong>NEST-Partner-Portal</strong> dabei ist!
  Bitte bestätige noch kurz deine E-Mail-Adresse – danach kannst du dich anmelden:</p>
  ${knopf(link, "E-Mail-Adresse bestätigen")}
  <p style="font-size:13px;color:#5b6780">Der Link ist aus Sicherheitsgründen nur kurze Zeit gültig und funktioniert nur einmal.
    Ist er abgelaufen, registriere dich im Portal einfach noch einmal mit derselben Adresse – dann kommt ein neuer Link.</p>
  <p style="font-size:13px;color:#5b6780">Du hast dich nicht registriert? Dann ignoriere diese E-Mail einfach.</p>
  <p>Dein NEST-Team</p>`);
}

function bestehtText(link) {
  return [
    "Hallo,",
    "",
    "zu dieser E-Mail-Adresse gibt es im NEST-Partner-Portal bereits einen Zugang –",
    "wir haben deshalb kein zweites Konto angelegt.",
    "",
    "Du kennst dein Passwort nicht mehr (oder hast die Adresse noch nie bestätigt)?",
    "Über diesen Link kannst du ein neues Passwort setzen und kommst direkt ins Portal:",
    "",
    link,
    "",
    "Der Link ist aus Sicherheitsgründen nur kurze Zeit gültig und funktioniert nur einmal.",
    "",
    "Du hast das nicht angefordert? Dann ignoriere diese E-Mail – an deinem Zugang",
    "ändert sich nichts.",
    "",
    "Dein NEST-Team",
  ].join("\n");
}

function bestehtHtml(link) {
  return huelle(`<p>Hallo,</p>
  <p>zu dieser E-Mail-Adresse gibt es im <strong>NEST-Partner-Portal</strong> bereits einen Zugang –
  wir haben deshalb kein zweites Konto angelegt.</p>
  <p>Du kennst dein Passwort nicht mehr (oder hast die Adresse noch nie bestätigt)?
  Über diesen Link kannst du ein neues Passwort setzen und kommst direkt ins Portal:</p>
  ${knopf(link, "Neues Passwort festlegen")}
  <p style="font-size:13px;color:#5b6780">Der Link ist aus Sicherheitsgründen nur kurze Zeit gültig und funktioniert nur einmal.</p>
  <p style="font-size:13px;color:#5b6780">Du hast das nicht angefordert? Dann ignoriere diese E-Mail – an deinem Zugang ändert sich nichts.</p>
  <p>Dein NEST-Team</p>`);
}

/* Supabase meldet eine schon vergebene Adresse je nach Version mit
   code "email_exists" oder als Klartext. Bewusst eng geprüft, damit ein echter
   Konfigurationsfehler nicht als "gibt's schon" durchgeht. */
function adresseVergeben(error) {
  const text = error?.message || "";
  return error?.code === "email_exists"
    || error?.code === "user_already_exists"
    || /already (registered|exists|been registered)/i.test(text)
    || /email address (is )?already/i.test(text);
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Ungültige Anfrage" }, { status: 400 }); }

  const email = String(body.email || "").trim().slice(0, 160);
  const password = String(body.password || "");
  const firma = String(body.firma || "").trim().slice(0, 120);
  const nestplayRef = String(body.nestplayRef || "").trim().slice(0, 120) || firma;

  if (!IST_EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORT) {
    return NextResponse.json({ ok: false, error: "Das Passwort muss mindestens 8 Zeichen haben." }, { status: 400 });
  }
  if (!firma) {
    return NextResponse.json({ ok: false, error: "Bitte wähle oder nenne dein Unternehmen." }, { status: 400 });
  }

  // Rate-Limit: verhindert, dass über die Route massenhaft Konten angelegt
  // bzw. fremde Postfächer geflutet werden.
  if (rateLimitErreicht("registrierung", clientIp(req), 5)) {
    return NextResponse.json({ ok: false, error: "Zu viele Versuche. Bitte in ein paar Minuten noch einmal probieren." }, { status: 429 });
  }

  const sb = supabaseAdmin();
  if (!sb) {
    console.error("Registrierung: SUPABASE_SERVICE_ROLE_KEY fehlt");
    return NextResponse.json({ ok: false, error: "Die Registrierung ist gerade nicht möglich." }, { status: 503 });
  }

  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.error("Registrierung: SMTP nicht konfiguriert");
    return NextResponse.json({ ok: false, error: "Die Registrierung ist gerade nicht möglich." }, { status: 503 });
  }

  const redirectTo = portalUrl(req);

  // 1) Zugang anlegen und Bestätigungslink erzeugen (Admin-API verschickt dabei
  //    selbst keine Mail). Der Benutzer bleibt unbestätigt, bis er den Link klickt.
  let betreff = "Bitte bestätige deine E-Mail-Adresse (NEST-Partner-Portal)";
  let text, html;

  const { data, error } = await sb.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: { data: { firma, nestplay_ref: nestplayRef }, redirectTo },
  });

  let link = data?.properties?.action_link;

  if (error) {
    if (!adresseVergeben(error)) {
      console.error("Registrierung: Zugang konnte nicht angelegt werden –", error.message);
      return NextResponse.json({ ok: false, error: "Die Registrierung ist gerade nicht möglich." }, { status: 502 });
    }
    // 1b) Adresse ist schon vergeben: kein zweites Konto, stattdessen einen
    //     Recovery-Link schicken. Der bestätigt beim Klick auch eine bislang
    //     unbestätigte Adresse, die Person kommt also in beiden Fällen rein.
    const { data: reset, error: resetFehler } = await sb.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo },
    });
    if (resetFehler) {
      console.error("Registrierung: Recovery-Link für bestehende Adresse fehlgeschlagen –", resetFehler.message);
      return NextResponse.json({ ok: false, error: "Die Registrierung ist gerade nicht möglich." }, { status: 502 });
    }
    link = reset?.properties?.action_link;
    betreff = "Dein Zugang zum NEST-Partner-Portal besteht bereits";
    text = bestehtText(link);
    html = bestehtHtml(link);
  } else {
    text = bestaetigungText(link, firma);
    html = bestaetigungHtml(link, firma);
  }

  if (!link) {
    console.error("Registrierung: Antwort ohne action_link");
    return NextResponse.json({ ok: false, error: "Die Registrierung ist gerade nicht möglich." }, { status: 502 });
  }

  // 2) Link über den eigenen SMTP-Zugang verschicken
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  try {
    const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
    await transporter.sendMail({
      from: `"NEST BildungsBar" <${process.env.MAIL_FROM || user}>`,
      to: email,
      subject: betreff,
      text,
      html,
    });
  } catch (e) {
    console.error("Registrierung: Mailversand fehlgeschlagen –", e?.message);
    return NextResponse.json({ ok: false, error: "Die Bestätigungsmail konnte nicht verschickt werden. Melde dich gern direkt bei info@nest-bildungsbar.de." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
