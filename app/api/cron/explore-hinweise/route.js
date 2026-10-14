import { NextResponse } from "next/server";
import { sendeMail, mailKonfiguriert, absender, empfaengerTeam } from "@/lib/mailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mapMesseTermin } from "@/lib/messeTermine";
import { EXPLORE_TERMINKALENDER, schulformVon, terminPasst } from "@/lib/exploreHinweise";

/* Hinweis an Unternehmen, sobald ein neuer NEST-Explore-Termin angelegt wurde.

   Die Termine werden auf nest-explore.de gepflegt (Tabelle `messe_termine`,
   selbe Supabase). Diese Route sucht kommende Termine, die ein Unternehmen
   noch nicht gemeldet bekommen hat, gleicht sie mit seinen Angaben aus dem
   Partner-Portal ab (Orte, Schulformen – Tabelle `explore_praeferenzen`) und
   schickt pro Unternehmen EINE Mail mit allen passenden Terminen und dem Link
   zum NEST-Explore-Terminkalender.

   Gemeldet werden nur Termine, die nach dem Einschalten der Hinweise angelegt
   wurden (`aktiv_seit`), die noch freie Plätze haben und bei denen das
   Unternehmen nicht schon gebucht ist.

   Aufruf:
   - täglich per Vercel-Cron (vercel.json) mit "Authorization: Bearer <CRON_SECRET>"
   - aus dem Admin-Bereich des Portals mit dem Login-Token von info@…
   - ?probe=1 verschickt nichts und liefert nur, wer welche Termine bekäme.

   Doppelte Mails verhindert `explore_hinweise`: Vor dem Versand wird je
   Unternehmen und Termin eine Zeile angelegt; was schon existiert, wird nicht
   noch einmal verschickt. Schlägt der Versand fehl, werden die Zeilen wieder
   gelöscht, damit der nächste Lauf es erneut versucht. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "info@nest-bildungsbar.de";
const IST_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function heuteBerlin() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(new Date());
}

function portalLink() {
  const basis = (process.env.NEXT_PUBLIC_SITE_URL || "https://nest-bildungsbar.de").trim().replace(/\/+$/, "");
  return basis + "/partner-portal#abschnitt-explore-hinweise";
}

/* "cron" | "admin" | null */
async function berechtigung(req, sb) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET;
  if (secret && auth === "Bearer " + secret) return "cron";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const { data } = await sb.auth.getUser(token);
  return data?.user?.email === ADMIN_EMAIL ? "admin" : null;
}

// ---------- Mail ----------

function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function kurzDatum(iso) {
  const [j, m, t] = String(iso).split("-");
  return `${t}.${m}.${j}`;
}

function zeitText(t) {
  if (!t.uhrzeit) return "";
  return t.uhrzeit + (t.endzeit ? "–" + t.endzeit : "") + " Uhr";
}

/* Schulform nur ergänzen, wenn sie nicht schon im Namen steht
   ("Gymnasium am Kothen · Gymnasium" wäre doppelt). */
function schulMitForm(t) {
  const form = t.schulform;
  return form && !t.schule.toLowerCase().includes(form.toLowerCase()) ? `${t.schule} · ${form}` : t.schule;
}

function eckdaten(t) {
  return [
    ["📅", [t.datum_text, zeitText(t)].filter(Boolean).join(" · ")],
    ["📍", t.ort],
    ["👥", [t.klassen, t.schueler ? t.schueler + " Schüler:innen" : ""].filter(Boolean).join(" · ")],
    ["🎟️", t.plaetze > 0 ? `${t.frei} von ${t.plaetze} Plätzen frei` : ""],
  ].filter(([, wert]) => wert);
}

function baueMail(termine, firma) {
  const einer = termine.length === 1;
  const betreff = einer
    ? `Neuer NEST-Explore-Termin: ${termine[0].schule} am ${kurzDatum(termine[0].datum)}`
    : `${termine.length} neue NEST-Explore-Termine für euch`;
  const einleitung = einer
    ? "es gibt einen neuen NEST-Explore-Termin, der zu euren Angaben im Partner-Portal passt:"
    : `es gibt ${termine.length} neue NEST-Explore-Termine, die zu euren Angaben im Partner-Portal passen:`;
  const wer = firma || "euer Unternehmen";
  const portal = portalLink();

  const text = [
    "Hallo zusammen,", "",
    einleitung, "",
    ...termine.flatMap((t) => ["🏫 " + schulMitForm(t), ...eckdaten(t).map(([ic, w]) => ic + " " + w), ""]),
    "Die Plätze für Unternehmen sind begrenzt – meldet euch am besten direkt im NEST-Explore-Terminkalender an:",
    EXPLORE_TERMINKALENDER, "",
    "Fragen? Antwortet einfach auf diese E-Mail.", "",
    "Euer NEST-Team", "",
    "—",
    `Ihr bekommt diese E-Mail, weil ${wer} im NEST-Partner-Portal Hinweise zu neuen NEST-Explore-Terminen eingeschaltet hat. Orte, Schulformen oder die Hinweise selbst ändert ihr hier:`,
    portal,
  ].join("\n");

  const karten = termine.map((t) => `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;border:1px solid #e3e7ef;border-left:4px solid #f0a500;border-radius:10px;margin:0 0 14px;border-collapse:separate">
      <tr><td style="padding:14px 18px">
        <div style="font-size:17px;font-weight:700;color:#1c2a4a">${esc(schulMitForm(t))}</div>
        <div style="font-size:14px;color:#5b6780;margin-top:6px">${eckdaten(t).map(([ic, w]) => `${ic} ${esc(w)}`).join("<br>")}</div>
      </td></tr>
    </table>`).join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1c2a4a;line-height:1.6">
    <p>Hallo zusammen,</p>
    <p>${esc(einleitung)}</p>
    ${karten}
    <p>Die Plätze für Unternehmen sind begrenzt – meldet euch am besten direkt im NEST-Explore-Terminkalender an:</p>
    <p style="margin:22px 0">
      <a href="${EXPLORE_TERMINKALENDER}" style="background:#f0a500;color:#1c2a4a;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:999px;display:inline-block">Zum Terminkalender &amp; anmelden</a>
    </p>
    <p style="font-size:13px;color:#5b6780">Falls der Button nicht funktioniert: <a href="${EXPLORE_TERMINKALENDER}" style="color:#b07800">${EXPLORE_TERMINKALENDER}</a></p>
    <p>Fragen? Antwortet einfach auf diese E-Mail.</p>
    <p>Euer NEST-Team</p>
    <hr style="border:none;border-top:1px solid #e3e7ef;margin:24px 0 12px">
    <p style="font-size:12px;color:#8a93a6">Ihr bekommt diese E-Mail, weil ${esc(wer)} im NEST-Partner-Portal Hinweise zu neuen NEST-Explore-Terminen eingeschaltet hat.
      Orte, Schulformen oder die Hinweise selbst ändert ihr jederzeit im <a href="${esc(portal)}" style="color:#b07800">Partner-Portal</a>.</p>
  </div>`;

  return { subject: betreff, text, html };
}

// ---------- Ablauf ----------

export async function GET(req) { return handle(req); }
export async function POST(req) { return handle(req); }

async function handle(req) {
  const sb = supabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "SUPABASE_SERVICE_ROLE_KEY fehlt" }, { status: 503 });

  if (!(await berechtigung(req, sb))) {
    return NextResponse.json({ ok: false, error: "Nicht autorisiert" }, { status: 401 });
  }

  const probe = new URL(req.url).searchParams.has("probe");
  if (!probe && !mailKonfiguriert()) {
    return NextResponse.json({ ok: false, error: "Mailversand ist nicht konfiguriert (weder RESEND_API_KEY noch SMTP_*)." }, { status: 503 });
  }

  const { data: praefs, error: pErr } = await sb.from("explore_praeferenzen").select("*").eq("aktiv", true);
  if (pErr) return NextResponse.json({ ok: false, error: "explore_praeferenzen: " + pErr.message + " (supabase/explore-hinweise.sql ausgeführt?)" }, { status: 500 });

  const { data: rows, error: tErr } = await sb
    .from("messe_termine").select("*")
    .gt("datum", heuteBerlin()).order("datum", { ascending: true });
  if (tErr) return NextResponse.json({ ok: false, error: "messe_termine: " + tErr.message }, { status: 500 });

  const termine = (rows || []).map((r) => ({ ...mapMesseTermin(r), created_at: r.created_at, schulform: schulformVon(r) }));
  const ergebnis = { ok: true, modus: probe ? "vorschau" : "versand", abonnenten: (praefs || []).length, termine: termine.length, mails: 0, gemeldet: 0, fehler: 0 };
  if (!praefs?.length || !termine.length) return NextResponse.json(probe ? { ...ergebnis, empfaenger: [] } : ergebnis);

  const ids = termine.map((t) => t.id);
  const [{ data: schon, error: hErr }, { data: buchungen, error: bErr }] = await Promise.all([
    sb.from("explore_hinweise").select("termin_id,user_id").in("termin_id", ids),
    sb.from("messe_buchungen").select("termin_id,email,unternehmen").in("termin_id", ids),
  ]);
  if (hErr || bErr) return NextResponse.json({ ok: false, error: (hErr || bErr).message }, { status: 500 });

  const gesendet = new Set((schon || []).map((h) => h.termin_id + ":" + h.user_id));
  const klein = (s) => String(s || "").trim().toLowerCase();
  const schonGebucht = (terminId, email, firma) => (buchungen || []).some((b) =>
    b.termin_id === terminId && (klein(b.email) === klein(email) || (firma && klein(b.unternehmen) === klein(firma))));

  const vorschau = [];
  for (const p of praefs) {
    const { data: u } = await sb.auth.admin.getUserById(p.user_id);
    const user = u?.user;
    const email = (user?.email || "").trim();
    // Nur bestätigte Adressen, nie an den Admin-Zugang
    if (!user?.email_confirmed_at || !IST_EMAIL.test(email) || klein(email) === ADMIN_EMAIL) continue;
    const firma = String(user.user_metadata?.firma || "").trim();
    const seit = new Date(p.aktiv_seit).getTime();

    const passende = termine.filter((t) =>
      new Date(t.created_at).getTime() >= seit
      && !t.ausgebucht
      && !gesendet.has(t.id + ":" + p.user_id)
      && !schonGebucht(t.id, email, firma)
      && terminPasst(t, p));
    if (!passende.length) continue;

    if (probe) {
      vorschau.push({ firma, email, termine: passende.map((t) => ({ schule: t.schule, datum: t.datum, ort: t.ort, schulform: t.schulform })) });
      continue;
    }

    // Termine für dieses Unternehmen "reservieren" – nur, was hier neu angelegt
    // wird, geht raus. Läuft parallel ein zweiter Aufruf, bekommt der nichts.
    const { data: reserviert, error: rErr } = await sb
      .from("explore_hinweise")
      .upsert(passende.map((t) => ({ termin_id: t.id, user_id: p.user_id })), { onConflict: "termin_id,user_id", ignoreDuplicates: true })
      .select("termin_id");
    if (rErr) { ergebnis.fehler++; console.error("explore-hinweise: Reservierung fehlgeschlagen", rErr.message); continue; }
    const frei = new Set((reserviert || []).map((h) => h.termin_id));
    const zuSenden = passende.filter((t) => frei.has(t.id));
    if (!zuSenden.length) continue;

    try {
      await sendeMail({ from: absender("NEST Explore"), to: email, replyTo: empfaengerTeam(), ...baueMail(zuSenden, firma) });
      ergebnis.mails++;
      ergebnis.gemeldet += zuSenden.length;
    } catch (e) {
      ergebnis.fehler++;
      console.error("explore-hinweise: Versand an " + email + " fehlgeschlagen –", e?.message);
      await sb.from("explore_hinweise").delete().eq("user_id", p.user_id).in("termin_id", zuSenden.map((t) => t.id));
    }
  }

  return NextResponse.json(probe ? { ...ergebnis, empfaenger: vorschau } : ergebnis);
}
